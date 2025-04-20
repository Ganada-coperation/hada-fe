"use client";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "@styles/globalStyles";
import theme from "@styles/theme";
import { gowunBatang } from "@styles/fonts";
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta property="og:title" content="HADA - 세상에 단 하나, 당신의 이야기" />
        <meta property="og:description" content="지금 바로 당신만의 이야기를 완성해보세요." />
        <meta property="og:image" content="https://github.com/heyn2/hada-assets/blob/main/hada.1.jpeg?raw=true" />
        <meta property="og:url" content="https://hada.ganadacorp.com" />
      </head>

      <body className={gowunBatang.className}>
        {/* ✅ GTM */}
        <Script id="gtm-script">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5X95W8N8');
          `}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5X95W8N8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Main>{children}</Main>
        </ThemeProvider>
      </body>
    </html>
  );
}

import styled from "styled-components";

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;
