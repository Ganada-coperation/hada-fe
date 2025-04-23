import PrefillClientWrapper from "./PrefillClientWrapper";

export default function Page({
  params: { generatedPostId },
}: {
  params: { generatedPostId: string };
}) {
  return <PrefillClientWrapper generatedPostId={generatedPostId} />;
}