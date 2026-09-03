import type { SaarthiState, TranscriptEntry, LearningGap, Participant } from "./types";

// This drives the DEMO MODE fallback only. It is clearly separated from the
// real Agora path (lib/agora.ts + lib/agoraConversationalAI.ts) and the UI
// always labels it "DEMO MODE" — never presented as a real Agora session.

export interface DemoEvent {
  atMs: number;
  apply: (ctx: DemoContext) => void;
}

export interface DemoContext {
  setState: (s: SaarthiState) => void;
  addTranscript: (e: Omit<TranscriptEntry, "id" | "timestamp">) => void;
  addGap: (g: Omit<LearningGap, "id" | "detectedAt">) => void;
  setParticipantSpeaking: (name: string, speaking: boolean) => void;
  incrementIntervention: () => void;
  setDetectedConcept: (c: string) => void;
  setConfidence: (n: number) => void;
  setSuggestedResponse: (s: string) => void;
}

export const demoParticipants: Participant[] = [
  { id: "t1", name: "Ms. Rao", role: "teacher", speaking: false, connected: true, audioLevel: 0, avatarColor: "#3fe0d0" },
  { id: "s1", name: "Aarav", role: "student", speaking: false, connected: true, audioLevel: 0, avatarColor: "#7c9cff" },
  { id: "s2", name: "Diya", role: "student", speaking: false, connected: true, audioLevel: 0, avatarColor: "#ff9d7c" },
  { id: "s3", name: "Kabir", role: "student", speaking: false, connected: true, audioLevel: 0, avatarColor: "#c67cff" },
  { id: "saarthi", name: "Saarthi", role: "saarthi", speaking: false, connected: true, audioLevel: 0, avatarColor: "#22c7bd" },
];

export function buildDemoScript(): DemoEvent[] {
  return [
    {
      atMs: 500,
      apply: (ctx) => {
        ctx.setState("LISTENING");
        ctx.setParticipantSpeaking("Ms. Rao", true);
        ctx.addTranscript({
          speaker: "Ms. Rao",
          role: "teacher",
          text: "Today we are learning quadratic equations.",
          tag: "concept",
        });
        ctx.setDetectedConcept("Quadratic Equations");
      },
    },
    {
      atMs: 3200,
      apply: (ctx) => {
        ctx.setParticipantSpeaking("Ms. Rao", false);
        ctx.setState("UNDERSTANDING");
      },
    },
    {
      atMs: 5000,
      apply: (ctx) => {
        ctx.setParticipantSpeaking("Aarav", true);
        ctx.addTranscript({
          speaker: "Aarav",
          role: "student",
          text: "I don't understand how we get the roots.",
          tag: "question",
        });
      },
    },
    {
      atMs: 7000,
      apply: (ctx) => {
        ctx.setParticipantSpeaking("Aarav", false);
        ctx.setState("DETECTING_GAP");
        ctx.addTranscript({
          speaker: "Saarthi",
          role: "saarthi",
          text: "Learning gap detected: finding roots of a quadratic equation.",
          tag: "confusion",
        });
        ctx.addGap({
          concept: "Finding roots of quadratic equations",
          severity: "medium",
          studentsAffected: 1,
          repeatedQuestions: 1,
          resolved: false,
        });
        ctx.setConfidence(0.62);
      },
    },
    {
      atMs: 9000,
      apply: (ctx) => {
        ctx.setState("WAITING_FOR_PAUSE");
        ctx.setSuggestedResponse(
          "Simplify with a concrete example: which values make the equation equal zero."
        );
      },
    },
    {
      atMs: 11500,
      apply: (ctx) => {
        ctx.setState("SPEAKING");
        ctx.setParticipantSpeaking("Saarthi", true);
        ctx.setConfidence(0.88);
        ctx.addTranscript({
          speaker: "Saarthi",
          role: "saarthi",
          text: "Let's simplify this. Think of a quadratic equation as a question asking which values make the equation equal to zero.",
          tag: "intervention",
        });
        ctx.incrementIntervention();
      },
    },
    {
      atMs: 16000,
      apply: (ctx) => {
        ctx.setParticipantSpeaking("Saarthi", false);
        ctx.setState("LISTENING");
      },
    },
    {
      atMs: 18000,
      apply: (ctx) => {
        ctx.setParticipantSpeaking("Diya", true);
        ctx.addTranscript({
          speaker: "Diya",
          role: "student",
          text: "So the roots are just where the graph crosses zero?",
          tag: "question",
        });
      },
    },
    {
      atMs: 19800,
      apply: (ctx) => {
        ctx.setParticipantSpeaking("Diya", false);
        ctx.setState("UNDERSTANDING");
      },
    },
    {
      atMs: 21000,
      apply: (ctx) => {
        ctx.setParticipantSpeaking("Ms. Rao", true);
        ctx.addTranscript({
          speaker: "Ms. Rao",
          role: "teacher",
          text: "Exactly — now let's try factoring x squared minus 5x plus 6.",
          tag: "concept",
        });
      },
    },
    {
      atMs: 24000,
      apply: (ctx) => {
        ctx.setParticipantSpeaking("Ms. Rao", false);
        ctx.setState("LISTENING");
      },
    },
    {
      atMs: 26000,
      apply: (ctx) => {
        ctx.setParticipantSpeaking("Kabir", true);
        ctx.addTranscript({
          speaker: "Kabir",
          role: "student",
          text: "Wait, I'm lost again on the factoring part.",
          tag: "confusion",
        });
      },
    },
    {
      atMs: 27800,
      apply: (ctx) => {
        ctx.setParticipantSpeaking("Kabir", false);
        ctx.setState("DETECTING_GAP");
        ctx.addGap({
          concept: "Factoring quadratics",
          severity: "high",
          studentsAffected: 3,
          repeatedQuestions: 2,
          resolved: false,
        });
        ctx.setConfidence(0.71);
      },
    },
    {
      atMs: 29500,
      apply: (ctx) => {
        ctx.setState("WAITING_FOR_PAUSE");
        ctx.setSuggestedResponse(
          "Offer a step-by-step factoring walkthrough with two smaller numbers that multiply and add."
        );
      },
    },
    {
      atMs: 32000,
      apply: (ctx) => {
        ctx.setState("SPEAKING");
        ctx.setParticipantSpeaking("Saarthi", true);
        ctx.setConfidence(0.9);
        ctx.addTranscript({
          speaker: "Saarthi",
          role: "saarthi",
          text: "Look for two numbers that multiply to 6 and add to negative 5 — that's negative 2 and negative 3.",
          tag: "intervention",
        });
        ctx.incrementIntervention();
      },
    },
    {
      atMs: 37000,
      apply: (ctx) => {
        ctx.setParticipantSpeaking("Saarthi", false);
        ctx.setState("LISTENING");
      },
    },
  ];
}
