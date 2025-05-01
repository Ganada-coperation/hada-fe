// src/app/services/generatedContentService.ts
import { apiRequest } from "./api";

export async function fetchGeneratedContentById(id: string) {
  if (!id) throw new Error("generatedPostId가 필요합니다.");

  const res = await fetch(`/api/generated-content/${id}`, {
    cache: "no-store",
    credentials: "omit",
  });
  if (!res.ok) {
    throw new Error(`생성된 콘텐츠 불러오기 실패: ${res.status}`);
  }
  const { result } = await res.json();
  return result;
}

