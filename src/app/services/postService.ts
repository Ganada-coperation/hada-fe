// ✅ src/app/services/postService.ts

import { apiRequest } from "./api";

// ✅ 글 저장 API 호출 (이메일 + 기분 추가)
export async function savePost(
  nickname: string,
  title: string,
  content: string,
  email: string,
  mood: string
) {
  const response = await apiRequest("/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nickname, title, content, email, mood }),
  });

  return response; // ✅ 반드시 응답 반환!
}

// ✅ 글 목록 조회 API 호출
export async function fetchPosts() {
  return apiRequest("/posts", { method: "GET" });
}


// ✅ 글 상세 조회 API 호출 추가
export async function fetchPostById(postId: string) {
  const response = await apiRequest(`/generated-content/${postId}`, {
    method: "GET",
  });
  return response.result;
}

