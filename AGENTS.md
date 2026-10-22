# AGENTS.md — Orlando Site (Portafolio Dual)

Guía para agentes de IA que trabajen en este repositorio. **Lee esto antes de tocar código.**

## 1. Qué es el proyecto

Portafolio dual bajo un mismo dominio con Next.js (App Router): una landing *split screen* bifurca a dos mini-sitios con estéticas opuestas — **`/foto`** (fotógrafo, clara/minimalista) y **`/dev`** (desarrollador, oscura/hacker).

- **Fuente de verdad del plan:** [`PLAN.md`](./PLAN.md) — ahí están las fases, casillas de progreso y todas las decisiones tomadas. Mantenlo actualizado.
- **Contexto de diseño:** [`context/`](./context/) (overview, prompts de maquetación, habilidades de agentes).

## 2. Orden de trabajo (importante)

El proyecto se construye **por fases, en este orden** (definido por Orlando):

1. **Fase 0** — Scaffolding: `create-next-app` (TS, Tailwind, ESLint), dependencias, `next.config.ts`, `.env.local`
2. **Fase 1** — Landing split screen `/`
3. **Fase 2** — **Lado Fotógrafo `/foto` (PRIORIDAD)** incluyendo Sanity + subida de fotos
4. **Fase 3** — Lado Developer `/dev`
5. **Fase 4** — Pulido, SEO, lint/build, despliegue Vercel

Marca el progreso en `PLAN.md` conforme avanzas. **No empieces la Fase 3 antes de completar la Fase 2.**

## 3. Reglas duras

1. **Aislamiento de estilos:** jamás mezclar clases oscuras/neón en componentes de `(foto)` ni claras/minimalistas en `(dev)`. Cada route group tiene su `layout.tsx` con su identidad. La landing `/` es la única página con ambas estéticas (mitades separadas).
2. **Imágenes:** siempre `next/image` (`<Image />`), nunca `<img>`. URLs de Sanity vía `@sanity/image-url`. Dominio `cdn.sanity.io` en `next.config.ts` → `remotePatterns`.
3. **UI 100% CSS:** tarjetas de paquetes y filtros visuales (grayscale, sepia, blur) construidos solo con clases Tailwind — **sin imágenes pre-diseñadas**.
4. **Contenido dinámico:** galería y categorías se consumen desde Sanity (GROQ), no hardcodeados.
5. **Contacto:** `mailto:` por ahora. El componente debe quedar preparado para migrar a **Formspree** después (punto de inyección claro en el handler).
6. **Skills:** antes de tareas complejas, considera cargar las skills de `.opencode/skills/` (ver §6).

## 4. Sobre la referencia de Stitch ⚠️

Existe un proyecto en Google Stitch (**"Dual Portfolio Developer Photographer"**, accesible vía MCP `stitch`) con 6 pantallas. **Úsalo solo como referencia VAGA de maquetación:**

- ✅ Sirve para: distribución general (split screen, hero + grid + contacto, masonry), estructura de secciones.
- ❌ **NO sirve para:**
  - **Contenido** — todo el texto de Stitch es *relleno* (lo puso la IA a petición de Orlando). El contenido real se define en este repo.
  - **Animaciones** — Stitch se excedió en elementos animados. Orlando quiere un diseño **más limpio y sobrio**: animaciones sutiles y con intención, no decoración por decorar.
  - **Colores/tipografías exactos** — son referencia visual, no tokens definitivos.

**Filosofía visual pedida:** limpio, con espacio en blanco, animaciones contenidas.

## 5. Datos y contenido

- **Fotos locales:** `fotografias/` — 158 archivos → 5 categorías en Sanity:
  | Carpeta local | Categoría |
  |---|---|
  | `fotografias/retratos/Estudio/` (28) | Retratos Estudio |
  | `fotografias/retratos/Exterior/` (62) | Retratos Exterior |
  | `fotografias/eventos/` (50) | Eventos |
  | `fotografias/comida y productos/` (18) | Comida y Productos |
  - Galería: masonry con filtros `Todo | Retratos Estudio | Retratos Exterior | Eventos | Comida`.
- **Lado Dev:** proyectos reales **Tone Breadth, SK scorev, Flora 26, Portafolio Fotográfico** — Orlando aporta repos/enlaces/descripciones reales. Si no los tienes, pídeselos antes de rellenar (no inventar).
- **Sanity:** cuenta existente. Token de escritura y IDs van en `.env.local` (nunca en código ni en git).

