// src/app/landing/components/LandingSectionIntro.tsx
"use client";

import styled from "styled-components";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";


export default function LandingSectionIntro() {
  const animated = useScrollFadeIn();

  return (
    <Section {...animated}>
      <Title>당신만의 이야기를<br />편안하게 시작해보세요</Title>
      <Description>
        ‘하다’는 챗봇과의 대화를 통해 자연스럽게<br />
        글을 완성하는 중년 맞춤형 글쓰기 도우미입니다.
      </Description>
    </Section>
  );
}

const Section = styled.section`
  min-height: 100vh;
  padding: 80px 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;
