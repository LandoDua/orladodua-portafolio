"use client";

import { useEffect, useState } from "react";
import { INSTAGRAM_URL } from "@/lib/site";
import { InstagramIcon } from "./instagram-icon";

const SECTIONS = [
  { id: "galeria", label: "Galería" },
  { id: "paquetes", label: "Paquetes" },
  { id: "contacto", label: "Contacto" },
] as const;

/** Banda de detección: ~25%–40% del viewport (la sección que cruza esa franja es la activa). */
const ROOT_MARGIN = "-25% 0px -55% 0px";

/**
 * Nav del header con scroll-spy: resalta sutilmente la sección visible
 * (underline fino + texto stone-900). Sin sección activa en el hero.
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
      aria-label="Navegación"
      className="flex items-center gap-4 text-sm sm:gap-6"
    >
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "location" : undefined}
          className={
            active === id
              ? "relative text-stone-900 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-stone-900"
              : "relative text-stone-600 transition-colors hover:text-stone-900"
          }
        >
          {label}
        </a>
      ))}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram de Orlando Duarte"
        className="ml-1 text-stone-600 transition-colors hover:text-stone-900 sm:ml-2"
      >
        <InstagramIcon className="h-4 w-4" />
      </a>
    </nav>
  );
}
