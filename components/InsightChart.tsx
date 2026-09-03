"use client";

export default function InsightChart({
  title,
  data,
}: {
  title: string;
  data: { label: string; value: number }[];
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="glass rounded-2xl p-5">
      <p className="mb-4 text-sm font-medium text-white">{title}</p>
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.label}>
            <div className="mb-1 flex items-center justify-between text-xs text-mist/70">
              <span>{d.label}</span>
              <span>{d.value}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-700"
                style={{ width: `${(d.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
