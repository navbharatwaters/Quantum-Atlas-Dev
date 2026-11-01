import { APIError } from 'payload'
import type { Access, CollectionConfig } from 'payload'

const isAdmin = (user: unknown): boolean => (user as { role?: string } | null)?.role === 'admin'

/** First-user sign-up (no users yet) or an admin. */
const canCreate: Access = async ({ req }) => {
  if (isAdmin(req.user)) return true
  if (req.user) return false
  const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true, req })
  return totalDocs === 0
}

const ownOrAdmin: Access = ({ req }) => {
  if (!req.user) return false
  if (isAdmin(req.user)) return true
  return { id: { equals: req.user.id } }
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email', group: 'Admin', defaultColumns: ['email', 'name', 'role'] },
  auth: {
    tokenExpiration: 7200,
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    cookies: { secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' },
    verify: false,
  },
  access: {
    create: canCreate,
    read: ownOrAdmin,
    update: ownOrAdmin,
    delete: ({ req }) => isAdmin(req.user),
    admin: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeValidate: [
      ({ operation, req }) => {
        // First-user sign-up is only possible while the owner has opened the setup window on the server
        // (CMS_ALLOW_FIRST_USER=true). It covers /api/users/first-register as well, which bypasses `access.create`.
        if (operation === 'create' && !req.user && process.env.CMS_ALLOW_FIRST_USER !== 'true') {
          throw new APIError('Admin sign-up is closed. Ask the site owner to open the setup window.', 403, undefined, true)
        }
      },
    ],
    beforeChange: [
      ({ data, operation, req }) => {
        // The only anonymous create allowed is the very first user: make them admin.
        if (operation === 'create' && !req.user) data.role = 'admin'
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      saveToJWT: true,
      access: {
        // Anonymous create is only reachable for the first user (see canCreate); the hook sets admin.
        create: () => true,
        update: ({ req }) => isAdmin(req.user),
      },
    },
  ],
}
