import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <h1>HADA</h1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 16px;
  text-align: center;
  color: white;
  font-size: 20px;
`;
