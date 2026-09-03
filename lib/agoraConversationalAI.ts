// Server-only. Calls the official Agora Conversational AI Engine REST API
// to start/stop the Saarthi agent in a channel using Agora-managed
// STT (Deepgram) / LLM (OpenAI) / TTS (MiniMax) — per
// https://docs.agora.io/en/ai/build/start-stop-agent

const AREA = process.env.AGORA_CONVOAI_AREA || "na";
const BASE = `https://api.agora.io/api/conversational-ai-agent/v2/projects`;

function requireEnv() {
  const appId = process.env.AGORA_APP_ID;
  const basicAuth = process.env.AGORA_CONVOAI_BASIC_AUTH;
  if (!appId || !basicAuth) return null;
  return { appId, basicAuth };
}

export function isConvoAIConfigured() {
  return Boolean(requireEnv());
}

export interface StartAgentParams {
  channel: string;
  token: string;
  remoteRtcUids: string[];
  lessonTopic: string;
  agentUid?: string;
}

export async function startSaarthiAgent(params: StartAgentParams) {
  const env = requireEnv();
  if (!env) throw new Error("AGORA_APP_ID / AGORA_CONVOAI_BASIC_AUTH not configured");
  const { appId, basicAuth } = env;

  const systemPrompt = [
    "You are Saarthi, an AI co-teacher listening silently in a live classroom.",
    `The current lesson topic is: ${params.lessonTopic}.`,
    "Only speak when a student shows clear confusion or asks a direct question,",
    "and only after the teacher pauses. Never interrupt the teacher.",
    "Keep responses short, concrete, and use a simpler example than the teacher used.",
  ].join(" ");

  const body = {
    name: `saarthi-${params.channel}-${Date.now()}`,
    properties: {
      channel: params.channel,
      token: params.token,
      agent_rtc_uid: params.agentUid || "0",
      remote_rtc_uids: params.remoteRtcUids,
      enable_string_uid: false,
      idle_timeout: 600,
      asr: {
        credential_mode: "managed",
        vendor: "deepgram",
        params: {
          url: "wss://api.deepgram.com/v1/listen",
          model: "nova-3",
          language: "en-US",
        },
      },
      llm: {
        credential_mode: "managed",
        vendor: "openai",
        style: "openai",
        url: "https://api.openai.com/v1/chat/completions",
        system_messages: [{ role: "system", content: systemPrompt }],
        greeting_message: "",
        failure_message: "Let's come back to that in a moment.",
        max_history: 20,
        params: { model: "gpt-4o-mini" },
      },
      tts: {
        credential_mode: "managed",
        vendor: "minimax",
        params: {
          url: "wss://api.minimax.io/ws/v1/t2a_v2",
          model: "speech-2.6-turbo",
          voice_setting: { voice_id: "English_captivating_female1" },
        },
      },
    },
  };

  const res = await fetch(`${BASE}/${appId}/join`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Agora Conversational AI join failed (${res.status}): ${text}`);
  }
  return res.json() as Promise<{ agent_id: string; create_ts: number; status: string }>;
}

export async function stopSaarthiAgent(agentId: string) {
  const env = requireEnv();
  if (!env) throw new Error("AGORA_APP_ID / AGORA_CONVOAI_BASIC_AUTH not configured");
  const { appId, basicAuth } = env;

  const res = await fetch(`${BASE}/${appId}/agents/${agentId}/leave`, {
    method: "POST",
    headers: { Authorization: `Basic ${basicAuth}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Agora Conversational AI leave failed (${res.status}): ${text}`);
  }
  return res.json();
}
