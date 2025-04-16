// src/app/utils/kakao.ts

declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Link: {
        sendDefault: (options: any) => void;
      };
      Channel: {
        chat: (options: { channelPublicId?: string }) => void;
        addChannel: (options: { channelPublicId?: string }) => void;
      };
    };
  }
}

export const loadKakaoSdk = () => {
  return new Promise<void>((resolve, reject) => {
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
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export const shareKakao = () => {
  if (!window.Kakao || !window.Kakao.isInitialized()) {
    console.error("Kakao SDK not initialized");
    return;
  }

  window.Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: "하다 ✍️ 당신의 이야기를 기록하세요",
      description: "지금 당신의 이야기를 친구와 공유하세요.",
      imageUrl: "https://github.com/heyn2/hada-assets/blob/main/hada.1.jpeg?raw=true",
      link: {
        mobileWebUrl: "https://hada.ganadacorp.com",
        webUrl: "https://hada.ganadacorp.com",
      },
    },
    buttons: [
      {
        title: "지금 확인하기",
        link: {
          mobileWebUrl: "https://hada.ganadacorp.com",
          webUrl: "https://hada.ganadacorp.com",
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
  window.Kakao.Channel.chat({
    channelPublicId: channelId,
  });
};

export const addKakaoChannel = () => {
  if (!window.Kakao || !window.Kakao.isInitialized()) {
    console.error("Kakao SDK not initialized");
    return;
  }

  const channelId = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID;
  window.Kakao.Channel.addChannel({
    channelPublicId: channelId,
  });
};
