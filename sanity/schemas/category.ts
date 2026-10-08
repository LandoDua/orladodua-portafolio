import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons/Tag";

export const category = defineType({
  name: "category",
  title: "Categoría",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Título (A→Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
