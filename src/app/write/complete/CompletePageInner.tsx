"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import Button from "@components/common/Button";
import toast from "react-hot-toast";

export default function CompletePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isKakaoReady, setIsKakaoReady] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      window.Kakao.init("f701c1be96a5432920b76ec27e7c656a");
      setIsKakaoReady(window.Kakao.isInitialized());
    };
    document.head.appendChild(script);
  }, []);

  const handleShare = () => {
    const postId = searchParams.get("postId");
    if (!postId) {
      toast.error("공유할 글 ID가 없습니다.");
      return;
    }

    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://hada.ganadacorp.com";

    const linkUrl = `${origin}/posts/${postId}`;

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "하다 ✍️ 당신의 이야기를 기록하세요",
        description: "지금 당신의 이야기를 친구와 공유하세요.",
        imageUrl:
          "https://github.com/heyn2/hada-assets/blob/main/hada.1.jpeg?raw=true",
        link: {
          mobileWebUrl: linkUrl,
          webUrl: linkUrl,
        },
      },
      buttons: [
        {
          title: "지금 확인하기",
          link: {
            mobileWebUrl: linkUrl,
            webUrl: linkUrl,
          },
        },
      ],
    });
  };

  return (
    <PageWrapper>
      <Container>
        <Title>🎉 글 작성 완료!</Title>
        <Description>
          소중한 이야기가 잘 저장되었습니다. <br />
          친구에게 공유해보시겠어요?
        </Description>

        <ButtonGroup>
          <Button
            text="💌 친구에게 공유하기"
            onClick={handleShare}
            disabled={!isKakaoReady}
          />
          <Button text="🏠 홈으로 돌아가기" onClick={() => router.push("/")} />
        </ButtonGroup>
      </Container>
    </PageWrapper>
  );
}

// 🎨 스타일 정의
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 16px;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  padding: 40px 28px;
  border-radius: 14px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 420px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: var(--fs-xl);        /* 28px */
  line-height: var(--lh-heading); /* 1.4 */
  font-weight: bold;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Description = styled.p`
  font-size: var(--fs-sm);       /* 18px */
  line-height: var(--lh-body);   /* 1.6 */
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 32px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
