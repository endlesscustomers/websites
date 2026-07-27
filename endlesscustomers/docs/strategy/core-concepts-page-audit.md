# Core Concepts & Frameworks — Concept Page Audit & Redesign

**Page audited:** `/learn/core-concepts-frameworks/concept.html` (the detail template that renders all ~110 concept records). Live example: `?id=4-pillars`.
**Date:** June 2026. **Reviewed against:** `site-spec.md`, `visual-style-guide.md` (LOCKED), `design-qa.md`, `css/main.css`, the concept strategy doc, and the live render in both light and dark mode.

This template is one of the most strategically important pages on the site. Per the strategy doc it is the canonical answer layer for prospects, clients, coaches, and — explicitly — AI systems. Most visitors land here directly from search or an AI citation, never seeing the hub. It has to orient a stranger, answer in seconds, and route them onward. It is also where the sales team presents the system live. The bar is Apple.

The page is competently built and the underlying data/SEO model is genuinely strong. But it currently reads like a clean knowledge-base article, not an Apple-grade brand page. The gap is design, not engineering.

---

## What is already working (keep)

The information architecture is right: kicker (section › family), H1-as-question, short answer, byline, video, on-this-page, body in natural-language H2 sub-questions, credits, related, next, CTA. That order matches how a stranger and an LLM both read.

The schema layer is excellent and should be preserved verbatim: `Article` with real authors/contributors/editor, `FAQPage` built from the H2 sections, `DefinedTerm` in a named term set, `VideoObject`, and `BreadcrumbList`. The 40–70 word canonical short answer is the right AEO primitive. The author/editor E-E-A-T treatment ("Behind this answer") is better than almost any competitor's.

The data-driven model (one template + JSON, mirroring HubSpot Collections/HubDB) is correct and the redesign stays fully inside it.

---

## Findings, highest impact first

### 1. The flagship's core asset renders as untreated body text

On the 4 Pillars page — a *framework* page whose entire reason to exist is those four pillars — the pillars render as four un-numbered, indented sentences. The markdown produces a real `<ol>` (good for semantics and schema), but the CSS leaves it visually stripped: no numbers, no rhythm, no emphasis. The single most important, most memorable, most screenshot-able content on the page gets less visual weight than the breadcrumb. A coach presenting this live has nothing to point at.

This is the biggest miss, and it is systemic: every framework concept (The Big 5, The Selling 7, the 5 Components, the Authentic 15) renders its framework the same flat way. Fixing the body's list rendering once elevates the entire section.

### 2. Bordered containers everywhere — against our own locked rule

`visual-style-guide.md` is explicit: rounded corners + soft shadow, **no borders**; hairline borders were rejected by you in June 2026. Yet the template wraps nearly every block in a 1px border: the short-answer box, every related-concept chip, the "next question" card, and the credits card (plus hairline-divided rows). In dark mode these borders nearly vanish, so the blocks lose definition entirely. The page's structure is currently carried by hairlines instead of by light, shadow, and space — the opposite of the house style.

### 3. The short answer is the AEO hero but is styled as the quietest block

The canonical answer is what AI extracts and what a skimmer reads first. Right now it sits in a flat gray bordered box that reads as a "note/callout," not as *the answer*. It should be the most confident typographic moment above the fold: large, beautifully set lead type on a clean (border-free) surface, with a restrained accent line. Same words, same schema — far more authority.

### 4. The video slot only exists when a video does

Only 1 of 22 published concepts has a `video_url`, and the template renders the video block *conditionally*. So 21 of 22 pages have no video and no reserved space for one. You've said every page will have a video. The template should always present a designed, cinematic 16:9 slot, with a tasteful branded placeholder state when the video is not in yet — so the page is complete on day one and the layout never shifts when video is added. (The `VideoObject` schema should stay gated on a real URL.)

### 5. Dead horizontal space and no persistent orientation

