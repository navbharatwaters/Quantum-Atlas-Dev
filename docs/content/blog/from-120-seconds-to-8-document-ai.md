---
title: "From 120 Seconds to 8: Rebuilding a Document AI Pipeline with LangGraph and Google Document AI"
slug: from-120-seconds-to-8-document-ai
category: technical-deep-dive
excerpt: "We moved a shipping-document extraction flow from an n8n OCR-plus-LLM chain to a LangGraph service on Google Document AI. Per-document time for a three-page file fell from about 120 seconds to about 8. Here is what changed and what is still open."
metaTitle: "Document AI Pipeline: 120s to 8s with LangGraph"
metaDescription: "How we replaced an n8n OCR plus LLM flow with a LangGraph service on Google Document AI, cutting a three-page document from about 120 seconds to about 8."
readTime: 9
tags: [intelligent-document-processing, langgraph, google-document-ai, n8n, pydantic-ai, shipping-documents]
schemaType: Article
author: Quantum Atlas Engineering
technicalReviewer: "[OWNER-CONFIRM: technical reviewer name + LinkedIn]"
faqs:
  - q: "Why was the original n8n flow slow?"
    a: "It converted each document to Markdown with an OCR model, then sent that text to a language model for extraction. Two sequential model calls over text, each with network and queue time, added up to roughly 120 seconds for a three-page document. The replacement uses one purpose-built extraction call."
  - q: "What is Google Document AI?"
    a: "Google Document AI is a managed service with processors for tasks such as invoice parsing, document classification and splitting. It reads the page layout as well as the text, and returns entities with a confidence score for each."
  - q: "What does LangGraph add?"
    a: "LangGraph models the document lifecycle as a state graph: ingest, split, classify, extract, validate, save. Conditional edges let low-confidence results take a different path, such as a refinement step, instead of going straight to the database."
  - q: "Is 8 seconds the speed for every document?"
    a: "No. It is the measured time for one three-page document in our setup. Larger files, multi-document PDFs and different document types will behave differently, and you should test with your own files."
  - q: "Can this run without sending documents to a cloud?"
    a: "Not in this form. Google Document AI is a cloud service, so this pipeline sends documents to Google. For clients who need on-premise processing we would use a different extraction engine and say so up front."
sources:
  - title: "Google Cloud: Document AI documentation"
    url: "https://cloud.google.com/document-ai/docs"
  - title: "LangGraph documentation"
    url: "https://langchain-ai.github.io/langgraph/"
  - title: "Pydantic AI documentation"
    url: "https://ai.pydantic.dev"
  - title: "n8n documentation"
    url: "https://docs.n8n.io"
  - title: "Langfuse documentation"
    url: "https://langfuse.com/docs"
lastReviewed: 2026-11-01
owner_confirm:
  - "[OWNER-CONFIRM: technical reviewer name + LinkedIn]"
---

# From 120 Seconds to 8: Rebuilding a Document AI Pipeline with LangGraph and Google Document AI

*By Quantum Atlas Engineering. Technical reviewer: [OWNER-CONFIRM: technical reviewer name + LinkedIn]. Last reviewed 1 November 2026.*

Shipping and trade paperwork is a hard extraction problem. Invoices, bills of lading, bills of entry and certificates arrive as scans and PDFs, in many layouts, often bundled into one long file. Our first pipeline for this work was an n8n workflow. It worked, but it took about two minutes for a three-page document. This post covers what we replaced, what the new design looks like, the measured result, and the parts that are specified but not finished.

Two ground rules. The timings below are measurements from our own test documents, not benchmarks you can transfer to yours. And we publish one accuracy figure, the confidence the extraction service reported on header fields in our verification run, because that is the only accuracy measurement we have documented. It is a confidence score, not a measured end-to-end accuracy rate.

## What was the original pipeline and why was it slow?

**Short answer:** It was an n8n workflow that ran an OCR model to produce Markdown, then sent that Markdown to a language model to extract fields. Two sequential model calls over long text took about 120 seconds for a three-page document.

The first version used Mistral OCR to turn each page into Markdown, then an OpenAI model to read the Markdown and return structured fields. n8n made it fast to build and easy to inspect. For a few documents a day it was fine.

