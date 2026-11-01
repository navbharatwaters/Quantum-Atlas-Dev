---
title: "ROI Calculator Specification"
slug: knowledge/roi-calculator
type: tool-spec
metaTitle: "AI ROI Calculator: Enter Your Own Costs"
metaDescription: "Estimate monthly savings, annual savings and payback for document processing, voice AI and knowledge search using your own volumes, costs and comparison rates."
lastReviewed: 2026-11-01
owner_confirm: []
---

# ROI Calculator Specification

## Purpose

Let a visitor estimate the financial difference between their current way of working and an automated one, using only numbers they type in. The calculator never supplies prices, accuracy rates or savings percentages of its own. Every rate is a field the user can edit.

## Principles

1. **User-supplied inputs only.** No default values for costs. Empty fields stay empty, and results show "enter a value" rather than a guess.
2. **No built-in vendor prices.** A "comparison rate" is an optional, editable field with a label chosen by the user, such as "Alternative vendor rate". We do not pre-fill it, name vendors, or ship a table of competitor prices.
3. **Show the working.** Each result shows the formula in plain words next to the number.
4. **Say what is excluded.** Results are estimates, and a note lists what the calculation leaves out.
5. **Privacy.** Calculations run in the browser. Nothing is stored unless the user chooses "Share this analysis with our team".

## Modules

The user picks one or more modules. Each has its own inputs. A summary combines them.

### Module A: Document processing

**Inputs (all entered by the user)**

| Field | Meaning | Unit |
|---|---|---|
| Documents per month | How many documents are handled | count |
| Pages per document | Average length | pages |
| Current minutes per document | Staff time to process one by hand | minutes |
| Staff cost per hour | Fully loaded cost of the people doing it | currency per hour |
| Current outside cost per page | Optional: what you pay a service or vendor today | currency per page |
| Alternative rate per page | Optional: a rate you want to compare against, entered by you | currency per page |
| Our expected rate per page | Entered after receiving a proposal; blank until then | currency per page |
| Review share | Share of documents a person still checks | percent |
| Review minutes per checked document | Time for that check | minutes |
| One-time setup cost | From a proposal | currency |

**Formulas**

- Current monthly cost = (documents per month x minutes per document / 60 x staff cost per hour) + (documents per month x pages per document x current outside cost per page)
- New monthly processing cost = documents per month x pages per document x our expected rate per page
- New monthly review cost = documents per month x review share x review minutes / 60 x staff cost per hour
- New monthly cost = new processing cost + new review cost
- Monthly saving = current monthly cost - new monthly cost
- Annual saving = monthly saving x 12
- Payback period (months) = one-time setup cost / monthly saving, shown only when monthly saving is above zero

**Comparison view.** If an alternative rate is entered, show: documents per month x pages per document x alternative rate, next to the new processing cost, labelled with the user's own label.

### Module B: Voice AI

| Field | Meaning | Unit |
|---|---|---|
| Calls handled per month | Volume the agent would take | count |
| Average call length | Minutes per call | minutes |
| Current cost per minute | All-in cost today, entered by user | currency per minute |
| Share of calls fully handled by the agent | User's estimate | percent |
| Share handed to a person | Derived: 100 minus the above | percent |
| Handoff minutes per transferred call | Staff time after transfer | minutes |
| Staff cost per hour | Loaded cost | currency per hour |
| Our expected rate per minute | From a proposal; blank until then | currency per minute |
| Alternative rate per minute | Optional comparison, entered by user | currency per minute |
| One-time setup cost | From a proposal | currency |

**Formulas**

- Current monthly cost = calls x average length x current cost per minute
- New voice cost = calls x average length x our rate per minute
- New handoff cost = calls x share handed to a person x handoff minutes / 60 x staff cost per hour
- New monthly cost = new voice cost + new handoff cost
- Saving and payback as in Module A

### Module C: Knowledge search

| Field | Meaning | Unit |
|---|---|---|
| Staff who search for information | Headcount | count |
| Searches per person per week | Estimate | count |
| Minutes per search today | Time to find an answer | minutes |
| Minutes per search with the system | Estimate | minutes |
| Staff cost per hour | Loaded cost | currency per hour |
| Monthly system cost | From a proposal | currency per month |
| One-time setup cost | From a proposal | currency |

**Formulas**

- Searches per month = staff x searches per week x 52 / 12
- Hours saved per month = searches per month x (minutes today - minutes with system) / 60
- Value of time saved = hours saved x staff cost per hour
- Monthly saving = value of time saved - monthly system cost
- Payback as above

Note: time saved is only a financial saving if the freed time is used for paid work or reduces paid hours. The result page says this.

## Outputs

For each module and for the total:

1. Current monthly cost
2. New monthly cost
3. Monthly saving
4. Annual saving
5. Payback period in months, or "not reached" if the saving is zero or negative
6. A plain-English line, such as "On the numbers you entered, monthly cost would fall from X to Y."
7. A sensitivity strip: the result when the user's key estimates (share handled, minutes saved, expected rate) are each moved 20 percent worse. This shows how fragile the case is.

## Validation rules

- All numeric inputs must be zero or positive. Percentages must be 0 to 100.
- Payback is hidden when monthly saving is not positive.
- If a required field is blank, show which one, and do not compute.
- Currency is a user-chosen label only. No conversion is done.

## Caveats printed with every result

- This is an estimate built entirely from the numbers you entered.
- It excludes change-management time, training, ongoing monitoring, error handling beyond the review share, and taxes.
- It is not a quote. Any price comes from a written proposal.
- Savings are not guaranteed.

## Call to action

Below the results: "Share this analysis with our team", which sends the inputs and results to Quantum Atlas after the user enters an email address and agrees, and leads to booking a discovery call at https://quantumatlas.dev/contact. No pricing is shown or implied by this tool.

## Analytics and storage

Record only that the calculator was used and which module, without the numeric inputs, unless the user shares the analysis.
