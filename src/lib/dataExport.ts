/**
 * Multi-format serialization + download utilities for the Data Explorer.
 *
 * All serializers are pure functions of the selected {@link Dataset}s so they can
 * be unit-tested without a DOM. The browser-only helpers ({@link downloadContent},
 * {@link copyToClipboard}) are kept separate at the bottom of the file.
 */
import type { Dataset, DataRecord } from "@/data/datasets";

export type ExportFormat = "json" | "jsonl" | "csv" | "tsv" | "yaml" | "xml" | "markdown";

export interface FormatInfo {
  id: ExportFormat;
  label: string;
  /** File extension without the leading dot. */
  extension: string;
  mimeType: string;
  /** Short blurb shown in the UI. */
  hint: string;
}

export const FORMATS: FormatInfo[] = [
  { id: "json", label: "JSON", extension: "json", mimeType: "application/json", hint: "Structured, human-readable" },
  {
    id: "jsonl",
    label: "JSON Lines",
    extension: "jsonl",
    mimeType: "application/x-ndjson",
    hint: "One record per line — ideal for ML datasets",
  },
  { id: "csv", label: "CSV", extension: "csv", mimeType: "text/csv", hint: "Spreadsheets & pandas.read_csv" },
  { id: "tsv", label: "TSV", extension: "tsv", mimeType: "text/tab-separated-values", hint: "Tab-separated tables" },
  { id: "yaml", label: "YAML", extension: "yaml", mimeType: "application/x-yaml", hint: "Config-friendly" },
  { id: "xml", label: "XML", extension: "xml", mimeType: "application/xml", hint: "Legacy interchange" },
  {
    id: "markdown",
    label: "Markdown",
    extension: "md",
    mimeType: "text/markdown",
    hint: "Readable tables for docs",
  },
];

export const getFormatInfo = (format: ExportFormat): FormatInfo =>
  FORMATS.find((f) => f.id === format) ?? FORMATS[0];

/** Delimiter used when flattening array/object cell values for tabular formats. */
const CELL_ARRAY_JOIN = "; ";

/** Render a single value as a flat string suitable for CSV/TSV/Markdown cells. */
export function flattenCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.map((v) => flattenCell(v)).join(CELL_ARRAY_JOIN);
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

/** Union of keys across records, preserving first-seen order. */
export function collectColumns(records: DataRecord[]): string[] {
  const seen = new Set<string>();
  const columns: string[] = [];
  for (const record of records) {
    for (const key of Object.keys(record)) {
      if (!seen.has(key)) {
        seen.add(key);
        columns.push(key);
      }
    }
  }
  return columns;
}

// ---------------------------------------------------------------------------
// JSON
// ---------------------------------------------------------------------------

export function toJSON(datasets: Dataset[]): string {
  if (datasets.length === 1) {
    return JSON.stringify(datasets[0].records, null, 2);
  }
  const combined: Record<string, DataRecord[]> = {};
  for (const dataset of datasets) {
    combined[dataset.id] = dataset.records;
  }
  return JSON.stringify(combined, null, 2);
}

// ---------------------------------------------------------------------------
// JSON Lines (NDJSON)
// ---------------------------------------------------------------------------

