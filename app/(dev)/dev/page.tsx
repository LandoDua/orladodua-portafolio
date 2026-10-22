import Link from "next/link";
import { ChevronDown, Monitor } from "lucide-react";
import { getGithubActivity } from "@/lib/github";
import { PROJECTS } from "@/lib/projects";
import { DevContact } from "@/components/dev/dev-contact";
import { GithubTerminal } from "@/components/dev/github-terminal";
import { ProjectCard } from "@/components/dev/project-card";
import { Reveal } from "@/components/dev/reveal";

export default async function DevPage() {
  const activity = await getGithubActivity();

  return (
    <>
      {/* Hero — entrada con CSS puro (visible sin JS) */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_55%_at_15%_85%,rgba(34,211,238,0.13),transparent_70%),radial-gradient(45%_45%_at_85%_10%,rgba(239,68,68,0.11),transparent_70%)]"
        />
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-16 md:pb-24 md:pt-24">
          <div className="max-w-2xl">
            <div className="panel-in">
              <span className="inline-flex items-center gap-3 border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-cyan-400">
                <Monitor aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
                Desarrollador Full-Stack
              </span>
            </div>

            <h1 className="panel-in panel-in-delay mt-7 text-5xl font-medium tracking-tight text-white [text-shadow:0_0_36px_rgba(34,211,238,0.4)] sm:text-6xl">
              Orlando Duarte
            </h1>

            <p className="panel-in panel-in-delay mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              Construyo interfaces y APIs de punta a punta. React y Next.js
              delante, Python detrás — y todos los proyectos que ves abajo
              están desplegados, con el código abierto.
            </p>

            <div className="panel-in panel-in-delay mt-9 flex flex-wrap gap-4">
              <a
                href="#proyectos"
                className="inline-flex items-center gap-2 border border-cyan-400/60 bg-zinc-900/60 px-7 py-3 text-sm text-cyan-400 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_18px_rgba(34,211,238,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
              >
                Ver proyectos
                <ChevronDown aria-hidden className="h-4 w-4" />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 border border-red-500/50 bg-zinc-900/60 px-7 py-3 text-sm text-red-400 transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_18px_rgba(239,68,68,0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
              >
                Contactar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="scroll-mt-20 border-t border-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
              Proyectos
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-white md:text-4xl">
              Trabajo real, en producción
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
            {PROJECTS.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Actividad GitHub */}
      <section id="github" className="scroll-mt-20 border-t border-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid items-start gap-12 md:grid-cols-[1fr_1.5fr] md:gap-16">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                GitHub
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-white md:text-4xl">
                El código,
                <br />
                en público
              </h2>
              <p className="mt-5 leading-relaxed text-zinc-400">
                Estudiante de Ingeniería en Sistemas Computacionales en
                Durango. Todo lo que construyo vive en GitHub: repos activos,
                ramas en desarrollo y despliegues automáticos.
              </p>
              <Link
                href="#contacto"
                className="mt-7 inline-block text-sm text-cyan-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
              >
                ¿Hablamos de tu proyecto? →
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <GithubTerminal activity={activity} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <DevContact />
    </>
  );
}
