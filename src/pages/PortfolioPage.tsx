import { useMemo } from "react";
import type * as React from "react";
import { usePortfolioContent, usePortfolioAnimations, useDocumentSchema } from "../store";
import { GreetingExperience } from "../components/Greeting";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { AboutSection } from "../components/About";
import { Skills } from "../components/Skills";
import { ExperienceSection } from "../components/Experience";
import { ProjectsSection } from "../components/Projects";
import { EducationSection } from "../components/Education";
import { ReviewsSection } from "../components/Reviews";
import { BlogsSection } from "../components/Blogs";
import { ContactSection } from "../components/Contact";
import { Footer } from "../components/Footer";

export default function PortfolioPage() {
  const content = usePortfolioContent();
  const theme = content.theme;

  const cssVars = useMemo(
    () => ({
      "--color-primary": theme.primary,
      "--color-secondary": theme.secondary,
      "--color-background": theme.background,
      "--color-text": theme.text,
      "--color-muted": theme.muted,
      "--color-panel": theme.panel,
    }) as React.CSSProperties,
    [theme],
  );

  usePortfolioAnimations(theme.animationSpeed);
  useDocumentSchema(content);

  return (
    <main style={cssVars} className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <GreetingExperience />
      <Navbar content={content} />
      <Hero />
      <AboutSection />
      <Skills />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <ReviewsSection />
      <BlogsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
