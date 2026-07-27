# Website v2 — TODO

## Visual density standard (from 2026-06-07, per Bob — now in site-spec.md §9 decisions log)

All new and existing pages need more visual weight: oversized video embeds (placeholder slots until real video exists), more graphics/images, strategic icon use, and animated SVGs where they aid comprehension.

Motion standard ("what would Apple do") and the `TODO(gemini)` placeholder convention are documented in site-spec.md §9 decisions log (June 2026).

- [x] **Visual style LOCKED (2026-06-07, per Bob)** — "Apple-calm + one Framer moment per page." Full guide: `visual-style-guide.md`; decision entry in site-spec §9; CSS components (`.media-card`, `.glass-chip`, `.statement-panel`, `.media-placeholder`) in main.css with live samples on styles.html. Canon boards in `assets/images/style-explorations/`. Key rules: code-built elements first / Gemini for photography only; rounded+shadow NO borders; no decorative arcs or character illustration; restrained blue→magenta aurora only inside dark panels
- [ ] **Service-page visual retrofits** (now unblocked by the locked style) — HubSpot page first as the pattern case, then websites, paid-advertising, ai, audit-and-recommendations…: strip bad stock photos, add motion-standard animations + strategic icons, build code-first elements from the kit, drop `TODO(gemini)` photo placeholders

- [x] Academy "smaller touches" (2026-06-07): count-up proof stats with draw-in underlines, hero avatar cluster with ring-draw 8k+ chip (real client photos), card-stack course covers on library tracks with hover fan-out
- [x] Academy oversized video band (2026-06-07) — standard `.svc-media`/`.svc-video` widened to 1140px/16:9, placed as first child of `.lc-wrap` (preserves the `.svc-hero--learn + .lc-wrap` zero-padding adjacency). `TODO(video)` marks the slot: needs the real Academy tour/Marcus welcome video AND a better poster (current poster is a stand-in conference photo; swap for Academy platform UI once screenshots exist)
- [x] Academy visual-pass layout complete (2026-06-07) — What's Inside rebuilt as 3 alternating media rows (community, course player, Missions) with framed `TODO(gemini)` prompt placeholders + 3-up icon cards (Planning tools & AI bot icons flagged `TODO(svg)` for animated versions); example-guide card carries a `TODO(svg)` animated-checklist placeholder; bridge band is now a split with the real stacked book image + `TODO(svg)` hand-drawn arrow placeholder
- [ ] **Academy: generate the actual art** — 3 platform screenshots (needs Academy-UI Gemini style skill first; course-player frame doubles as the hero video poster), then build the animated SVGs (checklist, bridge arrow, roadmap + typing-dots icons)
- [ ] **Build Gemini page-graphics skills before bulk image generation** — consistent style templates so all generated art matches: course covers, section illustrations, screenshots-in-device-frames, hero imagery. Then fill the `TODO(gemini)` slots accumulating in pages (first one: Academy library track covers). The locked `visual-style-guide.md` (§7 generated-image specs) is now the source the skills encode: edge-to-edge photos, no baked-in treatments, candid house style
- [ ] **Sitewide visual audit** — sweep existing pages for text-only sections that need imagery, screenshots, or animated SVG illustrations; drop `TODO(gemini)` markers as part of strategizing each page

- [ ] **Set up 301 redirects in HubSpot when this site migrates** (from the Our Team restructure on 2026-06-04):
  - `/about` → `/team/about`
  - `/team` (old Meet the Team grid) → `/team/meet-the-team` (note: `/team/` now serves the new hub page, so this is a content move, not a URL redirect)
  - `/join` → `/team/join-the-team`
- [ ] Write real content for `/team/join-the-team` (open roles — currently a placeholder)
- [ ] Flesh out the `/team/` hub page if desired (featured faces, story/values teasers)
- [ ] Content pass on `/how-we-help/who-we-work-with` (built June 2026 from coaching-page fit copy + FAQ facts — Bob to review industries list, checklist wording, and the "honest no" cards)
- [ ] Build out `/how-we-help/reviews` with real Google reviews (current page is placeholder content with sample stats — replace before launch)
- [ ] **Concept page redesign — set real authorship** (June 2026): the `concept.html` redesign went live (decision in site-spec §9). To demonstrate the multi-author byline/credits, the `4-pillars` record was given placeholder co-author **Vin Gaeta** + contributors **John Becker, Allison Belles** in `concepts.json` — confirm/replace with the real authors and contributors before launch. Also do an authorship pass across the other concept records (most should carry multiple authors/contributors). Optional follow-ups: a dedicated structured "framework" field for fully custom flagship visuals; bump the other Learn pages' `learn.css?v=` param so they pick up the promoted `.ccf-*` section on next deploy.

