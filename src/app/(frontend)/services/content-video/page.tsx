import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate'
import type { ServicePageData } from '@/components/templates/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'AI Content & Video Production',
  description:
    'ComfyUI-powered digital avatars, lipsync, virtual try-on, long video generation. Tavus integration. Enterprise content production at scale.',
}

const data: ServicePageData = {
  slug: 'content-video',
  name: 'AI Content & Video',
  color: '#FFBF00',
  colorName: 'electric-blue',
  tagline: 'Enterprise video at scale, without a studio.',
  heroMetrics: [
    { value: 'ComfyUI', label: 'Production pipeline' },
    { value: 'Avatars', label: 'Digital presenter' },
    { value: 'One vendor', label: 'End-to-end' },
  ],
  problemHeading: 'Enterprise video production is slow, expensive, and does not scale',
  problemBody:
    'Traditional video production requires studios, crews, and weeks of post-production for content that may only be used once. Training videos, product demos, and multilingual content are perpetually delayed or never made because the cost-to-impact ratio makes them impractical.',
  approachHeading: 'ComfyUI-native pipeline for enterprise video at production scale',
  approachPoints: [
    'ComfyUI for end-to-end video generation — digital avatars, lipsync, virtual try-on, face identity preservation',
    'PuLID face identity for consistent presenter appearance across all content',
    'FramePack for long-form video generation — not limited to 10-second clips',
    'Tavus integration for scalable personalized video at volume',
    'Adobe Premiere post-production for final quality control',
    'Inpainting and upscaling for existing asset enhancement',
  ],
  proofMetrics: [
    { metric: 'Production speed', before: 'Weeks (traditional studio)', after: 'Days (AI pipeline)' },
    {
      metric: 'Cost per video',
      before: 'High (crew + studio + post)',
      after: 'Fraction — no crew required',
    },
    {
      metric: 'Language variants',
      before: 'One language (re-shoot required)',
      after: 'Multiple — same avatar, dubbed',
    },
    {
      metric: 'Brand consistency',
      before: 'Varies by shoot/crew',
      after: 'Consistent via face identity',
    },
    {
      metric: 'Scale capability',
      before: 'Linear with headcount',
      after: 'Parallel — batch production',
    },
  ],
  techStack: ['ComfyUI', 'Tavus', 'PuLID', 'FramePack', 'Adobe Premiere', 'Stable Diffusion', 'Deepgram TTS'],
  deploymentOptions: [
    'Project-based — we produce the content, you receive final assets',
    'Managed pipeline — your content brief, our production, ongoing relationship',
    'License + training — we set up the ComfyUI pipeline on your hardware and train your team',
  ],
  pricingNote: 'Per-project pricing based on content volume and complexity. Contact to discuss scope.',
  faqs: [
    {
      q: 'Can the digital avatar look like a specific person?',
      a: 'Yes. PuLID face identity preservation creates a consistent presenter from reference photos. The avatar can be a real employee, a branded spokesperson, or a synthesized persona. Legal and consent requirements are your responsibility for real individuals.',
    },
    {
      q: 'What is the video quality output?',
      a: 'We produce at 1080p minimum, 4K on request. Adobe Premiere post-production ensures broadcast-quality output. The AI generation step and the post-production step are separate — we do not ship raw AI output as the final product.',
    },
    {
      q: 'Can you produce training videos in multiple Indian languages?',
      a: 'Yes. The avatar video is generated in English, then audio is dubbed in target languages using Deepgram TTS or human voice artists. Lip sync is re-applied to match the dubbed audio.',
    },
    {
      q: 'Is this a standalone service or bundled with other services?',
      a: 'Both. We offer it standalone for enterprises that need video production. We also bundle it with other services — for example, RAG-powered voice agents combined with video training content for enterprise onboarding programs.',
    },
    {
      q: 'What file formats do you deliver?',
      a: 'MP4 (H.264) for web and email distribution. MOV (ProRes) for broadcast or archival. SCORM packages for LMS integration on request.',
    },
  ],
  relatedServices: [
    { name: 'AI Voice Agents', href: '/services/ai-voice-agents', color: '#FFBF00' },
    { name: 'AI Automation', href: '/services/ai-automation', color: '#FFBF00' },
    { name: 'Custom SaaS Dev', href: '/services/saas-development', color: '#FFBF00' },
  ],
}

export default function ContentVideoPage() {
  return <ServicePageTemplate data={data} />
}
