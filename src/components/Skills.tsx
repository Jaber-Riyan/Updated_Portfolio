import { usePortfolioContent } from "../store";
import { SectionShell } from "./SectionShell";

export function Skills() {
  const content = usePortfolioContent();
  return (
    <SectionShell id="skills" eyebrow="Technical Arsenal" title="A detailed, recruiter-friendly technology stack with clear engineering categories.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.skills.map((group, idx) => {
          const gradients = ["from-cyan-500/10 to-blue-500/5", "from-violet-500/10 to-purple-500/5", "from-rose-500/10 to-pink-500/5", "from-amber-500/10 to-orange-500/5", "from-emerald-500/10 to-green-500/5", "from-sky-500/10 to-indigo-500/5", "from-fuchsia-500/10 to-rose-500/5"];
          const icons = ["{ }", "</>", "⚙", "🗄", "💳", "Σ", "🛠"];
          return (
            <article key={group.id} className={`skill-card rounded-[1.7rem] border border-white/10 bg-gradient-to-br ${gradients[idx % gradients.length]} p-6`} data-reveal>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.08] text-lg">{icons[idx % icons.length]}</span>
                <div>
                  <h3 className="text-xl font-semibold leading-tight">{group.title}</h3>
                  <p className="text-xs text-white/40">{group.items.length} technologies</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill} title={skill} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/75 transition-colors hover:border-white/25 hover:bg-white/[0.1] hover:text-white">{skill}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
