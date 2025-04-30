// src/app/api/generated-content/[id]/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";  // 타입 임포트만 유지 가능

/**
 * GET /api/generated-content/:id
 * Proxy to external generated-content API
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json(
      { error: "ID가 없습니다." },
      { status: 400 }
    );
  }

  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) {
    console.error("API base URL is not defined");
    return NextResponse.json(
      { error: "서버 설정 오류" },
      { status: 500 }
    );
  }

  let externalRes: Response;
  try {
    externalRes = await fetch(`${base}/generated-content/${id}`);
  } catch (err) {
    console.error("[Proxy] Network error:", err);
    return NextResponse.json(
      { error: "Network Error" },
      { status: 502 }
    );
  }

  const text = await externalRes.text();
  if (!externalRes.ok) {
    console.error(
      `[Proxy] External API Error ${externalRes.status}:`,
      text
    );
    return NextResponse.json(
      { error: text || externalRes.statusText },
      { status: externalRes.status }
    );
  }

  // 정상 응답
  let data;
  try {
    data = JSON.parse(text);
  } catch (parseErr) {
    console.error("[Proxy] JSON parse error:", parseErr);
    return NextResponse.json(
      { error: "Invalid JSON from external API" },
      { status: 502 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
