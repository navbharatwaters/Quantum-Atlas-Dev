import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { BlogPosts } from './collections/BlogPosts'
import { CaseStudies } from './collections/CaseStudies'
import { Guides } from './collections/Guides'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProd = process.env.NODE_ENV === 'production'
const isBuild = process.env.NEXT_PHASE === 'phase-production-build'

// No fallback secret: a missing secret must never silently sign sessions with a known value.
function getSecret(): string {
  if (process.env.PAYLOAD_SECRET) return process.env.PAYLOAD_SECRET
  if (isBuild) return 'build-time-placeholder-not-used-at-runtime'
  if (isProd) throw new Error('PAYLOAD_SECRET is required in production')
  throw new Error('PAYLOAD_SECRET is required (set it in .env.local)')
}

const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://quantumatlas.dev'

export default buildConfig({
  serverURL: siteURL,
  csrf: [siteURL],
  cors: [siteURL],
  secret: getSecret(),
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' - Quantum Atlas CMS' },
  },
  routes: { admin: '/admin', api: '/api' },
  // GraphQL is not used by the site: it is left unrouted (no src/app/(payload)/api/graphql).
  graphQL: { disable: true },
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Русский', code: 'ru' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: [Users, Media, BlogPosts, CaseStudies, Guides],
  // Default features plus tables (the guides and posts contain comparison tables).
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, EXPERIMENTAL_TableFeature()],
  }),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
    // Never auto-push schema, in any environment: schema changes ship as migrations.
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  sharp,
})
