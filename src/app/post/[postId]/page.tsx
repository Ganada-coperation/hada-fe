"use client";

import { useParams } from "next/navigation";
import styled from "styled-components";
import useSWR from "swr";
import { gowunBatang } from "@styles/fonts";
import { fetcher } from "@utils/fetcher";

export default function PostDetailPage() {
  const { postId } = useParams();

  const { data, error } = useSWR(`/posts/${postId}`, fetcher);

  if (error) return <ErrorText>글을 불러오는 중 오류가 발생했습니다.</ErrorText>;
  if (!data) return <LoadingText>글을 불러오는 중입니다...</LoadingText>;

  const { nickname, title, content } = data.result;

  return (
    <PageWrapper>
      <PageContainer>
        <Title>🌸 {title}</Title>
        <SubTitle>👤 작성자: {nickname}</SubTitle>
        <Divider />
        <Content>{content}</Content>
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
  font-family: ${gowunBatang.style.fontFamily};
`;

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 90%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SubTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin-bottom: 24px;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: pre-line;
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ErrorText = styled.p`
  color: red;
`;
