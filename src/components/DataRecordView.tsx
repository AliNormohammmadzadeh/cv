import { ExternalLink, FileJson } from "lucide-react";
import type { Dataset } from "@/data/datasets";

/** Turn snake_case / camelCase keys into readable "Title Case" labels. */
const prettifyKey = (key: string): string =>
  key
    .replace(/^_/, "")
    .replace(/[_-]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const isUrl = (v: string) => /^https?:\/\/\S+$/i.test(v);
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary/90">
    {children}
  </span>
);

const StringValue = ({ value }: { value: string }) => {
  if (isUrl(value)) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-primary hover:underline break-all"
      >
        {value.replace(/^https?:\/\//, "")}
        <ExternalLink size={12} className="shrink-0" />
      </a>
    );
  }
  if (isEmail(value)) {
    return (
      <a href={`mailto:${value}`} className="text-primary hover:underline break-all">
        {value}
      </a>
    );
  }
  return <span className="text-foreground/90 break-words">{value}</span>;
};

/** Render any JSON value as a nicely formatted field instead of raw text. */
const FieldValue = ({ value }: { value: unknown }): JSX.Element => {
  if (value === null || value === undefined || value === "") {
    return <span className="text-muted-foreground/50 italic">—</span>;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-muted-foreground/50 italic">—</span>;
    const allPrimitive = value.every((v) => typeof v !== "object" || v === null);
    if (allPrimitive) {
      return (
        <div className="flex flex-wrap gap-1.5">
          {value.map((v, i) => (
            <Chip key={i}>{String(v)}</Chip>
          ))}
        </div>
      );
    }
    return (
      <div className="space-y-2">
        {value.map((v, i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-3">
            <FieldValue value={v} />
          </div>
        ))}
      </div>
    );
  }
  if (typeof value === "object") {
    return (
      <div className="space-y-1.5">
        {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
          <div key={k} className="flex flex-col sm:flex-row sm:gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wide text-muted-foreground shrink-0 sm:w-28">
              {prettifyKey(k)}
            </span>
            <div className="text-sm min-w-0">
              <FieldValue value={v} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (typeof value === "boolean") {
    return (
      <span
        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
          value ? "bg-emerald-500/15 text-emerald-300" : "bg-white/10 text-muted-foreground"
        }`}
      >
        {value ? "Yes" : "No"}
      </span>
    );
  }
  if (typeof value === "number") {
    return <span className="font-mono tabular-nums text-foreground/90">{value}</span>;
  }
  return <StringValue value={String(value)} />;
};

const RecordCard = ({ record }: { record: Record<string, unknown> }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
    <div className="flex flex-col gap-3">
      {Object.entries(record).map(([key, value]) => (
        <div key={key} className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground pt-0.5">
            {prettifyKey(key)}
          </span>
          <div className="text-sm min-w-0">
            <FieldValue value={value} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export interface DatasetViewProps {
  dataset: Dataset;
  onDownloadJson: (dataset: Dataset) => void;
}

/** A formatted, human-friendly rendering of one dataset with a per-dataset JSON export. */
export const DatasetView = ({ dataset, onDownloadJson }: DatasetViewProps) => (
  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
    <div className="flex items-start justify-between gap-3 mb-3">
      <div className="min-w-0">
        <h3 className="text-sm font-black tracking-tight">{dataset.name}</h3>
        <p className="text-[11px] text-muted-foreground">
          {dataset.records.length} {dataset.records.length === 1 ? "record" : "records"} ·{" "}
          {dataset.description}
        </p>
      </div>
      <button
        onClick={() => onDownloadJson(dataset)}
        className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors shrink-0"
        title={`Download ${dataset.name} as JSON`}
      >
        <FileJson size={13} className="text-primary" />
        JSON
      </button>
    </div>
    <div className="space-y-3">
      {dataset.records.map((record, i) => (
        <RecordCard key={i} record={record} />
      ))}
    </div>
  </div>
);

export default DatasetView;
