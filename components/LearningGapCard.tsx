"use client";

import { AlertTriangle } from "lucide-react";
import type { LearningGap } from "@/lib/types";
import { severityColor } from "@/lib/utils";

export default function LearningGapCard({ gap }: { gap: LearningGap }) {
  return (
    <div className={`glass rounded-2xl border p-4 ${severityColor(gap.severity)}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium">{gap.concept}</p>
            <p className="mt-1 text-xs opacity-70">
              {gap.studentsAffected} student{gap.studentsAffected !== 1 ? "s" : ""} struggling
            </p>
          </div>
        </div>
        <span className="rounded-full border border-current/30 px-2 py-0.5 text-[10px] uppercase tracking-wide">
          {gap.severity}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs opacity-70">
        <span>{gap.repeatedQuestions} repeated questions</span>
        <span>{gap.resolved ? "Resolved" : "Active"}</span>
      </div>
    </div>
  );
}
