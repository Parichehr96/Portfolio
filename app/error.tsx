"use client";

import Link from "next/link";
import { useEffect } from "react";

/* Route-level error boundary. Next.js mounts this when a page-tree
   render throws, so the rest of the app keeps working and the user
   sees something better than a blank page. Production builds also
   surface the digest in case the user reports the issue. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center gap-[24px] px-[24px] text-center bg-white"
      style={{ color: "var(--color-navy)" }}
    >
      <p
        style={{
          fontFamily: "var(--font-solway), serif",
          fontSize: 60,
          lineHeight: "66px",
          letterSpacing: "2px",
        }}
      >
        Something broke.
      </p>
      <p
        style={{
          fontFamily: "var(--font-solway), serif",
          fontWeight: 300,
          fontSize: 18,
          lineHeight: "28px",
          maxWidth: 520,
        }}
      >
        An unexpected error stopped this page from loading. Try again, or head
        back home.
      </p>
      <div className="flex items-center gap-[24px]">
        <button
          type="button"
          onClick={reset}
          className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
          style={{
            fontFamily: "var(--font-solway), serif",
            fontSize: 16,
            lineHeight: "28px",
            textDecoration: "underline",
            color: "var(--color-navy)",
          }}
        >
          TRY AGAIN
        </button>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-solway), serif",
            fontSize: 16,
            lineHeight: "28px",
            textDecoration: "underline",
            color: "var(--color-navy)",
          }}
        >
          BACK TO HOME
        </Link>
      </div>
      {error.digest && (
        <p
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: 12,
            lineHeight: "16px",
            color: "var(--color-gray-soft)",
          }}
        >
          ref: {error.digest}
        </p>
      )}
    </div>
  );
}
