---
title: "Why We Run Enterprise RAG on PostgreSQL: pgvector, BM25 and Row-Level Security"
slug: why-postgres-for-enterprise-rag
category: technical-deep-dive
excerpt: "One PostgreSQL database holds our vectors, our keyword index and our tenant isolation. Here is how hybrid retrieval with reciprocal rank fusion works there, and where the approach has limits."
metaTitle: "Enterprise RAG on PostgreSQL: pgvector + BM25 + RLS"
metaDescription: "How we build enterprise RAG on one PostgreSQL database: pgvector for meaning, ParadeDB BM25 for exact terms, RRF fusion and row-level security."
readTime: 9
tags: [rag, postgresql, pgvector, paradedb, hybrid-search, multi-tenancy, row-level-security]
schemaType: Article
author: Quantum Atlas Engineering
technicalReviewer: "[OWNER-CONFIRM: technical reviewer name + LinkedIn]"
faqs:
  - q: "Do we need a separate vector database for enterprise RAG?"
    a: "Not necessarily. PostgreSQL with pgvector stores and searches embeddings next to your relational data. A dedicated vector database makes sense at very large scale or when you need features Postgres lacks. For most enterprise knowledge bases, one database is simpler to secure, back up and audit."
  - q: "What is hybrid search in RAG?"
    a: "Hybrid search runs two retrievers on the same question: a keyword retriever (BM25) that is strong on exact terms like clause numbers, and a vector retriever that is strong on meaning. The two ranked lists are merged into one, commonly with reciprocal rank fusion."
  - q: "What is reciprocal rank fusion?"
    a: "Reciprocal rank fusion scores each result as 1 divided by (k plus its rank) in each list, then adds the scores. It uses ranks only, so you do not need to normalise keyword scores against vector distances. A common default for k is 60."
  - q: "How does row-level security keep tenants apart?"
    a: "Row-level security attaches a policy to a table so Postgres filters rows on every query, whatever the application code does. The application sets the tenant for the current transaction, and rows from other tenants are invisible to that query."
  - q: "Can this run on-premise?"
    a: "Yes. PostgreSQL, pgvector and ParadeDB are open source and run on your own servers. The embedding model and reranker can also be self-hosted, so a deployment does not have to send documents to an outside API."
sources:
  - title: "pgvector: open-source vector similarity search for Postgres"
    url: "https://github.com/pgvector/pgvector"
  - title: "ParadeDB: Postgres for search and analytics"
    url: "https://github.com/paradedb/paradedb"
  - title: "ParadeDB documentation"
    url: "https://docs.paradedb.com"
  - title: "PostgreSQL documentation: Row Security Policies"
    url: "https://www.postgresql.org/docs/current/ddl-rowsecurity.html"
  - title: "Cormack, Clarke and Buettcher: Reciprocal Rank Fusion outperforms Condorcet and individual rank learning methods (SIGIR 2009)"
    url: "https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf"
  - title: "PostgreSQL documentation: Window functions"
    url: "https://www.postgresql.org/docs/current/functions-window.html"
lastReviewed: 2026-11-01
owner_confirm:
  - "[OWNER-CONFIRM: technical reviewer name + LinkedIn]"
---

# Why We Run Enterprise RAG on PostgreSQL: pgvector, BM25 and Row-Level Security

*By Quantum Atlas Engineering. Technical reviewer: [OWNER-CONFIRM: technical reviewer name + LinkedIn]. Last reviewed 1 November 2026.*

Retrieval-augmented generation (RAG) lets a language model answer from your documents instead of from memory. The part that decides whether the answers are any good is retrieval: finding the right passages. The part that decides whether you can deploy it inside a bank, a hospital or a government office is isolation: making sure one tenant, or one department, never sees another's documents.

We build both in PostgreSQL. This post explains the design, the SQL pattern behind the retrieval, the tenancy model, and the places where we would think twice. It describes our own multi-tenant RAG platform. We do not publish accuracy figures here, because retrieval quality depends on your documents and your questions, and any number we quoted without your corpus would mean little.

## Why use PostgreSQL instead of a dedicated vector database?

**Short answer:** Because retrieval, access control, audit records and backups all end up in the same place. One PostgreSQL database with pgvector (vectors) and ParadeDB's pg_search (BM25 keyword ranking) gives one system to secure, back up and restore, and one place where tenant rules are enforced.

Most RAG tutorials add a separate vector store. In an enterprise that adds a second system holding copies of your documents, a second access-control model to keep in sync with the first, a second backup to verify, and a second thing to approve through procurement and security review. When the vector store disagrees with the source of truth about who may read a document, the vector store is the one that leaks.

Keeping chunks, embeddings, keyword index and permissions in one database means a single query can filter by tenant, filter by document permissions, rank by keyword, and rank by vector, in one transaction. It also means no proprietary vector format: your data stays in ordinary tables you can dump with standard tools.

## Why does RAG need both keyword search and vector search?

**Short answer:** Keyword search finds exact strings such as section numbers, part codes and defined terms. Vector search finds passages that mean the same thing in different words. Enterprise documents need both, so we run both and merge the results.

