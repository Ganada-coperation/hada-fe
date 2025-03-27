// hada-web/src/app/write/page.tsx

"use client";

import { useState, useEffect } from "react";
import WriteEditor from "@/app/components/feature/WriteEditor";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import BackButton from "@/app/components/common/BackButton";
import CompleteModal from "@/app/(modals)/@completeModal/CompleteModal";
import { gowunBatang } from "@/app/styles/fonts";
import { checkNickname } from "@/app/services/userService";
import { savePost } from "@/app/services/postService";
import { subscribeNewsletter } from "@/app/services/newsletterService";
import styled from "styled-components";

export default function WritePage() {
  const [nickname, setNickname] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [showWriteEditor, setShowWriteEditor] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  useEffect(() => {
    if (nickname.length > 0) {
      checkNickname(nickname)
        .then((data) => {
          setNicknameMessage(data.available ? "멋진 필명이네요!" : "이미 사용 중인 필명입니다");
        })
        .catch(() => setNicknameMessage("오류가 발생했습니다."));
    } else {
      setNicknameMessage(null);
    }
  }, [nickname]);

  const handleSaveFlow = async (email: string) => {
    try {
      await subscribeNewsletter(email);
      await savePost(nickname, title, content);
      alert("글 저장과 뉴스레터 구독이 완료되었습니다!");
      setIsCompleteModalOpen(false);
    } catch (error) {
      console.error("저장 또는 구독 실패:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <StyledWriteWrapper>
      <StyledWritePage>
        {(showTitleInput || showWriteEditor) && (
          <BackButton
            onClick={() => {
              if (showWriteEditor) setShowWriteEditor(false);
              else if (showTitleInput) setShowTitleInput(false);
            }}
          />
        )}

        <StyledTitle>하다 | 나만의 이야기 작성</StyledTitle>

        {!showTitleInput && (
          <>
            <Input placeholder="닉네임을 입력하세요" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            {nicknameMessage && (
              <StyledNicknameMessage $isError={nicknameMessage.includes("이미")}>
                {nicknameMessage}
              </StyledNicknameMessage>
            )}
            <Button
              text="확인"
              onClick={() => nickname.length > 0 && !nicknameMessage?.includes("이미") && setShowTitleInput(true)}
              disabled={nickname.length < 1 || nicknameMessage?.includes("이미")}
            />
          </>
        )}

        {showTitleInput && !showWriteEditor && (
          <>
            <Input placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Button text="확인" onClick={() => title.length > 0 && setShowWriteEditor(true)} disabled={title.length === 0} />
          </>
        )}

        {showWriteEditor && (
          <>
            <WriteEditor content={content} setContent={setContent} />
            <Button
              text="글 저장하기"
              onClick={() => setIsCompleteModalOpen(true)}
              disabled={!nickname || !title || content.length < 5}
            />
          </>
        )}

        {isCompleteModalOpen && (
          <CompleteModal
            onConfirm={handleSaveFlow}
            onClose={() => setIsCompleteModalOpen(false)}
          />
        )}
      </StyledWritePage>
    </StyledWriteWrapper>
  );
}

const StyledWriteWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledTitle = styled.h1`
  font-family: ${gowunBatang.style.fontFamily};
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 16px;
`;

const StyledNicknameMessage = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== '$isError',
})<{ $isError: boolean }>`
  font-size: 14px;
  color: ${({ $isError, theme }) => ($isError ? "red" : theme.colors.primary)};
`;

const StyledWritePage = styled.div`
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
