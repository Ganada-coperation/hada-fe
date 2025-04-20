import React from "react";
import styled, { keyframes } from "styled-components";
import { darken, rgba } from "polished";

const clickEffect = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.96); }
  100% { transform: scale(1); }
`;

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({ text, onClick, disabled, fullWidth = false }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} disabled={disabled} $fullWidth={fullWidth}>
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ $fullWidth?: boolean }>`
  display: block;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "260px")};
  margin: 16px auto 0 auto;
  padding: 16px 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.5px;

  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.colors.primary)};
    transform: translateY(-2px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.25);
  }

  &:active {
    animation: ${clickEffect} 0.2s ease;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${({ theme }) => rgba(theme.colors.primary, 0.5)};
  }
`;
