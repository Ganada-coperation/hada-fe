"use client";

import styled from "styled-components";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";
import ChatBubble from "@/app/components/common/ChatBubble";

export default function LandingSectionChatbot() {
  const animated = useScrollFadeIn();

  return (
    <Section {...animated}>
      <Title>✍️ 챗봇과 함께 완성하는 이야기</Title>
      <Text>
        글을 처음 쓰는 중년도 <strong>친구와 이야기하듯</strong>
        <br /> 하다와 대화하며
        <br />
        <strong>하나의 완성된 이야기</strong>를 자연스럽게 만들어갑니다.
      </Text>

      <ChatWrapper>
        <ChatBubble from="bot" text="오늘 하루 어땠어요?" delay={0.1} />
        <ChatBubble
          from="user"
          text={`문득 예전에 애들이랑 같이\n저녁 먹던 때가 생각났어요.`}
          delay={0.2}
        />
        <ChatBubble
          from="user"
          text={`지금은 혼자 밥 먹는 날이 많아져서 그런가봐요..`}
          delay={0.3}
        />
        <ChatBubble from="bot" text="아이들 웃음소리, 반찬투정.." delay={0.4} />
        <ChatBubble from="bot" text="그런 소소한 순간들이 참 그립죠" delay={0.5} />
        <ChatBubble from="user" text="정신없이 바빴지만, 참 따뜻했네요" delay={0.6} />
        <ChatBubble from="bot" text="따뜻한 하루를 만들어낸 건 당신이에요" delay={0.7} />
        <ChatBubble from="bot" text="그런 당신이 있었기에 지금이 있는 거죠" delay={0.8} />
      </ChatWrapper>
    </Section>
  );
}

const Section = styled.section`
  padding: 40px 20px;
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
  margin-bottom: 40px;
`;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  gap: 8px;
`;