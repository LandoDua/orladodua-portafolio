import { cacheTag } from "next/cache";
import { sanityClient } from "./sanity.client";
import { CATEGORIES_QUERY, PHOTOS_QUERY } from "./queries";

export interface GalleryCategory {
  _id: string;
  title: string;
  slug: string;
}

export interface GalleryImage {
  asset: {
    _id: string;
    url: string;
    metadata: {
      lqip: string | null;
      dimensions: { width: number; height: number };
    };
  };
  hotspot: { x: number; y: number; height: number; width: number } | null;
  crop: { bottom: number; left: number; right: number; top: number } | null;
}

export interface GalleryPhoto {
  _id: string;
  title: string;
  alt: string;
  order: number | null;
  /** Ruta local que usó el script de subida; `null` en fotos creadas a mano en Studio. */
  sourceKey: string | null;
  category: string;
  image: GalleryImage;
}

/** Retrato de presentación: se usa en el hero y se excluye de la galería. */
export const HERO_SOURCE_KEY = "fotografias/OrlandoDua.jpg";

export interface GalleryData {
  hero: GalleryPhoto | null;
  photos: Omit<GalleryPhoto, "sourceKey">[];
  categories: GalleryCategory[];
}

export async function getGalleryData(): Promise<GalleryData> {
  "use cache";
  // Permite refrescar la galería a demanda vía /api/revalidate (tag: gallery).
  cacheTag("gallery");
  const [allPhotos, categories] = await Promise.all([
    sanityClient.fetch<GalleryPhoto[]>(PHOTOS_QUERY),
    sanityClient.fetch<GalleryCategory[]>(CATEGORIES_QUERY),
  ]);

  const hero = allPhotos.find((p) => p.sourceKey === HERO_SOURCE_KEY) ?? null;
  const photos = allPhotos
    .filter((p) => p.sourceKey !== HERO_SOURCE_KEY)
    .map((p) => ({
      _id: p._id,
      title: p.title,
      alt: p.alt,
      order: p.order,
      category: p.category,
      image: p.image,
    }));

  return { hero, photos, categories };
}
