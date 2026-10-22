import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./github-icon";
import { TechBadge } from "./tech-badge";
import type { Project } from "@/lib/projects";

/**
 * Tarjeta de proyecto: miniatura con insignias de tecnología encima
 * (glow que se intensifica en hover), título, descripción y enlaces
 * GitHub / Live Demo. Sin tags de texto — las insignias los reemplazan.
 *
 * `project.theme === "photo"` (solo el portafolio) cambia a la estética
 * del lado `/foto`: fondo claro, Instrument Serif y insignias B/N.
 */
export function ProjectCard({ project }: { project: Project }) {
  const isPhoto = project.theme === "photo";

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden border transition-all duration-300 ${
        isPhoto
          ? "border-stone-200 bg-stone-50 hover:border-stone-400 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] focus-within:border-stone-400"
          : "border-zinc-800 bg-zinc-900/40 hover:border-cyan-400/60 hover:shadow-[0_0_28px_rgba(34,211,238,0.12)] focus-within:border-cyan-400/60"
      }`}
    >
      <div
        className={`relative aspect-video overflow-hidden ${
          isPhoto ? "bg-stone-100" : "bg-zinc-950"
        }`}
      >
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className={
            isPhoto
              ? "absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent"
              : "absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-zinc-950/10 to-transparent"
          }
        />
        <div className="absolute bottom-3 left-3 flex gap-2">
          {project.techs.map((tech) => (
            <TechBadge
              key={tech}
              tech={tech}
              variant={isPhoto ? "mono" : "neon"}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3
          className={
            isPhoto
              ? "font-display text-2xl italic text-stone-900"
              : "text-lg font-medium tracking-tight text-white"
          }
        >
          {project.title}
        </h3>

        <p
          className={`flex-1 text-sm leading-relaxed ${
            isPhoto ? "text-stone-600" : "text-zinc-400"
          }`}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 transition-colors ${
              isPhoto
                ? "text-stone-500 hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-900"
                : "text-zinc-400 hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            }`}
          >
            <GithubIcon className="h-4 w-4" />
            Código
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 transition-colors ${
              isPhoto
                ? "text-stone-500 hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-900"
                : "text-zinc-400 hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            }`}
          >
            Live Demo
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
