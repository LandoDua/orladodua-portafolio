# Plan de Desarrollo: Orlando Site (Portafolio Dual)

> Documento vivo. Fuente de verdad del orden de fases y decisiones tomadas.
> Contexto complementario en [`context/`](./context/).

## 1. Visión general

Portafolio web híbrido bajo un mismo dominio con dos mini-sitios:

| Ruta | Faceta | Estética |
|------|--------|----------|
| `/` | Landing (bifurcador) | Split screen: oscuro ↔ claro |
| `/foto` | Fotógrafo | Clara, minimalista, elegante (stone/crema, serif + sans) |
| `/dev` | Desarrollador Full-Stack | Oscura, hacker (zinc-950, cyan/rojo, glow) |

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide React · Sanity.io · Vercel (Hobby, $0)

## 2. Decisiones tomadas

1. **Orden de desarrollo: primero Foto, después Dev.** La faceta fotográfica se completa antes de iniciar la del desarrollador.
2. **Sanity desde cero** con cuenta existente: schemas + script de subida de las fotos locales.
3. **Fotos:** 158 archivos locales mapeados a **5 categorías planas** en la galería:
   - `Todo` (filtro sin categoría)
   - `Retratos Estudio` (28) → `fotografias/retratos/Estudio/`
   - `Retratos Exterior` (62) → `fotografias/retratos/Exterior/`
   - `Eventos` (50) → `fotografias/eventos/`
   - `Comida y Productos` (18) → `fotografias/comida y productos/`
4. **Galería:** masonry (columnas CSS) con menú de filtros en texto simple.
5. **Formulario de contacto:** `mailto:` por ahora; migración a **Formspree** en una fase posterior (dejar el componente preparado para intercambiar el handler).
6. **Contenido Dev:** Tone Breath, Skull King Scorer, Flora 26 y Portafolio Fotográfico con datos reales verificados contra GitHub LandoDua (repo, demo, descripción, stack). Nombres corregidos respecto al PLAN original: "Tone Breadth" → **Tone Breath**, "SK scorev" → **Skull King Scorer**.
7. **Skills de agentes:** instaladas en `.opencode/skills/` desde [`context/habilidades_de_agentes.md`](./context/habilidades_de_agentes.md) + skill de Vercel (`vercel-react-best-practices`).
8. **MCPs configurados:** **Context7** y **Google Stitch** en la config global (`~/.config/opencode/opencode.json`, fuera del repo); **Sanity** en el `opencode.json` **del proyecto** (nivel proyecto, header `Authorization: Bearer …` + `oauth: false`). El `opencode.json` del proyecto va al `.gitignore` para no exponer la API key.
9. **Stitch = referencia vaga de maquetación.** El proyecto de Stitch ("Dual Portfolio Developer Photographer", 6 pantallas) fue una primera maquetación con **contenido de relleno** y **animaciones excesivas**. Solo sirve como guía de distribución de secciones; el contenido real se define en este repo y el diseño debe ser **más limpio y sobrio** (animaciones contenidas).
10. **Identidad visible: "Orlando Duarte".** En la landing aparece como nombre negativo centrado sobre la costura (`mix-blend-mode: difference`, texto blanco → sale blanco sobre el lado oscuro y negro sobre el lado claro; al crecer un panel las letras se invierten al pasar la unión). Tipografía Geist en mayúsculas espaciadas. En desktop el contenido de cada panel se separa en diagonal (dev ↑, foto ↓) para dejarle el centro al nombre; en móvil el nombre queda sobre la unión apilada. Metadata actualizada con el nombre completo. El handle `orladodua` queda para dominio/GitHub.
11. **Token de escritura Sanity = token del MCP.** El PAT que usa el MCP remoto (`opencode.json`, gitignored) se copia a `SANITY_API_WRITE_TOKEN` en `.env.local` (también gitignored). No se genera token adicional salvo que falle el permiso de escritura.
12. **Git desde Fase 2:** repo inicializado en Fase 2 con `fotografias/` (393 MB de originales) en `.gitignore`; solo se versiona código y configuración.
13. **Flujo de ramas y despliegue (2026-10-11):** `main` = producción, `develop` = desarrollo. Repo GitHub `LandoDua/orladodua-portafolio`, proyecto Vercel `orladodua-portafolio` (Hobby). Push a `main` → deploy automático a producción. Env vars de Sanity públicas ya configuradas en Vercel.
13b. **Apertura del repo (2026-10-22):** auditoría previa limpia (sin `.env*`, tokens, `opencode.json` ni `fotografias/` trackeados; historial sin secretos). `LICENSE` MIT añadido; repo pasado de **privado a público** vía `gh`. `projectId` de Sanity y email ya eran públicos por diseño (el sitio los muestra).
14. **Pantalla `/dev` coming soon (2026-10-11):** ruta `(dev)/dev/page.tsx` con estética oscura, glow cyan/rojo, enlaces a GitHub/email y botón de vuelta al inicio. No cuenta como inicio de Fase 3.

