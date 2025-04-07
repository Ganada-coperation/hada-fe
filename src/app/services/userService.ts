import { apiRequest } from "./api";

export async function checkNickname(nickname: string) {
  return apiRequest(`/nickname?nickname=${nickname}`, {
    method: "GET",
  });
}
