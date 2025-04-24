// src/app/layout.tsx

import { ThemeProvider } from "styled-components";
import GlobalStyle from "@styles/globalStyles";
import theme from "@styles/theme";
import { gowunBatang } from "@styles/fonts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={gowunBatang.className}>
     <ThemeProvider theme={theme}>
         <GlobalStyle />
          {/* GTM 스크립트가 필요하면 여기에 or Client 컴포넌트로 분리 */}
          {children}
       </ThemeProvider>
      </body>
    </html>
  );
}
