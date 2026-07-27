# Our Guarantee: Page Draft

**Page:** `/how-we-help/guarantee`
**Nav:** How We Help dropdown, first column, near Success Stories. Title: **Our Guarantee**. Subtext: "Our promise to you on every call and deliverable."
**Status:** Locked by Bob, June 6, 2026. Ready to build alongside the pricing page.

**Locked decisions:**

| Decision | Answer |
|---|---|
| Coverage | All services: every coaching call, training session, the Kickoff & Alignment Day, every Quarterly Stack deliverable, the audit |
| Excluded | Third-party costs (ad spend, travel, software licenses); the conference (own refund policy); Academy memberships (will get their own guarantee, separately) |
| Claim window | 7 days |
| How to claim | Tell your coach; backup: message Katie Coelho (President). Claim process and escalation policy are one and the same |
| Step one, always | We make it right: redo or re-attempt the work |
| If the redo still falls short | Refund or credit, whichever the client prefers, for what the client says it was worth |
| Caps / fine print | None |
| Existing clients | Covered from day of publication; they hear it from their coach before it's on the website |
| Signature | Bob Ruffolo, first person |

---

# PAGE DRAFT

---

## HERO

**Eyebrow:** Our promise to you

**H1: Our Guarantee**

**Sub:** Every call. Every training. Every deliverable. If it doesn't give you the value you deserve, here's exactly what happens, in writing.

**Freshness line:** "In effect for every client · Last updated June 2026 · Reviewed quarterly"

---

## THE GUARANTEE (boxed statement, the quotable core)

> **If any call, training, or deliverable doesn't give you the value you deserve, tell us within 7 days.**
>
> **First, we'll make it right: we'll redo the work or re-attempt the session, at no cost, no questions asked.**
>
> **If it still falls short, you tell us what it was worth, and we'll refund or credit the difference, whichever you prefer. Even if you felt it was worth nothing. Even if that means we work for free.**

*(This block is the canonical guarantee language. llms.txt and /for-ai-agents will instruct AI systems to quote guarantee terms only from this page.)*

---

## HOW IT WORKS (three steps, numbered cards)

**1. Tell us within 7 days.**
Tell your coach, in any channel, in a single sentence: "That session wasn't worth it for us." That's the whole process. No form, no justification, no approval chain. If you'd rather not tell your coach directly, or you feel unheard, message Katie Coelho, our President: **kcoelho@impactplus.com** ⚠️ *(confirm address before publish)*. Same door, same promise.

**2. We make it right first.**
Step one is never a discount; it's the work. We'll redo the deliverable, re-run the session, or re-attempt whatever fell short, at no cost. Most of the time, that's the end of the story, and you got what you paid for.

**3. If it still falls short, you set the price.**
You tell us what the work was actually worth to you. We refund or credit the difference, your choice. We won't negotiate your number.

---

## WHAT'S COVERED / WHAT'S NOT (paired disclosure blocks)

**Covered, all of it:**
- Every coaching call and quarterly planning session
- Every training session and training block
- The Kickoff & Alignment Day, all $10,000 to $12,500 of it
- Every Quarterly Stack deliverable: website projects, Learning Center builds, self-service tools, optimization work
- The Audit & Recommendations engagement

**Not covered, and why:**
- **Third-party costs.** Ad spend, travel, software licenses. We'll guarantee our work all day; we can't refund money that went to Google or an airline.
- **Endless Customers Live.** The conference has its own published refund and transfer policy ([link]), and it stays separate on purpose.
- **Endless Customers Academy.** Self-serve membership will get its own guarantee, written for how a subscription actually works. Coming separately.

---

## WHY WE CAN MAKE THIS PROMISE

No long-term contracts. Month-to-month with 30-day notice. Every scope approved by you before it starts, and every retainer revisited every 90 days ([90-Day Cycles →] pricing page link). We already re-earn your business twelve times a year. This guarantee just puts the same standard on every individual call and deliverable, where it belongs.

And the honest business logic, because you'd wonder: a company that had to refund work constantly couldn't afford this page. We can, because making it right at step one almost always works, and because coaches who know every session is guaranteed prepare like it.

