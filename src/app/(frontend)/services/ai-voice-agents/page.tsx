import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate'
import type { ServicePageData } from '@/components/templates/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'AI Voice Agents',
  description:
    'Self-hosted enterprise voice AI at $0.08/minute. Airtel + Jio SIP integration, no Twilio, no ElevenLabs. 4 months in production.',
}

const data: ServicePageData = {
  slug: 'ai-voice-agents',
  name: 'AI Voice Agents',
  color: '#FFBF00',
  colorName: 'electric-blue',
  tagline: 'Voice AI at a tenth of the cost',
  heroMetrics: [
    { value: '$0.08/min', label: 'End-to-end cost' },
    { value: '4 months', label: 'In production' },
    { value: 'Airtel + Jio', label: 'Native SIP' },
  ],
  problemHeading: 'Voice AI costs enterprises too much — or locks them into foreign vendors',
  problemBody:
    'Most enterprise voice AI platforms charge $0.60–$1.00/minute when you stack Twilio, ElevenLabs, and a cloud LLM. Enterprises pay a currency premium on top of that. The result: voice automation that costs more than the human agents it was meant to replace.',
  approachHeading: 'Self-hosted, carrier-native, cost-engineered from the start',
  approachPoints: [
    'Airtel + Jio SIP integration — no Twilio, no international call routing overhead',
    'Deepgram STT/TTS — low latency, enterprise-grade, no ElevenLabs dependency',
    'LangGraph stateful agent graphs — complex multi-step conversations handled correctly',
    'n8n orchestration — connects voice agent to your CRM, ERP, and ticketing systems',
    'Self-hosted LiveKit for WebRTC — no LiveKit Cloud dependency, data stays on your servers',
    'Grafana + Prometheus observability — every call logged, latency monitored, errors alerted',
  ],
  proofMetrics: [
    { metric: 'Cost per minute', before: '$0.60–$1.00/min (market avg)', after: '$0.08/min' },
    {
      metric: 'Deployment model',
      before: 'Third-party cloud (Twilio, ElevenLabs)',
      after: 'Self-hosted on your infrastructure',
    },
    { metric: 'Production duration', before: 'N/A', after: '4+ months, Navbharat Shipping' },
    { metric: 'Call types handled', before: 'Scripted IVR only', after: 'Inbound + outbound, context-aware' },
    { metric: 'Data sovereignty', before: 'Data processed offshore', after: 'All data on-premise' },
  ],
  techStack: [
    'LiveKit (self-hosted)',
    'Deepgram',
    'LangGraph',
    'n8n',
    'Airtel SIP',
    'Jio SIP',
    'Grafana',
    'Prometheus',
    'PostgreSQL',
  ],
  deploymentOptions: [
    'Cloud-hosted — managed by Quantum Atlas on dedicated VPS',
    'On-premise — deployed on your own servers, no external data transfer',
    'Hybrid — SIP carrier on-premise, AI processing in your cloud',
  ],
  pricingNote: 'Per-minute pricing or monthly retainer based on call volume. Contact for enterprise pricing.',
  faqs: [
    {
      q: 'What languages does the voice agent support?',
      a: 'English and Hindi by default. Additional Indian languages can be added based on Deepgram model availability and your use case requirements.',
    },
    {
      q: 'Can it integrate with our existing call center software?',
      a: 'Yes. SIP integration means it works with any SIP-compatible PBX or call center platform. We also build n8n workflows to connect call outcomes to your CRM or ticketing system.',
    },
    {
      q: 'How is the $0.08/minute cost broken down?',
      a: 'Airtel/Jio SIP (~$0.01/min), Deepgram STT/TTS (~$0.03/min), LLM inference (~$0.03/min), infrastructure (~$0.01/min). These are real production numbers from our Navbharat Shipping deployment.',
    },
    {
      q: 'What happens if the AI cannot answer a question?',
      a: 'The agent escalates to a human and logs the unanswered query. We use this data to improve the agent over time. The escalation path is configurable.',
    },
    {
      q: 'How long does deployment take?',
      a: 'Standard deployment: 4–6 weeks from signed agreement to production calls. This includes SIP setup, agent training on your business context, and testing.',
    },
    {
      q: 'Is our call data secure?',
      a: 'All call data is processed on infrastructure you control. With on-premise deployment, audio and transcripts never leave your servers. We do not use your call data for any other purpose.',
    },
  ],
  relatedServices: [
    { name: 'AI Automation', href: '/services/ai-automation', color: '#FFBF00' },
    { name: 'Document Intelligence', href: '/services/document-intelligence', color: '#FFBF00' },
    { name: 'Enterprise RAG', href: '/services/enterprise-rag', color: '#FFBF00' },
  ],
}

export default function AIVoiceAgentsPage() {
  return <ServicePageTemplate data={data} />
}
