import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

// Studio local: `npx sanity dev` (puerto 3333) · Despliegue de schema:
// `npm run sanity:schema:deploy` · Studio hosteado: `npm run sanity:studio:deploy`.
// projectId/dataset son públicos (NEXT_PUBLIC).
// structureTool = visor de documentos (Foto/Categoría) en la barra lateral.
export default defineConfig({
  name: "orlando-site",
  projectId: "8670kl0n",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
