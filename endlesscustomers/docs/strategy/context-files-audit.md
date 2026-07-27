# Context Files Audit — What's Missing (June 2026)

Analysis of ~30 of our recent sessions (navigation, page redesigns, visual passes, content workflow) against the current context files: `CLAUDE.md`, `site-spec.md` (decisions log), `design-qa.md`, `visual-style-guide.md`, `TODO.md`.

## The headline

The existing files are genuinely strong on two things: **design-system mechanics** (tokens, headline tiers, gradient rules, motion, the visual style lock) and the **IA/decisions log** (every nav and page decision, with rationale). That work is excellent and well-maintained.

The gaps cluster in two areas that barely appear anywhere:

1. **How you want me to work** — the collaboration norms you keep repeating across sessions (audit before presenting, propagate patterns everywhere, flag the calls I made for you). These are behavioral, not design facts, and they have no home today.
2. **Content and messaging standards** — AI positioning, buyer-journey hierarchy, whose voice the site speaks in, CTA placement, terminology. There is currently no content-standards home at all; the decisions log is design/IA only.

Below, each item is tagged **NEW** (absent), **PARTIAL** (mentioned somewhere weak), or **REINFORCE** (exists but keeps getting missed). For the high-value ones I've drafted paste-ready text.

---

## Priority 1 — Working norms (recommend a new "How I want Claude to work" section in CLAUDE.md)

These came up in almost every batch and are the single biggest gap. They're the difference between you catching problems and me catching them first.

### 1.1 Self-audit before presenting — NEW (highest-frequency finding)
You should not be the one spotting clunkiness, orphans, footer mismatches, or awkward spacing. This appeared as a correction in 5+ sessions.
> "Are you happy with this? I'm not. It still looks very clunky..."
> "Can you double check the footer on the pages you just built? They don't match."
> "Please do a double take on all the stuff now..."

Proposed text:
> **Self-audit before every handoff.** Before presenting any page or change, do a QA pass as if you were the reviewer: squint-test the layout, count grid items, check spacing against the nav, confirm footer/nav match the master components, click every new link. Bob should never be the first to notice clunkiness. If something is off and you can't fix it now, flag it explicitly rather than letting him find it.

### 1.2 Propagate patterns everywhere, now and forever — NEW
When an interaction or pattern is established (sub-nav pill transition, sticky behavior, filter bar), you expect it to become the sitewide default immediately, not something you re-request page by page.
> "Make sure that any sub-menu bar with pills like this has that transition. Any time we use it ever again on the site."

Proposed text:
> **Establish once, apply everywhere.** When a pattern, transition, or component becomes "the way we do it," extract it to a shared helper (main.css / cms.js / the component master) and apply it to every existing and future instance in the same pass. Don't make Bob re-request an established pattern. (Note: this is stronger than the motion standard's current "promote on the third use" rule — core interaction patterns like sub-nav transitions should propagate on sight.)

### 1.3 Flag the decisions you made for him — NEW
I consistently end up saying "two decisions I made you may want to revisit," and you rely on that. Make it a standard, not a habit.

Proposed text:
> **Surface autonomous calls for review.** When you decide something on Bob's behalf (a headline, a label, a layout choice, placeholder data), end with a short, scannable list of those calls so he can one-line-revert any of them. Trust is high; visibility is the price of it.

### 1.4 Use the canonical components, never simplified copies — REINFORCE
New pages have shipped with the wrong/simplified footer more than once. The single-source rule exists in CLAUDE.md, but the failure recurs, so it belongs in a build checklist.
> "Was this on purpose?" (re: a new page with a non-matching footer)

Proposed text:
> **New pages inherit, they don't reinvent.** Every new page starts from `_template.html` and carries the current nav + footer master (run the sync scripts). Before handoff, diff the new page's footer/nav against the master. A hand-simplified footer is a bug.

### 1.5 Verify the change is actually visible in the browser — PARTIAL
CLAUDE.md covers cache-busting (`DATA_VERSION`, `learn.css?v=`), but the behavioral expectation isn't stated. The Sarah Schreck data fix took three attempts because the change wasn't showing.

Proposed text:
> **Confirm fixes render, don't just confirm the code.** When a change should be visible, verify it actually appears (bump the cache-bust param, hard-check the served file). "It's correct in the code" is not done if Bob still sees the old version.

### 1.6 Operational vocabulary — NEW (small but useful)
> **"Send it live" = Bob commits via GitHub Desktop.** I can't push from here. When Bob says "send this live," prepare everything for commit and tell him it's ready to push; don't assume it's deployed.

---

## Priority 2 — Content & messaging standards (recommend a NEW file: `content-standards.md`, or a new §11 in site-spec)

There is no content-standards home today. These are real, repeated directions with strategic weight.

### 2.1 AI positioning is front and center — NEW (strategic, 3 sessions)
> "AI is so critically important right now, and we need to be positioning Endless Customers as a solution to AI... that needs to be really front and center."

Proposed standard: Endless Customers is framed as the answer to AI disruption. AI is a lead message on the homepage, Core Concepts hub, and service pages — not a bolted-on feature or a scattered mention. When building or revising any major page, check: does this carry the AI-era framing where it belongs?

### 2.2 Lead with the buyer's journey, not the system's internals — NEW
You rejected opening with Big 5 / Selling 7 / Assignment Selling because a newcomer is asking "should I care?", not "what's in the system?".
> "Starting with the Big Five and Selling Seven and assignment selling is probably the wrong thing to do at the top."

