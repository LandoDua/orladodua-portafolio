/**
 * Sube las fotos locales de `fotografias/` a Sanity respetando carpetas.
 *
 * Uso:  npm run upload:photos        (carga .env.local automáticamente)
 *
 * - Idempotente: consulta `sourceKey` (ruta relativa) y salta lo ya subido.
 * - Categorías: crea las que falten según el mapeo FOLDERS.
 * - Sube assets con pool de concurrencia y progreso por archivo.
 */
import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";

const ROOT = "fotografias";
const IMAGE_RE = /\.(jpe?g|png|webp|avif)$/i;
const CONCURRENCY = 4;

/** Carpeta local → categoría en Sanity (5 filtros de la galería incluyen "Todo"). */
const FOLDERS = [
  { dir: "retratos/Estudio", title: "Retratos Estudio", slug: "retratos-estudio" },
  { dir: "retratos/Exterior", title: "Retratos Exterior", slug: "retratos-exterior" },
  { dir: "eventos", title: "Eventos", slug: "eventos" },
  { dir: "comida y productos", title: "Comida y Productos", slug: "comida-y-productos" },
];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Falta configuración: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET y SANITY_API_WRITE_TOKEN (en .env.local)",
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2026-02-01", token, useCdn: false });

const stats = { uploaded: 0, skipped: 0, failed: [] };

async function ensureCategory({ title, slug }) {
  const existing = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{_id}`,
    { slug },
  );
  if (existing?._id) return existing._id;
  const created = await client.create({
    _type: "category",
    title,
    slug: { _type: "slug", current: slug },
  });
  console.log(`  + categoría "${title}" creada`);
  return created._id;
}

async function uploadPhoto({ filePath, sourceKey, categoryId, order, categoryTitle }) {
  const base = path.basename(filePath, path.extname(filePath));
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: path.basename(filePath),
  });
  await client.create({
    _type: "photo",
    title: base,
    alt: `${categoryTitle} — ${base}`,
    image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    category: { _type: "reference", _ref: categoryId },
    order,
    sourceKey,
  });
}

async function runPool(tasks, concurrency) {
  let next = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (next < tasks.length) {
      const task = tasks[next++];
      await task();
    }
  });
  await Promise.all(workers);
}

/** Reasigna `order` global (0..N) en docs ya subidos, en transacciones por lote. */
async function syncOrders(plan) {
  const docs = await client.fetch(`*[_type == "photo"]{_id, sourceKey, order}`);
  const byKey = new Map(docs.map((d) => [d.sourceKey, d]));
  const patches = plan
    .map((p) => ({ doc: byKey.get(p.sourceKey), order: p.order }))
    .filter(({ doc, order }) => doc && doc.order !== order);

  for (let i = 0; i < patches.length; i += 40) {
    const tx = client.transaction();
    for (const { doc, order } of patches.slice(i, i + 40)) {
      tx.patch(doc._id, { set: { order } });
    }
    await tx.commit();
  }
  console.log(`→ Orden sincronizado en ${patches.length} documentos.`);
}

async function main() {
  const startedAt = Date.now();
  console.log(`→ Conectando a ${projectId}/${dataset}…`);

  const existingKeys = await client.fetch(`*[_type == "photo"].sourceKey`);
  const done = new Set(existingKeys);

  // Plan global: el orden recorre las carpetas en secuencia (FOLDERS),
  // así la vista "Todo" de la galería tiene un orden estable 0..157.
  const plan = [];
  for (const folder of FOLDERS) {
    const absDir = path.join(ROOT, folder.dir);
    const files = (await readdir(absDir))
      .filter((f) => IMAGE_RE.test(f))
      .sort((a, b) => a.localeCompare(b, "es"));

    const categoryId = await ensureCategory(folder);

    files.forEach((file) => {
      const sourceKey = `${ROOT}/${folder.dir}/${file}`;
      plan.push({
        filePath: path.join(absDir, file),
        sourceKey,
        categoryId,
        categoryTitle: folder.title,
        order: plan.length,
      });
      if (done.has(sourceKey)) stats.skipped++;
    });
  }

  const pending = plan.filter((p) => !done.has(p.sourceKey));
  const total = plan.length;
  const tasks = pending.map((item) => async () => {
    try {
      await uploadPhoto(item);
      stats.uploaded++;
      console.log(`[${stats.uploaded + stats.skipped}/${total}] ${item.sourceKey} → OK`);
    } catch (err) {
      stats.failed.push(item.sourceKey);
      console.error(
        `[${stats.uploaded + stats.skipped + stats.failed.length}/${total}] ${item.sourceKey} → ERROR: ${err.message}`,
      );
    }
  });

  console.log(`→ ${pending.length} por subir, ${stats.skipped} ya existentes. Pool de ${CONCURRENCY}…`);
  await runPool(tasks, CONCURRENCY);

  if (stats.failed.length === 0) {
    await syncOrders(plan);
  }

  const secs = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(
    `\n✔ Listo en ${secs}s — subidas: ${stats.uploaded}, omitidas: ${stats.skipped}, fallidas: ${stats.failed.length}`,
  );
  if (stats.failed.length) {
    console.error("Fallaron:\n - " + stats.failed.join("\n - "));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
