// src/app/write/prefill/[generatedPostId]/page.tsx
"use client";

import PrefillClientWrapper from "./PrefillClientWrapper";

interface Props {
  params: { generatedPostId: string };
}

export default function Page({ params }: Props) {
  return <PrefillClientWrapper generatedPostId={params.generatedPostId} />;
}
