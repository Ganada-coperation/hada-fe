const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      mode: 'cors',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
  }
}
