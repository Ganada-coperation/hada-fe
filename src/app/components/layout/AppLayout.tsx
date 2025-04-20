"use client";

import styled from "styled-components";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  min-width: ${({ theme }) => theme.layout.minWidth};
  background-color: #fff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  overflow: hidden;
  padding: 32px 24px;

  @media (max-width: 480px) {
    border-radius: 0;
    box-shadow: none;
  }
`;
