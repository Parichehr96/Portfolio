import type { Metadata } from "next";
import { Space_Grotesk, Solway } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const solway = Solway({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-solway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parichehr Talebzadeh — Product Designer",
  description:
    "Portfolio of Parichehr Talebzadeh. Designing digital products, containing interaction, experience, interface, design system, and content, within various product teams for modern businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${solway.variable}`}>
      <body className="bg-[#F9F5EB] text-[#1F2753] antialiased font-[family-name:var(--font-space-grotesk)]">
        {children}
      </body>
    </html>
  );
}
