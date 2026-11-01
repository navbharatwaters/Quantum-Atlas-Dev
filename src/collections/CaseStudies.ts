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

const h = makeRevalidateHooks('/knowledge/case-studies')

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: { group: 'Content', useAsTitle: 'title', defaultColumns: ['title', 'client', 'approved', 'deploymentStatus', '_status'] },
  versions: { drafts: true },
  // Public sees published AND client-approved only.
  access: contentAccess([{ approved: { equals: true } }]),
  hooks: { beforeChange: [blockOwnerConfirmOnPublish], afterChange: [h.afterChange], afterDelete: [h.afterDelete] },
  fields: [
    { name: 'title', type: 'text', localized: true, validate: requiredInEnglish('Title') },
    slugField,
    { name: 'client', type: 'text', localized: true },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Tick only with written client approval' },
    },
    {
      name: 'deploymentStatus',
      type: 'select',
      defaultValue: 'production',
      options: [
        { label: 'In production', value: 'production' },
        { label: 'Pilot', value: 'pilot' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'service',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Voice AI', value: 'voice-ai' },
        { label: 'Document intelligence', value: 'idp' },
        { label: 'Enterprise RAG', value: 'rag' },
        { label: 'SaaS development', value: 'saas' },
        { label: 'Automation', value: 'automation' },
      ],
    },
    {
      name: 'industry',
      type: 'select',
      options: [
        { label: 'Government', value: 'government' },
        { label: 'Logistics', value: 'logistics' },
        { label: 'Fintech / BFSI', value: 'fintech' },
        { label: 'Legal', value: 'legal' },
        { label: 'Manufacturing', value: 'manufacturing' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Real estate', value: 'real-estate' },
      ],
    },
    { name: 'challenge', type: 'richText', localized: true },
    { name: 'solution', type: 'richText', localized: true },
    {
      name: 'outcomes',
      type: 'array',
      fields: [
        { name: 'metric', type: 'text', localized: true },
        { name: 'before', type: 'text' },
        { name: 'after', type: 'text' },
      ],
    },
    { name: 'techStack', type: 'array', fields: [{ name: 'technology', type: 'text' }] },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    seoField,
    editorNotesField,
  ],
}
