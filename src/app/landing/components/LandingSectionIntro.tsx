// src/app/landing/components/LandingSectionIntro.tsx
"use client";

import styled from "styled-components";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";
import Image from "next/image";


export default function LandingSectionIntro() {
  const animated = useScrollFadeIn();

  return (
    <Section {...animated}>
      <TextBlock>
        <Title>
          당신만의 이야기를
          <br />
          편안하게 시작해보세요
        </Title>
        <Description>
          ‘하다’는 챗봇과의 대화를 통해 
          <br />
           나만의 완성된 글을 만들어줍니다.
        </Description>
      </TextBlock>

      {/* ✅ 일러스트 추가 */}
      <IllustrationWrapper>
        <Image
          src="/images/landing-illustration.png"
          alt="중년 여성이 창가에서 글을 쓰는 장면"
          width={320}
          height={320}
          style={{ objectFit: "contain" }}
        />
      </IllustrationWrapper>
    </Section>
  );
}

const Section = styled.section`
  min-height: 100vh;
  padding: 40px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const Description = styled.p`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const IllustrationWrapper = styled.div`
  width: 100%;
  max-width: 360px;

  img {
    border-radius: 8px;
    width: 100%;
    height: auto;
  }
`;