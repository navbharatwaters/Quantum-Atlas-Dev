---
title: "Customs Clearance Automation: From Air-Import Packet to Checklist"
slug: customs-clearance-automation
metaTitle: "Case Study: Air-Import Packet to Customs Checklist"
metaDescription: "How a customs group built packet extraction, a client checklist, duty computation and ICEGATE-format output. Status: pilot, no live filing yet."
h1: "Customs clearance automation: from air-import packet to approved checklist"
answerSummary: "An internal pilot at a customs brokerage group turns a global express carrier's air-import packets into a reviewed checklist, duty figures and an ICEGATE-format flat file and JSON. It runs in parallel with the existing filing system. As of the last recorded measurement, no Bill of Entry had been filed from it."
schemaType: CreativeWork
lastReviewed: 2026-11-01
sources:
  - C:\projects\import BOE\CLAUDE.md
  - C:\projects\import BOE\TODO.md
  - C:\projects\import BOE\PLAN-replace-logisys.md
  - C:\projects\import BOE\docs\dhl-packet-structure.md
  - C:\projects\import BOE\app\src\tools\emit_be.ts
  - C:\projects\import BOE\docs\ikargos-duty-handoff.md
  - C:\projects\cha-frontend\docs\BE_FLATFILE_IMPLEMENTATION.md
owner_confirm:
  - "[OWNER-CONFIRM: current count of packets processed, checklists issued and Bills of Entry filed; figures here are as of early September 2026]"
  - "[OWNER-CONFIRM: permission to describe the carrier relationship beyond 'a global express carrier']"
---

**Status: Pilot.** Built and run by our own group. It has extracted packets and produced checklists, but it has not yet carried a live filing. We say so because customs filings are legal declarations.

## What was the challenge?

A customs broker clearing air-import shipments for a global express carrier receives one merged PDF per shipment, named by the airway bill number. In the sample set we studied, packets ran from 1 to 7 pages, and 14 of the 16 pages were scans: invoice, packing list, certificate of origin. Staff read each packet, key the values into a filing system, look up tariff rates, compute duty, and print a checklist for the client to approve before the Bill of Entry is filed.

The risks are specific. Weights arrive in kilograms on one packet and pounds on another, and a pound figure read as kilograms is a 2.2 times error. Declared value on the waybill may differ from the commercial invoice total. The destination port varies. A blank field gets queried at assessment, but a wrong value gets accepted.

## What was the approach?

We built a pipeline in stages, each tested before the next began.

1. **Intake and classification.** Each packet is split into pages, and every page is classified by type.
2. **Targeted hybrid extraction.** Every packet we sampled carried exactly one native, system-generated waybill page. That page is parsed deterministically, with no model call, which gives exact values. The scanned pages go to vision-based extraction. The waybill supplies an independent cross-check for what vision reads.
3. **Assembly with a "wrong is worse than missing" rule.** The system never copies supplier into manufacturer or infers a related-party flag, and it leaves a field blank rather than fill it because a schema asks for one. Units are stored beside each number.
4. **Tariff and duty computation.** Rates come from a versioned tariff master. The duty engine distinguishes a duty that does not apply (key absent) from one that is unknown (lookup failed).
5. **Checklist.** A client-facing document shows the shipment, line items and duty figures, and prints any gap visibly so the client's approval means something. Issued checklists are snapshotted and versioned, and a later change shows "Changed since v1".
6. **Output.** The model emits an ICEGATE-format `.be` flat file and BE JSON, plus a CSV for the existing filing software. A file with outstanding fields is still produced for comparison but is marked not filable. Signing is a separate step with a digital signature token.

Stack: Next.js, TypeScript, PostgreSQL, a separate extraction worker, Clerk for authentication, Caddy, and a model-based vision extraction step. It also uses row-level tenant separation and an authenticated-by-default route policy.

## What was the outcome?

Measured facts only. There is no claim here about time saved or cost, because no controlled comparison has been run.

| Metric | Before | After (verified) |
|---|---|---|
| Waybill header fields | Keyed by hand | Parsed from the native page without a model call |
| Weight unit handling | Assumed or retyped | Unit stored with value; 88.0 LB flagged as 39.9 KG |
| Checklist versioning | Print and overwrite | Snapshot per issue; changes after issue flagged |
| Output formats | CSV for existing software | CSV plus ICEGATE-format flat file and JSON |
| Packets processed (early Sep 2026 record) | 0 | 151 extracted |
| Checklists issued (same record) | 0 | 1 |
| Bills of Entry filed from the system | 0 | 0 |

The last two rows are the honest ones. The engine is well evidenced; it has not yet carried a live job. The planned gate is the system's checklist matching the existing system's to the paisa on 50 consecutive jobs, run in parallel with nothing filed from it.

## What did we learn?

- **Read the sample before designing.** The first assumption was vision-only because packets are scans. One native page per packet changed that into a hybrid and gave a free cross-check.
- **Verify against an independent source.** Several field mappings looked right and were not. A duty that never varies independently of another duty is probably not a separate duty.
- **Do not hard-code what the data shows varies.** The destination was assumed to be one city; the sample showed another.
- **Parallel running beats a switch-over.** Every disagreement with the existing system is a defect found without a consignment at risk.
- **Deploy checks matter.** Two services (screens and extraction worker) must restart together, or fixes appear to fail while correct.

## Stack

Next.js, TypeScript, PostgreSQL, vision-model extraction, deterministic PDF text parsing, versioned tariff master, ICEGATE flat file (CACHI01 format) and JSON generators, Clerk, Caddy, systemd.

## Where does this apply?

[Logistics and shipping](/industries/logistics-shipping), customs brokers, freight forwarders. [Book a discovery call](/contact) to discuss your own packet types.
