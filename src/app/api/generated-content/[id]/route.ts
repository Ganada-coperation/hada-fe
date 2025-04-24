// src/app/api/generated-content/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;         // Vercel / .env.local 에 set
  const apiRes = await fetch(`${base}/generated-content/${id}`);

  if (!apiRes.ok) {
    return NextResponse.error();                              // 에러 시 500 반환
  }

  const data = await apiRes.json();
  return NextResponse.json(data);                            // 성공 시 JSON 반환
}
