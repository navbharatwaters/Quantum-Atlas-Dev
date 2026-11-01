---
title: "Tracking 54,000 Tenders a Day: Engineering a Government Tender Radar"
slug: tracking-54000-tenders-daily
category: ai-implementation
excerpt: "A nightly crawler across 20 Indian e-procurement portals, a keyword model that filters noise, a stable identity for each tender, and a morning digest. What we built, the traps we hit, and what is deliberately out of scope."
metaTitle: "Tender Radar: Crawling 20 Portals Nightly"
metaDescription: "How we built a nightly tender radar over 20 Indian e-procurement portals: session-aware crawling, tiered scoring, stable identity and a morning digest."
readTime: 10
tags: [tender-monitoring, web-crawling, playwright, procurement, automation, postgresql, scheduling]
schemaType: Article
author: Quantum Atlas Engineering
technicalReviewer: "[OWNER-CONFIRM: technical reviewer name + LinkedIn]"
faqs:
  - q: "How many tenders does the radar process?"
    a: "The last full run covered 20 portals and 54,526 tenders with no failures. That is the size of the active list the crawl reads each night, not the number of new tenders. Only matches above a score threshold reach the morning digest."
  - q: "How does it avoid showing the same tender twice?"
    a: "Each tender is keyed on a hash of portal, reference number and normalised title. Portal detail links are session tokens that expire, so they cannot be used as identity. A tender already reported is not reported as new again."
  - q: "Does it get past CAPTCHAs?"
    a: "No. We deliberately use listing routes that have no CAPTCHA. Tender documents on those portals sit behind a CAPTCHA, so downloading them is a manual step and is out of scope for the automated radar."
  - q: "Does it scrape GeM?"
    a: "No. GeM disallows automated access in its robots.txt. We use GeM's own email alerts for registered sellers instead and feed them into the same scoring."
  - q: "Why must the crawler run from India?"
    a: "Several portals are unreachable from European servers and the rest are about four times slower. Measured from a Mumbai host versus a European one, some timed out entirely from Europe."
sources:
  - title: "Playwright for Python documentation"
    url: "https://playwright.dev/python/docs/intro"
  - title: "RFC 9309: Robots Exclusion Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc9309"
  - title: "PostgreSQL documentation: Window functions"
    url: "https://www.postgresql.org/docs/current/functions-window.html"
  - title: "n8n documentation"
    url: "https://docs.n8n.io"
lastReviewed: 2026-11-01
owner_confirm:
  - "[OWNER-CONFIRM: technical reviewer name + LinkedIn]"
  - "[OWNER-CONFIRM: whether the operating business may be named in this article; it is described generically here]"
  - "[OWNER-CONFIRM: confirm the 20-portal and 54,526-tender figures are current as of publication]"
---

# Tracking 54,000 Tenders a Day: Engineering a Government Tender Radar

*By Quantum Atlas Engineering. Technical reviewer: [OWNER-CONFIRM: technical reviewer name + LinkedIn]. Last reviewed 1 November 2026.*

Government tenders are public, and still easy to miss. They are spread across dozens of portals, each with its own layout and its own habits. A bid desk that checks a handful of them by hand sees a fraction of what is published. We built a tender radar for an industrial water-treatment business to fix that: every night it reads the active tender lists on 20 Indian e-procurement portals, scores each tender against a keyword model, stores everything in PostgreSQL, and posts a digest of the matches in the morning.

The headline number needs one clarification up front. The last full run covered 54,526 tenders across 20 portals with no failed portals. That is the size of the active listings the crawl reads, not the number of new tenders each day. The digest contains only the small fraction that scores as relevant.

## What does the radar actually do each night?

**Short answer:** It crawls the active tenders on each configured portal, scores them against a tiered keyword model, stores every row, finds the ones not reported before, and posts a digest with a spreadsheet of the live tenders to the team's chat channel.

A scheduled timer starts the run at 03:32 India time. Each portal is crawled in isolation. If one fails, the failure is recorded and surfaced in the digest under a "crawler issues" heading, so a silently broken adapter cannot cause a silently missed bid. When the crawl finishes, the digest job builds two streams, one for consumables and one for projects and services, each with its own score floor, and attaches a bid-desk spreadsheet.

## How is the system laid out?

**Short answer:** A Python crawler in a container, driven by Playwright for portals that need a browser session, with PostgreSQL as the source of truth, a systemd timer for scheduling, a chat webhook for the digest, and a Grafana dashboard for health.

