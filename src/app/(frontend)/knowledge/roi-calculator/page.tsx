import type { Metadata } from 'next'
import { ROICalculator } from '@/components/tools/ROICalculator'

export const metadata: Metadata = {
  title: 'AI ROI Calculator',
  description: 'Calculate your savings from AI voice agents and document intelligence. Compare vs current costs.',
}

export default function ROICalculatorPage() {
  return (
    <div className="bg-space-dark min-h-screen">
      <section className="pt-32 pb-8 px-6 lg:px-8" style={{ background: '#0C0A08' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-electric-blue text-[11px] tracking-[3px] uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            ROI Calculator
          </p>
          <h1 className="font-bold text-text-primary mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>
            What could you save?
          </h1>
          <p className="text-text-secondary text-lg">
            Based on production costs from our own deployments.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ROICalculator />
        </div>
      </section>
    </div>
  )
}