The slowness had three sources. The calls were sequential, so the second could not start until the first finished. The extraction model had to read the whole page text, including everything irrelevant to the fields we wanted. And because the OCR step produced flat text, table structure and layout had to be re-inferred by the language model from the Markdown. Line items were the worst case: a table flattened to text invites misaligned columns.

## What does the new pipeline look like?

**Short answer:** A Python microservice built on LangGraph. Google Document AI reads the document layout and extracts entities with confidence scores. Pydantic validates the result, and a conditional edge sends low-confidence output to a refinement step before it is saved to PostgreSQL.

The graph, as specified in our engineering handoff, has these stages:

1. **Ingest.** A document arrives through a FastAPI endpoint or from object storage.
2. **Split.** A splitter finds document boundaries inside long, multi-document PDFs.
3. **Classify.** A classifier labels each part: invoice, bill of lading, other.
4. **Extract.** A type-specific extractor runs: an invoice extractor, a bill-of-lading extractor, or a custom extractor for other types.
5. **Validate.** Pydantic AI enforces types and required fields, with a loop that can ask for a correction.
6. **Refine, if needed.** If confidence on a critical field is below a threshold, a larger model cross-checks against the raw OCR text.
7. **Save.** The result goes to PostgreSQL.

Orchestration is a LangGraph `StateGraph`, which keeps the lifecycle of each document explicit: where it is, what has run, what the confidence was. Tracing goes through Langfuse over OpenTelemetry so confidence scores and cost can be inspected per run.

## What was measured?

**Short answer:** About 120 seconds per three-page document on the n8n flow, and about 8 seconds on the LangGraph and Document AI service. The Document AI invoice processor returned 99.4% confidence on header fields in our verification run.

| | n8n with OCR and LLM | LangGraph with Document AI |
|---|---|---|
| Orchestration | n8n workflow | Python service, LangGraph `StateGraph` |
| Reading the page | OCR to Markdown | Layout-aware extraction (Document AI) |
| Extraction | Language model over page text | Managed processor returns typed entities |
| Time, three-page document | About 120 seconds | About 8 seconds |
| Confidence signal | None built in | Per-entity confidence from the processor |
| Validation | Prompt-level | Pydantic models, conditional refinement |
| Where documents go | OCR vendor and LLM vendor | Google Cloud |

Read the numbers carefully. 120 and 8 are timings for one document size in one setup. The 99.4% is the processor's own confidence on header fields for the invoice processor in our verification, which tells you how sure the model was, not how often it was correct across a variety of documents. We are not offering it as a guaranteed accuracy rate.

## Why does a purpose-built extraction service help?

**Short answer:** Because it reads layout, not just text. Header fields, tables and totals keep their position information, so the system does not have to rebuild structure from flattened text, and it does less work per page.

A general language model asked to extract from Markdown is doing three jobs at once: reading, locating, and structuring. A document-specific processor does the first two with a model trained for the purpose and returns entities with bounding information and confidence. That changes the shape of the pipeline. Instead of one long prompt, there is a managed call that returns structured data and a small amount of code that decides what to do when a field is uncertain.

Confidence scores are the second benefit. In the n8n version, we could not tell which fields were shaky. Now each entity carries a score, so the pipeline can route on it.

## What is the line item problem?

**Short answer:** The processor identified line-item text blocks, but returned each as one long string. A second step has to parse those strings into rows of quantity, unit price, description and total.

This is the specific gap the handoff records. Document AI finds the line items reliably in our tests, yet a row such as a description, quantity, unit and amount arrives as one text block. The planned fix is an agent that takes the 45 or more strings from a long invoice and parses each into a typed row, validated by a Pydantic model so a total that does not equal quantity times unit price is caught.

## How do you decide when to trust the output?

**Short answer:** Set a confidence threshold on critical fields. Above it, save. Below it, send the document to a refinement step that cross-checks against the raw text, and flag it for review if it still disagrees.

