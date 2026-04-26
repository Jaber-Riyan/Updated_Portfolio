import { usePortfolioContent } from "../store";
import { SectionShell } from "./SectionShell";

export function ExperienceSection() {
  const content = usePortfolioContent();
  return (
    <SectionShell id="experience" eyebrow="Work History" title="Experience focused on business impact, ownership, and systems thinking.">
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 hidden w-px bg-gradient-to-b from-violet-500/40 via-violet-500/20 to-transparent lg:block" />
        <div className="space-y-8">
          {content.experience.map((job, idx) => {
            const accentColors = ["border-violet-400/30", "border-cyan-400/30", "border-rose-400/30"];
            const dotColors = ["shadow-violet-500/50 bg-violet-500", "shadow-cyan-500/50 bg-cyan-500", "shadow-rose-500/50 bg-rose-500"];
            return (
              <article key={job.id} className={`exp-card relative rounded-[1.5rem] border ${accentColors[idx % accentColors.length]} bg-white/[0.035] p-6 sm:p-8 lg:ml-16`} data-reveal>
                <div className={`absolute -left-11 top-8 hidden h-4 w-4 rounded-full ${dotColors[idx % dotColors.length]} shadow-lg lg:block`} />
                <div className="grid gap-6 lg:grid-cols-[0.3fr_1fr]">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-300">{job.period}</span>
                    </div>
                    <p className="mt-3 text-sm text-white/50">{job.location}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">{job.role}</h3>
                    <a className="mt-1 inline-block text-lg font-medium text-cyan-300 underline-offset-4 transition-colors hover:text-cyan-200 hover:underline" href={job.companyUrl || "#"} target="_blank" rel="noreferrer">{job.company}</a>
                    <p className="mt-4 max-w-3xl leading-8 text-white/65">{job.description}</p>
                    <ul className="mt-5 space-y-3">
                      {job.impact.map((item, impactIdx) => (
                        <li key={impactIdx} className="flex items-start gap-3 text-white/70">
                          <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/70" />
                          <span className="leading-7">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
