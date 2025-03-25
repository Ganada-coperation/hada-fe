import { apiRequest } from "./api";

// 뉴스레터 구독 API 호출
export async function subscribeNewsletter(email: string) {
  return apiRequest("/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}