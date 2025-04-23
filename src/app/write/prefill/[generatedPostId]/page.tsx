// src/app/write/prefill/[generatedPostId]/page.tsx

import PrefillClientWrapper from "./PrefillClientWrapper";

// ✅ 수정 후 (정상 작동)
interface PageProps {
  params: {
    generatedPostId: string;
  };
}

export default function Page({ params }: PageProps) {
  const generatedPostId = params.generatedPostId;

  return <PrefillClientWrapper generatedPostId={generatedPostId} />;
}

