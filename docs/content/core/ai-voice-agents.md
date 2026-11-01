---
title: AI Voice Agents
slug: /services/ai-voice-agents
metaTitle: Self-Hosted AI Voice Agents for Enterprise
metaDescription: Self-hosted LiveKit voice agents with Deepgram speech, an LLM and a knowledge-base tool. You can talk to ours live on quantumatlas.dev. Book a call.
h1: Self-hosted AI voice agents you can talk to today
answerSummary: A Quantum Atlas voice agent is a real-time speech system built on self-hosted LiveKit, Deepgram speech-to-text and text-to-speech, a language model, and a tool that searches your knowledge base. It runs on infrastructure you control. A working agent is live on quantumatlas.dev for any visitor to try.
schemaType: Service
lastReviewed: 2026-11-01
sources:
  - C:\projects\quantum-atlas\infra\livekit-agent\agent.py
  - C:\projects\quantum-atlas\INFRA.md
  - C:\projects\infrastructure Contabo\INFRASTRUCTURE.md
owner_confirm:
  - "Navbharat Shipping voice agent: production duration, direction (inbound/outbound) and whether it may be cited by name"
  - "Voice: any call-volume or answer-rate figure to publish; permission to name Vobiz as the carrier on the public site"
  - "Any call volume or per-minute cost figure the founder is willing to publish"
---

# Self-hosted AI voice agents you can talk to today

## What is an AI voice agent?

An AI voice agent is software that holds a spoken conversation in real time. It listens, decides what to say, calls tools when it needs facts, and answers aloud.

Ours runs on self-hosted LiveKit with Deepgram for speech and a language model for reasoning. You can try it now: open quantumatlas.dev and press the voice button.

## How does a Quantum Atlas voice agent work?

**Direct answer:** Audio streams from the caller into a LiveKit room. Deepgram converts speech to text, a language model decides the reply, and Deepgram converts the reply back to speech. When the caller asks a factual question, the agent calls a knowledge-base tool and answers from retrieved passages, not from memory.

That loop repeats for every turn. Because the media server is ours, not a hosted service, audio and transcripts stay on infrastructure we run for you.

### The call flow in six steps

1. The caller joins a LiveKit room from the browser, an app, or (where scoped) a phone line.
2. The agent worker, a Python process built with the LiveKit Agents framework, joins the same room.
3. Deepgram speech-to-text transcribes the caller as they speak.
4. The language model reads the transcript, the system prompt and any tool results, then writes a reply.
5. If the question needs facts, the model calls the knowledge-base tool. That tool sends a hybrid search request to a retrieval API and receives the top passages.
6. Deepgram text-to-speech speaks the reply back into the room. The loop continues until the caller leaves or goes silent.

## What does the live agent on quantumatlas.dev prove?

**Direct answer:** It proves the full loop works outside a lab: self-hosted LiveKit, streaming speech in both directions, a language model, and a working knowledge-base tool with a bounded timeout and a graceful fallback when retrieval fails. The phone-calling stack, which runs on an Indian carrier, is described separately below. We do not publish call volumes.

The agent is one deployment on our own VPS. The same worker pattern is what we would configure for your use case, with your knowledge base behind the tool.

## What can a voice agent do for an enterprise?

**Direct answer:** It can answer repeat questions, qualify callers, collect structured details, and hand off to a person with the transcript attached. It works best where calls are predictable, the answers live in documents you already hold, and a wrong answer can be caught and corrected.

Typical scopes we discuss:

- **Inbound enquiry handling.** Shipment status, opening hours, document requirements, policy questions answered from your own documents.
- **Qualification and intake.** The agent asks a fixed set of questions and writes the answers to your CRM or a Postgres table.
- **Appointment and callback booking.** The agent checks availability through an API and confirms a slot.
- **Outbound notifications.** Delivery updates or reminders, where the call is short and the script is tightly controlled.

We scope each one against what we have built. If a use case needs something we have not run in production, we say that in the first call.

## How is this different from VAPI, Retell or Bland?

**Direct answer:** Hosted voice platforms bundle telephony, speech and orchestration into one metered service. We run the same loop on open components you own. The trade-off is simple: hosted platforms are faster to start, ours is cheaper to own at volume and keeps data in your environment.

| Question | Hosted voice platform | Quantum Atlas self-hosted agent |
|---|---|---|
| Where does audio go? | The vendor's cloud | Your infrastructure or ours, as agreed |
| Who owns the orchestration code? | The vendor | You |
| Can you change the speech or language model? | Within the vendor's list | Yes, swap the provider in the worker |
| Time to a first prototype | Hours | Days to weeks |
| Per-minute pricing exposure | Vendor-set, can change | Provider usage costs you can see |
| On-premise or air-gapped | Generally no | Available on request: media, orchestration and, where required, the speech and language models run on your own servers |
| Operational burden | Low | You or we run it |

