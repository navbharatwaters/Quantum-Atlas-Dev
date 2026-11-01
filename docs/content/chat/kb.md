---
title: "Quantum Atlas Chat and Voice Knowledge Base"
slug: chat-kb
type: assistant-knowledge-base
audience: website chat assistant and voice assistant (retrieval source)
version: 1.0
lastReviewed: 2026-11-01
owner_confirm:
  - "Secondary service 'AI content and video production' (KB-06): confirm wording and whether to keep it in the assistant's scope"
  - "Whether the assistant may state team size, founding year, office location or company registration details (none included)"
  - "Typical discovery-call response time (KB-14 says only that the team replies; add a stated time if the owner commits to one)"
  - "Data-retention period for chat and voice transcripts (KB-11 says retention is set by policy; add the actual period)"
  - "Which model providers process chat and voice text today, to state the data position precisely (KB-11)"
---

# Quantum Atlas Chat and Voice Knowledge Base

How to use this file: each section has an ID such as KB-03. The assistant must cite the section ID it used. Answers come only from this file. If a question is not covered, follow KB-15.

Domain: https://quantumatlas.dev. The company site is only quantumatlas.dev. Any other domain is not ours.

---

## KB-01. What is Quantum Atlas?

Quantum Atlas is an enterprise AI implementation studio. We design, build and run AI systems for organisations that need them to work in production: knowledge search with citations, document processing, voice agents, custom software and workflow automation.

We are a services company with productised building blocks. We are not a software subscription you sign up for online. Most engagements begin with a conversation about a specific problem.

Our approach: we build components we can show running, we say what is built and what is not, and we avoid promises we cannot back with evidence.

## KB-02. What services does Quantum Atlas offer?

Five core service areas and one supporting area:

1. AI voice agents (KB-03)
2. Intelligent document processing and contract intelligence (KB-04)
3. Enterprise RAG and knowledge systems (KB-05)
4. Custom AI software development (KB-07)
5. AI automation and workflow engineering (KB-08)
6. Supporting: AI content and video production (KB-06)

If someone asks "what do you do?", give the one-sentence answer from KB-01 and offer to explain any of these.

## KB-03. AI voice agents

What it is: a voice assistant that holds a spoken conversation, answers from a defined knowledge source and hands over to a person when it cannot help.

How ours works: a self-hosted LiveKit server carries the audio. Deepgram handles speech-to-text and text-to-speech. A language model decides what to say. A knowledge-lookup tool retrieves passages from a knowledge base for factual questions. The agent allows interruptions and disconnects after 60 seconds of silence from the user.

What is running: the voice assistant on this website is our own agent built this way, serving visitors through the browser.

What we do not say: we do not make claims here about telephone-line deployments, call volumes or per-minute pricing. For anything about phone channels or cost, pass the question to the team (KB-15).

Good fits: answering routine questions, booking and scheduling, first-line support with escalation, notifications.

Poor fits: situations needing legal advice, emotional support or high-stakes decisions without a person involved.

## KB-04. Intelligent document processing and contract intelligence

What it is: turning documents such as invoices, bills of lading, bills of entry, certificates, contracts and forms into structured data, with checks and review.

Layers we work in:

- Extraction: pulling structured fields from documents.
- Document intelligence: working across a document or a set, for example clause extraction, obligation and deadline tracking, risk flags and question answering over a contract collection.
- Workflow integration: sending data to the systems that use it, such as accounting or ERP, through APIs or automation flows.

What we have built: a document pipeline for shipping and trade documents. An earlier flow built in n8n using OCR and a language model took about 120 seconds for a three-page document. A newer Python service built on LangGraph and Google Document AI took about 8 seconds for a three-page document in our tests. These are timings on our own test documents, not guarantees for yours. Some parts of the newer design, such as splitting multi-document files and classifying document types, are specified but not yet finished.

Data position: the Google Document AI pipeline is a cloud service, so documents are sent to Google in that design. Where a client needs documents to stay on their own servers, a different engine would be chosen and discussed up front.

We do not publish a general accuracy figure. Accuracy depends on the documents. We measure on a client's own samples.

## KB-05. Enterprise RAG and knowledge systems

What it is: RAG (retrieval-augmented generation) lets an AI answer questions from your own documents and show where each answer came from.

How ours works:

- One PostgreSQL database holds the documents' text passages, vector embeddings, a keyword index and the access rules.
- Hybrid retrieval combines keyword search (BM25 through ParadeDB) and vector search (pgvector), and merges the results with reciprocal rank fusion. A re-ranker can reorder the shortlist.
- Answers cite the document and passage.
- Multiple tenants share the platform but are separated by PostgreSQL row-level security. Document access levels (public, internal, confidential, restricted), groups and sharing decide who can read what, and a document someone cannot read is treated as not found.
- Query traces can be recorded for audit with self-hosted tooling.
- Models for embeddings and re-ranking can be self-hosted.

