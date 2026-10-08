import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Faltan NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET en .env.local",
  );
}

/** Cliente de solo lectura para el front (contenido público del portafolio). */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-01",
  useCdn: true,
});
