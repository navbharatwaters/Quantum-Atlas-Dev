---
title: AI Automation
slug: /services/ai-automation
metaTitle: AI Workflow Automation with n8n and LangGraph
metaDescription: Self-hosted n8n and LangGraph workflows for document handling, data collection and reporting. A daily scan of 20 portals ran with zero failures.
h1: AI workflow automation that runs without anyone watching
answerSummary: AI automation connects the repetitive steps of a business process into a workflow that runs on its own: collect, read, decide, act, report. We build them with self-hosted n8n for integrations and LangGraph for stateful AI steps. Our tender radar scans 20 portals daily with no human in the loop.
schemaType: Service
lastReviewed: 2026-11-01
sources:
  - C:\projects\navbharat-tender-radar\README.md
  - C:\projects\n8n
  - C:\projects\google_Document_AI\Project Handoff AI Document Agent (.txt
  - C:\projects\infrastructure Contabo\INFRASTRUCTURE.md
owner_confirm:
  - "Any staffing or hours-saved figure from internal automation, if the founder wants it published"
  - "Tally ETL: whether it is in production use and which Tally version it supports"
---

# AI workflow automation that runs without anyone watching

## What is AI workflow automation?

AI workflow automation links the steps of a business process so they run without manual hand-offs. Some steps are plain code or integrations. Some use a language model to read, classify or draft. A good workflow records what it did and stops safely when it is unsure.

## What does a production automation look like?

**Direct answer:** Our tender radar is the clearest example. Each morning it scans 20 Indian government and public-sector procurement portals, scores tenders against a keyword model, stores them in Postgres and posts a digest with a spreadsheet. Its last full run covered 54,526 tenders with zero failures.

It runs on a timer, on our own host, with no human in the loop. It exists because one of our group companies needed to find relevant water-treatment tenders and staff were missing them by hand. The design choices behind it are the ones we bring to client work: crawl politely, store everything in Postgres, score transparently, report to a channel people already read, and monitor in Grafana.

## What tools do we use?

**Direct answer:** n8n for connecting systems and scheduling, LangGraph for AI steps that need state and branching, Pydantic for validating what the model returns, and Postgres for records. All run self-hosted.

| Need | Tool | Why |
|---|---|---|
| Connect apps, webhooks, schedules | n8n, self-hosted | Visual, many integrations, runs on your server |
| Multi-step AI logic with branching and retries | LangGraph | State is explicit and restartable |
| Validate model output | Pydantic | Wrong types are rejected, not passed on |
| Record and audit | PostgreSQL | One queryable history of every run |
| Tool access for AI agents | MCP servers with safety gates | Agents can act, within limits you set |
| Monitoring | Prometheus, Grafana | Failures show up on a dashboard |

## When should we use n8n, and when LangGraph?

**Direct answer:** Use n8n when the job is moving data between systems on a trigger. Use LangGraph when a model must make decisions across several steps and you need to see and resume its state. Many workflows use both: n8n at the edges, LangGraph in the middle.

We learned this the hard way. A document flow built entirely in n8n, using OCR plus a language model, took about 120 seconds per three-page document. Rebuilt as a LangGraph service around Google Document AI, it takes about 8 seconds. n8n remains the connector. See [document intelligence](/services/document-intelligence).

## What can be automated?

**Direct answer:** Work that is repetitive, rule-bound and tied to documents or data: collecting from portals, reading incoming documents, reconciling records, drafting routine messages, updating systems, and producing reports. Judgement-heavy decisions stay with people, with the workflow preparing the evidence.

Examples we scope:

- **Monitoring and alerts.** Watch portals, feeds or inboxes; score what matters; send a daily digest.
- **Document-driven workflows.** Extract fields from incoming files, validate them, update your ERP or sheet.
- **Customs and logistics steps.** Checklists, duty computation and ICEGATE-format file generation.
- **Accounting data movement.** Tally ETL pipelines for Indian SMEs. [OWNER-CONFIRM: Tally ETL production status and supported version]
- **Agent tools.** MCP servers that let an AI assistant read or act on your systems behind approval gates.

## How does an automation project run?

**Direct answer:** We map the manual process first, automate one narrow path end to end, run it beside the people for a period, then expand. We do not automate a process nobody has written down.

1. **Discovery call.** Who does the work now, how often, and what goes wrong?
2. **Process map.** Every step, input, output and exception, written down.
3. **Narrow build.** One path, fully automated, with logging.
4. **Shadow run.** The workflow runs beside the team. Differences are reviewed.
5. **Handover to production.** Alerts, retries and an owner named.
6. **Expand.** Add paths and exceptions one at a time.

## How is this different from Zapier or an RPA tool?

**Direct answer:** Zapier-style tools are quick for simple triggers but run on someone else's cloud and bill per task. RPA clicks through screens and breaks when screens change. Ours is self-hosted, uses APIs where they exist, and adds AI where reading or judging is needed.

| Question | Hosted automation (Zapier-type) | RPA | Quantum Atlas |
|---|---|---|---|
| Where does it run? | Vendor cloud | Desktop or vendor | Your server or ours |
| Data leaves your network? | Yes | Depends | Only where you agree |
| Reads unstructured documents | Limited | Limited | Yes, with validation |
| Breaks when a UI changes | No | Often | Rarely, API-first |
| Pricing exposure | Per task | Per bot | Hosting and build |
| Audit history | Basic | Basic | Queryable in Postgres |

## How we deliver it

**Direct answer:** We deliver workflows as versioned code and exported n8n definitions, deployed with Docker, logged to Postgres and watched in Grafana. Every workflow has retries, a dead-letter path and an owner who is alerted when it fails.

The architecture in words:

- **Trigger layer.** Timers, webhooks, inbox watchers and file drops start runs.
- **Workflow layer.** n8n coordinates calls between systems. LangGraph runs the AI steps as a state machine.
- **Validation layer.** Pydantic checks every model output before it is used.
- **Data layer.** Postgres stores inputs, decisions, outputs and errors.
- **Reporting layer.** A digest to Mattermost, email or chat, plus a Grafana dashboard.
- **Safety gates.** Any step that writes to a system of record can require approval.

## What you own

- **Workflow definitions and code**, in your repository.
- **The n8n instance and its credentials**, on your infrastructure.
- **The run history**, in your Postgres.
- **The runbook.** It says what to do when a step fails.

## When it is not the right fit

- The process changes every week. Automating it will cost more than doing it.
- Nobody can describe the current process. Map it first, then decide.
- The task needs human judgement with legal weight. We can prepare the evidence, not decide.
- The source system has no export or API and forbids scraping. We will not build around a terms-of-service breach.
- You expect a promised head-count reduction. We will not quote staffing outcomes in advance. [OWNER-CONFIRM: any internal hours-saved figure]

## Frequently asked questions

### Do you use n8n Cloud?

No. We run n8n self-hosted, on your servers or ours. That keeps credentials, payloads and run history inside infrastructure you control. It does mean someone must patch and monitor it, which we can do under a maintenance agreement.

### How do you stop an AI step from doing something wrong?

Every model output passes a Pydantic schema before use. Steps that write to a system of record can require approval. Low-confidence results go to a review queue. And each run is logged, so you can see what happened and why.

### What happens when a workflow fails?

It retries on a schedule, then moves to a dead-letter queue and alerts the named owner. The run history in Postgres shows the failing step and its input. No failure is silent.

### Can you automate Tally data entry?

We build Tally ETL pipelines for Indian SME accounting data. Scope depends on your Tally version and what you want moved. We check with a sample export before committing to a design.

### Can an AI agent use our internal systems?

Yes, through MCP servers we build with safety gates: read-only by default, scoped permissions, approval for writes, and a log of every call. We start narrow and widen only when the logs justify it.

### How long until an automation pays for itself?

It depends on volume and the cost of the manual work, so we do not quote a payback period up front. In discovery we count the hours and error costs today, then build the narrowest path that removes the largest share.

### Can you scrape portals and websites for us?

Where the site's terms allow it and no API exists, yes. Our tender radar does this daily across 20 portals. We design for polite request rates and failure handling, and we will decline sources whose terms forbid it.

### Will this replace our staff?

That is not our measure. We aim to remove repetitive work so people spend time on judgement. We will not promise a staffing outcome, and we advise treating any such promise from any vendor with caution.

## Next step

List the three most repetitive things your team does. [Book a discovery call](/contact) and we will pick the one worth automating first.
