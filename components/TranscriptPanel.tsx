"use client";

import { useEffect, useRef } from "react";
import type { TranscriptEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

const tagStyles: Record<string, string> = {
  concept: "border-cyan-400/30 bg-cyan-400/5 text-cyan-300",
  question: "border-indigo-300/30 bg-indigo-300/5 text-indigo-200",
  confusion: "border-amber-300/30 bg-amber-300/5 text-amber-200",
  intervention: "border-emerald-300/30 bg-emerald-300/5 text-emerald-200",
};

const roleColor: Record<string, string> = {
  teacher: "text-cyan-300",
  student: "text-mist",
  saarthi: "text-emerald-300",
};

export default function TranscriptPanel({
  entries,
  autoScroll = true,
  compact = false,
}: {
  entries: TranscriptEntry[];
  autoScroll?: boolean;
  compact?: boolean;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries, autoScroll]);

  if (entries.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-mist/50">
        Transcript will appear here once the classroom is live.
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3 overflow-y-auto", compact ? "max-h-64" : "h-full")}>
      {entries.map((e) => (
        <div key={e.id} className="animate-rise rounded-xl border border-white/6 bg-white/[0.02] p-3">
          <div className="mb-1 flex items-center justify-between">
            <span className={cn("text-sm font-medium", roleColor[e.role])}>{e.speaker}</span>
            <span className="text-[11px] text-mist/40">
              {new Date(e.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <p className="text-sm text-mist">{e.text}</p>
          {e.tag && (
            <span
              className={cn(
                "mt-2 inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium",
                tagStyles[e.tag]
              )}
            >
              {e.tag}
            </span>
          )}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
