---
title: "Automating Customs Filing with AI: Checklists, Duty Computation and ICEGATE-Format Files"
slug: automating-customs-filing-with-ai
category: ai-implementation
excerpt: "How we turn a packet of import documents into a reviewable Bill of Entry checklist, a line-by-line duty computation, and export files shaped to ICEGATE's schema, and the rules we hold ourselves to when a wrong value costs more than a blank."
metaTitle: "Automating Customs Filing: BoE Checklist and Duty"
metaDescription: "How extraction, a duty cascade and a versioned checklist turn import documents into a Bill of Entry draft, and why wrong data is worse than missing data."
readTime: 10
tags: [customs, bill-of-entry, icegate, duty-computation, document-extraction, logistics, cha]
schemaType: Article
author: Quantum Atlas Engineering
technicalReviewer: "[OWNER-CONFIRM: technical reviewer name + LinkedIn]"
faqs:
  - q: "What is a Bill of Entry checklist?"
    a: "It is the document a customs house agent prepares before filing a Bill of Entry. It shows the importer, invoices, line items, classification and calculated duties so that the client can check and approve what will be filed."
  - q: "Can AI file a Bill of Entry on its own?"
    a: "Our systems do not file on their own. They extract data, compute duty, flag gaps and produce files and checklists for a licensed customs professional to review and submit. Legal declarations are never asserted automatically."
  - q: "Do your files get accepted by ICEGATE?"
    a: "We model fields to ICEGATE's published schema, with its names, lengths and code lists, and we test exports against filed checklists. We do not claim acceptance by ICEGATE for any file. Acceptance is decided by the customs system at submission."
  - q: "How is import duty calculated line by line?"
    a: "Each line takes a tariff row for its classification code, which gives basic duty, social welfare surcharge and IGST rates, plus any other applicable measures. Duties are then computed in sequence on the assessable value, with each tax's base defined by the rules."
  - q: "Why show gaps to the client instead of hiding them?"
    a: "The client is approving the figures. A duty that could not be computed has to say so on the document. Hiding it, or greying it out quietly, makes the approval meaningless."
sources:
  - title: "ICEGATE: Indian Customs EDI Gateway"
    url: "https://www.icegate.gov.in"
  - title: "Central Board of Indirect Taxes and Customs (CBIC)"
    url: "https://www.cbic.gov.in"
  - title: "Google Cloud: Document AI documentation"
    url: "https://cloud.google.com/document-ai/docs"
  - title: "n8n documentation"
    url: "https://docs.n8n.io"
lastReviewed: 2026-11-01
owner_confirm:
  - "[OWNER-CONFIRM: technical reviewer name + LinkedIn]"
  - "[OWNER-CONFIRM: licensed customs professional to review the duty-cascade description before publication]"
---

# Automating Customs Filing with AI: Checklists, Duty Computation and ICEGATE-Format Files

*By Quantum Atlas Engineering. Technical reviewer: [OWNER-CONFIRM: technical reviewer name + LinkedIn]. Last reviewed 1 November 2026.*

Filing a Bill of Entry for an import is a data entry problem wrapped in a liability problem. The data comes from invoices, packing lists, bills of lading and certificates in assorted layouts. The liability is that the importer's customs agent signs off on what is filed, and a wrong figure that is accepted costs more than a blank that gets queried.

This post describes the systems we have built around that work: extraction of shipment documents into structured data, a checklist the client can approve, line-by-line duty computation, and export files shaped to ICEGATE's schema. It also describes the rules we apply, because in this domain the rules matter more than the model. We describe what the software does. It supports a licensed customs professional. It does not replace one, and it does not make filing decisions.

## What does a customs checklist actually do?

**Short answer:** It is three things at once: a working picture of the shipment for staff, a document a customs officer can read before filing, and the client's approval of exactly what will be filed. Because of the third role, it has to be a statement of record, not a draft.

Seen that way, several design decisions follow. Blanks are normal: an IGM number or Bill of Entry number is often not yet known when the checklist is produced, so the document must not refuse to print without them. Gaps, however, must be visible to the client, not only the operator, because the client is approving duty figures. A figure that could not be computed has to say so.

