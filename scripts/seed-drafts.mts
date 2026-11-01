/**
 * Import the Markdown drafts in docs/content as DRAFT documents (English).
 *
 *   pnpm seed        (needs DATABASE_URI and PAYLOAD_SECRET in the environment)
 *
 * - blog:        docs/content/blog/*.md
 * - case studies: docs/content/case-studies/*.md      (approved = false)
 * - guides:      docs/content/knowledge/guides-*.md   (kind guide)
 *                docs/content/knowledge/whitepaper-*.md (kind whitepaper)
 * Idempotent: a slug that already exists is skipped. Nothing is published.
 * `payload run` cannot load the config (lexical uses top-level await), so this is a plain
 * tsx script; src/package.json marks src/ as ESM.
 */
import fs from 'node:fs'
import path from 'node:path'
import { parse as parseYaml } from 'yaml'

const root = path.resolve(process.cwd(), 'docs', 'content')

type Front = Record<string, unknown>

function readMd(file: string): { fm: Front; body: string } {
  const raw = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n')
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m) throw new Error(`No frontmatter in ${file}`)
  return { fm: (parseYaml(m[1]) ?? {}) as Front, body: m[2] }
}

const str = (v: unknown): string | undefined => (typeof v === 'string' && v.trim() ? v.trim() : undefined)
const files = (dir: string, re: RegExp) =>
  fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => re.test(f)).sort().map((f) => path.join(dir, f)) : []

/** Drop the leading "# Title" (the title is a field). */
const stripH1 = (body: string) => body.replace(/^\s*# .*\n/, '').trim()

function editorNotes(fm: Front): string | undefined {
  const lines: string[] = []
  const oc = Array.isArray(fm.owner_confirm) ? fm.owner_confirm : []
  if (oc.length) lines.push('Open owner confirmations:', ...oc.map((x) => `- ${String(x)}`))
  const reviewer = str(fm.technicalReviewer)
  if (reviewer) lines.push('', `Technical reviewer: ${reviewer}`)
  const src = Array.isArray(fm.sources) ? fm.sources : []
  if (src.length) {
    lines.push('', 'Sources:')
    for (const s of src) {
      if (typeof s === 'string') lines.push(`- ${s}`)
      else if (s && typeof s === 'object') lines.push(`- ${str((s as Front).title) ?? ''} ${str((s as Front).url) ?? ''}`.trim())
    }
  }
  return lines.length ? lines.join('\n') : undefined
}

const seo = (fm: Front) => ({ title: str(fm.metaTitle), description: str(fm.metaDescription) })

async function main() {
  // Dynamic imports: the config graph uses top-level await and must load as ESM.
  const { getPayload } = await import('payload')
  const { convertMarkdownToLexical, editorConfigFactory } = await import('@payloadcms/richtext-lexical')
  const config = (await import('../src/payload.config')).default
  const payload = await getPayload({ config })
  const editorConfig = await editorConfigFactory.default({ config: payload.config })
  const toLexical = (markdown: string) => convertMarkdownToLexical({ editorConfig, markdown }) as never

  const counts: Record<string, { created: number; skipped: number }> = {}
  async function upsert(collection: 'blog-posts' | 'case-studies' | 'guides', slug: string, data: Record<string, unknown>) {
    counts[collection] ??= { created: 0, skipped: 0 }
    const existing = await payload.find({ collection, where: { slug: { equals: slug } }, draft: true, limit: 1, depth: 0, overrideAccess: true })
    if (existing.docs.length) {
      counts[collection].skipped++
      console.log(`skip    ${collection}/${slug}`)
      return
    }
    await payload.create({ collection, locale: 'en', draft: true, overrideAccess: true, data: { ...data, slug, _status: 'draft' } as never })
    counts[collection].created++
    console.log(`created ${collection}/${slug}`)
  }

  // Blog posts
  const categories = new Set(['technical-deep-dive', 'ai-implementation', 'industry-guide', 'company'])
  for (const f of files(path.join(root, 'blog'), /\.md$/)) {
    const { fm, body } = readMd(f)
    const slug = str(fm.slug) ?? path.basename(f, '.md')
    const category = categories.has(String(fm.category)) ? String(fm.category) : 'ai-implementation'
    await upsert('blog-posts', slug, {
      title: str(fm.title),
      excerpt: str(fm.excerpt),
      content: toLexical(stripH1(body)),
      category,
      readTime: typeof fm.readTime === 'number' ? fm.readTime : undefined,
      tags: (Array.isArray(fm.tags) ? fm.tags : []).map((t) => ({ tag: String(t) })),
      seo: seo(fm),
      editorNotes: editorNotes(fm),
    })
  }

  // Case studies: "challenge" = text before/under the challenge heading, "solution" = every other section.
  for (const f of files(path.join(root, 'case-studies'), /\.md$/)) {
    const { fm, body } = readMd(f)
    const slug = str(fm.slug) ?? path.basename(f, '.md')
    const parts = stripH1(body).split(/\n(?=## )/)
    const isChallenge = (p: string) => /^## .*challenge/i.test(p)
    const intro = parts.filter((p) => !p.startsWith('## '))
    const challenge = [...intro, ...parts.filter(isChallenge).map((p) => p.replace(/^## .*\n+/, ''))].join('\n\n')
    const solution = parts.filter((p) => p.startsWith('## ') && !isChallenge(p)).join('\n\n')
    const status = /\*\*Status:\s*pilot/i.test(body) ? 'pilot' : 'production'
    await upsert('case-studies', slug, {
      title: str(fm.title),
      approved: false,
      deploymentStatus: status,
      challenge: toLexical(challenge),
      solution: toLexical(solution),
      seo: seo(fm),
      editorNotes: editorNotes(fm),
    })
  }

  // Guides and whitepapers
  const services = new Set(['voice-ai', 'idp', 'rag', 'saas', 'automation'])
  const knowledge = path.join(root, 'knowledge')
  const guideFiles: [string, 'guide' | 'whitepaper'][] = [
    ...files(knowledge, /^guides-.*\.md$/).map((f) => [f, 'guide'] as [string, 'guide']),
    ...files(knowledge, /^whitepaper-.*\.md$/).map((f) => [f, 'whitepaper'] as [string, 'whitepaper']),
  ]
  for (const [f, kind] of guideFiles) {
    const { fm, body } = readMd(f)
    const slug = (str(fm.slug) ?? path.basename(f, '.md')).split('/').pop() as string
    await upsert('guides', slug, {
      title: str(fm.title),
      kind,
      summary: str(fm.metaDescription),
      content: toLexical(stripH1(body)),
      gated: fm.gated === true,
      service: services.has(String(fm.service)) ? String(fm.service) : undefined,
      seo: seo(fm),
      editorNotes: editorNotes(fm),
    })
  }

  console.log('SEED RESULT', JSON.stringify(counts))
  process.exit(0)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
