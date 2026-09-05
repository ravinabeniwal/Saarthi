"use client";

import { Mic, MicOff, GraduationCap, User } from "lucide-react";
import type { Participant } from "@/lib/types";
import VoiceIndicator from "./VoiceIndicator";
import { cn } from "@/lib/utils";

export default function ParticipantCard({ participant }: { participant: Participant }) {
  const isTeacher = participant.role === "teacher";
  return (
    <div
      className={cn(
        "glass relative flex flex-col items-center justify-center gap-2 rounded-2xl p-4 transition-all",
        participant.speaking && "shadow-glow ring-1 ring-cyan-400/40"
      )}
    >
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full text-sm font-semibold text-navy-950",
          participant.speaking && "animate-pulseSlow"
        )}
        style={{ backgroundColor: participant.avatarColor }}
      >
        {isTeacher ? <GraduationCap size={22} /> : <User size={20} />}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-navy-900">{participant.name}</p>
        <p className="text-[11px] uppercase tracking-wide text-mist/60">{participant.role}</p>
      </div>
      <div className="flex items-center gap-2">
        {participant.connected ? (
          participant.speaking ? <Mic size={12} className="text-cyan-600" /> : <MicOff size={12} className="text-mist/40" />
        ) : (
          <span className="text-[10px] text-rose-600">offline</span>
        )}
        <VoiceIndicator level={participant.audioLevel} active={participant.speaking} color={participant.avatarColor} size="sm" />
      </div>
    </div>
  );
}