Take a compliance question: "What does clause 14.2(b) say about termination for convenience?" A vector search may return passages about termination in general and miss the clause number. BM25, the standard keyword ranking function, matches "14.2(b)" exactly. Now reverse it: "Can we end the contract early without a reason?" A keyword search may find nothing, because the document says "terminate for convenience". The vector search handles that.

| Aspect | Keyword (BM25) | Vector (embeddings) | Hybrid with fusion |
|---|---|---|---|
| Strong at | Exact terms, IDs, clause numbers, acronyms | Paraphrase, synonyms, intent | Both |
| Weak at | Different wording for the same idea | Rare tokens, exact identifiers | Needs tuning and two indexes |
| Index in our stack | ParadeDB `bm25` index | pgvector HNSW index | Both, queried together |
| Explainable | Yes, the matching terms are visible | Less so, similarity is a distance | Partly |
| Cost to run | Low | Embedding every chunk, plus index memory | Sum of both |

## How does hybrid retrieval work in SQL?

**Short answer:** Run the keyword query and the vector query as two common table expressions, give each result a rank, convert each rank into a reciprocal-rank score, add the scores per chunk, and sort. All of it happens in one SQL statement.

The pattern from our platform's engineering notes looks like this, simplified:

```sql
WITH
fulltext AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY paradedb.score(id) DESC) AS rank
  FROM chunks
  WHERE content @@@ $1
    AND tenant_id = current_setting('app.current_tenant_id')::uuid
  LIMIT 20
),
semantic AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY embedding <=> $2) AS rank
  FROM chunks
  WHERE tenant_id = current_setting('app.current_tenant_id')::uuid
  ORDER BY embedding <=> $2
  LIMIT 20
),
rrf AS (
  SELECT id, 0.5 * (1.0 / (60 + rank)) AS score FROM fulltext
  UNION ALL
  SELECT id, 0.5 * (1.0 / (60 + rank)) AS score FROM semantic
)
SELECT c.*, SUM(rrf.score) AS rrf_score
FROM rrf JOIN chunks c ON c.id = rrf.id
GROUP BY c.id
ORDER BY rrf_score DESC
LIMIT $3;
```

Three details matter in practice. First, `@@@` is the ParadeDB operator for BM25 matching; `@@` is a different Postgres operator and fails quietly. Second, the pgvector distance operator must match the operator class the index was built with (`<=>` for cosine distance), otherwise Postgres will not use the index. Third, the BM25 index must be created explicitly, with a `key_field`.

## What is reciprocal rank fusion and why use it?

**Short answer:** Reciprocal rank fusion (RRF) merges ranked lists by adding 1/(k + rank) for each list a result appears in. It ignores raw scores, so it avoids the problem of comparing a BM25 score with a vector distance, which are on unrelated scales.

BM25 scores and cosine distances cannot be added directly. RRF sidesteps that by using only position in each list. A chunk ranked first by keywords and fifth by vectors gets a higher combined score than a chunk ranked first by only one retriever and absent from the other. The constant k (we use 60, the value from the original paper) damps the advantage of the very top ranks so that one retriever cannot dominate. In our query each list carries equal weight, 0.5, and each retriever contributes its top 20.

A reranker model can then reorder the fused shortlist with a more expensive comparison against the question. In our design the embedding model and the reranker are both self-hosted models, so no document text has to leave the deployment for retrieval.

## How do you isolate tenants and departments inside one database?

**Short answer:** With PostgreSQL row-level security. The database filters rows on every query using per-transaction settings, so isolation does not depend on every developer remembering a `WHERE tenant_id = ...` clause.

Our platform uses a shared schema with a tenant identifier on every table, and row-level security (RLS) policies enforce it. Two layers apply, combined with AND:

1. **Tenant isolation.** A policy compares each row's `tenant_id` to a setting the application writes at the start of each transaction.
2. **Document access.** A second, restrictive policy on the documents table decides which documents the caller may read, based on access level (public, internal, confidential, restricted), group membership, explicit shares, and the caller's role. The same rule is applied to chunks, extraction results, obligations and graph records by joining back to documents. A document you may not read is not found, rather than "forbidden", so its existence is not revealed.

Because the rule sits in Postgres, it holds for every path: search, answer generation, the agent, previews and background extraction. If the setting that carries the caller's identity is unset, the policy returns no documents. Failing closed is the property you want.

| Isolation approach | Where the rule lives | Failure mode | Operational cost |
|---|---|---|---|
| Separate database per tenant | Connection routing | Misrouted connection | High: many databases to migrate and back up |
| Schema per tenant | Search path | Wrong search path | Medium: migrations repeat per schema |
| Shared schema, application filter | Every query in app code | One forgotten filter leaks data | Low, but fragile |
| Shared schema with RLS | Database policy | Misconfigured role bypasses it | Low, needs discipline in roles |

## What are the traps with row-level security?

**Short answer:** RLS is bypassed by table owners and superusers, and `SET LOCAL` only lasts for one transaction. The application must connect as a non-owner role and set context inside an explicit transaction.

Both traps appear in our own engineering notes because both cost time:

