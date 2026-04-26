import { usePortfolioContent } from "../store";
import { SectionShell } from "./SectionShell";

export function EducationSection() {
  const content = usePortfolioContent();
  const icons = ["🎓", "📜"];
  return (
    <SectionShell id="education" eyebrow="Education" title="Foundations and certifications that support the engineering practice.">
      <div className="grid gap-6 md:grid-cols-2">
        {content.education.map((item, idx) => (
          <article key={item.id} className="edu-card rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-7 sm:p-8" data-reveal>
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-2xl">{icons[idx % icons.length]}</span>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span className="text-xs font-semibold text-sky-300">{item.period}</span>
                </div>
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight">{item.degree}</h3>
              <p className="mt-2 text-lg font-medium text-cyan-300">{item.school}</p>
              <p className="mt-4 leading-8 text-white/65">{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
