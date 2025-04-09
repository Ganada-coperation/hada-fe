"use client";

import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import HomeButton from "@components/common/HomeButton";
import BackButton from "@components/common/BackButton";
import CompleteModal from "@modals/@completeModal/CompleteModal";
import LoadingSpinner from "@components/common/LoadingSpinner";

import NicknameStep from "./_steps/NicknameStep";
import TitleStep from "./_steps/TitleStep";
import ContentStep from "./_steps/ContentStep";

import { savePost } from "@services/postService";
import { subscribeNewsletter } from "@services/newsletterService";
import { sendPostEmail } from "@services/postEmailService";

import { gowunBatang } from "@styles/fonts";

export default function WritePage() {
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCompleteFlow = async (email: string, mood: string) => {
    try {
      setIsLoading(true);

      await subscribeNewsletter(email);
      const savedPostResponse = await savePost(nickname, title, content, email, mood);

      const postId = savedPostResponse?.result?.postId;
      if (!postId) throw new Error("글 저장에 실패했습니다. postId 없음");

      await sendPostEmail(email, postId);

      alert("당신의 글을 이메일로 보내드렸어요!");

      window.dataLayer?.push({
        event: "post_saved",
        mood,
        eventCategory: "post",
        eventLabel: "write_complete",
      });

      setIsCompleteModalOpen(false);
      router.push("/");
    } catch (error) {
      console.error("저장 또는 메일 발송 실패:", error);
      alert("저장 또는 메일 전송 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <NicknameStep nickname={nickname} setNickname={setNickname} onNext={() => setCurrentStep(2)} />;
      case 2:
        return <TitleStep title={title} setTitle={setTitle} onNext={() => setCurrentStep(3)} />;
      case 3:
        return <ContentStep content={content} setContent={setContent} onNext={() => setIsCompleteModalOpen(true)} />;
      default:
        return null;
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <PageWrapper>
      {isLoading && <LoadingSpinner />}
      <PageContainer>
        <HomeButton />
        {currentStep > 1 && <BackButton onClick={handleBack} />}
        <Title>하다 | 나만의 이야기 작성</Title>
        {renderStep()}
        {isCompleteModalOpen && (
          <CompleteModal
            onConfirm={handleCompleteFlow}
            onClose={() => setIsCompleteModalOpen(false)}
            nickname={nickname}
          />
        )}
      </PageContainer>
    </PageWrapper>
  );
}

// 스타일
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
`;

const PageContainer = styled.div`
  font-family: ${gowunBatang.style.fontFamily};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  min-height: ${({ theme }) => theme.layout.height};
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 16px;
`;
