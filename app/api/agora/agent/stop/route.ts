import { NextRequest, NextResponse } from "next/server";
import { isConvoAIConfigured, stopSaarthiAgent } from "@/lib/agoraConversationalAI";

export async function POST(req: NextRequest) {
  if (!isConvoAIConfigured()) {
    return NextResponse.json({ stopped: false, reason: "demo mode active" }, { status: 200 });
  }
  try {
    const { agentId } = await req.json();
    if (!agentId) return NextResponse.json({ error: "agentId is required" }, { status: 400 });
    await stopSaarthiAgent(agentId);
    return NextResponse.json({ stopped: true });
  } catch (err: any) {
    return NextResponse.json({ stopped: false, error: err.message }, { status: 500 });
  }
}
