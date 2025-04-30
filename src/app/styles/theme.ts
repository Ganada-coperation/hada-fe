// src/app/styles/theme.ts
import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: "#3C4F76",
    secondary: "#6D5D4E",
    background: "#FFF8F0",
    cardBackground: "#FFFFFF",
    border: "#D8CFC4",
    textPrimary: "#2B2B2B",
    textSecondary: "#5F5F5F",
    textMuted: "#9D9D9D",
    floating: "#FFD700",
  },
  layout: {
    maxWidth: "460px",
    minWidth: "320px",
    height: "100vh",
    wrapperPadding:
      "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)",
  },
  // ← 여기부터 추가
  fonts: {
    primary: "var(--font-gowunbatang)",
  },
  typography: {
    fontSizes: {
      xs: "16px",   // 보조 텍스트
      sm: "18px",   // 버튼·레이블
      md: "20px",   // 본문 기본
      lg: "24px",   // 큰 본문
      xl: "28px",   // H3
      xxl: "32px",  // H2
      xxxl: "36px", // H1
    },
    lineHeights: {
      body: 1.6,
      heading: 1.4,
    },
    letterSpacings: {
      normal: "0.02em",
      wide: "0.03em",
    },
  },
 
};

export default theme;
