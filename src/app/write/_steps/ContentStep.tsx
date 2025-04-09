"use client";

import styled from "styled-components";
import WriteEditor from "@features/WriteEditor";
import Button from "@components/common/Button";
import { fadeSlideIn } from "@styles/animations";

interface ContentStepProps {
  content: string;
  setContent: (value: string) => void;
  onNext: () => void;
}

export default function ContentStep({ content, setContent, onNext }: ContentStepProps) {
  return (
    <StepContainer>
      <WriteEditor content={content} setContent={setContent} />
      <Button text="글 저장하기" onClick={onNext} disabled={content.length < 3} />
    </StepContainer>
  );
}

const StepContainer = styled.div`
  animation: ${fadeSlideIn} 0.6s ease;
  width: 100%;
  margin-top: 16px;
`;
