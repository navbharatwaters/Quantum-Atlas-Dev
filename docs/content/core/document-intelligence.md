---
title: Document Intelligence
slug: /services/document-intelligence
metaTitle: Intelligent Document Processing for Trade and Finance
metaDescription: Extract structured data from invoices, bills of lading and customs forms with LangGraph and Google Document AI. About 8 seconds per 3-page document.
h1: Document intelligence that turns paper into structured data
answerSummary: Document intelligence reads invoices, bills of lading, customs forms and contracts, then returns validated structured data your systems can use. Our pipeline moved from about 120 seconds to about 8 seconds per three-page document, with 99.4% confidence on header fields in testing.
schemaType: Service
lastReviewed: 2026-11-01
sources:
  - C:\projects\google_Document_AI\Project Handoff AI Document Agent (.txt
  - C:\projects\import BOE
  - C:\projects\cha-frontend
owner_confirm:
  - "Whether the document pipeline is in daily production use inside Navbharat Shipping / iKargos, and for which document types"
  - "Throughput claim: documents per minute at bulk scale, with a test run behind it"
  - "On-premise OCR engine choice and any measured accuracy for it"
---

# Document intelligence that turns paper into structured data

## What is document intelligence?

Document intelligence is software that reads business documents and returns their contents as structured, validated data. It replaces re-keying from PDFs and scans into forms.

We build pipelines that split, classify, extract and check documents, then pass clean fields to your ERP, CRM or database.

## What is our document pipeline, and what does it achieve?

**Direct answer:** Our pipeline uses LangGraph to orchestrate Google Document AI for extraction, with schema validation after it. It replaced an n8n flow that used OCR plus an LLM. Processing a three-page document fell from about 120 seconds to about 8 seconds, with 99.4% confidence on header fields in testing.

Those two numbers come from our own internal handoff record for a shipping-document project. Confidence is the extraction engine's own score, not a measured accuracy rate on your documents. We measure accuracy per document type on your samples before we state any figure to you.

## Which documents can it handle?

**Direct answer:** Anything with consistent structure: commercial invoices, bills of lading, bills of entry, packing lists, certificates of origin, bank statements and similar forms. We scope document by document, because accuracy depends on layout variety, scan quality and which fields matter.

| Document family | Typical fields | How we approach it |
|---|---|---|
| Commercial invoice | Parties, invoice number, line items, totals, currency | Document AI invoice extraction plus line-item parsing |
| Bill of lading | Shipper, consignee, vessel, ports, containers | Dedicated extractor with schema checks |
| Bill of entry / shipping bill | Importer, HS codes, values, duty fields | Extraction feeding the customs workflow |
| Packing list | Packages, weights, dimensions | Table extraction, then totals cross-check |
| Contracts | Clauses, dates, obligations | Layered with retrieval, see [enterprise RAG](/services/enterprise-rag) |
| Certificates and forms | Reference numbers, dates, signatories | Custom extractor trained on your samples |

## How does the extraction pipeline work?

**Direct answer:** Files are ingested, split into documents, classified by type, routed to a type-specific extractor, validated against a schema, and stored in Postgres. Low-confidence fields get a second look rather than being passed through silently.

1. **Ingest.** Files arrive through an API or a watched folder.
2. **Split.** A multi-document PDF is broken into individual documents. This is a design stage we finish per project.
3. **Classify.** Each document is labelled by type so the right extractor reads it.
4. **Extract.** Google Document AI returns fields, tables and per-field confidence.
5. **Validate.** Pydantic schemas enforce types, formats and required fields. Totals and dates are cross-checked.
6. **Route by confidence.** Fields below a threshold go to a refinement step or to a human review queue.
7. **Store and deliver.** Clean records land in Postgres and flow to downstream systems through n8n or a custom API.

LangGraph holds the state of each document through these steps. That makes a failed step restartable, not a lost file.

## What does the customs automation add?

**Direct answer:** For import and export work, we have built flows around the extracted data: an import bill-of-entry checklist, export shipping-bill flows, duty computation, and generation of ICEGATE-format flat files and JSON across 24 segments, with document extraction through n8n.

These are working components in our logistics software, which we built for our own group companies. We do not say any filing is "accepted" by a government system. Filing remains your declarant's responsibility, and our tooling prepares the data and checks it before they do.

## How is this different from an off-the-shelf OCR tool?

**Direct answer:** OCR tools turn pixels into text. Document intelligence goes further: it identifies the document, extracts named fields, validates them, and delivers them into your workflow. The gap is the validation and integration work, which is where most projects fail.

| Aspect | Plain OCR or template tool | Quantum Atlas pipeline |
|---|---|---|
| Output | Text or fixed-template fields | Validated, typed JSON |
| New layouts | Often needs a new template | Model-based, handles layout variation |
| Error handling | Passes errors through | Confidence routing and review queue |
| Integration | Export file | API, n8n, direct database writes |
| Audit trail | Rarely | Per-field source and confidence stored |
| Cost model | Per-page vendor pricing | Cloud API usage plus your hosting |

## How we deliver it

**Direct answer:** We start from a sample set of your real documents, build the pipeline against them, measure per-field accuracy, and tune before go-live. Delivery is containerised, observable and documented.

The architecture in words:

- **API layer.** A FastAPI service accepts files and exposes results.
- **Orchestration.** LangGraph runs the document through split, classify, extract, validate and route steps.
- **Extraction engine.** Google Document AI is the engine in our verified pipeline. Fine-tuning for unusual layouts uses Label Studio for labelling.
- **Validation.** Pydantic models define each document type. A failed check sends the field back for refinement or review.
- **Storage.** Postgres holds documents, fields, confidence scores and review decisions.
- **Observability.** Traces record confidence and timing per step so we can see where quality drifts.
- **Integration.** n8n or a custom API connects to your ERP, Tally, CRM or accounting system.

Document AI is a Google Cloud service, so documents are sent to Google for extraction. If your policy forbids that, we design an alternative with an on-premise engine and tell you in advance what accuracy trade-off we expect. [OWNER-CONFIRM: on-premise OCR engine choice and measured accuracy]

## What you own

- **Your documents and extracted data.** Stored in your Postgres.
- **The pipeline code.** Workflow definitions, schemas and extractors are delivered to you.
- **Your labelled samples.** Any training data prepared with Label Studio is yours.
- **Your infrastructure choices.** Run it on your servers or ours.

## When it is not the right fit

- You process a few documents a month. A person with a spreadsheet is cheaper and simpler.
- Your documents are handwritten, badly photographed, or in layouts so varied that no field is stable. We test on samples first and tell you if accuracy will not reach a useful level.
- You need a guarantee of 100% accuracy with no human review. Nobody can honestly give that. We design for human review where the cost of an error is high.
- You cannot share sample documents. We cannot scope accuracy without them.
- Your policy bars all external APIs and you cannot fund on-premise compute.

## Frequently asked questions

### How fast is the pipeline?

In our own testing, a three-page document took about 8 seconds, down from about 120 seconds on the earlier n8n OCR-plus-LLM flow. Speed depends on page count, document type, queue depth and hosting. We will run your sample batch and report real timings before you commit.

### What accuracy can I expect?

The extraction engine scored 99.4% confidence on header fields in our test. Confidence is not the same as accuracy on your documents. We measure field-level accuracy on your samples, report it per document type, and set review thresholds from the results.

### Can it process hundreds of documents at once?

The pipeline is built as queued, restartable steps, so bulk loads are a matter of workers and quota. We have not published a throughput figure, because it depends on the extraction engine's limits and your hardware. We will benchmark your batch in discovery. [OWNER-CONFIRM: documents-per-minute figure with a test run behind it]

### Where do the documents go during processing?

In the verified pipeline, documents are sent to Google Document AI for extraction and results are stored in your Postgres. If that is unacceptable, we scope an on-premise engine instead. We list every external call in the architecture sheet before you sign.

### Does it connect to Tally, an ERP or a CRM?

Yes, through n8n workflows or a custom API. We have built Tally-related ETL for our own group companies. For your system we check what interface it exposes, then agree what writes back and what stays read-only.

### Do you file customs declarations for us?

No. We build tooling that extracts data, computes duty, runs checklists and generates ICEGATE-format files and JSON. A licensed declarant reviews and files. We do not claim any government system accepts our output.

### What happens to low-confidence fields?

They do not pass through silently. Fields under the agreed threshold go to a refinement step or a human review queue, and the reviewer's correction is stored. Those corrections become labelled data you can use to improve the extractor.

### Can it analyse contracts, not just extract fields?

Yes, on top of extraction we can add clause search and question answering over your contract set using our retrieval stack. Every answer cites the clause it came from. See [enterprise RAG](/services/enterprise-rag) for how that works.

## Next step

Bring ten to fifty representative documents. [Book a discovery call](/contact) and we will tell you what the pipeline can read, and what it cannot.
