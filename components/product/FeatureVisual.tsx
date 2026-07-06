import type { StoryKind } from "@/lib/products";

/**
 * Schematic, code-built visuals for each feature-story row. Abstract on purpose
 * (skeleton shapes, no invented figures) so they read as product previews
 * without fabricating data. [COPY: swap for real screenshots when available.]
 */

const shell =
  "relative overflow-hidden rounded-2xl border border-white/10 bg-panel p-5 shadow-glow";

function TimelineVisual() {
  return (
    <div className={shell}>
      <div className="mb-5 h-2 w-24 rounded bg-white/10" />
      <ol className="relative space-y-5 pl-7">
        <span className="absolute bottom-1 left-[9px] top-1 w-px bg-gradient-to-b from-accent via-accent-2 to-transparent opacity-70" />
        {[0, 1, 2, 3].map((i) => (
          <li key={i} className="relative">
            <span className="absolute -left-7 top-0.5 h-3.5 w-3.5 rounded-full bg-panel ring-2 ring-accent-2/50" />
            <div className="space-y-1.5">
              <div className="h-2 w-1/2 rounded bg-white/20" />
              <div className="h-2 w-3/4 rounded bg-white/10" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PipelineVisual() {
  const columns = [2, 3, 1];
  return (
    <div className={shell}>
      <div className="grid grid-cols-3 gap-3">
        {columns.map((count, c) => (
          <div key={c} className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="h-2 w-12 rounded bg-white/15" />
              <div className="h-4 w-4 rounded-full bg-accent/20" />
            </div>
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="space-y-1.5 rounded-lg border border-white/10 bg-white/[0.03] p-2.5"
              >
                <div className="h-1.5 w-3/4 rounded bg-white/20" />
                <div className="h-1.5 w-1/2 rounded bg-white/10" />
                <div className="mt-1 h-1 w-full rounded bg-accent-gradient opacity-50" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsVisual() {
  const bars = [42, 58, 50, 72, 64, 88, 80, 96];
  return (
    <div className={shell}>
      <div className="mb-5 flex items-center justify-between">
        <div className="h-2 w-20 rounded bg-white/15" />
        <div className="flex gap-3">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="h-2 w-2 rounded-full bg-accent-2" />
        </div>
      </div>
      <div className="flex h-36 items-end gap-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-accent-gradient"
            style={{ height: `${h}%`, opacity: 0.35 + (h / 100) * 0.6 }}
          />
        ))}
      </div>
    </div>
  );
}

function ModulesVisual() {
  // Center tile (index 4) reads as the shared data hub.
  return (
    <div className={shell}>
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => {
          const hub = i === 4;
          return (
            <div
              key={i}
              className={`space-y-2 rounded-xl border p-3 ${
                hub
                  ? "border-white/20 bg-accent/10"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div
                className={`h-6 w-6 rounded-md ${
                  hub ? "bg-accent-gradient" : "bg-white/10"
                }`}
              />
              <div className="h-1.5 w-3/4 rounded bg-white/20" />
              <div className="h-1.5 w-1/2 rounded bg-white/10" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TableVisual() {
  return (
    <div className={shell}>
      {/* Header */}
      <div className="grid grid-cols-[1.6fr_1fr_1fr_0.8fr] gap-3 border-b border-white/10 pb-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-2 rounded bg-white/15" />
        ))}
      </div>
      {/* Rows */}
      <div className="divide-y divide-white/5">
        {Array.from({ length: 5 }).map((_, r) => (
          <div
            key={r}
            className="grid grid-cols-[1.6fr_1fr_1fr_0.8fr] items-center gap-3 py-3"
          >
            <div className="h-1.5 rounded bg-white/20" />
            <div className="h-1.5 rounded bg-white/10" />
            <div className="h-1.5 rounded bg-white/10" />
            <div
              className="h-4 rounded-full bg-accent-gradient"
              style={{ opacity: 0.4 + (r % 3) * 0.2 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeatureVisual({ kind }: { kind: StoryKind }) {
  switch (kind) {
    case "timeline":
      return <TimelineVisual />;
    case "pipeline":
      return <PipelineVisual />;
    case "reports":
      return <ReportsVisual />;
    case "modules":
      return <ModulesVisual />;
    case "table":
      return <TableVisual />;
  }
}
