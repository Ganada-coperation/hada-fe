import { Gowun_Batang, Noto_Sans_KR } from "next/font/google";

// ✅ Gowun Batang (손글씨 폰트)
export const gowunBatang = Gowun_Batang({
  subsets: ["latin"], // ✅ "korean" 제외하고 "latin"만 설정 (자동 포함됨)
  weight: "400",
  display: "swap",
});

// ✅ Noto Sans KR (기본 본문 폰트)
export const notoSans = Noto_Sans_KR({
  subsets: ["latin"], // ✅ 한글 지원 가능 (자동 적용됨)
  weight: ["400", "500", "700"],
  display: "swap",
});

// ✅ 공통적인 폰트 스타일 생성 함수
const createFontStyle = (family: string, weight: number, size: number, lineHeight: number) => `
  font-family: "${family}", sans-serif;
  font-weight: ${weight};
  font-size: ${size}px;
  line-height: ${lineHeight}px;
  letter-spacing: 0%;
`;

export const fonts = {
  // ✅ 본문 기본 폰트 (Noto Sans KR)
  body: createFontStyle(notoSans.style.fontFamily, 400, 16, 24),

  // ✅ 헤딩 (제목)
  heading_bold_24px: createFontStyle(notoSans.style.fontFamily, 700, 24, 34),
  heading_bold_22px: createFontStyle(notoSans.style.fontFamily, 700, 22, 30),

  // ✅ 글쓰기 (글 작성 시 - Gowun Batang)
  handwriting: createFontStyle(gowunBatang.style.fontFamily, 400, 18, 26),
};
