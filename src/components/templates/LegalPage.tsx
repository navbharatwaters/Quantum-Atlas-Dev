import type { ReactNode } from 'react'
import Link from 'next/link'
import { PageHero } from '@/components/shared/PageHero'

export interface LegalSection {
  title: string
  body: ReactNode
}

/** Bulleted list with amber dots, used inside legal sections. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2 pl-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-base">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-blue mt-2.5 shrink-0" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Shared layout for Privacy Policy / Terms of Service. Sections are numbered automatically. */
export function LegalPage({
  heading,
  updated,
  sections,
}: {
  heading: string
  updated: string
  sections: LegalSection[]
}) {
  return (
    <div className="bg-space-dark min-h-screen">
      <PageHero eyebrow="Legal" heading={heading} body={updated} />
      <section className="px-6 lg:px-8 pb-24" style={{ background: '#0C0A08' }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="p-8 md:p-12 space-y-8 text-text-secondary text-base leading-[1.8]"
            style={{ background: '#171411', border: '1px solid #2E261F', borderRadius: 12 }}
          >
            {sections.map((s, i) => (
              <div key={s.title}>
                <h2
                  className="text-xl font-bold text-text-primary mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {i + 1}. {s.title}
                </h2>
                {s.body}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/" className="text-electric-blue text-sm hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export const legalLinkClass = 'text-electric-blue underline underline-offset-2'
