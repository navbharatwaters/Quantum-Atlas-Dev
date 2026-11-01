'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'
import { GlobeWrapper } from '@/components/globe/GlobeWrapper'
import { localeHref, type Locale } from '@/lib/i18n'
import { getHome } from '@/content/home'

gsap.registerPlugin()

export function Hero({ locale = 'en' }: { locale?: Locale }) {
  const c = getHome(locale).hero
  const ru = locale === 'ru'
  // Cyrillic words are wider than the Latin headline the layout was drawn for
  const lineSize = ru ? 'text-[38px]' : 'text-[44px]'
  const heroRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(eyebrowRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
        .fromTo(
          headlineRef.current ? Array.from(headlineRef.current.children) : [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
          '-=0.4',
        )
        .fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3')
        .fromTo(
          ctasRef.current ? Array.from(ctasRef.current.children) : [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          '-=0.3',
        )    },
    { scope: heroRef },
  )

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-16 flex items-center"
      style={{ background: '#0C0A08' }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(currentcolor 1px, transparent 1px), linear-gradient(90deg, currentcolor 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Left content */}
      <div className="relative z-10 pl-[6%] max-w-[420px]">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-2 mb-6" style={{ opacity: 0 }}>
          <span
            className="w-[6px] h-[6px] rounded-full bg-electric-blue shrink-0"
            style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
          />
          <span
            className="text-electric-blue uppercase tracking-[3px] text-[11px]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {c.eyebrow}
          </span>
        </div>

        {/* Headline */}
        <h1 ref={headlineRef} className="mb-6 font-normal">
          <span
            className={`block ${lineSize} font-bold leading-[1.08] text-text-primary`}
            style={{ fontFamily: 'var(--font-display)', opacity: 0 }}
          >
            {c.headline[0]}
          </span>
          <span
            className={`block ${lineSize} font-bold leading-[1.08] text-text-primary`}
            style={{ fontFamily: 'var(--font-display)', opacity: 0 }}
          >
            {c.headline[1]}
          </span>
          <span
            className={`block ${lineSize} font-bold leading-[1.08] text-electric-blue${ru ? '' : ' whitespace-nowrap'}`}
            style={{ fontFamily: 'var(--font-display)', opacity: 0 }}
          >
            {c.headline[2]}
          </span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subtitleRef}
          className="text-[15px] text-text-secondary leading-[1.72] mb-8"
          style={{ fontFamily: 'var(--font-body)', opacity: 0 }}
        >
          {c.subtitle}
        </p>

        {/* CTAs */}
        <div ref={ctasRef} className={`flex items-center gap-3 mb-10${ru ? ' flex-wrap' : ''}`}>
          <Link
            href={localeHref(locale, '/contact')}
            className="px-[28px] py-[13px] rounded-[6px] bg-electric-blue text-space-black text-[14px] font-semibold hover:brightness-110 hover:scale-[1.02] transition-all shrink-0"
            style={{ fontFamily: 'var(--font-display)', opacity: 0 }}
          >
            {c.ctaPrimary}
          </Link>
          <Link
            href={localeHref(locale, '/services')}
            className="px-[28px] py-[13px] rounded-[6px] bg-transparent text-text-secondary border border-space-border text-[14px] font-semibold hover:border-electric-blue hover:text-text-primary transition-all shrink-0"
            style={{ fontFamily: 'var(--font-display)', opacity: 0 }}
          >
            {c.ctaSecondary}
          </Link>
        </div>

      </div>

      {/* Globe — right side */}
      <div
        className="absolute"
        style={{
          right: '80px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <GlobeWrapper />
      </div>

      {/* Coordinate tag */}
      <div
        className="absolute bottom-5 text-[10px] tracking-[1.5px] select-none"
        style={{
          right: '3%',
          color: '#3A2E22',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {c.coordinates}
      </div>
    </section>
  )
}
