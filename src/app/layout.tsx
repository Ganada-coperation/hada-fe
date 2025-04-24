import { ReactNode } from "react";
import { gowunBatang } from "@styles/fonts";
import { ClientProviders } from "./ClientProviders";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={gowunBatang.className}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
