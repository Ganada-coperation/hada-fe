import styled from "styled-components";
import { gowunBatang } from "@styles/fonts";

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type = "text", placeholder, value, onChange }: InputProps) {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value ?? ""} // ✅ undefined → 빈 문자열 fallback
      onChange={onChange}
    />
  );
}


// ✅ 공통 입력 필드 스타일
const StyledInput = styled.input`
  font-family: ${gowunBatang.style.fontFamily} !important;
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
