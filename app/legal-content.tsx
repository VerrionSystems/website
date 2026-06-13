import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <main className="site-container py-10 sm:py-14">
      <header className="flex flex-col gap-5 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Verrion Systems Ltd home">
          <span className="grid size-10 place-items-center rounded-xl bg-navy text-sm font-bold text-white shadow-soft">V</span>
          <span>
            <span className="block text-sm font-bold tracking-tight text-ink">Verrion Systems Ltd</span>
            <span className="block text-xs text-muted">GMP quality platform</span>
          </span>
        </Link>
        <Link className="button-secondary w-fit" href="/">
          Back to landing page
        </Link>
      </header>

      <article className="mx-auto max-w-4xl py-12">
        <p className="eyebrow">Public information</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-6xl">{title}</h1>
        <p className="mt-4 text-sm text-muted">Last updated: {updated}</p>
        <div className="legal-copy mt-10 grid gap-8 text-base leading-8 text-muted">{children}</div>
      </article>
    </main>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-[-0.025em] text-ink">{title}</h2>
      <div className="mt-3 grid gap-3">{children}</div>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 pl-5">
      {items.map((item) => (
        <li key={item} className="list-disc">
          {item}
        </li>
      ))}
    </ul>
  );
}
