---
name: sanity-cms
description: Ingeniero de datos CMS para Orlando Site (Sanity.io). Usar al crear/modificar schemas, consultas GROQ, subir fotos a Sanity, configurar el cliente @sanity/client o integrar la galería del lado /foto con el CMS.
---

# Ingeniero de Datos CMS (Sanity.io)

## Rol
Integrador del backend de contenido: la galería y categorías se consumen **dinámicamente desde Sanity** para actualizar sin tocar código.

## Estructura del proyecto
```
sanity/
├── schemas/
│   ├── category.ts   # { title, slug }
│   └── photo.ts      # { title, image, category->, order, alt }
├── scripts/
│   └── upload-photos.mjs   # sube fotografias/ respetando carpetas
└── ...
```

## Schemas
- **`category`:** `title` (string), `slug` (slug). Categorías: Retratos Estudio, Retratos Exterior, Eventos, Comida y Productos.
- **`photo`:** `title` (string), `image` (image con `hotspot`), `category` (reference a category), `order` (number), `alt` (string, obligatorio para accesibilidad).

## Cliente y consultas
- Cliente con `@sanity/client` usando `NEXT_PUBLIC_SANITY_PROJECT_ID`, dataset y token de solo lectura en el front.
- URLs de imagen con `@sanity/image-url` (`urlFor`).
- **GROQ** para la galería:
  ```groq
  *[_type == "photo"]{
    _id, title, alt, order,
    "category": category->slug.current,
    image
  } order(order asc)
  ```

## Subida de fotos locales
- Script Node (`scripts/upload-photos.mjs`) con `@sanity/client`: recorre `fotografias/`, crea/usa categorías según la carpeta, sube el asset y crea el doc `photo`.
- Mapeo de carpetas → categorías:
  | Carpeta local | Categoría |
  |---|---|
  | `fotografias/retratos/Estudio/` | Retratos Estudio |
  | `fotografias/retratos/Exterior/` | Retratos Exterior |
  | `fotografias/eventos/` | Eventos |
  | `fotografias/comida y productos/` | Comida y Productos |
- El token de escritura **nunca** se expone al front: solo en `.env.local` (gitignored) y se usa en scripts/Studio.

## Studio
- Schemas registrados en `sanity.config.ts` (o carpeta `sanity/`). El Studio se usa en dev local; embeber en `/studio` es opcional posterior.

## Nota MCP
La documentación original menciona el servidor MCP de Sanity; si no está configurado en `opencode.json`, trabajar con el **CLI de Sanity** y `@sanity/client` directamente.
