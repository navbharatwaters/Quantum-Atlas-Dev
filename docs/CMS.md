# Quantum Atlas CMS (Payload 3)

Hybrid model: blog posts, case studies and guides/whitepapers live in the CMS (English + Russian
fields). All other site copy stays in code (`src/content/*`). Admin: `/admin`. REST: `/api/*`
(GraphQL is disabled).

Versions are pinned and must stay identical: `payload`, `@payloadcms/next`, `@payloadcms/ui`,
`@payloadcms/db-postgres`, `@payloadcms/richtext-lexical` = **3.90.2**; `next` 16.3.5.

## Collections

| Collection | Slug | Public URL (en / ru) | Notes |
|---|---|---|---|
| Blog posts | `blog-posts` | `/blog/<slug>`, `/ru/blog/<slug>` | category, tags, author (name only), related posts |
| Case studies | `case-studies` | `/knowledge/case-studies/<slug>`, `/ru/knowledge/case-studies/<slug>` | `approved` must be ticked (written client approval) |
| Guides | `guides` | `/knowledge/guides/<slug>` (English only) | `kind` = guide or whitepaper, optional PDF |
| Media | `media` | `/api/media/file/<name>` | jpeg, png, webp, gif, pdf. No SVG. Sizes: thumbnail 400, card 800, hero 1600 |
| Users | `users` | not public | roles: admin, editor |

All content collections have drafts. Localized fields: title, excerpt/summary, content, SEO, client,
outcome metric. Not localized: slug, category, dates, tags, `editorNotes`.

### Access rules

- Anonymous: only documents with status Published (case studies: Published **and** approved). Drafts,
  `editorNotes` and `/api/users` are not readable.
- Signed in (admin or editor): read everything; create, update and delete content and media.
- Users: the first user can sign up only while the owner has opened the **setup window**
  (`CMS_ALLOW_FIRST_USER=true` in the server `.env`, then restart) AND the table is empty; that user becomes
  admin. The window is closed by default, so nobody can claim the admin account between deploy and sign-up.
  After the first sign-up remove the setting and restart. After that only an admin creates users. An editor can read and update only their own record. Only an admin deletes users.
  Five wrong passwords lock the account for 15 minutes. Sessions last 2 hours.
