import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutInner from "@/components/layout/LayoutInner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/** Metadata SEO — ditampilkan di tab browser */
export const metadata: Metadata = {
  title: "BaleLearn — LMS FTI",
  description:
    "Platform Learning Management System Fakultas Teknologi Informasi, Universitas Bale Bandung.",
};

/** RootLayout — server component root, mendelegasikan UI interaktif ke LayoutInner */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LayoutInner>{children}</LayoutInner>
      </body>
    </html>
  );
}
