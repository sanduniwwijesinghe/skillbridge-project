import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Life - Discover Your Future",
  description: "Answer a few questions and discover who you might be in your next life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
