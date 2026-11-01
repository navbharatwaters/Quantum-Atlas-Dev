---
title: "AI Readiness Assessment"
slug: knowledge/guides/ai-readiness-assessment
type: implementation-guide
service: general
metaTitle: "AI Readiness Assessment: A Practical Self-Check"
metaDescription: "A scored self-assessment for AI projects across process, data, people, security, infrastructure and operations, with guidance on what each score means."
lastReviewed: 2026-11-01
owner_confirm: []
---

# AI Readiness Assessment

This is a self-check you can complete in an hour with two or three colleagues. It tells you where you are ready, where you are not, and what to fix before spending on a build. It is a conversation tool, not a certification or a benchmark.

## How to score

For each statement, score 0, 1 or 2.

- **0:** not true, or we do not know.
- **1:** partly true.
- **2:** true, and we could show evidence.

Be strict. "We think so" is a 1. Add the scores for each section.

## Section 1: Process (max 10)

1. We can describe the process we want to improve in steps, with who does what.
2. We know how long it takes today and how often it goes wrong, from records, not guesses.
3. One person owns the process and can make decisions about it.
4. We know which steps need human judgement and must stay with people.
5. We can state in one sentence what success looks like in numbers we can measure.

## Section 2: Data and documents (max 10)

1. The documents or data the system would use are in known places.
2. We have a representative sample (at least dozens of real examples) that we can share.
3. We know which data is sensitive or regulated.
4. Correct answers are known: a person can say what the right output looks like for a sample.
5. Someone owns the quality and currency of the source material.

## Section 3: People (max 10)

1. A senior sponsor wants this to succeed and has time for it.
2. The people who do the work today have been consulted.
3. A named person will use the output daily and give feedback.
4. Staff know the system is meant to help them, and we have said what happens to roles.
5. We have capacity to review outputs in the first months.

## Section 4: Security and compliance (max 10)

1. We know which rules apply to our data: sector regulation, contractual limits, internal policy.
2. We know whether data may leave our environment, and under what conditions.
3. We have an owner for security review and a process for approving new systems.
4. We know who may see what, and could write it down as access rules.
5. We know how long records must be kept and how they must be deleted.

## Section 5: Infrastructure and integration (max 10)

1. We know which systems the AI output must connect to.
2. Those systems have documented interfaces or an export we can use.
3. We have a place to host the solution that meets our data rules.
4. We have people who can support the solution's connections and credentials.
5. We have a test environment where mistakes do not cost money.

## Section 6: Operations and ownership (max 10)

1. We have decided who runs the system after launch.
2. We have a way to report and fix wrong outputs.
3. We have a plan to re-test as documents, rules or models change.
4. We have a rollback: we can return to the old way if needed.
5. We have budget for running costs, not only the initial build.

## Reading your total (max 60)

| Total | What it suggests |
|---|---|
| 0 to 20 | Not ready to build. Spend a month on the weakest sections, especially process and data. A short assessment engagement is usually better value than a build. |
| 21 to 40 | Ready for a bounded pilot, if the sections that scored lowest are addressed in parallel. Pick a narrow use case. |
| 41 to 60 | Ready to scope a production project. Remaining gaps are details to settle in the specification. |

Look at the pattern more than the total. A high total with a 2 out of 10 on security is not ready. One weak section can block everything.

## What the common low scores mean

- **Low on process:** automating an unclear process produces an unclear system. Map and measure it first.
- **Low on data:** collect and label a sample before anything else. The sample is also your test.
- **Low on people:** projects fail more often from adoption than from technology. Involve the users now.
- **Low on security:** settle the data position (cloud, your own cloud, on-premise, air-gapped) before choosing a design.
- **Low on infrastructure:** integration is often the largest cost. Identify target systems early.
- **Low on operations:** a system without an owner decays. Name one.

## Choosing a first project

Good first projects share these traits:

1. A defined input and a defined output.
2. A measurable cost today.
3. A person who can check the result.
4. Low harm from an occasional error, or a human review step.
5. A sponsor who will use the result.

Poor first projects are vague ("use AI for operations"), depend on data nobody owns, or put an unreviewed model into a decision with legal or safety consequences.

## What to do next

1. Record your scores and the evidence behind each 2.
2. Pick the three lowest items and name an owner and a date for each.
3. Choose one use case that fits the traits above.
4. Collect the sample documents or data for it.
5. Bring the results to a discovery call at https://quantumatlas.dev/contact. It helps to share the scores. We would rather tell you that you are not ready than start a build that will stall.

## Limits of this assessment

It is a self-assessment, so it reflects your honesty. It does not test your systems and does not replace a security review or legal advice. It carries no certification and no benchmark against other organisations.
