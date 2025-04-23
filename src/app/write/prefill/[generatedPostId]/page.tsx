import PrefillClientWrapper from "./PrefillClientWrapper";

export default async function Page({
  params,
}: {
  params: { generatedPostId: string };
}) {
  const generatedPostId = params.generatedPostId;
  return <PrefillClientWrapper generatedPostId={generatedPostId} />;
}