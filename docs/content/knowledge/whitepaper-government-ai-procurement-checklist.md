---
title: "Government AI Procurement: A Technical Requirements Checklist"
slug: government-ai-procurement-checklist
type: whitepaper-outline
gated: true
category: compliance
service: rag
status: outline-and-abstract-only
metaTitle: "Government AI Procurement Technical Checklist"
metaDescription: "A technical checklist for government buyers drafting AI tenders: data position, access control, audit, citations, exit, support and evaluation criteria."
lastReviewed: 2026-11-01
owner_confirm:
  - "[OWNER-CONFIRM: technical reviewer name + LinkedIn]"
  - "[OWNER-CONFIRM: procurement-rules reference (GFR / state rules) to be added after review by someone expert in public procurement]"
---

# Government AI Procurement: A Technical Requirements Checklist

## Abstract (for the download page)

Writing a tender for an AI system is difficult because technical requirements that sound similar can lead to very different systems. This checklist helps government departments and public bodies turn their needs into testable requirements: where data lives, who can read what, what is logged, how answers are verified, how a vendor can be replaced, and how proposals are evaluated. It is general guidance, not legal advice, and it does not replace your department's procurement rules. It makes no claim about any specific department or vendor.

Length target: 10 to 14 pages. Format: PDF, with the checklist as a one-page tear-out and an editable table.

## Outline

1. **How to use this document** (half page)
   - It supports drafting; it does not replace your procurement rules or legal advice.

2. **Write the need before the specification** (1 page)
   - Users, documents, questions, decisions affected. Examples of well-stated needs.

3. **Data position requirements** (1.5 pages)
   - Deployment models: managed, own cloud, on-premise, air-gapped.
   - A component table to complete: database, embeddings, models, tracing, backups, updates.
   - Sample requirement wording: "No document text, query or derived embedding shall leave the specified environment."

4. **Access control requirements** (1.5 pages)
   - Roles, classes of document, groups; fail-closed behaviour; enforcement location; leakage tests as an acceptance criterion.
   - Identity integration with the department's directory.

5. **Audit and record-keeping requirements** (1.5 pages)
   - What is logged, retention, export, protection of logs, audit-view confidentiality.

6. **Answer quality and citation requirements** (1.5 pages)
   - Citations to document, version and passage; handling of unknown answers; version awareness; human review where decisions are affected.

7. **Evaluation and acceptance testing** (1.5 pages)
   - Supplying a test set; measuring on the department's own documents; criteria fixed before proposals are opened; demonstration with network access removed.

8. **Security and assurance** (1 page)
   - Asking for certificates and reports in writing, with scope and dates. Penetration testing; vulnerability handling; staff access to the environment.

9. **Exit, portability and continuity** (1 page)
   - Open data formats, export on termination, verified deletion, source escrow or equivalent where appropriate, avoiding proprietary lock-in.

10. **Support and operations** (1 page)
    - Who operates what; response expectations; offline update process; training and handover.

11. **Pricing structure questions** (half page)
    - Ask bidders to separate one-time, recurring and usage-based costs, and to state what is excluded. No price benchmarks in this document.

12. **Scoring template** (1 page)
    - A weighted table to adapt; mandatory versus desirable requirements.

13. **About Quantum Atlas** and a link to book a discovery call at https://quantumatlas.dev/contact.

## Notes for the author

- Do not state any customer, department or pipeline relationship.
- No certification claims about Quantum Atlas. Quote public sources only (for example NIST SP 800-53 as a control catalogue), with URLs verified.
- Procurement-rule references must be added only after expert review.

## Email capture

Fields: name, work email, organisation, role (optional). Consent line as in the other whitepapers. Delivery of the PDF is triggered on submission.
