"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Classroom from "@/components/Classroom";

function LiveInner() {
  const params = useSearchParams();
  const channel = params.get("channel") || "saarthi-demo";
  const topic = params.get("topic") || "Quadratic Equations";

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Classroom channel={channel} lessonTopic={topic} />
      </div>
    </div>
  );
}

export default function LivePage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <LiveInner />
      </Suspense>
    </>
  );
}
