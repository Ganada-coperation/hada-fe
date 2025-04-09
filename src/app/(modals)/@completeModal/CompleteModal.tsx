"use client";

import { useState } from "react";
import Modal from "@components/common/Modal";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import { isValidEmail } from "@utils/validation";
import styled from "styled-components";
import { rgba } from "polished";


interface CompleteModalProps {
  onConfirm: (email: string, mood: string) => void;
  onClose: () => void;
  nickname: string;
}

const MOOD_OPTIONS = ["😊 좋음", "😐 보통", "😔 우울", "💭 기타"];

export default function CompleteModal({ onConfirm, onClose, nickname }: CompleteModalProps) {
  const [email, setEmail] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!isValidEmail(email)) {
      setError("유효한 이메일을 입력해주세요.");
      return;
    }

    if (!selectedMood) {
      setError("기분을 선택해주세요.");
      return;
    }

    setError("");
    onConfirm(email, selectedMood);
  };

  return (
    <Modal onClose={onClose}>
      <Title>작성 완료 🎉</Title>
      <Description>
        입력하신 글이 곧 저장됩니다! <br />
        이메일을 입력하면 당신의 글을 뉴스레터로 <br /> 받아보실 수 있어요 ✉️
      </Description>

      <Input
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

   <MoodLabel>오늘 {nickname}님의 기분은 어떠신가요💐?</MoodLabel>
      <MoodOptions>
        {MOOD_OPTIONS.map((mood) => (
          <MoodOption
            key={mood}
            $selected={selectedMood === mood}
            onClick={() => setSelectedMood(mood)}
          >
            {mood}
          </MoodOption>
        ))}
      </MoodOptions>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Button
        text="확인"
        onClick={handleConfirm}
        disabled={!email || !selectedMood}
      />
    </Modal>
  );
}

// 스타일
const Title = styled.h2`
  text-align: center;
  margin-bottom: 8px;
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 16px;
`;

const MoodLabel = styled.p`
  margin: 12px 0 8px;
  font-weight: bold;
`;

const MoodOptions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
`;

const MoodOption = styled.button<{ $selected: boolean }>`
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ $selected, theme }) =>
    $selected ?  rgba(theme.colors.primary, 0.55)  : "transparent"};
  color: ${({ $selected, theme }) =>
    $selected ? "#fff" : theme.colors.textPrimary};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.8;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-bottom: 8px;
`;
