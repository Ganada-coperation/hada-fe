"use client";

import {
  LandingSectionIntro,
  LandingSectionChatbot,
  LandingSectionHowToUse,
  LandingSectionExamples,
} from "./";
import ScrollHint from "./ScrollHint";
import styled from "styled-components";

export default function LandingPage() {
  return (
    <Wrapper>
      <Section>
        <LandingSectionIntro />
      </Section>
      <Section>
        <LandingSectionChatbot />
      </Section>
      <Section>
        <LandingSectionHowToUse />
      </Section>
      <Section>
        <LandingSectionExamples />
      </Section>
      <ScrollHint />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.section`
  width: 100%;
  padding: 60px 0;
`;