The handoff specifies a threshold of 90% on any critical field. That number is a starting point to tune against your own documents, not a universal rule. What matters is the shape: a conditional edge in the graph, a refinement node, and a record of which path each document took. Documents that take the refinement path are the ones worth sampling during review.

## How would you build something like this? A step list

1. **Collect real samples.** Gather a few hundred real documents across every type and layout you must handle, including the worst scans.
2. **Time the existing flow.** Record seconds per document and the failure modes before you change anything.
3. **Pick the extraction engine per document type.** Test a managed processor against your samples. Check where your data is allowed to go.
4. **Define the output models.** Write Pydantic models for each document type, with required fields and sensible constraints.
5. **Build the graph.** Create LangGraph nodes for ingest, split, classify, extract, validate, refine and save, with conditional edges on confidence.
6. **Add tracing.** Record confidence and cost per entity and per run, so you can see where the pipeline is uncertain.
7. **Add a review queue.** Send low-confidence results to a person, and feed corrections back as test cases.
8. **Re-measure with the same samples.** Compare time and field-level correctness against step 2, per document type.

## What is finished and what is not?

We think a pipeline write-up should say plainly what is open.

| Component | Status in our handoff |
|---|---|
| Document AI invoice processor, verified and active | Done |
| LangGraph service replacing the n8n flow for extraction | In place for the invoice path |
| Multi-document splitter for 50-plus page files | Specified, pending implementation |
| Classifier routing to type-specific extractors | Specified, pending implementation |
| Line-item parsing agent | Specified, pending implementation |
| Self-healing refinement on low confidence | Specified, pending implementation |
| Models for bill of lading, freight certificate, certificate of origin | To be completed |
| Langfuse accuracy dashboard on entity confidence | To be finalised |

The target for the full pipeline across seven document types is 99 percent or better field accuracy. It is a target. We will not describe it as an achievement until we have measured it on a held-out set of your document types.

## What would we do differently?

- **Build the splitter and classifier first.** We proved extraction on single invoices before the multi-document case. In real shipping packets, a 50-page file contains many documents, and splitting is where much of the difficulty sits. We would have tackled it earlier.
- **Keep the n8n flow as a fallback longer.** Running both side by side for a period, on the same inputs, gives a direct comparison and a safety net.
- **Write the evaluation set before the pipeline.** We would define a labelled set per document type up front and report per-field correctness, not only confidence.
- **Decide the data-residency position at the start.** A cloud extraction service suits a managed deployment. It does not suit a client who needs documents to stay on their own servers. That decision should come before any architecture is chosen, not after.
- **Keep credentials and identifiers out of handoff documents.** Project IDs and key files belong in a secrets store, not in a document that gets passed between tools and people.

## Frequently asked questions

**Why was the original n8n flow slow?**
It converted each document to Markdown with an OCR model, then sent that text to a language model for extraction. Two sequential model calls over text, each with network and queue time, added up to roughly 120 seconds for a three-page document. The replacement uses one purpose-built extraction call.

**What is Google Document AI?**
Google Document AI is a managed service with processors for tasks such as invoice parsing, document classification and splitting. It reads the page layout as well as the text, and returns entities with a confidence score for each.

**What does LangGraph add?**
LangGraph models the document lifecycle as a state graph: ingest, split, classify, extract, validate, save. Conditional edges let low-confidence results take a different path, such as a refinement step, instead of going straight to the database.

**Is 8 seconds the speed for every document?**
No. It is the measured time for one three-page document in our setup. Larger files, multi-document PDFs and different document types will behave differently, and you should test with your own files.

**Can this run without sending documents to a cloud?**
Not in this form. Google Document AI is a cloud service, so this pipeline sends documents to Google. For clients who need on-premise processing we would use a different extraction engine and say so up front.

## Sources and further reading

- Google Cloud, Document AI documentation: https://cloud.google.com/document-ai/docs
- LangGraph documentation: https://langchain-ai.github.io/langgraph/
- Pydantic AI documentation: https://ai.pydantic.dev
- n8n documentation: https://docs.n8n.io
- Langfuse documentation: https://langfuse.com/docs

*Have a document type that has resisted automation? Book a discovery call at https://quantumatlas.dev/contact and bring a few samples.*
