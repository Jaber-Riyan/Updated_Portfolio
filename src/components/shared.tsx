import type * as React from "react";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/60">{label}</span>
      {children}
    </label>
  );
}

export function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <Field label={label}>
      <div className="flex gap-3">
        <input className="h-12 w-14 rounded-xl border border-white/10 bg-transparent" type="color" value={value} onChange={(event) => onChange(event.target.value)} />
        <input className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/70" value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    </Field>
  );
}

export function Panel({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-2 text-white/55">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function EditableList<T extends { id: string }>({
  items,
  setItems,
  createItem,
  renderItem,
}: {
  items: T[];
  setItems: (items: T[]) => void;
  createItem: () => T;
  renderItem: (item: T, update: (item: T) => void) => React.ReactNode;
}) {
  const addItem = (event: React.FormEvent) => {
    event.preventDefault();
    setItems([...items, createItem()]);
  };

  const updateItem = (id: string, nextItem: T) => setItems(items.map((item) => (item.id === id ? nextItem : item)));
  const removeItem = (id: string) => setItems(items.filter((item) => item.id !== id));

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={item.id} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">Item {index + 1}</p>
            <button className="rounded-full border border-red-300/30 px-3 py-1.5 text-sm font-semibold text-red-200" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
          {renderItem(item, (nextItem) => updateItem(item.id, nextItem))}
        </div>
      ))}
      <form onSubmit={addItem}>
        <button className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-zinc-950" type="submit">
          Add Item
        </button>
      </form>
    </div>
  );
}
