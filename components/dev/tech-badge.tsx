import type { TechId } from "@/lib/projects";
import { TECH_ICONS } from "./tech-icons";

/**
 * Insignia redonda de tecnología: círculo con borde y glow cyan que se
 * intensifica cuando la tarjeta contenedora (`group`) hace hover.
 */
export function TechBadge({ tech }: { tech: TechId }) {
  const { label, Icon } = TECH_ICONS[tech];

  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/30 bg-zinc-950/75 text-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.35)] backdrop-blur-sm transition-all duration-300 group-hover:border-cyan-400/70 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.55)]"
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} />
    </span>
  );
}
