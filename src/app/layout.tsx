// src/app/layout.tsx

"use client";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "@styles/globalStyles";
import theme from "@styles/theme";
import { gowunBatang } from "@styles/fonts";
import styled from "styled-components";
import FloatingKakaoButton from "@components/common/FloatingKakaoButton";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* ✅ GTM 스크립트 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5X95W8N8');
            `,
          }}
        />
      </head>

      <body className={gowunBatang.className}>
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
          <Wrapper>
            <MainContent>{children}</MainContent>
            <FloatingKakaoButton />
          </Wrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

// ✅ 스타일 컴포넌트
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.layout.maxWidth};
  min-width: ${({ theme }) => theme.layout.minWidth};
  height: ${({ theme }) => theme.layout.height};
  padding: ${({ theme }) => theme.layout.wrapperPadding};
  margin: 0 auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const MainContent = styled.main`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;
