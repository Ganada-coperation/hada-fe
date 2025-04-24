// src/app/services/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // 1) 내부 API 프록시 여부 판단
  const isInternal = endpoint.startsWith("/api/");
  const url = isInternal ? endpoint : `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      // 2) credentials/​mode 분기
      credentials: isInternal ? "same-origin" : "include",
      ...(isInternal
        ? {}            // 내부는 mode 지정 안 함 (기본 same-origin)
        : { mode: "cors" } // 외부 호출만 CORS 모드
      ),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API 요청 실패:", error);
    throw error;
  }
}
