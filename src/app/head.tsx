// src/app/head.tsx (서버 컴포넌트)
import Script from "next/script";

export default function Head() {
  return (
    <>
      <meta property="og:title" content="HADA - 세상에 단 하나, 당신의 이야기" />
      <meta property="og:description" content="지금 바로 당신만의 이야기를 완성해보세요." />
      <meta property="og:image" content="https://github.com/heyn2/hada-assets/blob/main/hada.1.jpeg?raw=true" />
      <meta property="og:url" content="https://hada.ganadacorp.com" />

      <Script
        src="https://developers.kakao.com/sdk/js/kakao.min.js"
        strategy="beforeInteractive"
        onError={() => console.error("❌ 카카오 SDK 로딩 실패")}
      />

      <Script id="kakao-init" strategy="afterInteractive">
        {`
          if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init("${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}");
            console.log("✅ Kakao SDK initialized");
          }
        `}
      </Script>
    </>
  );
}
