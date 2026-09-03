"use client";

import { cn } from "@/lib/utils";

export default function VoiceIndicator({
  level = 0,
  active = false,
  color = "#3fe0d0",
  bars = 5,
  size = "md",
}: {
  level?: number;
  active?: boolean;
  color?: string;
  bars?: number;
  size?: "sm" | "md";
}) {
  const heightBase = size === "sm" ? 6 : 10;
  return (
    <div className="flex items-end gap-[3px]" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => {
        const variance = 0.4 + Math.abs(Math.sin(i * 1.7)) * 0.6;
        const h = active ? heightBase + level * heightBase * 2 * variance : heightBase * 0.35;
        return (
          <span
            key={i}
            className={cn("w-[3px] rounded-full transition-all duration-150", active && "animate-pulseSlow")}
            style={{
              height: `${h}px`,
              backgroundColor: color,
              opacity: active ? 0.9 : 0.3,
              animationDelay: `${i * 90}ms`,
            }}
          />
        );
      })}
    </div>
  );
}
