import Link from 'next/link'

interface ContentCardProps {
  href: string
  /** Optional 20px icon shown above the label/title (amber) */
  icon?: React.ReactNode
  /** Top mono label — category / date / read-time line */
  label?: string
  title: string
  description?: string
  /** Secondary mono info rendered below description (e.g. service tagline) */
  meta?: string
}

export function ContentCard({ href, icon, label, title, description, meta }: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col h-full p-6 rounded-xl border border-[#2E261F] hover:border-[#42352A] motion-safe:hover:-translate-y-px transition-all"
      style={{ background: '#171411', borderRadius: '12px' }}
    >
      {icon && (
        <div className="mb-3 text-electric-blue" aria-hidden="true">
          {icon}
        </div>
      )}
      {label && (
        <span
          className="block text-[11px] uppercase mb-2"
          style={{ letterSpacing: '0.14em', color: '#A8998A', fontFamily: 'var(--font-mono)' }}
        >
          {label}
        </span>
      )}
      <h2
        className="font-semibold text-text-primary mb-2"
        style={{ fontFamily: 'var(--font-display)', fontSize: '17px' }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-[14px] text-text-secondary leading-[1.65] grow">{description}</p>
      )}
      {meta && (
        <p
          className="text-[11px] mt-2"
          style={{ color: '#A8998A', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}
        >
          {meta}
        </p>
      )}
      <p className="mt-auto pt-4 text-[14px] font-medium" style={{ color: '#FFBF00' }}>
        Learn more{' '}
        <span
          className="inline-block transition-transform motion-safe:group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </p>
    </Link>
  )
}
