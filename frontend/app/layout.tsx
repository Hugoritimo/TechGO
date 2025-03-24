// app/layout.tsx
import { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "TechGo  ",
  description: "Descrição da minha aplicação",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
