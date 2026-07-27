# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static-HTML prototype of the Endless Customers marketing website (endlesscustomers.com), built to be migrated to HubSpot CMS later. No framework, no build step, no package.json, no tests — plain HTML/CSS/vanilla JS with JSON files acting as a mock CMS.

**`docs/reference/site-spec.md` is the single source of truth** for site architecture, navigation (locked), URL structure, content types/schemas, and the decisions log. Read the relevant section before building new pages or content types, and update it when decisions change. `TODO.md` tracks open work and pre-launch items; some spec sections lag recent changes (the TODO notes which).

### Where things live
- `README.md` (root) — developer onboarding: what this is, how to run it, the architecture in brief. Start here.
- `docs/reference/` — living source-of-truth docs: `site-spec.md`, `content-standards.md`, `design-qa.md`, `visual-style-guide.md`.
- `docs/handoff/` — for the dev team: `HOSTING-GUIDE.md`, `hubspot-migration-guide.md`.
- `docs/strategy/` — working strategy, audit, and draft docs (history/rationale, not build instructions).
- `docs/wireframes/` — early wireframes (`learn-wireframes/`).

## Design-change protocol (June 2026, per Bob)

When Bob requests a design change, never execute it literally and blindly. First step back and re-approach the area — and the page around it — as a top-level visual designer would: re-read the module in context, check the surrounding modules for awkwardness the change might create or that already exists, and ask what would make the result even better than the literal request ("what would Apple do?"). Then implement the stronger version and explain the reasoning. This applies to every change request, every time. Look for cheap adjacent wins (orphan grid rows, cramped rhythm, inconsistent spacing) and fix or flag them while you're there.

## How I want Claude to work (June 2026, per Bob)

These are working norms distilled from recurring feedback across many sessions. They are behavioral, not design facts; follow them every session.

- **Self-audit before every handoff.** Bob should never be the first to notice clunkiness, an orphan card, a footer/nav mismatch, awkward spacing, or a dead link. Before presenting any page or change, do a QA pass as the reviewer would: squint-test the layout, count grid items, check spacing against the nav, diff footer/nav against the master components, click every new link. If something is off and you can't fix it now, flag it explicitly rather than letting him find it. (`docs/reference/design-qa.md` is the checklist.)
- **Establish once, apply everywhere.** When a pattern, transition, or component becomes "the way we do it" (e.g. a sub-nav pill transition, a sticky behavior, a filter bar), extract it to a shared helper (`main.css` / `cms.js` / the component master) and apply it to every existing and future instance in the same pass. Don't make Bob re-request an established pattern. This is stronger than the motion standard's "promote on the third use" — core interaction patterns propagate on sight.
- **Surface autonomous calls for review.** When you decide something on Bob's behalf (a headline, a label, a layout choice, placeholder data), end with a short, scannable list of those calls so he can one-line-revert any of them. Trust is high; visibility is the price.
- **New pages inherit, they don't reinvent.** Every new page starts from `_template.html` and carries the current nav + footer master (run the sync scripts). A hand-simplified footer/nav is a bug — diff against the master before handoff.
- **Confirm fixes actually render.** When a change should be visible, verify it appears (bump the cache-bust param — `DATA_VERSION`, `learn.css?v=`, `main.css?v=` — and hard-check the served file). "It's correct in the code" is not done if Bob still sees the old version.
- **"Send it live" = Bob commits via GitHub Desktop.** Claude can't push from here. When Bob says "send this live," get everything ready to commit and tell him it's ready to push; don't assume it's deployed.

## Commands

```bash
# Local preview (required — fetch() of components/data fails on file://)
python3 -m http.server 8000 --directory "$PWD"   # or double-click serve.command

# After editing components/nav.html or components/footer.html — propagate
# the master into every page's inlined fallback copy:
python3 scripts/sync-nav.py
python3 scripts/sync-footer.py
```

## Architecture

