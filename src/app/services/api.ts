// 📌 공통 API 설정 파일
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"; // 환경 변수에서 API 기본 URL 가져옴

export async function apiRequest(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }
  return response.json();
}
