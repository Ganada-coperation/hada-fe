// src/app/api/generated-content/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Now Next.js will accept this signature
  const { id } = params;
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const apiRes = await fetch(`${base}/generated-content/${id}`);
  if (!apiRes.ok) return NextResponse.error();
  const data = await apiRes.json();
  return NextResponse.json(data);
}
