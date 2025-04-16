"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import Button from "@components/common/Button";
import toast from "react-hot-toast";

export default function CompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  const [isKakaoReady, setIsKakaoReady] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      const kakaoKey = "f701c1be96a5432920b76ec27e7c656a"; // ✅ 하드코딩
      window.Kakao.init(kakaoKey);
      setIsKakaoReady(window.Kakao.isInitialized());
    };
    document.head.appendChild(script);
  }, []);

  const handleShare = () => {
    if (!window.Kakao?.isInitialized()) {
      toast.error("카카오톡 공유 준비 중입니다. 잠시 후 시도해주세요.");
      return;
    }
  
    const baseUrl = process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://hada.ganadacorp.com";
  
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "하다 ✍️ 당신의 이야기를 기록하세요",
        description: "지금 당신의 이야기를 친구와 공유하세요.",
        imageUrl: "https://github.com/heyn2/hada-assets/blob/main/hada.1.jpeg?raw=true",
        link: {
          mobileWebUrl: `${baseUrl}/post/${postId}`,
          webUrl: `${baseUrl}/post/${postId}`,
        },
      },
      buttons: [
        {
          title: "지금 확인하기",
          link: {
            mobileWebUrl: `${baseUrl}/post/${postId}`,
            webUrl: `${baseUrl}/post/${postId}`,
          },
        },
      ],
    });
  };
  

  return (
    <PageWrapper>
      <Container>
        <Title>🎉 글 작성 완료!</Title>
        <Description>작성하신 글이 성공적으로 저장되었습니다.</Description>
        <Button text="💌 친구에게 공유하기" onClick={handleShare} disabled={!isKakaoReady} />
        <Button text="홈으로 돌아가기" onClick={() => router.push("/")} />
      </Container>
    </PageWrapper>
  );
}

// 스타일
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 24px;
`;
