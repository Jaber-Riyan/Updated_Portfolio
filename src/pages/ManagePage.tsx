import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login, logout, setError } from "../store/slices/authSlice";
import { setHero, setAbout, setSkills, setExperiences, setProjects, setEducation, setReviews, setBlogs, setContact, setGreeting, setTheme, setSectionTheme, resetToDefault } from "../store/slices/portfolioSlice";
import { inputClass, makeId, parseList, parseCommaList, joinList, joinCommaList, getProjectGithubLinks } from "../store";
import { defaultContent, adminEmail, adminPassword, sectionLabels, sectionKeys } from "../data";
import type { HeroContent, AboutContent, ContactContent, ProjectGithubLink, GreetingCardContent, SectionKey, SectionTheme, ThemeConfig, Project } from "../types";
import { Field, ColorField, Panel, EditableList } from "../components/shared";

export default function ManagePage() {
  const isAuthed = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthed) return <AdminLogin />;
  return <AdminDashboard />;
}

function AdminLogin() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.auth.error);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (email === adminEmail && password === adminPassword) {
      dispatch(login());
      return;
    }
    dispatch(setError("Invalid admin email or password."));
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,.16),transparent_34%),#09090f] px-5 text-white">
      <form onSubmit={handleLogin} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-2xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Secure CMS</p>
        <h1 className="mt-3 text-3xl font-semibold">Admin Authentication</h1>
        <p className="mt-3 text-sm leading-6 text-white/58">Use the credentials configured in the environment file to manage portfolio content.</p>
        <div className="mt-8 space-y-4">
          <Field label="Admin email"><input className={inputClass} name="email" type="email" placeholder="admin@jaber.com" required /></Field>
          <Field label="Password"><input className={inputClass} name="password" type="password" placeholder="123456" required /></Field>
        </div>
        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
        <button className="mt-6 w-full rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-zinc-950" type="submit">Login to Dashboard</button>
        <Link to="/" className="mt-3 block w-full rounded-full border border-white/10 px-5 py-3 text-center text-sm font-bold text-white">Back to Portfolio</Link>
      </form>
    </main>
  );
}

function AdminDashboard() {
  const dispatch = useAppDispatch();
  const content = useAppSelector((state) => state.portfolio);
  const [tab, setTab] = useState<"content" | "projects" | "blogs" | "greeting" | "messages" | "theme">("content");

  const resetContent = () => {
    if (window.confirm("Reset the CMS to the default demo portfolio?")) dispatch(resetToDefault());
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/90 px-5 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div><p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Portfolio CMS</p><h1 className="mt-1 text-3xl font-semibold">Manage content, sections, theme, colors, and animation.</h1></div>
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="rounded-full bg-white px-4 py-2 text-sm font-bold text-zinc-950">View Portfolio</Link>
            <button className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white" onClick={resetContent}>Reset Demo</button>
            <button className="rounded-full border border-red-300/25 px-4 py-2 text-sm font-bold text-red-100" onClick={() => dispatch(logout())}>Logout</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8"><div className="mb-8 grid gap-4 md:grid-cols-4">{[["Projects", content.projects.length], ["Blogs", content.blogs.length], ["Skill Groups", content.skills.length], ["Experience", content.experience.length]].map(([label, value]) => (<div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"><p className="text-sm text-white/45">{label}</p><p className="mt-2 text-3xl font-semibold">{String(value)}</p></div>))}</div></div>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-8 sm:px-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 lg:sticky lg:top-28">
          {(["content", "projects", "blogs", "greeting", "messages", "theme"] as const).map((item) => (
            <button key={item} onClick={() => setTab(item)} className={`block w-full rounded-2xl px-4 py-3 text-left text-base font-semibold capitalize transition ${tab === item ? "bg-cyan-300 text-zinc-950" : "text-white/55 hover:bg-white/[0.04] hover:text-white"}`}>{item}</button>
          ))}
        </aside>
        <section className="min-w-0">
          {tab === "content" ? <ContentEditor /> : null}
          {tab === "projects" ? <ProjectsEditor /> : null}
          {tab === "blogs" ? <BlogsEditor /> : null}
          {tab === "greeting" ? <GreetingEditor /> : null}
          {tab === "messages" ? <MessagesPanel /> : null}
          {tab === "theme" ? <ThemeEditor /> : null}
        </section>
      </div>
    </main>
  );
}

