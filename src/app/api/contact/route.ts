import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { escapeHtml } from '@/lib/escapeHtml'

const schema = z.object({
  name: z.string().min(2),
  company: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(20),
  locale: z.enum(['en', 'ru']).optional(),
})

// Email text for Russian submissions (internal notification to the team; English stays unchanged).
const RU_SERVICE_LABELS: Record<string, string> = {
  'voice-ai': 'Голосовые ИИ-агенты',
  'idp': 'Интеллектуальная обработка документов',
  'rag': 'Корпоративный RAG',
  'saas': 'SaaS на заказ',
  'automation': 'ИИ-автоматизация',
  'content': 'Контент и видео',
  'unsure': 'Пока не знаю — расскажите подробнее',
}

const EMAIL_TEXT = {
  en: {
    subject: (n: string, c: string, s: string) => `New enquiry: ${n} at ${c} — ${s}`,
    title: 'New Discovery Call Request',
    name: 'Name',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    service: 'Service',
    message: 'Message',
    footer: (n: string) => `Submitted via quantumatlas.dev/contact · Reply to this email to respond directly to ${n}.`,
  },
  ru: {
    subject: (n: string, c: string, s: string) => `Новая заявка: ${n}, ${c} — ${s}`,
    title: 'Новая заявка на консультацию',
    name: 'Имя',
    company: 'Компания',
    email: 'E-mail',
    phone: 'Телефон',
    service: 'Услуга',
    message: 'Сообщение',
    footer: (n: string) => `Отправлено со страницы /ru/contact · Ответьте на это письмо, чтобы написать напрямую: ${n}.`,
  },
} as const

const SERVICE_LABELS: Record<string, string> = {
  'voice-ai': 'AI Voice Agents',
  'idp': 'Document Intelligence',
  'rag': 'Enterprise RAG',
  'saas': 'Custom SaaS Development',
  'automation': 'AI Automation',
  'content': 'Content & Video',
  'unsure': 'Not sure — tell us more',
}

function createTransport() {
  const port = Number(process.env.SMTP_PORT ?? 587)
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'mail.privateemail.com',
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const t = EMAIL_TEXT[data.locale === 'ru' ? 'ru' : 'en']
    const labels = data.locale === 'ru' ? RU_SERVICE_LABELS : SERVICE_LABELS
    const serviceLabel = labels[data.service] ?? data.service
    const toEmail = process.env.CONTACT_EMAIL ?? 'contact@quantumatlas.dev'

    // Send email via Namecheap SMTP
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = createTransport()
      await transporter.sendMail({
        from: `"Quantum Atlas Website" <${process.env.SMTP_USER}>`,
        to: toEmail,
        replyTo: { name: data.name, address: data.email },
        subject: t.subject(data.name, data.company, serviceLabel),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #FFBF00; margin-top: 0;">${t.title}</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #888; width: 140px;">${t.name}</td><td style="padding: 8px 0; font-weight: bold;">${escapeHtml(data.name)}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">${t.company}</td><td style="padding: 8px 0; font-weight: bold;">${escapeHtml(data.company)}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">${t.email}</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color: #FFBF00;">${escapeHtml(data.email)}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #888;">${t.phone}</td><td style="padding: 8px 0;">${data.phone ? escapeHtml(data.phone) : '—'}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">${t.service}</td><td style="padding: 8px 0;">${escapeHtml(serviceLabel)}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #333; margin: 16px 0;" />
            <p style="color: #888; margin-bottom: 4px;">${t.message}</p>
            <p style="background: #f5f5f5; padding: 16px; border-radius: 6px; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
            <p style="color: #aaa; font-size: 12px; margin-top: 24px;">${escapeHtml(t.footer(data.name))}</p>
          </div>
        `,
        text: `${t.title}\n\n${t.name}: ${data.name}\n${t.company}: ${data.company}\n${t.email}: ${data.email}\n${t.phone}: ${data.phone ?? '—'}\n${t.service}: ${serviceLabel}\n\n${t.message}:\n${data.message}`,
      })
    } else {
      console.warn('SMTP credentials not set — email not sent')
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues }, { status: 400 })
    }
    console.error('Contact API error:', e)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
