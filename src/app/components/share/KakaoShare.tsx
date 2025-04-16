"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import Button from "@components/common/Button";

interface KakaoShareButtonProps {
  nickname: string;
  title: string;
  content: string;
  postId: string;
}

export default function KakaoShareButton({ nickname, title, content, postId }: KakaoShareButtonProps) {
  useEffect(() => {
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
      script.async = true;
      script.onload = () => {
        const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
        if (kakaoKey) {
          window.Kakao.init(kakaoKey);
          console.log("✅ Kakao SDK Initialized:", window.Kakao.isInitialized());
        } else {
          console.error("Kakao JS Key is not defined");
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  const handleShare = () => {
    if (!window.Kakao?.isInitialized()) {
      toast.error("카카오 SDK 로딩 중입니다. 잠시 후 시도해주세요.");
      return;
    }

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: `${nickname}님의 이야기: ${title}`,
        description: content.length > 100 ? content.slice(0, 100) + "..." : content,
        imageUrl: "https://github.com/heyn2/hada-assets/blob/main/hada.1.jpeg?raw=true",
        link: {
          mobileWebUrl: `https://hada.ganadacorp.com/write/complete?postId=${postId}`,
          webUrl: `https://hada.ganadacorp.com/write/complete?postId=${postId}`,
        },
      },
      buttons: [
        {
          title: "지금 이야기 확인하기",
          link: {
            mobileWebUrl: `https://hada.ganadacorp.com/write/complete?postId=${postId}`,
            webUrl: `https://hada.ganadacorp.com/write/complete?postId=${postId}`,
          },
        },
      ],
    });
  };

  return <Button text="💌 친구에게 공유하기" onClick={handleShare} />;
}
