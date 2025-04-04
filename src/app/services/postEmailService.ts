import { apiRequest } from "./api";

interface SendPostEmailResponse {
    success: boolean;
    message?: string;
  }
  
  export async function sendPostEmail(email: string, postContent: string): Promise<SendPostEmailResponse> {
    return await apiRequest("/send-post-email", {
      method: "POST",
      body: JSON.stringify({
        email,
        postContent,
      }),
    });
  }
  