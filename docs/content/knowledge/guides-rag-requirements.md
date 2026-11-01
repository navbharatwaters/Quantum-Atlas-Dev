---
title: "RAG Implementation Requirements"
slug: knowledge/guides/rag-requirements
type: implementation-guide
service: rag
metaTitle: "Enterprise RAG Requirements Checklist"
metaDescription: "A practical checklist for scoping an enterprise RAG system: sources, access rules, retrieval, citations, audit, evaluation, deployment and ownership."
lastReviewed: 2026-11-01
owner_confirm: []
---

# RAG Implementation Requirements

Retrieval-augmented generation (RAG) lets an AI answer from your own documents and show where the answer came from. This checklist covers what to settle before building one for an organisation. Work through it with the people who own the documents, not only IT.

## 1. Define the questions

Collect 30 to 50 real questions people ask today, in their own words. Include hard ones: questions that need two documents, questions with exact identifiers (clause numbers, circular numbers, part codes), and questions the documents cannot answer.

**Done when:** you have a list you can use later as your evaluation set. Without it you cannot say whether the system works.

## 2. Inventory the sources

| Question | Why it matters |
|---|---|
| Which repositories hold the documents? | Connectors, permissions and sync |
| What formats? PDF, scans, Word, spreadsheets, email, web pages | Scans need OCR; tables need care |
| How many documents, how large, how often do they change? | Index size and update design |
| Which languages? | Embedding and answer quality differ by language |
| Are there multiple versions of the same document? | Which version should answers cite? |
| Which documents are wrong or obsolete? | Retrieval does not know a document is stale unless told |

Decide a first corpus that is bounded and valuable. Starting with everything is slower and harder to evaluate.

## 3. Write the access rules

This is the requirement most often left until late and most expensive to retrofit.

- Who may read which documents? Describe it by role, department and document class, in plain words.
- Is access decided per document, per folder, or per group?
- Are there documents some people must not know exist?
- Do rules come from an existing system (directory, SharePoint, a document store) that must be mirrored?
- Do administrators see everything, or are some classes hidden even from them?
- What is the rule when someone changes role or leaves?

Ask the vendor where these rules are enforced. Enforcement in the database, applied to every query path, is stronger than filtering in application code. Ask to see a test that logs in as one user and tries to read another's documents.

## 4. Retrieval requirements

- Does the system combine keyword and meaning-based search? Exact identifiers need keyword matching, paraphrased questions need meaning-based matching, and real corpora need both.
- Can it filter by metadata such as department, date, document type and version?
- Does it re-rank results before they reach the model?
- How are documents split into passages, and does a passage keep its document, version and page or section?

## 5. Answer requirements

- **Citations on every answer.** Each claim should point to the document, version and passage. Users should be able to open the source.
- **A rule for "I don't know".** The system should say when the documents do not contain the answer, and show what it did find.
- **Version awareness.** Superseded documents should be marked, so answers do not quietly cite old rules.
- **Tone and format.** Short or detailed? Tables? A specific template for certain question types?
- **Language.** In which languages will people ask, and in which will answers be given?

Be realistic. Citations make answers checkable. They do not guarantee that the model read a passage correctly. Decide which answers need human review before use.

## 6. Audit and observability

- Record each question, the passages retrieved, the model used, the answer and the user.
- Decide who can read these records and for how long they are kept.
- Make sure audit views respect the same access rules as the documents.
- Decide how users give feedback on an answer and who acts on it.

## 7. Deployment and data position

| Option | Consider when |
|---|---|
| Managed cloud | Documents are not highly sensitive; speed to start matters |
| Your own cloud account | You need control over region and keys |
| On-premise | Regulation or policy requires documents to stay on your servers |
| Air-gapped | No outbound network at all; models and updates are installed offline |

For each option, list every component that touches document text: database, embedding model, re-ranker, language model, tracing, backups. Check whether each one runs where you need it to.

## 8. Ingestion and change

- How do new and updated documents arrive: upload, connector, email, scheduled sync?
- What happens to an answer's citation when a document is replaced?
- Who approves a document before it becomes searchable?
- How are deletions handled, and how do you confirm a deleted document is gone from the index?

## 9. Evaluation plan

1. Take the question list from step 1 and write the expected source for each.
2. Measure whether the right passage appears in the retrieved set.
3. Review the answers by hand, with the people who know the material.
4. Repeat after every change to chunking, models or settings.
5. Agree a threshold for go-live before you see the results, not after.

We do not offer a universal accuracy figure, because results depend on your documents and questions. Insist on measuring with yours.

## 10. Ownership after go-live

- A named owner for content quality.
- A named owner for the system's operation.
- A route for users to report a wrong answer.
- A schedule for re-running the evaluation.

## Questions to put to any vendor

- Where is access control enforced, and how is it tested?
- What leaves our environment, for every component?
- How do we leave: what format is our data in?
- What do citations point to, exactly?
- What does the system do when it does not know?
- What have you not built?

To scope your own, book a discovery call at https://quantumatlas.dev/contact.
