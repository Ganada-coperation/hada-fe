"use client";

import styled from "styled-components";
import Button from "@/app/components/common/Button";

interface CompleteModalProps {
  onClose: () => void;
}

export default function CompleteModal({ onClose }: CompleteModalProps) {
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>작성 완료되었습니다😊</h2>
        <p>입력하신 글이 저장되었어요!</p>
        <Button text="확인" onClick={onClose} />
      </ModalContent>
    </ModalOverlay>
  );
}

// ✅ 모달 오버레이 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// ✅ 모달 콘텐츠 스타일
const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 320px;

  h2 {
    margin-bottom: 10px;
    font-size: 20px;
    
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  p {
    font-size: 16px;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