## 3. Reglas inquebrantables

1. **Aislamiento de estilos:** nunca mezclar clases oscuras/neón en `(foto)` ni claras/minimalistas en `(dev)`. La landing `/` es la única página con ambas estéticas.
2. **Imágenes:** todo recurso fotográfico pasa por `<Image />` de Next.js (lazy loading, WebP/AVIF) + `@sanity/image-url` para el build de URLs desde Sanity.
3. **UI sin imágenes pre-editadas:** tarjetas de paquetes y filtros visuales (escala de grises, sepia, blur) construidos 100% con CSS/Tailwind.
4. **Contenido dinámico:** galería y categorías se consumen desde Sanity (GROQ), no hardcodeados.

## 4. Estructura objetivo

```
.
├── PLAN.md
├── context/                    # Documentación de referencia
├── fotografias/                # Fotos locales (fuente para subir a Sanity) — en .gitignore
├── .opencode/skills/           # Skills de agentes del proyecto
├── sanity.config.ts            # Config del Studio local (npx sanity dev)
├── sanity.cli.ts               # Config del CLI (deploy de schemas)
├── sanity/                     # Schemas + scripts de subida
│   ├── schemas/{category,photo}.ts
│   └── scripts/upload-photos.mjs
├── lib/                        # Cliente Sanity del front (client, image, queries)
└── app/
    ├── page.tsx                # Landing split screen
    ├── (foto)/foto/            # layout claro + página (FASE PRIORITARIA)
    └── (dev)/dev/              # layout oscuro + página (FASE POSTERIOR)
```

## 5. Fases

### Fase 0 — Scaffolding
- [x] `create-next-app` en la raíz (TS, Tailwind, ESLint, App Router), sin tocar `context/` ni `fotografias/`
  - Next.js **16.4.0**, React **19.3**, Tailwind **v4** (Turbopack), `cacheComponents` activo. Nombre del paquete: `orlando-site`.
- [x] Dependencias: `framer-motion`, `lucide-react`, `@sanity/client`, `@sanity/image-url`, `sanity`
- [x] `next.config.ts`: `remotePatterns` para `cdn.sanity.io`
- [x] `.env.local` (gitignored) con `NEXT_PUBLIC_SANITY_PROJECT_ID`, dataset y token
  - Proyecto Sanity: **`8670kl0n`** ("Orlando Dev/Photo"), dataset **`production`**.
  - ✅ `SANITY_API_WRITE_TOKEN` **resuelto (2026-10-08)**: se reutiliza el PAT del MCP de Sanity (`opencode.json`) copiándolo a `.env.local`. Scope de escritura verificado con la subida real de la Fase 2. Si algún día falla, generar uno nuevo en manage.sanity.io → API → Tokens (scope Editor).
- [x] `.gitignore` de proyecto: incluye `opencode.json` (token MCP), `.env*`, `node_modules`, `.next`
- Verificación: `npm run lint` ✅ · `npm run build` ✅

> **Nota:** `npm audit` reporta 19 avisos (11 high) en dependencias transitivas de `sanity`/`eslint` (`braces`, `js-yaml`, `smol-toml`…). No se aplica `npm audit fix --force` porque rompería versiones pinneadas; revisar en Fase 4.

### Fase 1 — Landing Split Screen (`/`)

> **Estado: ✅ COMPLETADA y verificada (2026-10-07)** — suite de regresión 37/37 aserciones.

