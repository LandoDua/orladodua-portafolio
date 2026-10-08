import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Faltan NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET en .env.local",
  );
}

const builder = createImageUrlBuilder({ projectId, dataset });

/** Construye URLs optimizadas de Sanity (`urlFor(image).width(800).url()`). */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
