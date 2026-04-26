import type { PortfolioContent } from "../types";

export function Navbar({ content }: { content: PortfolioContent }) {
  const links: Array<[string, string]> = [
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Experience", "#experience"],
    ["Projects", "#projects"],
    ["Education", "#education"],
    ["Reviews", "#reviews"],
    ["Blogs", "#blogs"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="fixed inset-x-0 top-10 z-50 border-b border-white/10 bg-black/35 px-5 py-4 backdrop-blur-xl sm:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5" aria-label="Main navigation">
        <a href="#top" className="group flex items-center gap-3" aria-label={`${content.hero.name} home`}>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-sm font-bold">
            {content.hero.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
          </span>
          <span>
            <span className="block text-sm font-semibold text-white">{content.hero.name}</span>
            <span className="block text-xs text-white/55">Fullstack Portfolio</span>
          </span>
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-sm text-white/68 transition hover:text-white">{label}</a>
          ))}
        </div>
      </nav>
      <div className="fixed inset-x-3 bottom-3 z-50 rounded-full border border-white/10 bg-black/75 px-3 py-2 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between text-[11px] font-semibold text-white/68">
          {links.slice(0, 5).map(([label, href]) => (
            <a key={label} href={href} className="rounded-full px-3 py-2 hover:bg-white/10 hover:text-white">{label}</a>
          ))}
        </div>
      </div>
    </header>
  );
}
