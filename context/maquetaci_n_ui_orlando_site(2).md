# Prompt de Maquetación UI: "Orlando Site" (Portafolio Dual)

## 📌 Resumen del Proyecto
El objetivo es maquetar un sitio web personal ("Orlando Site") que sirve como un portafolio dual. El sitio tiene una página principal que actúa como un enrutador visual (Split Screen) hacia dos mini-sitios completamente distintos en estética y estructura: un portafolio de Desarrollador Full-Stack y un portafolio de Fotógrafo.

**Tecnologías UI objetivo:** HTML, React/Next.js y Tailwind CSS.

---

## 🖥️ Página 1: Landing Page (Raíz `/`)
Esta página actúa como la puerta de entrada. Debe ocupar el 100% del alto de la pantalla (`h-screen`).

*   **Estructura:** Un diseño de "Split Screen" (pantalla dividida verticalmente 50/50). En móviles, debe ser apilado horizontalmente (50/50 vertical).
*   **Lado Izquierdo (Developer):**
    *   Fondo oscuro base.
    *   Elemento central: Texto grande "Developer" acompañado de un ícono minimalista de una computadora (ej. Lucide Icons).
    *   Interacción (Hover): Al pasar el mouse, la sección debe expandirse ligeramente (flex-grow) y revelar un sutil resplandor o gradiente en tonos rojo y cyan oscuro.
*   **Lado Derecho (Fotógrafo):**
    *   Fondo claro base.
    *   Elemento central: Texto elegante "Fotógrafo" acompañado de un ícono minimalista de una cámara fotográfica.
    *   Interacción (Hover): Al pasar el mouse, la sección se expande ligeramente y revela un fondo con tonos blancos/cremas muy limpios.

---

## 💻 Página 2: Portafolio Developer (`/dev`)
Este mini-sitio debe transmitir un ambiente tecnológico, moderno y ligeramente "hacker".

*   **Estética y Paleta:**
    *   Fondo: Oscuro (`bg-zinc-950` o negro sólido).
    *   Textos: Blancos y grises claros.
    *   Acentos: Cyan y Rojo puro.
    *   Efectos: Uso intensivo de sombras brillantes (`drop-shadow` o `box-shadow` con opacidad) para simular luces neón, bordes con gradientes.
*   **Secciones a Maquetar:**
    1.  **Hero / Presentación:** Título llamativo, subtítulo ("Desarrollador Full-Stack") y botones de "Ver Proyectos" y "Contactar" (con efectos *glow* al hacer hover).
    2.  **Proyectos (Grid Layout):** Una cuadrícula (Grid) para mostrar tarjetas de proyectos. Los proyectos a pre-poblar son: *Tone Breadth, SK scorev, Flora 26, y Portafolio Fotográfico*.
    3.  **Actividad GitHub:** Una sección minimalista con enlaces al perfil de GitHub, estilizada como una terminal o con una estética de código.
    4.  **Contacto:** Un formulario oscuro con inputs que brillen (cyan o rojo) al estar en estado `:focus`. Redes sociales en el footer.

*   **Componente Específico - Project Card:**
    *   Contenedor con bordes oscuros que se iluminan (cyan/rojo) en hover.
    *   Imagen de portada del proyecto en la parte superior.
    *   Cuerpo: Título, descripción corta.
    *   Etiquetas (Tags): Tecnologías usadas (pequeños badges con bordes brillantes).
    *   Botones: "GitHub" y "Live Demo" en la parte inferior.

---

## 📸 Página 3: Portafolio Fotográfico (`/foto`)
Este mini-sitio debe ser la antítesis del lado Dev: orgánico, limpio, elegante y enfocado en darle protagonismo absoluto a las imágenes.

*   **Estética y Paleta:**
    *   Fondo: Muy claro (`bg-white` o `bg-stone-50`).
    *   Textos: Gris muy oscuro casi negro (`text-stone-900`).
    *   Tipografía: Combinación de Serif elegante para títulos y Sans-serif limpia para párrafos.
    *   Diseño: Minimalista, amplios espacios en blanco (paddings/margins grandes), líneas divisorias muy finas.
*   **Secciones a Maquetar:**
    1.  **Hero / Quién Soy:** Una gran imagen de cabecera (o a un lado) con un texto introductorio elegante, destacando la visión artística.
    2.  **Galería (Masonry Grid o Grid Asimétrico):** Contenedor principal del sitio. Debe tener un menú de filtros en texto simple (Todo | Retratos | Eventos | Comida). Las imágenes deben tener un sutil efecto de zoom o cambio de filtro CSS (ej. de escala de grises a color) en hover.
    3.  **Paquetes de Servicios:** Una sección de precios con 3 niveles (Paquete 1, Paquete 2, Paquete 3).
    4.  **Contacto y Redes:** Formulario de contacto con estética de revista (inputs sin bordes laterales, solo borde inferior), e íconos de redes (Instagram, Behance) minimalistas.

*   **Componente Específico - Tarjetas de Paquetes (Puro Código):**
    *   *Nota para la IA:* NO usar imágenes aquí. Toda la tarjeta debe ser CSS.
    *   Diseño tipo carta/tarjeta elegante, fondo blanco con sombra levísima.
    *   Título del paquete, precio, lista de beneficios (viñetas limpias) y un botón de "Solicitar" con diseño sólido pero sutil (ej. fondo negro, texto blanco).