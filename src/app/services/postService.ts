import { apiRequest } from "./api";
import { CreatePostRequest } from "../types/post";

// 글 저장
export async function savePost(request: CreatePostRequest) {
  const payload = request;
  console.log("📦 savePost 요청 payload:", payload);

  const response = await apiRequest("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log("📥 글 저장 응답:", response);

  const postId = response?.result?.postId || response?.postId;
  if (!postId) {
    throw new Error("postId 응답이 없습니다.");
  }

  return { postId };
}

// 이메일 전송
export async function sendPostMail(email: string, postId: string) {
  const payload = { email, postId };
  console.log("📧 이메일 전송 요청 payload:", payload);

  const response = await apiRequest("/api/posts/send-mail", {   // ✅ 경로 수정!
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log("📥 이메일 전송 응답:", response);

  if (!response?.message?.includes("성공")) {
    throw new Error("메일 전송 실패");
  }

  return response;
}
