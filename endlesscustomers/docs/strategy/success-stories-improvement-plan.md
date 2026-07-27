# Success Stories Section — Improvement Plan

> **STATUS: IMPLEMENTED June 6, 2026.** All code/data items below are done. Still open: the
> human follow-ups in section 5 (video URLs, coach attributions, headshots, per-story OG images,
> client re-approval sweep). `results_year` values for the 14 legacy stories are best-effort
> inferences from the story bodies and original publish dates — worth a team verification pass.

Planned changes to `/how-we-help/success-stories/` (hub + story template + data), based on the
review of the live impactplus.com section vs. the v2 build.

Scope notes from Bob:
- URLs/pre-rendering are out of scope. The JSON + client-side rendering approach stays, since the
  team will rebuild this in HubSpot. The data model is the deliverable.
- The rebrand context note moves from the hub hero to the *individual pages of older (TAYA-era)
  stories only*. Newer case studies don't need it.

---

## 1. Data model changes (`data/content/success-stories.json`)

### 1.1 Add `program_era` field to every story
- `"endless-customers"` — Linta Roofing, MoveMobility, Superior Trucking Payroll, Roe Painting
- `"taya"` — the other 14 (Dental ClaimSupport, AES, ThoroughCare, Berry Insurance, Dalinghaus,
  RetroFoam, InTek, West Roofing, Bill Ragan, Fire & Ice, RoofCrafters, EW Motion Therapy, AIS, IMPACK)
- This drives the per-story rebrand note (see 2.1) and survives the HubSpot migration as a simple
  select property.

### 1.2 Add `tldr` field to every story (AI-citable one-liner)
One self-contained, quotable sentence per story, written from existing data. Example:
> "Linta Roofing, a Myrtle Beach roofing company, grew from 6 to 21 employees and to roughly $8M
> in annual revenue in about three years using the Endless Customers System with coaching from IMPACT."
Rendered as a highlighted summary box at the top of the story page; doubles as the snippet AI
assistants and search engines are most likely to quote.

