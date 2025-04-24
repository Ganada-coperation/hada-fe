// src/app/services/generatedContentService.ts
import { apiRequest } from "./api";

export async function fetchGeneratedContentById(id: string) {
  if (!id) throw new Error("generatedPostId가 필요합니다.");

  // ▶️ 여기만 바뀝니다: 절대경로 /api/… 만 사용
  const response = await apiRequest(`/api/generated-content/${id}`, {
    method: "GET",
    cache: "no-store",
    next: { revalidate: 0 },
    // credentials 설정이 기본(include)일 수 있으니,
    // 필요없다면 omit으로 바꿔도 좋습니다.
    credentials: "omit",
  });

  if (!response.result) {
    throw new Error(`generatedPostId(${id})에 해당하는 글이 없습니다.`);
  }
  return response.result;
}
