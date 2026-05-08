import Link from "next/link";

export default function NotFound() {
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
        Lost the thread.
      </p>
      <p
        style={{
          fontFamily: "var(--font-solway), serif",
          fontWeight: 300,
          fontSize: 18,
          lineHeight: "28px",
          maxWidth: 480,
        }}
      >
        That page either moved or never existed. Head back home and try again.
      </p>
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
  );
}
