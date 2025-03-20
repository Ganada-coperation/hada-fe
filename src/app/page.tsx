"use client";

import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { gowunBatang } from "@/app/styles/fonts";
import { useRouter } from "next/navigation";
import SubscribeModal from "@/app/(modals)/@emailModal/subscribe";
import Button from "@/app/components/common/Button"; // ✅ 공통 버튼 사용

export default function HomePage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      {/* ✅ 로고 */}
      <Logo>HADA</Logo>

      {/* ✅ 캐치프레이즈 */}
      <Catchphrase>나의 이야기를 하다.</Catchphrase>

      {/* ✅ 버튼 그룹 */}
      <ButtonGroup>
        <a href="http://pf.kakao.com/_kxdKXn" target="_blank" rel="noopener noreferrer">
          <StyledButton className="home-btn" text="🗨️ 챗봇 대화해보기" onClick={() => {}} />
        </a>
        <StyledButton className="home-btn" text="✍️ 글쓰러 가기" onClick={() => router.push("/write")} />
        <StyledButton className="home-btn" text="📩 뉴스레터 구독하기" onClick={() => setIsModalOpen(true)} />
      </ButtonGroup>

      {/* ✅ 뉴스레터 구독 모달 */}
      {isModalOpen && (
        <SubscribeModal 
          nickname="내" 
          onClose={() => setIsModalOpen(false)} 
        >
          <ModalDescription>
            나와 비슷한 사람이 쓴 글이나, <br /> 내가 직접 쓴 글을 뉴스레터로 받아볼 수 있어요!
          </ModalDescription>
        </SubscribeModal>
      )}
    </Container>
  );
}

// ✅ 로고 애니메이션 (서서히 나타나면서 아래로 이동)
const fadeInMove = keyframes`
  from { opacity: 0; transform: translateY(-15px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ✅ 페이드인 애니메이션
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ✅ 전체 페이지 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

// ✅ 로고 스타일 (크기 확대 + 서서히 등장 애니메이션)
const Logo = styled.h1`
  font-family: ${gowunBatang.style.fontFamily};
  font-size: 56px; 
  font-weight: 590;
  animation: ${fadeInMove} 1s ease-in-out;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.textPrimary}; 
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2); /* ✅ 텍스트 그림자 추가 */
`;

// ✅ 캐치프레이즈 스타일 (페이드인 효과)
const Catchphrase = styled.p`
font-family: ${gowunBatang.style.fontFamily};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 32px;
  animation: ${fadeIn} 1.2s ease-in-out;
`;

// ✅ 버튼 그룹
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: ${fadeIn} 1.4s ease-in-out;
`;

// ✅ `Button.tsx`에서 가져온 버튼의 추가적인 스타일
const StyledButton = styled(Button)`
  width: 260px !important;
  font-size: 18px !important;
  font-weight: 480 !important;
  padding: 14px 10px !important;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2) !important;

  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.5) !important;
    transform: scale(1.05) !important;
  }
`;

// ✅ 뉴스레터 설명 스타일
const ModalDescription = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  line-height: 1.5;
`;
