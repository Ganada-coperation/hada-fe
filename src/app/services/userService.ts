import { apiRequest } from "./api";

// 닉네임 중복 확인 API 호출
export async function checkNickname(nickname: string) {
  return apiRequest(`/api/nickname?nickname=${nickname}`);
}
