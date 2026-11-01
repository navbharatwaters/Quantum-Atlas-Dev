import { NextRequest, NextResponse } from 'next/server'
import { AccessToken } from 'livekit-server-sdk'

const LK_API_KEY = process.env.LIVEKIT_API_KEY ?? 'mykey'
const LK_API_SECRET = process.env.LIVEKIT_API_SECRET ?? ''
// Always return the public WSS URL so browsers on HTTPS don't hit mixed-content blocks
const LK_PUBLIC_URL = process.env.LIVEKIT_PUBLIC_URL ?? 'wss://livekit.quantumatlas.dev'

// Room names are chosen by the browser; the voice agent picks its language from the prefix
// (qa-ru-* = Russian). Only this exact shape may get a token. See docs/RU-PATTERN.md.
const ROOM_RE = /^qa-(ru-)?visitor-[A-Za-z0-9_-]{1,40}$/
const NAME_RE = /^[A-Za-z0-9_-]{1,40}$/

// Per-IP sliding-window limiter: 10 token requests per 10 minutes (same pattern as /api/chat)
const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 10
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (arr.length >= MAX_HITS) {
    hits.set(ip, arr)
    return true
  }
  arr.push(now)
  hits.set(ip, arr)
  return false
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many voice sessions. Please wait a few minutes and try again.' },
        { status: 429 },
      )
    }

    const { roomName, participantName } = await req.json()
    if (
      typeof roomName !== 'string' ||
      typeof participantName !== 'string' ||
      !ROOM_RE.test(roomName) ||
      !NAME_RE.test(participantName)
    ) {
      return NextResponse.json({ error: 'Invalid roomName or participantName' }, { status: 400 })
    }

    if (!LK_API_SECRET) {
      return NextResponse.json({ error: 'LIVEKIT_API_SECRET not configured' }, { status: 500 })
    }

    const token = new AccessToken(LK_API_KEY, LK_API_SECRET, {
      identity: participantName,
      ttl: '15m',
    })
    token.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    })

    const jwt = await token.toJwt()
    return NextResponse.json({ token: jwt, url: LK_PUBLIC_URL })
  } catch (e) {
    console.error('LiveKit token error:', e)
    return NextResponse.json({ error: 'Token generation failed' }, { status: 500 })
  }
}
