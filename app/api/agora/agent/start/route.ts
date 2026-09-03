import { NextRequest, NextResponse } from "next/server";
import { isConvoAIConfigured, startSaarthiAgent } from "@/lib/agoraConversationalAI";

export async function POST(req: NextRequest) {
  if (!isConvoAIConfigured()) {
    return NextResponse.json(
      { started: false, reason: "Conversational AI not configured — demo mode active" },
      { status: 200 }
    );
  }

  try {
    const { channel, token, remoteRtcUids, lessonTopic } = await req.json();
    if (!channel || !token) {
      return NextResponse.json({ error: "channel and token are required" }, { status: 400 });
    }
    const result = await startSaarthiAgent({
      channel,
      token,
      remoteRtcUids: remoteRtcUids || [],
      lessonTopic: lessonTopic || "the current lesson",
    });
    return NextResponse.json({ started: true, agent: result });
  } catch (err: any) {
    return NextResponse.json({ started: false, error: err.message }, { status: 500 });
  }
}
