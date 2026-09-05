export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function severityColor(sev: "low" | "medium" | "high") {
  return {
    low: "text-cyan-600 border-cyan-400/30 bg-cyan-400/5",
    medium: "text-amber-600 border-amber-300/30 bg-amber-300/5",
    high: "text-rose-600 border-rose-300/30 bg-rose-300/5",
  }[sev];
}

export function stateLabel(state: string) {
  return state.replace(/_/g, " ");
}
