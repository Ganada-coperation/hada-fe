import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${({ theme }) => theme.fonts.body}; // ✅ 기본 폰트 (Noto Sans KR)
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  h1, h2, h3 {
    ${({ theme }) => theme.fonts.heading_bold_24px};
    text-align: center;
  }

  button {
    ${({ theme }) => theme.fonts.body};
    cursor: pointer;
  }

  .handwriting {
    font-family: ${({ theme }) => theme.fonts.handwriting} !important; // ✅ 손글씨 폰트 적용
  }
`;

export default GlobalStyle;
