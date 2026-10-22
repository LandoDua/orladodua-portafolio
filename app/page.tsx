"use client";

import { useRouter } from "next/navigation";
import SplitScreen from "@/components/split-screen";

export default function Home() {
  const router = useRouter();
  // bfcacheId cambia en cada push/replace: fuerza un remount limpio del
  // split al volver desde /foto o /dev (cacheComponents + <Activity>
  // preservaría el estado `navigating` y dejaría un panel a pantalla completa).
  return <SplitScreen resetKey={router.bfcacheId} />;
}
