import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons/Image";

export const photo = defineType({
  name: "photo",
  title: "Foto",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Texto alternativo",
      type: "string",
      description: "Descripción para accesibilidad y SEO.",
      validation: (rule) =>
        rule.required().error("El alt es obligatorio (accesibilidad)"),
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      description: "Posición en la galería (menor = primero).",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "sourceKey",
      title: "Clave de origen",
      type: "string",
      description:
        "Ruta relativa del archivo local. La usa el script de subida para no duplicar fotos.",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Orden (asc)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
