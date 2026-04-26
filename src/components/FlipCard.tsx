import { Link } from "react-router-dom";
import type { Project, Blog } from "../types";
import { getProjectGithubLinks } from "../store";

export function FlipCard({ kind, item }: { kind: "project"; item: Project } | { kind: "blog"; item: Blog }) {
  const isProject = kind === "project";
  const title = item.title;
  const image = item.image;
  const tags = isProject ? item.techStack : item.tags;
  const shortText = isProject ? item.summary : item.excerpt;
  const githubLinks = isProject ? getProjectGithubLinks(item) : [];

  return (
    <article className="flip-card group h-[410px] focus-within:[perspective:1400px]" tabIndex={0}>
      <div className="flip-card-inner relative h-full w-full rounded-[2rem]">
        <div className="flip-face absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
          {image ? (
            <img src={image} alt="" className="h-64 w-full object-cover" />
          ) : (
            <div className="h-64 bg-[linear-gradient(135deg,var(--color-primary),var(--color-secondary))]" />
          )}
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/62">{isProject ? tags.join(" | ") : shortText.slice(0, 128)}</p>
          </div>
        </div>

        <div className="flip-face flip-back absolute inset-0 flex flex-col justify-between rounded-[2rem] border border-white/10 bg-zinc-950 p-7">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/40">{isProject ? "Project Links" : item.readTime}</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">{title}</h3>
            <p className="mt-4 leading-7 text-white/68">{shortText}</p>
            <p className="mt-5 text-sm text-white/50">{tags.join(" | ")}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {isProject ? (
              <>
                {githubLinks.slice(0, 3).map((link) => (
                  <a key={link.id} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-zinc-950" href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
                ))}
                <a className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white" href={item.live} target="_blank" rel="noreferrer">Live</a>
                <Link className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white" to={`/project/${item.id}`}>Details</Link>
              </>
            ) : (
              <>
                <a className="rounded-full bg-white px-4 py-2 text-sm font-bold text-zinc-950" href={item.link} target="_blank" rel="noreferrer">Blog Link</a>
                <Link className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white" to={`/blog/${item.id}`}>Details</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
