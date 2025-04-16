// src/app/utils/fetcher.ts

export const fetcher = async (url: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + url);
  
    if (!response.ok) {
      throw new Error("데이터를 불러오지 못했습니다.");
    }
  
    return response.json();
  };
  