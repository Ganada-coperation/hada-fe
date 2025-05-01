// src/app/components/feature/PrefillWritePage.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchGeneratedContentById } from "@services/generatedContentService";
import { savePost, sendPostMail } from "@services/postService";
import CompletedModal from "@completeModal/CompleteModal";
import LoadingSpinner from "@components/common/LoadingSpinner";
import { FeedbackMessage } from "@components/common/FeedbackMessage";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import isPropValid from "@emotion/is-prop-valid";
import { fadeSlideUp } from "@styles/animations";
import AppLayout from "@components/layout/AppLayout";

export interface Props {
  generatedPostId: string;
}

export default function PrefillWritePage({ generatedPostId }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNicknameError, setShowNicknameError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchGeneratedContentById(generatedPostId);
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error("❌ 글 불러오기 실패:", err);
        toast.error("글 불러오기 실패");
        router.push("/");
      }
    };
    load();
  }, [generatedPostId, router]);

  const handleSaveWithModal = async (email: string, mood: string) => {
    if (!nickname.trim()) {
      setShowNicknameError(true);
      toast.error("닉네임을 입력하세요.");
      return;
    }

    try {
      setLoading(true);
      const response = await savePost({
        nickname,
        title,
        content,
        email,
        mood,
        postId: generatedPostId,
      });
      const postId = response.postId;

      if (email) {
        try {
          await sendPostMail(email, postId);
        } catch (mailError) {
          console.error("❌ 이메일 전송 실패:", mailError);
          toast.error("이메일 전송 실패");
          return;
        }
      }

      router.push(`/write/complete?postId=${postId}`);
    } catch (e) {
      console.error("❌ 저장 실패:", e);
      toast.error("저장 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleClickSave = () => {
    if (!nickname.trim()) {
      setShowNicknameError(true);
    } else {
      setModalOpen(true);
      setShowNicknameError(false);
    }
  };

  return (
    <AppLayout>
      <Container>
        <Header>당신의 이야기를 들려주세요</Header>
        <Subtext>마음을 천천히 꺼내 적어보세요. ‘하다’가 함께합니다.</Subtext>

        <Form>
          <FieldGroup>
            <Label htmlFor="nickname">👤 닉네임</Label>
            <Input
              placeholder="예: 봄날의 고양이"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            {showNicknameError && (
              <FeedbackMessage isError>닉네임을 입력하세요</FeedbackMessage>
            )}
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="title">📝 제목</Label>
            <Input
              placeholder="예: 오늘, 내 마음을 기록합니다"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FieldGroup>

          <FieldGroup $isLast>
            <Label htmlFor="content">📖 글 내용</Label>
            <StyledTextarea
              placeholder="오늘 하루는 어땠나요? 당신의 이야기를 자유롭게 적어보세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FieldGroup>

          <Button text="✉️ 이야기 저장하기" onClick={handleClickSave} />
        </Form>

        {modalOpen && (
          <CompletedModal
            nickname={nickname}
            onClose={() => setModalOpen(false)}
            onConfirm={handleSaveWithModal}
          />
        )}

        {loading && <LoadingSpinner />}
      </Container>
    </AppLayout>
  );
}

// 🌿 스타일 정의
const Container = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.h1`
  font-size: var(--fs-xl);
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Subtext = styled.p`
  text-align: center;
  font-size: var(--fs-xs);
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 32px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  // 순차적 애니메이션 적용
  & > div:nth-of-type(1) {
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.1s;
    opacity: 0;
  }

  & > div:nth-of-type(2) {
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.3s;
    opacity: 0;
  }

  & > div:nth-of-type(3) {
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.5s;
    opacity: 0;
  }

  & > button {
    animation: ${fadeSlideUp} 0.6s ease forwards;
    animation-delay: 0.7s;
    opacity: 0;
  }
`;

const FieldGroup = styled("div").withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "$isLast",
})<{ $isLast?: boolean }>`
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
  border-bottom: ${({ $isLast, theme }) =>
    $isLast ? "none" : `1px dashed ${theme.colors.border}`};
`;

const Label = styled.label`
  font-size: var(--fs-sm);
  font-weight: 600;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const StyledTextarea = styled.textarea`
  padding: 18px;
  font-size: var(--fs-xs);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  resize: vertical;
  min-height: 180px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
