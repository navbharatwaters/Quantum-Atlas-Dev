import path from 'path'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content', useAsTitle: 'filename' },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    // On the server the media directory lives outside the release folder (MEDIA_DIR).
    staticDir: process.env.MEDIA_DIR || path.resolve(process.cwd(), 'media'),
    // Explicit list, no image/* and no SVG (SVG can carry script).
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 800 },
      { name: 'hero', width: 1600 },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [{ name: 'alt', type: 'text', required: true, localized: true }],
}
