# Design QA Checklist

Distilled from [pbakaus/impeccable](https://github.com/pbakaus/impeccable) (Apache 2.0), filtered for this project (June 2026). Where impeccable and our decisions log disagree, **our design system wins** — `site-spec.md`, `css/main.css`, and `styles.html` are the source of truth. This doc is a QA pass, not a redesign license.

Run this checklist when auditing a page before launch, or after building a new page from `_template.html`.

**Quick automated pass (no AI, no install):** `npx impeccable detect <file-or-url>` — catches AI-slop tells and mechanical issues (line length, touch targets, skipped headings) deterministically.

## AI-slop tells (instant fails)

- [ ] No side-stripe accents (colored border-left/right >1px on cards, callouts, alerts) — use full borders, background tints, or leading icons
- [ ] No gradient text (background-clip: text) — matches our rule: gradient is for borders/lines/underlines ONLY
- [ ] No glassmorphism / decorative blur cards
- [ ] No hero-metric template (big number + small label + gradient accent)
- [ ] No identical icon + heading + text card grids repeated endlessly; never nest cards in cards
- [ ] No pure #000/#fff anywhere — neutrals tinted toward brand hue
- [ ] No bounce/elastic easing; never animate layout properties (use transform/opacity, exponential ease-out)
- [ ] The test: if someone could glance at it and say "AI made that," it fails

## Typography

- [ ] Body line length 45–75ch at every viewport (max-width in ch units)
- [ ] Body text ≥16px, set in rem — never px
- [ ] H1s use our length tiers (`.headline-short` <45 / default 45–70 / `.headline-long` >70 chars) — don't freelance heading sizes
- [ ] `text-wrap: balance` on headings; `text-wrap: pretty` on long prose
- [ ] ALL-CAPS labels get letter-spacing 0.05–0.12em
- [ ] Light-on-dark text: bump line-height +0.05–0.1 and letter-spacing +0.01–0.02em
- [ ] Display type is General Sans (Fontshare) — no new font families without a decisions-log entry

## Color & contrast

- [ ] WCAG AA: body text 4.5:1, large text 3:1, UI components/icons 3:1 — verify with a checker, not by eye
- [ ] Placeholder text also needs 4.5:1 (the common fail)
- [ ] No gray text on colored backgrounds — use a darker shade of the background color instead
- [ ] Never rely on color alone to convey information
- [ ] Accent/brand color stays rare; this is a brand-register site so committed color moments are fine, but they must come from our palette, not ad-hoc values

## Spacing & layout

- [ ] All spacing on the scale — no arbitrary off-scale values; use `gap` for sibling spacing
- [ ] Squint test: blurred, the page's most important element and groupings still read
- [ ] Hierarchy built from 2–3 dimensions (size + weight + space), never size alone; bold vs regular, not medium vs regular
- [ ] **Even grids — no orphans.** Count every grid; no lone card on the last row. Design for even fills or span the remainder (as the webinars get-notified block does). Odd counts need an intentional layout, not a default grid (this was the entire Reviews-page redesign)
- [ ] **Hero sits tight to the nav**, with a slight upward optical bias — no dead gap below the nav, content not floating mid-block. Sweep for excess space above heroes before handoff
- [ ] **Merge fragmented sections** — two adjacent sections covering one idea (e.g. two pricing blocks) should be one section; watch for this when building from a content outline
- [ ] **Nav is a conversion variable** — on conversion/landing pages, confirm full vs minimal vs no nav is an intentional choice, not a default; raise it proactively
- [ ] Cards only when content is distinct/actionable or needs comparison — default to no container
- [ ] No arbitrary z-index values — semantic scale (dropdown 100 → sticky 200 → modal 400 → toast 500 → tooltip 600)
- [ ] Shadows subtle; if clearly visible, too strong

## Responsive

- [ ] Mobile-first; breakpoints where the design breaks, not at device widths
- [ ] Touch targets ≥44×44px (expand via padding if visuals are smaller); no hover-only functionality (`@media (hover: hover)` gates hover effects)
- [ ] Images: srcset + sizes; `<picture>` for art-directed crops
- [ ] Layout survives 200% zoom; zoom never disabled
- [ ] Test on a real iPhone and a real Android before launch — emulation misses touch, fonts, and browser chrome

## Interaction & forms

- [ ] Every interactive element has focus styles: `:focus-visible`, 2–3px ring, offset outside, 3:1 contrast — designing hover without focus is the common miss
- [ ] Never `outline: none` without a replacement
- [ ] Forms: visible labels always (placeholders are not labels); validate on blur; errors below the field via aria-describedby
- [ ] Buttons follow the system: one secondary style (`.btn--ghost`), no gradient fills
- [ ] Skip link to main content; keyboard path through nav and forms works

## Copy & accessibility text

- [ ] Button labels are verb + object ("Save changes") — never "OK"/"Submit"/"Yes"
- [ ] Errors say what happened, why, how to fix; never blame the user, never joke
- [ ] Link text stands alone ("View pricing") — never "Click here"
- [ ] Alt text conveys the information ("Revenue up 40% in Q4"), `alt=""` for decorative, aria-label on icon buttons
- [ ] One term per concept site-wide (Sign in, not Log in + Sign in); headings not restated in intro copy
- [ ] No em dashes in copy

## When using AI on design work

- [ ] Read `site-spec.md` (relevant section), `css/main.css`, and `styles.html` BEFORE designing — context first, generic output otherwise
- [ ] Extend the existing token/spacing/type system; never introduce ad-hoc values
- [ ] New design decisions go in the site-spec decisions log, then here if they create a new check
