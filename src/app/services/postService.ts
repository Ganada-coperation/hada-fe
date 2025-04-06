import { apiRequest } from "./api";

// ✅ 글 저장 API 호출 (이메일 + 기분 추가)
export async function savePost(
  nickname: string,
  title: string,
  content: string,
  email: string,
  mood: string
) {
  return apiRequest("/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nickname,
      title,
      content,
      email,
      mood,
    }),
  });
}

// ✅ 글 목록 조회 API 호출
export async function fetchPosts() {
  return apiRequest("/posts", {
    method: "GET",
  });
}
