"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import LearningGapCard from "@/components/LearningGapCard";
import InsightChart from "@/components/InsightChart";
import { useSaarthiClassroom } from "@/hooks/useSaarthiClassroom";
import { formatDuration } from "@/lib/utils";

function InsightsInner() {
  const params = useSearchParams();
  const channel = params.get("channel") || "saarthi-demo";
  const topic = params.get("topic") || "Quadratic Equations";
  const c = useSaarthiClassroom(channel, topic);

  const studentsStruggling = new Set(
    c.gaps.flatMap((g) => Array.from({ length: g.studentsAffected }, (_, i) => `${g.id}-${i}`))
  ).size;
  const questionsAsked = c.transcript.filter((t) => t.tag === "question").length;
  const conceptData = c.gaps.map((g) => ({ label: g.concept, value: g.repeatedQuestions }));

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="font-display text-xl font-semibold text-navy-900">Learning-Gap Dashboard</h1>
          <p className="text-sm text-mist/60">Live insight into how the class is understanding {topic}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Students needing attention", value: studentsStruggling },
            { label: "Questions asked", value: questionsAsked },
            { label: "Saarthi interventions", value: c.interventions },
            { label: "Session duration", value: formatDuration(c.durationSeconds) },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5">
              <p className="font-display text-2xl font-semibold text-navy-900">{s.value}</p>
              <p className="mt-1 text-xs text-mist/60">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-3 text-sm font-medium text-mist/70">Difficult concepts</h2>
            <div className="space-y-3">
              {c.gaps.length === 0 && (
                <p className="text-sm text-mist/40">No learning gaps detected yet.</p>
              )}
              {c.gaps.map((gap) => (
                <LearningGapCard key={gap.id} gap={gap} />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <InsightChart title="Repeated questions by concept" data={conceptData.length ? conceptData : [{ label: "No data yet", value: 0 }]} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function InsightsPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <InsightsInner />
      </Suspense>
    </>
  );
}
