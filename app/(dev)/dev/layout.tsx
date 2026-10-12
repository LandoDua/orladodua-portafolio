import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developer — Próximamente | Orlando Duarte",
  description:
    "El lado de desarrollo de Orlando Duarte está en construcción. Vuelve pronto.",
};

export default function DevLayout({ children }: LayoutProps<"/dev">) {
  return (
    <div className="flex min-h-dvh flex-col bg-zinc-950 text-white">
      <header className="border-b border-zinc-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-sm uppercase tracking-[0.25em] text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            Orlando Duarte
          </Link>
          <Link
            href="/foto"
            className="text-sm text-zinc-500 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            Ver fotografía →
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6">
        {children}
      </main>
    </div>
  );
}
