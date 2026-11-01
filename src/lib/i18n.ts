import type { Metadata } from 'next'
import { RU_BASE_URL, RU_PATH_PREFIX, SITE_URL_EN, enUrl, ruUrl } from '@/lib/site'

export type Locale = 'en' | 'ru'

/**
 * Logical paths (no locale prefix) that exist in Russian. Add a path here the
 * moment its src/app/(ru)/ru/<path>/page.tsx ships: links, the language
 * switcher and the sitemap all read this one set. Anything not listed falls
 * back to the English page / the Russian home.
 */
export const RU_PAGES: ReadonlySet<string> = new Set([
  '/',
  '/about',
  '/contact',
  '/knowledge/case-studies',
  '/industries',
  '/industries/government',
  '/industries/logistics-shipping',
  '/industries/fintech-bfsi',
  '/industries/legal',
  '/industries/manufacturing',
  '/industries/healthcare',
  '/industries/real-estate',
  '/services',
  '/services/ai-voice-agents',
  '/services/document-intelligence',
  '/services/enterprise-rag',
  '/services/saas-development',
  '/services/ai-automation',
  '/services/content-video',
])

/** True when Russian is served from a different origin/path than English (.ru migration). */
const CROSS_HOST = !RU_BASE_URL.startsWith(`${SITE_URL_EN}/`) && RU_BASE_URL !== SITE_URL_EN

/** en: path unchanged. ru: prefix + path ('/' -> prefix, or '/' when the prefix is empty). */
export function localePath(locale: Locale, path: string): string {
  if (locale === 'en') return path
  return path === '/' ? RU_PATH_PREFIX || '/' : `${RU_PATH_PREFIX}${path}`
}

/**
 * Link target for use inside pages of `locale`. For Russian, pages that are
 * not translated yet point to the English page (temporary fallback).
 */
export function localeHref(locale: Locale, path: string): string {
  if (locale === 'en') return path
  if (RU_PAGES.has(path)) return localePath('ru', path)
  return CROSS_HOST ? enUrl(path) : path
}

/** Strip the Russian prefix from a browser pathname to get the logical path. */
export function logicalPath(pathname: string): string {
  const stripped = pathname.replace(/^\/ru(?=\/|$)/, '')
  return stripped === '' ? '/' : stripped
}

/** Language-switcher target: the same page in `target` when it exists, else that locale's home. */
export function switcherHref(target: Locale, pathname: string): string {
  const p = logicalPath(pathname)
  if (target === 'en') return CROSS_HOST ? enUrl(p) : p
  const rp = RU_PAGES.has(p) ? p : '/'
  return CROSS_HOST ? ruUrl(rp) : localePath('ru', rp)
}

/** Absolute en + ru URLs of a logical path (for hreflang). */
export function alternates(path: string): { en: string; ru: string } {
  return { en: enUrl(path), ru: ruUrl(path) }
}

/** Next.js `metadata.alternates` for a page that exists in both locales. */
export function pageAlternates(locale: Locale, path: string): NonNullable<Metadata['alternates']> {
  const alt = alternates(path)
  return {
    canonical: locale === 'ru' ? alt.ru : alt.en,
    languages: { en: alt.en, ru: alt.ru, 'x-default': alt.en },
  }
}

// --------------------------------------------------------------------------
// UI dictionary: chrome strings shared by every page (nav, footer, chat, buttons).
// Page copy does NOT live here; it lives in src/content/<page>.<locale>.ts.
// --------------------------------------------------------------------------

export interface UiStrings {
  common: { learnMore: string; bookDiscoveryCall: string }
  nav: {
    services: string
    industries: string
    work: string
    knowledge: string
    about: string
    blog: string
    bookCall: string
    toggleMenu: string
    closeMenu: string
    language: string
  }
  /** hrefs are logical (locale-less) paths, identical across locales. */
  serviceItems: { href: string; label: string; description: string }[]
  footer: {
    tagline: string
    services: string
    industries: string
    company: string
    legal: string
    industryLinks: { href: string; label: string }[]
    companyLinks: { href: string; label: string }[]
    legalLinks: { href: string; label: string }[]
    serviceLabels: string[]
    copyright: string
    contactPerson: string
    ariaLabel: string
  }
  chat: {
    greeting: string
    assistantSuffix: string
    switchToVoice: string
    switchToText: string
    closeChat: string
    openChat: string
    thinking: string
    placeholder: string
    talkAria: string
    send: string
    hint: string
    talkLink: string
    voiceConnecting: string
    agentSpeaking: string
    micMuted: string
    speakNow: string
    unmute: string
    mute: string
    endCall: string
    switchToTextChat: string
    voiceError: string
    tryAgain: string
    useTextInstead: string
    voiceReady: string
    startVoice: string
    errorGeneric: string
    errorConnection: string
    errorFallback: string
  }
}

