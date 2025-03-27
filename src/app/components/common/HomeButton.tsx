"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function HomeButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <IconButton onClick={handleClick} aria-label="홈으로 이동">
      <HomeIcon viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18 44V24H30V44M6 18L24 4L42 18V40C42 41.0609 41.5786 42.0783 40.8284 42.8284C40.0783 43.5786 39.0609 44 38 44H10C8.93913 44 7.92172 43.5786 7.17157 42.8284C6.42143 42.0783 6 41.0609 6 40V18Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </HomeIcon>
    </IconButton>
  );
}

const IconButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #1e1e1e;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const HomeIcon = styled.svg`
  width: 32px;
  height: 32px;
`;
