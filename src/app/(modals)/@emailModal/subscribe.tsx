import Modal from "@/app/components/common/Modal";
import { ReactNode } from "react";

interface SubscribeModalProps {
  nickname: string;
  onClose: () => void;
  children?: ReactNode;
}

export default function SubscribeModal({ nickname, onClose, children }: SubscribeModalProps) {
  return (
    <Modal onClose={onClose} title="뉴스레터 구독">
      {!children && (
        <p style={{ marginBottom: "16px" }}>
          <strong>{nickname || "사용자"}</strong>님이 작성하신 글을 뉴스레터로 보내드릴게요!
        </p>
      )}
      {children}
    </Modal>
  );
}
