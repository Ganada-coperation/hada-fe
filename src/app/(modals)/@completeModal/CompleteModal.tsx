// hada-web/src/app/(modals)/@completeModal/CompleteModal.tsx

"use client";

import { useState } from "react";
import Modal from "@/app/components/common/Modal";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import { isValidEmail } from "@/app/utils/validation";

interface CompleteModalProps {
  onConfirm: (email: string) => void;
  onClose: () => void;
}

export default function CompleteModal({ onConfirm, onClose }: CompleteModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!isValidEmail(email)) {
      setError("유효한 이메일을 입력해주세요.");
      return;
    }

    setError("");
    onConfirm(email); // 부모 컴포넌트 (WritePage)로 이메일 넘김
  };

  return (
    <Modal onClose={onClose}>
      <h2 style={{ textAlign: "center", marginBottom: "8px" }}>작성 완료 🎉</h2>
      <p style={{ textAlign: "center", marginBottom: "16px" }}>
        입력하신 글이 곧 저장됩니다! <br />
        이메일을 입력하면 작성하신 글을 보내드릴게요 <br /> 앞으로 비슷한 글도 받아보실 수 있어요 ✉️
      </p>

      <Input
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {error && (
        <p style={{ color: "red", fontSize: "14px", marginTop: "4px", marginBottom: "8px", textAlign: "center" }}>
          {error}
        </p>
      )}

      <Button text="확인" onClick={handleConfirm} />
    </Modal>
  );
}
