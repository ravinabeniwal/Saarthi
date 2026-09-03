"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SessionSummary from "@/components/SessionSummary";
import TranscriptPanel from "@/components/TranscriptPanel";
import { useSaarthiClassroom } from "@/hooks/useSaarthiClassroom";

function SummaryInner() {
  const params = useSearchParams();
  const channel = params.get("channel") || "saarthi-demo";
  const topic = params.get("topic") || "Quadratic Equations";
  const c = useSaarthiClassroom(channel, topic);

  const studentsStruggling = new Set(
    c.gaps.flatMap((g) => Array.from({ length: g.studentsAffected }, (_, i) => `${g.id}-${i}`))
  ).size;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-semibold text-white">Session Summary</h1>
            <p className="text-sm text-mist/60">{topic} · Channel {channel}</p>
          </div>
          <Link
            href="/classroom"
            className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-navy-950"
          >
            New Classroom
          </Link>
        </div>

        <SessionSummary
          stats={{
            durationSeconds: c.durationSeconds,
            interventions: c.interventions,
            questionsAnswered: c.transcript.filter((t) => t.tag === "question").length,
            studentsStruggling,
            activeGaps: c.gaps,
            transcript: c.transcript,
          }}
        />

        <div>
          <h2 className="mb-3 text-sm font-medium text-mist/70">Full session transcript</h2>
          <div className="glass max-h-[420px] rounded-2xl p-5">
            <TranscriptPanel entries={c.transcript} autoScroll={false} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SummaryPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <SummaryInner />
      </Suspense>
    </>
  );
}