| Layer | Choice | Why |
|---|---|---|
| Scheduler | systemd timer, daily 03:32 IST | Simple, logged, restartable, no extra service |
| Crawler | Python with Playwright | Portals need a real browser session |
| Per-portal config | One YAML entry per portal | Adding a state portal is one entry |
| Scoring | Tiered keyword model in YAML | Tunable without redeploying |
| Storage | PostgreSQL | Source of truth, searchable full corpus |
| Output | Chat digest and XLSX | Where the bid desk already works |
| Monitoring | Grafana dashboard, run records | Seeing quiet failures |
| Backups | Nightly dump, verified, pulled off-site | The human decisions cannot be re-crawled |

## Why can't you just use an HTTP library?

**Short answer:** Because the dominant portal software is session-scoped. A cold request redirects to the home page, and every detail link carries a token that dies with the session. You need a browser session and you cannot treat links as stable.

About ten of the portals run the same government application (NIC's GePNIC). A direct request to a listing page redirects to home. The adapter therefore opens the portal's base page first to establish a session, then walks the listing. Two things follow:

- **Detail URLs are not identity.** They expire minutes after the crawl. Reports link to the portal's organisation index plus the tender ID instead of a dead deep link.
- **Anything that lives behind a detail link must be fetched during the crawl.** Value and earnest-money deposit are captured inside the crawl loop, never in a later pass, because the link will not work later.

## Which listing route works, and which are traps?

**Short answer:** Of three plausible routes on the dominant portal software, only the "tenders by organisation" listing gives full coverage without a CAPTCHA. The others are a CAPTCHA, a CAPTCHA, or a list that only shows tenders closing today.

| Route | What it really gives | Verdict |
|---|---|---|
| Listing by date | Only tenders closing today, a few hundred rows | Trap: sees tenders only when their deadline has arrived |
| Latest active tenders | Full list behind a CAPTCHA | Not usable |
| Advanced search | Server-side search behind a CAPTCHA | Not usable |
| Tenders by organisation | Every organisation, then all of its active tenders on one page | Works, no CAPTCHA |

Full coverage of a portal this way takes one request for the organisation index plus one per organisation: about 244 requests and nine minutes for a large portal. We pull the whole active list and filter locally rather than search server-side. It uses more bandwidth, and it means a keyword change costs nothing because the data is already there.

## How does a tender keep a stable identity?

**Short answer:** We hash portal, reference number and a normalised title. That key survives session changes and re-crawls, so the same tender seen tomorrow is recognised as the same tender.

The identity is a SHA-256 of the portal identifier, the reference number and the normalised title. On each run the crawler either inserts a new row or recognises an existing one. Two columns carry what a person did and what the system reported: a status (for example shortlisted, bidding, ignored, or unscored) and a reported-at timestamp. These matter more than the crawl data, because a crawl can be repeated and a human decision cannot.

Losing the reported-at column would be the sharp edge. The next digest would announce hundreds of tenders as new, which is exactly how people learn to ignore a channel. That is why the backup design protects those columns specifically.

A database trigger logs any change to a closing date into a corrigenda table, and the digest shows "deadline changed" items last. There is no separate corrigenda crawler. The daily crawl already absorbs the new date. What was missing was the notification.

## How does the scoring keep noise out?

**Short answer:** Terms are tiered. Strong terms score alone, weak terms score only with a context word, and negative terms subtract. A noise list built from the business's own out-of-scope tenders is pinned as regression tests.

Plain keyword matching drowns in false positives: "filter" matches air filters, "cartridge" matches printer toner, "membrane" matches roofing. The model used here:

| Tier | Behaviour |
|---|---|
| Strong terms | Score on their own |
| Abbreviations | Word-boundary, case-sensitive; very short ones need context |
| Weak terms | Score only if a context word is also present |
| Context words | Show the tender is about water |
| Negative terms | Subtract enough to push noise below the floor |

The model is tuned by editing a YAML file. A test command scores a single title, and a regression suite of 40 cases pins both matches and the noise that used to get through. The rule is to add a case whenever a keyword is added, and to add the offending title as a noise case before fixing anything the digest surfaces that it should not have. After a keyword edit, a rescore command re-applies the model to stored rows, because scores are frozen at crawl time.

## What are the operational traps?

**Short answer:** Location, pacing, time zones and network egress. Each cost us time and each is the kind of problem a first demo never shows.

- **Run it from India.** Measured against the same portals from a European host and a Mumbai host, defence, Uttar Pradesh and Gujarat portals timed out or failed from Europe, and the rest were about four times slower. Some portals also challenge foreign addresses with CAPTCHAs far more readily. The most productive portal in our data would have returned nothing, silently, from the wrong region.
- **Pace like a polite visitor.** Forty-five seconds, give or take 15, between portals; about a second and a half between pages; strictly serial. During development a few hundred rapid requests got our address throttled by a major portal for the better part of an hour. Nobody reads the digest before morning, so speed buys nothing but a ban. Develop against saved pages, not the live site.
- **Pin the time zone.** The host runs on a European time zone and the container image has no time-zone database by default, so without explicit configuration it falls back to UTC. A five-and-a-half-hour offset moves tenders onto the wrong day.
- **Isolate the crawler's network identity.** Crawl traffic leaves through a dedicated address so that portal throttling cannot affect other services on the same host.
- **Apply the migration, then rescore.** Schema changes are idempotent scripts applied by hand and committed.

## What is deliberately out of scope?

**Short answer:** We do not solve CAPTCHAs, we do not scrape portals that forbid it, and we do not automate downloading tender documents that sit behind a CAPTCHA.

On the dominant portals, the tender documents themselves are CAPTCHA-protected. Our radar tells the team that a tender exists, when it closes, and why it scored. Getting the documents is a manual download. A follow-up job can send the day's top tenders to an analysis service for an eligibility read, but when the documents are behind a CAPTCHA most items start as "documents need manual download". We would rather say that than imply the pipeline reads the full bid pack.

GeM is also excluded from crawling: its robots.txt disallows automated access, and scraping it would put a seller registration at risk. Registered sellers already receive email and SMS alerts for bids that match their listed catalogue, so we read those alerts through a mailbox adapter and score them with the same model. The trade-off is commercial rather than technical: you are only alerted on the categories you have listed.

## How would you build one? A step list

1. **Write down the scope** of what counts as relevant and, equally, what does not.
2. **List the portals** and group them by software. One adapter often covers many.
3. **Prove one portal end to end** against saved pages before touching the live site.
4. **Establish identity** by hashing stable fields, not links.
5. **Build the tiered keyword model** and a regression suite including known noise.
6. **Store every row,** not only matches, so you can re-score and search later.
7. **Isolate failures per portal** and report them in the digest.
8. **Schedule it** with a timer, and pin the time zone.
9. **Back up the human layer** and test a restore.
10. **Watch it** with a dashboard that shows runs, rows seen and failures.

## What would we do differently?

- **Check each portal's reachability from the target region before choosing a host.** We measured it before deploying, and we would make that a formal first step.
- **Capture routes in a document as we learn them.** The listing-by-date trap is easy to fall into and costs a week. A routing note should exist from the first day.
- **Build the noise list with the bid desk on day one.** The business's own out-of-scope list is the most valuable file in the repository.
- **Make the off-site backup test part of the schedule.** A backup nobody has restored is not a backup, so we run restore drills.
- **Be more explicit that portals change.** An adapter that works today may not work after a portal redesign. The crawler-issues section of the digest exists to make that visible.

## Frequently asked questions

**How many tenders does the radar process?**
The last full run covered 20 portals and 54,526 tenders with no failures. That is the size of the active list the crawl reads each night, not the number of new tenders. Only matches above a score threshold reach the morning digest.

**How does it avoid showing the same tender twice?**
Each tender is keyed on a hash of portal, reference number and normalised title. Portal detail links are session tokens that expire, so they cannot be used as identity. A tender already reported is not reported as new again.

**Does it get past CAPTCHAs?**
No. We deliberately use listing routes that have no CAPTCHA. Tender documents on those portals sit behind a CAPTCHA, so downloading them is a manual step and is out of scope for the automated radar.

**Does it scrape GeM?**
No. GeM disallows automated access in its robots.txt. We use GeM's own email alerts for registered sellers instead and feed them into the same scoring.

**Why must the crawler run from India?**
Several portals are unreachable from European servers and the rest are about four times slower. Measured from a Mumbai host versus a European one, some timed out entirely from Europe.

## Sources and further reading

- Playwright for Python documentation: https://playwright.dev/python/docs/intro
- RFC 9309, Robots Exclusion Protocol: https://www.rfc-editor.org/rfc/rfc9309
- PostgreSQL documentation, Window functions: https://www.postgresql.org/docs/current/functions-window.html
- n8n documentation: https://docs.n8n.io

*Have a monitoring problem that spans many sources? Book a discovery call at https://quantumatlas.dev/contact.*
