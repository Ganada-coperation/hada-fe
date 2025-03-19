import styled from "styled-components";

interface BackButtonProps {
  onClick: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  return <StyledBackButton onClick={onClick}>←</StyledBackButton>;
}

// ✅ 뒤로 가기 버튼 스타일
const StyledBackButton = styled.button`
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
