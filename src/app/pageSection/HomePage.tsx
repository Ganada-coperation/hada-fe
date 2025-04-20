"use client";

import { useEffect } from "react";
import styled from "styled-components";
import Button from "@components/common/Button";
import { loadKakaoSdk, chatWithKakao } from "@utils/kakao";
import useScrollFadeIn from "../hooks/useScrollFadeIn";

export default function HomePage() {
  useEffect(() => {
    loadKakaoSdk().catch(() => {
      console.error("카카오 SDK 로딩 실패");
    });
  }, []);

  const animated = useScrollFadeIn();

  return (
    <Container {...animated}>
      <Logo>하다</Logo>
      <Catchphrase>
        감정을 꾹꾹 눌러 담지 말고, <br />
        이야기로 풀어보세요.
      </Catchphrase>
      <ButtonWrapper>
        <Button
          text="하다와 이야기하기"
          onClick={() => {
            window.dataLayer?.push({ event: "cta_clicked", label: "kakao_chat_link" });
            chatWithKakao();
          }}
          fullWidth
        />
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
`;

const Logo = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin: 12px 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const Catchphrase = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin: 24px 0;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 320px;
`;
