import { createGlobalStyle } from "styled-components";
import { gowunBatang } from "./fonts"; // Gowun Batang import

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
    font-family: ${gowunBatang.style.fontFamily}, sans-serif; // ✅ Gowun Batang 기본 적용
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  h1, h2, h3 {
    font-weight: 400;
    font-size: 24px;
    line-height: 34px;
    text-align: center;
  }

  button, input, textarea {
    font-family: ${gowunBatang.style.fontFamily}, sans-serif;
  }
`;

export default GlobalStyle;
