"use client";

import ParticipantCard from "./ParticipantCard";
import SaarthiAgent from "./SaarthiAgent";
import TeacherControls from "./TeacherControls";
import ConnectionStatus from "./ConnectionStatus";
import { useSaarthiClassroom } from "@/hooks/useSaarthiClassroom";

export default function Classroom({
  channel,
  lessonTopic,
}: {
  channel: string;
  lessonTopic: string;
}) {
  const c = useSaarthiClassroom(channel, lessonTopic);
  const activeGap = c.gaps.find((g) => !g.resolved) || null;

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col gap-4 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold text-white">{lessonTopic}</h1>
          <p className="text-sm text-mist/60">Channel: {channel}</p>
        </div>
        <ConnectionStatus status={c.connectionStatus} mode={c.mode} />
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-[1fr_320px]">
        <div className="glass flex flex-col gap-4 overflow-y-auto rounded-2xl p-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {c.participants.map((p) => (
              <ParticipantCard key={p.id} participant={p} />
            ))}
          </div>
        </div>

        <div className="min-h-0">
          <SaarthiAgent
            state={c.saarthiState}
            lessonTopic={lessonTopic}
            detectedConcept={c.detectedConcept}
            activeGap={activeGap}
            confidence={c.confidence}
            suggestedResponse={c.paused ? "" : c.suggestedResponse}
          />
        </div>
      </div>

      <TeacherControls
        muted={c.muted}
        paused={c.paused}
        onMuteSaarthi={c.muteSaarthi}
        onPauseSaarthi={c.pauseSaarthi}
        onResumeSaarthi={c.resumeSaarthi}
        onToggleLocalMic={c.toggleLocalMic}
      />
    </div>
  );
}
