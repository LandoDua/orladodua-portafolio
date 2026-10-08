import { defineConfig } from "sanity";
import { schemaTypes } from "./sanity/schemas";

// Studio local: `npx sanity dev` (puerto 3333) · Despliegue de schema:
// `npx sanity schemas deploy`. projectId/dataset son públicos (NEXT_PUBLIC).
export default defineConfig({
  name: "orlando-site",
  projectId: "8670kl0n",
  dataset: "production",
  schema: {
    types: schemaTypes,
  },
});
