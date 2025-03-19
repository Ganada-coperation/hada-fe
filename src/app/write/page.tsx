"use client";

import WriteEditor from "@/app/components/feature/WriteEditor";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import BackButton from "@/app/components/common/BackButton";
import SubscribeModal from "@/app/(modals)/@emailModal/subscribe"; // ✅ 이메일 입력 모달
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { gowunBatang } from "@/app/styles/fonts";

export default function WritePage() {
  const [nickname, setNickname] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ 모달 상태 추가

  const [showTitleInput, setShowTitleInput] = useState(false);
  const [showWriteEditor, setShowWriteEditor] = useState(false);

  // ✅ 닉네임 중복 확인
  const existingNicknames = ["홍길동", "김철수", "이영희"];

  useEffect(() => {
    if (nickname.length > 0) {
      if (existingNicknames.includes(nickname)) {
        setNicknameMessage("이미 사용 중인 필명입니다");
      } else {
        setNicknameMessage("멋진 필명이네요!");
      }
    } else {
      setNicknameMessage(null);
    }
  }, [nickname]);

  return (
    <StyledWriteWrapper>
      <StyledWritePage>
        {/* ✅ 뒤로 가기 버튼 */}
        {(showTitleInput || showWriteEditor) && (
          <BackButton
            onClick={() => {
              if (showWriteEditor) setShowWriteEditor(false);
              else if (showTitleInput) setShowTitleInput(false);
            }}
          />
        )}

        <StyledTitle>하다 | 나만의 이야기 작성</StyledTitle>

        {/* ✅ 닉네임 입력 */}
        {!showTitleInput && (
          <>
            <Input placeholder="닉네임을 입력하세요" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            {nicknameMessage && (
              <StyledNicknameMessage isError={nicknameMessage.includes("이미")}>
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

        {/* ✅ 제목 입력 */}
        {showTitleInput && !showWriteEditor && (
          <>
            <Input placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Button text="확인" onClick={() => title.length > 0 && setShowWriteEditor(true)} disabled={title.length === 0} />
          </>
        )}

        {/* ✅ 글쓰기 에디터 */}
        {showWriteEditor && (
          <>
            <WriteEditor content={content} setContent={setContent} />
            <Button text="뉴스레터로 받아보기" onClick={() => setIsModalOpen(true)} disabled={content.length < 5} />
          </>
        )}

        {/* ✅ 이메일 입력 모달 */}
        {isModalOpen && (
          <SubscribeModal 
            nickname={nickname} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </StyledWritePage>
    </StyledWriteWrapper>
  );
}

// ✅ 애니메이션 효과 (부드러운 등장)
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ✅ 전체 페이지 스타일
const StyledWriteWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

// ✅ 제목 스타일
const StyledTitle = styled.h1`
  font-family: ${gowunBatang.style.fontFamily};
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 16px;
`;

// ✅ 닉네임 메시지 스타일
const StyledNicknameMessage = styled.p<{ isError: boolean }>`
  font-size: 14px;
  color: ${({ isError, theme }) => (isError ? "red" : theme.colors.primary)};
`;

// ✅ 글쓰기 페이지 스타일
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
