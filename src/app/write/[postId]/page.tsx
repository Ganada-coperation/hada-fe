// src/app/write/[postId]/page.tsx
import PrefillClientWrapper from "./PrefillClientWrapper";

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params; // ✅ 비동기 구조분해
  return <PrefillClientWrapper generatedPostId={postId} />;
}
