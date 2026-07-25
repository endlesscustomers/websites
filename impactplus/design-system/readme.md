# IMPACT Design System

The design system for **impactplus.com** — IMPACT's marketing website. IMPACT is
a sales-and-marketing **coaching and training company** that teaches leaders and
their teams to win more customers using the **Endless Customers System** (the
methodology from the national best-seller *Endless Customers*, formerly *They Ask,
You Answer* by Marcus Sheridan). This system exists to help the team build **new
marketing website pages** that match the live site, re-purposing its modules and
sections.

## Sources
- Four full-page screenshots of live pages (`uploads/image (5)–(8).png`):
  the coaching **Program** page, the **Homepage**, **How it Works**, and
  **Pricing**. Cropped references live in `scraps/`.
- **Live site**: https://www.impactplus.com (homepage + FAQ copy transcribed).
- **Official brand guidelines**: https://www.impactplus.com/brand — the
  authoritative source for the colors and type scale in `tokens/`. Colors are
  transcribed verbatim; do not invent or round them.
- The site is HubSpot-hosted; logos and imagery are referenced from IMPACT's
  public HubSpot CDN (see `assets/README.md`).

## Products / surfaces
IMPACT markets one primary product line through the website:
- **Endless Customers Coaching & Training Program** (the core offer — Guidance /
  Mastery / Mastery Accelerated plans)
- **Endless Customers LIVE** (twice-yearly conference)
- **Add-on services**, each with its own accent color: Website, HubSpot, Sales,
  AI, Marketing.
The one UI kit here recreates the **marketing website** (`ui_kits/website/`).

---

## CONTENT FUNDAMENTALS

**Voice.** Confident, direct, encouraging — a coach, not a vendor. IMPACT speaks
as **"we"** and addresses the reader as **"you"** / **"your team"**. Copy is
plain-spoken and benefit-led, never jargon-heavy.

