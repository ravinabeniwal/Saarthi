"use client";

import { Ear, Brain, Search, Clock, Volume2, MicOff } from "lucide-react";
import type { SaarthiState } from "@/lib/types";
import { cn, stateLabel } from "@/lib/utils";

const stateConfig: Record<SaarthiState, { icon: React.ElementType; color: string }> = {
  LISTENING: { icon: Ear, color: "#3fe0d0" },
  UNDERSTANDING: { icon: Brain, color: "#7c9cff" },
  DETECTING_GAP: { icon: Search, color: "#ffb84d" },
  WAITING_FOR_PAUSE: { icon: Clock, color: "#ffb84d" },
  SPEAKING: { icon: Volume2, color: "#22c7bd" },
  MUTED: { icon: MicOff, color: "#8792b3" },
};

export default function AIStatus({ state }: { state: SaarthiState }) {
  const { icon: Icon, color } = stateConfig[state];
  return (
    <div className="flex items-center gap-3 rounded-xl border border-navy-900/8 bg-navy-900/[0.03] px-4 py-3">
      <div
        className={cn("flex h-9 w-9 items-center justify-center rounded-full", state !== "MUTED" && "animate-pulseSlow")}
        style={{ backgroundColor: `${color}22`, color }}
      >
        <Icon size={17} />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-mist/50">Saarthi status</p>
        <p className="text-sm font-medium text-navy-900">{stateLabel(state)}</p>
      </div>
    </div>
  );
}
