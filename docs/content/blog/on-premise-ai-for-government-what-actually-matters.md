---
title: "On-Premise AI for Government: What Actually Matters"
slug: on-premise-ai-for-government-what-actually-matters
category: industry-guide
excerpt: "A practical guide for government and regulated buyers: data sovereignty, audit trails, access control, citations and air-gapped deployment, and the questions to ask any vendor before you sign."
metaTitle: "On-Premise AI for Government: What Matters"
metaDescription: "What government buyers should require from on-premise AI: data sovereignty, fail-closed access control, audit trails, citations and air-gapped design."
readTime: 9
tags: [government, on-premise, data-sovereignty, audit-trail, access-control, air-gapped, rag, procurement]
schemaType: Article
author: Quantum Atlas Engineering
technicalReviewer: "[OWNER-CONFIRM: technical reviewer name + LinkedIn]"
faqs:
  - q: "What does on-premise AI mean?"
    a: "On-premise AI means the whole system, including the database, models and logs, runs on servers the buyer controls. Documents and queries never leave that environment. It differs from a private cloud tenancy, where the provider still operates the infrastructure."
  - q: "Can a language model run in an air-gapped environment?"
    a: "Yes, if open-weight models are installed from media transferred in. You trade some capability and need enough GPU capacity. You also cannot rely on any service that calls out to the internet, including hosted embedding, reranking, tracing or update services."
  - q: "What should an AI audit trail record?"
    a: "At minimum: who asked, when, what was asked, which documents and passages were retrieved, which model and version answered, what the answer was, and administrative actions such as access changes. Logs should be tamper-evident and retained under your policy."
  - q: "Why must every AI answer carry citations?"
    a: "Because officers need to verify an answer before relying on it, and reviewers need to check it later. A citation points to the document, version and passage the answer came from, so a human can read the source."
  - q: "Do you hold any certifications?"
    a: "This article does not claim any. Ask any vendor, including us, for current certificates and audit reports in writing, and check scope and dates."
sources:
  - title: "NIST SP 800-53 Rev. 5: Security and Privacy Controls for Information Systems and Organizations"
    url: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
  - title: "PostgreSQL documentation: Row Security Policies"
    url: "https://www.postgresql.org/docs/current/ddl-rowsecurity.html"
  - title: "Langfuse documentation (self-hosted LLM observability)"
    url: "https://langfuse.com/docs"
  - title: "pgvector: open-source vector similarity search for Postgres"
    url: "https://github.com/pgvector/pgvector"
lastReviewed: 2026-11-01
owner_confirm:
  - "[OWNER-CONFIRM: technical reviewer name + LinkedIn]"
---

# On-Premise AI for Government: What Actually Matters

*By Quantum Atlas Engineering. Technical reviewer: [OWNER-CONFIRM: technical reviewer name + LinkedIn]. Last reviewed 1 November 2026.*

Government departments and regulated organisations have good reasons to want AI that answers questions over their own circulars, notifications, case files and policies. They also have constraints that most AI products were not designed for: the documents cannot leave the building, access is by rank and department, every answer may be questioned later, and the network may be cut off from the internet.

This is general guidance for buyers and technical evaluators. It draws on how we design access control and retrieval in our own RAG platform, and on common practice in security frameworks. It is not legal advice, it is not a statement about any particular department, and it makes no claim about certifications. Use it as a checklist for conversations with any vendor, including us.

## What does "on-premise AI" actually mean?

**Short answer:** The entire system, including database, search index, models, logs and backups, runs on infrastructure you control, and no document text or query leaves it. If any component calls an outside service, the deployment is not fully on-premise.

The word gets stretched. Check each layer:

