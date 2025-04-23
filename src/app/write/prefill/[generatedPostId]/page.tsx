// src/app/write/prefill/[generatedPostId]/page.tsx
import PrefillClientWrapper from "./PrefillClientWrapper";

type Params = {
  generatedPostId: string;
};

export default function Page({
  params,
}: {
  params: Params;
}) {
  return <PrefillClientWrapper generatedPostId={params.generatedPostId} />;
}
