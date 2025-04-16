"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { gowunBatang } from "@styles/fonts";
import { useRouter } from "next/navigation";
import SubscribeModal from "@modals/@emailModal/subscribe";
import Button from "@components/common/Button";
import { subscribeNewsletter } from "@services/newsletterService";
import { loadKakaoSdk, chatWithKakao } from "@utils/kakao";
import { darken } from "polished";

export default function HomePage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <Container>
      <Logo>HADA</Logo>
      <Catchphrase>세상에 단 하나,<br/>당신만의 이야기를 완성해드립니다.</Catchphrase>
      <ButtonGroup>
        <StyledButton
          text="🗨️ 챗봇 대화해보기"
          onClick={() => {
            window.dataLayer?.push({ event: "cta_clicked", label: "kakao_chat_link" });
            chatWithKakao(); // ✅ 바로 채팅방으로 이동!
          }}
        />
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
    </Container>
  );
}

// ⭐ 스타일은 동일하게 유지 ⭐

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
  text-align: center;
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
  transition: all 0.3s ease;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;

  &:hover {
    transform: scale(1.08);
    background-color: ${({ theme }) => darken(0.35, theme.colors.primary)};
    color: white;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.97);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  }
`;