function MessagesPanel() {
  const [messages, setMessages] = useState<Array<{ name: string; subject: string; message: string; createdAt: string }>>(() => { try { return JSON.parse(window.localStorage.getItem("portfolio-contact-messages") ?? "[]"); } catch { return []; } });
  const clearMessages = () => { window.localStorage.removeItem("portfolio-contact-messages"); setMessages([]); };

  return (
    <Panel title="Contact Messages" description="Messages submitted from the portfolio contact form are stored locally for this demo CMS.">
      <div className="mb-6 flex justify-end"><button className="rounded-full border border-red-300/30 px-4 py-2 text-sm font-bold text-red-100" onClick={clearMessages}>Clear Messages</button></div>
      <div className="space-y-4">
        {messages.length === 0 ? <p className="text-white/55">No messages yet.</p> : null}
        {messages.map((message, index) => (<article key={`${message.createdAt}-${index}`} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><h3 className="text-xl font-semibold">{message.subject}</h3><p className="text-sm text-white/42">{new Date(message.createdAt).toLocaleString()}</p></div><p className="mt-2 text-cyan-200">From {message.name}</p><p className="mt-4 leading-7 text-white/70">{message.message}</p></article>))}
      </div>
    </Panel>
  );
}

function GreetingEditor() {
  const dispatch = useAppDispatch();
  const greeting = useAppSelector((state) => state.portfolio.greeting);

  return (
    <Panel title="Greeting Card" description="Create occasion cards for Eid, summer, winter, launches, or announcements.">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"><input type="checkbox" checked={greeting.enabled} onChange={(event) => dispatch(setGreeting({ enabled: event.target.checked }))} /><span className="font-semibold">Show greeting card</span></label>
        <Field label="Title"><input className={inputClass} value={greeting.title} onChange={(event) => dispatch(setGreeting({ title: event.target.value }))} /></Field>
        <Field label="Message"><textarea className={inputClass} rows={5} value={greeting.message} onChange={(event) => dispatch(setGreeting({ message: event.target.value }))} /></Field>
        <Field label="Large image URL"><input className={inputClass} value={greeting.image} onChange={(event) => dispatch(setGreeting({ image: event.target.value }))} /></Field>
        <ColorField label="Background color" value={greeting.bgColor} onChange={(value) => dispatch(setGreeting({ bgColor: value }))} />
        <ColorField label="Text color" value={greeting.textColor} onChange={(value) => dispatch(setGreeting({ textColor: value }))} />
        <Field label="CTA label"><input className={inputClass} value={greeting.ctaLabel} onChange={(event) => dispatch(setGreeting({ ctaLabel: event.target.value }))} /></Field>
        <Field label="CTA href"><input className={inputClass} value={greeting.ctaHref} onChange={(event) => dispatch(setGreeting({ ctaHref: event.target.value }))} /></Field>
      </div>
    </Panel>
  );
}