- **Owner bypass.** Table owners and superusers skip RLS by default. Use one role for migrations and a separate, limited role for the application with only SELECT, INSERT, UPDATE and DELETE.
- **Transaction scope.** Settings made with `SET LOCAL` disappear when the transaction ends. Run the context-setting statement and the query inside the same transaction, or the query runs with no context.
- **One place to set context.** We route all of it through a single function, and a test fails if any other code sets those settings.
- **Test with a real database.** Our leakage tests run against a real PostgreSQL instance, not mocks. A mock cannot tell you that a policy is wrong.

## How would you build this? A step list

1. **Model tenants and documents first.** Put `tenant_id` on every table and decide the access levels (for example public, internal, confidential, restricted) before writing retrieval code.
2. **Create two database roles.** One owns the schema and runs migrations. One is used by the application and cannot bypass RLS.
3. **Write the RLS policies.** Add a tenant policy and a restrictive document-access policy. Make the "no context set" case return zero rows.
4. **Add the context function.** One function sets tenant, user and group settings at the start of every transaction.
5. **Chunk and embed.** Split documents into chunks, store text and embedding together, and record the document and version each chunk came from.
6. **Create both indexes.** A ParadeDB BM25 index on chunk text and a pgvector HNSW index on embeddings, using the operator class that matches your distance operator.
7. **Write the fusion query.** Two ranked CTEs, RRF scoring, join back to chunks, limit.
8. **Return citations.** Carry document, version and page or section with every chunk so each answer can cite its sources.
9. **Test for leakage.** Write tests that log in as user A and try to read user B's documents through every path, against a real database.
10. **Trace queries.** Log each query, the chunks retrieved and the answer, so an auditor can reconstruct what the system saw.

## What does the architecture look like end to end?

A request arrives with an identity (a user session or an API key). The API opens a transaction and writes the tenant, user and group settings. The query is embedded by the embedding model. The hybrid SQL statement runs inside that transaction, so RLS filters both retrievers before any ranking happens. The fused shortlist goes to the reranker, then the top passages go to the language model with an instruction to answer only from them and cite them. The response returns the answer with citations, and the query, the retrieved chunks and the answer are traced for audit. Ingestion runs as a separate background job under a tenant-scoped system mode that is not limited by user access, because it must write every document.

## What would we do differently?

- **Plan the index memory budget earlier.** HNSW builds are memory-hungry. We set a larger `maintenance_work_mem` for builds and schedule them for quiet hours. For very large collections, starting with an IVFFlat index and moving to HNSW later is a reasonable path.
- **Test the restrictive policy against vector search specifically.** Approximate nearest-neighbour search applies filters after the index scan by default, which can return fewer rows than requested when a policy removes many candidates. Newer pgvector versions add iterative scans for this; older ones do not. Check the version you deploy and test with realistic permission mixes.
- **Decide on the embedding model before ingesting at scale.** Changing the model means re-embedding every chunk. Keep the model name in the cache key and in the chunk metadata.
- **Write the evaluation set sooner.** We would build a small set of real questions with known good sources before tuning anything, so changes to chunk size, k or weights can be judged on evidence.
- **Know when to leave Postgres.** If you reach hundreds of millions of vectors with strict latency targets, a dedicated engine may serve you better. Postgres is a good default, not a universal answer.

## Frequently asked questions

**Do we need a separate vector database for enterprise RAG?**
Not necessarily. PostgreSQL with pgvector stores and searches embeddings next to your relational data. A dedicated vector database makes sense at very large scale or when you need features Postgres lacks. For most enterprise knowledge bases, one database is simpler to secure, back up and audit.

**What is hybrid search in RAG?**
Hybrid search runs two retrievers on the same question: a keyword retriever (BM25) that is strong on exact terms like clause numbers, and a vector retriever that is strong on meaning. The two ranked lists are merged into one, commonly with reciprocal rank fusion.

**What is reciprocal rank fusion?**
Reciprocal rank fusion scores each result as 1 divided by (k plus its rank) in each list, then adds the scores. It uses ranks only, so you do not need to normalise keyword scores against vector distances. A common default for k is 60.

**How does row-level security keep tenants apart?**
Row-level security attaches a policy to a table so Postgres filters rows on every query, whatever the application code does. The application sets the tenant for the current transaction, and rows from other tenants are invisible to that query.

**Can this run on-premise?**
Yes. PostgreSQL, pgvector and ParadeDB are open source and run on your own servers. The embedding model and reranker can also be self-hosted, so a deployment does not have to send documents to an outside API.

## Sources and further reading

- pgvector, open-source vector similarity search for Postgres: https://github.com/pgvector/pgvector
- ParadeDB, Postgres for search and analytics: https://github.com/paradedb/paradedb
- ParadeDB documentation: https://docs.paradedb.com
- PostgreSQL documentation, Row Security Policies: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- Cormack, Clarke and Buettcher, Reciprocal Rank Fusion outperforms Condorcet and individual rank learning methods (SIGIR 2009): https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf
- PostgreSQL documentation, Window functions: https://www.postgresql.org/docs/current/functions-window.html

*Want to see how this would fit your documents and your access rules? Book a discovery call at https://quantumatlas.dev/contact.*
