import { usePortfolioContent } from "../store";
import { Link } from "react-router-dom";
import { SectionShell } from "./SectionShell";
import { FlipCard } from "./FlipCard";

export function BlogsSection() {
  const content = usePortfolioContent();
  const visibleBlogs = content.blogs.slice(0, 6);

  return (
    <SectionShell id="blogs" eyebrow="Writing" title="Blogs that show how I think about architecture, UX, and delivery.">
      <div className="grid gap-6 lg:grid-cols-2">{visibleBlogs.map((blog) => <FlipCard key={blog.id} kind="blog" item={blog} />)}</div>
      {content.blogs.length > 6 ? (<div className="mt-10 text-center"><Link to="/blogs" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-zinc-950">See All Blogs</Link></div>) : null}
    </SectionShell>
  );
}
