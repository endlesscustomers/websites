# Visual Style Guide — Endless Customers Website

**Status: LOCKED (June 7, 2026, per Bob).** This is the sitewide visual language for all imagery, illustration, data graphics, and media treatments. It was chosen through Gemini style explorations (boards archived in `assets/images/style-explorations/`). Where this guide and the site-spec decisions log disagree, the decisions log wins.

**The direction in one sentence:** Apple-level restraint as the default — calm off-white surfaces, candid photography in rounded shadow cards, code-built data graphics — punctuated by at most one Framer-style dark statement section per page.

**Reference boards (the canon):**
- `style-h-refined-editorial-1.png` / `-2.png` — the light system
- `style-h-dark-statement.png` — the dark statement section (the *restrained* aurora; `demo-john-dark-statement.png` v1 shows the neon ring we rejected)
- `elements-core-kit.png`, `elements-hubspot-page.png`, `elements-websites-page.png` — the element kit
- `demo-allison-light-hero.png` — the system applied with a real coach

---

## 1. The core rule: code first, Gemini second

**If it can be built in HTML/CSS/SVG, build it in code.** Charts, graphs, funnels, pipelines, UI fragments, stat cards, browser frames, glass chips, dark panels, auroras — all code. Code-built elements stay pixel-consistent sitewide, animate per the motion standard (draw-in lines, count-up stats), cost nothing to revise, and survive the HubSpot migration cleanly.

**Gemini generates only what code can't:** photography (coaches, workshops, events — per the action-shot house style in the gemini-image-studio skill), and occasional complex composites. Never generate an image of a chart, a UI mockup, or a diagram for production — those are SVG/HTML jobs.

