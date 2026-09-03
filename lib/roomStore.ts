"use client";

import { AgoraSession, fetchRtcToken, isAgoraConfigured } from "./agora";
import { buildDemoScript, demoParticipants } from "./demoEngine";
import type {
  ConnectionMode,
  LearningGap,
  Participant,
  SaarthiState,
  TranscriptEntry,
} from "./types";

let idCounter = 0;
const nextId = (prefix: string) => `${prefix}-${Date.now()}-${idCounter++}`;

export interface RoomState {
  channel: string;
  lessonTopic: string;
  mode: ConnectionMode;
  connectionStatus: "connecting" | "connected" | "disconnected";
  participants: Participant[];
  saarthiState: SaarthiState;
  muted: boolean;
  paused: boolean;
  transcript: TranscriptEntry[];
  gaps: LearningGap[];
  interventions: number;
  detectedConcept: string;
  confidence: number;
  suggestedResponse: string;
  sessionStart: number;
}

type Listener = () => void;

class RoomStore {
  private state: RoomState;
  private listeners = new Set<Listener>();
  private booted = false;
  private timeouts: ReturnType<typeof setTimeout>[] = [];
  private session: AgoraSession | null = null;
  private agentId: string | null = null;
  private rawSaarthiState: SaarthiState = "LISTENING";

  constructor(channel: string, lessonTopic: string) {
    this.state = {
      channel,
      lessonTopic,
      mode: "demo",
      connectionStatus: "connecting",
      participants: demoParticipants,
      saarthiState: "LISTENING",
      muted: false,
      paused: false,
      transcript: [],
      gaps: [],
      interventions: 0,
      detectedConcept: lessonTopic,
      confidence: 0.5,
      suggestedResponse: "",
      sessionStart: Date.now(),
    };
  }

  getSnapshot = () => this.state;

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private emit() {
    this.state = { ...this.state };
    this.listeners.forEach((l) => l());
  }

  private patch(partial: Partial<RoomState>) {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach((l) => l());
  }

  private setSaarthiRaw(s: SaarthiState) {
    this.rawSaarthiState = s;
    if (!this.state.muted) this.patch({ saarthiState: s });
  }

  ensureBooted() {
    if (this.booted) return;
    this.booted = true;
    this.boot();
  }

  private setParticipantSpeaking(name: string, speaking: boolean) {
    this.patch({
      participants: this.state.participants.map((p) =>
        p.name === name ? { ...p, speaking, audioLevel: speaking ? 0.7 : 0 } : p
      ),
    });
  }

  private addTranscript(e: Omit<TranscriptEntry, "id" | "timestamp">) {
    this.patch({
      transcript: [...this.state.transcript, { ...e, id: nextId("t"), timestamp: Date.now() }],
    });
  }

  private addGap(g: Omit<LearningGap, "id" | "detectedAt">) {
    this.patch({ gaps: [{ ...g, id: nextId("g"), detectedAt: Date.now() }, ...this.state.gaps] });
  }

  private runDemo() {
    const ctx = {
      setState: (s: SaarthiState) => this.setSaarthiRaw(s),
      addTranscript: (e: Omit<TranscriptEntry, "id" | "timestamp">) => this.addTranscript(e),
      addGap: (g: Omit<LearningGap, "id" | "detectedAt">) => this.addGap(g),
      setParticipantSpeaking: (n: string, s: boolean) => this.setParticipantSpeaking(n, s),
      incrementIntervention: () => this.patch({ interventions: this.state.interventions + 1 }),
      setDetectedConcept: (c: string) => this.patch({ detectedConcept: c }),
      setConfidence: (n: number) => this.patch({ confidence: n }),
      setSuggestedResponse: (s: string) => this.patch({ suggestedResponse: s }),
    };
    const script = buildDemoScript();
    script.forEach((event) => {
      this.timeouts.push(setTimeout(() => event.apply(ctx), event.atMs));
    });
    const loopMs = script[script.length - 1].atMs + 8000;
    this.timeouts.push(setTimeout(() => this.runDemo(), loopMs));
  }

  private async boot() {
    if (!isAgoraConfigured()) {
      this.patch({ mode: "demo", connectionStatus: "connected" });
      this.runDemo();
      return;
    }
    try {
      const uid = Math.floor(Math.random() * 100000);
      const token = await fetchRtcToken(this.state.channel, uid);
      if (!token) {
        this.patch({ mode: "demo", connectionStatus: "connected" });
        this.runDemo();
        return;
      }
      const session = new AgoraSession();
      this.session = session;
      await session.join(this.state.channel, uid, token, {
        onVolumeIndicator: (levels) => {
          this.patch({
            participants: this.state.participants.map((p) => {
              const match = levels.find((l) => String(l.uid) === p.id);
              return match ? { ...p, audioLevel: match.level, speaking: match.level > 0.15 } : p;
            }),
          });
        },
      });

      const agentRes = await fetch("/api/agora/agent/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: this.state.channel,
          token,
          remoteRtcUids: [String(uid)],
          lessonTopic: this.state.lessonTopic,
        }),
      }).then((r) => r.json());

      if (agentRes.started) {
        this.agentId = agentRes.agent.agent_id;
        this.patch({ mode: "live", connectionStatus: "connected" });
      } else {
        this.patch({ mode: "demo", connectionStatus: "connected" });
        this.runDemo();
      }
    } catch (err) {
      console.error("Agora join failed, falling back to demo:", err);
      this.patch({ mode: "demo", connectionStatus: "connected" });
      this.runDemo();
    }
  }

  muteSaarthi = () => this.patch({ muted: true, saarthiState: "MUTED" });
  resumeSaarthi = () => {
    this.patch({ muted: false, paused: false, saarthiState: this.rawSaarthiState });
  };
  pauseSaarthi = () => this.patch({ paused: true });
  toggleLocalMic = (muted: boolean) => this.session?.setMicMuted(muted);

  teardown() {
    this.timeouts.forEach(clearTimeout);
    this.session?.leave();
    if (this.agentId) {
      fetch("/api/agora/agent/stop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: this.agentId }),
      }).catch(() => {});
    }
  }
}

const rooms = new Map<string, RoomStore>();

export function getRoomStore(channel: string, lessonTopic: string) {
  let room = rooms.get(channel);
  if (!room) {
    room = new RoomStore(channel, lessonTopic);
    rooms.set(channel, room);
  }
  return room;
}
