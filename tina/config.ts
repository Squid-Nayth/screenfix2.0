import { defineConfig } from 'tinacms';

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

const slugifyValue = (value: string) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    publicFolder: 'public',
    outputFolder: 'admin'
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public'
    }
  },
  schema: {
    collections: [
      {
        name: 'repairServices',
        label: 'Services de reparation',
        path: 'content/repair-services',
        format: 'json',
        ui: {
          filename: {
            slugify: (values) => slugifyValue(String(values?.key || values?.label || 'service'))
          }
        },
        fields: [
          { type: 'string', name: 'key', label: 'Cle service', required: true },
          { type: 'string', name: 'label', label: 'Nom service', required: true },
          {
            type: 'string',
            name: 'description',
            label: 'Description courte',
            required: true,
            ui: { component: 'textarea' }
          },
          { type: 'number', name: 'order', label: 'Ordre d affichage' },
          { type: 'boolean', name: 'recommended', label: 'Service recommande' },
          { type: 'boolean', name: 'active', label: 'Actif' }
        ]
      },
      {
        name: 'iphoneModels',
        label: 'Modeles iPhone',
        path: 'content/iphone-models',
        format: 'json',
        ui: {
          filename: {
            slugify: (values) => slugifyValue(String(values?.name || 'iphone-modele'))
          }
        },
        fields: [
          { type: 'string', name: 'brand', label: 'Marque', required: true },
          { type: 'string', name: 'name', label: 'Nom modele', required: true },
          { type: 'image', name: 'image', label: 'Image du modele', required: true },
          { type: 'number', name: 'order', label: 'Ordre d affichage' },
          { type: 'boolean', name: 'active', label: 'Actif' },
          {
            type: 'object',
            name: 'repairs',
            label: 'Tarifs par reparation',
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.serviceKey ? `${item.serviceKey} - ${item.price ?? ''}EUR` : 'Tarif'
              })
            },
            fields: [
              { type: 'string', name: 'serviceKey', label: 'Cle service', required: true },
              { type: 'number', name: 'price', label: 'Prix EUR', required: true }
            ]
          }
        ]
      },
      {
        name: 'articles',
        label: 'Articles',
        path: 'content/articles',
        format: 'json',
        ui: {
          filename: {
            slugify: (values) => slugifyValue(String(values?.slug || values?.title || 'article'))
          }
        },
        fields: [
          { type: 'string', name: 'slug', label: 'Slug', required: true },
          { type: 'string', name: 'title', label: 'Titre', required: true },
          { type: 'string', name: 'excerpt', label: 'Extrait', required: true, ui: { component: 'textarea' } },
          { type: 'string', name: 'category', label: 'Categorie', required: true },
          { type: 'string', name: 'author', label: 'Auteur', required: true },
          { type: 'datetime', name: 'publishedAt', label: 'Date de publication', required: true },
          { type: 'string', name: 'readingTime', label: 'Temps de lecture', required: true },
          { type: 'boolean', name: 'featured', label: 'Mettre en avant' },
          { type: 'image', name: 'coverImage', label: 'Image de couverture', required: true },
          { type: 'string', name: 'coverAlt', label: 'Texte alternatif', required: true },
          {
            type: 'object',
            name: 'sections',
            label: 'Sections',
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.title || 'Section'
              })
            },
            fields: [
              { type: 'string', name: 'title', label: 'Titre de section', required: true },
              {
                type: 'string',
                name: 'paragraphs',
                label: 'Paragraphes',
                list: true,
                required: true,
                ui: {
                  component: 'textarea'
                }
              },
              { type: 'image', name: 'image', label: 'Image optionnelle' },
              { type: 'string', name: 'imageAlt', label: 'Alt image' }
            ]
          },
          {
            type: 'string',
            name: 'relatedSlugs',
            label: 'Slugs lies',
            list: true
          }
        ]
      }
    ]
  }
});
