---
title: "Drawing Takeoff to BOQ: Symbol Counting on P&IDs (Pilot)"
slug: takeoff-drawing-to-boq
metaTitle: "Case Study: Drawing Takeoff to BOQ, Valve Recall 13/13"
metaDescription: "Pilot results from a drawing takeoff tool: valve recall 13/13 and 23/23 on a public P&ID set, 14 to 17 seconds per sheet. Limits stated."
h1: "Drawing takeoff to bill of quantities: a pilot on process drawings"
answerSummary: "A pilot tool reads engineering drawings, finds symbols and builds quantities for review. On a public 25-sheet P&ID set, symbol search found all 13 gate valves and all 23 plug valves, with 23 of 25 plug hits right before review, at 14 to 17 seconds per sheet. Dense untagged valve counting remains the weak spot."
schemaType: CreativeWork
lastReviewed: 2026-11-01
sources:
  - C:\projects\takeoff-saas\pilot\RESULTS.md
owner_confirm:
  - "[OWNER-CONFIRM: whether any customer drawings have been run; this page reports only public drawing sets]"
---

**Status: Pilot.** Results come from our own test sets (a public process-plant drawing set and public building plans), not from customer projects.

## What was the challenge?

Estimators count valves, instruments and equipment on process drawings (P&IDs) by hand, and measure rooms, walls, openings and finishes on building plans to build a bill of quantities (BOQ). It takes days per project, and counts vary between people. Tender documents add another layer: BOQ tables are often scanned.

The difficulty is that tags are text, but many symbols carry no tag. A model that reads text well can still miss a valve drawn as a bow-tie shape, and counts on dense manifolds vary from run to run.

## What was the approach?

1. **Read tagged items with a vision model.** Whole sheet plus tiles, with a strict output schema for equipment, lines, instruments and valves.
2. **Add symbol matching for untagged items.** The user marks one example symbol. Image matching searches all sheets at several scales and rotations, with a model check applied only to borderline scores. A vector method matches exact CAD blocks quickly where a set uses one block per symbol.
3. **Combine both.** The default for PDF jobs merges vector and image hits per page, with the vector result winning an overlap. Near matches arrive unticked for review.
4. **Review-first interface.** Reviewers untick false hits and can draw missing items.
5. **Civil quantities from geometry.** For building plans, quantities come from geometry modules (rooms, walls, openings, finishes, concrete) with rules from the Indian measurement standard, not from a model's guess. A scan-to-geometry step handles scanned plans.
6. **Tender checks.** A separate module reads tender text, checks eligibility clauses against a company profile and answers questions with page citations.

## What was the outcome?

On a public wastewater-plant P&ID set (25 sheets, P&ID sheets 9 to 25), truth was our own hand count.

| Metric | Image match | Vector match | Both (default) |
|---|---|---|---|
| Gate valves, recall | 13/13 | 10/13 | 13/13 |
| Plug valves, recall | 23/23 | 13/23 | 23/23 |
| Plug valves, precision before review | 23/25 | 13/13 | 23/23 |
| Time, 17 sheets | About 5 minutes | About 30 seconds | About 5.5 minutes |

Per sheet, image matching took 14 to 17 seconds on a laptop when uncontended. Model cost for a symbol search was a few US cents, about USD 0.013 to 0.028.

On text-tagged items, in a batch against 79 public test cases: equipment recall 105/109 (0.96) and precision 0.92; lines recall 43/47 (0.91); instruments recall 36/42 (0.86), precision 0.73.

For building plans, 10 of 10 single rooms on one reference plan were within 2% of the model's footprints. On degraded scans, performance fell: for clean renders, the target of 90% of rooms within 3% was not met (46% of truth rooms, 79% of those the code marked confident).

## What did we learn?

- **Text-tagged items are near production grade; untagged counts are not.** Valve counting needs symbol detection and review.
- **Thin margins deserve honesty.** The lowest true match score was 0.66 against a 0.62 threshold. A different drawing set may need tuning.
- **Combine methods.** Vector matching is fast and exact but misses redrawn variants. Image matching is slower but tolerant. Together they gave full recall here.
- **Do not take quantities from a language model.** Geometry and written rules make a number checkable by hand.
- **Say what was not met.** Some targets in this pilot were missed, and the page says so.

## Limits

One drawing set per result. Small sample: the set contains few plain gate valves. Reviewed by a person before use. No claim about customer-project accuracy.

## Stack

Python, a vision language model with structured JSON output, template image matching, PyMuPDF vector extraction, Stirling PDF and LLMWhisperer for OCR of scanned pages, and a web review screen.

## Where does this apply?

[Manufacturing](/industries/manufacturing) and engineering firms that estimate from drawings. [Book a discovery call](/contact).
