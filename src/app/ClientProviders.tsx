// src/app/ClientProviders.tsx (클라이언트 컴포넌트)
"use client";

import { ReactNode } from "react";
import Script from "next/script";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@styles/globalStyles";
import theme from "@styles/theme";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      {/* GTM */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5X95W8N8');
        `}
      </Script>
     
      {/* 테마 & 글로벌 스타일 */}
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  );
}
