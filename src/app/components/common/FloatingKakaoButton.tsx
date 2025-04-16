"use client";

import styled from "styled-components";
import { addKakaoChannel, loadKakaoSdk } from "@utils/kakao";
import { useEffect } from "react";

export default function FloatingKakaoButton() {
  useEffect(() => {
    loadKakaoSdk()
      .then(() => {
        console.log("✅ Kakao SDK ready");
      })
      .catch(() => {
        console.error("❌ Kakao SDK 로딩 실패");
      });
  }, []);
  

  const handleChannelButtonClick = () => {
    window.dataLayer?.push({ event: "cta_clicked", label: "kakao_channel" });
    addKakaoChannel();
  };

  return <Button onClick={handleChannelButtonClick}>❤️ 카카오톡 채널 추가</Button>;
}

const Button = styled.button`
  position: absolute;
  right: 24px;
  bottom: 24px;
  background-color: ${({ theme }) => theme.colors.floating};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: none;
  border-radius: 30px;
  padding: 14px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.layout.maxWidth}) {
    right: 16px;
    bottom: 16px;
  }
`;
