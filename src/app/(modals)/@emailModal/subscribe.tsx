"use client";

import { useState } from "react";
import Modal from "@components/common/Modal";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import styled from "styled-components";
import { isValidEmail } from "@utils/validation";

interface SubscribeModalProps {
  onClose: () => void;
  onSubmit?: (email: string) => Promise<void>;
  showInput?: boolean;
}

export default function SubscribeModal({
  onClose,
  onSubmit,
  showInput = false,
}: SubscribeModalProps) {
  const [email, setEmail] = useState("");

  const handleClick = async () => {
    if (!isValidEmail(email)) {
      alert("올바른 이메일을 입력하세요.");
      return;
    }

    if (onSubmit) {
      try {
        await onSubmit(email);
      } catch (err) {
        console.error("구독 처리 중 오류:", err);
        alert("구독 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Modal onClose={onClose} title="뉴스레터 구독">
      <Description>
        나와 비슷한 사람이 쓴 글이나, <br />
        내가 직접 쓴 글을 뉴스레터로 보내드릴게요!
      </Description>

      {showInput && (
        <>
          <StyledInput
            
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledButton text="구독하기" onClick={handleClick} />
        </>
      )}
    </Modal>
  );
}

const Description = styled.p`
  font-size: 16px;
  text-align: center;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StyledInput = styled(Input)`
  margin: 10px 0;
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 8px;
  font-size: 16px;
`;
