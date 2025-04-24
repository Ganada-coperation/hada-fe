// src/app/write/prefill/[generatedPostId]/page.tsx

import PrefillClientWrapper from "./PrefillClientWrapper";

// ① Props 인터페이스 정의
interface Props {
  params: {
    generatedPostId: string;
  };
}

// ② 제네릭(<Props>) 제거하고, 함수 파라미터에 Props 를 바로 적용
export default async function Page({ params }: Props) {
  const generatedPostId = params.generatedPostId;
  return <PrefillClientWrapper generatedPostId={generatedPostId} />;
}
