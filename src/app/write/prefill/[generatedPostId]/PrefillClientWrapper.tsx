"use client";

import PrefillWritePage, { Props } from "@components/feature/PrefillWritePage";

export default function PrefillClientWrapper({
  generatedPostId,
}: Props) {
  return <PrefillWritePage generatedPostId={generatedPostId} />;
}
