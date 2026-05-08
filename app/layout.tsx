import type { Metadata, Viewport } from "next";
import { Solway, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import { userAgent } from "next/server";
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

// Explicit viewport so phones report their actual logical width
// (`window.innerWidth` ≈ 390 px on an iPhone, not the 980 px desktop
// fallback that some mobile browsers use when no viewport meta is set).
// Without this the client-side breakpoint check would never trip and
// phones would render the desktop layout.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/* The layout reads the request's User-Agent header on every load and
   asks Next.js's `userAgent` helper (a wrapper around ua-parser-js)
   what kind of device sent the request. `device.type` returns one of
   `mobile`, `tablet`, `console`, `smarttv`, `wearable`, `embedded`,
   or `undefined` (desktop browsers). Phones and tablets get the
   mobile layout; everything else uses the desktop canvas, with the
   client-side viewport-width check (in ScaledShell) as a final
   fallback for narrow desktop windows and mobile-emulator tabs. */
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const { device } = userAgent({ headers: requestHeaders });
  const initialIsMobile =
    device.type === "mobile" || device.type === "tablet";

  return (
    <html
      lang="en"
      className={`${solway.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        {/* Preload every main route's hero illustration so the View
            Transitions snapshot at navigation time is captured with
            the image already in cache — eliminates the first-nav lag
            where the morph would otherwise capture an unloaded
            `<img>`. Switching these to `next/image` requires either
            preloading the optimized `/_next/image?...` URL or
            accepting the first-nav lag, so we keep the raw <img>
            here until that migration is planned holistically. */}
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
      <body className="bg-white antialiased font-[family-name:var(--font-solway)]" style={{ color: "var(--color-navy)" }}>
        <ScaledShell initialIsMobile={initialIsMobile}>{children}</ScaledShell>
      </body>
    </html>
  );
}
