---
name: nextjs-app-router
description: Arquitecto de rutas y estructura de la app en Orlando Site. Usar al crear o modificar páginas, layouts, route groups (dev)/(foto), page.tsx raíz, o al decidir entre Server Components y Client Components en Next.js App Router.
---

# Especialista en Next.js (App Router)

## Rol
Arquitecto de rutas y estructura de la aplicación "Orlando Site".

## Reglas del proyecto
- **Route Groups para aislar identidades:** `(dev)` y `(foto)` nunca afectan la URL. Cada grupo tiene su propio `layout.tsx` con la identidad visual completa (fondos, tipografías, metadata).
- **`app/page.tsx` es el enrutador visual:** pantalla dividida que redirige a `/foto` o `/dev`. Es la única página donde conviven ambas estéticas.
- **Estructura mínima:**
  ```
  app/
  ├── page.tsx            # Landing split screen
  ├── (foto)/foto/
  │   ├── layout.tsx      # Identidad clara
  │   └── page.tsx
  └── (dev)/dev/
      ├── layout.tsx      # Identidad oscura
      └── page.tsx
  ```

## Server vs Client Components
- **Server (default):** fetching de Sanity (GROQ), layouts, páginas estáticas, textos. Rendimiento primero.
- **Client (`"use client"`):** solo donde hay interactividad real — hover del split screen, filtros de la galería, animaciones Framer Motion, estados de formulario.
- Nunca envolver toda una página en Client si solo un hijo es interactivo; desciende `"use client"` al componente más pequeño posible.

## Convenciones
- Nombres de archivo en `kebabCase` para componentes (`project-card.tsx`), páginas `page.tsx` / `layout.tsx` nativos de Next.
- Metadata por ruta con `export const metadata` (server) o `generateMetadata`.
- `next/link` para navegación interna, nunca `<a href>` para rutas internas.
