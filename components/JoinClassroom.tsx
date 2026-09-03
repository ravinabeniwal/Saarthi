"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";

export default function JoinClassroom() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("");
  const [channel, setChannel] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      channel: channel || "saarthi-demo",
      role: "student",
      name: studentName || "Student",
      topic: "Quadratic Equations",
    });
    router.push(`/live?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="glass-strong flex flex-col gap-4 rounded-2xl p-6">
      <div className="flex items-center gap-2 text-cyan-400">
        <Users size={18} />
        <h3 className="font-display text-base font-semibold text-white">Join classroom</h3>
      </div>
      <label className="text-sm text-mist">
        Your name
        <input
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Aarav"
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
        />
      </label>
      <label className="text-sm text-mist">
        Classroom code
        <input
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          placeholder="saarthi-ab12cd"
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
        />
      </label>
      <button
        type="submit"
        className="mt-2 rounded-full border border-cyan-400/40 py-2.5 text-sm font-medium text-cyan-300 transition-colors hover:bg-cyan-400/10"
      >
        Join Classroom
      </button>
    </form>
  );
}
