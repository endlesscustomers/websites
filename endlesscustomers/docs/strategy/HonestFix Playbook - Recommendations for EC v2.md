# Applying the HonestFix Playbook to Endless Customers

**Prepared for:** Bob Ruffolo · **Updated:** June 6, 2026 (v2, incorporating Bob's decisions) · **Status:** Decisions locked on items 1, 2, 6, 7; pricing model defined, final numbers in progress

HonestFix's real innovation is not any single page. It is that every trust device (written guarantees, real prices, corrections process, editorial policy) and every AI-readiness device (llms.txt rulebook, /for-ai-agents, ai-sitemap.json, governed chatbot) operates as one synchronized canonical-truth system with declared precedence rules, version numbers, named owners, and review cadences. They publish what competitors keep private, then wrap it in machine-readable governance so AI systems repeat their version of the truth.

This document maps each play to the v2 site with the decisions made on June 6. The ordered execution plan is at the bottom.

---

## Where we're already strong (protect these)

- **Pricing transparency.** The site publishes real numbers and will keep doing so under the new model. Strongest pricing page in the coaching category.
- **Controlled vocabulary at scale.** Core Concepts & Frameworks: 103 question records, 7 families, 4 Pillars. More systematic than anything HonestFix has.
- **Honest "not for you" signals.** The FAQ already redirects hands-off buyers to agencies and sub-$3M companies to the Academy. Right instinct; being promoted from FAQ fragments to feature pages (see items 1 and 7).

---

## 1. Our Guarantee — DECIDED

**The guarantee (services, in Bob's words):** if there is any call or deliverable where you felt you didn't get the value you deserved, you pay what you think it was worth. Even if you felt it wasn't valuable at all, we'll either refund it or not charge you.

**Decisions made:**

- One guarantee, named simply **"Our Guarantee."** The understated name makes the content bolder.
- **Conference is separate.** Endless Customers Live keeps its own refund/transfer terms (full refund to 30 days out, transfer anytime, credit within 30 days), cross-linked from the guarantee page but not merged into it.
- **Lives in the How We Help navigation** (first column, near Success Stories): title "Our Guarantee," subtext along the lines of "Our promise to you on every call and deliverable."
- URL: `/how-we-help/guarantee`.

**Page requirements (to make it credible, not gameable):**

- The promise stated plainly, in the first third of the page, in Bob's voice.
- Mechanics: applies per call or deliverable; how to claim (tell your coach, no forms, no justification required); the claim window (proposed: within 7 days of the call or deliverable; confirm); what happens next (you name the value, we refund the difference or don't charge, and we still make it right).
- "What this covers / what this doesn't cover" blocks, HonestFix-style. Covered: every coaching call, training session, and deliverable we produce. Not covered: third-party costs (ad spend, travel, software), conference tickets (own policy, linked), work by outside vendors we refer.
- Supporting context: month-to-month, 30-day cancellation, quarterly re-scoping. The guarantee sits on top of a structure that already lets clients leave any month, which is why we can afford to be this bold. Say that out loud on the page.
- Prominent link to "When It's Not Working" (item 2) as the structural half of the promise.
- FAQPage schema, last-updated stamp, declared review cadence.
- Why this is also marketing: it is the single most copyable asset for our audience. "We published our guarantee, here's why you should publish yours" is a flagship piece of content, a podcast episode, and a conference talk.

**Still needed from Bob:** confirm the claim window and any cap/abuse language (recommendation: no cap, no fine print beyond the covered/not-covered blocks; the absence of hedging is the point).

---

## 2. When It's Not Working — DECIDED

**Decisions made:** own URL, **not in the main navigation.** Linked prominently from the guarantee page (the two are halves of one promise), from the footer (Trust & Resources), and from relevant FAQ entries. A dedicated URL matters because "what happens if Endless Customers coaching isn't working" is exactly the query AI engines answer with a single page.

- URL: `/how-we-help/when-its-not-working` (or `/guarantee/when-its-not-working` as a child; recommend the former for cleaner citation).
- Content: what a stalled engagement looks like; the diagnostic conversation; remediation options (coach change, plan-level change via the quarterly re-scope, pause, structured wind-down under the 30-day terms); a named escalation contact; response-time commitments.
- The quarterly planning session is the load-bearing mechanism here, same as in pricing. Frame it that way: every quarter is a natural checkpoint where scope, price, and fit get re-decided.

**Still needed from Bob:** the named escalation contact (HonestFix uses a founder's personal email; that choice is itself the trust signal) and the response-time commitments.

---

## 3. Pricing page: complete rework — NUMBERS LOCKED (June 6); see "Coaching Pricing Page - Perfect Pricing Page Draft.md"

The new model replaces the current tier structure entirely. The current page ($10,000/$12,500 Kickoff; $5,500/$8,000/$10,500 monthly tiers; $75K to $150K annual range) gets rebuilt, not edited.

**The new model:**

- **Base Coaching Program: $3,500/month**, includes Endless Customers Academy. This is the **Published Price**: firm, listed, never a surprise.
- **The Quarterly Stack:** training and add-on services layered on top based on what the client needs, estimated and priced quarterly at the quarterly planning session. This is the **Scoped Estimate**: a defined term meaning "a real price for the next 90 days, re-decided every quarter, nothing auto-renews into the stack."

**Page structure for the rebuild:**

1. The base price and everything it always includes (coach, cadence, Academy, planning sessions).
2. How the Quarterly Stack works: scoped at quarterly planning, priced before the quarter starts, client approves before anything is billed.
3. Published ranges for common stack items (training blocks, HubSpot services, video coaching, website work, paid media) so buyers can self-estimate.
4. Two or three worked examples: "a typical first year for a $10M services company," with realistic annual totals. The transparency win dies if "what will I actually pay?" has no answer.
5. A "why coaching costs what it costs" section (what the fee buys; what clients invest beyond fees: staffing, equipment).
6. Defined vocabulary box: Published Price vs Scoped Estimate, with the rule that the two are not interchangeable.
7. The guarantee, referenced and linked.
8. FAQPage schema rebuilt for the new model; last-updated stamp; review cadence.

**Consistency sweep required when numbers are final.** Old pricing currently lives in: the pricing page and its comparison table, pricing FAQ schema, the coaching program page, llms.txt ("Coaching Program & Pricing" line), and possibly site-spec.md and the audit-and-recommendations page. One pass, everything changes together, nothing left contradicting. AI systems quote stale pricing for months if any crawlable copy disagrees.

**Still needed from Bob:** final stack-item ranges, Kickoff handling under the new model (does the Kickoff & Alignment Day survive, at what price), and the worked-example numbers.

---

## 4. Diagnostic transparency — DECIDED

A **section on the diagnostic landing page**, not a separate page. (HonestFix needed a standalone governance page because Leo is an ongoing conversational agent; a one-shot tool needs honest disclosure where people use it.)

- "How this works" section: what the tool analyzes, how scores are produced, what it is not (directional, not a full audit, not a guarantee), what happens to the URL and results data.
- Matching FAQ entries on the same page with FAQPage schema.
- One line added to llms.txt operating rules: describe diagnostic output as directional, not definitive; the $5,000 human audit is the authoritative version.

**Still needed from Bob:** confirm the data-handling facts to publish.

---

## 5. Comparison page — DECIDED

**Main navigation, How We Help dropdown.** Comparison queries are the highest-intent searches we can win, and buyers asking them are exactly who that menu serves.

- URL: `/how-we-help/compare-your-options`. Nav subtext: "Coaching vs. agency vs. DIY, honestly."
- Content: Endless Customers coaching vs hiring an agency vs a fractional CMO vs doing it yourself, with genuine concessions about when each alternative wins; the sub-$3M honesty promoted from FAQ to feature; book/Academy/audit positioned as the legitimate DIY path; comparison table built for extraction.
- Cross-linked from the coaching program page and the new pricing page.

---

## 6. Vocabulary, freshness, and the AI rulebook (build work, no decisions pending)

- **Freshness stamps** ("Page last updated" + schema dateModified + stated review cadence) on: pricing, coaching program, guarantee, when-its-not-working, compare-your-options, diagnostic, both conference pages, academy plans.
- **llms.txt upgrade from manifest to rulebook:** add an "Operating rules for AI agents" block (Published Price vs Scoped Estimate distinction; coaching is not an agency retainer; Scorecard 80 is a progress metric, not a revenue guarantee; quote guarantee terms only from /how-we-help/guarantee; diagnostic output is directional; route purchase intent to /lets-talk; cite /learn/core-concepts-frameworks for term definitions). Add a "Current" block (next conference, current pricing, current book edition) with valid-through dates. Version stamp, named owner, review cadence, declared precedence (llms.txt wins on conflict, updated first).
- **/for-ai-agents updates to match:** new citation rules for the guarantee and pricing vocabulary.
- Optional: /.well-known/ai-sitemap.json typed-entity inventory generated from the existing data layer.

---

## 7. Third-party verification pass (build work)

Every claim links to its independently checkable source: awards to issuer announcements, bestseller claim to the list record, book to ISBN/retailer records, reviews on /how-we-help/reviews to their Google/G2 sources (page is currently placeholder and is a launch blocker), HubSpot Elite badge already linked (keep), coach credentials to their sources. Extend the /for-ai-agents verification section as sources get wired.

---

## 8. Quick Answers tier (post-launch program)

A `/learn/quick-answers` tier on the existing data-layer engine: 100 to 300 narrow, dated, definitional answers to buyer questions about cost, comparison, problems, reviews, and best-of, filterable by Big 5 category, declared in llms.txt as purpose-built for AI extraction. Needs an owner and a cadence; not a launch item.

---

# THE STEP-BY-STEP

In order. Each step lists who unblocks it.

### Phase A: Decisions and drafting (this week)

1. ✅ **DONE (June 6) — Pricing numbers finalized.** Base $3,500/month incl. Academy; Kickoff unchanged ($10,000 virtual / $12,500 in-person + travel); year-1 typical $6,500 to $15,000/month; trailing-12-month average client spend $7,850/month (publishing it); year-2+ typically $5,000 to $10,000/month, strong adopters down to base. Old table's offerings carry over as the quarterly stack. Full page spec and draft: "Coaching Pricing Page - Perfect Pricing Page Draft.md" (built to Marcus's 16-item Perfect Pricing Page checklist; 8 open review items listed at its bottom, including estimator concept choice: thinking before building, per Bob).
2. ✅ **DONE (June 6) — Guarantee fully locked.** All services covered (incl. Kickoff and Quarterly Stack deliverables); third-party costs excluded; conference keeps own policy; Academy gets its own guarantee later. 7-day window. Step one is always make-it-right (redo/re-attempt); if the redo still falls short, refund or credit, client's choice, for what the client says it was worth. No caps, no fine print. Claim process = escalation process: coach first, Katie Coelho (President) as backup. Signed by Bob. Full page draft: "Guarantee Page - Our Guarantee Draft.md".
3. ✅ **DONE (June 6) — Escalation details decided:** coach first, anytime; backup/escalation is Katie Coelho (kcoelho@impactplus.com, confirm address before publish), published on the page. Commitments: acknowledgment within 1 business day; written action plan within 5 business days; remediation decided with the client within 14 days (coach change, scope change via 90-Day Cycles, pause, or structured wind-down under the 30-day terms). A raised flag never waits for the next quarterly session.
4. **Bob: confirm diagnostic data-handling facts** (what's stored, what's not, where results go).

### Phase B: Build the trust pages (can start as soon as 2 to 4 land; pricing not required)

5. ✅ **DONE (June 6) — /how-we-help/guarantee built.** Boxed three-step promise, covered/not-covered, no-fine-print section, Bob's signed close, accountability note, 8-question FAQ with schema, freshness line, dateModified.
6. ✅ **DONE (June 6) — /how-we-help/when-its-not-working built.** Stalled-engagement signs, two doors (coach → Katie), the 1/5/14-day clock, four honest outcomes incl. wind-down, FAQ schema targeting "what happens if EC coaching isn't working."
7. **Build /how-we-help/compare-your-options.** Per item 5 spec. (The pricing page's tier section links to it; currently the only dead link in the new pages.)
8. ✅ **DONE (June 6) — Pricing page fully rebuilt** per the Perfect Pricing Page draft v3: hero stat band ($3,500 / $7,850 / 90 days), sticky 6-anchor sub-nav, 90-Day Cycles box, vocabulary box, 2026 pricing-history note, payment timeline, 3 SVG charts, up/down factors, Quarterly Stack menu with training at $1,000–$3,000/mo, 5-tier honest comparison, gut check, 3 worked examples, 11-question FAQ. Service/OfferCatalog + FAQPage + WebPage(dateModified) schema all rebuilt.
9. ✅ **DONE (June 6) — Diagnostic transparency shipped as policy-spec.** "How this works & what happens to your data" section on /diagnostic, four new data-handling FAQ items, and the page's first FAQPage + WebPage schema. Published policy (per Bob: tool still in build, so the page is now the spec the build must meet, with TODO(build) comments inline): results with no email required; sharing email creates a HubSpot contact with the report attached and one Advisor follow-up, no drip without opt-in; analysis via leading commercial AI models with no training on user data (name the provider once chosen); 12-month retention with delete-on-request; fully automated, no human review unless the consultation is booked. llms.txt now instructs AI to describe diagnostic output as directional, never as a full audit.

### Phase C: Wire it into the site (immediately after each page lands)

10. ✅ **DONE (June 6, partial)** — "Our Guarantee" in the How We Help dropdown (after Success Stories, subtext "Our promise to you on every call & deliverable") across all 50 pages + components; "Our Guarantee" + "When It's Not Working" in footer Trust & Resources across all pages + components. Mobile menu inherits automatically (built from desktop DOM). Remaining: "Compare Your Options" nav entry when that page is built (step 7).
11. ✅ **DONE (June 6) — Pricing consistency sweep.** Coaching program page FAQ + FAQ schema updated to the new model; old tier pricing now appears only in intentional "why we changed in 2026" history context; llms.txt updated with the canonical pricing line. site-spec.md not yet updated (documentation, not crawlable copy).
12. **Freshness stamps + schema dateModified** across all money pages (list in item 6).
13. **llms.txt rulebook upgrade + /for-ai-agents updates** per item 6: operating rules, Current block, version stamp, owner, precedence. ✅ Partially done June 6: /for-ai-agents now has the pricing-vocabulary rule (rule 4) and quote-only guarantee rule (rule 5); llms.txt has canonical entries for pricing, guarantee, and when-its-not-working. Remaining: the full operating-rules block, Current block, version stamp, named owner.

### Phase D: Verification and polish (before launch)

14. **Third-party verification pass** per item 7; replace /how-we-help/reviews placeholder with real, source-linked reviews (launch blocker).
15. **QA pass:** validate all JSON-LD sitewide, check every new cross-link, confirm no page contradicts another on price, guarantee terms, or vocabulary.
16. **Optional: /.well-known/ai-sitemap.json** generated from the data layer.

### Phase E: Post-launch (ongoing)

17. **Publish the meta-content:** "We published our guarantee / our escalation process / our real pricing, and here's why" as articles, podcast episodes, and the reference implementation we teach. This is the system becoming a product.
18. **Quick Answers program** per item 8: owner, cadence, first 50 questions from sales-call transcripts and the FAQ backlog.
19. **Quarterly review cadence begins:** llms.txt Current block, freshness stamps, pricing accuracy, guarantee terms. One named owner.
20. **Entity strategy off-page work continues in parallel** (separate doc: citation cleanup, Wikidata cluster, bridge placements, weekly AI-answer monitoring panel).

---

*Companion docs: "Entity Strategy - IMPACT and Endless Customers.md" (entity/NAP/off-page plan) and TODO.md (running build list). The conference keeps its own refund policy and pricing transparency; it is intentionally outside Our Guarantee.*