- [x] 50/50 vertical en desktop, apilado en móvil, pantalla completa (`h-dvh` — mejor que `h-screen` en móvil)
- [x] Hover: expansión (`flex-grow` 1 → 1.45) + revelado de paleta (glow rojo/cyan ↔ crema)
- [x] Transición con Framer Motion hacia `/foto` y `/dev` (panel elegido se expande, contenido se desvanece, navegación a los 550 ms; con `useReducedMotion` la navegación es inmediata)
- [x] Íconos Lucide: Cámara (der.) y Monitor (izq.)
- [x] Tipografía base: **Geist** (sans) + **Instrument Serif** (display, lado foto) vía `next/font`; utility `font-display`
- [x] Hint "Entrar" + glow se revelan también con teclado (`group-focus-within`), outline `focus-visible`
- [x] Entrada animada (fade-in/slide-up) con **CSS puro** (`.panel-in` en `globals.css`), no Framer: el texto del SSR nunca lleva `opacity:0`, así es visible aunque el JS no llegue a hidratar
- [x] Nombre negativo **"ORLANDO DUARTE"** centrado sobre la costura: capa `mix-blend-difference` (z-20, `pointer-events-none`), Geist mayúsculas espaciadas (`text-xl → xl:text-5xl`), entrada escalonada (`.panel-in-delay`) y `is-leaving` al navegar; contenido de paneles en diagonal solo en `md:` (dev `md:items-start md:pt-16`, foto `md:items-end md:pb-16`)
- [x] Metadata: título y descripción con **"Orlando Duarte"**
- [x] Robustez LAN / **causa raíz del bug "solo se ven los dos cuadros"**:
  - El HMR bloqueado por `allowedDevOrigins` impedía que la **hidratación** completara → Framer Motion no arrancaba → el texto se quedaba en `opacity:0` del SSR. Con la entrada ya en CSS puro el contenido se ve aunque el JS falle, pero el arreglo real es incluir **todos** los orígenes locales: `localhost`, `127.0.0.1`, `[::1]` + IP de red actuales en `next.config.ts`
  - ⚠️ La IP la asigna el DHCP y **puede cambiar** (pasó de `.121` a `.112`): si el HMR falla, actualizar `allowedDevOrigins`
  - `npm run build` con el dev server corriendo corrompe el estado: si algo raro pasa, `rm -rf .next` y reiniciar `next dev`
- Verificación (suite automatizada Playwright + análisis de píxeles, **37/37 OK**):
  - `npm run lint` ✅ · `npm run build` ✅
  - Desktop 1440×900: split 50/50 (costura 720.5), `h-dvh`, íconos Lucide, Geist/Instrument Serif, glow + hint ocultos en reposo, 0 errores de consola ✅
  - Hover dev y foto: `flexGrow 1 → 1.45` + glow revelado en ambos lados ✅
  - Teclado: Tab → enlace enfocado, `group-focus-within` revela "Entrar", outline `focus-visible` ✅
  - Transición: panel elegido expande (→2.4), contenido se desvanece (`is-leaving`), push a ~550 ms; con `prefers-reduced-motion` navega sin animación ✅
  - Móvil 390×844: apilado sin huecos, altura = viewport, nombre centrado sobre la unión y sin solapes ✅
  - Nombre negativo: `mix-blend-difference` activo en ambos navegadores; inversión por píxeles antes/después de hover (84% claro → 84% oscuro en la zona que cruza la costura); render **sin JS** idéntico ✅
  - Hidratación + hover en `localhost`, `127.0.0.1` e IP LAN; Firefox sin errores ✅
  - `/foto` y `/dev` → 404 (esperado) ✅ — el recarga al 404 es fallback de Next por ruta inexistente y **desaparecerá en Fase 2** (navegación cliente vía RSC ya verificada: fetch `text/x-component`)
- ⚠️ `/foto` y `/dev` devuelven **404** hasta las Fases 2 y 3.

### Fase 2 — Lado Fotógrafo (`/foto`) ⬅️ PRIORIDAD

> **Estado: ✅ COMPLETADA (2026-10-08)** — backend Sanity + UI. Verificación abajo.

