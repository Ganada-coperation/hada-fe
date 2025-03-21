import { apiRequest } from "./api";

// 글 저장 API 호출
export async function savePost(nickname: string, title: string, content: string) {
  return apiRequest("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nickname, title, content }),
  });
}

