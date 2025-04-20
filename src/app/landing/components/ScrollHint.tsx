"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

export default function ScrollHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById("start"); // HomePage 시작 지점
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(false); // HomePage 보이면 숨김
        else setVisible(true);
      },
      { threshold: 0.2 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return <Indicator>아래로<br />내려보세요 ↓</Indicator>;
}

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(4px); }
  100% { transform: translateY(0); }
`;

const Indicator = styled.div`
  position: fixed;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  animation: ${float} 2s ease-in-out infinite;
  writing-mode: vertical-rl;
  text-align: center;
  z-index: 20;

  @media (max-width: 480px) {
    display: none;
  }
`;
