"use client";

import type { FormEvent } from "react";
import { Send } from "lucide-react";
import { Reveal } from "./reveal";
import { EMAIL, GITHUB_URL } from "@/lib/site";
import { GithubIcon } from "./github-icon";

const inputClasses =
  "w-full border-0 border-b border-zinc-700 bg-transparent px-0 py-2.5 text-white transition-all placeholder:text-zinc-600 focus:border-cyan-400 focus:shadow-[0_1px_14px_rgba(34,211,238,0.35)] focus:outline-none";

/**
 * Punto de inyección para Formspree (Fase 4): sustituir el cuerpo de este
 * handler por un `fetch(ENDPOINT, { method: "POST", body: new FormData(form) })`.
 * El resto del componente no cambia.
 */
function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);

  const name = String(data.get("nombre") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("mensaje") ?? "").trim();

  const subject = `Mensaje desde el sitio dev — ${name || "Contacto"}`;
  const body = [`De: ${name}`, `Email: ${email}`, "", message].join("\n");

  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export function DevContact() {
  return (
    <section id="contacto" className="scroll-mt-20 border-t border-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
              Contacto
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-white md:text-4xl">
              ¿Construimos algo?
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-zinc-400">
              Escríbeme sobre tu proyecto, una idea o una vacante. Respondo
              personalmente, sin formularios ni intermediarios.
            </p>
            <div className="mt-8 space-y-5 text-sm">
              <a
                href={`mailto:${EMAIL}`}
                className="text-zinc-400 transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
              >
                {EMAIL}
              </a>
              <div>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-zinc-700 px-6 py-3 text-zinc-300 transition-all duration-300 hover:border-cyan-400/60 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
                >
                  <GithubIcon className="h-4 w-4" />
                  github.com/LandoDua
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-xs uppercase tracking-[0.2em] text-zinc-500"
                >
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Tu nombre"
                  className={inputClasses}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-[0.2em] text-zinc-500"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="tu@email.com"
                  className={inputClasses}
                />
              </div>

              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-xs uppercase tracking-[0.2em] text-zinc-500"
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={4}
                  placeholder="Cuéntame qué tienes en mente…"
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 border border-cyan-400/60 bg-zinc-900/60 px-7 py-3 text-sm text-cyan-400 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_18px_rgba(34,211,238,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
                >
                  Enviar
                  <Send aria-hidden className="h-4 w-4" />
                </button>
                <p className="text-xs text-zinc-600">
                  Se abrirá tu aplicación de correo con el mensaje listo.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
