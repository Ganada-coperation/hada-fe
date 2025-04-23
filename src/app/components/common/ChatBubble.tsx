// src/app/components/common/ChatBubble.tsx
"use client";

import styled, { css, keyframes } from "styled-components";
import { gowunBatang } from "@styles/fonts";

interface ChatBubbleProps {
  from: "bot" | "user";
  text: string;
  delay?: number; // 애니메이션 순서 조절
}

export default function ChatBubble({ from, text, delay = 0 }: ChatBubbleProps) {
  return (
    <BubbleContainer from={from} delay={delay} className={gowunBatang.className}>
      <BubbleText>{text}</BubbleText>
    </BubbleContainer>
  );
}

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  } to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BubbleContainer = styled.div<{ from: "bot" | "user"; delay: number }>`
  max-width: 80%;
  margin: 12px 0;
  padding: 12px 16px;
  border-radius: 24px;
  font-size: 17px;
  line-height: 1.6;
  word-break: keep-word;
  white-space: pre-line;
  animation: ${fadeUp} 0.6s ease-out forwards;
  animation-delay: ${({ delay }) => delay}s;
  opacity: 0;

  ${({ from}) =>
    from === "bot"
      ? css`
          align-self: flex-start;
          background-color: #6D4B38; // 갈색 (챗봇)
          color: #fff;
          border-bottom-left-radius: 0;
        `
      : css`
          align-self: flex-end;
          background-color: #fef6e9; // 연베이지 (사용자)
          color: #333;
          border-bottom-right-radius: 0;
        `}
`;

const BubbleText = styled.span``;
