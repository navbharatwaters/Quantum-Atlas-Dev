'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
})
type FormData = z.infer<typeof schema>

interface Whitepaper {
  id: string
  title: string
  description: string
  category: string
  color: string
  pages: number
}

export function WhitepaperGateFull({ whitepaper }: { whitepaper: Whitepaper }) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      await fetch('/api/whitepaper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, whitepaperTitle: whitepaper.title }),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true) // Optimistic — show success even if API fails gracefully
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-3 py-2.5 rounded-lg border border-space-border bg-space-dark text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none focus:border-electric-blue transition-colors"

  return (
    <div
      className="p-6 rounded-xl border border-space-border flex flex-col gap-4"
      style={{ background: '#171411', borderTop: '1px solid #2E261F' }}
    >
      <div>
        <span
          className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded mb-2 inline-block"
          style={{ background: `${whitepaper.color}20`, color: whitepaper.color, fontFamily: 'var(--font-mono)' }}
        >
          {whitepaper.category}
        </span>
        <h3 className="text-text-primary font-semibold text-base leading-snug mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          {whitepaper.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed">{whitepaper.description}</p>
        <p className="text-text-secondary text-xs mt-2" style={{ fontFamily: 'var(--font-mono)' }}>
          {whitepaper.pages} pages
        </p>
      </div>

      {!open && !submitted && (
        <button
          onClick={() => setOpen(true)}
          className="px-5 py-2.5 rounded-lg text-white text-sm font-semibold hover:brightness-110 transition-all"
          style={{ background: whitepaper.color, fontFamily: 'var(--font-display)' }}
        >
          Download Free →
        </button>
      )}

      {open && !submitted && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
          <input {...register('name')} placeholder="Your name" className={inputClass} />
          {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
          <input {...register('email')} type="email" placeholder="Work email" className={inputClass} />
          {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-lg text-white text-sm font-semibold disabled:opacity-70 transition-all"
            style={{ background: whitepaper.color, fontFamily: 'var(--font-display)' }}
          >
            {loading ? 'Sending...' : 'Get the Guide →'}
          </button>
        </form>
      )}

      {submitted && (
        <p className="text-quantum-green text-sm font-medium">
          ✓ Check your email — the guide is on its way.
        </p>
      )}
    </div>
  )
}
