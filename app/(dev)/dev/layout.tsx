import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { EMAIL, GITHUB_URL } from "@/lib/site";
import { GithubIcon } from "@/components/dev/github-icon";
import { SectionNav } from "@/components/dev/section-nav";

export const metadata: Metadata = {
  title: "Desarrollo — Orlando Duarte | Full-Stack",
  description:
    "Portafolio de desarrollo de Orlando Duarte: Tone Breath, Skull King Scorer, Flora 26 y más. React, Next.js, TypeScript y Python. Proyectos con código abierto y demo en vivo.",
};

/** Año cacheado: `new Date()` en render es inestable para el prerender de Next. */
async function getYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function DevLayout({
  children,
}: LayoutProps<"/dev">) {
  const year = await getYear();

  return (
    <div className="relative flex min-h-dvh flex-col bg-zinc-950 text-white">
      {/* Luces ambientales (misma paleta que el glow del panel dev de la
          landing): cian abajo-izquierda, rojo arriba-derecha y halo suave
          central. Fijo + pointer-events-none: acompaña todo el scroll sin
          consumir interacción. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 top-1/4 h-[540px] w-[540px] rounded-full bg-cyan-500/[0.07] blur-[130px]" />
        <div className="absolute -right-40 top-8 h-[480px] w-[480px] rounded-full bg-red-500/[0.06] blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[640px] -translate-x-1/3 rounded-full bg-cyan-400/[0.05] blur-[140px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-zinc-900/80 bg-zinc-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/"
            className="text-sm uppercase tracking-[0.25em] text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            Orlando Duarte
          </Link>
          <SectionNav />
        </div>
      </header>

      <main className="relative flex-1">{children}</main>

      <footer className="relative border-t border-zinc-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-zinc-500 sm:flex-row">
          <p>© {year} Orlando Duarte</p>
          <div className="flex items-center gap-6">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              <Mail aria-hidden className="h-4 w-4" />
              {EMAIL}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
