import type { Metadata } from "next";
import { Solway, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ScaledShell from "./_components/ScaledShell";

const solway = Solway({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-solway",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parichehr Talebzadeh — Product Designer",
  description:
    "Designing digital products, containing interaction, experience, interface, design system, and content, within various product teams for modern businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${solway.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-white text-[#1F2753] antialiased font-[family-name:var(--font-solway)]">
        <ScaledShell>{children}</ScaledShell>
      </body>
    </html>
  );
}
