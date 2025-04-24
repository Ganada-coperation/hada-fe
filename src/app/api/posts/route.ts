// src/app/api/posts/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // 클라이언트가 보낸 JSON 바디를 그대로 읽어서 외부 API로 전달
  const body = await request.json();
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;  // Vercel 환경변수

  const apiRes = await fetch(`${base}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!apiRes.ok) {
    // 외부 API 에러 내용을 그대로 넘겨주거나, 500으로 처리
    const err = await apiRes.text();
    return NextResponse.json({ message: err }, { status: apiRes.status });
  }

  const data = await apiRes.json();
  return NextResponse.json(data);
}
