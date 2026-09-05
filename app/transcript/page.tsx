"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TranscriptPanel from "@/components/TranscriptPanel";
import { useSaarthiClassroom } from "@/hooks/useSaarthiClassroom";

function TranscriptInner() {
  const params = useSearchParams();
  const channel = params.get("channel") || "saarthi-demo";
  const topic = params.get("topic") || "Quadratic Equations";
  const c = useSaarthiClassroom(channel, topic);

  const counts = {
    concept: c.transcript.filter((t) => t.tag === "concept").length,
    question: c.transcript.filter((t) => t.tag === "question").length,
    confusion: c.transcript.filter((t) => t.tag === "confusion").length,
    intervention: c.transcript.filter((t) => t.tag === "intervention").length,
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-semibold text-navy-900">Live Transcript</h1>
            <p className="text-sm text-mist/60">Channel: {channel}</p>
          </div>
          <div className="flex gap-2 text-xs text-mist/60">
            <span className="rounded-full border border-navy-900/10 px-3 py-1">{counts.concept} concepts</span>
            <span className="rounded-full border border-navy-900/10 px-3 py-1">{counts.question} questions</span>
            <span className="rounded-full border border-navy-900/10 px-3 py-1">{counts.confusion} confusion</span>
            <span className="rounded-full border border-navy-900/10 px-3 py-1">{counts.intervention} interventions</span>
          </div>
        </div>
        <div className="glass h-[calc(100vh-220px)] rounded-2xl p-5">
          <TranscriptPanel entries={c.transcript} />
        </div>
      </main>
    </div>
  );
}

export default function TranscriptPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <TranscriptInner />
      </Suspense>
    </>
  );
}
