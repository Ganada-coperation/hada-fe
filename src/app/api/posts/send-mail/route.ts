// src/app/api/posts/send-mail/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // 클라이언트로부터 받은 바디(JSON)를 외부 API로 그대로 전달
  const body = await request.json();
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;

  const apiRes = await fetch(`${base}/posts/send-mail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!apiRes.ok) {
    const errText = await apiRes.text();
    return NextResponse.json(
      { message: errText },
      { status: apiRes.status }
    );
  }

  const data = await apiRes.json();
  return NextResponse.json(data);
}
