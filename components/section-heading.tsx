import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
  inverted = false,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  inverted?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className={`text-sm font-bold tracking-wide uppercase ${inverted ? "text-brand-300" : "text-brand-700"}`}>{eyebrow}</p>
      <h2
        className={`mt-3 text-3xl font-extrabold tracking-[-0.03em] text-balance sm:text-[2.6rem] sm:leading-[1.1] ${
          inverted ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {children && (
        <p className={`mt-4 text-lg leading-relaxed text-pretty ${inverted ? "text-white/60" : "text-ink/60"}`}>
          {children}
        </p>
      )}
    </div>
  );
}
