"use client";

import { Clock, MessagesSquare, Users, Sparkles } from "lucide-react";
import { formatDuration } from "@/lib/utils";
import type { SessionStats } from "@/lib/types";

export default function SessionSummary({ stats }: { stats: SessionStats }) {
  const cards = [
    { icon: Clock, label: "Session duration", value: formatDuration(stats.durationSeconds) },
    { icon: Sparkles, label: "Saarthi interventions", value: stats.interventions },
    { icon: Users, label: "Students struggling", value: stats.studentsStruggling },
    { icon: MessagesSquare, label: "Questions answered", value: stats.questionsAnswered },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="glass rounded-2xl p-5">
          <c.icon size={18} className="mb-3 text-cyan-400" />
          <p className="font-display text-2xl font-semibold text-white">{c.value}</p>
          <p className="mt-1 text-xs text-mist/60">{c.label}</p>
        </div>
      ))}
    </div>
  );
}
