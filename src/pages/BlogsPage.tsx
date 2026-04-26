import { Link } from "react-router-dom";
import { usePortfolioContent } from "../store";
import { FlipCard } from "../components/FlipCard";

export default function BlogsPage() {
  const content = usePortfolioContent();
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10 px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="text-sm font-semibold text-white/70 hover:text-white">Back to portfolio</Link>
          <Link to="/manage" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold">Manage</Link>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">All Blogs</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Explore every article.</h1>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {content.blogs.map((blog) => <FlipCard key={blog.id} kind="blog" item={blog} />)}
        </div>
      </section>
    </main>
  );
}
