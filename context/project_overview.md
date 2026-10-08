# Project Overview: Orlando Site 

## 1. Vista General del Proyecto
El proyecto "Orlando Site" es un portafolio web híbrido alojado bajo un mismo dominio que se divide en dos "mini-sitios"[cite: 1]. Su propósito principal es servir como una plataforma unificada para presentar de forma profesional dos facetas distintas: la de desarrollador Full-Stack y la de fotógrafo[cite: 1]. La página principal funcionará como una interfaz de bienvenida de pantalla dividida (Split Screen) que permitirá al usuario elegir y ser redirigido a qué perfil desea explorar[cite: 1].

## 2. Objetivos Principales
* **Exhibir el Lado Desarrollador:** Presentar el perfil como desarrollador, incluyendo enlaces a GitHub y una galería de proyectos construidos (como Tone Breadth, SK scorev y Flora 26) utilizando una plantilla genérica[cite: 1].
* **Mostrar el Trabajo Fotográfico:** Exhibir una galería fotográfica y presentar 3 paquetes de servicios que se ofrecen[cite: 1]. La galería estará dividida en categorías como Retratos, Eventos y Comida[cite: 1].
* **Identidad Visual Dual:** Mantener estéticas separadas y personalizadas para cada perfil; el lado de desarrollo usará una paleta oscura con acentos cyan/rojo y efectos de resplandor (glow), mientras que el lado fotográfico utilizará una paleta clara, minimalista y elegante[cite: 1].
* **Optimización y Costo Cero:** Mantener los gastos de infraestructura y alojamiento estrictamente en $0 aprovechando las capas gratuitas de los servicios modernos de desarrollo[cite: 1].

## 3. Stack Tecnológico y Arquitectura
* **Framework Core:** Next.js utilizando el App Router para manejar grupos de rutas (`(dev)` y `(foto)`) sin afectar la estructura de la URL[cite: 1].
* **Estilos y UI:** Tailwind CSS para la maquetación de ambos temas visuales, y Lucide React para los íconos limpios y modernos[cite: 1].
* **Animaciones:** Framer Motion para lograr las transiciones de la pantalla dividida y los efectos de brillo[cite: 1].
* **Gestión de Contenido (CMS):** Sanity.io (Headless CMS) para administrar la galería fotográfica, aprovechando su plan gratuito para desarrolladores que incluye 10 GB de almacenamiento[cite: 1].

## 4. Despliegue y Hosting
* **Plataforma de Despliegue:** Vercel[cite: 1].
* **Objetivo del Despliegue:** Utilizar Vercel, la plataforma nativa de Next.js, para garantizar una integración perfecta, optimización automática de imágenes mediante el componente `<Image/>` y aprovechar su plan gratuito (Hobby) para proyectos personales[cite: 1].