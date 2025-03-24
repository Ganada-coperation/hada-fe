import { ReactNode } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

interface SubscribeModalProps {
  nickname: string;
  onClose: () => void;
  children?: ReactNode;
}

export default function SubscribeModal({ nickname, onClose, children }: SubscribeModalProps) {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseIcon onClick={onClose}>
          <IoClose size={24} />
        </CloseIcon>

        <ModalTitle>뉴스레터 구독</ModalTitle>

        {!children && (
          <ModalDescription>
            <strong>{nickname || "사용자"}</strong>님이 작성하신 글을 뉴스레터로 보내드릴게요!
          </ModalDescription>
        )}

        {children}
      </ModalContent>
    </ModalOverlay>
  );
}

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
  position: relative;
`;

const CloseIcon = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 24px;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
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
  text-align: center;
  line-height: 1.5;
`;
