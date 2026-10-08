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
6. **Contenido Dev:** Tone Breadth, SK scorev, Flora 26 y Portafolio Fotográfico con datos reales (repo, demo, descripción, tags) que aportará Orlando.
7. **Skills de agentes:** instaladas en `.opencode/skills/` desde [`context/habilidades_de_agentes.md`](./context/habilidades_de_agentes.md) + skill de Vercel (`vercel-react-best-practices`).
8. **MCPs configurados:** **Context7** y **Google Stitch** en la config global (`~/.config/opencode/opencode.json`, fuera del repo); **Sanity** en el `opencode.json` **del proyecto** (nivel proyecto, header `Authorization: Bearer …` + `oauth: false`). El `opencode.json` del proyecto va al `.gitignore` para no exponer la API key.
9. **Stitch = referencia vaga de maquetación.** El proyecto de Stitch ("Dual Portfolio Developer Photographer", 6 pantallas) fue una primera maquetación con **contenido de relleno** y **animaciones excesivas**. Solo sirve como guía de distribución de secciones; el contenido real se define en este repo y el diseño debe ser **más limpio y sobrio** (animaciones contenidas).
10. **Identidad visible: "Orlando Duarte".** En la landing aparece como nombre negativo centrado sobre la costura (`mix-blend-mode: difference`, texto blanco → sale blanco sobre el lado oscuro y negro sobre el lado claro; al crecer un panel las letras se invierten al pasar la unión). Tipografía Geist en mayúsculas espaciadas. En desktop el contenido de cada panel se separa en diagonal (dev ↑, foto ↓) para dejarle el centro al nombre; en móvil el nombre queda sobre la unión apilada. Metadata actualizada con el nombre completo. El handle `orladodua` queda para dominio/GitHub.
11. **Token de escritura Sanity = token del MCP.** El PAT que usa el MCP remoto (`opencode.json`, gitignored) se copia a `SANITY_API_WRITE_TOKEN` en `.env.local` (también gitignored). No se genera token adicional salvo que falle el permiso de escritura.
12. **Git desde Fase 2:** repo inicializado en Fase 2 con `fotografias/` (393 MB de originales) en `.gitignore`; solo se versiona código y configuración.

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

> **Estado parcial (2026-10-08): backend (Sanity) COMPLETADO.** Pendiente la UI de `/foto`.

- [ ] `layout.tsx` con identidad clara (stone-50, serif + sans vía `next/font`, líneas finas)
- [ ] Hero / Quién Soy
- [x] **Sanity:** schemas `category` y `photo` (`sanity/schemas/` + `sanity.config.ts`), desplegados con `npm run sanity:schema:deploy` (workspace `orlando-site`, verificado vía MCP)
- [x] **Script de subida** de las 158 fotos locales → categorías (`npm run upload:photos`): idempotente por `sourceKey`, pool de 4, orden global 0–157. **Verificado: 158 photo + 4 category (62/50/28/18), 0 fallidas, 555 s**
- [x] Base de datos del front: `lib/sanity.client.ts`, `lib/sanity.image.ts` (`urlFor`), `lib/queries.ts` (`PHOTOS_QUERY`, `CATEGORIES_QUERY` con LQIP + dimensiones)
- [ ] Galería **masonry** con filtros de texto: Todo | Retratos Estudio | Retratos Exterior | Eventos | Comida
- [ ] Hover de imagen: zoom + filtro CSS (escala de grises → color)
- [ ] 3 Paquetes de servicios (tarjetas 100% CSS, sin imágenes)
- [ ] Contacto `mailto:` estilo revista (inputs solo con borde inferior) + redes (Instagram, Behance)
- [ ] Entradas animadas (fade-in/slide-up) con Framer Motion

> **Nota:** CORS de Sanity para fetch desde browser (si la galería lo necesita) se agregará con `npx sanity cors add` en la fase de UI.

### Fase 3 — Lado Developer (`/dev`)
- [ ] `layout.tsx` oscuro (bg-zinc-950, acentos cyan/rojo, glow)
- [ ] Hero + botones con efecto neón
- [ ] `<ProjectCard />` reutilizable: imagen, título, descripción, tags con borde brillante, GitHub / Live Demo
- [ ] Grid de proyectos con datos reales: Tone Breadth, SK scorev, Flora 26, Portafolio Fotográfico
- [ ] Actividad GitHub con estética de terminal
- [ ] Contacto `mailto:` con inputs que brillan en `:focus` + footer de redes
- [ ] Entradas animadas con Framer Motion

### Fase 4 — Pulido y despliegue
- [ ] Responsive completo (landing apilada, grids, masonry)
- [ ] `prefers-reduced-motion`
- [ ] Metadatos SEO por ruta + favicon
- [ ] Verificación: `npm run lint` + `npm run build`
- [ ] Conexión a Vercel (Hobby) + env vars
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
