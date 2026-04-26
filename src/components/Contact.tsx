import { FormEvent, useState } from "react";
import { usePortfolioContent, inputClass } from "../store";
import { SectionShell } from "./SectionShell";

export function ContactSection() {
  const content = usePortfolioContent();
  const contact = content.contact;
  const [sent, setSent] = useState(false);

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const messages = JSON.parse(window.localStorage.getItem("portfolio-contact-messages") ?? "[]") as unknown[];
    messages.push({ name: data.get("name"), subject: data.get("subject"), message: data.get("message"), createdAt: new Date().toISOString() });
    window.localStorage.setItem("portfolio-contact-messages", JSON.stringify(messages));
    event.currentTarget.reset();
    setSent(true);
  };

  return (
    <SectionShell id="contact" eyebrow="Contact" title={contact.headline}>
      <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="max-w-3xl text-2xl leading-10 text-white/72">{contact.description}</p>
          <form onSubmit={submitMessage} className="mt-8 grid gap-4">
            <input className={inputClass} name="name" placeholder="Your name" required />
            <input className={inputClass} name="subject" placeholder="Subject" required />
            <textarea className={inputClass} name="message" placeholder="Message" rows={6} required />
            <button className="w-fit rounded-full bg-white px-6 py-3 text-sm font-bold text-zinc-950" type="submit">Submit Message</button>
            {sent ? <p className="text-sm text-emerald-300">Message saved locally. Connect this form to an API or email service for production delivery.</p> : null}
          </form>
        </div>
        <div className="space-y-4 text-lg">
          <a className="block text-white underline-offset-4 hover:underline" href={`mailto:${contact.email}`}>{contact.email}</a>
          <a className="block text-white/70 underline-offset-4 hover:text-white hover:underline" href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="block text-white/70 underline-offset-4 hover:text-white hover:underline" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="block text-white/70 underline-offset-4 hover:text-white hover:underline" href={contact.x} target="_blank" rel="noreferrer">X / Twitter</a>
        </div>
      </div>
    </SectionShell>
  );
}
