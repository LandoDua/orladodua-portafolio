"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { urlFor } from "@/lib/sanity.image";
import type { GalleryCategory, GalleryPhoto } from "@/lib/gallery";

type Photo = Omit<GalleryPhoto, "sourceKey">;

const GALLERY_SIZES = "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw";
const THUMB_WIDTH = 800;
const LIGHTBOX_WIDTH = 2000;

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
  const [selected, setSelected] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const categoryTitles = useMemo(
    () => new Map(categories.map((c) => [c.slug, c.title])),
    [categories],
  );

  const filters = useMemo(() => [
    { slug: "todo", title: "Todo" },
    ...FILTER_ORDER.filter((slug) => categoryTitles.has(slug)).map((slug) => ({
      slug,
      title: categoryTitles.get(slug)!,
    })),
  ], [categoryTitles]);

  const visible = useMemo(
    () => (active === "todo" ? photos : photos.filter((p) => p.category === active)),
    [active, photos],
  );

  const close = useCallback(() => setSelected(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setSelected((i) =>
        i === null ? i : (i + dir + visible.length) % visible.length,
      ),
    [visible.length],
  );

  // Lightbox: desenfoca y desatura el shell de la página (el diálogo vive en
  // un portal fuera del shell, así no recibe el filtro) y bloquea el scroll.
  useEffect(() => {
    if (selected === null) return;

    const shell = document.getElementById("foto-shell");
    if (shell) {
      shell.style.transition = "filter 350ms ease";
      shell.style.filter = "blur(10px) grayscale(1)";
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      if (shell) shell.style.filter = "";
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, visible.length, close, step]);

  const activePhoto = selected !== null ? visible[selected] : null;

  // Precarga las vecinas (solo cuando la foto grande ya cargó) para que las
  // flechas naveguen sin espera.
  const preloadUrls = useMemo(() => {
    if (selected === null || visible.length < 2) return [];
    const urls = new Set<string>();
    for (const dir of [-1, 1]) {
      const neighbor =
        visible[(selected + dir + visible.length) % visible.length];
      if (neighbor) {
        urls.add(urlFor(neighbor.image).width(LIGHTBOX_WIDTH).url());
      }
    }
    return [...urls];
  }, [selected, visible]);

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
              categoryTitle={categoryTitles.get(photo.category) ?? "Fotografía"}
              onOpen={() => setSelected(index)}
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

      {activePhoto &&
        selected !== null &&
        createPortal(
          <Lightbox
            photo={activePhoto}
            categoryTitle={
              categoryTitles.get(activePhoto.category) ?? "Fotografía"
            }
            index={selected}
            total={visible.length}
            preloadUrls={preloadUrls}
            animate={!reduceMotion}
            onClose={close}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />,
          document.body,
        )}
    </section>
  );
}

interface PhotoItemProps {
  photo: Photo;
  index: number;
  categoryTitle: string;
  onOpen: () => void;
  animate: boolean;
}

function PhotoItem({
  photo,
  index,
  categoryTitle,
  onOpen,
  animate,
}: PhotoItemProps) {
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
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ampliar foto de la categoría ${categoryTitle}`}
        className="block w-full cursor-zoom-in"
      >
        <Image
          src={urlFor(photo.image).width(THUMB_WIDTH).url()}
          alt={photo.alt}
          width={THUMB_WIDTH}
          height={displayHeight}
          sizes={GALLERY_SIZES}
          className="w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          placeholder={lqip ? "blur" : "empty"}
          blurDataURL={lqip ?? undefined}
        />
      </button>
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-stone-900/70 to-transparent p-3 text-xs text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none">
        {categoryTitle}
      </figcaption>
    </motion.figure>
  );
}

interface LightboxProps {
  photo: Photo;
  categoryTitle: string;
  index: number;
  total: number;
  preloadUrls: string[];
  animate: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({
  photo,
  categoryTitle,
  index,
  total,
  preloadUrls,
  animate,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const { width, height } = photo.image.asset.metadata.dimensions;
  // `loadedId`: la foto ya cargó solo si coincide con la visible (se resetea
  // al navegar para que vuelvan a aparecer las burbujas si hace falta).
  const [loadedId, setLoadedId] = useState<string | null>(null);
  if (loadedId !== null && loadedId !== photo._id) setLoadedId(null);
  const loaded = loadedId === photo._id;

  // Precarga las vecinas cuando la foto actual ya terminó de cargar.
  useEffect(() => {
    if (!loaded) return;
    for (const src of preloadUrls) {
      const img = new window.Image();
      img.src = src;
    }
  }, [loaded, preloadUrls]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ampliada: ${categoryTitle}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/45 p-4 backdrop-blur-sm md:p-8"
      initial={animate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => {
        // Solo el clic directo en el fondo cierra (los controles no burbujean).
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        autoFocus
        aria-label="Cerrar"
        className="absolute right-4 top-4 rounded-full bg-stone-900/40 p-2.5 text-stone-50 backdrop-blur transition hover:bg-stone-900/60 motion-reduce:transition-none"
      >
        <X className="h-5 w-5" aria-hidden />
      </button>

      <button
        type="button"
        onClick={onPrev}
        aria-label="Foto anterior"
        className="absolute left-3 rounded-full bg-stone-900/40 p-2.5 text-stone-50 backdrop-blur transition hover:bg-stone-900/60 motion-reduce:transition-none md:left-6"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Foto siguiente"
        className="absolute right-3 rounded-full bg-stone-900/40 p-2.5 text-stone-50 backdrop-blur transition hover:bg-stone-900/60 motion-reduce:transition-none md:right-6"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>

      <figure className="flex max-h-full flex-col items-center">
        <div className="relative">
          <Image
            src={urlFor(photo.image).width(LIGHTBOX_WIDTH).url()}
            alt={photo.alt}
            width={width}
            height={height}
            sizes="92vw"
            className={`max-h-[78svh] w-auto max-w-[92vw] object-contain shadow-2xl transition-opacity duration-500 md:max-w-[88vw] motion-reduce:transition-none ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            placeholder="empty"
            priority
            onLoad={() => setLoadedId(photo._id)}
          />
          {!loaded && (
            <div
              role="status"
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            >
              <div className="flex items-end gap-2" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-3 w-3 rounded-full bg-stone-100"
                    animate={
                      animate ? { y: [-7, 0, -7], opacity: [0.4, 1, 0.4] } : false
                    }
                    transition={{
                      duration: 1.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.16,
                    }}
                  />
                ))}
              </div>
              <p className="text-xs tracking-wide text-stone-500">
                Cargando foto…
              </p>
            </div>
          )}
        </div>
        <figcaption className="mt-4 flex items-center gap-3 text-sm text-stone-50">
          <span>{categoryTitle}</span>
          <span className="text-stone-500/80" aria-hidden>
            ·
          </span>
          <span className="text-xs text-stone-500/90">
            {index + 1} / {total}
          </span>
        </figcaption>
      </figure>
    </motion.div>
  );
}
