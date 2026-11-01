'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getContact } from '@/content/contact'
import type { Locale } from '@/lib/i18n'

function makeSchema(v: ReturnType<typeof getContact>['form']['validation']) {
  return z.object({
    name: z.string().min(2, v.name),
    company: z.string().min(1, v.company),
    email: z.string().email(v.email),
    phone: z.string().optional(),
    service: z.string().min(1, v.service),
    message: z.string().min(20, v.message),
  })
}

type FormData = z.infer<ReturnType<typeof makeSchema>>

export function ContactForm({ locale = 'en' }: { locale?: Locale }) {
  const t = getContact(locale).form
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(makeSchema(t.validation)),
  })

  async function onSubmit(data: FormData) {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError(t.errorGeneric)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{ background: '#00E5A015', color: '#00E5A0' }}
        >
          ✓
        </div>
        <h3 className="text-text-primary text-xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
          {t.successTitle}
        </h3>
        <p className="text-text-secondary text-sm">
          {t.successBody}
        </p>
      </div>
    )
  }

  const inputClass = "w-full px-4 py-3 rounded-lg border border-space-border bg-space-dark text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-electric-blue transition-colors"
  const labelClass = "block text-text-secondary text-xs mb-1.5 font-medium uppercase tracking-wide"
  const errorClass = "text-red-400 text-xs mt-1"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t.name}</label>
          <input {...register('name')} placeholder={t.namePlaceholder} className={inputClass} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{t.company}</label>
          <input {...register('company')} placeholder={t.companyPlaceholder} className={inputClass} />
          {errors.company && <p className={errorClass}>{errors.company.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t.email}</label>
          <input {...register('email')} type="email" placeholder={t.emailPlaceholder} className={inputClass} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{t.phone}</label>
          <input {...register('phone')} placeholder={t.phonePlaceholder} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t.service}</label>
        <select {...register('service')} className={inputClass} defaultValue="">
          <option value="" disabled>{t.servicePlaceholder}</option>
          {t.services.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {errors.service && <p className={errorClass}>{errors.service.message}</p>}
      </div>

      <div>
        <label className={labelClass}>{t.message}</label>
        <textarea
          {...register('message')}
          placeholder={t.messagePlaceholder}
          rows={4}
          className={`${inputClass} resize-none`}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-6 py-4 rounded-lg bg-electric-blue text-white font-semibold hover:brightness-110 transition-all disabled:opacity-70 text-sm"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {submitting ? t.submitting : t.submit}
      </button>

      <p className="text-text-secondary text-xs text-center">
        {t.footnote}
      </p>
    </form>
  )
}
