"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getRoomStore } from "@/lib/roomStore";

// Thin reactive wrapper around the RoomStore singleton (lib/roomStore.ts) so
// /live, /transcript, /insights, and /summary all read the same live session
// state, whether it's real Agora ("live") or the scripted fallback ("demo").
export function useSaarthiClassroom(channel: string, lessonTopic: string) {
  const store = getRoomStore(channel, lessonTopic);

  useEffect(() => {
    store.ensureBooted();
    // Intentionally not tearing down on unmount: the room should keep
    // running while the user navigates between /live, /transcript,
    // /insights and /summary within the same session.
  }, [store]);

  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const durationSeconds = Math.floor((Date.now() - state.sessionStart) / 1000);

  return {
    ...state,
    durationSeconds,
    muteSaarthi: store.muteSaarthi,
    pauseSaarthi: store.pauseSaarthi,
    resumeSaarthi: store.resumeSaarthi,
    toggleLocalMic: store.toggleLocalMic,
  };
}
