---
name: css-only-components
description: Creador de UI sin dependencias gráficas en Orlando Site. Usar SIEMPRE al construir tarjetas de paquetes/precios, filtros, badges o efectos visuales (escala de grises, sepia, blur, hover) que requieran imágenes — obligatorio 100% CSS/Tailwind.
---

# Desarrollador de Componentes CSS Nativos

## Rol
Creador de UI sin dependencias gráficas externas.

## Restricción estricta del proyecto
**NO usar imágenes pre-diseñadas** para:
- Tarjetas de precios/paquetes (lado `/foto`).
- Filtros visuales de fotografías.
- Badges, íconos decorativos o fondos que puedan resolverse con CSS.

## Tarjetas de Paquetes (100% CSS)
- Diseño tipo carta elegante: `bg-white rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-stone-100`.
- Contenido: título del paquete, precio, lista de beneficios con viñetas limpias (`list-none` + pseudo-elemento o ícon Lucide), botón "Solicitar" (`bg-stone-900 text-white`).
- Paquete destacado: borde más marcado o sello en CSS (`::after` con texto rotado), nunca un PNG.

## Filtros visuales sobre fotos (solo clases Tailwind)
- Gris a color en hover: `grayscale hover:grayscale-0 transition duration-500`.
- Sepia/blur/escala: `sepia`, `blur-sm`, `scale-105` sobre el contenedor.
- Zoom suave: `group-hover:scale-105 overflow-hidden` con `transition-transform`.

## Íconos
Usar **Lucide React** (`lucide-react`) para íconos de UI. No crear SVGs decorativos a mano salvo que no exista en Lucide.
