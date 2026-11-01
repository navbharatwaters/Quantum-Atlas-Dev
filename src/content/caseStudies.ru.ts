import type { CaseStudiesContent } from './caseStudies.types'

export const caseStudiesRu: CaseStudiesContent = {
  eyebrow: 'Кейсы',
  heading: 'В продакшене. Прямо сейчас.',
  intro: 'Подробные кейсы публикуются после согласования с клиентами. Внутренние внедрения доступны уже сейчас.',
  statusAvailable: 'Доступно',
  statusPending: 'Ожидает согласования',
  items: [
    { title: 'Navbharat Shipping — голосовой ИИ-агент', sector: 'Логистика и судоходство', service: 'Голосовые ИИ-агенты', outcome: '4 месяца в продакшене · $0.08/мин · входящие и исходящие звонки', available: true },
    { title: 'iKargos — замена ERP', sector: 'Логистика и CHA', service: 'SaaS на заказ', outcome: 'Более 1000 корпоративных клиентов · мультитенантность · устаревшая ERP заменена', available: true },
    { title: 'Госсектор, IGST — RAG-система', sector: 'Госсектор · таможня', service: 'Корпоративный RAG', outcome: 'Идёт оценка · более 40 старших должностных лиц · развёртывание on-premise', available: false },
    { title: 'Глобальная логистика — интеллектуальная обработка документов', sector: 'Логистика, Fortune 500', service: 'Интеллектуальная обработка документов', outcome: 'Оценка в масштабе предприятия одобрена · конвейер массовой обработки', available: false },
  ],
  cta: { text: 'Нужен подробный разбор конкретного кейса?', button: 'Запросить брифинг' },
}
