"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "@components/common/Button";
import { loadKakaoSdk } from "@utils/kakao";

interface KakaoShareButtonProps {
  nickname: string;
  title: string;
  content: string;
  postId: string;
}

export default function KakaoShareButton({
  nickname,
  title,
  content,
  postId,
}: KakaoShareButtonProps) {
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  useEffect(() => {
    loadKakaoSdk()
      .then(() => setIsKakaoReady(true))
      .catch(() => {
        toast.error("카카오 SDK 로딩에 실패했습니다.");
      });
  }, []);

  const handleShare = () => {
    if (!window.Kakao?.isInitialized()) {
      toast.error("카카오 SDK가 아직 초기화되지 않았어요.");
      return;
    }

    const description =
      content.length > 100 ? `${content.slice(0, 100)}...` : content;

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001"
        : "https://hada.ganadacorp.com";

    const postLink = `${baseUrl}/write/prefill/${postId}`;

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: `${nickname}님의 이야기: ${title}`,
        description,
        imageUrl:
          "https://github.com/heyn2/hada-assets/blob/main/hada.1.jpeg?raw=true",
        link: {
          mobileWebUrl: postLink,
          webUrl: postLink,
        },
      },
      buttons: [
        {
          title: "지금 이야기 확인하기",
          link: {
            mobileWebUrl: postLink,
            webUrl: postLink,
          },
        },
      ],
    });
  };

  return (
    <Button
      text="💌 친구에게 공유하기"
      onClick={handleShare}
      disabled={!isKakaoReady}
    />
  );
}
