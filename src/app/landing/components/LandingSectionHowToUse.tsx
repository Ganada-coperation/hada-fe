"use client";

import styled from "styled-components";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";

export default function LandingSectionHowToUse() {
  const animated = useScrollFadeIn();

  return (
    <Section {...animated}>
      <Title>📌 사용 방법은 간단합니다</Title>
      <Steps>
        <li>1. 오늘 기분 한 줄을 입력하면</li>
        <li>2. 챗봇이 질문을 던지고</li>
        <li>3. 대화를 이어가며 이야기가 완성됩니다</li>
      </Steps>
    </Section>
  );
}

const Section = styled.section`
  padding: 80px 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Steps = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 18px;
  line-height: 2;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
