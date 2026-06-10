import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Huilin Park",
  description: "A playful 3D UIUX portfolio park built with Next.js and Three.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
