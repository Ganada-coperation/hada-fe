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

// ✅ 명시적인 타입 정의
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

export const loadKakaoSdk = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    script.onload = () => {
      const jsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
      if (jsKey && window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(jsKey);
        console.log("✅ Kakao SDK Initialized:", window.Kakao.isInitialized());
        resolve();
      } else {
        reject("Kakao SDK init failed");
      }
    };

    script.onerror = () => reject("Kakao SDK script load error");
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

  window.Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: options?.title || "하다 ✍️ 당신의 이야기를 기록하세요",
      description: options?.description || "지금 당신의 이야기를 친구와 공유하세요.",
      imageUrl: "https://github.com/heyn2/hada-assets/blob/main/hada.1.jpeg?raw=true",
      link: {
        mobileWebUrl: `${baseUrl}/write/prefill/${postId}`,
        webUrl: `${baseUrl}/write/prefill/${postId}`,
      },
    },
    buttons: [
      {
        title: "지금 확인하기",
        link: {
          mobileWebUrl: `${baseUrl}/write/prefill/${postId}`,
          webUrl: `${baseUrl}/write/prefill/${postId}`,
        },
      },
    ],
  });
};


export const chatWithKakao = () => {
  if (!window.Kakao || !window.Kakao.isInitialized()) {
    console.error("Kakao SDK not initialized");
    return;
  }

  const channelId = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID;
  window.Kakao.Channel.chat({ channelPublicId: channelId });
};

export const addKakaoChannel = () => {
  if (!window.Kakao || !window.Kakao.isInitialized()) {
    console.error("Kakao SDK not initialized");
    return;
  }

  const channelId = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID;
  window.Kakao.Channel.addChannel({ channelPublicId: channelId });
};
