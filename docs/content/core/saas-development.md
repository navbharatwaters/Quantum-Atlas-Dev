---
title: Custom SaaS Development
slug: /services/saas-development
metaTitle: Custom Multi-Tenant SaaS Development
metaDescription: We build multi-tenant SaaS on Next.js, FastAPI and Postgres, with Clerk, Stripe and Docker. You own the code. Built from our own logistics platforms.
h1: Custom SaaS built on Postgres, owned by you
answerSummary: Custom SaaS development means designing and building a multi-tenant web application for your business, not renting a generic one. We use Next.js, FastAPI and PostgreSQL, with Clerk for sign-in and Stripe for billing. You receive the code, the database and the deployment files.
schemaType: Service
lastReviewed: 2026-11-01
sources:
  - C:\projects\cha-frontend
  - C:\projects\import BOE
  - C:\projects\rag-enterprise-saas\AGENTS.md
  - C:\projects\infrastructure Contabo\INFRASTRUCTURE.md
owner_confirm:
  - "Cargofit and Takeoff: confirm the example numbers may be shown publicly and the pilot context"
  - "iKargos CHA portal: client count, years live and permission to name it as a reference"
  - "Any figure or story about replacing a legacy ERP, only if the founder wants it published"
---

# Custom SaaS built on Postgres, owned by you

## What is custom SaaS development?

Custom SaaS development is building a web application that many customers or business units use, each with their own isolated data, accounts and billing. Instead of bending an off-the-shelf tool to fit, we build the system around how your business works.

## What have we built ourselves?

**Direct answer:** We have built logistics, customs and engineering software for our own group companies, and run it. Examples include a customs-agent portal with import and export workflows, a 3D container load planner, and a drawing-to-bill-of-quantities pilot. Each is a working system, not a mock-up.

- **Customs and logistics workflows.** Import bill-of-entry checklists, export shipping-bill flows, duty computation, and ICEGATE-format flat-file and JSON generation across 24 segments, with document extraction through n8n.
- **Cargofit, a 3D load planner.** It is live. In one example run, 144 pieces fit into a 40 ft container at 74.4% fill.
- **Takeoff, a drawing-to-BOQ pilot.** It reads engineering drawings and builds quantity lists. In pilot testing it recalled 13 of 13 and 23 of 23 valves on two drawings, at 14 to 17 seconds per sheet.
- **A multi-tenant RAG platform.** Postgres row-level security, Clerk, Stripe usage billing and 80 automated tests. See [enterprise RAG](/services/enterprise-rag).

Pilot results come from small test sets. We state them as pilot results, not guarantees.

## What stack do we use, and why?

**Direct answer:** Next.js for the front end, FastAPI for the back end, PostgreSQL for data, Docker for packaging, Clerk for identity, Stripe for billing, and Caddy for TLS. They are widely used, open or standard, and easy to hand to another engineer.

| Layer | Our choice | Why |
|---|---|---|
| Front end | Next.js, TypeScript | Mature, server rendering, easy to hire for |
| API | FastAPI, Python | Typed, fast to build, strong for AI features |
| Database | PostgreSQL | One engine for relational, search and vector data |
| Tenant isolation | Row-level security | Enforced in the database, not only in code |
| Identity | Clerk | Sign-in, organisations, SSO options |
| Billing | Stripe | Subscriptions and usage metering |
| Packaging | Docker | Same build in development and production |
| Proxy | Caddy | Automatic TLS |

None of this is exotic. That is the point: when we hand over, your next engineer can read it.

## How does multi-tenancy work?

**Direct answer:** We use a shared schema where every row carries a tenant identifier, and Postgres row-level security enforces who may see which rows. It is simpler to operate than a database per customer, and the isolation is enforced by the database, not by hope.

Per-tenant databases suit customers who need physical separation, such as some government clients. We design for either and explain the cost difference.

## How does a SaaS build run?

**Direct answer:** We plan before we build. You get a written specification, a fixed scope per phase, working software at each phase, and your sign-off before the next phase starts. We do not start coding on assumptions.

1. **Discovery call.** We understand the process the software replaces.
2. **Specification.** Users, roles, data model, screens, integrations and non-goals, written down.
3. **Foundation.** Auth, tenancy, database, deployment and monitoring first.
4. **Core workflow.** The one workflow that matters most, built and tested.
5. **Expansion.** Further modules, one at a time, each approved.
6. **Handover.** Code, documentation, runbooks and training.

