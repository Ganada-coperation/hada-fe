// src/app/layout.tsx  <-- 이제 서버 컴포넌트
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@styles/globalStyles";
import theme from "@styles/theme";
import { gowunBatang } from "@styles/fonts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={gowunBatang.className}>
        {/* GTM 스크립트는 Client Side가 필요하니,
            이 부분만 Client 컴포넌트로 분리하거나
            next/script를 여기서 여전히 사용해도 됩니다 */}
        {children}
      </body>
    </html>
  );
}
