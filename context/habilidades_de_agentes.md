# Skills Requeridas para Agentes de Opencode

Este documento define los perfiles y habilidades específicas que los agentes de IA deben asumir para el desarrollo del proyecto "Orlando Site" (Portafolio Dual: Dev/Foto).

## 1. Especialista en Next.js (App Router)
*   **Rol:** Arquitecto de rutas y estructura de la aplicación.
*   **Skill:** Debe dominar el uso de *Route Groups* `(dev)` y `(foto)` para aislar layouts. Experiencia en el manejo del `app/page.tsx` como enrutador principal y conocimiento profundo de Server Components vs Client Components.

## 2. Especialista en Next.js (Optimización de Imágenes)
*   **Rol:** Gestor de rendimiento visual.
*   **Skill:** Instruido para utilizar estrictamente el componente `<Image />` de Next.js. Debe saber configurar los dominios de Sanity en `next.config.js` y aplicar *lazy loading* y optimización de formatos (WebP/AVIF) automáticamente.

## 3. Experto en Tailwind CSS y Diseño UI/UX
*   **Rol:** Maquetador principal.
*   **Skill:** Capacidad para crear layouts complejos como pantallas divididas (*Split Screen*) responsivas. Debe dominar Flexbox y CSS Grid usando clases de Tailwind.

## 4. Especialista en Temas de Tailwind CSS (Dark/Light Mode)
*   **Rol:** Gestor de identidad visual.
*   **Skill:** Debe saber aislar estilos. Para la ruta `(dev)`, aplicará paletas oscuras (negros/grises), acentos cyan/rojo y efectos de resplandor (`drop-shadow`, `box-shadow` personalizados para *glow effect*). Para la ruta `(foto)`, aplicará paletas claras, tipografías elegantes y espacios minimalistas.

## 5. Desarrollador de Componentes CSS Nativos
*   **Rol:** Creador de UI sin dependencias gráficas.
*   **Skill:** Estrictamente instruido para construir tarjetas de precios (paquetes) y aplicar filtros visuales a las imágenes (escala de grises, sepia, desenfoques) utilizando **únicamente código CSS/Tailwind**, sin depender de imágenes pre-diseñadas.

## 6. Especialista en Animaciones (Framer Motion)
*   **Rol:** Diseñador de interacción.
*   **Skill:** Encargado de implementar transiciones suaves entre las rutas, animaciones de expansión al hacer *hover* en el *Split Screen* principal, y animaciones de entrada (*fade-in*, *slide-up*) para las galerías y tarjetas.

## 7. Ingeniero de Datos CMS y Orquestador MCP
*   **Rol:** Integrador de backend y herramientas externas.
*   **Skill:** 
    *   **Sanity.io:** Capacitado para usar el servidor MCP de Sanity y crear/consultar *Schemas* para "Categorías" y "Fotografías".
    *   **Google Stitch:** Habilidad para delegar prompts de maquetación rápida de UI a través del servidor MCP.
    *   **Context7:** Capacidad para leer y mantener la coherencia del estado del código a lo largo de todo el ciclo de desarrollo usando el servidor MCP de Context7.