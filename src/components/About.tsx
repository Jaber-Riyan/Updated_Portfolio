import { usePortfolioContent } from "../store";
import { defaultContent } from "../data";
import { SectionShell } from "./SectionShell";

export function AboutSection() {
  const content = usePortfolioContent();
  const about = content.about ?? defaultContent.about;
  const rows = [
    ["My Journey into Web Development", about.journey],
    ["The Type of Work I Enjoy", about.work],
    ["My Hobbies & Interests", about.hobbies],
  ];

  return (
    <SectionShell id="about" eyebrow="About" title="A developer journey built on curiosity, fundamentals, and real-world practice.">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-l border-white/15 pl-6">
          <h3 className="text-3xl font-semibold">Hi, I am Jaber Ahmed Riyan.</h3>
          <p className="mt-5 text-lg leading-9 text-white/72">{about.intro}</p>
          <p className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-lg font-medium leading-9 text-white/82">{about.belief}</p>
        </div>
        <div className="space-y-7">
          {rows.map(([title, text]) => (
            <article key={title} className="border-t border-white/12 pt-6">
              <h3 className="text-2xl font-semibold">{title}</h3>
              <p className="mt-3 leading-8 text-white/70">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
