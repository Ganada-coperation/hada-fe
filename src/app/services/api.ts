// src/app/services/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";


export async function apiRequest(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  return response.json();
}