And a reprint after an edit can silently void an earlier approval. To handle that, every issued checklist is stored as a full snapshot with a version number printed on the page. The screen shows three states: not issued, issued as a version, and a clear "changed since" warning if the figures have moved since issue. Paper on a desk can then be matched to what the system holds, and reproducing version 1 is a database lookup, not a reconstruction against today's tariff.

## How does the pipeline run from documents to a Bill of Entry draft?

**Short answer:** Documents are uploaded and extracted, an operator verifies and corrects the extraction, the system stages line items and generates a draft, the operator adds duty rates and notifications, and only then are checklist and export files produced.

1. **Upload.** The client or operator uploads the shipment documents: commercial invoice, bill of lading or airway bill, packing list, certificate of origin, insurance and freight documents.
2. **Extract.** An automated flow reads each document with OCR and a language model and stores the raw extraction in `original_data`.
3. **Verify.** An operator checks the extraction against the PDF and saves corrections in `corrected_data`. The rule in code is simple: use corrected data if it exists, otherwise fall back to the original extraction.
4. **Stage.** Invoice line items are copied into a staging table keyed by shipment and item number.
5. **Generate.** A draft Bill of Entry is created, with line items copied into a Bill-of-Entry-specific table that carries duty fields.
6. **Review.** The operator adds duty rates and notifications, confirms declarations, and resolves flagged gaps.
7. **Issue and export.** The checklist is issued as a versioned snapshot, and the export files are produced.

## How is duty computed for each line?

**Short answer:** Each line looks up a tariff row for its classification code, which supplies basic customs duty, social welfare surcharge and IGST rates. A calculation function applies them in sequence on the assessable value. Where a rate cannot be determined, the system raises a flag instead of guessing.

The calculation is a cascade: each duty has a base, and the base of one can include the amount of another. The details of that cascade were not written from memory. We checked them against real, filed checklists, and one example matters: the surcharge base excludes anti-dumping, countervailing and safeguard duties, a point confirmed against a filed document rather than assumed.

Three kinds of rule keep the output honest:

- **Absent is not zero.** ICEGATE omits a duty key when a duty does not apply. An empty notification list after a failed fetch means unknown, not none. We preserve that difference in storage and on screen.
- **Do not guess measures that depend on facts the code cannot see.** Anti-dumping and countervailing measures name specific combinations of country of origin, country of export, producer and exporter, and they lapse on dates. Our data holds hundreds of such measures, but the system raises a flag for an operator to decide rather than applying one to a line automatically.
- **Quarantine impossible tariff rows.** When a loaded tariff row implies a basic duty higher than the tariff's own ceiling, the row is set aside for review. It is never silently repaired.

| Situation | What the system does | Why |
|---|---|---|
| Rate found in tariff row | Computes the duty | Normal case |
| Surcharge cannot be derived from the row | Computes none, raises a flag | A made-up figure would be worse |
| Trade-remedy measure may apply | Raises a flag, assigns no rate | Applicability depends on origin, exporter and dates |
| Notification fetch failed | Marks as unknown | Absent and unknown are different facts |
| Rate has changed over dated periods | Operator confirms against clearance date | The right rate depends on the date |

## What does "ICEGATE-format file" mean, and what does it not mean?

**Short answer:** It means our data model uses ICEGATE's published names, lengths and code lists, and our exports follow those shapes. It does not mean ICEGATE has accepted any particular file. Acceptance happens at submission, in the customs system, and we make no claim about it.

When we add a field, we check ICEGATE's schema first and adopt its naming, maximum length and code list rather than inventing our own. This has caught real cases: country as a two-letter ISO code, declaration codes, units and importer types as enumerations, and an invoice number limited to 16 characters. A checklist prints whatever it is given. A submission rejects it. So length limits belong at the point of data entry, where fixing them is cheap.

The same reading of the schema gave us a list of fields that are mandatory at filing: 17 on the Bill of Entry, 12 on the invoice and 12 per item. Mandatory-at-filing is not the same as mandatory-to-print. The checklist prints correctly without them, but the interface tells the operator which are missing, so a job does not reach the port and stop.

