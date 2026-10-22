import { defineQuery } from "groq";

/** Categorías de la galería (orden alfabético para el menú de filtros). */
export const CATEGORIES_QUERY = defineQuery(`*[_type == "category"] | order(title asc) {
  _id,
  title,
  "slug": slug.current
}`);

/** Fotos de la galería con datos de imagen para <Image /> + LQIP. */
export const PHOTOS_QUERY = defineQuery(`*[_type == "photo"] | order(order asc, _createdAt desc) {
  _id,
  title,
  alt,
  order,
  sourceKey,
  "category": category->slug.current,
  image {
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions { width, height }
      }
    },
    hotspot,
    crop
  }
}`);
