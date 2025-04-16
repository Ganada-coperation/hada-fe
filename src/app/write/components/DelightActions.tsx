"use client";

import styled from "styled-components";
import Button from "@components/common/Button";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { loadKakaoSdk, shareKakao } from "@utils/kakao";

interface DelightActionsProps {
  currentStep: number;
}

export default function DelightActions({ currentStep }: DelightActionsProps) {
  useEffect(() => {
    loadKakaoSdk().catch(() => {
      toast.error("카카오 SDK 로딩 실패");
    });
  }, []);

  const handleShare = () => {
    try {
      shareKakao();
      toast.success("친구에게 공유되었습니다! 🎉");
    } catch (err) {
      console.error(err);
      toast.error("공유 중 오류가 발생했습니다.");
    }
  };

  if (currentStep !== 3) return null;

  return (
    <ActionsContainer>
      <ActionButton text="💌 친구에게 공유하기" onClick={handleShare} />
    </ActionsContainer>
  );
}

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const ActionButton = styled(Button)`
  font-size: 14px;
  padding: 10px;
`;