- Publishing is blocked while the text contains `OWNER-CONFIRM` (error: "Resolve all [OWNER-CONFIRM]
  notes before publishing"). `editorNotes` is not checked, so keep open questions there.

## Editor workflow

1. Sign in at `/admin`. Open Content > Blog posts > Create new. Locale switcher (top right) is **English**.
2. Fill title, excerpt, content, category; the slug is created from the English title (editable,
   lowercase letters, digits, hyphens). Add the featured image from Media (alt text required).
3. Save draft (not public). Press **Publish** when ready. The page is live within seconds (revalidate hook).
4. Russian version: open the same post, switch the locale switcher to **Русский**, fill title, excerpt,
   content, SEO, Publish. Same slug, same document. Until the Russian title exists, `/ru/blog/<slug>`
   is a 404 and the post is not in the Russian list; once it exists both pages get hreflang links.
5. Unpublish: set status to Draft and save. Delete removes the document (and its page).

Russian is optional everywhere. The site never shows English text on a Russian page.

### Legacy fallback

`/blog` shows the old placeholder cards until at least one post is **published**; then it shows CMS
posts only. `/knowledge/case-studies` behaves the same (legacy cards until a published, approved
case study exists). `/ru/blog` shows an empty notice (noindex) until a post has a Russian title.

## How revalidation works

Pages are static with `revalidate = 300` and `generateStaticParams() = []` (no database at build time).
Every create/update/delete runs an `afterChange`/`afterDelete` hook that calls `revalidatePath` for the list
and detail page in both locales, and `/sitemap.xml`. Hook failures are swallowed (a save never fails
because of revalidation). Worst case without the hook: a page is at most 5 minutes old.

## Environment variables

| Variable | Required | Meaning |
|---|---|---|
| `DATABASE_URI` | yes (runtime + migrate) | `postgres://user:pass@host:5432/quantum_atlas_dev`. Without it pages fall back to legacy content |
| `PAYLOAD_SECRET` | yes (runtime) | 48+ random characters. No fallback: production throws if missing. Changing it logs everyone out |
| `NEXT_PUBLIC_SITE_URL` | yes | Public origin, used for CSRF/CORS and absolute URLs |
| `MEDIA_DIR` | server | Absolute folder for uploads (`/opt/quantum-atlas-media`). Default `./media` |

`push` is off in every environment: schema changes only ship as migrations.

## Commands (PowerShell, from the repo root)

```
pnpm install
pnpm exec payload generate:importmap      # also run by `pnpm build`
pnpm exec payload generate:types          # rewrites src/payload-types.ts
pnpm exec payload migrate:create <name>   # after changing a collection; commit src/migrations/*
pnpm exec payload migrate                 # apply pending migrations
pnpm exec payload migrate:status
pnpm seed                                 # import docs/content as DRAFTS (idempotent, skips existing slugs)
```

The Payload CLI loads the config as ESM thanks to `src/package.json` (`{"type":"module"}`); lexical
uses top-level await, so a CommonJS load fails with `ERR_REQUIRE_ASYNC_MODULE`. The seed script
imports the config dynamically for the same reason (`payload run` cannot be used).
Do not add `"type": "module"` to the root `package.json`: `ecosystem.config.js` is CommonJS.

## Backup and restore

- Nightly `/usr/local/bin/qa-backup.sh` dumps the `quantum_atlas_dev` database and copies the dump plus
  `/opt/quantum-atlas-media` to the Mumbai server. The CMS adds tables to the same database and files to the
  media folder, so both are already covered. Confirm the script lists the media folder after the first deploy.
- Restore (tested 2026-11-01 on a real dump of the staging CMS database; all table row counts and a slug
  checksum matched): create an empty database, then `cat dump | sudo -u postgres pg_restore -d <db> --no-owner`
  (do NOT add `--exit-on-error`, it aborts on harmless messages), compare counts, rsync the media folder back,
  point `DATABASE_URI` at it and restart. Backups live on the server in `/opt/qa-backups/cms` (14 days) and on
  Mumbai in `/opt/backups/quantum-atlas` (30 days, written with a write-only key; read them on Mumbai itself).

## Deploy order

1. **Backup** (run `qa-backup.sh` by hand, check the dump is non-empty).
2. `git pull`, `pnpm install --frozen-lockfile`.
3. **Migrate**: `pnpm exec payload migrate` with production `DATABASE_URI` / `PAYLOAD_SECRET` in the environment.
4. **Build**: `pnpm build` (needs the same env vars; a missing database does not fail the build).
5. **Restart**: `pm2 restart quantum-atlas-dev`.
6. Check `/admin`, `/blog`, `/sitemap.xml`.

First deploy only: the media folder `/opt/quantum-atlas-media` already exists; set `MEDIA_DIR` and a new
random `PAYLOAD_SECRET` in the server `.env`. Deploy with the sign-up window CLOSED. When the owner is ready:
add `CMS_ALLOW_FIRST_USER=true`, restart, the owner opens `/admin` and creates the first user (admin), then
remove the setting, restart, and verify exactly one user exists. Then run `pnpm seed` if the drafts should be
imported.

### Rollback

- Code only (no schema change): redeploy the previous release and restart.
- With a schema change: restore the pre-deploy dump, or `pnpm exec payload migrate:down` (reverts the
  last batch) on the OLD release, then deploy the old release. Never edit an applied migration; add a new one.

## Known limits

- Lists show the latest 100 documents (no pagination yet).
- `gated` on guides is stored but not enforced; uploaded PDFs are public at their media URL.
- Email is not configured (password reset mail is printed to the server log). Admins reset passwords from the admin.
