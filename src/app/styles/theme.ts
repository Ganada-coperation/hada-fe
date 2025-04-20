const theme = {
  colors: {
    primary: "#3C4F76",            // 신뢰감 있는 짙은 블루
    secondary: "#6D5D4E",          // 따뜻한 브라운
    background: "#FFF8F0",         // 부드러운 베이지 톤 배경
    cardBackground: "#FFFFFF",    
    border: "#D8CFC4",
    textPrimary: "#2B2B2B",        // 진한 검은 회색으로 눈에 더 잘 띔
    textSecondary: "#5F5F5F",
    textMuted: "#9D9D9D",
    floating: "#FFD700",           // 밝고 눈에 띄는 노란색
  },
  layout: {
    maxWidth: "460px",
    minWidth: "320px",
    height: "100vh",
    wrapperPadding:
      "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)",
  },
};
export default theme;