Deployment: managed, in a client's own cloud account, or on-premise. On-site deployment is available when a client requires it, including air-gapped environments with locally hosted models. The capability trade-off is tested on the client's own questions during scoping.

We do not publish retrieval-accuracy numbers, because results depend on the documents and questions.

Good fits: policy and regulation search, internal knowledge bases, legal and compliance libraries.

## KB-06. Supporting service: AI content and video production

Quantum Atlas can support AI-assisted content and video production as a secondary service for clients who want a single supplier. This is not our focus. If someone asks for details, say it is a supporting service and pass the question to the team (KB-15).

## KB-07. Custom AI software development

What it is: purpose-built web applications with AI features, designed for several organisations or teams (multi-tenant) with sign-in and billing where needed.

Typical stack: Next.js on the front end, FastAPI and PostgreSQL behind it, containers for deployment. Authentication and billing providers are chosen with the client.

What we have built: our own platforms, including a customs-filing support system for import documents, a tender monitoring system and a multi-tenant RAG platform. We describe what we built when asked, without naming any client.

Engagement style: project-based with a defined scope. We do not start building before a specification is agreed.

## KB-08. AI automation and workflow engineering

What it is: connecting steps, systems and AI models into reliable workflows.

Tools we use: n8n for workflow automation (self-hosted), LangGraph for stateful AI agent flows, Pydantic for strict data validation, and MCP servers for connecting AI tools to systems with safety checks.

An example we can describe: a nightly tender monitoring system that reads active tender lists on 20 Indian government e-procurement portals, scores them with a keyword model, stores them in PostgreSQL and posts a morning digest. The last full run read 54,526 tenders from 20 portals with no failures. That number is the size of the lists it reads, not the number of new tenders each day. It does not bypass CAPTCHAs. Tender documents that sit behind a CAPTCHA are fetched manually.

Another example: a customs-filing support system that extracts data from import documents, computes duty line by line, produces a client-approvable checklist and prepares export files shaped to ICEGATE's schema. It supports a licensed customs professional. It does not file on its own, and we do not claim that any file is accepted by ICEGATE.

## KB-09. How does an engagement work?

Typical stages:

1. Discovery call. A conversation about the problem, the documents or data involved, and any constraints on where data can live. No obligation.
2. Scoping. We write down what will be built, what will not, how success is measured and what the deployment model is.
3. Specification. A written plan agreed before building starts.
4. Build in stages, with review at each stage.
5. Testing on the client's own data, with measured results.
6. Deployment and handover, with documentation.
7. Ongoing support or maintenance, if wanted.

Rules we follow: we do not promise what is not built and tested, we do not start without a specification, and we say plainly when something is not a good fit.

Prices and timelines: the assistant does not quote either. Both depend on scope and are given by the team in writing after a discovery call (KB-15).

## KB-10. Deployment models

- Managed by us: we host and operate the system for the client.
- In the client's own cloud account: the client owns the account; we deploy and can operate it.
- On-premise: on the client's servers, inside their network.
- Air-gapped: no outside network access; software and models are installed from transferred media. This needs locally hosted models and an offline update process.

Which fits depends on the data. The assistant should ask whether documents can leave the client's environment, and if the answer is unclear, suggest a discovery call.

## KB-11. Data ownership and handling

- Clients own their data. We do not claim rights to client documents or outputs.
- We favour open, standard technology such as PostgreSQL so that data stays in ordinary tables and can be exported. We flag any vendor dependency in a design.
- Data position is decided per project. Some designs call out to cloud services; for example the Google Document AI pipeline sends documents to Google. We say so when it applies.
- On-premise and air-gapped designs keep document text and queries inside the client's environment.
- Retention and deletion terms are agreed in the project. Ask the team for specifics.
- The website chat and voice assistants process what a visitor types or says. Visitors should not share confidential or personal information in the chat. For handling details, ask the team.

## KB-12. Security stance

What we do:

- Access control is enforced in the database for our RAG platform, and fails closed: if no identity is set, no documents are returned.
- Different access levels and groups for documents, with administrative actions recorded.
- Separate roles for managing the database and for running the application.
- Tests for data leakage between users, run against a real database.
- Self-hosted tooling where a client needs data to remain in their environment.

What we do not say:

- We do not claim any security certification or audit report.
- We do not claim that any system is unbreakable or that errors cannot occur.

If asked about certificates, penetration tests or compliance frameworks, say we make no claims here and pass the question to the team (KB-15).

## KB-13. What Quantum Atlas does not claim

The assistant must not state or imply any of the following:

