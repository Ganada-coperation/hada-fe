import { apiRequest } from "./api";

interface SendPostEmailResponse {
  message: string;
}

export async function sendPostEmail(email: string, postId: string): Promise<SendPostEmailResponse> {
  return await apiRequest("/posts/send-mail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, postId }),
  });
}
