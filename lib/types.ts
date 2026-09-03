export type SaarthiState =
  | "LISTENING"
  | "UNDERSTANDING"
  | "DETECTING_GAP"
  | "WAITING_FOR_PAUSE"
  | "SPEAKING"
  | "MUTED";

export type Role = "teacher" | "student" | "saarthi";

export interface Participant {
  id: string;
  name: string;
  role: Role;
  speaking: boolean;
  connected: boolean;
  audioLevel: number; // 0-1
  avatarColor: string;
}

export interface TranscriptEntry {
  id: string;
  speaker: string;
  role: Role;
  text: string;
  timestamp: number;
  tag?: "concept" | "question" | "confusion" | "intervention";
}

export interface LearningGap {
  id: string;
  concept: string;
  severity: "low" | "medium" | "high";
  studentsAffected: number;
  repeatedQuestions: number;
  detectedAt: number;
  resolved: boolean;
}

export interface SessionStats {
  durationSeconds: number;
  interventions: number;
  questionsAnswered: number;
  studentsStruggling: number;
  activeGaps: LearningGap[];
  transcript: TranscriptEntry[];
}

export interface ClassroomConfig {
  channelName: string;
  teacherName: string;
  role: "teacher" | "student";
  lessonTopic: string;
}

export type ConnectionMode = "live" | "demo";
