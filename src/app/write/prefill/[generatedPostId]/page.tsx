import PrefillClientWrapper from "./PrefillClientWrapper";

type PrefillPageProps = {
  params: {
    generatedPostId: string;
  };
};

export default function Page({ params }: PrefillPageProps) {
  return <PrefillClientWrapper generatedPostId={params.generatedPostId} />;
}
