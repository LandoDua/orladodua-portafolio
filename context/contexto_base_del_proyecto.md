# Contexto del Proyecto: Orlando Site (Portafolio Dual)

## Visión General
"Orlando Site" es un portafolio web híbrido diseñado para mostrar dos facetas profesionales bajo un mismo dominio: Desarrollador Full-Stack y Fotógrafo. La experiencia de usuario comienza con una pantalla dividida (*Split Screen*) que actúa como bifurcación hacia dos mini-sitios con identidades visuales completamente opuestas.

## Stack Tecnológico Principal
*   **Framework:** Next.js (App Router).
*   **Estilos:** Tailwind CSS.
*   **Animaciones:** Framer Motion.
*   **Iconos:** Lucide React.
*   **CMS / Backend de Imágenes:** Sanity.io (integrado vía servidor MCP).
*   **Herramientas de Desarrollo Asistido:** Context7 y Google Stitch (vía servidores MCP).

## Arquitectura de Rutas y Diseño Visual

### 1. Raíz (`app/page.tsx`)
*   **Interfaz:** Pantalla dividida.
*   **Interacción:** Al hacer *hover* sobre la mitad izquierda ("Developer" + ícono PC) o derecha ("Fotógrafo" + ícono Cámara), la sección se expande ligeramente revelando un adelanto de su paleta de colores.

### 2. Lado Developer (`app/(dev)/dev/page.tsx`)
*   **Estética:** *Tech / Hacker*. Paleta oscura (fondos negros), acentos en rojo y cyan, elementos interactivos con efectos de resplandor (*glow*).
*   **Secciones:** Presentación, GitHub, Proyectos (Tone Breadth, SK scorev, Flora 26 y este mismo portafolio fotográfico) y Contacto.
*   **Componentes:** Uso de plantillas reutilizables (`<ProjectCard />`) con tags de tecnologías brillantes.

### 3. Lado Fotógrafo (`app/(foto)/foto/page.tsx`)
*   **Estética:** *Elegante / Minimalista*. Paleta clara (blancos/cremas), mucho espacio en blanco, tipografía refinada.
*   **Secciones:** Quién Soy, Galería (Retratos, Eventos, Comida), Paquetes, Contacto, Redes Sociales.
*   **Restricción Técnica:** Las tarjetas de "Paquetes" y los filtros aplicados a las fotografías deben ser construidos 100% con código y clases CSS (Tailwind), sin imágenes pre-editadas.
*   **Gestión de Datos:** Todas las imágenes y categorías se consumen dinámicamente desde Sanity.io para facilitar la actualización sin tocar el código.

## Reglas de Operación para Agentes
1.  **Aislamiento de Estilos:** Nunca mezclar las clases de utilidad oscuras/neón en los componentes de la ruta de fotografía, y viceversa.
2.  **Rendimiento:** Todo recurso fotográfico debe pasar obligatoriamente por el componente `<Image />` de Next.js.
3.  **Colaboración MCP:** Antes de generar código UI complejo, consultar el contexto en Context7 y considerar delegar la estructura base a Google Stitch si es necesario.