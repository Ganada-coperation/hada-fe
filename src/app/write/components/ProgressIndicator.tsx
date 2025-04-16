import styled from "styled-components";

const stepText = {
  1: "1/3 단계: 닉네임 입력",
  2: "2/3 단계: 제목 작성",
  3: "3/3 단계: 내용 작성",
} as const;

type Step = keyof typeof stepText;

interface ProgressIndicatorProps {
    currentStep: number;
  }
  

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const progressPercentage = (Number(currentStep) / 3) * 100;

  return (
    <Container>
      <Text>{stepText[currentStep as Step]}</Text>
      <ProgressBar>
        <Progress style={{ width: `${progressPercentage}%` }} />
      </ProgressBar>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const Text = styled.p`
  font-size: 16px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.colors.textDisabled};
  border-radius: 3px;
`;

const Progress = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  transition: width 0.3s ease;
`;
