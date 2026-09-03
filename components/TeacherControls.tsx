"use client";

import { useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, VolumeX, Pause, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function TeacherControls({
  muted,
  paused,
  onMuteSaarthi,
  onPauseSaarthi,
  onResumeSaarthi,
  onToggleLocalMic,
}: {
  muted: boolean;
  paused: boolean;
  onMuteSaarthi: () => void;
  onPauseSaarthi: () => void;
  onResumeSaarthi: () => void;
  onToggleLocalMic?: (muted: boolean) => void;
}) {
  const router = useRouter();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  const btn = "flex h-11 w-11 items-center justify-center rounded-full transition-colors";

  return (
    <div className="glass-strong flex flex-wrap items-center justify-center gap-3 rounded-2xl p-3">
      <button
        onClick={() => {
          setMicOn((v) => !v);
          onToggleLocalMic?.(micOn);
        }}
        className={cn(btn, micOn ? "bg-white/10 text-white" : "bg-rose-500/20 text-rose-300")}
        aria-label="Toggle microphone"
      >
        {micOn ? <Mic size={18} /> : <MicOff size={18} />}
      </button>
      <button
        onClick={() => setCamOn((v) => !v)}
        className={cn(btn, camOn ? "bg-white/10 text-white" : "bg-rose-500/20 text-rose-300")}
        aria-label="Toggle camera"
      >
        {camOn ? <Video size={18} /> : <VideoOff size={18} />}
      </button>

      <div className="mx-1 h-8 w-px bg-white/10" />

      <button
        onClick={onMuteSaarthi}
        className={cn(btn, muted ? "bg-rose-500/20 text-rose-300" : "bg-white/10 text-white")}
        aria-label="Mute Saarthi"
        title="Mute Saarthi"
      >
        <VolumeX size={18} />
      </button>
      <button
        onClick={onPauseSaarthi}
        className={cn(btn, paused ? "bg-amber-400/20 text-amber-300" : "bg-white/10 text-white")}
        aria-label="Pause Saarthi"
        title="Pause Saarthi"
      >
        <Pause size={18} />
      </button>
      <button
        onClick={onResumeSaarthi}
        className={cn(btn, "bg-cyan-400/20 text-cyan-300")}
        aria-label="Resume / allow Saarthi to speak"
        title="Resume Saarthi"
      >
        <Play size={18} />
      </button>

      <div className="mx-1 h-8 w-px bg-white/10" />

      <button
        onClick={() => router.push("/summary")}
        className={cn(btn, "bg-rose-500 text-white hover:bg-rose-600")}
        aria-label="Leave classroom"
        title="Leave"
      >
        <PhoneOff size={18} />
      </button>
    </div>
  );
}
