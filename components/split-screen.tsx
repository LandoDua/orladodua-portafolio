"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, Monitor } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type Side = "dev" | "foto";

const EASE = [0.22, 1, 0.36, 1] as const;
const NAV_DURATION = 0.55;

const devGlow: CSSProperties = {
  backgroundImage:
    "radial-gradient(70% 55% at 50% 75%, rgba(34,211,238,0.18), transparent 70%), radial-gradient(45% 40% at 80% 15%, rgba(239,68,68,0.16), transparent 70%)",
};

const fotoCream: CSSProperties = {
  backgroundImage:
    "radial-gradient(75% 60% at 50% 60%, rgba(255,255,255,0.95), transparent 75%), radial-gradient(60% 55% at 20% 85%, rgba(231,205,170,0.45), transparent 70%)",
};

export default function SplitScreen() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [navigating, setNavigating] = useState<Side | null>(null);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const goTo = (side: Side, href: string) => {
    if (navigating) return;
    if (reduceMotion) {
      void router.push(href);
      return;
    }
    setNavigating(side);
    timerRef.current = window.setTimeout(() => {
      void router.push(href);
    }, NAV_DURATION * 1000);
  };

  const flexGrow = (side: Side): number => {
    if (navigating === null) return 1;
    return navigating === side ? 2.4 : 0.001;
  };

  const hoverProps = navigating || reduceMotion
    ? {}
    : { whileHover: { flexGrow: 1.45 } as const };

  const panelTransition = { duration: NAV_DURATION, ease: EASE };

  // El contenido NO depende de JS para verse: la entrada es una animación CSS
  // (.panel-in) y el estado "saliendo" se aplica con clases. Si el script no
  // llega a ejecutarse, el texto sigue visible y los <a> navegan igual.
  const contentClass = `relative z-10 flex flex-col items-center gap-5 px-6 text-center panel-in${
    navigating ? " is-leaving" : ""
  }`;

  return (
    <div className="relative flex h-dvh flex-col md:flex-row">
      {/* ————— Lado Dev (izquierda, oscuro) ————— */}
      <motion.div
        {...hoverProps}
        animate={{ flexGrow: flexGrow("dev") }}
        transition={panelTransition}
        className="group relative flex min-h-0 flex-1 basis-0 items-center justify-center overflow-hidden border-b border-zinc-800/80 bg-zinc-950 md:items-start md:pt-16 md:border-b-0 md:border-r"
      >
        <div
          aria-hidden
          style={devGlow}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
        />
        <div className={contentClass}>
          <Link
            href="/dev"
            aria-label="Entrar al portafolio de desarrollo"
            onClick={(e) => {
              e.preventDefault();
              goTo("dev", "/dev");
            }}
            className="flex flex-col items-center gap-5 rounded-sm focus-visible:outline-2 focus-visible:-outline-offset-8 focus-visible:outline-cyan-400"
          >
            <Monitor
              aria-hidden
              className="h-10 w-10 text-zinc-500 transition-colors duration-500 group-hover:text-cyan-400"
              strokeWidth={1.25}
            />
            <h1 className="text-4xl font-medium tracking-tight text-white transition-all duration-500 group-hover:[text-shadow:0_0_28px_rgba(34,211,238,0.45)] sm:text-5xl md:text-6xl">
              Developer
            </h1>
            <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
              Desarrollador Full-Stack
            </p>
            <span className="text-[11px] uppercase tracking-[0.35em] text-cyan-400 opacity-0 translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
              Entrar
            </span>
          </Link>
        </div>
      </motion.div>

      {/* ————— Lado Foto (derecha, claro) ————— */}
      <motion.div
        {...hoverProps}
        animate={{ flexGrow: flexGrow("foto") }}
        transition={panelTransition}
        className="group relative flex min-h-0 flex-1 basis-0 items-center justify-center overflow-hidden bg-stone-50 md:items-end md:pb-16"
      >
        <div
          aria-hidden
          style={fotoCream}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 group-focus-within:opacity-100"
        />
        <div className={contentClass}>
          <Link
            href="/foto"
            aria-label="Entrar al portafolio de fotografía"
            onClick={(e) => {
              e.preventDefault();
              goTo("foto", "/foto");
            }}
            className="flex flex-col items-center gap-5 rounded-sm focus-visible:outline-2 focus-visible:-outline-offset-8 focus-visible:outline-stone-900"
          >
            <Camera
              aria-hidden
              className="h-10 w-10 text-stone-400 transition-colors duration-500 group-hover:text-stone-900"
              strokeWidth={1.25}
            />
            <h1 className="font-display text-4xl italic text-stone-900 sm:text-5xl md:text-6xl">
              Fotógrafo
            </h1>
            <p className="text-[11px] uppercase tracking-[0.35em] text-stone-500">
              Retratos · Eventos · Producto
            </p>
            <span className="text-[11px] uppercase tracking-[0.35em] text-stone-900 opacity-0 translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
              Entrar
            </span>
          </Link>
        </div>
      </motion.div>

      {/* ————— Nombre negativo sobre la costura —————
          Blanco con mix-blend-difference: sale blanco sobre el lado oscuro y
          negro sobre el lado claro; al moverse la unión las letras se invierten.
          Puro CSS: se ve sin JavaScript. pointer-events-none para no tapar clics. */}
      <div
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4 mix-blend-difference"
      >
        <p
          className={`text-center text-xl font-medium uppercase tracking-[0.18em] text-white sm:text-2xl md:text-3xl md:tracking-[0.3em] lg:text-4xl xl:text-5xl panel-in panel-in-delay${
            navigating ? " is-leaving" : ""
          }`}
        >
          Orlando Duarte
        </p>
      </div>
    </div>
  );
}
