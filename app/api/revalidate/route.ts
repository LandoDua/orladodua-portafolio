import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

/**
 * Invalida la caché de la galería (/foto) tras subir fotos a Sanity.
 *
 * Uso (método GET o POST, da igual):
 *   /api/revalidate?secret=TU_SECRET
 *
 * Requiere REVALIDATE_SECRET en el entorno (Vercel y .env.local).
 * El secret nunca viaja en la query de forma pública: compártelo solo
 * con quien administre el sitio (básicamente tú).
 */
export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}

async function handleRevalidate(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected) {
    return Response.json(
      { revalidated: false, message: "REVALIDATE_SECRET no está configurado en el entorno." },
      { status: 500 },
    );
  }

  if (secret !== expected) {
    return Response.json({ revalidated: false, message: "Secret inválido." }, { status: 401 });
  }

  revalidateTag("gallery", "max");
  return Response.json({ revalidated: true, tag: "gallery", now: Date.now() });
}
