import { createGlobalStyle } from "styled-components";
import { gowunBatang } from "./fonts";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100vw;
    height: 100vh;
    font-family: ${gowunBatang.style.fontFamily}, sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1.6;
  }

  h1, h2, h3 {
    font-weight: 500;
    font-size: 24px;
    line-height: 34px;
    text-align: center;
    margin-bottom: 16px;
  }

  button, input, textarea {
    font-family: ${gowunBatang.style.fontFamily}, sans-serif;
  }

  button {
    transition: all 0.3s ease;
    cursor: pointer;
  }

  input, textarea {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 12px;
    font-size: 16px;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default GlobalStyle;
