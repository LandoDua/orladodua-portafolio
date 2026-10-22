"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "proyectos", label: "Proyectos" },
  { id: "github", label: "GitHub" },
  { id: "contacto", label: "Contacto" },
] as const;

/** Banda de detección: ~25%–40% del viewport (la sección que cruza esa franja es la activa). */
const ROOT_MARGIN = "-25% 0px -55% 0px";

/**
 * Nav del header `/dev` con scroll-spy (mismo patrón que el de `/foto`):
 * resalta sutilmente la sección visible (underline fino cyan con glow).
 * Sin sección activa en el hero — ninguna de las tres cruza la banda.
 */
export function SectionNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        // Si varias secciones cruzan la banda, gana la primera en orden del documento.
        const current = SECTIONS.find(({ id }) => visible.get(id));
        setActive(current ? current.id : null);
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Secciones"
      className="flex items-center gap-5 text-sm sm:gap-7"
    >
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "location" : undefined}
          className={
            active === id
              ? "relative text-cyan-400 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-cyan-400 after:shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              : "relative text-zinc-500 transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          }
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