**Casing.** Marketing headlines use **Title Case** ("Win More Customers", "What
You'll Get", "Is This Program Right for You?"). Body copy is sentence case. The
brand name is always **IMPACT** in all-caps when written without the logo.

**Signature vocabulary.** "Endless Customers System", "the most known, trusted
and recommended company in their market", "Alignment Day", "own your growth
(don't outsource it)", "assignment selling". The trademark is *Endless Customers™*.

**Tone examples (verbatim):**
- Hero: *"IMPACT Helps Great Businesses Become The Most Known, Trusted and Recommended Company In Their Market With The Endless Customers System."*
- Testimonial headline style: *"Clarity That Drove Growth"*, *"From One to Six Stores"*, *"Close rates are up to 70%"*.
- Handwritten callout: *"made me a millionaire"* — playful, personal, human.
- FAQ answers are long, reassuring, and educational (2–4 paragraphs), reflecting
  the "They Ask, You Answer" philosophy of answering questions transparently.

**No pill badges (Bob's standard, 2026-07-23).** Plain small-text eyebrow labels
(the `eyebrow` prop on Hero, SectionHeading, etc.) are fine and on-brand — but
never dress one up as a pill/chip capsule with a fill, border, or dot; that reads
as generic AI-generated design. The `Badge` component is reserved for rare,
functional cases (e.g. a "RECOMMENDED" plan flag), never decorative labeling.
Also avoid contained "glass panel" boxes around trust rows near CTAs — contained
shapes compete with the buttons.

**Emoji.** Essentially none in marketing copy. The only emoji is a single 👋 in
the Ecee chat widget greeting. Do not add emoji to page content.

**Numbers & proof.** IMPACT leans on concrete client outcomes ("3–5x qualified
opportunities", "7x revenue growth", "1,500 leads a month") and named
attributions (person, title, company). Always attribute quotes to a real person.

---

## VISUAL FOUNDATIONS

**Overall vibe.** Trustworthy, editorial, and warm-but-professional. A bold
**serif** headline voice over clean sans body, punctuated by playful
**handwritten** annotations and hand-drawn arrows — the detail that makes IMPACT
feel human rather than corporate.

**Color.** Primary is **IMPACT Blue `#0A6CFF`** (CTAs, links, accents). Secondary
is **Green 400 `#01E6BE`** (pills, highlights) with **Green 500 `#01C4A2`** for
checkmarks. Backgrounds alternate between **white** and **Livid 100 `#F6F9FC`**
(a barely-there cool grey-blue); dark bands use **Neutral 700 `#1D1D1F`**.
Headings are Neutral 700, body copy is **Neutral 600 `#2B2B2B`** (a dark,
slightly warm near-black — sampled from the live site; the old lighter Slate
`#4F5465` read too washed-out). Each add-on
service has its own accent (Sales green, HubSpot orange, Website magenta, AI
teal, Marketing blue) with matching light/dark gradients. Max **1–2 background
colors per page** (white + livid, or a dark band).

**Type.** Headings + FAQ questions: **Merriweather** (serif, Bold/Black) — sturdy,
traditional, high-trust. Body + UI: **Proxima Nova** (see caveat). Decorative
callouts/stats: **Kalam** (handwritten). Scale (px): display 60 · h1 48 · h2 36 ·
h4 24 · h5 20 · body 18 (default) / 16 / 14.

**Backgrounds.** Mostly flat white and flat livid sections. Heroes are **full-bleed
photography** (real conference/team photos) with a dark overlay for legibility.
No busy patterns. Service pages introduce soft two-stop **gradients**. Photos are
warm, natural, real people — never stocky or cold.

**Imagery treatment.** Client logos render **grayscale + faded** (~55% opacity).
Photos sit inside **pill / arch-topped rounded masks** on the "How it Works" page
(tall rounded-top rectangles). Avatars are circular.

**Cards.** White surface, **16px radius** (`--radius-lg`), hairline `#E1E7F4`
border, soft cool shadow (`--shadow-card` = `0 10px 30px rgba(31,45,61,.08)`).
On hover they **lift 3px** and deepen the shadow. FAQ rows are livid-tinted with
**12px radius** and a circular outline **"+"** that rotates 45° when open.

**Buttons.** Fully **pill-shaped** (`border-radius:999px`), Proxima-Nova bold.
Primary = solid IMPACT Blue; "Learn More" = near-black; outline = currentColor on
dark bands; plus an inline arrow **text-link** ("Get a Free Chapter →"). Hover
darkens the fill and nudges up 1px. Many CTAs carry a trailing **→** arrow.

**Borders & dividers.** Hairline `#E1E7F4` for card/section borders; `#EEEEEE`
for light dividers; `#2B2B2B` stroke for divider lines on dark.

**Motion.** Restrained and functional — short fades and 220ms ease transitions on
hover/lift, accordion max-height slides. No bouncing, no parallax, no attention-
grabbing entrance animation.

**Radii.** xs 4 · sm 8 · **md 12** (inputs, FAQ) · **lg 16** (cards) · xl 24 ·
pill 999.

**Transparency / blur.** Minimal. The only overlay is the dark scrim on hero
photos; the Ecee chat tooltip is solid white with a blue border. No glassmorphism.

**Fixed elements.** The **Ecee AI chat** bubble (purple→pink gradient) is fixed
bottom-right on every page; the header is sticky; a dismissible **hello bar**
sits under the header for promos.

---

## ICONOGRAPHY

- **Approach.** IMPACT uses simple, single-weight line/solid **SVG** icons served
  from its HubSpot CDN — nav arrows (`navigation arrow - facing right`), dropdown
  carets (`arrow down icon`), a distinctive **Ecee AI** chat/search glyph set, and
  brand social icons. Icons are monochrome and inherit context color.
- **Green checkmarks** (`#01C4A2`, Green 500) mark included features and benefit
  lists — a recurring, recognizable device.
- **No icon font.** Icons are individual SVG files, not a webfont.
- **Emoji** is not used decoratively (only the 👋 in the chat greeting). **Unicode
  arrows** (→) appear inline in text-links and CTAs.
- **In this system:** the brand-specific **Ecee AI glyph** is hotlinked from the
  CDN (see `assets/README.md`). Generic UI glyphs (arrow, chevron, check, plus,
  star, play) are inlined as minimal SVGs in the components, matching IMPACT's
  clean single-stroke look. For net-new icon needs, substitute **Lucide**
  (MIT-licensed, matching stroke weight) and flag it. ⚠️ Swap for IMPACT's own
  SVGs when localizing to production.

---

## Components

Reusable React primitives (import from `window.IMPACTDesignSystem_9efa99`).

**Core** (`components/core/`)
- **Button** — pill CTA (primary / dark / secondary / outline / ghost / link).
- **Badge** — uppercase pill label / eyebrow (green / blue / dark / outline / solid).
- **StarRating** — gold review stars.
- **CheckItem** — benefit row with the green circular check.
- **Callout** — handwritten Kalam annotation + optional hand-drawn arrow.
- **SectionHeading** — eyebrow + serif title (+highlight) + subtitle.
- **StatCallout** — oversized serif/handwritten number + label.

**Cards** (`components/cards/`)
- **Card** — base white shadow-card surface.
- **TestimonialCard** — stars + headline + quote + avatar attribution.
- **FeatureCard** — icon tile + title + copy ("What You'll Get" grid).
- **ProgramCard** — logo lockup + dark CTA + secondary link (homepage three-up).
- **StepCard** — numbered process-step tab with a colored header.
- **TeamCard** — "Meet Your Team" role card (photo + role + description).
- **BlogCard** — Learning-Center article card (thumbnail + title + date + author).

**Sections** (`components/sections/`) — full-width page modules that mirror the real site bands, composing the primitives above.
- **Hero** — centered page hero: eyebrow, serif headline + blue highlight, subtitle, CTA row, optional handwritten callout.
- **FeatureGrid** — "What You'll Get / Gain": centered heading over a responsive FeatureCard grid.
- **TeamGrid** — "Meet Your Team": heading over a TeamCard grid.
- **QualifierBand** — dark "Is This Right for You?" band: heading + two-column green checklist + note.
- **QuoteBand** — large serif pull-quote band with attribution (muted / dark / plain).
- **TestimonialWall** — heading over star-review cards; `carousel` mode for a scroll-snap track with prev/next controls.
- **StepBand** — "Path to Endless Customers": heading over a row of numbered, palette-colored StepCards.
- **CtaBand** — full-width closing CTA: heading + subtitle + CTAs, on the dark surface or over a scrimmed photo.
- **SplitFeature** — How-it-Works step (eyebrow/serif title/body beside a photo); `step` renders the numbered "STEP N" variant with a ghosted watermark.
- **VideoFeature** — video poster with a centered play button + name overlay.
- **PeekingVideo** — hero video that peeks up above the fold, straddling the hero band and the section below.

**Diagrams** (`components/diagrams/`) — the branded diagram/illustration kit (Orbit-style structure, IMPACT palette).
- **DiagramFrame** — shared container: palette background, eyebrow/title, corner Kalam annotation.
- **AnnotatedVisual** — labeled-screenshot diagram: a subject image with numbered callout markers by %.
- **FlowDiagram** — relationship diagram in linear / cycle / hub-and-spoke layouts.
- **BarChartDiagram** — simple branded column chart for comparison stories.
- **BrandDiagram** — drop-in slot for IMPACT's real exported diagram SVGs (placeholder until `src` is set; never redrawn from scratch).

**Comparison** (`components/comparison/`)
- **ComparisonBlock** — competitor benchmark: you vs. 2–3 competitors across capability rows (check/x/text cells).

**Proof** (`components/proof/`)
- **ResultTile** — client logo + big metric + one-line result.
- **ResultTileGrid** — heading over a responsive strip of ResultTiles.

**Pricing** (`components/pricing/`)
- **PriceHighlight** — kickoff price block: title + price line(s) + "What's Included" checklist + image.
- **PricingMatrix** — multi-plan comparison table (one RECOMMENDED) across feature rows, with per-plan CTAs.

**Content** (`components/content/`)

**Content** (`components/content/`)
- **Prose** — long-form text block pairing the two existing paragraph styles: a larger lead (`--text-lg`, 20px) over default body (`--text-base`, 18px).
- **FaqAccordion** — serif FAQ rows with rotating "+" toggle.
- **LogoWall** — grayscale client-logo band.
- **NewsletterForm** — inline email capture (pill field + blue submit).
- **PricingTable** — plan comparison grid (checks / values / "Not Available").

**Chrome** (`components/chrome/`)
- **NavBar** — dark global header (logo + tagline + nav + Login + Schedule Call).
- **SubNav** — sticky secondary/section nav: product logo/label + in-page links (active underline) + CTA.
- **HelloBar** — dismissible promo bar.
- **Footer** — link columns + brand lockup + social + legal.
- **ChatWidget** — fixed "Ecee" AI chat launcher.

> **Intentional additions** (not patterns on the live site today, built on request): **ComparisonBlock**, **ResultTile / ResultTileGrid**, and the **Diagrams** kit. The diagram kit's `BrandDiagram` slots in your real exported graphics; the generated diagrams (Flow/Bar/Annotated) are palette-correct layouts, never reconstructions of your signature graphics.

---

## Index / manifest
- `styles.css` — global entry point (import this one file). `@import`s everything below.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `base.css`.
- `components/{core,cards,content,chrome,sections}/` — the 24 components above (`.jsx` + `.d.ts` + `.prompt.md` + a `*.card.html` per folder).
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `assets/README.md` — logo/imagery/icon URL inventory + localization notes.
- `ui_kits/website/` — interactive marketing-site recreation (`index.html`).
- `templates/` — copy-ready starting pages built as Design Components.
- `thumbnail.html` — homepage tile. `SKILL.md` — Agent-Skills wrapper.

---

## ⚠️ Caveats
- **Proxima Nova is now self-hosted** from licensed files in `/fonts` (Light/300,
  Regular/400, SemiBold/600, Bold/700, Extrabold/800, Black/900 + italics, plus a
  Condensed cut via `--font-cond`). `--font-sans` resolves to it directly.
- **Logos & imagery are hotlinked** from IMPACT's public HubSpot CDN (verified to
  load) because the CDN blocks programmatic download. To fully localize, download
  the brand packs (links in `assets/README.md`) and swap the URLs. No logo was
  ever reconstructed from memory.
- **Generic UI icons** substitute Lucide / inlined SVGs for IMPACT's own icon set.
