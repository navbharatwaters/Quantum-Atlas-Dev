import type { ContactContent } from './contact.types'

export const contactRu: ContactContent = {
  eyebrow: 'Консультация',
  heading: 'Расскажите, что вы создаёте',
  intro:
    'Это не продажа, а разговор о вашей конкретной задаче и о том, подходим ли мы для её решения. Если не подходим, мы скажем об этом прямо.',
  bullets: [
    '30 минут разговора — мы ценим ваше время',
    'Разбираем ваше текущее положение и проблемные места',
    'Показываем подходящие примеры из наших собственных систем в продакшене',
    'Без обязательств — мы избирательно подходим к выбору проектов',
  ],
  direct: {
    label: 'Прямой контакт',
    note: 'Сообщения из формы поступают команде по электронной почте.',
  },
  form: {
    name: 'Имя',
    namePlaceholder: 'Ваше имя',
    company: 'Компания',
    companyPlaceholder: 'Название компании',
    email: 'Рабочий e-mail',
    emailPlaceholder: 'you@company.com',
    phone: 'Телефон (необязательно)',
    phonePlaceholder: '+7...',
    service: 'Интересующая услуга',
    servicePlaceholder: 'Выберите услугу...',
    services: [
      { value: 'voice-ai', label: 'Голосовые ИИ-агенты' },
      { value: 'idp', label: 'Интеллектуальная обработка документов' },
      { value: 'rag', label: 'Корпоративный RAG' },
      { value: 'saas', label: 'SaaS на заказ' },
      { value: 'automation', label: 'ИИ-автоматизация' },
      { value: 'content', label: 'Контент и видео' },
      { value: 'unsure', label: 'Пока не знаю — расскажите подробнее' },
    ],
    message: 'Опишите вашу задачу',
    messagePlaceholder: 'Какую проблему вы хотите решить? Что уже пробовали?',
    submit: 'Записаться на консультацию',
    submitting: 'Отправляем...',
    footnote: 'Без спама. Без обязательств.',
    successTitle: 'Заявка получена',
    successBody: 'Мы свяжемся с вами, чтобы договориться о времени звонка.',
    errorGeneric: 'Что-то пошло не так. Напишите нам напрямую: contact@quantumatlas.dev',
    validation: {
      name: 'Имя должно содержать не менее 2 символов',
      company: 'Укажите название компании',
      email: 'Укажите корректный e-mail',
      service: 'Выберите услугу',
      message: 'Опишите вашу задачу (не менее 20 символов)',
    },
  },
}
