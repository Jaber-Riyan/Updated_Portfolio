import { usePortfolioContent } from "../store";
import { sectionLabels } from "../data";

export function Footer() {
  const content = usePortfolioContent();
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-10 text-white/60 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1fr_0.8fr]">
        <div>
          <p className="text-xl font-semibold text-white">{content.hero.name}</p>
          <p className="mt-2">{content.hero.role}</p>
          <p className="mt-4 max-w-md text-sm leading-6">Full-stack portfolio with ATS-friendly content, project proof, blogs, reviews, and a manageable CMS dashboard.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {Object.entries(sectionLabels).filter(([key]) => key !== "hero").map(([key, label]) => (
            <a key={key} href={`#${key}`} className="hover:text-white">{label}</a>
          ))}
        </div>
        <div className="space-y-2 text-sm">
          <a className="block hover:text-white" href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
          <a className="block hover:text-white" href={content.contact.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="block hover:text-white" href={content.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
