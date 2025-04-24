// src/app/api/generated-content/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { id: string } }      // ← 여기에 타입을 명시!
) {
  const { id } = context.params;
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const apiRes = await fetch(`${base}/generated-content/${id}`);
  if (!apiRes.ok) return NextResponse.error();
  const data = await apiRes.json();
  return NextResponse.json(data);
}
