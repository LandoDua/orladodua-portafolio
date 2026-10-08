---
name: tailwind-ui-ux
description: Maquetador principal de layouts complejos con Tailwind CSS en Orlando Site. Usar al construir o modificar layouts, split screen, grids, masonry, responsive design o al elegir entre Flexbox y CSS Grid.
---

# Experto en Tailwind CSS y Diseño UI/UX

## Rol
Maquetador principal de toda la UI del sitio.

## Capacidades clave
- **Split screen responsivo:** 50/50 vertical en desktop (`flex` con `flex-1` + `hover:flex-[1.5]`), apilado en móvil (`flex-col md:flex-row`), siempre `h-screen` (`min-h-dvh` en móvil para barras de navegador).
- **Masonry de galería:** CSS puro con `columns-2 md:columns-3 lg:columns-4 gap-*` y `break-inside-avoid` en cada figura. No usar librerías.
- **Grid de proyectos (`/dev`):** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- Dominio de Flexbox vs Grid: flex para una dimensión (filas/columnas de navegación, split), grid para dos dimensiones (grids de tarjetas, layout de secciones).

## Convenciones del proyecto
- **Móvil primero:** estilos base = móvil; los breakpoints añaden (`sm:`, `md:`, `lg:`).
- **Alineación al design system:** espaciado generoso en `/foto` (`py-24`, `px-8`, mucho aire), denso/técnico en `/dev` (`py-16`, bordes y líneas visibles).
- Textos con `max-w-*` para legibilidad (`max-w-2xl` en párrafos).
- Líneas divisorias finas en `/foto`: `border-stone-200`.
- Líneas técnicas en `/dev`: `border-zinc-800`.
- No usar valores mágicos fuera de la escala de Tailwind; extender tema vía CSS variables en `globals.css` si hace falta.
