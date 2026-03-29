import type { Metadata } from "next";
import "@weavekit/ui/styles";

export const metadata: Metadata = {
  title: "Web",
  description: "Web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
