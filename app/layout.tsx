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
      <head>
        {/* Preload every page's hero illustration so the View Transitions
            snapshot at navigation time is captured with the image already
            in cache — eliminates the first-nav lag where the morph would
            otherwise capture an unloaded `<img>`. */}
        <link rel="preload" as="image" href="/assets/illustration.png" />
        <link
          rel="preload"
          as="image"
          href="/assets/illustration-about.png"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/illustration-contact.png"
        />
        <link rel="preload" as="image" href="/assets/profile-image.png" />
      </head>
      <body className="bg-white text-[#1F2753] antialiased font-[family-name:var(--font-solway)]">
        <ScaledShell>{children}</ScaledShell>
      </body>
    </html>
  );
}
