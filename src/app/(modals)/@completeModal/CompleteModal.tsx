import Modal from "@/app/components/common/Modal";
import Button from "@/app/components/common/Button";

interface CompleteModalProps {
  onClose: () => void;
}

export default function CompleteModal({ onClose }: CompleteModalProps) {
  return (
    <Modal onClose={onClose}>
      <h2>작성 완료되었습니다😊</h2>
      <p>입력하신 글이 저장되었어요!</p>
      <Button text="확인" onClick={onClose} />
    </Modal>
  );
}
