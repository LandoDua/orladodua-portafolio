/** Identificador de tecnología — los iconos viven en `components/dev/tech-icons.tsx`. */
export type TechId =
  | "react"
  | "typescript"
  | "javascript"
  | "nextjs"
  | "vite"
  | "tailwind"
  | "framer"
  | "fastapi"
  | "tonejs"
  | "zustand"
  | "recharts"
  | "sanity"
  | "vercel"
  | "pwa";

export interface Project {
  slug: string;
  title: string;
  description: string;
  repoUrl: string;
  liveUrl: string;
  image: { src: string; alt: string };
  /** 5–6 insignias destacadas; el stack completo se describe en el texto. */
  techs: TechId[];
  /**
   * Estilo de la tarjeta. `"photo"` aplica la estética del lado `/foto`
   * (fondo claro, tipografía serif, insignias B/N) — solo el portafolio.
   */
  theme?: "photo";
}

/**
 * Datos reales de los proyectos (repos y demos verificados en github.com/LandoDua).
 * Editar aquí = editar la sección de proyectos de `/dev`.
 */
export const PROJECTS: Project[] = [
  {
    slug: "tone-breath",
    title: "Tone Breath",
    description:
      "Respiración guiada y mindfulness con audio procedural. Tres rutinas (4-7-8, coherente y cuadrada) con metrónomo en tiempo real, registro emocional antes y después de cada sesión y backend FastAPI desplegado como función serverless.",
    repoUrl: "https://github.com/LandoDua/tone-breath",
    liveUrl: "https://tone-breath.vercel.app",
    image: {
      src: "/projects/tone-breath.jpg",
      alt: "Pantalla de inicio de Tone Breath con las tres rutinas de respiración",
    },
    techs: ["react", "typescript", "tailwind", "tonejs", "fastapi", "vercel"],
  },
  {
    slug: "skullking-scorer",
    title: "Skull King Scorer",
    description:
      "Marcador PWA offline para partidas presenciales de Skull King: apuestas, registro de bazas, sistemas de penalización, insignias automáticas y tabla de líderes para 2 a 8 jugadores. Instalable en Android e iOS.",
    repoUrl: "https://github.com/LandoDua/skullking-scorer",
    liveUrl: "https://landodua.github.io/skullking-scorer/",
    image: {
      src: "/projects/skullking-scorer.jpg",
      alt: "Pantalla de configuración de partida de Skull King Scorer",
    },
    techs: ["react", "typescript", "tailwind", "zustand", "recharts", "pwa"],
  },
  {
    slug: "flora-26",
    title: "Flora 26",
    description:
      "Carta web animada para el Día de las Flores Amarillas: un ramo virtual sobre tablero de corcho, animaciones suaves con Framer Motion y mensaje final. PWA instalable con caché offline.",
    repoUrl: "https://github.com/LandoDua/flor-amarilla-2026",
    liveUrl: "https://landodua.github.io/flor-amarilla-2026/",
    image: {
      src: "/projects/flora-26.jpg",
      alt: "Carta animada de flores amarillas con el mensaje «TE AMO»",
    },
    techs: ["react", "javascript", "vite", "framer", "pwa"],
  },
  {
    slug: "portafolio-fotografico",
    title: "Portafolio Fotográfico",
    description:
      "Este mismo sitio: portafolio dual de fotografía y desarrollo. Galería masonry con filtros desde Sanity, lightbox, paquetes de servicios y una landing split-screen. Desplegado en Vercel.",
    repoUrl: "https://github.com/LandoDua/orladodua-portafolio",
    liveUrl: "https://orladodua-portafolio.vercel.app",
    image: {
      src: "/projects/portafolio-foto.jpg",
      alt: "Hero del portafolio fotográfico con retrato de Orlando Duarte",
    },
    techs: ["nextjs", "typescript", "tailwind", "sanity", "framer", "vercel"],
    theme: "photo",
  },
];
