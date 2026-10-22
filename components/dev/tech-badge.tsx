"use client";

import { useRef, useState } from "react";
import type { TechId } from "@/lib/projects";
import { TECH_ICONS } from "./tech-icons";

/**
 * Insignia redonda de tecnología (sistema documentado en
 * `context/sistema-insignias.md`).
 *
 * - Reposo: círculo con borde y glow cyan (color del sitio).
 * - Interacción (hover de puntero, tap en táctil o foco de teclado):
 *   icono/borde/glow cambian al color de marca de la tecnología y aparece
 *   un tooltip con el nombre completo encima de la insignia.
 *
 * Gestos (estado con JS, no CSS puro — `:hover` es inconsistente en táctil):
 * - Ratón: `pointerenter`/`pointerleave` (solo `pointerType === "mouse"`,
 *   para ignorar los eventos sintéticos que genera un tap).
 * - Táctil: tap alterna el tooltip (`lastPointerType` desde `pointerdown`);
 *   se cierra al tocar fuera (`onBlur`).
 * - Teclado: `focus` abre solo si coincide con `:focus-visible`; Escape cierra.
 */
export function TechBadge({ tech }: { tech: TechId }) {
  const [open, setOpen] = useState(false);
  const lastPointerType = useRef<string | null>(null);
  const { label, color, Icon } = TECH_ICONS[tech];

  return (
    <button
      type="button"
      aria-label={label}
      aria-describedby={`tech-tip-${tech}`}
      onPointerDown={(event) => {
        lastPointerType.current = event.pointerType;
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setOpen(false);
      }}
      onClick={() => {
        // Táctil: alterna. Ratón/teclado: el hover o el foco ya gobiernan.
        if (
          lastPointerType.current === "touch" ||
          lastPointerType.current === "pen"
        ) {
          setOpen((v) => !v);
        } else {
          setOpen(true);
        }
      }}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) setOpen(true);
      }}
      onBlur={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border bg-zinc-950/75 backdrop-blur-sm transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
      style={
        open
          ? {
              color,
              borderColor: color,
              boxShadow: `0 0 12px ${color}`,
            }
          : {
              color: "#22d3ee",
              borderColor: "rgba(34,211,238,0.3)",
              boxShadow: "0 0 8px rgba(34,211,238,0.35)",
            }
      }
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      <span
        id={`tech-tip-${tech}`}
        role="tooltip"
        className={`pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-[11px] font-medium tracking-wide text-zinc-200 shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-200 ${
          open
            ? "translate-y-0 opacity-100"
            : "translate-y-1 opacity-0"
        }`}
      >
        {label}
        <span
          aria-hidden
          className="absolute left-1/2 top-full -ml-1 border-4 border-transparent border-t-zinc-700"
        />
      </span>
    </button>
  );
}
