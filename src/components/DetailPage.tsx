import { Link } from "react-router-dom";
import type { PortfolioContent, Project, Blog } from "../types";
import { getProjectGithubLinks } from "../store";

export function DetailPage({ content, type, id }: { content: PortfolioContent; type: "project" | "blog"; id: string }) {
  const item = type === "project" ? content.projects.find((project) => project.id === id) : content.blogs.find((blog) => blog.id === id);

  if (!item) {
    return (
      <main className="grid min-h-screen place-items-center bg-zinc-950 p-8 text-white">
        <div className="max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/45">Not found</p>
          <h1 className="mt-4 text-4xl font-semibold">This detail page does not exist.</h1>
          <Link to="/" className="mt-8 inline-block rounded-full bg-white px-5 py-3 text-sm font-bold text-zinc-950">Back Home</Link>
        </div>
      </main>
    );
  }

  const isProject = type === "project";
  const project = item as Project;
  const blog = item as Blog;
  const image = item.image;
  const githubLinks = isProject ? getProjectGithubLinks(project) : [];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10 px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/" className="text-sm font-semibold text-white/70 hover:text-white">Back to portfolio</Link>
          <Link to="/manage" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold">Manage</Link>
        </div>
      </header>
      <article className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        {image ? <img src={image} alt="" className="h-[45vh] w-full rounded-[2rem] object-cover" /> : null}
        <p className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-white/45">{isProject ? "Project Details" : blog.readTime}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{item.title}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-9 text-white/70">{isProject ? project.description : blog.body}</p>
        <p className="mt-8 text-white/52">{isProject ? project.techStack.join(" | ") : blog.tags.join(" | ")}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          {isProject ? (
            <>
              {githubLinks.map((link) => (
                <a key={link.id} className="rounded-full bg-white px-5 py-3 text-sm font-bold text-zinc-950" href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
              ))}
              <a className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white" href={project.live} target="_blank" rel="noreferrer">Live Link</a>
            </>
          ) : (
            <a className="rounded-full bg-white px-5 py-3 text-sm font-bold text-zinc-950" href={blog.link} target="_blank" rel="noreferrer">Open Blog</a>
          )}
        </div>
      </article>
    </main>
  );
}
