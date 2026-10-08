"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { urlFor } from "@/lib/sanity.image";
import type { GalleryCategory, GalleryPhoto } from "@/lib/gallery";

type Photo = Omit<GalleryPhoto, "sourceKey">;

const GALLERY_SIZES = "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw";
const THUMB_WIDTH = 800;

/** Orden del menú de filtros definido en PLAN.md (Todo | Estudio | Exterior | Eventos | Comida). */
const FILTER_ORDER = [
  "retratos-estudio",
  "retratos-exterior",
  "eventos",
  "comida-y-productos",
];

interface GalleryProps {
  photos: Photo[];
  categories: GalleryCategory[];
}

export function Gallery({ photos, categories }: GalleryProps) {
  const [active, setActive] = useState("todo");
  const reduceMotion = useReducedMotion();

  const filters = useMemo(() => {
    const bySlug = new Map(categories.map((c) => [c.slug, c.title]));
    return [
      { slug: "todo", title: "Todo" },
      ...FILTER_ORDER.filter((slug) => bySlug.has(slug)).map((slug) => ({
        slug,
        title: bySlug.get(slug)!,
      })),
    ];
  }, [categories]);

  const visible = useMemo(
    () => (active === "todo" ? photos : photos.filter((p) => p.category === active)),
    [active, photos],
  );

  return (
    <section id="galeria" className="scroll-mt-20 border-t border-stone-200">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Portafolio
            </p>
            <h2 className="mt-3 font-display text-4xl italic md:text-5xl">
              Galería
            </h2>
          </div>
          <nav
            aria-label="Filtrar por categoría"
            className="flex flex-wrap gap-x-6 gap-y-3 text-sm"
          >
            {filters.map(({ slug, title }) => {
              const isActive = active === slug;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => setActive(slug)}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    isActive
                      ? "border-b border-stone-900 pb-1 text-stone-900"
                      : "border-b border-transparent pb-1 text-stone-500 transition-colors hover:text-stone-900"
                  }
                >
                  {title}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4">
          {visible.map((photo, index) => (
            <PhotoItem
              key={photo._id}
              photo={photo}
              index={index}
              animate={!reduceMotion}
            />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-10 text-sm text-stone-500">
            No hay fotos en esta categoría todavía.
          </p>
        )}
      </div>
    </section>
  );
}

interface PhotoItemProps {
  photo: Photo;
  index: number;
  animate: boolean;
}

function PhotoItem({ photo, index, animate }: PhotoItemProps) {
  const { width, height } = photo.image.asset.metadata.dimensions;
  const lqip = photo.image.asset.metadata.lqip;
  const displayHeight = Math.round((height / width) * THUMB_WIDTH);

  return (
    <motion.figure
      className="group relative mb-4 break-inside-avoid overflow-hidden bg-stone-100"
      initial={animate ? { opacity: 0, y: 20 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 4) * 0.05,
      }}
    >
      <Image
        src={urlFor(photo.image).width(THUMB_WIDTH).url()}
        alt={photo.alt}
        width={THUMB_WIDTH}
        height={displayHeight}
        sizes={GALLERY_SIZES}
        className="w-full object-cover grayscale transition duration-500 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
        placeholder={lqip ? "blur" : "empty"}
        blurDataURL={lqip ?? undefined}
      />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-stone-900/70 to-transparent p-3 text-xs text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {photo.title}
      </figcaption>
    </motion.figure>
  );
}
