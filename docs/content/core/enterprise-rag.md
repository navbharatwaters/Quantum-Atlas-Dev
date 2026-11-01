---
title: Enterprise RAG
slug: /services/enterprise-rag
metaTitle: Enterprise RAG on Postgres, Self-Hosted and Cited
metaDescription: Multi-tenant RAG with Postgres row-level security, pgvector and BM25 hybrid search. On-premise capable, with citations and no separate vector database.
h1: Enterprise RAG on Postgres, with a source for every answer
answerSummary: Enterprise RAG lets people ask questions of your documents and get answers that cite the passage they came from. Ours runs entirely on Postgres, combining pgvector similarity with ParadeDB BM25 keyword search, with row-level security separating tenants. It can be deployed on your own infrastructure.
schemaType: Service
lastReviewed: 2026-11-01
sources:
  - C:\projects\rag-enterprise-saas\AGENTS.md
  - C:\projects\infrastructure Contabo\INFRASTRUCTURE.md
  - C:\projects\navbharat-tender-radar\README.md
owner_confirm:
  - "Which internal teams use the RAG system in production today, and for what"
  - "Whether a government on-premise RAG engagement may be described publicly, and in what words"
  - "Any retrieval-quality measurement the founder is willing to publish"
---

# Enterprise RAG on Postgres, with a source for every answer

## What is enterprise RAG?

Retrieval-augmented generation (RAG) is a method where a language model answers from passages retrieved from your own documents, not from its general training. Enterprise RAG adds what a company needs around that: access control, tenant isolation, citations and an audit trail.

## How does our RAG system retrieve answers?

**Direct answer:** A question is searched two ways at once: keyword matching with BM25 through ParadeDB, and meaning-based matching with pgvector. The two ranked lists are merged, the best passages go to a language model, and the answer is returned with citations to those passages.

Hybrid retrieval matters because each method misses what the other finds. Keyword search catches exact clause numbers, part codes and acronyms. Vector search catches paraphrase. Together they cover both.

### The query path in six steps

1. A user asks a question through the web app or API, authenticated through Clerk.
2. The request sets the tenant and user context in Postgres, so row-level security applies from the first query.
3. The system runs BM25 keyword search and pgvector similarity search over the permitted chunks.
4. The two result lists are fused into one ranking.
5. The top passages are passed to a language model through LiteLLM with an instruction to answer only from them.
6. The answer returns with citations to the source document and passage. Usage is metered for billing.

## Why Postgres and not a separate vector database?

**Direct answer:** One database means one backup plan, one access-control model, one place to audit, and no proprietary store to be locked into. Keeping vectors, keywords, permissions and business data together lets row-level security govern all of them in the same transaction.

| Consideration | Separate vector database | Postgres with pgvector and ParadeDB |
|---|---|---|
| Systems to run and secure | Two or more | One |
| Access control | Replicated into the vector store | Enforced where the data lives |
| Keyword plus vector search | Often a second service | Both in one engine |
| Backup and recovery | Per system | Standard Postgres tooling |
| Vendor dependency | Often proprietary | Open source |
| Fit for on-premise | Varies by vendor | Straightforward |

The trade-off is honest: specialised vector stores can scale to very large collections with less tuning. For most enterprise document sets, Postgres is enough, and we tell you if yours is not.

## How does multi-tenancy and access control work?

**Direct answer:** Every tenant's data sits in shared tables protected by Postgres row-level security. The database itself refuses to return rows the current user may not see, so a bug in application code cannot leak another tenant's documents.

Two practices matter here. Row-level security is bypassed by table owners and superusers, so the application connects as a restricted role. And a document a user may not read returns "not found," not "forbidden," so its existence is not revealed.

## What is already built and running?

**Direct answer:** The RAG platform runs in production for our own internal use. It includes multi-tenant isolation with row-level security, hybrid retrieval with pgvector and ParadeDB, LiteLLM as the model gateway, Clerk authentication, Stripe usage billing and 80 automated tests.

We state only those facts. We do not publish accuracy percentages or customer counts, because we have not measured retrieval quality in a form we would defend. [OWNER-CONFIRM: any retrieval-quality figure to publish]

The same retrieval layer powers the knowledge-base tool behind our [voice agent](/services/ai-voice-agents), and our tender radar, which scans 20 Indian e-procurement portals daily (54,526 tenders on its last full run, zero failures), uses the same Postgres-first approach for storage and scoring.

