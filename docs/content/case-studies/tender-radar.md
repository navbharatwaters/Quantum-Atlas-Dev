---
title: "Tender Radar: Daily Tender Scanning Across 20 Portals"
slug: tender-radar
metaTitle: "Case Study: Tender Radar, Daily Scan of 20 Portals"
metaDescription: "How we built a daily crawler and scorer over 20 Indian e-procurement portals, 54,526 tenders in the last full run, with a morning digest. In production."
h1: "Tender Radar: a daily scan of Indian e-procurement portals"
answerSummary: "Tender Radar crawls 20 government and PSU e-procurement portals every morning, scores titles against a tiered keyword model, stores matches in PostgreSQL and posts a digest with a bid-desk spreadsheet. The last full run covered 54,526 tenders with zero failures. It does not solve CAPTCHAs, so some documents still need manual download."
schemaType: CreativeWork
lastReviewed: 2026-11-01
sources:
  - C:\projects\navbharat-tender-radar\README.md
  - C:\projects\navbharat-tender-radar\ops\HANDOVER.md
  - C:\projects\navbharat-tender-radar\ops\gepnic-routing.md
owner_confirm:
  - "[OWNER-CONFIRM: figures are from the README's last full run; confirm they are still current before publication]"
---

**Status: Production.** Runs daily at 03:32 IST on an India-hosted server for our group's industrial water business.

## What was the challenge?

Government and public-sector buyers publish tenders on many separate portals. A water-treatment business must spot the relevant ones among tens of thousands of active listings. The hard part is not volume alone. Consumables such as "supply of 500 nos PP spun cartridge 20 inch" do not read like water tenders, so staff miss them. Meanwhile, generic words such as filter, cartridge and membrane match thousands of unrelated tenders: air filters, printer toner, signal processing.

Three technical constraints shaped the build:

- Most of these portals run the same session-scoped application. A cold request redirects home, and detail links carry tokens that die with the session.
- The full active list is behind a CAPTCHA on the obvious route.
- Foreign IP addresses are slower and sometimes blocked.

## What was the approach?

1. **Browser-based crawling.** A headless browser establishes a session, then walks a CAPTCHA-free route that lists tenders by organisation. This avoids solving CAPTCHAs.
2. **One adapter, many portals.** About ten portals share one application, so adding a state portal is one configuration entry. Other portal types have separate adapters.
3. **Stable identity.** Because detail URLs expire, each tender is keyed on a hash of portal, reference number and normalised title.
4. **Tiered keyword scoring.** Strong terms score alone. Abbreviations such as ETP and STP match as whole words. Weak terms score only when a water-context word is present. Negative terms subtract. Results at or above a threshold are reported. Keywords are edited in a config file and tested without redeploying.
5. **Regression suite.** Forty cases pin the matches and the noise that previously got through. A noise title is added as a test before a fix.
6. **Isolation and visibility.** Each portal is crawled in isolation. A failure is logged and shown in the digest under "Crawler issues", so a broken adapter cannot cause a silent miss.
7. **India-hosted.** Measured in August 2026, several portals timed out from a European server and loaded in under a second from Mumbai.
8. **Output.** A morning digest to the team chat, a spreadsheet bid desk, and a Grafana dashboard.

One marketplace portal is deliberately not scraped because its robots rules disallow automated access; alerts arrive by email from the seller registration instead.

## What was the outcome?

| Metric | Before | After (verified) |
|---|---|---|
| Portals scanned | Checked by hand, ad hoc | 20 portals in the last full run |
| Tenders processed | Not measured | 54,526 in the last full run |
| Failures in that run | n/a | Zero |
| Run schedule | Manual | Daily, 03:32 IST |
| Scoring regression cases | None | 40 |
| Deliverables | Manual lists | Digest plus bid-desk spreadsheet |

We do not publish a number for tenders won or hours saved, because we have not measured one.

**Known limits.** "Across 20 portals" means the portals enabled in the last run. Document download is gated by a CAPTCHA on these portals, and we do not solve CAPTCHAs, so tender documents are downloaded by a person. One portal, Sugarmart, is not covered, and neither are several others listed in the handover notes, including some state portals. Tender value and EMD live on detail pages and are captured in a second pass.

## What did we learn?

- **The business's own noise list is the most valuable file.** Domain exclusions beat clever scoring.
- **Choose the route that avoids the CAPTCHA** rather than building a solver.
- **Make failure loud.** A crawl table and a digest section turn silent breakage into a visible one.
- **Time zones are data.** The server ran on European time; pinning the Indian zone stopped tenders falling on the wrong day.
- **Verify the patch applied.** Several string replacements silently did nothing; running the real output caught them.

## Stack

Python, Playwright, PostgreSQL, Docker, systemd timer, Mattermost, Grafana, XLSX export. An IMAP mailbox adapter for email alerts exists but was unproven against real alerts at the last handover.

## Where does this apply?

[Government](/industries/government) procurement teams, [manufacturing](/industries/manufacturing) and EPC bid desks. [Book a discovery call](/contact).
