"use client";

import styled from "styled-components";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";

export default function LandingSectionExamples() {
  const animated = useScrollFadeIn();

  return (
    <Section {...animated}>
      <Title>📚 다른 분들의 이야기</Title>
      <ExampleCard>
        <strong>“퇴근길 벚꽃이 예뻐서 잠시 걸었어요.”</strong>
        <p>
          <em>
            예전 아이들과 벚꽃길을 걷던 기억이 떠올랐습니다. <br />
            지금은 혼자지만, 그 시절이 그립고 고맙습니다.
          </em>
        </p>
      </ExampleCard>
    </Section>
  );
}

const Section = styled.section`
  padding: 40px 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ExampleCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 24px;
  border-radius: 10px;
  max-width: 500px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.textPrimary};

  strong {
    display: block;
    font-size: 18px;
    margin-bottom: 12px;
  }

  em {
    font-style: normal;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