## How is this different from buying a packaged ERP or no-code tool?

**Direct answer:** Packaged systems are quicker to start and cheaper at the beginning. Custom software fits your process exactly and has no per-seat tax, but it needs a real build and someone to maintain it. Choose based on how unusual your process is.

| Question | Packaged ERP or no-code | Custom build with Quantum Atlas |
|---|---|---|
| Start-up time | Weeks | Months, phased |
| Fit to unusual workflows | Workarounds | Built to fit |
| Licence cost growth | Per seat or per module | None; you pay for build and upkeep |
| Source code | Vendor-owned | Yours |
| Change requests | Vendor roadmap | Your priority |
| Maintenance | Vendor | You or us under agreement |
| Risk | Lock-in | Build quality, which we answer for |

## How we deliver it

**Direct answer:** We deliver a containerised application with a Postgres database, automated tests, monitoring and documentation, deployed to infrastructure you control. Releases go through the same pipeline from the first week.

The architecture in words:

- **Front end.** A Next.js application with server-rendered pages and typed API clients.
- **API.** FastAPI services, one per bounded domain, with Pydantic models at every boundary.
- **Data.** PostgreSQL with migrations under version control, row-level security and backups.
- **Background work.** Queued jobs for imports, reports and AI tasks, with retries and logs.
- **Identity and billing.** Clerk and Stripe, with webhooks verified and replay-safe.
- **Infrastructure.** Docker images behind Caddy; metrics in Prometheus and Grafana. We run a six-host fleet of our own on this pattern.
- **Quality.** Automated tests for the parts that must not break, such as permissions and billing.

AI features, such as [document extraction](/services/document-intelligence), [RAG search](/services/enterprise-rag) or a [voice interface](/services/ai-voice-agents), plug into the same application.

## What you own

- **Source code** for every service, in your repository.
- **The database and its data**, with migrations and backup scripts.
- **Deployment files** for your servers or cloud account.
- **Documentation and runbooks**, so a new engineer can operate it.
- **Your third-party accounts.** Clerk, Stripe and hosting are in your name.

## When it is not the right fit

- A packaged product already fits 90% of your process. Buy it.
- You need a prototype by next week to impress someone. We build production systems, not demos.
- The requirements are not yet known. Spend a few weeks on specification first; we can help with that, and it is cheaper than a rewrite.
- You want the lowest quote above all. We will not compete on that.
- You have no one to own the product after launch. Software without an owner decays.

## Frequently asked questions

### How long does a custom SaaS take to build?

It depends on scope, so we do not quote durations before a specification. Our approach is phased: a foundation first, then one core workflow, then further modules. You see working software at each stage and approve before the next begins.

### Who owns the code?

You do. We deliver the full source, database migrations, deployment files and documentation, and the third-party accounts sit in your name. We do not keep a proprietary layer that ties you to us.

### Can you rebuild or replace our existing ERP?

Sometimes. We map what the ERP does, decide which parts truly need replacing, and migrate in phases while the old system keeps running. We would not promise a full replacement until we have seen the system and its data. [OWNER-CONFIRM: whether to cite a legacy ERP replacement and its cost]

### How do you keep customer data separate between tenants?

We use PostgreSQL row-level security with a tenant identifier on each row, so the database blocks cross-tenant reads. For clients needing physical separation, we can use a database per tenant. We test isolation with an unprivileged database role, since superusers bypass these rules.

### Do you build mobile apps?

We build responsive web applications that work well on phones, which suits most logistics and operations users. Native mobile apps are not a core offering. If you need one, we will say whether we are the right team.

### Can the system include AI features?

Yes. Document extraction, search over your files, voice interfaces and workflow automation connect to the same Postgres and API. We add them where they save real work, not for decoration.

### What happens after launch?

We offer maintenance and monitoring under a separate agreement, or you can run it yourself with the handover documents. Either way, the system is yours and documented, and you are not tied to us.

### Where is it hosted?

On servers you choose: your own, a cloud account in your name, or hosting we manage. We run our own fleet with Caddy and Prometheus and Grafana monitoring, and can apply the same set-up to yours.

## Next step

Describe the process you want to replace. [Book a discovery call](/contact) and we will tell you whether to build, buy or wait.
