"use client";

// Thin wrapper around agora-rtc-sdk-ng.
// This is the REAL Agora RTC integration path — the client joins the same
// channel the Conversational AI agent joins server-side (see
// lib/agoraConversationalAI.ts + app/api/agora/agent/start).

import type {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";

export const AGORA_APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID || "";
export const isAgoraConfigured = () => Boolean(AGORA_APP_ID);

export interface AgoraSessionHandlers {
  onRemoteUserJoined?: (user: IAgoraRTCRemoteUser) => void;
  onRemoteUserLeft?: (user: IAgoraRTCRemoteUser) => void;
  onVolumeIndicator?: (
    levels: { uid: string | number; level: number }[]
  ) => void;
  onNetworkQuality?: (quality: { uplink: number; downlink: number }) => void;
}

export class AgoraSession {
  private client: IAgoraRTCClient | null = null;
  private localAudioTrack: IMicrophoneAudioTrack | null = null;
  private AgoraRTC: typeof import("agora-rtc-sdk-ng").default | null = null;

  async join(
    channel: string,
    uid: string | number,
    token: string | null,
    handlers: AgoraSessionHandlers = {}
  ) {
    const mod = await import("agora-rtc-sdk-ng");
    this.AgoraRTC = mod.default;
    this.client = this.AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    this.client.on("user-joined", (user) => handlers.onRemoteUserJoined?.(user));
    this.client.on("user-left", (user) => handlers.onRemoteUserLeft?.(user));
    this.client.on("network-quality", (stats) =>
      handlers.onNetworkQuality?.({
        uplink: stats.uplinkNetworkQuality,
        downlink: stats.downlinkNetworkQuality,
      })
    );
    this.client.enableAudioVolumeIndicator();
    this.client.on("volume-indicator", (volumes) => {
      handlers.onVolumeIndicator?.(
        volumes.map((v) => ({ uid: v.uid, level: v.level / 100 }))
      );
    });

    await this.client.join(AGORA_APP_ID, channel, token, uid);
    this.localAudioTrack = await this.AgoraRTC.createMicrophoneAudioTrack();
    await this.client.publish([this.localAudioTrack]);
    return this.client;
  }

  setMicMuted(muted: boolean) {
    this.localAudioTrack?.setMuted(muted);
  }

  async leave() {
    this.localAudioTrack?.close();
    await this.client?.leave();
    this.client = null;
    this.localAudioTrack = null;
  }
}

export async function fetchRtcToken(channel: string, uid: string | number) {
  const res = await fetch("/api/agora/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ channel, uid }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.token as string | null;
}