The article is a 760px column centered in a full-width container, so on a normal laptop there is a large empty margin on both sides and nothing uses it. "On this page" is an inline collapsible box that scrolls away the moment you start reading — exactly when a presenter or skimmer most wants to jump between sections. There is room for a quiet, sticky section-nav in the left margin on wide screens that aids orientation, supports live presenting, and uses the space, without turning the page into developer docs.

### 6. No "one cinematic moment"

The style guide allows — and the page would benefit from — exactly one dark statement section (the Framer moment) per page. Today the closing CTA ("See it working in your business") is a flat light-tint band: functional, forgettable. Making it the page's single near-black, restrained-aurora moment gives the page a memorable close and a clear visual climax, the way an Apple page builds to one.

### 7. Measure, rhythm, and a stray side-stripe

Body is set at 18px across a ~760px column ≈ 85–90 characters per line — wider than the 45–75ch the QA checklist (and readability) call for. Prose wants ~68ch; feature elements (video, framework, dark panel) can run wider. Separately, `.kba-body blockquote` uses a 3px accent `border-left` — a side-stripe accent, which `design-qa.md` flags as an instant AI-slop tell. Replace with a background tint + leading quote mark.

### 8. Accessibility specifics to tighten

Mostly solid (skip link, semantic headings, aria labels, AA-tuned tokens). Items to fix in the redesign: the heading copy-link buttons are hover-only-visible (fine as an enhancement, but ensure keyboard `:focus-visible` reveals them); confirm every interactive element (video facade, related chips, next card, CTA) has a visible 2–3px focus ring with offset; restore visible list numbering so the *order* of an ordered framework isn't conveyed by source alone; verify "On this page" link contrast on the subtle background meets 4.5:1.

### 9. AEO/SEO — strong; a few additions

Keep all existing schema. Add: `ItemList`/`HowTo`-style structuring for enumerated frameworks so the pillars are individually extractable; ensure the always-on video placeholder does **not** emit `VideoObject` until a real URL exists (avoid claiming a video that isn't there); keep the short answer as the one canonical definition reused verbatim elsewhere (entity consistency). The semantic `<ol>` must survive the visual redesign — style the counter, don't remove it.

---

## The redesign direction (what I'm building)

A non-destructive `concept-v2.html` in the same folder, rendering the same JSON via the same `EC` calls, so you can compare it against the original at the identical `?id=` URL. HubSpot portability is preserved: same fields, same conditional logic (now expressed as "always show the slot, swap placeholder for embed"), classes that map cleanly to modules.

Design moves, all inside the locked system:

- **Short answer becomes the hero.** Border-free, generously set lead type, a single thin brand-gradient rule (a line, per the rule), labelled "The short answer." It reads as *the* answer for humans, presenters, and AI alike.
- **Always-on cinematic video**, directly after the answer (the "prefer to watch" moment), full feature-width, rounded + soft shadow, no border, with a designed branded placeholder when no video exists yet.
- **Elevated body + framework rendering.** Ordered lists render as a clean, numbered, well-spaced enumerated set with an accent counter — so the 4 Pillars (and every framework) look designed and memorable automatically, no per-page work. Comfortable ~68ch measure. Blockquote side-stripe removed.
- **De-bordered everything.** Short answer, related, next, and credits move to light/shadow/space and open layouts. Structure carried by the design system, not hairlines. Works in light and dark.
- **A quiet sticky section-nav** in the left margin on wide screens (orientation + live presenting), collapsing to a clean inline list on smaller screens.
- **One dark statement CTA** to close — near-black panel, restrained aurora, floating light call-to-action — the page's single cinematic moment.
- **Schema preserved and extended**, video schema correctly gated.

## Open forks for you

1. **Sticky left section-nav:** include it (better for presenting + uses the space) or stay purely centered/editorial like a classic Apple article. I'm building it in, dialled quiet; easy to remove.
2. **Video placement:** right after the short answer (my default) vs. lower, after the first body section.
3. **Framework rendering:** generic elevated ordered-list (scales to all 110 concepts, my default) vs. a dedicated structured "framework" field for a more custom visual on the flagship framework pages (more work, more control) — can be a fast-follow.