| Component | On-premise question | Common hidden dependency |
|---|---|---|
| Database and search index | Does it run on your servers? | Managed vector database in a vendor cloud |
| Embedding model | Is it hosted locally? | Hosted embedding API called at ingestion and query time |
| Reranker | Local? | Hosted reranking API |
| Language model | Local, open-weight? | Hosted LLM API |
| Observability and tracing | Self-hosted? | SaaS tracing that receives prompts and answers |
| Authentication | Works against your identity system? | Cloud identity provider required to log in |
| Updates and licences | Work offline? | Licence check or telemetry calling home |

The test is simple: pull the network cable and see what still works.

## What does data sovereignty require in practice?

**Short answer:** That you can state where every copy of your data lives, who can administer the machines, and which law governs access. That includes backups, caches, logs and model inputs, not only the main database.

Sovereignty is a property of the whole data path. Questions worth asking:

- Where are documents stored, and where are the backups and who can read them?
- Do prompts and retrieved passages appear in logs, and where do those logs go?
- Are embeddings stored? They are derived from your text and should be treated with the same sensitivity as the text.
- Who holds administrative access to the servers, and is it logged?
- On exit, how is data returned and how is deletion verified?

A system built on open standards makes exit practical. If your data sits in ordinary PostgreSQL tables, you can dump it with standard tools. If it sits in a proprietary format, leaving means a migration project.

## How should access control work for officer-level data?

**Short answer:** Reads should be denied by default, enforced in the database rather than only in application code, and applied identically to search, answers, previews and background jobs. A document someone may not read should look as if it does not exist.

In our platform the rule lives in PostgreSQL row-level security. Four document access levels apply: public, internal, confidential and restricted. Confidential documents belong to groups, so only members of those groups, the uploader, people the document is explicitly shared with, and administrators can read them. Restricted documents are visible to the uploader and named people, and, by a workspace setting, to administrators. API keys can be limited to specific groups, and no key reads restricted documents.

Several details are worth copying into any specification:

1. **Fail closed.** If the request carries no identity context, the database returns no documents.
2. **Not found, not forbidden.** A document you cannot read returns a not-found response, so its existence is not disclosed.
3. **One rule for every path.** Search, answer generation, the agent, previews, extraction results and knowledge-graph queries all pass through the same policy.
4. **Cache keys include access context.** A cached answer generated for a senior officer must never be served to a junior one. The cache key has to include the caller's access group fingerprint.
5. **Separate roles from document access.** Who can manage a workspace is a different question from who can read a document.
6. **Newer versions must not widen older ones.** When a document is replaced, access carries over and cannot be loosened by whoever uploaded the new file.
7. **Test with real data in a real database.** A leakage matrix that logs in as each kind of user and tries to read every kind of document catches what code review misses.

## What belongs in an audit trail?

**Short answer:** Every question, the passages retrieved for it, the model that answered, the answer, and every administrative change, tied to a user identity and a timestamp. An auditor should be able to reconstruct what the system saw and said.

For AI systems there are two layers. The first is the ordinary security audit: sign-ins, role changes, group changes, sharing and deletion, and privileged actions such as an administrator opening a restricted document they were not granted. Our platform records that last case as a specific audit action. The second layer is AI-specific: query traces that show the question, the retrieval results, the prompt and the output. Self-hosted tracing tools such as Langfuse can hold this inside your perimeter.

Audit views need access control too. If an auditor can see that an answer cited a document they cannot read, the audit log itself leaks. Audit entries and feedback views should hide answers and sources that cite unreadable documents.

Also decide retention. How long are traces kept, who can export them, and how are they protected from alteration?

## Why do citations matter more in government than elsewhere?

**Short answer:** Because an officer who acts on an answer is accountable for it. A citation to the exact document, version and passage lets them verify before relying on it, and lets a reviewer check later.

An answer without a source is an opinion. In a regulatory setting, "the circular says X" must resolve to a specific circular, as it stood on a specific date, with the passage visible. Design for this from the start:

- Chunks carry the document identifier, version and location (page or section).
- The model is instructed to answer only from retrieved passages and to say so when it cannot.
- The interface shows the passage next to the claim.
- Superseded versions are marked, so an answer cannot quietly cite an amended rule.

