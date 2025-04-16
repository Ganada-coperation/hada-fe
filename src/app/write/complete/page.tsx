import { Suspense } from "react";
import CompletePageInner from "./CompletePageInner";

export default function CompletePage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <CompletePageInner />
    </Suspense>
  );
}