## Book section — promote to a top-level nav item (from 2026-06-09, per Bob)

Done this pass: renamed nav item "The Conference" → "Conference"; added a new top-level **Book** item (rightmost) with a single-column dropdown — About the Book (`/book/about`), Companion Guide (`/book/companion-guide`), Preview / Free Chapter (`/book/preview`), parent → `/book/`. Master is `components/nav.html` (site is loader-only, no inlined copies); width override `#dd-book` in main.css.

- [ ] **Move the book out of the Learning Center.** Take the current book page (`/learn/book`) and make it the "About the Book" page under the new top-level Book section. Rework the surrounding architecture so the book is its own main section (`/book/...`) and no longer lives under Learn.
- [x] **Removed "The Endless Customers Book" from the Learning Center dropdown** (nav.html master, 2026-06-09) — also removed the matching `/learn/book` link from the footer Learn column for consistency, so the book now lives only in the new dedicated Book section.
- [ ] **Build the two new pages:** Companion Guide (`/book/companion-guide`) and Preview / Free Chapter (`/book/preview`). Until they exist, the new nav + footer Book links are dead — don't send live yet.
- [x] **Footer Book section added** (2026-06-09) — stacked beneath the Conference column (footer is a fixed 5-col grid, so a section under Conference, not a 6th column), via reusable `.footer__col-title--stacked` helper. Synced into all pages.
- [ ] **301 redirect on migration:** `/learn/book` → `/book/about` (and sweep schema/entity references to `/learn/book`, e.g. the Book node in `/for-ai-agents` and the ISBN TODO above).
- [ ] Confirm dropdown copy/subs and icons (autonomous calls this pass — see chat) and the `/book/` URL scheme before building pages.

## Global featured CTA / promo bar (from 2026-06-08, per Bob)

- [ ] **Design a sitewide "featured CTA" mechanism** (Hello Bar, slim top promo, or similar) to surface time-sensitive promotions — the next live webinar, conference early-bird, etc. — in ONE global slot instead of hard-coding them onto individual pages. Decided while cleaning up Latest Insights: the next-live-webinar pin was removed from `/learn/latest` (it was a heavy bordered box that fought the feed). Until the global slot exists, the upcoming webinar is promoted only on `/learn/webinars` and in the nav. Define: placement, dismiss behavior, how it's scheduled/managed (HubSpot module post-migration), and which page types it shows on.

## Entity strategy (from 2026-06-06 — full plan in `Entity Strategy - IMPACT and Endless Customers.md`)

- [x] Build `/for-ai-agents` page with entity JSON-LD graph (2026-06-06)
- [x] Create `/llms.txt` at site root (2026-06-06) — confirm it deploys at the domain root on HubSpot
- [x] Link "For AI Agents" in footer Trust & Resources column, all pages + `components/footer.html` (2026-06-06)
- [x] Add `@id` + `sameAs` to the footer schema's `parentOrganization` stub (2026-06-06)
- [ ] **impactplus.com live-site fixes (don't wait for v2):** add `@id: https://www.impactplus.com/#organization` to its Organization schema (the EC site's reference currently dangles), fix invalid `Founder` property + Marcus-as-2009-founder error, fix `legalName`, add Cheshire address, standardize LinkedIn URL to `/company/impactbnd`, 301 `/about-us` → `/impact-company-profile`, rewrite the about page's "agency" meta description
- [ ] Place the canonical sentence in the first third of: homepage, `/team/about`, `/learn/what-is-endless-customers`, `/authors/marcus-sheridan`
- [ ] Build permanent succession page: `/learn/they-ask-you-answer` ("What happened to They Ask, You Answer?")
- [ ] Add entity FAQs to Core Concepts & Frameworks with FAQPage schema (same company? what happened to TAYA? who created EC? agency or coaching?) — /faq retired June 2026, 301s to /learn/core-concepts-frameworks
- [ ] Content pass on `/press` (built June 2026 — Bob to review boilerplate wording and add a dedicated media contact email; CTA currently routes to /contact)
- [ ] Verify TAYA revised-edition ISBN, then add to the Book node in `/for-ai-agents` and `/learn/book` schema
- [ ] robots.txt + declared sitemap for the new site (no AI-crawler blocks)
- [ ] Off-page wave after launch: citation/profile cleanup table, Wikidata cluster (5 items), bridge placements — see strategy doc sections 4–6
- [ ] Start the weekly AI-answer monitoring panel (10 prompts, strategy doc section 8)

