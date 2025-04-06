import styled from "styled-components";

interface FeedbackMessageProps {
  isError?: boolean;
}

export const FeedbackMessage = styled.p.withConfig({
  // ✅ DOM 에 isError 전달되지 않게 filtering
  shouldForwardProp: (prop) => prop !== "isError",
})<FeedbackMessageProps>`
  text-align: center;
  margin: 8px 0 12px;
  font-size: 14px;
  color: ${({ isError, theme }) =>
    isError ? "red" : theme.colors.primary};
`;
