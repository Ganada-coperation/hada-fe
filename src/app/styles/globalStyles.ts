import { createGlobalStyle } from "styled-components";
import { gowunBatang } from "./fonts";

const GlobalStyle = createGlobalStyle`
  /* Reset */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* CSS Variables for Typography */
  :root {
    /* Font Family */
    --font-primary: ${gowunBatang.style.fontFamily}, sans-serif;

    /* Font Sizes */
    --fs-xs: ${({ theme }) => theme.typography.fontSizes.xs};
    --fs-sm: ${({ theme }) => theme.typography.fontSizes.sm};
    --fs-md: ${({ theme }) => theme.typography.fontSizes.md};
    --fs-lg: ${({ theme }) => theme.typography.fontSizes.lg};
    --fs-xl: ${({ theme }) => theme.typography.fontSizes.xl};
    --fs-xxl: ${({ theme }) => theme.typography.fontSizes.xxl};
    --fs-xxxl: ${({ theme }) => theme.typography.fontSizes.xxxl};

    /* Line Heights */
    --lh-body: ${({ theme }) => theme.typography.lineHeights.body};
    --lh-heading: ${({ theme }) => theme.typography.lineHeights.heading};

    /* Letter Spacings */
    --ls-normal: ${({ theme }) => theme.typography.letterSpacings.normal};
    --ls-wide: ${({ theme }) => theme.typography.letterSpacings.wide};
  }

  html, body {
    width: 100vw;
    height: 100vh;
    font-family: var(--font-primary);
    font-size: var(--fs-md);
    line-height: var(--lh-body);
    letter-spacing: var(--ls-normal);
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  h1 {
    font-size: var(--fs-xxxl);
    line-height: var(--lh-heading);
    font-weight: 500;
    text-align: center;
    margin-bottom: 16px;
  }
  h2 {
    font-size: var(--fs-xxl);
    line-height: var(--lh-heading);
    font-weight: 500;
    text-align: center;
    margin-bottom: 16px;
  }
  h3 {
    font-size: var(--fs-xl);
    line-height: var(--lh-heading);
    font-weight: 500;
    text-align: center;
    margin-bottom: 16px;
  }

  button, input, textarea {
    font-family: var(--font-primary);
  }

  button {
    font-size: var(--fs-sm);
    letter-spacing: var(--ls-wide);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  input, textarea {
    font-size: var(--fs-md);
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 12px;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default GlobalStyle;