import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { EMAIL, INSTAGRAM_URL } from "@/lib/site";
import { InstagramIcon } from "@/components/foto/instagram-icon";

export const metadata: Metadata = {
  title: "Fotografía — Orlando Duarte",
  description:
    "Portafolio fotográfico de Orlando Duarte: retratos de estudio y exterior, eventos, comida y productos. Ver galería, paquetes y contacto.",
};

/** Año cacheado: `new Date()` en render es inestable para el prerender de Next. */
async function getYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function FotoLayout({
  children,
}: LayoutProps<"/foto">) {
  const year = await getYear();

  return (
    <div className="flex min-h-dvh flex-col bg-stone-50 text-stone-900">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/"
            className="font-display text-lg italic transition-colors hover:text-stone-600 sm:text-xl"
          >
            Orlando Duarte
          </Link>
          <nav
            aria-label="Secciones"
            className="flex items-center gap-4 text-sm text-stone-600 sm:gap-6"
          >
            <a
              href="#galeria"
              className="transition-colors hover:text-stone-900"
            >
              Galería
            </a>
            <a
              href="#paquetes"
              className="transition-colors hover:text-stone-900"
            >
              Paquetes
            </a>
            <a
              href="#contacto"
              className="transition-colors hover:text-stone-900"
            >
              Contacto
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-stone-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-stone-500 sm:flex-row">
          <p>© {year} Orlando Duarte</p>
          <div className="flex items-center gap-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-stone-900"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 transition-colors hover:text-stone-900"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {EMAIL}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
