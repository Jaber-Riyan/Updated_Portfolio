import { Link } from "react-router-dom";
import type { PortfolioContent, Project, Blog } from "../types";
import { FlipCard } from "./FlipCard";

export function ListingPage({ content, type }: { content: PortfolioContent; type: "project" | "blog" }) {
  const isProject = type === "project";
  const items = isProject ? content.projects : content.blogs;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10 px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="text-sm font-semibold text-white/70 hover:text-white">Back to portfolio</Link>
          <Link to="/manage" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold">Manage</Link>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">All {isProject ? "Projects" : "Blogs"}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Explore every {isProject ? "project" : "article"}.</h1>
        <div className={`mt-10 grid gap-6 ${isProject ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
          {items.map((item) =>
            isProject ? <FlipCard key={item.id} kind="project" item={item as Project} /> : <FlipCard key={item.id} kind="blog" item={item as Blog} />
          )}
        </div>
      </section>
    </main>
  );
}
