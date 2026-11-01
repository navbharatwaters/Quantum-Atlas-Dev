import type { Metadata } from 'next'
import Script from 'next/script'
import { LegalPage, LegalList, legalLinkClass } from '@/components/templates/LegalPage'
import { SITE_URL_EN, enUrl } from '@/lib/site'

const EMAIL = 'contact@quantumatlas.dev'
const HOST = new URL(SITE_URL_EN).host

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Quantum Atlas: what data our forms, AI chat assistant and voice agent collect, how we use and share it, retention, and your rights.',
  // No Russian counterpart yet: canonical only, no hreflang pair
  alternates: { canonical: enUrl('/privacy') },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy',
  url: enUrl('/privacy'),
  inLanguage: 'en',
  isPartOf: { '@type': 'WebSite', name: 'Quantum Atlas', url: enUrl('/') },
}

const emailLink = (
  <a href={`mailto:${EMAIL}`} className={legalLinkClass}>
    {EMAIL}
  </a>
)

export default function PrivacyPage() {
  return (
    <>
      <Script
        id="ld-privacy"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LegalPage
        heading="Privacy Policy"
        updated="Last updated: November 2026"
        sections={[
          {
            title: 'Who We Are',
            body: (
              <p>
                {/* OWNER-CONFIRM: registered legal entity name and registration details; none are stated on purpose */}
                Quantum Atlas (“Quantum Atlas”, “we”, “us”, or “our”) is an enterprise AI implementation
                company operating from India. We operate this website at {HOST} (the “Site”) to provide
                information about our services and to enable prospective clients to contact us.
              </p>
            ),
          },
          {
            title: 'Information We Collect',
            body: (
              <>
                <p className="mb-3">We collect information you provide directly to us:</p>
                <LegalList
                  items={[
                    'Contact and discovery-call form: your name, company name, email address, phone number (optional), the service you are interested in, and your message.',
                    'Guide (whitepaper) requests: your name, work email address, and the title of the guide you requested.',
                    'AI chat assistant: the messages you type (up to 1,000 characters each) and the few messages before them in the same conversation.',
                    'Voice sessions with our AI voice assistant: your voice, streamed from your microphone while the session is active, and the transcript of what is said.',
                  ]}
                />
                <p className="mt-4">
                  We also process certain technical information automatically. To limit abuse of the chat
                  assistant, your IP address is held in our server’s memory for up to 10 minutes to count
                  messages. {/* OWNER-CONFIRM: web server/proxy access logs (IP address, time, page requested) are kept by default; confirm log retention period */}
                  Like most web servers, ours also keep standard technical logs such as IP address, time, and
                  pages requested.
                </p>
              </>
            ),
          },
          {
            title: 'AI Assistant and Voice Agent',
            body: (
              <>
                <p className="mb-3">
                  The Site includes an AI assistant that answers questions by text and by voice. It is an
                  automated system, not a person.
                </p>
                <LegalList
                  items={[
                    'Text chat: your message, and up to six earlier messages from the same conversation for context, are sent to our AI provider, OpenRouter, which routes the request to a large language model provider to generate the reply. Our chat service does not store the conversation; it is kept in your browser page only and disappears when you close or reload the page.',
                    'Voice: audio from your microphone (only after you allow it in your browser) is streamed over an encrypted connection to our self-hosted LiveKit server. Our speech provider, Deepgram, converts speech to text and text to speech, and the reply text is generated through OpenRouter as described above.',
                    // OWNER-CONFIRM: the voice agent writes transcripts to its operational server logs (agent.py); confirm how long these logs are kept and whether any audio is recorded at server level
                    'Our voice agent writes the transcript of the conversation to its operational server logs, which we use for monitoring and debugging.',
                    'Please do not enter sensitive or confidential personal data (such as identity numbers, payment details, health or financial information) into the chat or say it in a voice session.',
                    'The assistant can make mistakes. Its answers are general information only, and you should confirm anything important with our team.',
                  ]}
                />
              </>
            ),
          },
          {
            title: 'How We Use Your Information',
            body: (
              <LegalList
                items={[
                  'To respond to your inquiries and discuss your project.',
                  'To send requested guides and documents.',
                  'To answer your questions through the AI assistant.',
                  'To keep the Site and the assistant secure, prevent abuse, and fix problems.',
                  'To improve our services and the assistant’s answers.',
                  'To comply with applicable legal obligations.',
                ]}
              />
            ),
          },
          {
            title: 'Legal Basis for Processing',
            body: (
              <p>
                {/* OWNER-CONFIRM: legal basis wording and statutes (IT Act 2000, DPDP Act 2023) copied from the NWPL policy; confirm with counsel */}
                We process your personal data on the following bases: (a) your consent, where explicitly
                provided; (b) the legitimate interest of responding to business inquiries and improving our
                services; and (c) compliance with applicable Indian law, including the Information Technology
                Act, 2000 and the Digital Personal Data Protection Act, 2023.
              </p>
            ),
          },
          {
            title: 'Data Sharing',
            body: (
              <p>
                {/* OWNER-CONFIRM: "contractual confidentiality obligations" copied from the NWPL policy; confirm agreements with providers are in place */}
                We do not sell, rent, or trade your personal information. We may share data with trusted
                service providers who help us operate the Site and the assistant: email delivery, AI model
                routing (OpenRouter and the language model providers it uses), speech processing (Deepgram),
                and hosting infrastructure, subject to contractual confidentiality obligations. We may
                disclose information if required by law or to protect our legal rights.
              </p>
            ),
          },
          {
            title: 'Cookies',
            body: (
              <p>
                The Site does not use analytics, advertising, or tracking cookies or scripts, and web fonts are
                served from our own domain. If we add analytics in the future, we will update this policy
                first. You can still control or delete any data your browser stores for the Site through your
                browser settings.
              </p>
            ),
          },
          {
            title: 'Data Retention',
            body: (
              <p>
                {/* OWNER-CONFIRM: retention period of up to 5 years copied from the NWPL policy; confirm for Quantum Atlas */}
                We retain personal data for as long as necessary to fulfil the purposes for which it was
                collected, or as required by applicable law. Inquiry and guide-request data is retained for up
                to 5 years for business records. Operational logs, including voice-session transcripts, are
                kept no longer than needed for monitoring, debugging, and security. You may request deletion
                of your data at any time (see Section 9).
              </p>
            ),
          },
          {
            title: 'Your Rights',
            body: (
              <>
                <p className="mb-3">You have the right to:</p>
                <LegalList
                  items={[
                    'Access the personal data we hold about you.',
                    'Request correction of inaccurate data.',
                    'Request deletion of your personal data.',
                    'Withdraw consent where processing is based on consent.',
                    // OWNER-CONFIRM: regulator named generically as in the NWPL policy; name the Data Protection Board of India or another body if desired
                    'Lodge a complaint with the relevant data protection authority.',
                  ]}
                />
                <p className="mt-4">To exercise any of these rights, please contact us at {emailLink}.</p>
              </>
            ),
          },
          {
            title: 'Security',
            body: (
              <p>
                We implement appropriate technical and organisational measures to protect your personal data
                against unauthorised access, loss, or disclosure. However, no internet transmission is
                completely secure and we cannot guarantee the absolute security of data sent over the
                internet.
              </p>
            ),
          },
          {
            title: 'Changes to This Policy',
            body: (
              <p>
                We may update this Privacy Policy from time to time. We will notify you of material changes by
                updating the date at the top of this page. Your continued use of the Site after any changes
                constitutes acceptance of the updated policy.
              </p>
            ),
          },
          {
            title: 'Contact Us',
            body: (
              <>
                <p>For any questions about this Privacy Policy or our data practices, please contact:</p>
                <div
                  className="mt-4 p-5 rounded-lg"
                  style={{ background: '#12100D', border: '1px solid #2E261F' }}
                >
                  <p className="font-semibold text-text-primary">Quantum Atlas</p>
                  <p className="text-sm mt-1">India</p>
                  <p className="text-sm">Email: {emailLink}</p>
                </div>
              </>
            ),
          },
        ]}
      />
    </>
  )
}