const serviceHrefs = [
  '/services/ai-voice-agents',
  '/services/document-intelligence',
  '/services/enterprise-rag',
  '/services/saas-development',
  '/services/ai-automation',
  '/services/content-video',
]

const en: UiStrings = {
  common: { learnMore: 'Learn more', bookDiscoveryCall: 'Book a Discovery Call' },
  nav: {
    services: 'Services',
    industries: 'Industries',
    work: 'Work',
    knowledge: 'Knowledge',
    about: 'About',
    blog: 'Blog',
    bookCall: 'Book a Call',
    toggleMenu: 'Toggle menu',
    closeMenu: 'Close menu',
    language: 'Language',
  },
  serviceItems: [
    { label: 'AI Voice Agents', description: 'Website and phone voice agents on infrastructure you control' },
    { label: 'Document Intelligence', description: 'Extraction, checking and routing for document-heavy teams' },
    { label: 'Enterprise RAG', description: 'Knowledge systems with a citation on every answer' },
    { label: 'Custom SaaS Dev', description: 'Multi-tenant products built end to end' },
    { label: 'AI Automation', description: 'Workflows and agents wired into your systems' },
    { label: 'Content & Video', description: 'Avatar and video production, supporting service' },
  ].map((s, i) => ({ href: serviceHrefs[i], ...s })),
  footer: {
    tagline:
      'Production-grade AI for enterprises. Every system runs in our own companies before we sell it.',
    services: 'Services',
    industries: 'Industries',
    company: 'Company',
    legal: 'Legal',
    serviceLabels: [
      'AI Voice Agents',
      'Document Intelligence',
      'Enterprise RAG',
      'Custom SaaS Dev',
      'AI Automation',
      'Content & Video',
    ],
    industryLinks: [
      { label: 'Government', href: '/industries/government' },
      { label: 'Logistics & Shipping', href: '/industries/logistics-shipping' },
      { label: 'Fintech & BFSI', href: '/industries/fintech-bfsi' },
      { label: 'Legal', href: '/industries/legal' },
      { label: 'Manufacturing', href: '/industries/manufacturing' },
      { label: 'Healthcare', href: '/industries/healthcare' },
    ],
    companyLinks: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Knowledge Hub', href: '/knowledge' },
      { label: 'Case Studies', href: '/knowledge/case-studies' },
      { label: 'Contact', href: '/contact' },
    ],
    legalLinks: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
    copyright: '© 2026 Quantum Atlas. All rights reserved.',
    contactPerson: 'Contact',
    ariaLabel: 'Site footer',
  },
  chat: {
    greeting:
      "Hi — I'm the Quantum Atlas assistant. I can answer questions about our AI services and how we've deployed systems in production. What are you working on?",
    assistantSuffix: '· AI Assistant',
    switchToVoice: 'Switch to voice',
    switchToText: 'Switch to text',
    closeChat: 'Close chat',
    openChat: 'Open chat',
    thinking: 'Thinking…',
    placeholder: 'Ask about our services…',
    talkAria: 'Talk to our voice assistant',
    send: 'Send',
    hint: 'Enter to send · Shift+Enter for new line ·',
    talkLink: 'Talk to voice assistant',
    voiceConnecting: 'Connecting to voice assistant…',
    agentSpeaking: 'Agent speaking…',
    micMuted: 'Microphone muted',
    speakNow: 'Speak now…',
    unmute: 'Unmute',
    mute: 'Mute',
    endCall: 'End call',
    switchToTextChat: 'Switch to text chat',
    voiceError: 'Could not connect to voice assistant.',
    tryAgain: 'Try again',
    useTextInstead: 'Use text chat instead',
    voiceReady: 'Voice assistant ready',
    startVoice: 'Start voice chat',
    errorGeneric: 'Something went wrong. Please try again or email contact@quantumatlas.dev.',
    errorConnection: 'Connection error. Please try again.',
    errorFallback: 'Sorry, something went wrong. Please try again.',
  },
}