### Pages
- Every page is a full HTML file; clean URLs come from directory `index.html` files (e.g. `/learn/book/index.html`).
- New pages start from `_template.html` — copy it, set the PATH PREFIX (`./`, `../`, `../../` by depth), fill in page meta, replace the PAGE CONTENT section. Nav, footer, theme toggle, and scripts are pre-wired.
- Page links are root-absolute (`/how-we-help/...`); asset paths in inlined components are depth-relative (`../assets/...`) — the sync scripts handle that rewrite.

### Nav & footer (single-source with inlined fallbacks)
`components/nav.html` and `components/footer.html` are the masters. At runtime `js/main.js` fetches and injects them into `#nav-placeholder` / `#footer-placeholder`; each page also carries an inlined fallback copy for file:// viewing. **Editing the inlined copy by hand is wrong** — edit the master, then run the sync scripts. The mobile menu has no markup of its own: `buildMobileMenu()` in `js/main.js` generates it from the desktop dropdowns at runtime.

### Mock CMS (Learn section)
`js/cms.js` (`window.EC`) mirrors HubSpot CMS so migration stays obvious: JSON collections in `/data/content/` and `/data/taxonomy/` ↔ HubSpot Collections/HubDB, `?id=slug` detail pages ↔ dynamic page mapping, `indexBy`/`resolve` ↔ Associations, `EC.markdown` ↔ rich text, `EC.setSEO` + JSON-LD injection ↔ SEO modules.
- Detail templates live at their URL location, not a `/templates/` folder: e.g. `learn/recent-insight/article.html?id=...`, `learn/webinar/webinar.html?id=...`, `learn/tool/offer.html?id=...`.
- **Bump `DATA_VERSION` in `js/cms.js` whenever content JSON changes** — it cache-busts the data fetches.
- Insights and podcast episodes are ONE content type (`insights.json`); `/learn/podcast` is a filtered view, not a second collection. People (coaches, providers, staff, guests) are one collection (`people.json`) differentiated by role.
- Forms are mock (no submit) but carry real HubSpot `form_id`s for migration.
- `data/content/_retired-playbook/` is retired Knowledge Base content (replaced by Core Concepts & Frameworks, June 2026) — don't build on it.

### CSS
- `css/main.css` — the design system (all non-Learn pages). `css/learn.css` — Learn-only component styles, kept separate so the design system stays untouched.
- `styles.html` is the living style-guide page.
- Design rules from the decisions log: the brand gradient is for borders/lines/underlines ONLY (never text or button fills); the one secondary button is `.btn--ghost`; H1 sizing uses length tiers (`.headline-short`/default medium/`.headline-long` by character count: <45 / 45–70 / >70); General Sans via Fontshare for display type.
- `docs/reference/design-qa.md` is the design QA checklist (distilled from pbakaus/impeccable) — run through it when auditing a page or after building a new one. Where it and the decisions log disagree, the decisions log wins.

### SEO / AI-entity layer
The site carries deliberate structured data: JSON-LD on pages, `/for-ai-agents/` entity graph, and `/llms.txt`. When pages change names, pricing, or org facts, sweep those too (see "Entity strategy" in TODO.md). `redirects-301.csv` accumulates URL moves for the eventual HubSpot migration.

## Conventions

- Docs under `docs/strategy/` (`*-strategy.md`, `*-audit.md`, draft pages, `HonestFix Playbook...`) are working/strategy docs, not site content. The only markdown files at the repo root are `README.md`, `CLAUDE.md`, and `TODO.md`.
- Nav structure is locked — don't change it without updating docs/reference/site-spec.md.
- ALL navigation labels are Title Case: main nav, subnav/anchor pills, band links, and nav-level CTAs (see decisions log). Check this every time you add an anchor pill or nav item.
- **No em dashes** anywhere — page copy, strategy docs, comments. Use periods, commas, or parentheses. (This keeps re-entering drafts; it's a hard rule, not a QA-only check.)
- **Content & messaging standards live in `docs/reference/content-standards.md`** — AI positioning, buyer-journey hierarchy, brand voice (EC/IMPACT, not Marcus), CTA placement, and terminology. Read it before writing or restructuring page copy, the same way you read `docs/reference/site-spec.md` before building structure.
- Dates matter: this project's docs use absolute dates (e.g. "June 2026") to track decisions.
