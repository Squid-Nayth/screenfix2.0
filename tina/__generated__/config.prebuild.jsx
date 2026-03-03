// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    publicFolder: "public",
    outputFolder: "admin"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "articles",
        label: "Articles",
        path: "content/articles",
        format: "json",
        ui: {
          filename: {
            slugify: (values) => String(values?.slug || values?.title || "article").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
          }
        },
        fields: [
          { type: "string", name: "slug", label: "Slug", required: true },
          { type: "string", name: "title", label: "Titre", required: true },
          { type: "string", name: "excerpt", label: "Extrait", required: true, ui: { component: "textarea" } },
          { type: "string", name: "category", label: "Categorie", required: true },
          { type: "string", name: "author", label: "Auteur", required: true },
          { type: "datetime", name: "publishedAt", label: "Date de publication", required: true },
          { type: "string", name: "readingTime", label: "Temps de lecture", required: true },
          { type: "boolean", name: "featured", label: "Mettre en avant" },
          { type: "image", name: "coverImage", label: "Image de couverture", required: true },
          { type: "string", name: "coverAlt", label: "Texte alternatif", required: true },
          {
            type: "object",
            name: "sections",
            label: "Sections",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.title || "Section"
              })
            },
            fields: [
              { type: "string", name: "title", label: "Titre de section", required: true },
              {
                type: "string",
                name: "paragraphs",
                label: "Paragraphes",
                list: true,
                required: true,
                ui: {
                  component: "textarea"
                }
              },
              { type: "image", name: "image", label: "Image optionnelle" },
              { type: "string", name: "imageAlt", label: "Alt image" }
            ]
          },
          {
            type: "string",
            name: "relatedSlugs",
            label: "Slugs lies",
            list: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
