import type { CollectionConfig } from 'payload'
import {
  blockOwnerConfirmOnPublish,
  contentAccess,
  editorNotesField,
  makeRevalidateHooks,
  requiredInEnglish,
  seoField,
  slugField,
} from './shared'

const h = makeRevalidateHooks('/knowledge/guides')

export const Guides: CollectionConfig = {
  slug: 'guides',
  admin: { group: 'Content', useAsTitle: 'title', defaultColumns: ['title', 'kind', 'service', '_status'] },
  versions: { drafts: true },
  access: contentAccess(),
  hooks: { beforeChange: [blockOwnerConfirmOnPublish], afterChange: [h.afterChange], afterDelete: [h.afterDelete] },
  fields: [
    { name: 'title', type: 'text', localized: true, validate: requiredInEnglish('Title') },
    slugField,
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'guide',
      options: [
        { label: 'Guide', value: 'guide' },
        { label: 'Whitepaper', value: 'whitepaper' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'summary', type: 'textarea', localized: true },
    { name: 'content', type: 'richText', localized: true },
    { name: 'file', type: 'upload', relationTo: 'media', filterOptions: { mimeType: { equals: 'application/pdf' } }, admin: { description: 'Optional PDF download' } },
    { name: 'gated', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'Ask for an email before download (not wired to the site yet)' } },
    {
      name: 'service',
      type: 'select',
      options: [
        { label: 'Voice AI', value: 'voice-ai' },
        { label: 'Document intelligence', value: 'idp' },
        { label: 'Enterprise RAG', value: 'rag' },
        { label: 'SaaS development', value: 'saas' },
        { label: 'Automation', value: 'automation' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'publishedDate', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } } },
    seoField,
    editorNotesField,
  ],
}
