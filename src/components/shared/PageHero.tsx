interface PageHeroProps {
  eyebrow: string
  heading: string
  body?: string
}

export function PageHero({ eyebrow, heading, body }: PageHeroProps) {
  return (
    <section className="pt-32 pb-16 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
      <div className="max-w-5xl mx-auto">
        <p
          className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {eyebrow}
        </p>
        <h1
          className="font-bold text-text-primary leading-[1.1] mb-6"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}
        >
          {heading}
        </h1>
        {body && (
          <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">{body}</p>
        )}
      </div>
    </section>
  )
}
