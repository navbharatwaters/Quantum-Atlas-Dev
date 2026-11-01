import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  whitepaperTitle: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // Save to Payload CMS (graceful failure if DB not available)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'whitepaper',
          name: data.name,
          email: data.email,
          message: `Whitepaper download: ${data.whitepaperTitle}`,
          source: '/knowledge/whitepapers',
        }),
      })
    } catch (e) {
      console.error('Payload unavailable:', e)
    }

    // Resend delivery (graceful failure if placeholder key)
    if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder')) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'noreply@quantumatlas.dev',
          to: data.email,
          subject: `Your guide: ${data.whitepaperTitle}`,
          text: `Hi ${data.name},\n\nThank you for downloading "${data.whitepaperTitle}" from Quantum Atlas.\n\nThe guide will be emailed to you shortly.\n\nTeam Quantum Atlas`,
        })
      } catch (e) {
        console.error('Resend failed:', e)
      }
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
