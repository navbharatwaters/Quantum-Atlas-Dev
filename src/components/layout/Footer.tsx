import Link from 'next/link'

const serviceLinks = [
  { label: 'AI Voice Agents', href: '/services/ai-voice-agents' },
  { label: 'Document Intelligence', href: '/services/document-intelligence' },
  { label: 'Enterprise RAG', href: '/services/enterprise-rag' },
  { label: 'Custom SaaS Dev', href: '/services/saas-development' },
  { label: 'AI Automation', href: '/services/ai-automation' },
  { label: 'Content & Video', href: '/services/content-video' },
]

const industryLinks = [
  { label: 'Government', href: '/industries/government' },
  { label: 'Logistics & Shipping', href: '/industries/logistics-shipping' },
  { label: 'Fintech & BFSI', href: '/industries/fintech-bfsi' },
  { label: 'Legal', href: '/industries/legal' },
  { label: 'Manufacturing', href: '/industries/manufacturing' },
  { label: 'Healthcare', href: '/industries/healthcare' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Knowledge Hub', href: '/knowledge' },
  { label: 'Case Studies', href: '/knowledge/case-studies' },
  { label: 'Contact', href: '/contact' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
]

export function Footer() {
  return (
    <footer
      className="bg-space-black border-t border-space-border"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-text-primary font-display font-semibold text-lg tracking-wide block mb-4 hover:text-electric-blue transition-colors"
            >
              QUANTUM ATLAS
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              Production-grade AI for enterprises. Every system runs in our own
              companies before we sell it.
            </p>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h3 className="text-text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div className="lg:col-span-1">
            <h3 className="text-text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
              Industries
            </h3>
            <ul className="space-y-2.5">
              {industryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-1">
            <h3 className="text-text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-1">
            <h3 className="text-text-primary text-sm font-semibold mb-4 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-space-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">
            &copy; 2026 Quantum Atlas. All rights reserved.
          </p>
          <a
            href="mailto:contact@quantumatlas.dev"
            className="text-text-secondary text-sm hover:text-text-primary transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            contact@quantumatlas.dev
          </a>
        </div>
      </div>
    </footer>
  )
}
