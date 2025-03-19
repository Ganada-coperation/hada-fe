import styled from "styled-components";

export default function Footer() {
  return (
    <StyledFooter>
      <p>© 2024 HADA. All Rights Reserved.</p>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 16px;
  text-align: center;
  color: white;
  font-size: 14px;
`;
