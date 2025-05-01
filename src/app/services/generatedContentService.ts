// src/app/services/generatedContentService.ts

/**
 * Fetch generated content by ID using Next.js internal API.
 */
export async function fetchGeneratedContentById(id: string) {
  if (!id) throw new Error("generatedPostId가 필요합니다.");

  // Next.js 내부 API route 직접 호출
  const res = await fetch(`/api/generated-content/${id}`, {
    cache: "no-store",
    next: { revalidate: 0 },
    credentials: "omit",
  });

  if (!res.ok) {
    throw new Error(`generatedPostId(${id})에 해당하는 글을 불러올 수 없습니다. status: ${res.status}`);
  }

  const json = await res.json();
  if (!json.result) {
    throw new Error(`generatedPostId(${id})에 해당하는 글이 없습니다.`);
  }
  return json.result;
}
