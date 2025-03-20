"use client";

import styled, { keyframes } from "styled-components";
import { gowunBatang } from "@/app/styles/fonts";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <Container>
      {/* ✅ 로고 */}
      <Logo>HADA</Logo>

      {/* ✅ 캐치프레이즈 */}
      <Catchphrase>나의 이야기를 하다.</Catchphrase>

      {/* ✅ 버튼 그룹 */}
      <ButtonGroup>
        <StyledButton onClick={() => router.push("/chatbot")}>🗨️ 챗봇 대화해보기</StyledButton>
        <StyledButton onClick={() => router.push("/write")}>✍️ 글쓰러 가기</StyledButton>
        <StyledButton onClick={() => router.push("/newsletter")}>📩 뉴스레터 구독하기</StyledButton>
      </ButtonGroup>
    </Container>
  );
}

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

// ✅ 로고 스타일
const Logo = styled.h1`
  font-family: ${gowunBatang.style.fontFamily};
  font-size: 48px;
  font-weight: 700;
  animation: ${fadeIn} 1s ease-in-out;
  margin-bottom: 10px;
`;

// ✅ 캐치프레이즈 스타일
const Catchphrase = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 30px;
  animation: ${fadeIn} 1.2s ease-in-out;
`;

// ✅ 버튼 그룹
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeIn} 1.4s ease-in-out;
`;

// ✅ 버튼 스타일
const StyledButton = styled.button`
  width: 260px;
  padding: 14px 20px;
  font-size: 18px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  
  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.5);
    transform: scale(1.05);
  }
`;

