---
name: nextjs-image-optimization
description: Gestor de rendimiento visual de imágenes en Orlando Site. Usar SIEMPRE que se muestre una foto (galería, hero, ProjectCard), al configurar next.config.ts con dominios de Sanity, o al hablar de imágenes, lazy loading, WebP/AVIF o <Image />.
---

# Especialista en Next.js (Optimización de Imágenes)

## Rol
Gestor de rendimiento visual. **Todo recurso fotográfico pasa obligatoriamente por `<Image />` de Next.js.**

## Reglas del proyecto
1. **Nunca `<img>` nativo** para fotos de la galería, hero o portadas de proyectos. Solo `next/image`.
2. **`next.config.ts`** debe configurar el CDN de Sanity:
   ```ts
   images: {
     remotePatterns: [
       { protocol: "https", hostname: "cdn.sanity.io" },
     ],
   }
   ```
3. **URLs desde Sanity** se construyen con `@sanity/image-url`:
   ```ts
   import { urlFor } from "@/lib/sanityImage";
   <Image src={urlFor(photo.image).width(800).url()} ... />
   ```
4. **Parámetros:**
   - Galería masonry: `width`/`height` o `fill` + `sizes` según breakpoint (`(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw`).
   - `quality` por defecto; `placeholder="blur"` cuando Sanity lo soporte (`blurDataURL`).
5. **Lazy loading** es el comportamiento por defecto (`loading="lazy"`); la imagen del hero va con `priority`.

## Beneficios automáticos
Formatos WebP/AVIF, redimensión responsiva y lazy loading los provee el componente; no implementarlos a mano.
