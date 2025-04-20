import { toast } from "react-hot-toast";

declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Link: {
        sendDefault: (options: KakaoShareOptions) => void;
      };
      Channel: {
        chat: (options: { channelPublicId?: string }) => void;
        addChannel: (options: { channelPublicId?: string }) => void;
      };
    };
  }
}

interface KakaoShareOptions {
  objectType: "feed";
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons?: {
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }[];
}

export const loadKakaoSdk = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      console.log("✅ Kakao SDK already initialized");
      resolve();
      return;
    }

    const jsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    if (!jsKey) {
      reject(new Error("카카오 SDK 키가 설정되지 않았습니다."));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      try {
        if (!window.Kakao) {
          throw new Error("카카오 SDK 로드 실패");
        }
        window.Kakao.init(jsKey);
        if (!window.Kakao.isInitialized()) {
          throw new Error("카카오 SDK 초기화 실패");
        }
        console.log("✅ Kakao SDK initialized successfully");
        resolve();
      } catch (error) {
        console.error("❌ Kakao SDK initialization error:", error);
        reject(error);
      }
    };
    script.onerror = (error) => {
      console.error("❌ Kakao SDK script load error:", error);
      reject(new Error("카카오 SDK 스크립트 로드 실패"));
    };
    document.head.appendChild(script);
  });
};

export const shareKakao = (postId: string, options?: { title?: string; description?: string }) => {
  if (!window.Kakao || !window.Kakao.isInitialized()) {
    console.error("Kakao SDK not initialized");
    return;
  }

  const baseUrl = process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://hada.ganadacorp.com";

    const shareUrl = `${baseUrl}/write/prefill/${postId}`;

  console.log("공유 링크 확인 →", shareUrl); // 테스트 로그

  window.Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: options?.title || "하다 ✍️ 당신의 이야기를 기록하세요",
      description: options?.description || "지금 당신의 이야기를 친구와 공유하세요.",
      imageUrl: "https://github.com/heyn2/hada-assets/blob/main/hada.1.jpeg?raw=true",
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    buttons: [
      {
        title: "지금 확인하기",
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    ],
  });
};

export const chatWithKakao = async () => {
  try {
    await loadKakaoSdk();
    
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      throw new Error("카카오 SDK 초기화 실패");
    }

    window.Kakao.Channel.chat({
      channelPublicId: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID,
    });
  } catch (error) {
    console.error("❌ 카카오톡 채널 연결 실패:", error);
    toast.error("카카오톡 채널 연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
};

export const addKakaoChannel = () => {
  if (!window.Kakao || !window.Kakao.isInitialized()) {
    console.error("Kakao SDK not initialized");
    return;
  }

  const channelId = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID;
  window.Kakao.Channel.addChannel({ channelPublicId: channelId });
};
