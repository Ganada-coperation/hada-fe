// src/app/styles/fonts.ts
import localFont from "next/font/local";

// Gowun Batang 로컬 폰트 불러오기
export const gowunBatang = localFont({
  src: [
    {
      path: "../../fonts/GowunBatang-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/GowunBatang-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-gowunbatang",
});
