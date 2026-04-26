import { useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PortfolioContent, Project, ProjectGithubLink } from "../types";
import { useAppSelector } from "./hooks";

gsap.registerPlugin(ScrollTrigger);

// ── Utility helpers ──────────────────────────────────────
export const makeId = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `item-${Date.now()}`;

export const parseList = (value: string) => value.split("\n").map((item) => item.trim()).filter(Boolean);
export const parseCommaList = (value: string) => value.split(",").map((item) => item.trim()).filter(Boolean);
export const joinList = (items: string[]) => items.join("\n");
export const joinCommaList = (items: string[]) => items.join(", ");

export const getProjectGithubLinks = (project: Project): ProjectGithubLink[] =>
  project.githubLinks?.length
    ? project.githubLinks
    : project.github
      ? [{ id: "github", label: "GitHub", url: project.github }]
      : [];

export const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/70";

// ── Redux selectors for quick access ─────────────────────
export function usePortfolioContent(): PortfolioContent {
  return useAppSelector((state) => state.portfolio);
}

export function useIsAdmin(): boolean {
  return useAppSelector((state) => state.auth.isAuthenticated);
}

export function useAuthError(): string {
  return useAppSelector((state) => state.auth.error);
}

// ── GSAP scroll animations ──────────────────────────────
export function usePortfolioAnimations(speed: number) {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const duration = Math.max(0.25, 0.9 / speed);
    const context = gsap.context(() => {
      gsap.from("[data-hero-copy] > *", { y: 34, autoAlpha: 0, duration, stagger: 0.12, ease: "power3.out" });
      gsap.from("[data-image-shell]", { clipPath: "inset(18% 18% 18% 18% round 34px)", scale: 0.92, autoAlpha: 0, duration: duration * 1.2, ease: "expo.out" });
      gsap.to("[data-orbit]", { rotate: 360, transformOrigin: "50% 50%", duration: 18 / speed, repeat: -1, ease: "none" });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element: HTMLElement) => {
        gsap.from(element, { y: 36, autoAlpha: 0, duration, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 82%", once: true } });
      });
    });

    return () => context.revert();
  }, [speed]);
}

// ── JSON-LD Schema ──────────────────────────────────────
export function useDocumentSchema(content: PortfolioContent) {
  useEffect(() => {
    document.title = `${content.hero.name} | ${content.hero.role}`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: content.hero.name,
      jobTitle: content.hero.role,
      email: content.hero.email,
      telephone: content.hero.phone,
      address: content.hero.location,
      sameAs: [content.contact.github, content.contact.linkedin, content.contact.x].filter(Boolean),
      knowsAbout: content.skills.flatMap((group) => group.items),
    };
    let script = document.getElementById("portfolio-person-schema") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "portfolio-person-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [content]);
}
