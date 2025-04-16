"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "@components/common/Button";
import { loadKakaoSdk } from "@utils/kakao"; // ✅ 공통 로더 사용

interface KakaoShareButtonProps {
  nickname: string;
  title: string;
  content: string;
  postId: string;
}

export default function KakaoShareButton({ nickname, title, content, postId }: KakaoShareButtonProps) {
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
      toast.error("카카오 SDK가 아직 초기화되지 않았습니다.");
      return;
    }

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: `${nickname}님의 이야기: ${title}`,
        description: content.length > 100 ? content.slice(0, 100) + "..." : content,
        imageUrl: "https://github.com/heyn2/hada-assets/blob/main/hada.1.jpeg?raw=true",
        link: {
          mobileWebUrl: `https://hada.ganadacorp.com/post/${postId}`,
          webUrl: `https://hada.ganadacorp.com/post/${postId}`,
        },
      },
      buttons: [
        {
          title: "지금 이야기 확인하기",
          link: {
            mobileWebUrl: `https://hada.ganadacorp.com/post/${postId}`,
            webUrl: `https://hada.ganadacorp.com/post/${postId}`,
          },
        },
      ],
    });
  };

  return (
    <Button text="💌 친구에게 공유하기" onClick={handleShare} disabled={!isKakaoReady} />
  );
}
