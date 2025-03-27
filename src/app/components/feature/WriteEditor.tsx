// hada-web/src/app/components/feature/WriteEditor.tsx

"use client";

import { gowunBatang } from "@/app/styles/fonts";
import styled from "styled-components";

interface WriteEditorProps {
  content: string;
  setContent: (value: string) => void;
}

export default function WriteEditor({ content, setContent }: WriteEditorProps) {
  return (
    <EditorWrapper>
      <StyledTextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="여기에 글을 작성하세요..."
      />
    </EditorWrapper>
  );
}

const EditorWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 300px;
  background-size: cover;
  font-family: ${gowunBatang.style.fontFamily};
  font-size: 16px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  resize: none;
  outline: none;
  transition: all 0.3s ease-in-out;
`;
