"use client";

import styled from "styled-components";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";

export default function LandingSectionChatbot() {
  const animated = useScrollFadeIn();

  return (
    <Section {...animated}>
      <Title>✍️ 챗봇과 함께 완성하는 이야기</Title>
      <Text>
        '하다'는 글을 처음 쓰는 중년도 <strong>질문에 답하듯</strong> 챗봇과 대화하며,
        <br />
        <strong>하나의 완성된 이야기</strong>를 자연스럽게 만들어갑니다.
      </Text>
    </Section>
  );
}

const Section = styled.section`
  min-height: 100vh;
  padding: 80px 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 26px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Text = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`;
