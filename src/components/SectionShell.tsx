import type * as React from "react";
import { usePortfolioContent } from "../store";
import { defaultTheme } from "../data";
import type { SectionKey } from "../types";

export function SectionShell({
  id,
  eyebrow,
  title,
  children,
}: {
  id: SectionKey;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  const content = usePortfolioContent();
  const sectionTheme = content.theme.sections[id];
  const activeTheme = sectionTheme ?? defaultTheme.sections[id];
  const sectionStyle: React.CSSProperties = {
    background: activeTheme.bgImage
      ? `linear-gradient(rgba(0,0,0,.76), rgba(0,0,0,.76)), url(${activeTheme.bgImage}) center/cover fixed`
      : activeTheme.bg,
    color: activeTheme.text,
  };

  return (
    <section id={id} style={sectionStyle} className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl" data-reveal>
        <div className="mb-12 max-w-3xl">
          <p style={{ color: activeTheme.accent }} className="text-sm font-semibold uppercase tracking-[0.28em]">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
