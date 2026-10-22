"use client";

import type { FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import { Reveal } from "./reveal";
import { InstagramIcon } from "./instagram-icon";
import { EMAIL, INSTAGRAM_URL } from "@/lib/site";

const SESSION_TYPES = [
  "Retrato — Estudio",
  "Retrato — Exterior",
  "Evento",
  "Comida / Producto",
  "Otra",
];

const inputClasses =
  "w-full border-0 border-b border-stone-300 bg-transparent px-0 py-2.5 text-stone-900 transition-colors placeholder:text-stone-400 focus:border-stone-900 focus:outline-none";

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
  const sessionType = String(data.get("sesion") ?? "").trim();
  const message = String(data.get("mensaje") ?? "").trim();

  const subject = `Cotización desde el sitio — ${sessionType || "Sesión"}`;
  const body = [
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Tipo de sesión: ${sessionType}`,
    "",
    message,
  ].join("\n");

  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
  return (
    <section id="contacto" className="scroll-mt-20 border-t border-stone-200">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Contacto
            </p>
            <h2 className="mt-3 font-display text-4xl italic md:text-5xl">
              Hablemos
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-stone-600">
              Cuéntame qué quieres recordar. Respondo personalmente con
              disponibilidad y una cotización para tu sesión o evento.
            </p>
            <div className="mt-8 space-y-5 text-sm">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-stone-700 transition-colors hover:text-stone-900"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {EMAIL}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-stone-900 px-7 py-3 text-sm text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
                @orlandodua.fotografo
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-xs uppercase tracking-[0.2em] text-stone-500"
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
                  className="block text-xs uppercase tracking-[0.2em] text-stone-500"
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
                  htmlFor="sesion"
                  className="block text-xs uppercase tracking-[0.2em] text-stone-500"
                >
                  Tipo de sesión
                </label>
                <select
                  id="sesion"
                  name="sesion"
                  defaultValue={SESSION_TYPES[0]}
                  className={`${inputClasses} appearance-none`}
                >
                  {SESSION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-xs uppercase tracking-[0.2em] text-stone-500"
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={4}
                  placeholder="Fecha, lugar y lo que tienes en mente…"
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-stone-900 px-7 py-3 text-sm text-white transition-colors hover:bg-stone-700"
                >
                  Enviar
                  <Send className="h-4 w-4" aria-hidden />
                </button>
                <p className="text-xs text-stone-400">
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
