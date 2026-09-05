"use client";

import { Wifi, WifiOff, Loader2 } from "lucide-react";
import type { ConnectionMode } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function ConnectionStatus({
  status,
  mode,
}: {
  status: "connecting" | "connected" | "disconnected";
  mode: ConnectionMode;
}) {
  const icon =
    status === "connecting" ? (
      <Loader2 size={13} className="animate-spin" />
    ) : status === "connected" ? (
      <Wifi size={13} />
    ) : (
      <WifiOff size={13} />
    );

  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
          status === "connected"
            ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-600"
            : status === "connecting"
            ? "border-amber-300/30 bg-amber-300/10 text-amber-700"
            : "border-rose-400/30 bg-rose-400/10 text-rose-600"
        )}
      >
        {icon}
        {status === "connected" ? "Connected" : status === "connecting" ? "Connecting" : "Disconnected"}
      </span>
      <span
        className={cn(
          "rounded-full border px-3 py-1 text-xs font-medium",
          mode === "live"
            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-600"
            : "border-navy-900/15 bg-navy-900/5 text-mist"
        )}
      >
        {mode === "live" ? "Agora Live" : "Demo Mode"}
      </span>
    </div>
  );
}
