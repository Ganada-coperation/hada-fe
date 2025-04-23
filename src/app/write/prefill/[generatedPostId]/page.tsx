// src/app/write/prefill/[generatedPostId]/page.tsx
import PrefillClientWrapper from "./PrefillClientWrapper";

interface PageProps {
  params: {
    generatedPostId: string;
  };
}

export default function Page({ params }: PageProps) {
  const { generatedPostId } = params;

  return <PrefillClientWrapper generatedPostId={generatedPostId} />;
}
