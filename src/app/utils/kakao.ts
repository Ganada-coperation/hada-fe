// src/app/utils/kakao.ts

import { KAKAO_CHANNEL_ID, KAKAO_JS_APP_KEY } from "@config/constants";

declare global {
  interface Window {
    Kakao: any;
  }
}

export const loadKakaoSdk = () => {
  return new Promise<void>((resolve, reject) => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      return resolve();
    }

    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
    script.integrity =
      "sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka";
    script.crossOrigin = "anonymous";
    script.async = true;

    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_APP_KEY);
        resolve();
      }
    };

    script.onerror = reject;

    document.head.appendChild(script);
  });
};

export const addKakaoChannel = () => {
  if (window.Kakao) {
    window.Kakao.Channel.addChannel({
      channelPublicId: KAKAO_CHANNEL_ID,
    });
  }
};

export const chatWithKakao = () => {
  if (window.Kakao) {
    window.Kakao.Channel.chat({
      channelPublicId: KAKAO_CHANNEL_ID,
    });
  }
};
