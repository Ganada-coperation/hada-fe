import { useState } from "react";
import styled from "styled-components";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";

interface SubscribeModalProps {
  nickname: string;
  onClose: () => void;
}

export default function SubscribeModal({ nickname, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email.includes("@")) {
      alert("올바른 이메일을 입력해주세요.");
      return;
    }
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      alert("뉴스레터 신청이 완료되었습니다!");
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>뉴스레터 구독</ModalTitle>
        <ModalDescription>
          <strong>{nickname || "사용자"}</strong>님이 작성하신 글을 뉴스레터로 보내드릴게요!
        </ModalDescription>
        <Input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button text="뉴스레터 받기" onClick={handleSubmit} />
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}

/* ✅ 스타일드 컴포넌트 정의 */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 20px;
  width: 90%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ModalDescription = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CloseButton = styled.button`
  margin-top: 15px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;
