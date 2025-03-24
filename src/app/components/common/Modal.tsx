

import { ReactNode } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showCloseIcon?: boolean;
}

export default function Modal({ onClose, title, children, showCloseIcon = true }: ModalProps) {
  return (
    <ModalOverlay>
      <ModalContent>
        {showCloseIcon && (
          <CloseIcon onClick={onClose}>
            <IoClose size={24} />
          </CloseIcon>
        )}

        {title && <ModalTitle>{title}</ModalTitle>}

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
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 90%;
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
