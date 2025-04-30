// src/app/api/generated-content/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";

/**
 * GET /api/generated-content/:id
 * Proxy to external generated-content API
 */
export async function GET(request: NextRequest) {
  // 1) 요청 URL에서 pathname 뽑기
  const url = new URL(request.url);
  // 2) 빈 문자열 제거 후 마지막 세그먼트를 ID로 사용
  const segments = url.pathname.split("/").filter(Boolean);
  const id = segments.pop();
  if (!id) {
    return NextResponse.json({ error: "ID가 없습니다." }, { status: 400 });
  }

  // 3) 실제 외부 API로 프록시 호출
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
