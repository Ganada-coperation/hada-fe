// src/app/utils/fetcher.ts

export const fetcher = async (url: string) => {
  // 1) /api 로 시작하는 요청은 상대경로 그대로
  const targetUrl = url.startsWith("/api")
    ? url
    : `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;

  const response = await fetch(targetUrl);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