## Trust pages (built 2026-06-06 — HonestFix playbook)

- [x] Pricing page fully rebuilt (`/how-we-help/coaching-program/pricing`): new model ($3,500 base + 90-Day Cycles), 6-anchor sub-nav, charts, gut check, worked examples, new schema
- [x] `/how-we-help/guarantee` built + in How We Help nav (all pages + components)
- [x] `/how-we-help/when-its-not-working` built + in footer Trust & Resources
- [x] Coaching program page + llms.txt + /for-ai-agents swept for new pricing/guarantee
- [ ] **Confirm Katie's email** — pages publish kcoelho@impactplus.com (assumed from rruffolo@ pattern); fix before launch if wrong
- [ ] **Internal rollout before launch:** coaches briefed; current clients hear the guarantee from their coach first
- [ ] Build `/how-we-help/compare-your-options` — the only dead link in the new pages (pricing page tier section links to it)
- [ ] Record pricing-explainer video (hero) + client cost-journey video (worth-it section) — TODO comments mark the spots
- [ ] Pricing estimator (Concept A) — section placeholder is live on the pricing page
- [ ] Update site-spec.md to reflect the new pricing model and the two new pages
- [x] Diagnostic transparency section + data FAQs + first FAQPage/WebPage schema on `/diagnostic` (2026-06-06) — published as the spec the production tool must meet
- [ ] **Diagnostic build must honor the published policy** (TODO(build) comments inline on the page): no-email results, HubSpot contact + one follow-up only on email share, no drip without opt-in, name the AI provider once chosen, 12-month retention + deletion, no training on user data

## AI Content Pipeline (from 2026-06-07 — full build guide in `AI-Content-Pipeline-Research.md`)

- [ ] **Create Endless Customers voice and tone document** — Extract brand voice, style, and tone from the manuscript and best existing website articles. Output: a structured `voice-guide.md` covering tone, word choices, what to avoid, and what makes EC content sound like EC. Goes into `/brand/voice-guide.md` in the knowledge base repo. Claude can generate this by reading the manuscript + best articles — 30-min task, not a writing-from-scratch exercise.
- [ ] **Second-brain content intelligence pipeline** (from 2026-06-07) — Automated intake of podcast transcripts, sales call transcripts, industry intelligence, and competitor research into a queryable markdown knowledge base (private GitHub repo, plain markdown). Full architecture, build sequence, and operating costs documented in `AI-Content-Pipeline-Research.md`. Start with Phase 1 (knowledge base foundation) before wiring any automation.

## Book page rebuild (2026-06-08)

