// src/app/page.tsx

"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { gowunBatang } from "@/app/styles/fonts";
import { useRouter } from "next/navigation";
import SubscribeModal from "@/app/(modals)/@emailModal/subscribe";
import ChatbotModal from "@/app/(modals)/@chatbotModal/ChatbotModal";
import Button from "@/app/components/common/Button";
import { subscribeNewsletter } from "@/app/services/newsletterService";
import { loadKakaoSdk } from "@/app/utils/kakao";

export default function HomePage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);

  useEffect(() => {
    loadKakaoSdk().catch(() => {
      console.error("카카오 SDK 로딩 실패");
    });
  }, []);

  const handleSubscribe = async (email: string) => {
    try {
      await subscribeNewsletter(email);
      window.dataLayer?.push({ event: "newsletter_submitted" });
      alert("뉴스레터 구독이 완료되었습니다!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("뉴스레터 구독 실패:", error);
      alert("구독 중 오류가 발생했습니다.");
    }
  };

  const openChatbotModal = () => {
    window.dataLayer?.push({ event: "cta_clicked", label: "kakao_chat_modal_open" });
    setIsChatbotModalOpen(true);
  };

  return (
    <Container>
      <Logo>HADA</Logo>
      <Catchphrase>나의 이야기를 하다.</Catchphrase>

      <ButtonGroup>
        <StyledButton text="🗨️ 챗봇 대화해보기" onClick={openChatbotModal} />
        <StyledButton
          text="✍️ 글쓰러 가기"
          onClick={() => {
            window.dataLayer?.push({ event: "cta_clicked", label: "write" });
            router.push("/write");
          }}
        />
        <StyledButton
          text="📩 뉴스레터 구독하기"
          onClick={() => {
            window.dataLayer?.push({ event: "cta_clicked", label: "newsletter" });
            setIsModalOpen(true);
          }}
        />
      </ButtonGroup>

      {isModalOpen && (
        <SubscribeModal
          showInput
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubscribe}
        />
      )}

      {isChatbotModalOpen && (
        <ChatbotModal onClose={() => setIsChatbotModalOpen(false)} />
      )}
    </Container>
  );
}

// 스타일
const fadeInMove = keyframes`
  from { opacity: 0; transform: translateY(-15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  font-family: ${gowunBatang.style.fontFamily};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Logo = styled.h1`
  font-family: ${gowunBatang.style.fontFamily};
  font-size: 56px;
  font-weight: 590;
  animation: ${fadeInMove} 1s ease-in-out;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
`;

const Catchphrase = styled.p`
  font-family: ${gowunBatang.style.fontFamily};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 32px;
  animation: ${fadeIn} 1.2s ease-in-out;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: ${fadeIn} 1.4s ease-in-out;
`;

const StyledButton = styled(Button)`
  font-family: ${gowunBatang.style.fontFamily};
  width: 260px;
  font-size: 18px;
  font-weight: 480;
  padding: 14px 10px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.5);
    transform: scale(1.05);
  }
`;
