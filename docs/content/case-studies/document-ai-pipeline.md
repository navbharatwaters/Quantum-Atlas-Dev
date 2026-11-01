---
title: "Document AI Pipeline: From 120 Seconds to 8 Seconds per Document"
slug: document-ai-pipeline
metaTitle: "Case Study: Document AI Pipeline, 120 s to 8 s"
metaDescription: "Rebuilding extraction from an n8n workflow to LangGraph on Google Document AI: about 120 s down to about 8 s per 3-page document. Pilot status."
h1: "Document AI pipeline: rebuilding extraction from about 120 seconds to about 8 seconds"
answerSummary: "We replaced an n8n workflow using Mistral OCR and OpenAI extraction, about 120 seconds per 3-page document, with a LangGraph service on Google Document AI at about 8 seconds. Header-field confidence reached 99.4%. That is the service's confidence score, not measured accuracy. Splitting and classification are still being built."
schemaType: CreativeWork
lastReviewed: 2026-11-01
sources:
  - C:\projects\google_Document_AI\Project Handoff AI Document Agent (.txt
  - C:\projects\google_Document_AI\Overview The Split-Classify-Extract How to guide.txt
  - C:\projects\google_Document_AI\test.py
owner_confirm:
  - "[OWNER-CONFIRM: conditions of the 120 s and 8 s timings (sample size, document set, hardware, whether OCR queueing is included)]"
  - "[OWNER-CONFIRM: sample size behind the 99.4% header confidence figure]"
---

**Status: Pilot.** The extraction service is verified and active on an invoice processor. Splitting, classification for further document types, and the refinement step were still on the build list in the latest handoff note.

## What was the challenge?

Shipping and finance paperwork arrives in more than a thousand layouts: invoices, bills of lading, bills of entry, freight certificates, certificates of origin. The target was 99% or better accuracy on key fields at volumes where a person cannot check everything.

The first version was an n8n workflow. It sent each document through Mistral OCR into Markdown, then used an OpenAI model to extract fields. It worked, but it took about 120 seconds for a 3-page document. That is too slow for bulk processing, and a Markdown-then-language-model route can lose layout information that matters for tables.

## What was the approach?

We moved orchestration out of a visual workflow tool and into code, and moved reading from a general model to a purpose-built document service.

1. **LangGraph state graph** manages the life of each document: ingest, split, classify, extract, validate, store.
2. **Google Document AI** does the reading with layout awareness. It returns entities with a confidence value for each.
3. **Pydantic validation** enforces types on what comes back. The design includes a self-correcting loop for fields that fail validation.
4. **Confidence routing.** If a critical field falls below 90% confidence, the document goes to a refinement step that cross-checks the raw OCR text with a second model before anything reaches the database. Below the threshold, a person reviews.
5. **Line-item parsing.** Document AI identifies line-item text blocks but returns them as long strings. A small agent turns each string into structured rows: quantity, unit price, description, total.
6. **Observability.** Traces and confidence scores go to Langfuse through OpenTelemetry so an accuracy dashboard can be built.
7. **Storage** in PostgreSQL.

The planned architecture adds a document splitter for multi-document PDFs of 50 pages or more, and a classifier that routes each part to a specialised extractor so one prompt does not have to handle every document type.

## What was the outcome?

| Metric | Before (n8n, Mistral OCR, OpenAI) | After (LangGraph, Document AI) |
|---|---|---|
| Time per 3-page document | About 120 seconds | About 8 seconds |
| Header-field confidence | Not stated in handoff | 99.4% (service-reported) |
| Line-item identification confidence | Not stated in handoff | 100% (service-reported) |
| Orchestration | Visual workflow | Python service with versioned code |
| Per-field confidence for routing | Not stated in handoff | Available from the service |

Read these carefully. The 99.4% and 100% figures are confidence scores reported by the extraction service on the invoice processor, not accuracy measured against hand-checked ground truth. The timing figures come from a project handoff note, and the conditions are not recorded in it. A line item identified with full confidence can still contain a wrong value once split into rows, which is why the parsing and validation steps exist. We treat true field accuracy as unmeasured until a labelled set is scored.

## What did we learn?

- **Use a document-aware reader before a language model.** Layout carries meaning, especially in tables.
- **Confidence is a routing signal, not a promise.** Its value is deciding what a person should look at.
- **Split before you classify, classify before you extract.** One prompt for seven document types produces field confusion.
- **Keep orchestration in code.** A graph with typed state is easier to test and review than a long visual workflow.
- **Measure the unglamorous things.** Tracing confidence per field makes the next improvement obvious.

## Stack

Python, LangGraph, Google Document AI, Pydantic, Langfuse with OpenTelemetry, PostgreSQL, FastAPI, S3-compatible storage for ingest. Cloud processing runs in a Google region; clients with strict residency needs would require a different reading layer, which we would test separately.

## Where does this apply?

[Logistics](/industries/logistics-shipping), [fintech and BFSI](/industries/fintech-bfsi), [legal](/industries/legal) and [real estate](/industries/real-estate) document flows. [Book a discovery call](/contact).
