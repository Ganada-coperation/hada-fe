"use client";

import { ReactNode, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showCloseIcon?: boolean;
}

export default function Modal({
  onClose,
  title,
  children,
  showCloseIcon = true,
}: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // fade out 시간과 맞춤
  };

  // 💡 모달 열릴 때 body 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <ModalOverlay $isClosing={isClosing} onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} $isClosing={isClosing}>
        {showCloseIcon && (
          <CloseIcon onClick={handleClose}>
            <IoClose size={24} />
          </CloseIcon>
        )}
        {title && <ModalTitle>{title}</ModalTitle>}
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}

// ✅ 애니메이션 추가
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideIn = keyframes`
  from { transform: translateY(-10px); }
  to { transform: translateY(0); }
`;

const slideOut = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-10px); }
`;

// ✅ 스타일 개선 + 애니메이션 적용
const ModalOverlay = styled.div<{ $isClosing: boolean }>`
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
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease forwards;
`;

const ModalContent = styled.div<{ $isClosing: boolean }>`
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 90%;
  position: relative;
  animation: ${({ $isClosing }) => ($isClosing ? slideOut : slideIn)} 0.3s ease forwards;
`;

const CloseIcon = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textPrimary};
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
