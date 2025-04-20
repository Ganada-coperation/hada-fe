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
      setError("이메일 형식을 확인해주세요 😊");
      return;
    }

    if (!selectedMood) {
      setError("오늘의 기분을 선택해주세요.");
      return;
    }

    setError("");
    onConfirm(email, selectedMood);
  };

  return (
    <Modal onClose={onClose}>
      <Title>작성 완료 🎉</Title>
      <Description>
        <strong>{nickname}</strong>님의 이야기가 곧 저장돼요. <br />
        이메일을 입력하시면 뉴스레터로 보내드릴게요 ✉️
      </Description>

      <Input
        type="email"
        placeholder="이메일 주소를 입력해 주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <MoodLabel>오늘 기분은 어떠세요?</MoodLabel>
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

      <Button text="✉️ 이야기 저장하기" onClick={handleConfirm} disabled={!email || !selectedMood} />
    </Modal>
  );
}

// 🎨 스타일 정의
const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 20px;
`;

const MoodLabel = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0 12px;
  text-align: center;
`;

const MoodOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 20px;
`;

const MoodOption = styled.button<{ $selected: boolean }>`
  padding: 9px 15px;
  font-size: 18px;
  border-radius: 10px;
  border: 2px solid ${({ $selected, theme }) => $selected ? theme.colors.primary : theme.colors.border};
  background-color: ${({ $selected, theme }) => $selected ? rgba(theme.colors.primary, 0.6) : "#fff"};
  color: ${({ $selected, theme }) => $selected ? "#fff" : theme.colors.textPrimary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
`;
