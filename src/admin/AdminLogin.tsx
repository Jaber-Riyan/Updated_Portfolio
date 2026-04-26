import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { inputClass } from "../store";
import { adminEmail, adminPassword } from "../data";
import { Field } from "../components/shared";

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState("");

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (email === adminEmail && password === adminPassword) {
      window.sessionStorage.setItem("portfolio-admin-auth", "true");
      setError("");
      onSuccess();
      return;
    }

    setError("Invalid admin email or password.");
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,.16),transparent_34%),#09090f] px-5 text-white">
      <form onSubmit={handleLogin} className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-2xl shadow-black/30">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">Secure CMS</p>
        <h1 className="mt-3 text-3xl font-semibold">Admin Authentication</h1>
        <p className="mt-3 text-sm leading-6 text-white/58">Use the credentials configured in the environment file to manage portfolio content.</p>
        <div className="mt-8 space-y-4">
          <Field label="Admin email">
            <input className={inputClass} defaultValue={"jaberriyan357@gmail.com"} name="email" type="email" placeholder="admin@jaber.com" required />
          </Field>
          <Field label="Password">
            <input className={inputClass} defaultValue={"1qazxsw2"} name="password" type="password" placeholder="123456" required />
          </Field>
        </div>
        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
        <button className="mt-6 w-full rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-zinc-950" type="submit">Login to Dashboard</button>
        <Link to="/" className="mt-3 block w-full rounded-full border border-white/10 px-5 py-3 text-center text-sm font-bold text-white">Back to Portfolio</Link>
      </form>
    </main>
  );
}
