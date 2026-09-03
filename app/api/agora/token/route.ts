import { NextRequest, NextResponse } from "next/server";
import { RtcTokenBuilder, RtcRole } from "agora-token";

// Never expose AGORA_APP_CERTIFICATE to the client — token minting always
// happens server-side.
export async function POST(req: NextRequest) {
  const { channel, uid } = await req.json();
  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;

  if (!appId || !appCertificate) {
    return NextResponse.json(
      { token: null, reason: "AGORA_APP_ID/AGORA_APP_CERTIFICATE not set — demo mode" },
      { status: 200 }
    );
  }
  if (!channel) {
    return NextResponse.json({ error: "channel is required" }, { status: 400 });
  }

  const expireSeconds = 3600;
  const currentTs = Math.floor(Date.now() / 1000);
  const privilegeExpireTs = currentTs + expireSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channel,
    Number(uid) || 0,
    RtcRole.PUBLISHER,
    expireSeconds,
    privilegeExpireTs
  );

  return NextResponse.json({ token });
}