## What do government and regulated buyers need?

**Direct answer:** They typically need on-premise deployment, officer-level permissions, a full query log and a citation on every answer. Our architecture is designed around those four requirements. Specifics, such as air-gapped model hosting, are scoped per engagement.

- **Data sovereignty.** Everything runs on servers you designate.
- **Role-based access.** Row-level security enforces who can see which documents.
- **Audit trail.** Each query, its retrieved passages and the answer are logged.
- **Citations.** An answer without a source is treated as a failure, not a feature.

We do not hold security certifications and will not imply otherwise. We will complete your security questionnaire and support your own assessments.

## How we deliver it

**Direct answer:** We scope your corpus, ingest and chunk it, tune retrieval against questions your staff really ask, then deploy with monitoring. The architecture is a Postgres core with a stateless API in front.

The architecture in words:

- **Storage.** Postgres 16 holds documents, chunks, embeddings, users and audit logs. ParadeDB provides BM25. pgvector provides similarity search.
- **Ingestion.** Documents are parsed, chunked and embedded as background jobs. Tenant context is set at the start of each job, not in middleware.
- **API.** A stateless service handles queries, permissions and citations.
- **Model gateway.** LiteLLM routes to the language model you choose and records per-tenant cost.
- **Identity.** Clerk handles sign-in; for on-premise deployments we scope an alternative identity provider.
- **Observability.** Query traces and metrics go to Grafana and Prometheus.

The delivery sequence:

1. Discovery call and corpus review.
2. Written scope with access rules and success questions.
3. Ingestion of a pilot set.
4. Retrieval tuning against real questions.
5. Pilot with a small user group and review of every wrong answer.
6. Rollout, monitoring and maintenance.

## What you own

- **The data.** Documents, chunks and embeddings live in your Postgres.
- **The code.** The ingestion jobs, API and deployment files are delivered to you.
- **The model choice.** Swap language and embedding models without re-architecting.
- **The audit log.** It is your record, in your database.

## When it is not the right fit

- You have a few dozen short documents. Search inside a shared drive may serve you.
- Your documents are scanned images with no extraction yet. Start with [document intelligence](/services/document-intelligence), then retrieval.
- You expect it to reason across thousands of pages like an analyst. RAG retrieves passages. Complex judgement stays with people.
- You need a published accuracy guarantee. We measure on your questions and report honestly, but we do not promise a number in advance.
- You need a certified product off the shelf. We build and deploy; we do not resell a certified platform.

## Frequently asked questions

### Can this run entirely on our own servers?

Yes. The retrieval core is Postgres and a stateless API, both deployable in your data centre. The open question is the language model. Hosted APIs need outbound access. Self-hosted models need GPU hardware. We scope both and lay out the trade-offs before you decide.

### Does every answer include a citation?

That is the design rule. Each answer returns with links to the passages it was built from, so a reader can verify it. If retrieval finds nothing relevant, the system should say so instead of answering from the model's memory.

### Why not use Pinecone or another vector database?

A second database doubles the systems to secure and keeps permissions out of sync. Postgres with pgvector and ParadeDB does hybrid search in the same engine that enforces access rules. It also avoids a proprietary dependency. For extremely large collections, we will say if a specialised store is justified.

### How do you keep one tenant's data away from another's?

Postgres row-level security. The database filters every query by tenant and user, so even a coding mistake in the API cannot return another tenant's rows. We test this with an unprivileged database role, since superusers bypass these rules.

### How do you measure answer quality?

We build a set of real questions with your staff, record the expected source passages, and check retrieval and answers against them. We review every miss together. We do not publish a single accuracy figure, because it would depend on your documents.

### What file types can it ingest?

PDFs, Word documents, spreadsheets, plain text and web pages are standard. Scanned documents and images need an extraction step first. We confirm the file mix on your sample before scoping.

### Can it work with documents in Indian languages?

It depends on the embedding and language models selected. We test with your actual documents before agreeing to a language, and we report the result honestly.

### Can we start with a small pilot?

Yes, and we recommend it. A pilot over one document set and one team shows retrieval quality and user behaviour at low cost, before any wider rollout.

## Next step

Send us a description of your corpus. [Book a discovery call](/contact) and we will tell you whether RAG fits.