- [x] `layout.tsx` con identidad clara (stone-50, Instrument Serif + Geist vía `next/font`, líneas finas `border-stone-200`, header sticky y footer con Instagram/email)
- [x] Hero / Quién Soy — retrato de Orlando (`fotografias/OrlandoDua.jpg`, doc `order: -1` excluido de la galería) + entrada con CSS puro (`.panel-in`, visible sin JS)
- [x] **Sanity:** schemas `category` y `photo` (`sanity/schemas/` + `sanity.config.ts`), desplegados con `npm run sanity:schema:deploy` (workspace `orlando-site`, verificado vía MCP)
- [x] **Script de subida** de las 158 fotos locales → categorías (`npm run upload:photos`): idempotente por `sourceKey`, pool de 4, orden global 0–157. **Verificado: 158 photo + 4 category (62/50/28/18), 0 fallidas, 555 s** (+1 doc hero = 159 fotos)
- [x] Base de datos del front: `lib/sanity.client.ts`, `lib/sanity.image.ts` (`urlFor`), `lib/queries.ts` (`PHOTOS_QUERY`, `CATEGORIES_QUERY` con LQIP + dimensiones), `lib/gallery.ts` (`getGalleryData` con `"use cache"`)
- [x] Galería **masonry** (`columns-2 md:columns-3 lg:columns-4` + `break-inside-avoid`) con filtros de texto: Todo | Retratos Estudio | Retratos Exterior | Eventos | Comida (cliente, sin re-fetch)
- [x] Hover de imagen: solo `scale-[1.03]` (500 ms) — **sin B/N**, fotos a todo color (intención *color splash* decidida por Orlando)
- [x] Caption en hover: **nombre de categoría** (no el nombre de archivo, decisión de Orlando)
- [x] **Lightbox:** clic en foto → imagen grande con `createPortal` a `body`; el shell de la página (`#foto-shell`) se desenfoca (`blur(10px)`) y pasa a escala de grises (`grayscale(1)`) vía JS; navegación ←/→, cierre con Esc o clic en el fondo, contador `n / total`, scroll bloqueado, `role="dialog"`
- [x] 3 Paquetes de servicios (tarjetas 100% CSS, sin imágenes) — contenido fijado por Orlando (2026-10-22): precios **$800 / $2,200 / desde $2,800**, Eventos **100+ fotos**, cápsula **"Ideal para…"** por paquete, y copy de posar en la intro
- [x] Contacto `mailto:` estilo revista (inputs solo con borde inferior) → `orlando.dua2@gmail.com`; punto de inyección Formspree comentado en `handleSubmit`; redes: solo Instagram (`orlandodua.fotografo`, sin Behance por decisión)
- [x] Entradas animadas con Framer Motion (`Reveal` + `useReducedMotion`, `whileInView` once)
- [x] **Correcciones de contenido (2026-10-22):** ubicación *"Sesiones con cita en Canatlán y Durango"* en el hero (+ "Durango" en la metadata de `/foto` para SEO local) y diferencial *"te acompaño pose por pose"* en la intro de Paquetes
- [x] **Instagram accesible (2026-10-22):** icono en el header sticky (visible en todo el scroll) y link elevado a botón outlined en Contacto; footer intacto
- [x] **Scroll-spy en el header (2026-10-22):** `SectionNav` (cliente) resalta con underline fino la sección visible (Galería/Paquetes/Contacto) vía IntersectionObserver; sin activo en el hero, Instagram fuera del spy

**Verificación Fase 2:**
- `npx tsc --noEmit` ✅ · `npm run lint` ✅ · `npm run build` ✅ (`/foto` estático, revalidate 15m)
- HTML de producción: 200, **159 `<img>`** (158 galería + 1 hero), **0 clases `grayscale`** en la galería (color pleno), **158 botones "Ampliar foto"**, las 3 secciones (`#galeria`, `#paquetes`, `#contacto`) con `scroll-mt-20` bajo el header sticky, preload del hero (`priority`), `next/image` optimizer → 200 (hero: 116 KB)
- Studio local (`npm run sanity:dev`, :3333) muestra las 158 fotos + 4 categorías. En manage.sanity.io **no hay visor de contenido** (solo conteos); CORS `localhost:3333` ya registrado
- Gotchas encontrados: `sanity dev` exige `styled-components` como dependencia directa del proyecto; `LayoutProps<"/foto">` requiere build previo para generar tipos de ruta; `new Date()` en render rompe el prerender (resuelto con `"use cache"` en `getYear()`); iconos de marca eliminados de lucide v1 → Instagram SVG propio (`instagram-icon.tsx`)