Citations reduce the risk of a wrong answer being relied upon. They do not remove it. Models can still misread a passage, so the human check is part of the process, not an optional extra.

## What changes in an air-gapped environment?

**Short answer:** Every dependency has to be installed from transferred media and run locally: models, database extensions, container images, updates and monitoring. Plan for GPU capacity, offline updates and a smaller choice of models.

| Concern | What to plan for |
|---|---|
| Models | Open-weight language, embedding and reranking models, transferred in, with hashes verified |
| Hardware | GPU capacity sized for peak concurrent users, not average |
| Updates | A controlled offline process: staging, testing, then promotion |
| Observability | Self-hosted metrics, logs and tracing inside the enclave |
| Identity | Integration with your directory or SSO; local fallback accounts |
| Capability trade-off | Open-weight models may be less capable than the largest hosted models; test on your questions |
| Support | Remote support may not be possible; documentation and runbooks matter more |

The honest trade-off is capability. A locally hosted model is a deliberate choice of control over raw capability. For retrieval-based question answering over a defined corpus, that trade is often acceptable, because the retrieval does much of the work. You should still test on your own documents.

## What should you ask a vendor? A step list

1. **Ask for a data-flow diagram** showing every component and every network connection, including backups, logs and update checks.
2. **Run the cable test.** Ask for a demonstration with outbound network access blocked.
3. **Ask where access control is enforced** and to see the tests that prove isolation between users.
4. **Ask for a sample audit record** for one question and one administrative action.
5. **Check citation behaviour** on a question your corpus cannot answer. A good system says it cannot.
6. **Ask about version handling.** Replace a document and see which version an answer cites.
7. **Ask for the exit plan,** including the format of exported data and how deletion is verified.
8. **Ask for certifications in writing,** with scope and dates, and read them. Treat unsupported claims as absent.
9. **Ask what has not been built.** A candid vendor can list limitations.

## What would we do differently?

- **Start from the audit export.** We would write the auditor's report, the thing an inspector wants to read, before building the logging that feeds it.
- **Treat identity integration as a first-month task.** Departments run their own directories and role structures. Mapping them to groups is where deployments spend time.
- **Be explicit about permission mirroring.** If documents are synced from another repository, the source system's permissions are not automatically carried over. Tell buyers plainly, and plan for it.
- **Document the capability gap early** between self-hosted models and the largest hosted ones, with test results on the client's own questions, so nobody finds out in the pilot.

## Frequently asked questions

**What does on-premise AI mean?**
On-premise AI means the whole system, including the database, models and logs, runs on servers the buyer controls. Documents and queries never leave that environment. It differs from a private cloud tenancy, where the provider still operates the infrastructure.

**Can a language model run in an air-gapped environment?**
Yes, if open-weight models are installed from media transferred in. You trade some capability and need enough GPU capacity. You also cannot rely on any service that calls out to the internet, including hosted embedding, reranking, tracing or update services.

**What should an AI audit trail record?**
At minimum: who asked, when, what was asked, which documents and passages were retrieved, which model and version answered, what the answer was, and administrative actions such as access changes. Logs should be tamper-evident and retained under your policy.

**Why must every AI answer carry citations?**
Because officers need to verify an answer before relying on it, and reviewers need to check it later. A citation points to the document, version and passage the answer came from, so a human can read the source.

**Do you hold any certifications?**
This article does not claim any. Ask any vendor, including us, for current certificates and audit reports in writing, and check scope and dates.

## Sources and further reading

- NIST SP 800-53 Rev. 5, Security and Privacy Controls for Information Systems and Organizations: https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final
- PostgreSQL documentation, Row Security Policies: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- Langfuse documentation: https://langfuse.com/docs
- pgvector: https://github.com/pgvector/pgvector

*Scoping an on-premise deployment? Book a discovery call at https://quantumatlas.dev/contact.*