Speech and language-model APIs are still third-party services unless you choose self-hosted models. We will tell you which components leave your network before you sign.

## How we deliver it

**Direct answer:** We deliver in four stages: call design, build, evaluation on real conversations, then a monitored rollout. The architecture is a LiveKit media server, an agent worker, a retrieval service and observability, all containerised.

The architecture in words:

- **Media layer.** A self-hosted LiveKit server handles real-time audio. Caddy terminates TLS in front of it.
- **Agent worker.** A Python worker uses the LiveKit Agents framework. It holds the system prompt, the speech and language-model plugins, and the tools.
- **Speech.** Deepgram provides streaming speech-to-text and text-to-speech.
- **Knowledge tool.** A function tool calls your retrieval API with a hybrid search request. It has a five-second timeout and returns a safe fallback if retrieval fails, so the agent never hangs a call.
- **Orchestration.** For multi-step flows, LangGraph or n8n sit behind the tools. The agent calls them like any other function.
- **Observability.** Prometheus and Grafana track the fleet; call transcripts are stored for review.

The knowledge tool can sit on top of our [enterprise RAG system](/services/enterprise-rag), so the agent answers with the same cited sources a human analyst would use.

## What you own

- **Your data.** Transcripts, recordings (if you enable them) and extracted fields live in your Postgres.
- **Your code.** The agent worker, prompts, tool definitions and deployment files are delivered to you.
- **Your infrastructure.** Deploy on your servers, a cloud account you control, or our managed hosting. You can move between them.
- **Your provider choices.** The speech and language-model providers are configuration, not contract.

## What does a voice agent project involve?

**Direct answer:** It starts with a discovery call, then a written scope. We do not build before the scope names the call types, the data the agent may touch, and the handoff rules.

1. **Discovery call.** We listen to how calls work today and what you want changed.
2. **Call design.** We write the conversation flows, the tools and the limits on what the agent may say.
3. **Build.** We configure the worker, connect your knowledge base and any APIs.
4. **Evaluation.** We run recorded and scripted calls and review every failure with you.
5. **Pilot.** A limited rollout with human review.
6. **Operate.** Monitoring, prompt updates and cost reporting.

## When it is not the right fit

- You need a phone number answering tomorrow. Telephony is not something we have proven in production, and we will not promise it. Scope it with us first.
- Your calls are open-ended, emotionally sensitive or legally binding. Keep a person on the line.
- You have no documents or data for the agent to draw on. An agent with nothing to look up will guess, and we will not ship that.
- You want the cheapest possible bot. We build to be reliable, not to be the lowest quote.
- You need a formally certified compliance regime. We hold no security certifications and will not imply otherwise.

## Frequently asked questions

### Can I try the voice agent before I talk to you?

Yes. Open quantumatlas.dev and use the voice control in the chat widget. It connects to our self-hosted LiveKit server and uses Deepgram for speech. Try difficult questions. It is a real deployment, not a recording, and its limits are part of what we want you to see.

### Do you support phone calls from Airtel, Jio or other carriers?

Yes. We run phone calling on an Indian carrier, Vobiz, with Indian-language speech (Sarvam for speech-to-text and text-to-speech) and a Gemini Flash model. Indian numbers must keep call media inside India, so telephony is deployed on India-hosted servers. We scope carrier, numbers and registration with you before any commitment. We do not publish call volumes. [OWNER-CONFIRM: any call-volume or answer-rate figure you want published]

### Where does the audio and transcript data go?

Audio flows through a LiveKit server that is self-hosted. Speech-to-text and text-to-speech use Deepgram's API, and the reply uses a language-model API, unless you choose to host those models too. We document each external call in your architecture sheet so your security team can review it.

### Can the agent answer from our own documents?

Yes. The agent calls a knowledge-base tool that runs a hybrid keyword and vector search over your documents and answers from the passages returned. If nothing relevant comes back, it says so instead of inventing an answer. Quality depends on how clean and complete your documents are.

### What happens when the agent does not know the answer?

It tells the caller it does not have that information, and, where configured, offers a handoff or a callback. The knowledge tool also fails safe. If retrieval times out, the agent says it cannot retrieve the information right now instead of improvising.

### Can it speak Hindi and other Indian languages?

Language support depends on the speech and language-model providers we configure. We test each language against real recordings before agreeing to it. We will not promise a language until it passes that test with your call types.

### How do you measure whether the agent is good enough?

We replay recorded and scripted calls, mark each turn as correct, partly correct or wrong, and review every wrong turn with you. We agree acceptance criteria in the scope. The pilot then runs with human review before the agent handles anything alone.

### Can the agent run fully on-premise?

The media server, agent worker and retrieval can run in your data centre. Speech and language models are the open question: hosted APIs need internet access, and self-hosted models need GPUs and carry their own accuracy trade-offs. We lay out both options in the scope.

## Next step

Talk to the live agent, then [book a discovery call](/contact). We will tell you straight whether a voice agent suits your calls.
