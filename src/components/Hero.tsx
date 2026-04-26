import { usePortfolioContent } from "../store";

export function Hero() {
  const content = usePortfolioContent();
  const { hero, theme } = content;
  const initials = hero.name.split(" ").map((part) => part[0]).join("").slice(0, 2);

  return (
    <section id="top" style={{ background: theme.sections.hero.bg, color: theme.sections.hero.text }} className="relative min-h-screen overflow-hidden px-5 pt-32 sm:px-8 lg:pt-40">
      <div className="absolute inset-0 opacity-70" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-primary),transparent_66%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,var(--color-secondary),transparent_68%)] blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.04fr_0.96fr]">
        <div data-hero-copy className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/58">{hero.role}</p>
          <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">{hero.name}</h1>
          <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">{hero.headline}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-zinc-950 transition hover:-translate-y-0.5 hover:bg-white/90">{hero.primaryCta}</a>
            <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10">{hero.secondaryCta}</button>
          </div>
          <div className="mt-10 grid gap-2 text-sm text-white/62 sm:grid-cols-2">
            <p>{hero.availability}</p><p>{hero.location}</p>
            <a href={`mailto:${hero.email}`} className="hover:text-white">{hero.email}</a>
            <a href={`tel:${hero.phone}`} className="hover:text-white">{hero.phone}</a>
          </div>
        </div>
        <div className="relative min-h-[520px] lg:min-h-[640px]" aria-label="Developer image area">
          <div data-orbit className="absolute inset-4 rounded-[42%] border border-dashed border-white/20" />
          <div className="absolute inset-x-12 top-10 h-20 rounded-full bg-white/10 blur-3xl" />
          <div data-image-shell className="absolute inset-0 overflow-hidden rounded-[44%_56%_48%_52%/48%_38%_62%_52%] border border-white/15 bg-gradient-to-br from-white/20 via-white/5 to-white/10 shadow-2xl shadow-violet-950/50">
            {hero.profileImage ? (<img src={hero.profileImage} alt={hero.name} className="h-full w-full object-cover grayscale-[12%]" />) : (
              <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(124,58,237,.9),rgba(6,182,212,.55)),radial-gradient(circle_at_top_left,rgba(255,255,255,.34),transparent_34%)]">
                <div className="text-center">
                  <span className="block text-[8rem] font-black tracking-[-0.08em] text-white/90 sm:text-[11rem]">{initials}</span>
                  <span className="mx-auto mt-2 block max-w-xs text-sm font-semibold uppercase tracking-[0.35em] text-white/60">Add developer image in CMS</span>
                </div>
              </div>
            )}
          </div>
          <div className="absolute -bottom-4 left-8 right-8 h-28 rounded-[50%] bg-black/40 blur-2xl" />
        </div>
      </div>
    </section>
  );
}
