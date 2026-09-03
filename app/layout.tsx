import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saarthi — Your AI Co-Teacher for the Live Classroom",
  description:
    "A real-time voice AI co-teacher that listens with context, understands the lesson, detects learning gaps, and speaks only when it truly helps.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-navy-950 bg-grid-fade">{children}</body>
    </html>
  );
}
