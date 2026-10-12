import Link from "next/link";
import { ArrowLeft, Mail, Monitor } from "lucide-react";
import { EMAIL, GITHUB_URL } from "@/lib/site";
import { GithubIcon } from "@/components/dev/github-icon";

export default function DevPage() {
  return (
    <div className="relative flex w-full max-w-2xl flex-col items-center overflow-hidden py-20 text-center">
      {/* Glow radial cyan/rojo (misma paleta que el hover del panel dev) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_50%_75%,rgba(34,211,238,0.14),transparent_70%),radial-gradient(45%_40%_at_80%_15%,rgba(239,68,68,0.12),transparent_70%)]"
      />

      <div className="panel-in flex flex-col items-center gap-6">
        <span className="flex items-center gap-3 border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-cyan-400">
          <Monitor aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
          Próximamente
        </span>

        <h1 className="text-5xl font-medium tracking-tight text-white [text-shadow:0_0_32px_rgba(34,211,238,0.35)] sm:text-6xl">
          Developer
        </h1>

        <p className="max-w-md leading-relaxed text-zinc-400">
          Estoy preparando el lado de desarrollo de mi portafolio: proyectos,
          código y demostraciones. Mientras tanto, puedes ver mi trabajo
          fotográfico o escribirme.
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 border border-cyan-400/50 bg-zinc-900/60 px-6 py-3 text-sm text-cyan-400 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="mt-8 flex items-center gap-6 text-sm text-zinc-500">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            <Mail aria-hidden className="h-4 w-4" />
            Email
          </a>
          <span aria-hidden className="text-zinc-700">
            ·
          </span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