export function toJSONL(datasets: Dataset[]): string {
  const multi = datasets.length > 1;
  const lines: string[] = [];
  for (const dataset of datasets) {
    for (const record of dataset.records) {
      const row = multi ? { _dataset: dataset.id, ...record } : record;
      lines.push(JSON.stringify(row));
    }
  }
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Delimited (CSV / TSV)
// ---------------------------------------------------------------------------

function escapeDelimited(value: string, delimiter: string): string {
  const needsQuoting =
    value.includes(delimiter) || value.includes('"') || value.includes("\n") || value.includes("\r");
  if (!needsQuoting) return value;
  return `"${value.replace(/"/g, '""')}"`;
}

export function toDelimited(datasets: Dataset[], delimiter: string): string {
  const multi = datasets.length > 1;
  // Build the union of columns across all selected datasets so a single flat
  // table can hold heterogeneous rows (missing cells become empty strings).
  const columnSet: string[] = [];
  const columnSeen = new Set<string>();
  const pushColumn = (key: string) => {
    if (!columnSeen.has(key)) {
      columnSeen.add(key);
      columnSet.push(key);
    }
  };
  if (multi) pushColumn("_dataset");
  for (const dataset of datasets) {
    for (const column of collectColumns(dataset.records)) pushColumn(column);
  }

  const rows: string[] = [];
  rows.push(columnSet.map((c) => escapeDelimited(c, delimiter)).join(delimiter));
  for (const dataset of datasets) {
    for (const record of dataset.records) {
      const cells = columnSet.map((column) => {
        if (column === "_dataset") return escapeDelimited(dataset.id, delimiter);
        const raw = Object.prototype.hasOwnProperty.call(record, column)
          ? flattenCell(record[column])
          : "";
        return escapeDelimited(raw, delimiter);
      });
      rows.push(cells.join(delimiter));
    }
  }
  return rows.join("\n");
}

export const toCSV = (datasets: Dataset[]): string => toDelimited(datasets, ",");
export const toTSV = (datasets: Dataset[]): string => toDelimited(datasets, "\t");

// ---------------------------------------------------------------------------
// YAML
// ---------------------------------------------------------------------------

const YAML_PLAIN = /^[A-Za-z0-9][A-Za-z0-9 _\-./@#]*$/;
const YAML_RESERVED = new Set(["true", "false", "null", "yes", "no", "on", "off", "~"]);

function yamlScalar(value: unknown): string {
  if (value === null || value === undefined) return "null";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return Number.isFinite(value) ? String(value) : `"${value}"`;
  const str = String(value);
  const looksNumeric = /^-?\d+(\.\d+)?$/.test(str);
  const needsQuote =
    str === "" ||
    !YAML_PLAIN.test(str) ||
    looksNumeric ||
    YAML_RESERVED.has(str.toLowerCase());
  if (!needsQuote) return str;
  return `"${str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function yamlNode(node: unknown, indent: number): string {
  const pad = "  ".repeat(indent);
  if (Array.isArray(node)) {
    if (node.length === 0) return `${pad}[]`;
    const childPad = "  ".repeat(indent + 1);
    return node
      .map((item) => {
        if (isPlainObject(item) && Object.keys(item).length > 0) {
          // Render the first key inline with the dash for idiomatic YAML.
          const lines = yamlNode(item, indent + 1).split("\n");
          lines[0] = `${pad}- ${lines[0].slice(childPad.length)}`;
          return lines.join("\n");
        }
        if (Array.isArray(item) && item.length > 0) {
          return `${pad}-\n${yamlNode(item, indent + 1)}`;
        }
        return `${pad}- ${yamlScalar(item)}`;
      })
      .join("\n");
  }
  if (isPlainObject(node)) {
    const keys = Object.keys(node);
    if (keys.length === 0) return `${pad}{}`;
    return keys
      .map((key) => {
        const value = node[key];
        if (Array.isArray(value)) {
          if (value.length === 0) return `${pad}${key}: []`;
          return `${pad}${key}:\n${yamlNode(value, indent + 1)}`;
        }
        if (isPlainObject(value)) {
          if (Object.keys(value).length === 0) return `${pad}${key}: {}`;
          return `${pad}${key}:\n${yamlNode(value, indent + 1)}`;
        }
        return `${pad}${key}: ${yamlScalar(value)}`;
      })
      .join("\n");
  }
  return `${pad}${yamlScalar(node)}`;
}

export function toYAML(datasets: Dataset[]): string {
  if (datasets.length === 1) {
    return yamlNode(datasets[0].records, 0);
  }
  const combined: Record<string, DataRecord[]> = {};
  for (const dataset of datasets) combined[dataset.id] = dataset.records;
  return yamlNode(combined, 0);
}

// ---------------------------------------------------------------------------
// XML
// ---------------------------------------------------------------------------

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function xmlNode(key: string, value: unknown, indent: number): string {
  const pad = "  ".repeat(indent);
  if (Array.isArray(value)) {
    if (value.length === 0) return `${pad}<${key}/>`;
    const items = value.map((item) => xmlNode("item", item, indent + 1)).join("\n");
    return `${pad}<${key}>\n${items}\n${pad}</${key}>`;
  }
  if (isPlainObject(value)) {
    const children = Object.entries(value)
      .map(([k, v]) => xmlNode(k, v, indent + 1))
      .join("\n");
    return `${pad}<${key}>\n${children}\n${pad}</${key}>`;
  }
  if (value === null || value === undefined) return `${pad}<${key}/>`;
  return `${pad}<${key}>${xmlEscape(String(value))}</${key}>`;
}

export function toXML(datasets: Dataset[]): string {
  const body = datasets
    .map((dataset) => {
      const records = dataset.records
        .map((record) => xmlNode("record", record, 2))
        .join("\n");
      return `  <dataset id="${xmlEscape(dataset.id)}" name="${xmlEscape(dataset.name)}">\n${records}\n  </dataset>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<data>\n${body}\n</data>`;
}

// ---------------------------------------------------------------------------
// Markdown
// ---------------------------------------------------------------------------

function markdownEscape(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n/g, "<br>");
}

function markdownTable(dataset: Dataset): string {
  const columns = collectColumns(dataset.records);
  if (columns.length === 0) return "_No records._";
  const header = `| ${columns.join(" | ")} |`;
  const divider = `| ${columns.map(() => "---").join(" | ")} |`;
  const body = dataset.records
    .map((record) => {
      const cells = columns.map((column) =>
        markdownEscape(
          Object.prototype.hasOwnProperty.call(record, column) ? flattenCell(record[column]) : "",
        ),
      );
      return `| ${cells.join(" | ")} |`;
    })
    .join("\n");
  return `${header}\n${divider}\n${body}`;
}

export function toMarkdown(datasets: Dataset[]): string {
  return datasets
    .map((dataset) => `## ${dataset.name}\n\n${dataset.description}\n\n${markdownTable(dataset)}`)
    .join("\n\n");
}

// ---------------------------------------------------------------------------
// Dispatcher
// ---------------------------------------------------------------------------

export interface SerializedExport {
  content: string;
  mimeType: string;
  extension: string;
}

export function serialize(datasets: Dataset[], format: ExportFormat): SerializedExport {
  const info = getFormatInfo(format);
  let content = "";
  switch (format) {
    case "json":
      content = toJSON(datasets);
      break;
    case "jsonl":
      content = toJSONL(datasets);
      break;
    case "csv":
      content = toCSV(datasets);
      break;
    case "tsv":
      content = toTSV(datasets);
      break;
    case "yaml":
      content = toYAML(datasets);
      break;
    case "xml":
      content = toXML(datasets);
      break;
    case "markdown":
      content = toMarkdown(datasets);
      break;
    default:
      content = toJSON(datasets);
  }
  return { content, mimeType: info.mimeType, extension: info.extension };
}

/** Build a descriptive, filesystem-safe filename for a download. */
export function buildFilename(datasets: Dataset[], format: ExportFormat): string {
  const info = getFormatInfo(format);
  const date = new Date().toISOString().slice(0, 10);
  let stem: string;
  if (datasets.length === 0) stem = "portfolio-data";
  else if (datasets.length === 1) stem = `portfolio-${datasets[0].id}`;
  else stem = `portfolio-${datasets.length}-datasets`;
  return `${stem}-${date}.${info.extension}`;
}

/** Total number of records across the given datasets. */
export function countRecords(datasets: Dataset[]): number {
  return datasets.reduce((sum, dataset) => sum + dataset.records.length, 0);
}

/** Union of field names across the given datasets. */
export function countFields(datasets: Dataset[]): number {
  const fields = new Set<string>();
  for (const dataset of datasets) {
    for (const record of dataset.records) {
      for (const key of Object.keys(record)) fields.add(`${dataset.id}.${key}`);
    }
  }
  return fields.size;
}

/** Human-readable byte size. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** UTF-8 byte length of a string. */
export function byteLength(content: string): number {
  if (typeof TextEncoder !== "undefined") return new TextEncoder().encode(content).length;
  // Fallback for very old environments.
  return unescape(encodeURIComponent(content)).length;
}

// ---------------------------------------------------------------------------
// Browser helpers (not pure — require a DOM)
// ---------------------------------------------------------------------------

/** Trigger a client-side download of the given text content. */
export function downloadContent(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  // Revoke on the next tick so the download has a chance to start.
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

/** Copy text to the clipboard, resolving to whether it succeeded. */
export async function copyToClipboard(content: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(content);
      return true;
    }
  } catch {
    // fall through to legacy path
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}