Proposed standard: Top-of-page and top-of-funnel content answers buyer questions first (should I care, is this for me, what will it do for my business). Branded framework names earn their place deeper, once interest exists.

### 2.3 The site speaks as Endless Customers / IMPACT, not as Marcus — NEW (explicit correction)
> "It needs to be the voice and tone of IMPACT and Endless Customers. We will mimic a lot of Marcus's tone, but this is the Endless Customers website, not Marcus's."

Proposed standard: Marcus's content is an input we mimic, not the voice target. Name files, prompts, and the planned voice guide around the EC/IMPACT brand. (Ties directly to the open TODO "Create Endless Customers voice and tone document.")

### 2.4 Don't bury CTAs; conversion actions ride high — NEW
> "This page is missing a call to action to subscribe." → then immediately: "Can we move that subscription CTA higher on the page?"

Proposed standard: Primary CTAs (subscribe, book a call, get the diagnostic) default to a high page position, not the closer slot alone. Every content page should have an obvious, early conversion path.

### 2.5 On conversion pages, withhold detail to drive the action — NEW
> "I don't want to give away too much on the sponsors page because we want them downloading the prospectus. That's the main call to action."

Proposed standard: When a page's job is a single conversion (download, form, call), tease rather than fully disclose, so the CTA is the only path to the detail. Decide nav/exit points with the same lens (see 3.3).

### 2.6 Label things in the visitor's words — NEW
> "I don't think 'the Library' makes the most sense. They probably want to know what the learning content is — guides or courses."
> "We want to make sure the word 'pricing' appears in the anchor pill."

Proposed standard: Section names and nav labels use visitor vocabulary (courses, guides, pricing), not internal product names. High-intent words (Pricing) belong in anchor pills and CTAs where they aid conversion.

### 2.7 Terminology glossary — NEW (start one; verify first)
Recurring exact-wording corrections: write "and" not "&"; precise product names ("The Endless Customers Book"). **Verify with Bob:** at least one agent read a repeated "Providers → Specialists" correction, but the spec and `people.json` currently use "Service Providers" as a role. If that's a real rename, it's a sweep; if not, drop it. Either way, a short glossary of approved terms would stop the small re-corrections.

### 2.8 No em dashes, anywhere — REINFORCE (move up from design-qa only)
Currently only in `design-qa.md` (and it's a personal preference of yours). It keeps re-entering drafts — the home page strategy doc had 39 before cleanup. Promote it to CLAUDE.md's conventions so it applies to every doc and every page, not just the QA pass.

---

## Priority 3 — Design standards to elevate (design-qa.md and/or decisions log)

The visual system is well documented; these are the specific things that still recur as corrections.

### 3.1 Even grids only — no orphans — REINFORCE → make it a hard rule
"Orphan grid rows" is named in the CLAUDE.md design-change protocol as a cheap-win example, but it's not a standard, and it was the entire subject of the Reviews session (5+1, 7-card odd, 4+2 wrap).

Proposed checklist line: *Count every grid. No lone orphan card on the last row — design for even fills or use the span-the-remainder trick (as the webinars get-notified block does). Odd counts need an intentional layout, not a default grid.*

### 3.2 Heroes sit tight to the nav; bias content slightly above center — NEW
Repeated spacing corrections with specific nudges.
> "Please shift all the elements in the hero up 60 pixels higher."
> "There's something weird with the top of this page... too much space below the navigation?"

Proposed checklist line: *Hero content hugs the nav (no dead gap below it) and sits with a slight upward optical bias, not floating mid-block. Sweep for excess space above heroes before handoff.*

### 3.3 Treat navigation as a conversion variable — NEW
> "Should we lose navigation on this page?"

Proposed note (site-spec §3 or content-standards): On conversion/landing pages, actively decide whether full nav, minimal nav, or no nav serves the goal — and raise it proactively. Don't default every page to full chrome.

### 3.4 Merge fragmented sections that are logically one — NEW
> "Pricing & plans and Compare plans & pricing — these two need to be combined into one section."

Proposed checklist line: *Two adjacent sections covering one idea = one section. Watch for this when building from a content outline.*

### 3.5 Cards float (no borders) and redundant UI gets cut — REINFORCE
Already in the visual style guide (rounded + shadow, no borders) and you keep removing duplicate chrome (search/browse buttons that duplicate the nav). It's covered; just keep it on the QA pass.

---

## Suggested structure change

Two small moves would hold all of the above cleanly:

1. **Add a "How I want Claude to work" section to `CLAUDE.md`** (Priority 1 items) — these are behavioral and belong at the top level where they're read every session, right next to the existing Design-change protocol.
2. **Create `content-standards.md`** (Priority 2 items) and reference it from CLAUDE.md the way `site-spec.md` and `design-qa.md` are referenced. It also gives the planned EC voice guide a home.

Priority 3 items fold into the existing `design-qa.md` checklist.

## Recommended next step

I can apply Priority 1 (the working norms) and the em-dash promotion to `CLAUDE.md` now — they're unambiguous and high-frequency. Priority 2 content standards I'd rather draft into `content-standards.md` for your review, since a few (the AI framing emphasis, the terminology list) deserve your wording. Tell me which to do and I'll make the edits.
