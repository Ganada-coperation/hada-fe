// hada-web/src/app/(modals)/@chatbotModal/ChatbotModal.tsx

"use client";

import Modal from "@/app/components/common/Modal";
import styled from "styled-components";
import { gowunBatang } from "@/app/styles/fonts";

interface ChatbotModalProps {
  onClose: () => void;
}

export default function ChatbotModal({ onClose }: ChatbotModalProps) {
  return (
    <Modal onClose={onClose} title="카카오톡 챗봇 이용 안내">
      <Description>
      &ldquo;하다&rdquo;  카카오 채널에서 챗봇과 대화하고 <br />
        글 생성도 해볼 수 있어요!
      </Description>
      <ChatbotButton
        onClick={() =>
          window.open("http://pf.kakao.com/_kxdKXn", "_blank", "noopener,noreferrer")
        }
      >
        대화해보기
      </ChatbotButton>
    </Modal>
  );
}

const Description = styled.p`
  font-family: ${gowunBatang.style.fontFamily};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 20px;
  line-height: 1.5;
`;

const ChatbotButton = styled.button`
  font-family: ${gowunBatang.style.fontFamily};
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark || "#0055aa"};
  }
`;
