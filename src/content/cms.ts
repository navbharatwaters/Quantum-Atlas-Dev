import type { Locale } from '@/lib/i18n'

/** Chrome strings for CMS-driven pages (the articles themselves come from the CMS). */
export interface CmsUi {
  blogEyebrow: string
  blogHeading: string
  blogEmptyTitle: string
  blogEmptyBody: string
  blogEmptyLink: string
  minRead: string
  readMore: string
  backToBlog: string
  by: string
  ctaLead: string
  ctaButton: string
  caseEyebrow: string
  caseHeading: string
  caseIntro: string
  challenge: string
  solution: string
  outcomes: string
  metric: string
  before: string
  after: string
  techStack: string
  statusProduction: string
  statusPilot: string
  allCaseStudies: string
  guideEyebrow: string
  fromCms: string
  kindGuide: string
  kindWhitepaper: string
  download: string
  gatedNote: string
  allGuides: string
  published: string
}

const en: CmsUi = {
  blogEyebrow: 'Knowledge Hub · Blog',
  blogHeading: 'How we think. What we have learned.',
  blogEmptyTitle: 'Articles are being prepared',
  blogEmptyBody: 'We have not published any articles in this language yet.',
  blogEmptyLink: 'Read the English blog',
  minRead: 'min read',
  readMore: 'Read more',
  backToBlog: 'View all articles',
  by: 'By',
  ctaLead: 'Interested in implementing this?',
  ctaButton: 'Book a Discovery Call',
  caseEyebrow: 'Case Study',
  caseHeading: 'Production AI deployments',
  caseIntro: 'Systems that run in production, with the numbers behind them.',
  challenge: 'The challenge',
  solution: 'The solution',
  outcomes: 'Outcomes',
  metric: 'Metric',
  before: 'Before',
  after: 'After',
  techStack: 'Technology',
  statusProduction: 'In production',
  statusPilot: 'Pilot',
  allCaseStudies: 'All case studies',
  guideEyebrow: 'Implementation Guide',
  fromCms: 'From the CMS',
  kindGuide: 'Guide',
  kindWhitepaper: 'Whitepaper',
  download: 'Download PDF',
  gatedNote: 'The PDF is available on request. Contact us and we will send it.',
  allGuides: 'All guides',
  published: 'Published',
}

const ru: CmsUi = {
  blogEyebrow: 'База знаний · Блог',
  blogHeading: 'Как мы думаем. Чему научились.',
  blogEmptyTitle: 'Статьи готовятся',
  blogEmptyBody: 'На русском языке мы пока ничего не опубликовали.',
  blogEmptyLink: 'Читать блог на английском',
  minRead: 'мин чтения',
  readMore: 'Читать дальше',
  backToBlog: 'Все статьи',
  by: 'Автор:',
  ctaLead: 'Хотите внедрить это у себя?',
  ctaButton: 'Записаться на обсуждение',
  caseEyebrow: 'Кейс',
  caseHeading: 'Внедрения ИИ в продакшене',
  caseIntro: 'Системы, которые работают в продакшене, и цифры за ними.',
  challenge: 'Задача',
  solution: 'Решение',
  outcomes: 'Результаты',
  metric: 'Показатель',
  before: 'До',
  after: 'После',
  techStack: 'Технологии',
  statusProduction: 'В продакшене',
  statusPilot: 'Пилот',
  allCaseStudies: 'Все кейсы',
  guideEyebrow: 'Руководство по внедрению',
  fromCms: 'Из CMS',
  kindGuide: 'Руководство',
  kindWhitepaper: 'Whitepaper',
  download: 'Скачать PDF',
  gatedNote: 'PDF доступен по запросу. Напишите нам, и мы его отправим.',
  allGuides: 'Все руководства',
  published: 'Опубликовано',
}

export function getCmsUi(locale: Locale = 'en'): CmsUi {
  return locale === 'ru' ? ru : en
}

export const categoryLabels: Record<Locale, Record<string, string>> = {
  en: {
    'technical-deep-dive': 'Technical Deep Dive',
    'ai-implementation': 'AI Implementation',
    'industry-guide': 'Industry Guide',
    company: 'Company',
  },
  ru: {
    'technical-deep-dive': 'Технический разбор',
    'ai-implementation': 'Внедрение ИИ',
    'industry-guide': 'Отраслевое руководство',
    company: 'О компании',
  },
}
