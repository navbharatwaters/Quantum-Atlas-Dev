import { revalidatePath } from 'next/cache'
import { APIError } from 'payload'
import type {
  Access,
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
  Field,
  Where,
} from 'payload'

/** Marker left in drafts for facts the owner still has to confirm. */
export const OWNER_CONFIRM = 'OWNER-CONFIRM'

export const isAuthed: Access = ({ req }) => Boolean(req.user)

/**
 * Authenticated users see everything (drafts included). The public sees published
 * documents only, plus any collection-specific rule (e.g. case studies: approved).
 */
export const publicPublishedRead =
  (extra: Where[] = []): Access =>
  ({ req }) => {
    if (req.user) return true
    return { and: [{ _status: { equals: 'published' } }, ...extra] }
  }

export const contentAccess = (extra: Where[] = []) => ({
  read: publicPublishedRead(extra),
  create: isAuthed,
  update: isAuthed,
  delete: isAuthed,
  readVersions: isAuthed,
})

/** English is the base language; Russian is optional and falls back to English in the admin. */
export const requiredInEnglish =
  (label: string) =>
  (value: unknown, { req }: { req: { locale?: string | null } }) => {
    if (req.locale && req.locale !== 'en') return true
    return value ? true : `${label} is required (English)`
  }

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '')
}

export const slugField: Field = {
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'URL part. Lowercase letters, digits and hyphens. Auto-generated from the English title when empty.',
  },
  hooks: {
    beforeValidate: [
      ({ value, siblingData }) => {
        if (typeof value === 'string' && value.trim()) return value.trim()
        const title = siblingData?.title
        return typeof title === 'string' ? slugify(title) : value
      },
    ],
  },
  validate: (value: unknown) => {
    if (typeof value !== 'string' || !value) return 'Slug is required (fill the English title or type a slug)'
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? true : 'Slug must be lowercase letters, digits and single hyphens'
  },
}

export const seoField: Field = {
  name: 'seo',
  type: 'group',
  fields: [
    { name: 'title', type: 'text', localized: true, admin: { description: 'Search title, up to 60 characters' } },
    { name: 'description', type: 'textarea', localized: true, admin: { description: 'Search description, 130 to 155 characters' } },
  ],
}

export const editorNotesField: Field = {
  name: 'editorNotes',
  type: 'textarea',
  localized: false,
  admin: { description: 'Internal. Never shown on the site and never returned to anonymous API requests.' },
  access: { read: ({ req }) => Boolean(req.user) },
}

/**
 * Blocks publishing while any [OWNER-CONFIRM: ...] marker is still in the content.
 * editorNotes is excluded (that is where the open questions are listed).
 */
export const blockOwnerConfirmOnPublish: CollectionBeforeChangeHook = async ({ data, originalDoc, req, operation, collection }) => {
  if (data?._status !== 'published') return data
  const strip = (d: Record<string, unknown> | undefined) => {
    if (!d) return {}
    const { editorNotes: _n, ...rest } = d
    void _n
    return rest
  }
  let haystack = JSON.stringify({ ...strip(originalDoc), ...strip(data) })
  // The saved document in every locale (the request only carries the locale being edited).
  if (operation === 'update' && originalDoc?.id) {
    try {
      const all = await req.payload.findByID({
        collection: collection.slug as 'blog-posts',
        id: originalDoc.id,
        locale: 'all',
        depth: 0,
        draft: true,
        overrideAccess: true,
        // No req on purpose: the Local API would set req.locale to 'all' on the shared request,
        // and the Russian fields being saved would be dropped.
      })
      haystack += JSON.stringify(strip(all as unknown as Record<string, unknown>))
    } catch {
      // draft lookup failing must not hide the check on the submitted data above
    }
  }
  if (haystack.includes(OWNER_CONFIRM)) {
    throw new APIError('Resolve all [OWNER-CONFIRM] notes before publishing', 400, undefined, true)
  }
  return data
}

/** Paths to refresh for a document in a collection. Never throws. */
function revalidate(paths: string[]) {
  for (const p of paths) {
    try {
      revalidatePath(p)
    } catch {
      // revalidatePath throws outside a Next request (CLI, seed script); the save must not fail
    }
  }
}

function routes(base: string, slug?: string | null): string[] {
  const out = [base, `/ru${base}`]
  if (slug) out.push(`${base}/${slug}`, `/ru${base}/${slug}`)
  return out
}

export function makeRevalidateHooks(base: string): {
  afterChange: CollectionAfterChangeHook
  afterDelete: CollectionAfterDeleteHook
} {
  return {
    afterChange: ({ doc, previousDoc }) => {
      revalidate([...routes(base, doc?.slug), ...routes(base, previousDoc?.slug), '/sitemap.xml'])
      return doc
    },
    afterDelete: ({ doc }) => {
      revalidate([...routes(base, doc?.slug), '/sitemap.xml'])
      return doc
    },
  }
}
