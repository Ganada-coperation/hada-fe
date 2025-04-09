"use client";

import styled from "styled-components";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import { FeedbackMessage } from "@components/common/FeedbackMessage";
import { useEffect, useState } from "react";
import { checkNickname } from "@services/userService";
import { fadeSlideIn } from "@styles/animations";

interface NicknameStepProps {
  nickname: string;
  setNickname: (value: string) => void;
  onNext: () => void;
}

export default function NicknameStep({ nickname, setNickname, onNext }: NicknameStepProps) {
  const [nicknameMessage, setNicknameMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!nickname) {
      setNicknameMessage(null);
      return;
    }

    checkNickname(nickname)
      .then((response) => {
        const available = response?.available ?? true;
        setNicknameMessage(available ? "멋진 필명이네요!" : "이미 사용 중인 필명입니다");
      })
      .catch(() => setNicknameMessage("오류가 발생했습니다."));
  }, [nickname]);

  return (
    <StepContainer>
      <Input placeholder="닉네임을 입력하세요" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      {nicknameMessage && (
        <FeedbackMessage isError={nicknameMessage.includes("이미")}>{nicknameMessage}</FeedbackMessage>
      )}
      <Button text="확인" onClick={onNext} disabled={!nickname || nicknameMessage?.includes("이미")} />
    </StepContainer>
  );
}

const StepContainer = styled.div`
  animation: ${fadeSlideIn} 0.6s ease;
  width: 100%;
  margin-top: 16px;
`;
