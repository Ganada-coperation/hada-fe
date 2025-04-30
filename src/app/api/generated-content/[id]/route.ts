// src/app/api/generated-content/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const id = params.id!;
  const base = process.env.API_BASE_URL!; // 서버 전용 env 사용 권장
  let apiRes: Response;

  try {
    apiRes = await fetch(`${base}/generated-content/${id}`);
  } catch (e) {
    console.error("[Proxy] Network error:", e);
    return NextResponse.json({ error: "Network Error" }, { status: 502 });
  }

  const text = await apiRes.text();
  if (!apiRes.ok) {
    console.error(`[Proxy] External API ${apiRes.status}:`, text);
    return NextResponse.json({ error: text || apiRes.statusText }, { status: apiRes.status });
  }

  // 정상이라면 JSON으로 파싱 후 그대로 내려줍니다
  const data = JSON.parse(text);
  return NextResponse.json(data, { status: 200 });
}
