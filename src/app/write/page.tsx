"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";

import WriteEditor from "@features/WriteEditor";
import Input from "@components/common/Input";
import HomeButton from "@components/common/HomeButton";
import BackButton from "@components/common/BackButton";
import CompleteModal from "@modals/@completeModal/CompleteModal";
import Button from "@components/common/Button";
import { FeedbackMessage } from "@components/common/FeedbackMessage";

import { checkNickname } from "@services/userService";
import { savePost } from "@services/postService";
import { subscribeNewsletter } from "@services/newsletterService";
import { sendPostEmail } from "@services/postEmailService";

import { gowunBatang } from "@styles/fonts";
import { fadeSlideIn } from "@styles/animations";

export default function WritePage() {
  const [nickname, setNickname] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [showWriteEditor, setShowWriteEditor] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

 // ✅ 닉네임 중복 체크
useEffect(() => {
  if (!nickname) {
    setNicknameMessage(null);
    return;
  }

  checkNickname(nickname)
    .then((response) => {
      const available = response?.available ?? true;
      setNicknameMessage(available ? "멋진 필명이네요!" : "이미 사용 중인 필명입니다");
    })
    .catch(() => setNicknameMessage("오류가 발생했습니다."));
}, [nickname]);

  

const handleCompleteFlow = async (email: string, mood: string) => {
  try {
    await subscribeNewsletter(email);

    const savedPostResponse = await savePost(nickname, title, content, email, mood);
console.log('✅ 저장된 Post Response:', savedPostResponse);

const postId = savedPostResponse?.result?.postId;

if (!postId) {
  throw new Error("글 저장에 실패했습니다. postId 없음");
}

    await sendPostEmail(email, postId);

    alert("당신의 글을 이메일로 보내드렸어요!");

    window.dataLayer?.push({
      event: "post_saved",
      mood,
      eventCategory: "post",
      eventLabel: "write_complete",
    });

    setIsCompleteModalOpen(false);
  } catch (error) {
    console.error("저장 또는 메일 발송 실패:", error);
    alert("저장 또는 메일 전송 중 오류가 발생했습니다.");
  }
};


  
  // ✅ 이메일 본문 포맷
  const formatPostContent = (title: string, content: string) =>
    `제목: ${title}\n\n내용:\n${content}`;

  // ✅ 단계별 화면 렌더링
  const renderStep = () => {
    if (!showTitleInput) {
      return (
        <StepContainer>
          <Input
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          {nicknameMessage && (
            <FeedbackMessage isError={nicknameMessage.includes("이미")}>
              {nicknameMessage}
            </FeedbackMessage>
          )}
          <Button
            text="확인"
            onClick={() => setShowTitleInput(true)}
            disabled={!nickname || nicknameMessage?.includes("이미")}
          />
        </StepContainer>
      );
    }

    if (!showWriteEditor) {
      return (
        <StepContainer>
          <Input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            text="확인"
            onClick={() => setShowWriteEditor(true)}
            disabled={!title}
          />
        </StepContainer>
      );
    }

    return (
      <StepContainer>
        <WriteEditor content={content} setContent={setContent} />
        <Button
          text="글 저장하기"
          onClick={() => setIsCompleteModalOpen(true)}
          disabled={!nickname || !title || content.length < 3}
        />
      </StepContainer>
    );
  };

  return (
    <PageWrapper>
      <PageContainer>
        <HomeButton />

        {(showTitleInput || showWriteEditor) && (
          <BackButton
            onClick={() => {
              if (showWriteEditor) return setShowWriteEditor(false);
              if (showTitleInput) return setShowTitleInput(false);
            }}
          />
        )}

        <Title>하다 | 나만의 이야기 작성</Title>

        {renderStep()}

        {isCompleteModalOpen && (
          <CompleteModal
            onConfirm={handleCompleteFlow}
            onClose={() => setIsCompleteModalOpen(false)}
          />
        )}
      </PageContainer>
    </PageWrapper>
  );
}

// ✅ 스타일 컴포넌트
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
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

const StepContainer = styled.div`
  animation: ${fadeSlideIn} 0.6s ease;
  width: 100%;
  margin-top: 16px;
`;