### Fase 2b — Administración de fotos a largo plazo

> **Estado: ✅ COMPLETADA (2026-10-21)** — Studio hosteado + revalidate a demanda.

Contexto: la primera tirada (159 docs) se subió por script; a futuro se agregarán fotos en lote **y** de a una. El dashboard de manage.sanity.io no muestra contenido — para eso está el Studio.

- [x] **`sourceKey` opcional** en el schema `photo` (las fotos creadas a mano en Studio no necesitan ruta local). `lib/gallery.ts` tipa `sourceKey: string | null` y `order: number | null`.
- [x] Schema redesplegado (`npm run sanity:schema:deploy`).
- [x] **Studio hosteado:** `npm run sanity:studio:deploy` → URL permanente (nombre del workspace: `orlando-site`). Editar exige sesión de miembro del proyecto. Studio local sigue disponible con `npm run sanity:dev`.
- [x] **Orden estable:** `PHOTOS_QUERY` con `order(order asc, _createdAt desc)` — fotos manuales sin `order` no saltan arriba de forma rara.
- [x] **Caché a demanda:** `cacheTag("gallery")` en `getGalleryData` + ruta `app/api/revalidate/route.ts` (GET/POST) protegida por `REVALIDATE_SECRET` (en `.env.local`; debe añadirse también en Vercel). Tras subir fotos: llamar `/api/revalidate?secret=…` y la galería se refresca al instante.
- [ ] Añadir `REVALIDATE_SECRET` a Vercel (producción y preview) cuando se publique este cambio en `main`.
- [ ] Futuro opcional: webhook de Sanity → `/api/revalidate` (automático, sin curl manual).

**Flujo de administración resultante:**

| Flujo | Cómo |
|-------|------|
| Lote (como hasta ahora) | Dejar archivos en `fotografias/<carpeta>/` → `npm run upload:photos` → llamar `/api/revalidate?secret=…` |
| Puntual (nuevo) | Abrir Studio hosteado → doc "Foto" → subir imagen, categoría, `alt` (obligatorio), `order` opcional → revalidate |
| Categoría nueva | Crear en Studio (o añadir carpeta al array `FOLDERS` del script si se quiere subida por lote) |

### Fase 3 — Lado Developer (`/dev`)

> **Estado: ✅ COMPLETADA (2026-10-21)** — UI completa + GitHub API real.

- [x] `layout.tsx` oscuro con identidad propia (bg-zinc-950, acentos cyan/rojo, glow, `font-mono` Geist Mono), header sticky y footer con ©/GitHub/email
- [x] Hero con badge Monitor + h1 con text-shadow glow + subtítulo + botones #proyectos (cyan) y #contacto (rojo), entrada con CSS puro (`.panel-in` / `.panel-in-delay`, visible sin JS)
- [x] **`lib/projects.ts`** — fuente única de datos: tipo `TechId` (14 ids), interfaz `Project`, array `PROJECTS[]` con los 4 proyectos reales (Tone Breath, Skull King Scorer, Flora 26, Portafolio Fotográfico)
- [x] **`<TechBadge />`** — insignia redonda 100% CSS (círculo h-9 w-9, borde `cyan-400/30`, glow `0_0_8px`, `group-hover` intensifica), logo SVG inline de simple-icons (patrón de `github-icon.tsx`), 5–6 por card, siempre visibles **sobre la miniatura** (esquina inferior izquierda), reemplazan a los tags de texto del cuerpo
- [x] **`<ProjectCard />`** — imagen `next/image` fill aspect-video object-top, gradiente oscuro en base para legibilidad de badges, enlaces Código / Live Demo con iconos Lucide
- [x] Grid de proyectos (`md:grid-cols-2`) con datos reales verificados (repo/descripción/stack de GitHub; demos con HTTP 200; covers = capturas Playwright de los propios repos + de /foto producción)
- [x] **Terminal GitHub** (`<GithubTerminal />`): chrome con dots (rojo/cyan/zinc), `$ gh api users/LandoDua` + stats (repos, seguidores, ubicación) y `$ git log --oneline -6` con actividad reciente vía API real, cursor `_` animate-pulse, link al perfil; fallback estático si la API falla
- [x] **`lib/github.ts`** — fetch cacheado con `"use cache"` + `cacheTag("github")` + `cacheLife("hours")` (rate limit 60/h sin token); filtra tipos de eventos interesantes (push/create/…) y mapea a 6 máximo
- [x] Contacto `mailto:` con punto de inyección Formspree comentado (misma fórmula que `/foto`), inputs con glow cyan en `:focus`, botón Enviar + link GitHub
- [x] Entradas animadas con Framer Motion (`Reveal` + `useReducedMotion`, `whileInView` once, stagger 0.08 en el grid)
- [x] Aislamiento de estilos respetado: zero clases oscuras/neón fuera de `(dev)`
- [x] Metadata real: "Desarrollo — Orlando Duarte | Full-Stack"
- [x] **Insignias con logos de tecnología:** 11 SVGs inline de simple-icons v15 (react, typescript, javascript, nextdotjs, vite, tailwindcss, framer, fastapi, sanity, vercel, pwa) + 3 Lucide de respaldo para stacks sin icono simple-icons (Tone.js → AudioWaveform, Zustand → Boxes, Recharts → TrendingUp)
- [x] **Tarjeta Portafolio Fotográfico con estética `/foto` (2026-10-22):** `Project.theme?: "photo"`; `ProjectCard` rama clara (`bg-stone-50`, borde stone, título Instrument Serif italic, sin cyan); `TechBadge` variante `mono` (círculo blanco + icono stone-900). Las otras 3 tarjetas intactas (variante `neon`).