- [x] `/learn/book` rebuilt as a full product page: premium hero, multi-format/multi-retailer buy module, praise (4 named endorsements), what's inside, author block, bulk-orders module, FAQ, plus Book/Review/Breadcrumb/FAQPage JSON-LD. New `bk-` components in `css/learn.css`.
- [x] `/learn/book/preview` built — static free-preview offer landing page with mock HubSpot form (`hs-form-ec-preview-edition`).
- [ ] **Confirm endorsement set + wording** — page uses Wickman, Miller, Handley, Halligan (pulled from live endlesscustomers.com). Swap/add (e.g. Ed McKnight's customer-result quote) per preference. Add headshots if desired.
- [ ] **Add Marcus Sheridan `sameAs` profile URLs** to the Book JSON-LD author node (LinkedIn, speaker site, Wikipedia) — left out to avoid shipping an unverified URL.
- [ ] **Confirm bestseller claim** — page keeps "USA TODAY Best-Selling"; live site says "National Best Seller." Pick one and use it consistently.
- [ ] **Build `/learn/book/bulk-order`** — last book stub; the new bulk module and FAQ both link to it. Live reference: endlesscustomers.com/bulk-buy.
- [ ] Wire real preview-download file + HubSpot form at launch (preview page is a mock).
- [ ] Optional: add a verified Amazon rating as `aggregateRating` on the Book schema (omitted now — no fabricated numbers).

### Book page v2 redesign (2026-06-08) — image art direction
Page now uses labeled image placeholders (`.bk-ph`). Supply/drop in real images for:
- [ ] Hero: book cover, 3/4 angle, soft glow on the dark stage (~720x960)
- [ ] Buy cards: hardcover photo, audiobook (cover + headphones), ebook on a tablet
- [ ] What's inside: open-book interior spread showing a Four Pillars page
- [ ] Author: Marcus Sheridan portrait (on-stage or studio)
- [ ] Bulk: stacked copies or a team holding the book
- [ ] Trust strip: real USA TODAY / Wiley / Amazon / Audible / B&N logos (currently dashed placeholders)
- [ ] Optional: a hero background image can layer into `.bk-stage` behind the scrim
- [ ] Preview page: preview/mini-book edition cover

## Homepage rebuild follow-ups (June 2026)
- [ ] Logo wall: source and re-host 10-12 real client logo SVGs (currently text wordmarks; `TODO(logos)`).
- [ ] Oversized video band: produce the real explainer/welcome video; poster is a stand-in conference photo (`TODO(video)`).
- [ ] Confirm marquee quote reuse + attribution (Ed McKnight, Opes Partners) and the reused testimonial quotes (Pricefx, AIIM, Yale, RoofCrafters, Superior Trucking, Roe).
- [ ] Confirm stats: "3-5x qualified opportunities" and "~90 days to first results." Reconcile the success-stories page "300+" with the homepage "500+" so the figure is consistent sitewide.
- [ ] Add real `featured_image_url` art to the 3 featured success-story cards (Linta, MoveMobility, Superior Trucking).
- [ ] Confirm the exact canonical entity sentence (vs `/press`) used in the hero subhead.
- [ ] AI statement panel: confirm the code-built "AI recommends your business" answer-mock concept.

## IMPACT/EC positioning + review feedback (from 2026-06-09, Tom + Bob review)

Full brief: `docs/strategy/impact-ec-relationship-options.md`. The relationship decision gates How We Help, the services menu, and the email migration. Recommendation in the brief is Model C (EC as master brand, IMPACT as disclosed parent, two-path site).

- [x] **DECIDED (Bob, 2026-06-09): everything under the Endless Customers brand; IMPACT only owns it.** Model A with Model C discipline. See brief. All items below are now unblocked.
- [x] **How We Help restructure — BUILT & LIVE IN CODE (2026-06-09).** "The Path" shipped into `components/nav.html`, synced to all inlined pages via `scripts/sync-nav.py`, new CSS (numbered path rail, two-group right column, bottom strip, pinned `dd-badge-new` font) added to `main.css`, cache-bust bumped to `?v=20260609` across 76 pages. Verified: all 18 link targets exist (no dead links), no stale old-nav markup remains, mobile drawer inherits the clone. NOT YET committed/pushed (Bob does that via GitHub Desktop = "send it live"). Follow-ups below.
- [ ] **Footer label catch-up** (from How We Help restructure) — the footer still links "Coaching Program & Pricing" → `/how-we-help/coaching-program`. Now that pricing is separating into its own dropdown link, align the footer once the pricing URL is settled (see next item). Edit `components/footer.html` + run `scripts/sync-footer.py`.
- [ ] **(superseded) How We Help restructure — Bob chose Option 2, "The Path":** a numbered 1-2-3 journey as the primary left column (1. Marketing Audit & Recommendations · 2. Fix What's Broken / services · 3. The Endless Customers Coaching Program), middle column "Additional Services" (the 8, website family first), right column split into two stacked groups "Pricing & Fit" (Pricing, Compare Your Options, Who We Work With) + "Proof & Trust" (Success Stories, Reviews, Guarantee), and a slim bottom utility strip (free-AI-Diagnostic on-ramp + Request a Speaker). No "Join"/"The Goal" language; numbers carry the order. Refined mockup: `docs/strategy/how-we-help-the-path.html`. After Bob signs off on this v2: wire into `components/nav.html`, run `scripts/sync-nav.py`, add the new dropdown CSS (numbered path rail, two-group right column, bottom strip) to `main.css`, cache-bust, verify render + mobile menu rebuild.
- [ ] **Promote Pricing to its own page** (from the How We Help restructure) — pricing currently lives at `/how-we-help/coaching-program/pricing`; the new dropdown surfaces "Pricing" as a standalone link. Decision: promote to `/how-we-help/pricing` and 301 the old nested path (add to `redirects-301.csv`). Confirm with Bob before moving.
- [ ] **Rebuild the Coaching Program + pricing section** (flagged by Bob 2026-06-09) — adopting the Path structure implies a fuller rebuild of the coaching program page and its pricing section so step 3 and the new standalone Pricing page hang together. Separate workstream; the dropdown can ship first, the page rebuild follows. Consider an optional price teaser on the dropdown Pricing link (model is "$3,500 base + 90-Day Cycles" per the pricing rebuild) — only if Bob wants a public figure in the nav.
- [ ] **Book-forward palette re-rank — HOME PAGE: BUILT IN CODE (2026-06-09), pending Bob review + push.** Applied homepage-only, scoped to `body.hp-book` via the inline `#hp-styles` block in `index.html` (main.css untouched — lift into main.css when extending site-wide). What shipped: (1) Root-cause fix — the `page-accent--blue` class was deriving EVERY neutral from the blue hue via `oklch(from accent h)`; overrode all neutrals (light + dark) to true Apple grayscale (`#1d1d1f`/`#6e6e73`/`#d2d2d7`/`#f5f5f7`; dark `#000`/`#1d1d1f`/`#86868b`). (2) Dark moments re-ranked off navy: hero gradient + overlay neutralized to charcoal→black with one faint blue accent glow; statement-panel → book-black `#0A0A0A` with a single blue spark (magenta glow removed); CTA band inherits near-black via `--color-heading`. (3) Blue kept as `--color-accent` (lines/links/sparks); primary button stays solid blue (Bob chose solid over magenta→blue gradient). (4) Brand elements woven in: animated repeating ENDLESS CUSTOMERS wordmark (CSS-generated, not crawlable) on the AI panel + CTA band; rainbow swoosh under the hero headline; faint aperture-O watermark on the Foundation block. All decorative layers `aria-hidden` + reduced-motion safe. (5) Main nav re-scoped to grayscale on the homepage: accent tokens neutralized within `body.hp-book .nav` (featured tile, New/Start-Here badges, path-number hover, sparkle icon, dropdown hover accents); the "Let's Talk" pill set explicitly and state-aware (white over the dark hero, near-black docked on white, light pill in dark mode). Blue is reserved for in-page content only. Preview: `docs/strategy/homepage-book-forward-preview.html`. Principle mockup: `docs/strategy/palette-comparison.html`.
  - **EXTRACTED + EXTENDED (2026-06-09):** the homepage palette/nav rules were moved out of the inline block into a shared **`css/book-forward.css`** (single source of truth), opted in via a `book-forward` body class. Homepage refactored onto it (`hp-book` → `book-forward`; brand decorations stay inline in `index.html`). Applied to the **three "Path" pages**: `/how-we-help/audit-and-recommendations`, `/how-we-help/initial-projects`, `/how-we-help/coaching-program` (body class + `book-forward.css` link added). The shared file adds two surfaces the homepage lacked: **sub-nav + `.psw` step indicator** grayscale, and **`.svc-hero__bg` / `.cf-hero__bg` glow** neutralized (accent-tint → neutral, keeps each hero's geometry). IN-PAGE accents on the Path pages (numbered step circles, icon tiles, checkmarks, eyebrows) intentionally STAY BLUE, matching the homepage formula — flip to grayscale later if Bob wants. NEXT: roll `book-forward` out site-wide, then fold `book-forward.css` into `main.css` and drop the class scope.
- [ ] **EC Academy login link — design later (per Bob 2026-06-09).** URL confirmed: `https://app.impactplus.com/users/sign_in`. Plan was a low-emphasis "Academy Login" link in the nav actions + footer. OPEN CONCERN (Bob): the nav already carries two CTAs (Free AI Diagnostic ghost + Let's Talk primary); adding a third link risks looking too busy. Need a placement that adds the login without crowding the actions cluster (options to explore: footer-only, an account/person icon instead of text, tuck under a "person" affordance, or inside the mobile/utility area). Revisit shortly.
- [ ] **EOS-style "Become a Coach" / "Find a Coach" (per Bob 2026-06-09 — later).** EOSworldwide.com is the reference. Now natural under the confirmed master-brand model (EC owns the coaching relationship). Design later.
- [ ] **Email + signature migration to @endlesscustomers.com.** Draft ONE canonical "Endless Customers is a brand of IMPACT" sentence, use it consistently in email signatures, the site footer, and the about page so the IMPACT parentage is always legible.

