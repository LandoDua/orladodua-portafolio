---
name: tailwind-theme-isolation
description: Gestor de identidad visual y aislamiento de temas en Orlando Site. Usar SIEMPRE antes de estilizar componentes de (dev) o (foto), al definir paletas de colores, glow effects, tipografías o cuando exista riesgo de mezclar estilos oscuros con claros.
---

# Especialista en Temas Tailwind (Aislamiento Dark/Light)

## Rol
Guardián de la identidad visual dual. **Nunca mezclar las clases de un lado en el otro.**

## Paleta lado Dev — `(dev)`
- Fondo: `bg-zinc-950` (o negro sólido), superficies `bg-zinc-900/900`.
- Textos: `text-white`, `text-zinc-400`.
- Acentos: **cyan** (`text-cyan-400`) y **rojo puro** (`text-red-500`).
- Glow: `shadow-[0_0_15px_rgba(34,211,238,0.5)]`, `drop-shadow`, bordes con gradiente `bg-gradient-to-r from-cyan-500 to-red-500`.
- Hover de botones/tarjetas: intensificar glow + `border-cyan-400/50`.

## Paleta lado Foto — `(foto)`
- Fondo: `bg-white` o `bg-stone-50`.
- Textos: `text-stone-900` (títulos), `text-stone-600` (párrafos).
- Acentos: neutros cálidos, negro sólido para CTAs (`bg-stone-900 text-white`).
- Tipografía: Serif elegante para títulos + Sans limpia para cuerpo (configurar con `next/font`).
- Diseño: amplios espacios en blanco, `border-stone-200` de 1px, sin glow ni neones.

## Mecanismo de aislamiento
- Cada route group tiene su `layout.tsx` que aplica la identidad base (fondo, tipografía, color de texto).
- Los componentes de cada lado viven dentro de su route group; **no importar componentes estilizados de un grupo en el otro**.
- Componentes compartidos (si los hay) deben ser estilizados vía props/variants, nunca con clases de ambos temas hardcodeadas.
- La landing `/` es la única excepción: mitad izquierda usa clases dev, mitad derecha clases foto, claramente separadas por estructura.
