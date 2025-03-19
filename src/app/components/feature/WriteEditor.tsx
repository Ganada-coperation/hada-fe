import { useState } from "react";
import { gowunBatang } from "@/app/styles/fonts";
import styled from "styled-components";

interface WriteEditorProps {
  content: string;
  setContent: (value: string) => void;
}

export default function WriteEditor({ content, setContent }: WriteEditorProps) {
  const [isEditing, setIsEditing] = useState(true);
  const [draftContent, setDraftContent] = useState(content);

  // ✅ 작성 완료 (저장)
  const handleSave = () => {
    setContent(draftContent);
    setIsEditing(false);
  };

  // ✅ 수정 버튼 클릭 시 다시 편집 가능
  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <EditorWrapper>
      {isEditing ? (
        <StyledTextArea
          value={draftContent}
          onChange={(e) => setDraftContent(e.target.value)}
          placeholder="여기에 글을 작성하세요..."
        />
      ) : (
        <ContentPreview>
          {content || "작성된 글이 없습니다."}
        </ContentPreview>
      )}

      {/* ✅ 버튼 UI (작성 완료 → 수정하기 버튼 전환) */}
      {isEditing ? (
        <SaveButton onClick={handleSave} disabled={draftContent.trim().length === 0}>
          작성 완료
        </SaveButton>
      ) : (
        <EditButton onClick={handleEdit}>수정하기</EditButton>
      )}
    </EditorWrapper>
  );
}

// ✅ 스타일 정의
const EditorWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ✅ 글쓰기 (편집 모드)
const StyledTextArea = styled.textarea`
  width: 100%;
  height: 300px;
  background: url("/images/background-grid.png") no-repeat center;
  background-size: cover;
  font-family: ${gowunBatang.style.fontFamily};
  font-size: 16px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  resize: none;
  outline: none;
  transition: all 0.3s ease-in-out;
`;

// ✅ 저장된 글 (미리보기)
const ContentPreview = styled.div`
  width: 100%;
  height: 300px;
  padding: 16px;
  font-family: ${gowunBatang.style.fontFamily};
  font-size: 16px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  text-align: left;
  white-space: pre-wrap;
  cursor: default;
  transition: all 0.3s ease-in-out;
`;

// ✅ 작성 완료 버튼
const SaveButton = styled.button`
  margin-top: 10px;
  width: 200px;
  padding: 12px;
  font-size: 16px;
  font-family: ${gowunBatang.style.fontFamily};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

// ✅ 수정 버튼
const EditButton = styled(SaveButton)`
  background-color: ${({ theme }) => theme.colors.secondary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
