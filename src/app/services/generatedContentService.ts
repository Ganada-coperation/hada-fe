
import { apiRequest } from "./api";

// generatedcontents 조회 API
export async function fetchGeneratedContentById(generatedPostId: string) {
  if (!generatedPostId) throw new Error("generatedPostId가 필요합니다.");

  const response = await apiRequest(`/generated-content/${generatedPostId}`, {
    method: "GET",
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!response.result) {
    throw new Error(`generatedPostId(${generatedPostId})에 해당하는 글이 없습니다.`);
  }

  return response.result;
}