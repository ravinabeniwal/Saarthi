"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";

export default function CreateClassroom() {
  const router = useRouter();
  const [teacherName, setTeacherName] = useState("");
  const [lessonTopic, setLessonTopic] = useState("Quadratic Equations");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const channel = `saarthi-${Math.random().toString(36).slice(2, 8)}`;
    const params = new URLSearchParams({
      channel,
      role: "teacher",
      name: teacherName || "Teacher",
      topic: lessonTopic,
    });
    router.push(`/live?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="glass-strong flex flex-col gap-4 rounded-2xl p-6">
      <div className="flex items-center gap-2 text-cyan-400">
        <GraduationCap size={18} />
        <h3 className="font-display text-base font-semibold text-white">Create classroom</h3>
      </div>
      <label className="text-sm text-mist">
        Your name
        <input
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          placeholder="Ms. Rao"
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
        />
      </label>
      <label className="text-sm text-mist">
        Lesson topic
        <input
          value={lessonTopic}
          onChange={(e) => setLessonTopic(e.target.value)}
          placeholder="Quadratic Equations"
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
        />
      </label>
      <button
        type="submit"
        className="mt-2 rounded-full bg-cyan-500 py-2.5 text-sm font-medium text-navy-950 transition-transform hover:scale-[1.02]"
      >
        Start Classroom
      </button>
    </form>
  );
}