The style-exploration boards intentionally violate this rule (they're image mockups *of* code-built elements). They are reference, never production assets.

## 2. Photo treatment

- **Rounded corners + soft shadow. NO borders.** (Bob, June 2026: hairline borders rejected.) Use `--radius-lg` (16px) for in-content photos, `--radius-xl` (24px) for oversized heroes; shadow `--shadow-lg`/`--shadow-xl` by size.
- **Light spill (optional, heroes only):** the faintest page-accent glow hugging one edge of the card, ~10% opacity, like light spill — never a glow cloud. One per page maximum.
- **Floating chips (optional):** one or two frosted-glass UI chips may overlap a hero photo's corner (progress bar, avatar stack). Immaculate, small, purposeful. Never on every photo.
- **Photo content** follows the action-shot house style: candid documentary, genuinely enjoying themselves, business-casual, real diversity, never posed/stock. The arms-crossed-team-grinning-at-camera look is banned.

## 3. Illustration policy

There is no drawn-character illustration system. The "illustration" layer of this site IS the code-built element kit (§4) plus treated photography. This is deliberate: it's where top SaaS sites have landed, it sidesteps style drift across generated art, and it keeps warmth in real human photos where it belongs.

- Animated SVG diagrams (per the motion standard) are the house illustration form: flat, geometric, page-accent colored, drawn with the design system's line weights.
- NO decorative abstract shapes: no quarter-circles, semicircles, arcs, blobs. Depth comes from shadow and overlap, never decoration.
- Strategic icons: tabler set + EC marks, as on the coaching pages.

## 4. The element kit (build in code, style locked)

Universal (any page, in the page's accent): line chart with gradient fill fading to transparent; bar charts (two accent tints, one solid highlight); stat card with spark-line and count-up; funnel (stacked narrowing bars); kanban/pipeline fragment with mid-drag card; avatar-stack chip; progress bar; toggle; calendar chip.

Page-flavored examples: HubSpot page — CRM contact record, deal pipeline columns, reporting dashboard, email-sequence diagram, automation flow. Websites page — desktop+mobile responsive pair in browser/phone frames, conversion funnel, before/after bars, page-speed meter (horizontal, never circular gauge), heat-zone thumbnail, sitemap tree.

All cards in the kit: white surface, rounded, soft shadow, no border, gray-dash text suggestion where text isn't real.

## 5. Dark statement section (the Framer moment)

At most ONE per page, for the moment that deserves drama (CTA band, platform showcase, framework reveal).

- Near-black panel `#0A0F1F` (the existing `--color-menu-bg-dark`), rounded `--radius-xl`, fine grain optional.
- **Aurora:** brand blue `#0a6cff` fading into brand magenta `#D6269B`, LOW opacity, behind the floating content only — keynote-stage darkness, not a nightclub. At least ~80% of the panel stays near-black. The rejected reference (`demo-john-dark-statement.png`) shows the neon ring to avoid.
- Floating content: a crisp light UI card, real slide, or video embed with a soft glow-edged shadow; optionally one frosted-glass chip.
- This is the ONLY place the blue→magenta pairing appears as a glow. Everywhere else the brand gradient remains borders/lines/underlines only (existing rule).

## 6. Color

Brand tokens only, from `main.css`. Blue `#0a6cff` is the default accent; pages with their own accent (HubSpot orange `#FF4701`, etc.) run their element kit in that accent. Neutrals are the slate scale. Gradient (blue→magenta) stays borders/lines/underlines, plus the dark-panel aurora (§5). Never gradient text or button fills.

## 7. Generated-image specs (for Gemini passes)

- Photography per the action-shot house style skill; reference photos from `assets/images/coaching-action-shots/_references/`.
- Generate the photo content EDGE TO EDGE — no baked-in rounded corners, shadows, borders, chips, or background canvas. All treatment is applied by CSS classes (§8). This keeps treatments consistent and re-skinnable.
- Real slides from `_slides/` go on big presentation screens in-scene, never invented slide content.
- No readable invented text in images (garbles); no brand names on props.
- File naming: descriptive, never "ai" in the filename.

## 8. CSS components (in `main.css` — see styles.html for live samples)

| Class | What it is |
|---|---|
| `.media-card` | Rounded + `--shadow-lg`, no border; img fills, `--radius-lg` |
| `.media-card--xl` | Hero size: `--radius-xl` + `--shadow-xl` |
| `.media-card--spill` | Adds the faint accent light spill (uses `--media-accent`, defaults to page accent/blue) |
| `.glass-chip` | Frosted-glass floating chip (backdrop-filter), for overlapping hero corners |
| `.statement-panel` | Dark statement section: near-black rounded panel + restrained aurora via `::before` |
| `.media-placeholder` | Presentable placeholder for `TODO(gemini)` slots: subtle pattern + label |

`--media-accent` cascades: set it on a page/section wrapper to run the treatments in the page accent.

## 9. Placeholders & production order

Pages are retrofitted with code-built elements + `TODO(gemini)` photo placeholders first (placeholders describe WHAT the image shows; this guide controls HOW it looks). Generation happens in dedicated passes once the Gemini page-graphics skills encode §7. Per the existing convention: `<!-- TODO(gemini): [subject + intent + composition notes] -->` on a `.media-placeholder`.

## 10. Motion (site-wide load + scroll reveals)

The Apple-style entrance is a system, not a one-off. It lives in `css/main.css` (§12c) and `js/main.js` (initMotion), and is armed by a flash-free inline `<head>` snippet that adds `html.ec-anim` before first paint, only when the visitor allows motion. Reduced-motion and no-JS visitors get fully-rendered content with nothing hidden. Shared ease across everything: `cubic-bezier(.16,1,.3,1)`.

| Hook | What it does |
|---|---|
| `[data-enter]` | Page intro rises + sharpens once, on load. Add `="2"`, `="3"`, `="4"` to stagger (eyebrow, heading, sub). |
| `[data-reveal]` | Element rises + sharpens as it scrolls into view. |
| `[data-reveal-group]` | Its direct children do the same, lightly staggered. Tune the cascade with `data-reveal-step="45"` (ms; default 70). |

Rules of thumb: use `[data-enter]` only on the top intro of a page (it runs on load); use `[data-reveal-group]` on card grids and pill clusters; use `[data-reveal]` on single blocks (a media card, a button row). Pages with no hooks still get a gentle per-section reveal automatically (initMotion auto-mode); opt a page out with `<body data-no-auto-reveal>`. The home hero keeps its own bespoke choreography (the swoosh draw) in `index.html`. New pages inherit the hooks from `_template.html`.
