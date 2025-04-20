// src/styles/animations.ts
import { keyframes } from "styled-components";

export const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const clickEffect = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;
