/**
 * Site-wide URL configuration. These are the ONLY places hosts and the Russian
 * path prefix are defined; everything else derives from here.
 *
 * Moving Russian to its own domain: see docs/RU-MIGRATION.md.
 */
export const SITE_URL_EN = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantumatlas.dev'

/** Origin + prefix where the Russian site is publicly served (no trailing slash). */
export const RU_BASE_URL = (process.env.NEXT_PUBLIC_RU_BASE_URL ?? `${SITE_URL_EN}/ru`).replace(/\/+$/, '')

/**
 * Path prefix of Russian URLs on the host that serves them: '/ru' while Russian
 * lives under the English domain, '' once a .ru domain serves Russian at its root.
 */
export const RU_PATH_PREFIX = process.env.NEXT_PUBLIC_RU_PATH_PREFIX ?? '/ru'

/** Absolute English URL for a logical path ('/' = home). */
export function enUrl(path: string): string {
  return path === '/' ? SITE_URL_EN : `${SITE_URL_EN}${path}`
}

/** Absolute Russian URL for a logical path ('/' = home). */
export function ruUrl(path: string): string {
  return path === '/' ? RU_BASE_URL : `${RU_BASE_URL}${path}`
}
