"use client";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";
import { fetchPostById, savePost } from "@services/postService";
import { sendPostEmail } from "@services/postEmailService";
import { subscribeNewsletter } from "@services/newsletterService";
import { gowunBatang } from "@styles/fonts";
import WriteEditor from "@features/WriteEditor";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import LoadingSpinner from "@components/common/LoadingSpinner";
import CompleteModal from "@modals/@completeModal/CompleteModal";
import HomeButton from "@components/common/HomeButton";
import BackButton from "@components/common/BackButton";
import toast from "react-hot-toast";

export default function PrefillWritePage() {
  const { postId } = useParams();
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  useEffect(() => {
    if (!postId) return;
  
    const loadData = async () => {
      try {
        const res = await fetchPostById(postId as string);
  
        if (!res || !res.nickname) {
          toast.error("존재하지 않는 글입니다.");
          router.push("/404"); // 혹은 원하는 fallback 경로
          return;
        }
  
        setNickname(res.nickname);
        setTitle(res.title);
        setContent(res.content);
      } catch {
        toast.error("글 데이터를 불러오는 데 실패했어요.");
        router.push("/404");
      } finally {
        setIsLoading(false);
      }
    };
  
    loadData();
  }, [postId]);
  

  const handleSubmit = async (email: string, mood: string) => {
    try {
      setIsLoading(true);
      await subscribeNewsletter(email);
      const res = await savePost(nickname, title, content, email, mood);
      const newPostId = res?.result?.postId;

      if (!newPostId) throw new Error("글 저장 실패");
      await sendPostEmail(email, newPostId);

      toast.success("이메일로 글을 전송했어요!");
      router.push(`/write/complete?postId=${newPostId}`);
    } catch {
      toast.error("글 저장 중 오류가 발생했어요.");
    } finally {
      setIsLoading(false);
      setIsCompleteModalOpen(false);
    }
  };

  if (isLoading || !postId) return <LoadingSpinner />;

  return (
    <PageWrapper>
      <PageContainer>
        <HomeButton />
        <BackButton onClick={() => router.back()} />
        <Title>하다 | 내 이야기 다듬기</Title>
        <Input placeholder="닉네임을 입력하세요" value={nickname ?? ""} onChange={(e) => setNickname(e.target.value)} />
        <Input placeholder="제목을 입력하세요" value={title ?? ""} onChange={(e) => setTitle(e.target.value)} />
        <WriteEditor content={content ?? ""} setContent={setContent} />
        <Button text="글 저장하기" onClick={() => setIsCompleteModalOpen(true)} disabled={!nickname || !title || content.length < 3} />
      </PageContainer>

      {isCompleteModalOpen && (
        <CompleteModal
          onClose={() => setIsCompleteModalOpen(false)}
          onConfirm={handleSubmit}
          nickname={nickname}
        />
      )}
    </PageWrapper>
  );
}

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
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 16px;
`;