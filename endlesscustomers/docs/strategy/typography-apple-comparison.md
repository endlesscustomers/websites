# Paragraph Typography: Our Site vs. Apple

June 4, 2026 · Rev 2 — scoped to paragraph styles only, per Bob. Headings, eyebrows, buttons, and nav are out of scope. **Nothing applied yet.**

Apple values measured live via computed styles on apple.com, /iphone-17-pro, and /macbook-air.

## How Apple's paragraph system actually works

Apple runs exactly three paragraph voices, and each one is a fixed **weight + color pair**. The weight and the color always travel together:

| Tier | Size | Weight | Color | Used for |
|---|---|---|---|---|
| **Feature copy** | 21px (28px for leads) | **600** | Gray #86868b | Short persuasive marketing paragraphs |
| **Standard copy** | 17–19px | 400 | Near-black #1d1d1f | Longer explanations, intros, specs |
| **Captions / fine print** | 12–14px | 400 | 56% black / #6e6e73 | Footnotes, legal |

Counts from the MacBook Air page: of 52 substantial paragraphs, **~40 are semibold-600 gray** and only ~5 are 400 near-black. The iPhone page skews more toward 400 because of spec and footnote volume. So yes — Apple genuinely mixes heavy and light body text, and the mix is roughly: sell at 600, explain at 400.

Two details that matter:

1. **Emphasis is color, not weight.** Inside the 600-gray feature copy, `<strong>` stays at weight 600 but the color pops to near-white #f5f5f7 (dark sections) or near-black (light sections). Example from the iPhone page: a gray paragraph with "8 pro lenses in your pocket" and "24MP photos by default" popped to white. The pop reads as bold because the surrounding gray is muted — exactly the effect you described.
2. **Smaller gray text gets a darker gray.** At 17px Apple shifts from #86868b to #6e6e73 to hold contrast. Gray lightness scales with size.

## What we have today (paragraph layer only)

| Element | Size | Weight | Color today |
|---|---|---|---|
| `.hero__subheadline` | 24px | 400 | `--color-text` |
| `.section__subtitle` | 18px | 400 | `--color-text` |
| `.pg-hero__sub` | 24px | 400 | `--color-text-muted` |
| `.card__body` | 15px | 400 | `--color-text` |
| `.step__body` / `.pg-pstep__text` | 18px | 400 | `--color-text` / muted |
| `.pg-feature__text` | 15px | 400 | `--color-text-muted` |
| `.cta-band__sub` | 18px | 400 | white 65% |
| `.testimonial-card__quote` | 18px | 400 italic | `--color-text-strong` |
| Learning Center body | 18px | 400 | text / muted |
| `strong` / `b` in paragraphs | — | browser default 700 | **inherits paragraph color** |

Everything is 400. There is no feature-copy tier, and bold text today just gets heavier without getting darker — the opposite of the Apple move.

**Good news on color:** our oklch accent-tint system is already the right machinery. On accent pages every neutral is derived from the page accent's hue (`--color-text-muted` at L 0.522 is our tinted analog of Apple's #86868b; `--color-text` at L 0.372 is our #1d1d1f analog). We don't need new colors — we need to pair the existing grays with the right weights, the way Apple does.

## Proposed paragraph system

### 1. New emphasis token: bold = pure black / pure white

```css
:root            { --color-em: #000; }
[data-theme="dark"] { --color-em: #fff; }

p strong, p b, li strong, li b {
  font-weight: 600;            /* not 700 — Apple pops color, not weight */
  color: var(--color-em);
}
```

This makes bold the only pure black/white on the page — even headings stay hue-tinted — which is what makes the pop read. Precedent already exists: the breadcrumb `--sub-strong` does #000/#fff today. On dark video heroes (`.hero--video`), strong inside the 90%-white subheadline resolves to pure #fff automatically.

### 2. New feature-copy tier (the Apple signature)

```css
.copy-feature {
  font-size: var(--text-xl);            /* 20–21px, matching Apple's 21px */
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: var(--color-text-muted);       /* our tinted #86868b analog */
}
.copy-feature strong { color: var(--color-em); }   /* weight already 600 */
```

Semibold muted gray with key phrases in full black/white. Carries the page hue on accent pages for free via the oklch tokens. Use for value-prop paragraphs on home, service pages, and the event page pitch sections.

### 3. Weight mix across existing paragraph classes

