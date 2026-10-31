import { NextRequest, NextResponse } from 'next/server'
import { SYSTEM_PROMPT } from '@/content/chat-assistant'

const OPENROUTER_BASE_URL =
  process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1'
const LLM_MODEL = process.env.LLM_MODEL ?? 'google/gemini-2.5-flash'

// Per-IP sliding-window rate limiter: 20 messages per 10 minutes
const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 20
const hits = new Map<string, number[]>()

interface HistoryMsg {
  role: 'user' | 'assistant'
  text: string
}

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (arr.length >= MAX_HITS) return true
  arr.push(now)
  hits.set(ip, arr)
  return false
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        reply:
          'Our assistant is being set up. Please email contact@quantumatlas.dev, call +91 22 4353 1111 (Marketing and Sales: +91 79654 80571), or book a call at /contact and the team will answer you directly.',
      })
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many messages. Please wait a few minutes and try again.' },
        { status: 429 },
      )
    }

    const body = await req.json()
    const message = (body.message as string | undefined)
      ?.slice(0, 1000)
      ?.trim()
    if (!message) return NextResponse.json({ error: 'No message' }, { status: 400 })

    const history = (
      Array.isArray(body.history) ? (body.history as HistoryMsg[]) : []
    )
      .filter((m) => m?.text && (m.role === 'user' || m.role === 'assistant'))
      .slice(-6)

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.map((m) => ({ role: m.role as string, content: m.text })),
      { role: 'user', content: message },
    ]

    const res = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        messages,
        temperature: 0.3,
        max_tokens: 400,
        stream: false,
      }),
      signal: AbortSignal.timeout(30000),
    })

    if (!res.ok) {
      console.error('OpenRouter upstream error:', res.status)
      return NextResponse.json({ error: 'Assistant unavailable' }, { status: 502 })
    }

    const data = await res.json()
    const reply = (
      data.choices?.[0]?.message?.content as string | undefined
    )?.trim()
    return NextResponse.json({
      reply: reply || 'Sorry, I could not generate an answer.',
    })
  } catch (e) {
    console.error('Chat API error:', e)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
