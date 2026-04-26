import { usePortfolioContent } from "../store";
import { Link } from "react-router-dom";
import { SectionShell } from "./SectionShell";
import { FlipCard } from "./FlipCard";

export function ProjectsSection() {
  const content = usePortfolioContent();
  const visibleProjects = content.projects.slice(0, 6);

  return (
    <SectionShell id="projects" eyebrow="Selected builds" title="Projects with hover-flip access to source, live links, and details.">
      <div className="grid gap-6 lg:grid-cols-3">{visibleProjects.map((project) => <FlipCard key={project.id} kind="project" item={project} />)}</div>
      {content.projects.length > 6 ? (<div className="mt-10 text-center"><Link to="/projects" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-zinc-950">See All Projects</Link></div>) : null}
    </SectionShell>
  );
}
