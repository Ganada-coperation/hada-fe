// src/app/write/[postId]/PrefillClientWrapper.tsx
"use client";

import PrefillWritePage from "@components/feature/PrefillWritePage";

export default function PrefillClientWrapper({
  generatedPostId,
}: {
  generatedPostId: string;
}) {
  return <PrefillWritePage generatedPostId={generatedPostId} />;
}
