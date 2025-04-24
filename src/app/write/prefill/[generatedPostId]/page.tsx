// src/app/write/prefill/[generatedPostId]/page.tsx

import PrefillClientWrapper from "./PrefillClientWrapper";

// ① params를 Promise<{ generatedPostId: string }>로 타입 지정
type PageProps = {
  params: Promise<{ generatedPostId: string }>;
};

export default async function Page({ params }: PageProps) {
  // ② await로 Promise 해제해서 실제 값을 꺼냅니다
  const { generatedPostId } = await params;

  return <PrefillClientWrapper generatedPostId={generatedPostId} />;
}
