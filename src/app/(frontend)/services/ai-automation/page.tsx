import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate'
import type { ServicePageData } from '@/components/templates/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'AI Automation',
  description:
    'LangGraph + n8n workflow automation. Tally ETL, MCP servers, stateful agent graphs. Proven: 15-person team reduced to 2.',
}

const data: ServicePageData = {
  slug: 'ai-automation',
  name: 'AI Automation',
  color: '#FFBF00',
  colorName: 'electric-blue',
  tagline: 'Automate the work, not just the reporting about it.',
  heroMetrics: [
    { value: '15 → 2', label: 'Team size reduction' },
    { value: 'n8n + LangGraph', label: 'Orchestration stack' },
    { value: 'Tally-native', label: 'ERP integration' },
  ],
  problemHeading: 'Most automation tools automate the form, not the function',
  problemBody:
    'Zapier and Make.com automate data copying between APIs. They cannot handle conditional logic, multi-step reasoning, or processes that require judgment. Most enterprise workflows fall into this gap: too complex for simple automation, not complex enough to justify custom software.',
  approachHeading: 'Stateful agent graphs + workflow orchestration for real enterprise processes',
  approachPoints: [
    'LangGraph for stateful agent graphs — handles complex multi-step processes with memory and branching',
    'n8n self-hosted for workflow orchestration — no Zapier dependency, your workflows on your server',
    'MCP server development with safety gates — controlled AI tool use with audit trails',
    'Tally ETL pipelines — extract, transform, and load accounting data for Indian SME workflows',
    'Internal proof: 15-person accounting and HR team reduced to 2 through workflow automation',
    'Pydantic models for all data validation — structured outputs from LLMs enforced at runtime',
  ],
  proofMetrics: [
    { metric: 'Internal team size', before: '15 people', after: '2 people — same throughput' },
    {
      metric: 'Automation approach',
      before: 'Zapier/Make — limited logic',
      after: 'LangGraph — stateful, conditional',
    },
    {
      metric: 'Deployment',
      before: 'Third-party cloud (Zapier)',
      after: 'Self-hosted n8n on your servers',
    },
    { metric: 'ERP integration', before: 'Manual Tally export/import', after: 'Automated ETL pipeline' },
    {
      metric: 'Process documentation',
      before: 'Tribal knowledge',
      after: 'Codified in workflow graphs',
    },
  ],
  techStack: ['LangGraph', 'n8n (self-hosted)', 'Pydantic', 'FastAPI', 'PostgreSQL', 'Redis', 'Python'],
  deploymentOptions: [
    'Self-hosted n8n — your workflows on your server, no vendor lock-in',
    'On-premise — full stack including LangGraph agents on your hardware',
    'Managed — we operate n8n and agents, you own the workflow definitions',
  ],
  pricingNote: 'Project-based scoping. Contact to map your automation opportunities.',
  faqs: [
    {
      q: 'What types of processes are good candidates for automation?',
      a: 'Processes that: repeat frequently, follow defined rules, involve data movement between systems, require document processing, or involve notifications and approvals. Poor candidates: one-off tasks, highly creative work, relationship-dependent decisions.',
    },
    {
      q: 'How is LangGraph different from a simple chatbot or Zapier flow?',
      a: 'LangGraph handles stateful, multi-step processes with branching logic. An agent can collect information across multiple turns, make decisions based on context, call external tools, handle errors gracefully, and resume interrupted processes. Zapier cannot do any of this.',
    },
    {
      q: 'We use Tally for accounting — can you integrate with it?',
      a: 'Yes. We have built Tally ETL pipelines for internal use. We can extract data from Tally, transform it for your downstream systems, and push structured data back into Tally.',
    },
    {
      q: 'What are MCP servers and why do you mention safety gates?',
      a: 'Model Context Protocol servers let AI agents call tools and access external systems. Safety gates are approval steps, rate limits, and permission checks that ensure the AI only does what it is supposed to. Enterprise AI automation requires this — you do not want an agent with unchecked access to your database.',
    },
    {
      q: 'How do you document the automations you build?',
      a: 'Every workflow is version-controlled in Git. n8n workflows are exportable JSON. LangGraph code is documented with inline comments and architecture diagrams. We train your team to understand and modify the workflows.',
    },
  ],
  relatedServices: [
    { name: 'AI Voice Agents', href: '/services/ai-voice-agents', color: '#FFBF00' },
    { name: 'Document Intelligence', href: '/services/document-intelligence', color: '#FFBF00' },
    { name: 'Custom SaaS Dev', href: '/services/saas-development', color: '#FFBF00' },
  ],
}

export default function AIAutomationPage() {
  return <ServicePageTemplate data={data} />
}
