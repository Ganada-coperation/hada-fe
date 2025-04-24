// src/app/api/generated-content/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // 1) 요청 URL에서 pathname 뽑기
  const url = new URL(request.url);
  // 2) 경로를 '/'로 자른 뒤 마지막 세그먼트를 ID로 사용
  const segments = url.pathname.split("/");
  const id = segments.pop();
  if (!id) {
    return NextResponse.error();
  }

  // 3) 실제 외부 API로 프록시 호출
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const apiRes = await fetch(`${base}/generated-content/${id}`, {
    // 필요하다면 이곳에 credentials/options 추가
  });
  if (!apiRes.ok) {
    return NextResponse.error();
  }

  const data = await apiRes.json();
  return NextResponse.json(data);
}