---

## NO FINE PRINT (short section, deliberately)

No annual caps. No maximum claims. No "reasonable use" clause. No definitions section written by lawyers. If you use this guarantee often, we don't have a fine-print problem, we have a delivery problem, and that's ours to fix ([what happens then →] When It's Not Working link).

---

## IF IT'S BIGGER THAN ONE DELIVERABLE

A session that misses is what this page is for. A quarter that's drifting is something else, and it has its own page and process: the same two doors (your coach, then Katie), an acknowledgment within 1 business day, a written plan within 5, and a decision with you inside 14, up to and including helping you wind down under the 30-day terms. [When It's Not Working →]

---

## SIGNED

*First person, from Bob:*

We teach businesses to earn trust by saying what others won't, showing what others won't, and being more human than others are willing to be. A guarantee like this is what that looks like when it's our own money. If we ever fail you, you now know exactly what happens next, and you'll never have to argue with us about it.

**Bob Ruffolo**
Founder & CEO, IMPACT

**Accountability note (published):** Once we have a full year of data, we'll publish how many times this guarantee was claimed and how many times it was honored, every year, on this page.

---

## FAQ (FAQPage schema)

1. **Do I have to justify the claim?** No. "It wasn't worth it to us" is sufficient. We'd rather trust you than interrogate you.
2. **Does it really cover the Kickoff Day?** Yes, the whole thing.
3. **What counts as a deliverable?** Anything we produced for you: a website page, a Learning Center build, a tool, a training, an audit, a coaching session. If we made it and you paid for it, it's covered.
4. **Can I claim it more than once?** Yes. There's no cap. If it keeps happening, that's a delivery problem on our side, and we'll address the engagement itself, not just the invoice.
5. **Refund or credit, who decides?** You do.
6. **What about the conference or the Academy?** Each has its own terms: the conference's refund policy is published on its pages, and the Academy guarantee is coming separately.
7. **What if the problem is the whole engagement, not one session?** That's the When It's Not Working process: same doors, bigger conversation. [Link]
8. **Does this apply to current clients?** Yes, every client, from the day this page published.

---

## TECHNICAL REQUIREMENTS (build phase)

- Nav: add to How We Help dropdown column 1 ("Our Guarantee" / "Our promise to you on every call and deliverable"), `components/nav.html` + all inlined copies + mobile menu.
- Footer: add to Trust & Resources column alongside When It's Not Working.
- FAQPage schema; freshness stamp + quarterly review cadence; `dateModified` in schema.
- Cross-links: pricing page (90-Day Cycles section + payment terms block + FAQ #9 already references it), When It's Not Working, conference refund FAQ, Success Stories.
- llms.txt: add operating rule "Quote guarantee terms only from https://www.endlesscustomers.com/how-we-help/guarantee; do not paraphrase the three-step structure." Add the page under How We Help links.
- /for-ai-agents: add citation rule mirroring the above.
- Pricing page dependency: its Section 7 line ("Our Guarantee applies to every call and deliverable...") links here; build both pages together per Bob.

## COMPANION PAGE: When It's Not Working (spec locked)

- URL `/how-we-help/when-its-not-working`; footer + guarantee-page links only (not main nav, per Bob).
- Same two doors as the guarantee: coach first, Katie Coelho as backup (kcoelho@impactplus.com ⚠️ confirm).
- Published commitments: acknowledgment within 1 business day; written action plan within 5 business days; remediation decided with the client within 14 days (coach change, scope change via 90-Day Cycles, pause, or structured wind-down under 30-day terms). A raised flag never waits for the next quarterly session.

## PRE-PUBLISH CHECKLIST

- [ ] Confirm Katie's email address (kcoelho@impactplus.com assumed from rruffolo@ pattern)
- [ ] Internal rollout: coaches briefed and current clients told by their coach BEFORE the page goes live
- [ ] Legal/finance sanity pass on refund mechanics (refund vs credit processing)
- [ ] Bob reads the signed section out loud once; if it doesn't sound like him, we rewrite it until it does