Another design point comes from the schema: a line is identified by invoice number plus item number, because item numbers restart on each invoice. Any system keyed on one running serial is wrong on a Bill of Entry with several invoices, which are common.

We also produce the Logisys CSV layout that customs house agents commonly use. We hold its layout exactly, because staff at the port read it during clearance, and a "better" layout would be a worse product. A test guards the header and the CSV quoting.

## How do you stop an AI system from asserting a legal declaration?

**Short answer:** By design. The system derives candidate declarations, shows its reasoning, and requires a person to confirm. It never auto-asserts a declaration.

Some declaration codes state legal facts. One asserts that the buyer and seller are related; another asserts that the transaction value is acceptable. A wrong duty rate costs money, but a wrong declaration is a different category of problem. So the system shows why a code is suggested and waits.

The same principle governs extraction. Wrong data is worse than missing data: a blank gets queried at assessment, a wrong value gets accepted. So an extractor must never copy the supplier into the manufacturer field, never infer a related-party flag, and never fill a field only because the schema asks for one.

## What is the architecture?

A web application handles screens and the checklist. A separate worker process runs extraction: classification, the pipeline and field extraction. That split matters operationally, because restarting only the web service leaves extraction running on old code while every screen shows the new one. The database holds documents, staged line items, Bill-of-Entry line items with duty fields, tariff and notification data, and checklist snapshots. Access is closed by default: every route is private unless it has been deliberately listed as public.

Quality checks are built around real filings. A script parses actual filed checklists and compares our computed values with them, since a filed checklist is ground truth. Where our model and a filed document disagree, the filed document wins. A failing check stops work: no new piece starts while the last one is red.

## What would we do differently?

- **Write down what the checklist is on day one.** The three-part definition above was not written down until well into the project, and it explains decisions that kept being re-argued.
- **Model to the filing schema from the start.** We designed around what prints on the checklist first, and had to go back for fields the filing carries but the checklist never shows: filing class, importer type and similar.
- **Distrust plausible values earlier.** Several tariff mappings were marked confirmed because their values looked sensible. A useful test is that a duty that never varies independently of another is not a separate duty.
- **Make the deploy recipe impossible to half-run.** Two services must restart after a change, and forgetting the second cost hours. A single deploy command would have saved them.
- **Show applicable trade-remedy measures to the operator sooner.** We hold the data. Presenting candidates with the reasons they might apply is the next step, always with a person deciding.

## Frequently asked questions

**What is a Bill of Entry checklist?**
It is the document a customs house agent prepares before filing a Bill of Entry. It shows the importer, invoices, line items, classification and calculated duties so that the client can check and approve what will be filed.

**Can AI file a Bill of Entry on its own?**
Our systems do not file on their own. They extract data, compute duty, flag gaps and produce files and checklists for a licensed customs professional to review and submit. Legal declarations are never asserted automatically.

**Do your files get accepted by ICEGATE?**
We model fields to ICEGATE's published schema, with its names, lengths and code lists, and we test exports against filed checklists. We do not claim acceptance by ICEGATE for any file. Acceptance is decided by the customs system at submission.

**How is import duty calculated line by line?**
Each line takes a tariff row for its classification code, which gives basic duty, social welfare surcharge and IGST rates, plus any other applicable measures. Duties are then computed in sequence on the assessable value, with each tax's base defined by the rules.

**Why show gaps to the client instead of hiding them?**
The client is approving the figures. A duty that could not be computed has to say so on the document. Hiding it, or greying it out quietly, makes the approval meaningless.

## Sources and further reading

- ICEGATE, Indian Customs EDI Gateway: https://www.icegate.gov.in
- Central Board of Indirect Taxes and Customs: https://www.cbic.gov.in
- Google Cloud, Document AI documentation: https://cloud.google.com/document-ai/docs
- n8n documentation: https://docs.n8n.io

*Moving a documents-heavy process into software? Book a discovery call at https://quantumatlas.dev/contact.*
