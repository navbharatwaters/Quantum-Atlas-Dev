import { MetadataRoute } from 'next'
import { RU_PAGES, alternates } from '@/lib/i18n'
import { SITE_URL_EN as BASE_URL, ruUrl } from '@/lib/site'

const staticPages: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0, alternates: { languages: { en: alternates('/').en, ru: alternates('/').ru } } },
  { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/services/ai-voice-agents`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/services/document-intelligence`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/services/enterprise-rag`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/services/saas-development`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/services/ai-automation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/services/content-video`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/industries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/industries/government`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/industries/logistics-shipping`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/industries/fintech-bfsi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/industries/legal`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/industries/manufacturing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/industries/healthcare`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/industries/real-estate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/knowledge`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/knowledge/whitepapers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/knowledge/roi-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/knowledge/guides`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/knowledge/case-studies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
]

// Russian pages that exist (see RU_PAGES in src/lib/i18n.ts), each linked back to its English counterpart
const russianPages: MetadataRoute.Sitemap = [...RU_PAGES].map((path) => ({
  url: ruUrl(path),
  lastModified: new Date(),
  changeFrequency: 'weekly' as const,
  priority: path === '/' ? 1.0 : 0.8,
  alternates: { languages: { en: alternates(path).en, ru: alternates(path).ru } },
}))

export default function sitemap(): MetadataRoute.Sitemap {
  // Extend post-launch: add dynamic blog posts and case studies from Payload CMS
  return [...staticPages, ...russianPages]
}
