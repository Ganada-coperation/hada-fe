import React from "react";
import styled, { keyframes } from "styled-components";
import { darken } from "polished";
import { rgba } from "polished";

const clickEffect = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.97); }
  100% { transform: scale(1); }
`;

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ text, onClick, disabled }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: block;
  width: 260px;
  margin: 16px auto 0 auto;
  padding: 14px 10px;
  background-color: ${({ theme }) => rgba(theme.colors.primary, 0.55)};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 480;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${({ theme }) => darken(0.4, theme.colors.primary)};
    transform: scale(1.03);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.4);
    opacity: 0.95;
  }

  &:active {
    transform: scale(0.3);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    animation: ${clickEffect} 0.3s ease;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
