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

const h = makeRevalidateHooks('/blog')

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: { group: 'Content', useAsTitle: 'title', defaultColumns: ['title', 'category', 'publishedDate', '_status'] },
  versions: { drafts: true },
  access: contentAccess(),
  hooks: { beforeChange: [blockOwnerConfirmOnPublish], afterChange: [h.afterChange], afterDelete: [h.afterDelete] },
  fields: [
    { name: 'title', type: 'text', localized: true, validate: requiredInEnglish('Title') },
    slugField,
    { name: 'excerpt', type: 'textarea', localized: true, validate: requiredInEnglish('Excerpt') },
    { name: 'content', type: 'richText', localized: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'ai-implementation',
      options: [
        { label: 'Technical deep dive', value: 'technical-deep-dive' },
        { label: 'AI implementation', value: 'ai-implementation' },
        { label: 'Industry guide', value: 'industry-guide' },
        { label: 'Company', value: 'company' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'author', type: 'relationship', relationTo: 'users', admin: { position: 'sidebar', description: 'Only the name is shown publicly.' } },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'publishedDate', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } } },
    { name: 'readTime', type: 'number', min: 1, admin: { position: 'sidebar', description: 'Minutes' } },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    { name: 'relatedPosts', type: 'relationship', relationTo: 'blog-posts', hasMany: true },
    seoField,
    editorNotesField,
  ],
}
