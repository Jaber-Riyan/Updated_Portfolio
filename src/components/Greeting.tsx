import { useState } from "react";
import { usePortfolioContent } from "../store";
import { defaultContent } from "../data";

export function GreetingExperience() {
  const content = usePortfolioContent();
  const greeting = content.greeting ?? defaultContent.greeting;
  const [showIntro, setShowIntro] = useState(() => greeting.enabled && window.sessionStorage.getItem("portfolio-greeting-seen") !== "true");

  const closeGreeting = () => {
    window.sessionStorage.setItem("portfolio-greeting-seen", "true");
    setShowIntro(false);
  };

  if (!greeting.enabled) return null;

  return (
    <>
      <div style={{ background: greeting.bgColor, color: greeting.textColor }} className="fixed inset-x-0 top-0 z-[60] border-b border-white/10 px-4 py-2 text-center text-sm font-semibold">
        {greeting.title} <span className="hidden opacity-75 sm:inline">| {greeting.message}</span>
      </div>
      {showIntro ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/80 p-5 backdrop-blur-xl">
          <div style={{ background: greeting.bgColor, color: greeting.textColor }} className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl shadow-black/50">
            {greeting.image ? <img src={greeting.image} alt="Greeting" className="h-64 w-full object-cover sm:h-80" /> : null}
            <div className="p-7 text-center sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] opacity-65">Greetings</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">{greeting.title}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 opacity-75">{greeting.message}</p>
              <a href={greeting.ctaHref || "#top"} className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-zinc-950" onClick={closeGreeting}>{greeting.ctaLabel || "Enter Portfolio"}</a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
