import styled from "styled-components";
import { gowunBatang } from "@/app/styles/fonts";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string; // ✅ className 추가
}

export default function Button({ text, onClick, disabled = false, className }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} disabled={disabled} className={className}>
      {text}
    </StyledButton>
  );
}

// ✅ 공통 버튼 스타일
const StyledButton = styled.button`
  font-family: ${gowunBatang.style.fontFamily};
  margin-top: 20px;
  width: 200px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;