### 1.3 Add `results_year` (or similar) freshness field
The era stories cite 2020–2021 numbers with no date context, which reads stale to careful buyers.
Add the year(s) the results were reported, render it next to the results section ("Results reported
2021"), and keep showing `last_updated`. Honest dating builds trust.

### 1.4 Data bug fixes
- **RetroFoam**: "+10,109%" organic traffic is sitting in the `before` field — move to `after`.
- **ThoroughCare**: `company_url` empty → add https://www.thoroughcare.com (verify before write).
- **Berry Insurance**: `company_url` empty → add https://www.berryinsurance.com (verify before write).
- **Dalinghaus**: `location` says "Southern California" but body says California and Arizona — leave
  location, no change needed (listed here so it's a conscious decision).
- **MoveMobility** `seo.meta_description`: generic; rewrite to use the $1M/month + $6M-in-5-months hook.
- **MoveMobility title typo**: "Over $1Million Per Month" → "Over $1 Million Per Month".
- **Empty `service_tags` on the 4 newest stories** (Linta, MoveMobility, STPS, Roe Painting): these
  stories are invisible to the "Filter by Service" facet. Tag them with the appropriate
  success-services taxonomy values so the newest, strongest proof shows up in filtered views.
- **Missing `og_image_url` / `featured_image_url` on most stories**: links shared by coaches render
  with no image on LinkedIn/Slack. Set a branded default OG image as a template-level fallback (see
  2.7) and note per-story images as a content follow-up.
- Vague `timeframe` values ("Over the engagement") — tighten wherever the story body gives a real
  window; leave alone where we'd be guessing.

### 1.5 Coach attribution backfill (partial — needs team input)
- Only MoveMobility has a `coach_ids` value today, yet the site spec makes coach↔story linkage
  central to the E-E-A-T strategy and to coach profile pages.
- I'll backfill any coach explicitly named in a story body; the rest get a `TODO` note in this file's
  follow-ups section for the team to fill in. I will not guess attributions.

### 1.6 Video URLs (placeholder support — needs team input)
- `video_url` is empty on all 18 stories while the live section is video-first ("Watch real customer
  journeys" is the live page's own meta description).
- I'll wire up full template support (see 2.2) so that pasting a YouTube/Wistia URL into the JSON
  "just works." Populating the 18 URLs is a follow-up for whoever has access to the video library.

### 1.7 Expand `key_questions` to 3–4 per story
Most stories have only 1–2. These are the highest-leverage AEO surface on the page (they become the
FAQ schema). Add questions buyers actually ask, answered from the story's own facts, e.g. "How long
did it take Berry Insurance to see results?", "Did Dental ClaimSupport stop running paid ads
entirely?", "What did Linta Roofing publish each week?". No invented facts — only what the body
already supports.

---

## 2. Story template changes (`story.html`)

### 2.1 Rebrand context note on TAYA-era stories only
- When `program_era === "taya"`, render a short, well-designed note near the top of the story
  (below the hero summary, above the results):
  > *This company implemented the system when it was called They Ask, You Answer. In April 2025 the
  > framework was updated and rebranded to Endless Customers. Same principles, updated for today's buyer.*
- Links "Endless Customers" to `/learn/what-is-endless-customers`.
- Newer stories render nothing.

### 2.2 Video player in the hero
- When `video_url` exists: embedded player (YouTube/Wistia aware) at the top of the story, matching
  the live section's video-first layout. Lazy-loaded, with poster image from `featured_image_url`
  when available.
- When absent: current layout unchanged.
- Add `VideoObject` JSON-LD when a video is present.

### 2.3 TL;DR snapshot box
- Renders the new `tldr` field in a visually distinct box right under the hero, before the results
  section. One sentence, no fluff.

### 2.4 Share actions
- Add a compact share row to the story hero: Copy link, LinkedIn, X, Email. (The live pages have
  six share targets; copy-link is the one coaches actually need and the live page lacks.)

### 2.5 Results disclaimer
- One quiet line under the "By the numbers" section: *"Results reflect what each company reported.
  Every business starts from a different place; results vary."* Increases credibility of the numbers
  above it.

### 2.6 Freshness display
- Show `results_year` beside the results header and `last_updated` near the byline area (per 1.3).

### 2.7 Default OG image fallback
- When a story has no `og_image_url`/`featured_image_url`, fall back to a branded Endless Customers
  share image so coach-shared links never render bare on LinkedIn/Slack/iMessage.

### 2.8 Print-friendly stylesheet
- A `@media print` pass on the story template: hides nav/footer/CTAs, keeps logo, TL;DR, results,
  story, and quotes. Lets a coach print or save-as-PDF a clean one-pager for proposals and
  Assignment Selling emails without any extra tooling.

### 2.9 Soft CTA for not-ready-yet visitors
- Every CTA on the story page today is "Request a Consultation." Add the Free AI Diagnostic as a
  secondary, lower-commitment path (sidebar panel + final CTA band secondary button). Matches the
  self-service buying behavior the stories themselves preach.

## 3. Hub page changes (`index.html`)

### 3.1 Shareable filter URLs
- Filters and search write to query params (`?industry=construction-home-improvement&audience=b2c&q=roofing`)
  and are read on page load. A coach can then send "all home-services stories" as a single link.
  This behavior is also worth replicating in HubSpot, so it goes in the migration notes.

### 3.2 Video indicator on cards
- Cards and featured cards show a small play badge when the story has a `video_url`.

### 3.3 Replace the filler hero stat
- "Stories on this page" is filler. Replace the three hero stats with meaningful proof, e.g.:
  - **300+** companies coached (keep)
  - **8** industries represented (computed from data)
  - **In-house** marketing they own (keep)
  (Open to a revenue roll-up instead if you'd rather lead with money — flag in review.)

### 3.4 TAYA-era cards: no change
- Per Bob's direction the rebrand note lives on story pages only. No era badges on cards — keeps the
  hub clean as newer EC stories take over the top of the grid.

### 3.5 Smarter filter empty state
- Current empty state is a dead end ("No stories match those filters yet"). When a filter combo
  returns zero results, show: "We've coached 300+ companies — including businesses like yours that
  aren't on this page yet" with a Request a Consultation link, plus the nearest-match stories
  (same audience type or adjacent industry). Turns the weakest moment on the page into a CTA.

### 3.6 "Results at a glance" roll-up + ItemList schema
- A compact section near the bottom of the hub: one row per story (company, industry, headline
  result, timeframe), rendered as real text. This is the single most quotable artifact for AI
  assistants answering "does Endless Customers coaching work?"
- Add `ItemList` JSON-LD on the hub listing all stories with their URLs. JS-injected for now;
  becomes server-rendered for free in HubSpot.

## 4. Explicitly out of scope (for the HubSpot migration, not this build)
- Real per-story URLs / pre-rendering / sitemap entries — handled by HubSpot CMS pages.
- Canonical URL strategy (JSON currently points to impactplus.com; the v2 shell claims
  endlesscustomers.com). Decide at migration time; the JSON keeps the live impactplus URLs for now
  so redirect mapping stays trivial.
- Server-rendered JSON-LD — comes free with HubSpot templates.
- **Measurement plan** — in HubSpot, tag every CTA on this section with attribution (UTMs or HubSpot
  campaign) so "consult requests influenced by a success story" becomes a reportable number. Decide
  the convention at migration; noting it here so it doesn't get lost.
- **Review/quotation schema for testimonials** — worth evaluating in HubSpot once pages are
  server-rendered; skipping in the JS build.

## 5. Follow-ups that need humans (not code)
| Item | Who | Notes |
|---|---|---|
| Populate `video_url` for all 18 stories | Team w/ video library access | Template will be ready |
| Coach attribution for the remaining stories | Coaches/CS team | Only MoveMobility is attributed today |
| Headshots for quoted people | Team | Only 2 of 7 quoted people have `headshot_url` in people.json |
| New EC-era case studies pipeline | Bob | Older TAYA stories gradually rotate down as these land |
| Per-story OG/featured images | Team | Template fallback covers the gap meanwhile (2.7) |
| Client re-approval sweep | CS team | Confirm logos, quotes, and current numbers are still approved for use — several stories cite 2020–2021 figures and people who may have changed roles |

---

**Execution order once approved:** 1.4 data fixes → 1.1/1.2/1.3/1.7 new fields + content → 2.x
template → 3.x hub → verify locally (serve.command) across light/dark and mobile widths.

**Considered and deliberately left out:** an outcome-based filter ("more leads" / "shorter sales
cycle" / "revenue growth") — interesting, but a fourth filter on 18 stories is over-engineering;
revisit when the library passes ~30 stories. Era badges on hub cards — rejected per Bob. Pagination —
not needed at 18 stories with filters and search.
