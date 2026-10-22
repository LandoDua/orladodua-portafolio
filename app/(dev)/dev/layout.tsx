import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { EMAIL, GITHUB_URL } from "@/lib/site";
import { GithubIcon } from "@/components/dev/github-icon";

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
    <div className="flex min-h-dvh flex-col bg-zinc-950 text-white">
      <header className="sticky top-0 z-50 border-b border-zinc-900/80 bg-zinc-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/"
            className="text-sm uppercase tracking-[0.25em] text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            Orlando Duarte
          </Link>
          <nav
            aria-label="Secciones"
            className="flex items-center gap-5 text-sm text-zinc-500 sm:gap-7"
          >
            <a
              href="#proyectos"
              className="transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              Proyectos
            </a>
            <a
              href="#github"
              className="transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              GitHub
            </a>
            <a
              href="#contacto"
              className="transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              Contacto
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-zinc-900">
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
