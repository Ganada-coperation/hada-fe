"use client";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/app/styles/globalStyles";
import theme from "@/app/styles/theme";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import styled from "styled-components";
import { notoSans } from "@/app/styles/fonts"; // ✅ 기본 폰트 추가


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
         <body className={notoSans.className}> {/* ✅ 기본 폰트 적용 */}
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Wrapper>
            <Header />
            <MainContent>{children}</MainContent>
            <Footer />
          </Wrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

// ✅ 모든 페이지에 동일한 화면 크기 적용
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-width: 440px;
  height: 100vh;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  background-color: white;
  margin: 0 auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

// ✅ 컨텐츠 중앙 정렬
const MainContent = styled.main`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;