const ru: UiStrings = {
  common: { learnMore: 'Подробнее', bookDiscoveryCall: 'Записаться на консультацию' },
  nav: {
    services: 'Услуги',
    industries: 'Отрасли',
    work: 'Кейсы',
    knowledge: 'База знаний',
    about: 'О компании',
    blog: 'Блог',
    bookCall: 'Записаться на звонок',
    toggleMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    language: 'Язык',
  },
  serviceItems: [
    { label: 'Голосовые ИИ-агенты', description: 'Голосовые агенты для сайта и телефонии на инфраструктуре, которую вы контролируете' },
    { label: 'Интеллектуальная обработка документов', description: 'Извлечение, проверка и маршрутизация для команд с большими потоками документов' },
    { label: 'Корпоративный RAG', description: 'Системы знаний со ссылкой на источник в каждом ответе' },
    { label: 'SaaS на заказ', description: 'Мультитенантные продукты, созданные под ключ' },
    { label: 'ИИ-автоматизация', description: 'Рабочие процессы и агенты, встроенные в ваши системы' },
    { label: 'Контент и видео', description: 'Производство аватаров и видео, вспомогательная услуга' },
  ].map((s, i) => ({ href: serviceHrefs[i], ...s })),
  footer: {
    tagline:
      'ИИ промышленного уровня для бизнеса. Каждая система сначала работает в наших собственных компаниях, и только потом мы предлагаем её клиентам.',
    services: 'Услуги',
    industries: 'Отрасли',
    company: 'Компания',
    legal: 'Правовая информация',
    serviceLabels: [
      'Голосовые ИИ-агенты',
      'Обработка документов',
      'Корпоративный RAG',
      'SaaS на заказ',
      'ИИ-автоматизация',
      'Контент и видео',
    ],
    industryLinks: [
      { label: 'Госсектор', href: '/industries/government' },
      { label: 'Логистика и судоходство', href: '/industries/logistics-shipping' },
      { label: 'Финтех и BFSI', href: '/industries/fintech-bfsi' },
      { label: 'Юриспруденция', href: '/industries/legal' },
      { label: 'Производство', href: '/industries/manufacturing' },
      { label: 'Здравоохранение', href: '/industries/healthcare' },
    ],
    companyLinks: [
      { label: 'О компании', href: '/about' },
      { label: 'Блог', href: '/blog' },
      { label: 'База знаний', href: '/knowledge' },
      { label: 'Кейсы', href: '/knowledge/case-studies' },
      { label: 'Контакты', href: '/contact' },
    ],
    legalLinks: [
      { label: 'Политика конфиденциальности', href: '/privacy' },
      { label: 'Условия использования', href: '/terms' },
    ],
    copyright: '© 2026 Quantum Atlas. Все права защищены.',
    contactPerson: 'Контактное лицо',
    ariaLabel: 'Подвал сайта',
  },
  chat: {
    greeting:
      'Здравствуйте! Я ассистент Quantum Atlas. Отвечу на вопросы о наших ИИ-услугах и о том, как мы внедряли системы в промышленную эксплуатацию. Над какой задачей вы работаете?',
    assistantSuffix: '· ИИ-ассистент',
    switchToVoice: 'Перейти на голос',
    switchToText: 'Перейти на текст',
    closeChat: 'Закрыть чат',
    openChat: 'Открыть чат',
    thinking: 'Думаю…',
    placeholder: 'Спросите об услугах…',
    talkAria: 'Поговорить с голосовым ассистентом',
    send: 'Отправить',
    hint: 'Enter — отправить · Shift+Enter — новая строка',
    talkLink: 'Голосовой ассистент',
    voiceConnecting: 'Подключаемся к голосовому ассистенту…',
    agentSpeaking: 'Говорит ассистент…',
    micMuted: 'Микрофон выключен',
    speakNow: 'Говорите…',
    unmute: 'Включить микрофон',
    mute: 'Выключить микрофон',
    endCall: 'Завершить звонок',
    switchToTextChat: 'Перейти в текстовый чат',
    voiceError: 'Не удалось подключиться к голосовому ассистенту.',
    tryAgain: 'Повторить',
    useTextInstead: 'Использовать текстовый чат',
    voiceReady: 'Голосовой ассистент готов',
    startVoice: 'Начать голосовой чат',
    errorGeneric: 'Что-то пошло не так. Попробуйте ещё раз или напишите на contact@quantumatlas.dev.',
    errorConnection: 'Ошибка соединения. Попробуйте ещё раз.',
    errorFallback: 'К сожалению, что-то пошло не так. Попробуйте ещё раз.',
  },
}

const dictionaries: Record<Locale, UiStrings> = { en, ru }

export function getUi(locale: Locale = 'en'): UiStrings {
  return dictionaries[locale]
}
