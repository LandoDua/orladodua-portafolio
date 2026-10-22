import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./github-icon";
import { GITHUB_URL } from "@/lib/site";
import type { GithubActivity } from "@/lib/github";

/**
 * Sección GitHub con estética de terminal: stats del perfil + últimos
 * commits/eventos. Si la API no respondió (rate limit), muestra un
 * fallback estático en lugar de datos vacíos.
 */
export function GithubTerminal({ activity }: { activity: GithubActivity }) {
  const { stats, events } = activity;

  return (
    <div className="overflow-hidden border border-zinc-800 bg-zinc-900/60 shadow-[0_0_36px_rgba(34,211,238,0.08)]">
      {/* Chrome de ventana */}
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
        <span aria-hidden className="h-3 w-3 rounded-full bg-red-500/80" />
        <span aria-hidden className="h-3 w-3 rounded-full bg-cyan-400/70" />
        <span aria-hidden className="h-3 w-3 rounded-full bg-zinc-700" />
        <span className="ml-2 font-mono text-xs text-zinc-500">
          landodua — gh api
        </span>
      </div>

      <div className="space-y-1.5 p-5 font-mono text-[13px] leading-relaxed sm:p-6">
        <p>
          <span className="text-cyan-400">$</span>{" "}
          <span className="text-zinc-300">gh api users/LandoDua</span>
        </p>
        {stats ? (
          <p className="text-zinc-500">
            → {stats.publicRepos} repos · {stats.followers} seguidores
            {stats.location ? ` · ${stats.location}` : ""}
          </p>
        ) : (
          <p className="text-zinc-600">
            → github.com/LandoDua
            <span className="text-zinc-700"> (api no disponible ahora)</span>
          </p>
        )}

        <p className="pt-4">
          <span className="text-cyan-400">$</span>{" "}
          <span className="text-zinc-300">git log --oneline -6</span>
        </p>
        {events.length > 0 ? (
          events.map((event) => (
            <p key={event.id} className="text-zinc-500">
              <span className="text-zinc-600">{event.date}</span>{" "}
              <span className="text-red-400">{event.action}</span>
              {"  "}
              <span className="text-zinc-300">{event.repo}</span>
            </p>
          ))
        ) : (
          <p className="text-zinc-600">
            <span className="text-zinc-700">
              (sin actividad reciente en caché)
            </span>
          </p>
        )}

        <p className="pt-4">
          <span className="text-cyan-400">$</span>{" "}
          <span className="inline-block animate-pulse text-zinc-300">_</span>
        </p>
      </div>

      <div className="border-t border-zinc-800 px-5 py-4 sm:px-6">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
        >
          <GithubIcon className="h-4 w-4" />
          Ver perfil completo
          <ArrowUpRight aria-hidden className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
