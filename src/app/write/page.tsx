"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import HomeButton from "@components/common/HomeButton";
import BackButton from "@components/common/BackButton";
import LoadingSpinner from "@components/common/LoadingSpinner";
import ProgressIndicator from "./components/ProgressIndicator";
import CompleteModal from "@modals/@completeModal/CompleteModal";
import NicknameStep from "./_steps/NicknameStep";
import TitleStep from "./_steps/TitleStep";
import ContentStep from "./_steps/ContentStep";
import { savePost } from "@services/postService";
import { subscribeNewsletter } from "@services/newsletterService";
import { sendPostEmail } from "@services/postEmailService";
import { trackEvent } from "@utils/analytics";
import toast from "react-hot-toast";
import { gowunBatang } from "@styles/fonts";

export default function WritePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParam = (key: string) => decodeURIComponent(searchParams.get(key) || "");

  const [nickname, setNickname] = useState(getParam("nickname"));
  const [title, setTitle] = useState(getParam("title"));
  const [content, setContent] = useState(getParam("content"));

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  useEffect(() => {
    trackEvent("page_view_write");
  }, []);

  useEffect(() => {
    trackEvent("write_step_change", { step: currentStep });
  }, [currentStep]);

  const handleCompleteFlow = () => {
    setIsCompleteModalOpen(true);
  };

  const handleSubmitPost = async (email: string, mood: string) => {
    try {
      setIsLoading(true);

      await subscribeNewsletter(email);
      const response = await savePost(nickname, title, content, email, mood);
      const postId = response?.result?.postId;
      if (!postId) throw new Error("글 저장 실패");

      await sendPostEmail(email, postId);

      trackEvent("post_saved", { mood });
      toast.success("🎉 당신의 글이 저장되었습니다! 이메일을 확인해보세요.");

      setTimeout(() => router.push(`/write/complete?postId=${postId}`), 1500);
    } catch (error) {
      console.error(error);
      toast.error("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
      setIsCompleteModalOpen(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <NicknameStep nickname={nickname} setNickname={setNickname} onNext={() => setCurrentStep(2)} />;
      case 2:
        return <TitleStep title={title} setTitle={setTitle} onNext={() => setCurrentStep(3)} />;
      case 3:
        return <ContentStep content={content} setContent={setContent} onNext={handleCompleteFlow} />;
      default:
        return null;
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((currentStep - 1) as 1 | 2 | 3);
  };

  return (
    <PageWrapper>
      {isLoading && <LoadingSpinner />}
      <PageContainer>
        <HomeButton />
        {currentStep > 1 && <BackButton onClick={handleBack} />}
        <ProgressIndicator currentStep={currentStep} />
        {renderStep()}
      </PageContainer>

      {isCompleteModalOpen && (
        <CompleteModal
          onClose={() => setIsCompleteModalOpen(false)}
          onConfirm={handleSubmitPost}
          nickname={nickname}
        />
      )}
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
`;
