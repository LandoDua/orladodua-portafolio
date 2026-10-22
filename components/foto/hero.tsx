import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import { urlFor } from "@/lib/sanity.image";
import type { GalleryPhoto } from "@/lib/gallery";

interface HeroProps {
  photo: GalleryPhoto | null;
}

export function Hero({ photo }: HeroProps) {
  const lqip = photo?.image.asset.metadata.lqip ?? null;

  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* Entrada con CSS puro (.panel-in): visible aunque no llegue el JS */}
        <div className="panel-in">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Fotógrafo
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] italic md:text-6xl">
            Fotografía con intención,
            <br />
            hecha para recordarse.
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-stone-600">
            Retratos, eventos y comida. Trabajo con luz natural y composición
            limpia para que cada imagen se sienta tan real como el momento que
            la vivió.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-stone-500">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden />
            Sesiones con cita en Canatlán y Durango.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#galeria"
              className="bg-stone-900 px-7 py-3 text-sm text-white transition-colors hover:bg-stone-700"
            >
              Ver galería
            </a>
            <a
              href="#contacto"
              className="flex items-center gap-2 border-b border-stone-900 pb-1 text-sm text-stone-700 transition-colors hover:border-stone-500 hover:text-stone-500"
            >
              Contactar
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        <div className="panel-in panel-in-delay relative aspect-[3/4] overflow-hidden bg-stone-100">
          {photo && (
            <Image
              src={urlFor(photo.image).width(1200).url()}
              alt={photo.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              placeholder={lqip ? "blur" : "empty"}
              blurDataURL={lqip ?? undefined}
            />
          )}
        </div>
      </div>

      <div className="panel-in panel-in-delay mt-16 flex justify-center text-stone-400">
        <a
          href="#galeria"
          aria-label="Ir a la galería"
          className="transition-colors hover:text-stone-700"
        >
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
