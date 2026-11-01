import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { LegalPage, LegalList, legalLinkClass } from '@/components/templates/LegalPage'
import { SITE_URL_EN, enUrl } from '@/lib/site'

const EMAIL = 'contact@quantumatlas.dev'
const HOST = new URL(SITE_URL_EN).host

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for the Quantum Atlas website: site use, intellectual property, AI assistant limits, disclaimers, liability and governing law in India.',
  // No Russian counterpart yet: canonical only, no hreflang pair
  alternates: { canonical: enUrl('/terms') },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms of Service',
  url: enUrl('/terms'),
  inLanguage: 'en',
  isPartOf: { '@type': 'WebSite', name: 'Quantum Atlas', url: enUrl('/') },
}

export default function TermsPage() {
  return (
    <>
      <Script
        id="ld-terms"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LegalPage
        heading="Terms of Service"
        updated="Last updated: November 2026"
        sections={[
          {
            title: 'Acceptance of Terms',
            body: (
              <p>
                By accessing or using the Quantum Atlas website at {HOST} (the “Site”), you agree to be bound
                by these Terms of Service (“Terms”). If you do not agree to these Terms, please do not use the
                Site.
              </p>
            ),
          },
          {
            title: 'Use of the Site',
            body: (
              <>
                <p className="mb-3">You agree to use the Site only for lawful purposes. You must not:</p>
                <LegalList
                  items={[
                    'Use the Site in a way that violates any applicable local, national, or international laws.',
                    'Transmit unsolicited commercial communications.',
                    'Attempt to gain unauthorised access to any part of the Site or its infrastructure.',
                    'Use automated systems to scrape, crawl, or harvest data from the Site, or to send automated or excessive requests to the AI assistant, without written permission.',
                    'Misrepresent your identity or affiliation when submitting inquiries.',
                  ]}
                />
              </>
            ),
          },
          {
            title: 'Intellectual Property',
            body: (
              <>
                <p>
                  All content on the Site, including text, graphics, logos, images, technical descriptions,
                  case studies, and guides, is the property of Quantum Atlas or its licensors and is protected
                  by Indian and international intellectual property laws.
                </p>
                <p className="mt-3">
                  You may view, download, and print content from the Site for your personal, non-commercial
                  use only. You may not reproduce, modify, distribute, or create derivative works from Site
                  content without our prior written consent.
                </p>
              </>
            ),
          },
          {
            title: 'Technical Information and Pricing',
            body: (
              <p>
                Technical data, performance figures, and cost figures (such as per-minute or per-page costs)
                published on this Site are provided for informational purposes only. Actual project
                specifications and pricing are determined case by case following discussion and review of your
                requirements. Nothing on this Site constitutes a binding technical proposal, price quotation,
                or performance guarantee.
              </p>
            ),
          },
          {
            title: 'Inquiries and Proposals',
            body: (
              <p>
                Submitting an inquiry or discovery-call request through the Site does not create a contractual
                obligation on Quantum Atlas to provide services, nor does it constitute a binding offer. All
                project engagements are subject to a separately executed written agreement.
              </p>
            ),
          },
          {
            title: 'AI Assistant',
            body: (
              <>
                <p className="mb-3">
                  The Site includes an AI assistant that answers questions by text and by voice. By using it
                  you accept the following:
                </p>
                <LegalList
                  items={[
                    'Answers are generated automatically and may be inaccurate, incomplete, or out of date.',
                    'The assistant provides general information only. It is not professional, legal, financial, or technical advice, and you should not rely on it as such.',
                    'No contract is formed through the Site or the assistant. Nothing the assistant says is an offer, quotation, or commitment; only a written agreement signed by Quantum Atlas binds us.',
                    'Please do not share sensitive or confidential personal data with the assistant. See our Privacy Policy for how chat and voice data are handled.',
                  ]}
                />
              </>
            ),
          },
          {
            title: 'Disclaimer of Warranties',
            body: (
              <p>
                The Site and its content are provided “as is” and “as available” without warranties of any
                kind, either express or implied. Quantum Atlas does not warrant that the Site or the assistant
                will be uninterrupted, error-free, or free of viruses or other harmful components. We do not
                warrant the accuracy, completeness, or timeliness of any information on the Site.
              </p>
            ),
          },
          {
            title: 'Limitation of Liability',
            body: (
              <p>
                To the fullest extent permitted by applicable law, Quantum Atlas shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising from your use of or
                inability to use the Site, the assistant, or their content, even if Quantum Atlas has been
                advised of the possibility of such damages.
              </p>
            ),
          },
          {
            title: 'Third-Party Links',
            body: (
              <p>
                The Site may contain links to third-party websites. These links are provided for your
                convenience only. Quantum Atlas has no control over the content of third-party sites and
                accepts no responsibility for them or for any loss or damage that may arise from your use of
                them.
              </p>
            ),
          },
          {
            title: 'Privacy',
            body: (
              <p>
                Your use of the Site is also governed by our{' '}
                <Link href="/privacy" className={legalLinkClass}>
                  Privacy Policy
                </Link>
                , which is incorporated into these Terms by reference.
              </p>
            ),
          },
          {
            title: 'Governing Law',
            body: (
              <p>
                {/* OWNER-CONFIRM: governing law (India) and exclusive jurisdiction of the courts of Mumbai, Maharashtra copied from the NWPL terms; confirm for Quantum Atlas */}
                These Terms are governed by and construed in accordance with the laws of India. Any disputes
                arising out of or related to these Terms or the Site shall be subject to the exclusive
                jurisdiction of the courts of Mumbai, Maharashtra.
              </p>
            ),
          },
          {
            title: 'Changes to Terms',
            body: (
              <p>
                We reserve the right to modify these Terms at any time. We will indicate the date of the last
                update at the top of this page. Your continued use of the Site after any changes constitutes
                your acceptance of the new Terms.
              </p>
            ),
          },
          {
            title: 'Contact',
            body: (
              <p>
                For any questions about these Terms, please contact us at{' '}
                <a href={`mailto:${EMAIL}`} className={legalLinkClass}>
                  {EMAIL}
                </a>
                .
              </p>
            ),
          },
        ]}
      />
    </>
  )
}