**Verificación Fase 3:**
- `npx tsc --noEmit` ✅ · `npm run lint` ✅ · `npm run build` ✅ (`/dev` estática, revalidate 15m, expire 1d)
- Desktop 1440×900 y mobile 390×844: hero + cards + terminal + contacto visibles tras scroll (whileInView), 4 cards con insignias e imágenes cargadas, 0 errores de consola, terminal muestra stats/eventos reales del API (no fallback)
- Gotchas: Lucide v1.52 **no tiene** íconos de marca (Github MISSING) → `github-icon.tsx` propio; iconos de marca de tech vía simple-icons paths (CC0) con `fill="currentColor"`
- Flora 26: repo `flor-amarilla-2026`; nombres reales en web: "Tone Breath" / "Skull King Scorer"

### Fase 4 — Pulido y despliegue
- [ ] Responsive completo (landing apilada, grids, masonry)
- [ ] `prefers-reduced-motion`
- [ ] Metadatos SEO por ruta + favicon
- [ ] Verificación: `npm run lint` + `npm run build`
- [x] Conexión a Vercel (Hobby) + env vars — **2026-10-11**: proyecto Vercel linkeado, env vars configuradas, primer deploy de producción exitoso.
- [x] **Repo público + LICENSE MIT** — **2026-10-22**: auditoría de secretos limpia (árbol + historial), LICENSE MIT, `gh repo edit --visibility public`. Enlace "Código" de la tarjeta del portafolio ya es funcional.
- [ ] Migración futura del contacto a Formspree

## 6. Skills de agentes instaladas

| Skill | Fuente en `habilidades_de_agentes.md` |
|-------|----------------------------------------|
| `nextjs-app-router` | 1. Especialista en Next.js (App Router) |
| `nextjs-image-optimization` | 2. Especialista en Next.js (Optimización de Imágenes) |
| `tailwind-ui-ux` | 3. Experto en Tailwind CSS y Diseño UI/UX |
| `tailwind-theme-isolation` | 4. Especialista en Temas Dark/Light |
| `css-only-components` | 5. Desarrollador de Componentes CSS Nativos |
| `framer-motion-animations` | 6. Especialista en Animaciones |
| `sanity-cms` | 7. Ingeniero de Datos CMS |
| `vercel-react-best-practices` | Vercel Engineering (Next.js performance) |
| `vercel-cli` | Skill general oficial de Vercel (repo `vercel/vercel`): CLI, logs, env vars, dominios |
| `deploy-to-vercel` | `vercel-labs/agent-skills`: flujo de despliegue con autodetección de frameworks |

> **Nota:** reiniciar opencode después de instalar skills para que se carguen.
