---
title: "LoadWise: 3D Container and Truck Load Planning"
slug: cargofit-load-planning
metaTitle: "Case Study: 3D Container Load Planning, 74.4% Fill"
metaDescription: "How we built a load planner that fits 144 pieces into one 40 ft container at 74.4% fill and validates every plan in the browser. Live in customer trials."
h1: "Container and truck load planning: 144 pieces, one 40 ft container, 74.4% fill"
answerSummary: "LoadWise turns a cargo list into a validated 3D loading plan for containers and trucks. In a demonstration solve it placed 144 pieces into one 40 ft standard container at 74.4% fill. The packing engine runs in the browser, and every plan is machine-checked before display. It is live and in customer trials, not yet fully launched."
schemaType: CreativeWork
lastReviewed: 2026-11-01
sources:
  - C:\projects\cargofit\README.md
owner_confirm:
  - "[OWNER-CONFIRM: number of customer-trial users and whether the production authentication-key switch is complete]"
---

**Status: Pilot.** Live at the group's own domain and in customer trials. The repository notes one pre-launch item: switching from development to production authentication keys.

## What was the challenge?

A freight desk asks four questions about a consignment. Will it fit, and if not, in which containers? In what order should the crew load it? Is it within payload and axle limits? How do we hand the plan to the warehouse? Teams often answer by eye or in spreadsheets. Errors show up at the dock: cargo that does not fit, an unsafe stack, or a box that is legal at sea but over the weight limit on the truck to the port.

Cargo lists also arrive in whatever format the office has: Excel with headers such as `L (cm)` and `Gross Wt.`, or a packing-list PDF.

## What was the approach?

1. **A pure packing engine.** The solver is TypeScript with no React, DOM or Node dependencies, so it runs identically in a browser worker and in automated tests.
2. **Multiple strategies, best result kept.** An extreme-point placement heuristic runs under several competing strategies (volume, base area, height, heavy-first, and others).
3. **Validation before display.** Every plan is checked for overlaps, bounds, floating cargo, at least 80% base support, stacking limits, weight limits and rotation locks. A plan that fails is never shown.
4. **Multi-container selection.** Given the cargo, it answers with a least-count combination and cascades overflow into the next container.
5. **Legality modelling.** Weight and axle checks reference CMVR 2018, the EU directive 96/53/EC and the US federal rule 23 CFR 658.17, with per-preset caveats, plus a road-leg check for ocean containers.
6. **Loading sequence.** The sequence is column-first, building a full-height wall at the far end and retreating toward the door, because a floor-first order seals the container before a second tier can be built. A topological pass ensures no box is sequenced before the one it rests on.
7. **Import.** Spreadsheet import with automatic column mapping and unit detection, row-level validation, and PDF packing-list extraction.
8. **Outputs.** PDF plan, Excel manifest and share links.
9. **Tenant isolation.** Each customer workspace is separated at the database with row-level security, and a query outside the wrapper returns zero rows.

Because solving runs in the browser, cargo data never leaves the device during the solve.

## What was the outcome?

| Metric | Before | After (verified) |
|---|---|---|
| Demonstration load | Planned by eye or spreadsheet | 144 pieces placed in one 40 ft standard container |
| Fill achieved in that solve | Not measured | 74.4% |
| Plan checks | Manual | Machine-validated before display |
| Large inputs | n/a | 1,000+ boxes in under two seconds (project's stated figure) |
| Hand-off | Verbal or sheet | PDF plan, Excel manifest, share link |

The 74.4% figure is one demonstration solve, not an average across customer loads. Fill depends on the cargo's shape, weight and stacking rules, and a good plan is sometimes lower than a theoretical maximum because of those rules. The test suite includes regression scenarios with minimum fill thresholds, fuzz tests and benchmarks, but we have not published a benchmark across customer data.

## What did we learn?

- **Plans must be loadable, not just feasible.** The loading sequence mattered as much as the fill percentage.
- **Validate everything the solver outputs.** An independent validator caught heuristic changes that quietly lost fill or broke rules.
- **Legal at sea is not legal on the road.** The drayage check exists because real consignments hit it.
- **Messy import is the real onboarding barrier.** Column mapping and unit sanity warnings matter as much as the packing.
- **Fix bugs test-first.** Every packing bug starts with a failing test.

## Stack

Next.js 14, TypeScript, Tailwind, shadcn/ui, three.js, Zustand, Web Workers, PostgreSQL with row-level security, Prisma, Clerk organisations, zod, Caddy and systemd.

## Where does this apply?

[Logistics and shipping](/industries/logistics-shipping) and [manufacturing](/industries/manufacturing) dispatch teams. [Book a discovery call](/contact).