| Element | Proposal | Rationale |
|---|---|---|
| `.hero__subheadline` | 400 → **600**, color → muted | This is the hero sell line — Apple's 28px lead copy is 600 gray |
| `.section__subtitle` | 400 → **600**, color → muted | Section lead = Apple's 21px feature copy |
| `.pg-hero__sub` | 400 → **600** (already muted) | Same role |
| `.card__body` | 400 → **500** | 15px is below Apple's 600 range; 500 adds presence without density. Apple runs 600 down to 17px, so 600 is worth eyeballing too |
| `.step__body`, `.pg-pstep__text` | 400 → **500–600** | Process steps are sell-adjacent; test both |
| `.pg-feature__text` | 400 → **500**, consider darker muted | 15px gray needs the darker-gray-at-small-sizes rule |
| `.cta-band__sub` | 400 → **600** | Sell copy on a dark band; strong inside → #fff |
| `.testimonial-card__quote` | Keep 400 italic | Quotes shouldn't shout |
| Learning Center articles, FAQ answers | **Keep 400** | Apple keeps everything longer than ~2 sentences at 400; semibold long-form is fatiguing |
| Footnotes/captions | Keep 400 | Matches Apple |

The resulting sitewide mix mirrors Apple's: short persuasive copy semibold gray, explanatory copy regular, fine print light — with pure-black/white bolds as the accents.

### Accent pages: verified, tint is preserved

Checked all 11 accent pages (services/* and coaching-program, using `page-accent--blue/magenta/hubspot`). Their paragraph styles (`.wr-hero__sub`, `.wr-lede p`, `.ai-*`, `.hs-*`, etc.) all reference the same oklch-derived tokens, so the hue tint survives every change proposed here — the proposal only touches `font-weight`, never the color tokens. What those tokens actually resolve to per accent (light mode):

| Accent | `--color-text-muted` | `--color-text` |
|---|---|---|
| Blue | #596a87 | #31415b |
| Magenta | #7f5e70 (mauve-gray) | #543546 |
| HubSpot | #845f56 (warm gray) | #58372e |
| Green | #597157 | #30472e |

Nothing in the proposal redefines these. A magenta page's semibold feature copy will be semibold *mauve-gray*, exactly as today's regular-weight copy is mauve-gray.

### One existing pattern needs a decision: accent-colored bolds

Service pages already pop their lede strongs to the **page accent color** — e.g. `.wr-lede p strong { color: var(--color-accent); }` exists on the redesign, AI, HubSpot, learning-center, paid-ads, and self-service pages. So the site has an emphasis convention today, it's just accent-colored rather than black.

**Decision (Bob, June 4):** Apple-strict — all paragraph bolds go pure #000/#fff. Accent presence continues via tinted grays, eyebrows, buttons, and stats.

Mechanical note: the per-page rules (`.wr-lede p strong { color: var(--color-accent) }`) are more specific than a global `p strong` rule, so they won't be overridden automatically — rollout must include removing those accent-pop rules from the six service pages that have them (website-redesign, ai, hubspot, learning-center, paid-advertising, self-service-tools).

### Notes

- **No new font loads.** Inter 500/600 are already imported.
- **Accessibility:** Apple's #86868b is only 3.4:1 on white — below AA for normal text (they lean on the 21px/600 large-text exemption). Our `--color-text-muted` is 4.9:1, so we get the same look while keeping the AA standard from the June color pass. Don't be tempted to lighten the gray to match Apple exactly.
- **Pure black on tinted pages:** #000 bolds will sit on hue-tinted backgrounds (oklch L 0.995 with slight chroma). The contrast is the point, but worth one visual check on the magenta and HubSpot pages.

### Rollout status

1. ✅ **Applied June 4** — `--color-em` token (#000 light / #fff dark) + global `p/li strong, b` rule in main.css. Local `--color-em: #fff` overrides on `.hero--video` and `.cta-band`, which stay dark in light mode. **Updated same day:** bold weight set to **740** (initially 640, raised at Bob's request for real weight contrast on top of the color pop; Inter switched to the variable font, wght 100–900, so intermediate weights render true; legacy browsers fall back to 700), and body copy lightened a step for more bold/body contrast — `--color-text` #334155 → #475569 light, #CBD5E1 → #B7C3D3 dark, accent oklch L 0.372 → 0.446 light / 0.869 → 0.82 dark.
2. ✅ **Applied June 4** — removed the seven accent-pop `strong` rules from the six service pages; also converted `.sd-body strong` (success-story template) and `.ecl-logo-card__text strong` (event page) to `--color-em` so the convention holds everywhere. Display-style strongs (stat numbers, contact-name lockups) intentionally keep their heading-tinted component styling.
3. ⬜ `.hero__subheadline` and `.section__subtitle` weight/color change — biggest visible shift
4. ⬜ `.copy-feature` class, applied page by page where copy warrants it
5. ⬜ Card/step/feature small-text bumps (500), eyeball 600 variants
