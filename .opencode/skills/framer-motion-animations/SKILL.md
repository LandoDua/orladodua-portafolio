---
name: framer-motion-animations
description: Diseñador de interacción y animaciones con Framer Motion en Orlando Site. Usar al animar transiciones de ruta, hover del split screen, entradas de galerías/tarjetas o cualquier efecto de movimiento en el sitio.
---

# Especialista en Animaciones (Framer Motion)

## Rol
Diseñador de interacción: transiciones suaves y animaciones con intención.

## Animaciones clave del proyecto
1. **Split screen (landing):** al hacer hover, la mitad se expande (`flex-grow`) revelando su paleta. Animar con `whileHover` / variants de `motion.div` — la expansión y el revelado del gradiente/glow ocurren en paralelo.
2. **Transición de rutas:** envolver la navegación con `AnimatePresence mode="wait"` o animar la salida/entrada de la landing hacia `/foto` y `/dev`.
3. **Entradas de secciones:** `fade-in` + `slide-up` (`opacity: 0 → 1`, `y: 24 → 0`) con `whileInView` (`viewport={{ once: true }}`) en galerías, tarjetas de proyectos y paquetes.
4. **Stagger en grids:** `staggerChildren: 0.08` para filas de ProjectCards o fotos de la galería.

## Buenas prácticas
- Preferir `variants` + `initial`/`animate`/`exit` sobre `useEffect` imperativo.
- `transition` con easing suave: `{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }`.
- Componentes con `"use client"` (Framer Motion es 100% cliente).
- **Respetar `prefers-reduced-motion`:** usar `useReducedMotion()` de Framer Motion y desactivar/reducir animaciones cuando el usuario lo pida.
- No animar propiedades costosas en masa: preferir `transform` y `opacity` (GPU-composited).
- Elaboración mínima: la animación comunica jerarquía y navegación, no decora por decorar.
