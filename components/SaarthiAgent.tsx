"use client";

import { BookOpen, Target, Gauge, MessageSquareText } from "lucide-react";
import type { LearningGap, SaarthiState } from "@/lib/types";
import AIStatus from "./AIStatus";
import { severityColor } from "@/lib/utils";

export default function SaarthiAgent({
  state,
  lessonTopic,
  detectedConcept,
  activeGap,
  confidence,
  suggestedResponse,
}: {
  state: SaarthiState;
  lessonTopic: string;
  detectedConcept: string;
  activeGap: LearningGap | null;
  confidence: number;
  suggestedResponse: string;
}) {
  return (
    <div className="glass-strong flex h-full flex-col gap-4 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-white">Saarthi AI</h3>
      </div>

      <AIStatus state={state} />

      <div className="flex items-start gap-3 text-sm">
        <BookOpen size={16} className="mt-0.5 shrink-0 text-cyan-400" />
        <div>
          <p className="text-[11px] uppercase tracking-wide text-mist/50">Current lesson</p>
          <p className="text-mist">{lessonTopic}</p>
        </div>
      </div>

      <div className="flex items-start gap-3 text-sm">
        <Target size={16} className="mt-0.5 shrink-0 text-cyan-400" />
        <div>
          <p className="text-[11px] uppercase tracking-wide text-mist/50">Detected concept</p>
          <p className="text-mist">{detectedConcept}</p>
        </div>
      </div>

      {activeGap && (
        <div className={`rounded-xl border p-3 ${severityColor(activeGap.severity)}`}>
          <p className="text-[11px] uppercase tracking-wide opacity-70">Learning gap</p>
          <p className="text-sm font-medium">{activeGap.concept}</p>
          <p className="mt-1 text-xs opacity-80">
            {activeGap.studentsAffected} student{activeGap.studentsAffected !== 1 ? "s" : ""} affected ·{" "}
            {activeGap.repeatedQuestions} repeated question{activeGap.repeatedQuestions !== 1 ? "s" : ""}
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 text-sm">
        <Gauge size={16} className="shrink-0 text-cyan-400" />
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wide text-mist/50">
            <span>AI confidence</span>
            <span>{Math.round(confidence * 100)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-cyan-400 transition-all duration-500"
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
        </div>
      </div>

      {suggestedResponse && (
        <div className="mt-auto flex items-start gap-3 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3 text-sm">
          <MessageSquareText size={16} className="mt-0.5 shrink-0 text-cyan-300" />
          <div>
            <p className="text-[11px] uppercase tracking-wide text-cyan-300/70">Suggested response</p>
            <p className="text-mist">{suggestedResponse}</p>
          </div>
        </div>
      )}
    </div>
  );
}
