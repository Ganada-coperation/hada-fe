"use client";

import styled from "styled-components";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import { fadeSlideIn } from "@styles/animations";

interface TitleStepProps {
  title: string;
  setTitle: (value: string) => void;
  onNext: () => void;
}

export default function TitleStep({ title, setTitle, onNext }: TitleStepProps) {
  return (
    <StepContainer>
      <Input placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button text="확인" onClick={onNext} disabled={!title} />
    </StepContainer>
  );
}

const StepContainer = styled.div`
  animation: ${fadeSlideIn} 0.6s ease;
  width: 100%;
  margin-top: 16px;
`;
