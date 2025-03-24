"use client";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/app/styles/globalStyles";
import theme from "@/app/styles/theme";
import { gowunBatang } from "@/app/styles/fonts";
import styled from "styled-components";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body  className={gowunBatang.className}> {/* ✅ 기본 폰트 적용 */}
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Wrapper>
            <MainContent>{children}</MainContent>
          </Wrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

// ✅ 모든 페이지에 동일한 화면 크기 적용 (theme.ts 활용)
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.layout.maxWidth}; /* ✅ theme.ts에서 가져옴 */
  min-width: ${({ theme }) => theme.layout.minWidth}; /* ✅ theme.ts에서 가져옴 */
  height: ${({ theme }) => theme.layout.height}; /* ✅ theme.ts에서 가져옴 */
  padding: ${({ theme }) => theme.layout.wrapperPadding}; /* ✅ theme.ts에서 가져옴 */
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
