# Sistema de insignias de tecnología (lado `/dev`)

> Referencia viva del componente `TechBadge` (`components/dev/tech-badge.tsx`)
> y del set de íconos `TECH_ICONS` (`components/dev/tech-icons.tsx`).

## Qué es

Insignias redondas que muestran el stack de cada proyecto en las tarjetas de
`/dev`, montadas sobre la miniatura (esquina inferior izquierda). Reemplazan a
los tags de texto: mismo rol informativo, lenguaje visual del lado oscuro.

## Comportamiento

| Estado | Aspecto |
|--------|---------|
| Reposo | Círculo `h-9 w-9`, borde y glow **cyan** (color del sitio), icono en `currentColor` |
| Interacción | Icono, borde y glow cambian al **color de marca** de la tecnología; aparece un **tooltip** con el nombre completo encima de la insignia |

La interacción se activa con cualquiera de estos gestos:

- **Puntero:** hover sobre la insignia.
- **Táctil:** tap sobre la insignia (fija el tooltip hasta tocar de nuevo o
  tocar fuera — `onBlur` lo cierra). El tap no navega: el badge es un
  `<button type="button">`, no un enlace.
- **Teclado:** Tab hasta la insignia (`focus`), Escape cierra el tooltip;
  anillo `focus-visible` cyan.

Implementación: componente cliente con estado `open` (no CSS puro), porque
`:hover` es inconsistente en táctil y el tap debe *fijar* el tooltip.

## Colores de marca

`TECH_ICONS[id].color` guarda el hex de [simple-icons](https://simpleicons.org)
(oficial de cada marca). Dos excepciones documentadas:

- **Next.js y Vercel** son `#000` en simple-icons: se usa `#FFFFFF` para que
  sean visibles sobre el fondo oscuro del lado dev.
- **Tone.js, Zustand y Recharts** no existen en simple-icons: se representan
  con íconos de UI de **Lucide** (`AudioWaveform`, `Boxes`, `TrendingUp`) y un
  color representativo *no oficial* (naranja, magenta, naranja-rojo).

## Cómo agregar una tecnología nueva

1. **`lib/projects.ts`** — añade el id al tipo `TechId` (unión string literal).
2. **`components/dev/tech-icons.tsx`** — añade la entrada en `TECH_ICONS`:
   - `label`: nombre completo legible (es lo que muestra el tooltip).
   - `color`: hex de marca de simple-icons (o representativo si no existe).
   - `Icon`: `brand("<path del svg de simple-icons>")` o un ícono Lucide.
     Para el path: buscar la marca en simple-icons, copiar el `d` del path
     (licencia CC0, seguro para este repo).
3. Usa el id en el array `techs` del proyecto correspondiente en
   `lib/projects.ts`. El `ProjectCard` monta las badges automáticamente.

No hace falta tocar `tech-badge.tsx`: consume `TECH_ICONS` por `TechId`.

## Reglas del lado dev

- El cyan (`#22d3ee`) es el color del **sitio** (estado reposo, foco,
  enlaces). Los colores de marca solo aparecen en interacción con la insignia.
- Nada de PNGs de logos: 100% SVG inline / Lucide (regla del proyecto:
  UI sin imágenes pre-diseñadas).
- Aislamiento de estilos: este sistema es exclusivo de `(dev)`.
