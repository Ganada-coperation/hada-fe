"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "@components/common/Button";
import { loadKakaoSdk, shareKakao } from "@utils/kakao";

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
      toast.error("카카오 SDK가 아직 초기화되지 않았어요.");
      return;
    }

    const description = content.length > 100 ? `${content.slice(0, 100)}...` : content;

    shareKakao(postId, {
      title: `${nickname}님의 이야기: ${title}`,
      description,
    });
  };

  return <Button text="💌 친구에게 공유하기" onClick={handleShare} disabled={!isKakaoReady} />;
}
