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
    }, 300);
  };

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
            <IoClose size={26} />
          </CloseIcon>
        )}
        {title && <ModalTitle>{title}</ModalTitle>}
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideIn = keyframes`
  from { transform: translateY(-12px); }
  to { transform: translateY(0); }
`;

const slideOut = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-12px); }
`;

const ModalOverlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(30, 30, 30, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.3s ease forwards;
  z-index: 1000;
`;

const ModalContent = styled.div<{ $isClosing: boolean }>`
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 32px 24px;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  max-width: 460px;
  width: 90%;
  position: relative;
  animation: ${({ $isClosing }) => ($isClosing ? slideOut : slideIn)} 0.3s ease forwards;
`;

const CloseIcon = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
`;
