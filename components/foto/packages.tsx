import { Check } from "lucide-react";
import { Reveal } from "./reveal";
import { EMAIL } from "@/lib/site";

/** Precios y copy fijados por Orlando (2026-10-22). */
const PACKAGES = [
  {
    name: "Esencial",
    price: "$800",
    unit: "MXN · sesión",
    featured: false,
    features: [
      "1 hora de sesión",
      "15 fotos editadas",
      "1 locación",
      "Entrega digital en 7 días",
    ],
    recommendation: "Retratos individuales o un perfil profesional.",
  },
  {
    name: "Profesional",
    price: "$2,200",
    unit: "MXN · sesión",
    featured: true,
    features: [
      "3 horas de sesión",
      "40 fotos editadas",
      "2 cambios de vestuario o locación",
      "Entrega digital en 5 días",
      "Uso personal y redes sociales",
    ],
    recommendation:
      "Sesiones de pareja o familia, proyectos editoriales y de marca.",
  },
  {
    name: "Eventos",
    price: "desde $2,800",
    unit: "MXN · cobertura",
    featured: false,
    features: [
      "Hasta 4 horas de cobertura",
      "100+ fotos editadas",
      "Galería privada en línea",
      "Entrega en 10 días",
    ],
    recommendation:
      "Celebraciones sociales: bautizos, cumpleaños y graduaciones.",
  },
];

export function Packages() {
  return (
    <section
      id="paquetes"
      className="scroll-mt-20 border-t border-stone-200 bg-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Servicios
          </p>
          <h2 className="mt-3 font-display text-4xl italic md:text-5xl">
            Paquetes
          </h2>
          <p className="mt-5 leading-relaxed text-stone-600">
            Tres puntos de partida para cotizar. Cada sesión se adapta a lo que
            necesites: escríbeme y armamos algo a tu medida.
          </p>
          <p className="mt-4 leading-relaxed text-stone-600">
            Si nunca te han tomado fotos, tranquilo: te acompaño pose por pose y
            lo hacemos a tu ritmo.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg, index) => (
            <Reveal key={pkg.name} delay={index * 0.08}>
              <article
                className={
                  pkg.featured
                    ? "relative flex h-full flex-col border border-stone-900 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                    : "flex h-full flex-col border border-stone-200 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                }
              >
                {pkg.featured && (
                  <span className="absolute -top-3.5 left-6 bg-stone-900 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white">
                    Recomendado
                  </span>
                )}
                <h3 className="font-display text-2xl italic">{pkg.name}</h3>
                <p className="mt-4 text-3xl font-medium tracking-tight">
                  {pkg.price}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-stone-500">
                  {pkg.unit}
                </p>
                <ul className="mt-7 flex-1 space-y-3 text-sm text-stone-600">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-stone-900"
                        aria-hidden
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-stone-200 pt-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
                    Ideal para
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
                    {pkg.recommendation}
                  </p>
                </div>
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                    `Cotización — Paquete ${pkg.name}`,
                  )}`}
                  className={
                    pkg.featured
                      ? "mt-8 block bg-stone-900 py-3 text-center text-sm text-white transition-colors hover:bg-stone-700"
                      : "mt-8 block border border-stone-900 py-3 text-center text-sm text-stone-900 transition-colors hover:bg-stone-900 hover:text-white"
                  }
                >
                  Solicitar
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-xs text-stone-400">
          Precios de referencia en pesos mexicanos; la cotización final depende
          de la sesión.
        </p>
      </div>
    </section>
  );
}
