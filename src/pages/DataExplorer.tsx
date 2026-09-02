import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft,
  Braces,
  CheckSquare,
  Copy,
  Database,
  Download,
  FileJson,
  Layers,
  Square,
} from "lucide-react";
import { datasets, type Dataset } from "@/data/datasets";
import {
  FORMATS,
  buildFilename,
  byteLength,
  copyToClipboard,
  countFields,
  countRecords,
  downloadContent,
  formatBytes,
  getFormatInfo,
  serialize,
  type ExportFormat,
} from "@/lib/dataExport";

const groups = Array.from(new Set(datasets.map((d) => d.group)));

const StatPill = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex flex-col rounded-xl bg-white/5 border border-white/10 px-4 py-3 min-w-[110px]">
    <span className="text-lg sm:text-xl font-black text-foreground tabular-nums">{value}</span>
    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
      {label}
    </span>
  </div>
);

const DataExplorer = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(datasets.map((d) => d.id)),
  );
  const [format, setFormat] = useState<ExportFormat>("json");
  const [copied, setCopied] = useState(false);

  const selectedDatasets = useMemo<Dataset[]>(
    () => datasets.filter((d) => selectedIds.has(d.id)),
    [selectedIds],
  );

  const { content } = useMemo(
    () => serialize(selectedDatasets, format),
    [selectedDatasets, format],
  );

  const stats = useMemo(
    () => ({
      datasets: selectedDatasets.length,
      records: countRecords(selectedDatasets),
      fields: countFields(selectedDatasets),
      size: formatBytes(byteLength(content)),
    }),
    [selectedDatasets, content],
  );

  const activeFormat = getFormatInfo(format);

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelectedIds(new Set(datasets.map((d) => d.id)));
  const clearAll = () => setSelectedIds(new Set());
  const selectOnly = (id: string) => setSelectedIds(new Set([id]));

  const handleCopy = async () => {
    if (selectedDatasets.length === 0) return;
    const ok = await copyToClipboard(content);
    if (ok) {
      setCopied(true);
      toast.success("Copied to clipboard", { description: `${stats.size} of ${activeFormat.label}` });
      setTimeout(() => setCopied(false), 1500);
    } else {
      toast.error("Could not copy to clipboard");
    }
  };

  const handleDownload = () => {
    if (selectedDatasets.length === 0) return;
    const { content: fileContent, mimeType } = serialize(selectedDatasets, format);
    const filename = buildFilename(selectedDatasets, format);
    downloadContent(filename, fileContent, mimeType);
    toast.success("Download started", { description: filename });
  };

  const empty = selectedDatasets.length === 0;

  return (
    <div className="relative min-h-screen bg-background">
      <div className="aurora-wrap" aria-hidden>
        <div className="aurora-blob-1" />
        <div className="aurora-blob-2" />
        <div className="aurora-blob-3" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center">
              <Database size={22} className="text-primary" />
            </div>
            <div>
              <p className="font-mono text-primary text-xs tracking-widest uppercase">
                Monitor &amp; Export
              </p>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Data <span className="text-gradient">Explorer</span>
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Inspect every dataset that powers this site, pick all of them or just the parts you
            need, and export in the format of your choice — JSON Lines and CSV are ready to drop
            straight into an ML pipeline as a dataset.
          </p>
        </header>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-3 mb-8">
          <StatPill label="Datasets" value={stats.datasets} />
          <StatPill label="Records" value={stats.records} />
          <StatPill label="Fields" value={stats.fields} />
          <StatPill label="Export size" value={stats.size} />
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          {/* Dataset picker */}
          <aside className="glass-strong rounded-2xl p-5 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                <Layers size={16} className="text-primary" />
                Datasets
              </h2>
              <div className="flex gap-1">
                <button
                  onClick={selectAll}
                  className="text-[11px] font-bold px-2 py-1 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  All
                </button>
                <button
                  onClick={clearAll}
                  className="text-[11px] font-bold px-2 py-1 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  None
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {groups.map((group) => (
                <div key={group}>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-2">
                    {group}
                  </p>
                  <div className="space-y-1.5">
                    {datasets
                      .filter((d) => d.group === group)
                      .map((dataset) => {
                        const checked = selectedIds.has(dataset.id);
                        return (
                          <div
                            key={dataset.id}
                            className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
                              checked
                                ? "bg-primary/10 border-primary/30"
                                : "bg-white/5 border-white/10 hover:border-white/20"
                            }`}
                          >
                            <button
                              onClick={() => toggle(dataset.id)}
                              className="flex items-center gap-3 flex-1 min-w-0 text-left"
                              aria-pressed={checked}
                              aria-label={`Toggle ${dataset.name}`}
                            >
                              {checked ? (
                                <CheckSquare size={18} className="text-primary shrink-0" />
                              ) : (
                                <Square size={18} className="text-muted-foreground shrink-0" />
                              )}
                              <span className="flex flex-col min-w-0">
                                <span className="text-sm font-bold truncate">{dataset.name}</span>
                                <span className="text-[11px] text-muted-foreground">
                                  {dataset.records.length}{" "}
                                  {dataset.records.length === 1 ? "record" : "records"}
                                </span>
                              </span>
                            </button>
                            <button
                              onClick={() => selectOnly(dataset.id)}
                              className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-primary transition-all shrink-0"
                              title={`Select only ${dataset.name}`}
                            >
                              Only
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Export panel */}
          <section className="glass-strong rounded-2xl p-5 flex flex-col min-w-0">
            {/* Format selector */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Braces size={16} className="text-primary" />
                <h2 className="text-sm font-black uppercase tracking-wider">Format</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {FORMATS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className={`text-xs font-bold px-3 py-2 rounded-lg border transition-colors ${
                      format === f.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-white/5 border-white/10 text-foreground/80 hover:bg-white/10"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                <FileJson size={13} className="text-primary/70" />
                <span>
                  .{activeFormat.extension} — {activeFormat.hint}
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={handleDownload}
                disabled={empty}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl btn-gradient text-sm font-bold shadow-lg shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Download size={16} />
                Download {activeFormat.label}
              </button>
              <button
                onClick={handleCopy}
                disabled={empty}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Copy size={16} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Preview */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Preview
              </h3>
              <span className="text-[11px] text-muted-foreground tabular-nums">{stats.size}</span>
            </div>
            {empty ? (
              <div className="flex-1 min-h-[280px] flex items-center justify-center rounded-xl bg-black/30 border border-white/10 text-center px-6">
                <p className="text-sm text-muted-foreground">
                  Select at least one dataset on the left to preview and export your data.
                </p>
              </div>
            ) : (
              <pre className="flex-1 min-h-[280px] max-h-[60vh] overflow-auto rounded-xl bg-black/40 border border-white/10 p-4 text-xs leading-relaxed font-mono text-foreground/90 whitespace-pre">
                <code>{content}</code>
              </pre>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DataExplorer;