## 6. Skills instaladas (`.opencode/skills/`)

Cárgalas con la herramienta `skill` cuando apliquen:

| Skill | Cuándo |
|---|---|
| `nextjs-app-router` | rutas, layouts, Server/Client Components |
| `nextjs-image-optimization` | cualquier imagen / config de `next.config.ts` |
| `tailwind-ui-ux` | layouts, grids, masonry, responsive |
| `tailwind-theme-isolation` | **antes de estilizar** cualquier cosa de `(dev)` o `(foto)` |
| `css-only-components` | paquetes, filtros, badges (sin imágenes) |
| `framer-motion-animations` | transiciones, hover, entradas (¡con moderación!) |
| `sanity-cms` | schemas, GROQ, subida de fotos |
| `vercel-react-best-practices` | revisión de performance React/Next |
| `vercel-cli` / `deploy-to-vercel` | fase de despliegue |

## 7. MCPs configurados

- **Proyecto** (`./opencode.json`): `sanity` (remoto, token en header). ⚠️ **Este archivo va en `.gitignore`** — contiene un secreto. Agregarlo al crear el scaffolding.
- **Global** (`~/.config/opencode/opencode.json`): `photon`, `context7`, `stitch`.
- **Reiniciar opencode** tras cambios en skills o config MCP (no se recargan en caliente).

## 8. Verificación

Antes de dar por terminada una fase:

```bash
npm run lint
npm run build
```

Ambos deben pasar sin errores. También verifica responsive en móvil (la landing se apila, el masonry baja a 2 columnas).

**Gotchas del dev server (aprendidos en la Fase 1):**

1. **Nunca ejecutes `npm run build` con `next dev` corriendo** — corrompe `.next` y la hidratación deja de funcionar (HTML bien, pero **páginas en blanco** en el navegador, o sin hover/animaciones). Si pasa: `rm -rf .next` y reiniciar `next dev`.
2. **Si mueren las animaciones/hover pero el HTML se ve bien**, revisa `allowedDevOrigins` en `next.config.ts`: debe incluir `localhost`, `127.0.0.1`, `[::1]` **y la IP LAN actual**. Si el HMR (websocket) está bloqueado, **la hidratación de React no completa**. La IP la asigna el DHCP y puede cambiar (bug original de Orlando: "solo se ven los dos cuadros").
3. **La landing debe verse sin JavaScript**: la entrada es CSS (`.panel-in` en `globals.css`), el SSR de Framer Motion **nunca** debe dejar `opacity:0` inline en el texto. No reintroducir `initial="hidden"` de Framer en texto visible.

## 9. Flujo de trabajo y despliegue (Vercel)

- **`main` = producción.** Solo se hace push a `main` para lanzar una versión. Vercel despliega automáticamente en `https://orladodua-portafolio.vercel.app` con cada push a `main`.
- **`develop` = rama de desarrollo.** Todo el trabajo futuro (Fase 3 Dev, Formspree, pulido) se hace aquí. Cada push genera un *deploy de preview* en Vercel.
- **Para lanzar:** merge de `develop` → `main` + push.
- **Env vars en Vercel** (ya configuradas): `NEXT_PUBLIC_SANITY_PROJECT_ID=8670kl0n`, `NEXT_PUBLIC_SANITY_DATASET=production` (producción y preview). El `SANITY_API_WRITE_TOKEN` **nunca** se sube a Vercel (solo sirve para subir fotos desde local).
- **CLI de Vercel:** usar `npx vercel` (no hay instalación global). El proyecto está linkeado vía `.vercel/` (gitignored).
- **Repo GitHub:** `LandoDua/orladodua-portafolio` (**público** desde 2026-10-22, LICENSE MIT; auditoría de secretos limpia — `.env*`, `opencode.json` y `fotografias/` quedan fuera de git).

## 10. Convenciones

- TypeScript estricto; sin `any` innecesarios.
- Componentes en `kebab-case` (`project-card.tsx`); páginas nativas `page.tsx`/`layout.tsx`.
- Móvil primero con breakpoints de Tailwind.
- Navegación interna con `next/link`.
- Comunicación con Orlando: en **español**.