function ContentEditor() {
  const dispatch = useAppDispatch();
  const content = useAppSelector((state) => state.portfolio);

  return (
    <div className="space-y-10">
      <Panel title="Hero Section" description="Control the ATS-critical name, title, summary, contact signals, CTA labels, and developer image URL.">
        <div className="grid gap-5 md:grid-cols-2">
          {(Object.keys(content.hero) as Array<keyof HeroContent>).map((field) => (
            <Field key={field} label={field}>
              {field === "description" ? <textarea className={inputClass} rows={5} value={content.hero[field]} onChange={(event) => dispatch(setHero({ [field]: event.target.value }))} /> : <input className={inputClass} value={content.hero[field]} onChange={(event) => dispatch(setHero({ [field]: event.target.value }))} />}
            </Field>
          ))}
        </div>
      </Panel>
      <Panel title="About Section" description="Manage the personal story, journey, work style, hobbies, and mission statement.">
        <div className="grid gap-5">
          {(Object.keys(content.about) as Array<keyof AboutContent>).map((field) => (
            <Field key={field} label={field}><textarea className={inputClass} rows={field === "journey" ? 7 : 4} value={content.about[field]} onChange={(event) => dispatch(setAbout({ [field]: event.target.value }))} /></Field>
          ))}
        </div>
      </Panel>
      <Panel title="Skills" description="Each group uses comma-separated skills for clean ATS parsing.">
        <EditableList items={content.skills} createItem={() => ({ id: `skill-${Date.now()}`, title: "New Skill Group", items: ["React", "Node.js"] })} setItems={(items) => dispatch(setSkills(items))} renderItem={(item, update) => (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title"><input className={inputClass} value={item.title} onChange={(event) => update({ ...item, title: event.target.value, id: makeId(event.target.value) })} /></Field>
            <Field label="Skills comma separated"><input className={inputClass} value={joinCommaList(item.items)} onChange={(event) => update({ ...item, items: parseCommaList(event.target.value) })} /></Field>
          </div>
        )} />
      </Panel>
      <Panel title="Experience" description="Use measurable impact bullets to improve recruiter and ATS matching.">
        <EditableList items={content.experience} createItem={() => ({ id: `exp-${Date.now()}`, role: "Developer", company: "Company", companyUrl: "https://example.com", period: "2024", location: "Remote", description: "Describe ownership.", impact: ["Add achievement."] })} setItems={(items) => dispatch(setExperiences(items))} renderItem={(item, update) => (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Role"><input className={inputClass} value={item.role} onChange={(event) => update({ ...item, role: event.target.value, id: makeId(`${event.target.value}-${item.company}`) })} /></Field>
            <Field label="Company"><input className={inputClass} value={item.company} onChange={(event) => update({ ...item, company: event.target.value })} /></Field>
            <Field label="Company URL"><input className={inputClass} value={item.companyUrl ?? ""} onChange={(event) => update({ ...item, companyUrl: event.target.value })} /></Field>
            <Field label="Period"><input className={inputClass} value={item.period} onChange={(event) => update({ ...item, period: event.target.value })} /></Field>
            <Field label="Location"><input className={inputClass} value={item.location} onChange={(event) => update({ ...item, location: event.target.value })} /></Field>
            <div className="md:col-span-2"><Field label="Description"><textarea className={inputClass} rows={4} value={item.description} onChange={(event) => update({ ...item, description: event.target.value })} /></Field></div>
            <div className="md:col-span-2"><Field label="Impact bullets, one per line"><textarea className={inputClass} rows={4} value={joinList(item.impact)} onChange={(event) => update({ ...item, impact: parseList(event.target.value) })} /></Field></div>
          </div>
        )} />
      </Panel>
      <Panel title="Education" description="Degrees, certificates, and relevant training.">
        <EditableList items={content.education} createItem={() => ({ id: `edu-${Date.now()}`, degree: "Degree", school: "Institution", period: "2024", summary: "Summary" })} setItems={(items) => dispatch(setEducation(items))} renderItem={(item, update) => (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Degree"><input className={inputClass} value={item.degree} onChange={(event) => update({ ...item, degree: event.target.value, id: makeId(event.target.value) })} /></Field>
            <Field label="School"><input className={inputClass} value={item.school} onChange={(event) => update({ ...item, school: event.target.value })} /></Field>
            <Field label="Period"><input className={inputClass} value={item.period} onChange={(event) => update({ ...item, period: event.target.value })} /></Field>
            <Field label="Summary"><textarea className={inputClass} rows={4} value={item.summary} onChange={(event) => update({ ...item, summary: event.target.value })} /></Field>
          </div>
        )} />
      </Panel>
      <Panel title="Reviews" description="Testimonials or references from managers, clients, and collaborators.">
        <EditableList items={content.reviews} createItem={() => ({ id: `review-${Date.now()}`, quote: "Add review quote.", author: "Name", role: "Title" })} setItems={(items) => dispatch(setReviews(items))} renderItem={(item, update) => (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Quote"><textarea className={inputClass} rows={4} value={item.quote} onChange={(event) => update({ ...item, quote: event.target.value })} /></Field>
            <Field label="Author"><input className={inputClass} value={item.author} onChange={(event) => update({ ...item, author: event.target.value, id: makeId(event.target.value) })} /></Field>
            <Field label="Role"><input className={inputClass} value={item.role} onChange={(event) => update({ ...item, role: event.target.value })} /></Field>
          </div>
        )} />
      </Panel>
      <Panel title="Contact Section" description="Update contact CTA, social links, and outbound destinations.">
        <div className="grid gap-5 md:grid-cols-2">
          {(Object.keys(content.contact) as Array<keyof ContactContent>).map((field) => (
            <Field key={field} label={field}>
              {field === "description" ? <textarea className={inputClass} rows={5} value={content.contact[field]} onChange={(event) => dispatch(setContact({ [field]: event.target.value }))} /> : <input className={inputClass} value={content.contact[field]} onChange={(event) => dispatch(setContact({ [field]: event.target.value }))} />}
            </Field>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function GithubLinksEditor({ project, update }: { project: Project; update: (p: Project) => void }) {
  const links = getProjectGithubLinks(project);
  const updateLink = (id: string, field: keyof ProjectGithubLink, value: string) => update({ ...project, githubLinks: links.map((l) => (l.id === id ? { ...l, [field]: value } : l)) });
  const addLink = () => update({ ...project, githubLinks: [...links, { id: `repo-${Date.now()}`, label: "Repository", url: "https://github.com/username/repo" }] });
  const removeLink = (id: string) => update({ ...project, githubLinks: links.filter((l) => l.id !== id) });

  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
      <div className="mb-4 flex items-center justify-between gap-3"><div><p className="text-sm font-semibold text-white/70">GitHub Repositories</p><p className="text-xs text-white/40">Add client, server, admin, or any custom repository link.</p></div><button type="button" className="rounded-full bg-cyan-300 px-3 py-1.5 text-xs font-bold text-zinc-950" onClick={addLink}>Add URL</button></div>
      <div className="space-y-3">{links.map((link) => (<div key={link.id} className="grid gap-3 md:grid-cols-[0.35fr_1fr_auto]"><input className={inputClass} value={link.label} placeholder="Client Side" onChange={(event) => updateLink(link.id, "label", event.target.value)} /><input className={inputClass} value={link.url} placeholder="https://github.com/..." onChange={(event) => updateLink(link.id, "url", event.target.value)} /><button type="button" className="rounded-2xl border border-red-300/30 px-4 py-2 text-sm font-semibold text-red-100" onClick={() => removeLink(link.id)}>Delete</button></div>))}</div>
    </div>
  );
}

function ProjectsEditor() {
  const dispatch = useAppDispatch();
  const content = useAppSelector((state) => state.portfolio);

  return (
    <Panel title="Projects" description="Manage flip-card front content, hover links, and detail page copy.">
      <EditableList items={content.projects} createItem={() => ({ id: `project-${Date.now()}`, title: "New Project", image: "", techStack: ["React", "Node.js"], summary: "Short summary.", description: "Detailed description.", github: "", githubLinks: [{ id: `repo-${Date.now()}`, label: "Client Side", url: "https://github.com/username/project-client" }], live: "https://example.com" })} setItems={(items) => dispatch(setProjects(items))} renderItem={(item, update) => (
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title"><input className={inputClass} value={item.title} onChange={(event) => update({ ...item, title: event.target.value, id: makeId(event.target.value) })} /></Field>
          <Field label="Image URL"><input className={inputClass} value={item.image} onChange={(event) => update({ ...item, image: event.target.value })} /></Field>
          <Field label="Tech stack comma separated"><input className={inputClass} value={joinCommaList(item.techStack)} onChange={(event) => update({ ...item, techStack: parseCommaList(event.target.value) })} /></Field>
          <Field label="Live URL"><input className={inputClass} value={item.live} onChange={(event) => update({ ...item, live: event.target.value })} /></Field>
          <div className="md:col-span-2"><GithubLinksEditor project={item} update={update} /></div>
          <div className="md:col-span-2"><Field label="Summary"><textarea className={inputClass} rows={4} value={item.summary} onChange={(event) => update({ ...item, summary: event.target.value })} /></Field></div>
          <div className="md:col-span-2"><Field label="Detail description"><textarea className={inputClass} rows={5} value={item.description} onChange={(event) => update({ ...item, description: event.target.value })} /></Field></div>
        </div>
      )} />
    </Panel>
  );
}

function BlogsEditor() {
  const dispatch = useAppDispatch();
  const content = useAppSelector((state) => state.portfolio);

  return (
    <Panel title="Blogs" description="Manage blog cards, sliced excerpts, detail body, tags, and outbound blog URL.">
      <EditableList items={content.blogs} createItem={() => ({ id: `blog-${Date.now()}`, title: "New Blog Post", image: "", excerpt: "Short description.", body: "Full blog body.", tags: ["Engineering"], link: "https://example.com/blog", readTime: "4 min read" })} setItems={(items) => dispatch(setBlogs(items))} renderItem={(item, update) => (
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title"><input className={inputClass} value={item.title} onChange={(event) => update({ ...item, title: event.target.value, id: makeId(event.target.value) })} /></Field>
          <Field label="Image URL"><input className={inputClass} value={item.image} onChange={(event) => update({ ...item, image: event.target.value })} /></Field>
          <Field label="Tags comma separated"><input className={inputClass} value={joinCommaList(item.tags)} onChange={(event) => update({ ...item, tags: parseCommaList(event.target.value) })} /></Field>
          <Field label="Read time"><input className={inputClass} value={item.readTime} onChange={(event) => update({ ...item, readTime: event.target.value })} /></Field>
          <Field label="Blog URL"><input className={inputClass} value={item.link} onChange={(event) => update({ ...item, link: event.target.value })} /></Field>
          <Field label="Excerpt"><textarea className={inputClass} rows={4} value={item.excerpt} onChange={(event) => update({ ...item, excerpt: event.target.value })} /></Field>
          <div className="md:col-span-2"><Field label="Detail body"><textarea className={inputClass} rows={6} value={item.body} onChange={(event) => update({ ...item, body: event.target.value })} /></Field></div>
        </div>
      )} />
    </Panel>
  );
}

function ThemeEditor() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.portfolio.theme);
  const updateTheme = (field: keyof Omit<ThemeConfig, "sections">, value: string | number) => dispatch(setTheme({ [field]: value } as Partial<ThemeConfig>));
  const updateSection = (section: SectionKey, field: keyof SectionTheme, value: string) => dispatch(setSectionTheme({ section, field, value }));

  return (
    <div className="space-y-10">
      <Panel title="Global Theme" description="Control the portfolio-wide colors and GSAP animation speed.">
        <div className="grid gap-5 md:grid-cols-3">
          {(["primary", "secondary", "background", "text", "muted", "panel"] as const).map((field) => (<ColorField key={field} label={field} value={theme[field]} onChange={(value) => updateTheme(field, value)} />))}
          <Field label="Animation speed"><input className={inputClass} type="number" min="0.5" max="2.5" step="0.1" value={theme.animationSpeed} onChange={(event) => updateTheme("animationSpeed", Number(event.target.value))} /></Field>
        </div>
      </Panel>
      <Panel title="Section Themes" description="Give each section its own background, text, accent colors, and background image.">
        <div className="space-y-8">
          {sectionKeys.map((section) => (
            <div key={section} className="border-t border-white/10 pt-6">
              <h3 className="mb-4 text-xl font-semibold">{sectionLabels[section]}</h3>
              <div className="grid gap-5 md:grid-cols-3">
                <ColorField label="Background" value={theme.sections[section].bg} onChange={(value) => updateSection(section, "bg", value)} />
                <ColorField label="Text" value={theme.sections[section].text} onChange={(value) => updateSection(section, "text", value)} />
                <ColorField label="Accent" value={theme.sections[section].accent} onChange={(value) => updateSection(section, "accent", value)} />
                <div className="md:col-span-3"><Field label="Background image URL"><input className={inputClass} value={theme.sections[section].bgImage ?? ""} placeholder="https://..." onChange={(event) => updateSection(section, "bgImage", event.target.value)} /></Field></div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