- Prices or rates of any kind, including per minute or per page.
- Delivery times or project timelines.
- Names of clients, partners or prospects.
- Call volumes, customer counts or staff-reduction figures.
- Certifications, accreditations or audit results.
- Accuracy percentages, except where this file gives a specific, qualified figure.
- That any file has been accepted by ICEGATE or any authority.
- Call volumes, answer rates or accuracy for phone calling. State only that phone calling runs on an Indian carrier (Vobiz) with Sarvam speech and a Gemini Flash model; indicative AI cost in our tests is about 3 rupees per minute, carrier charges extra, never a quote.
- That AI output is always correct. It can be wrong and should be checked.

If a visitor says "I heard you did X for Y", the assistant neither confirms nor denies. It says it cannot discuss client relationships and offers a discovery call.

## KB-14. How to book a discovery call

The discovery call is a conversation, not a sales presentation. To book, go to https://quantumatlas.dev/contact and fill in the form or choose a time.

Useful things to bring: a description of the problem, a few sample documents or an example of the data, any rules about where data can be stored, and who needs to approve the project.

After booking, the team replies. The assistant should not promise a specific response time.

For a voice session, the assistant should say the web address clearly and briefly: "quantum atlas dot dev, slash contact".

## KB-15. Escalation rules

The assistant passes the question to the team and suggests a discovery call when:

1. The question is about price, cost, quotes, discounts or contracts.
2. The question is about delivery dates, timelines or availability.
3. The question asks about a named client, partner or prospect.
4. The question concerns certifications, legal terms, compliance obligations or security audits.
5. The knowledge base does not cover the topic, or the assistant is not sure.
6. The visitor is upset, urgent, or reports a problem with an existing system.
7. The visitor asks to speak to a person.
8. The visitor wants technical advice specific to their environment.

What to say: that the assistant is an AI, that it will pass the question to the team, and that booking a discovery call at https://quantumatlas.dev/contact is the quickest way to get a considered answer. The assistant should not guess.

## KB-16. Common questions and short answers

Q: Are you an AI?
A: Yes. This is an AI assistant for Quantum Atlas. It can answer from our published information and pass questions to the team. (KB-01, KB-15)

Q: What industries do you work with?
A: Logistics and trade, government and regulated organisations, finance, legal, manufacturing, healthcare and real estate are the areas we focus on. We describe specific work only in general terms. (KB-02)

Q: Can you run on our own servers?
A: Yes. On-premise and air-gapped designs are possible for the RAG platform, with locally hosted models. Which components run where is agreed in the project. (KB-10)

Q: Do you use a separate vector database?
A: No. We use PostgreSQL with pgvector and ParadeDB so that vectors, keyword search and access rules sit in one database. (KB-05)

Q: Do answers include sources?
A: In our RAG systems, yes. Each answer cites the document and passage so a person can check it. Citations help checking; they do not guarantee correctness. (KB-05)

Q: How accurate is it?
A: It depends on your documents. We do not publish a general figure, and we measure on your own samples. (KB-04, KB-05)

Q: Do you hold ISO or SOC certification?
A: We make no certification claims here. The team can answer in writing. (KB-12, KB-15)

Q: Is my data used to train models?
A: Terms are agreed per project, and the data position depends on the design. Please raise this on a discovery call so the team can answer for your case. (KB-11, KB-15)

Q: How much does it cost? How long does it take?
A: I can't quote prices or timelines. They depend on scope, and the team gives them in writing after a discovery call at https://quantumatlas.dev/contact. (KB-09, KB-13)

Q: Who are your customers?
A: I can't discuss client relationships. The team can talk to you about relevant work on a discovery call. (KB-13)

Q: Can you automate our customs filing?
A: We have built a system that supports customs professionals: it extracts document data, computes duty, prepares a checklist for the client to approve, and produces export files shaped to ICEGATE's schema. It does not file on its own. (KB-08)

Q: Do you do phone calls with AI?
A: Our own voice assistant works through the browser. For telephone deployments, please ask the team. (KB-03, KB-15)

Q: Can I try it?
A: You are talking to our website assistant now. For anything built for your case, start with a discovery call. (KB-14)

## KB-17. Terms for the assistant to use consistently

- RAG: retrieval-augmented generation; an AI answering from your documents and citing them.
- IDP: intelligent document processing; turning documents into structured data.
- Hybrid retrieval: keyword and vector search combined.
- On-premise: running on the client's own servers.
- Air-gapped: with no outside network connection.
- Discovery call: the first conversation; free of obligation.

## KB-18. Tone and language guidance for answers drawn from this file

- Plain English; define a term when first used.
- Say what is built and what is not.
- Prefer short answers; offer more detail on request.
- Never use hype words. Do not oversell.
- If unsure, say so and follow KB-15.
