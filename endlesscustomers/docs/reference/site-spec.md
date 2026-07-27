# Endless Customers — Site Specification
> Living document. Last updated: June 2026.
> This file is the single source of truth for site architecture, content types, navigation, and the mock CMS data model. Update it before building new sections or content types.
> **Navigation is locked as of June 2026.** Do not change the nav structure without updating this file.
> **URL update (June 2026):** The entire Learn section now nests under `/learn`. Every Learn page lives at `/learn/...` (e.g. `/learn/recent-insights`, `/learn/what-is-endless-customers`, `/learn/book`). Detail pages use a **singular** parent segment (`/learn/recent-insight/[slug]`, `/learn/webinar/[slug]`, `/learn/tool/[slug]`) while listings stay plural. Downloads & Tools lives at `/learn/tools`. This sets up a single "Learn" breadcrumb root across the whole section.

---

## 1. Mission & Business Goals

Endless Customers' long-term mission is to work with thousands of businesses and support hundreds of coaches and service providers helping those businesses grow. The website is the primary marketing vehicle for that mission.

**Primary goal:** Drive enrollment into the Endless Customers Coaching Program.

**Secondary goals, in priority order:**
1. Sell add-on services on top of the coaching program (HubSpot, website, paid media, AI, and others as they expand)
2. Recruit new Endless Customers Coaches and Service Providers
3. Drive membership signups for Endless Customers Academy (self-serve path for those not ready for coaching)
4. Promote and sell the *Endless Customers* book (individual and bulk)
5. Fill seats and recruit sponsors for the EC Live conference (twice yearly)
6. Build E-E-A-T authority for all coaches and service providers

**Top-of-funnel conversion offer:** An AI-powered instant diagnostic tool where a visitor enters their website URL and receives an automated audit of their digital marketing presence with prioritized recommendations. This is the highest-volume entry point and should be prominently featured everywhere.

---

## 2. The Buyer Journey

Think like a buyer at every decision. Visitors arrive with very different levels of awareness:

- **Problem-aware, solution-unaware** — They know their marketing isn't working but don't know about Endless Customers. They need *The System* — what it is, why it works, proof it works.
- **Solution-aware, not convinced** — They've heard of EC or *They Ask, You Answer*. They need to see coaches they can trust, success stories, and clear pricing.
- **Ready to buy** — They've done their research. They need a clear path to booking a call, finding a coach, or starting a diagnostic.
- **Self-implementation path** — Not ready for coaching. They need the Learning Center, the book, and the Academy.
- **Looking for a specific service** — Found EC through HubSpot, website, or paid media needs. Introduce them to the broader EC system.

The site should serve all five simultaneously. Every content type and every page should have a clear next step that moves the visitor toward one of the primary conversion points.

---

## 3. Navigation Architecture — LOCKED

### Global Nav Structure

```
[Logo → /]   Learn ▾   How We Help ▾   Our Team ▾   Conference ▾   Book ▾   [Free AI Diagnostic]  [Let's Talk →]
```

**Design:** Floating pill. Fixed, centered, max-width 980px, height 64px, 16px from top. Full border-radius. Backdrop blur. Stronger shadow on scroll. Menu items are left-aligned — they flow just after the logo rather than being centered in the pill. All nav labels use Title Case. Implemented in `components/nav.html` + `css/main.css`.

**Logo** — links to `/`. Light mode: `logo-dark.svg`. Dark mode: `logo-white.svg`. Both in `/assets/images/`. Sized by a fixed width (not height) so the two SVGs render at identical size and the nav doesn't shift when the theme toggles.

**Right CTAs:**
- `Free AI Diagnostic` — ghost outline button → `/diagnostic`
- `Let's Talk →` — filled dark button → `/lets-talk`. Carries a subtle gray shine-sweep animation; the same shine is applied to every filled CTA button site-wide (`.btn--primary/blue/magenta/green/hubspot`), and it respects `prefers-reduced-motion`.

**Mobile (≤900px):** Menu collapses to a hamburger. The mobile menu is a **drill-down that is generated from the desktop dropdowns at runtime** — `buildMobileMenu()` in `js/main.js` clones each desktop dropdown's content (icons, subtext, category labels, the cycling conference image, the CTAs) into mobile panels. The desktop nav is the single source of truth: edit a desktop dropdown and the mobile menu updates automatically — there is no separate mobile markup to maintain (the `#nav-mobile` container ships empty and is filled by JS). A main panel lists the four groups as large links with a chevron; tapping one slides to that group's sub-panel (with a Back button). The conference photo slideshow runs in the mobile panel too. *(Post-HubSpot, both can instead render from a single `{% menu %}` source server-side.)*

---

### Dropdown: Learn

*The System and Learn are the same thing. Consuming EC content IS learning the system.*
*Layout: featured card on top, then a two-column grid. Every item has a leading icon.*

**Featured (top of dropdown)**
- ✦ Free Tool — Get Your Free AI Diagnostic → `/diagnostic` *(distinct featured card; the diagnostic is a top-level conversion tool, not a Learn page, so it stays at `/diagnostic`)*

**The System** *(left column)*
- What Is Endless Customers? → `/learn/what-is-endless-customers`
- Core Concepts & Frameworks → `/learn/core-concepts-frameworks` *(replaced the Playbook / Knowledge Base, June 2026)*
- Endless Customers Academy → `/learn/academy`

*(The Endless Customers Book left this dropdown June 2026 — promoted to its own top-level "Book" nav section + a footer Book section. Removed from the footer Learn column too. With the book gone, the three columns rebalanced to 3/3/3 and **Subscribe** moved out of the "Stay Current" column into a full-width bottom CTA pill (`.dd-cta`), framing the panel opposite the featured diagnostic tile.)*

**Content Library** *(right column)*
- Recent Insights → `/learn/recent-insights` *(every record is an episode + its AEO article; published twice per week)*
- Endless Customers Podcast → `/learn/podcast` *(hub page about the show — a curated/filtered view of the same Insight records, not a separate content type)*
- Webinars → `/learn/webinars`
- Downloads and Tools → `/learn/tools`

**Bottom CTA (full-width button row)**
- Subscribe to Our Content → `/learn/subscribe`

*Note (resolved): podcast and Recent Insights remain ONE content type — every podcast episode IS a Recent Insight record (video + AEO article). `/learn/podcast` is a hub page that introduces the show and lists episodes; it reads from the same Insights data, it is not a second collection.*

**Label changes (June 2026, per Bob):** "Start Here" → **"What is Endless Customers?"** with a `dd-badge-new`-style **"Start Here"** badge (same pill as the "New" badge on AI Services / Marketing Audit); its sub became "The system, why it works, and the proof". "Academy" → **"Endless Customers Academy"**. "Podcast" → **"The Endless Customers Podcast"**. The three pages' hero crumb chips match the new nav labels, and their H1s became marketing lines so chip and headline don't repeat (What is EC: "Become the most known, trusted, and recommended brand in your market." / Academy: "Learn the system at your own pace." / Podcast: "Real stories from real businesses."). Footer links intentionally keep the short labels (Academy, Podcast) — compact by design.

---

### Dropdown: How We Help

*Four-column mega dropdown (June 2026 — was three; `.nav__dropdown--4col`). Col 1: program. Col 2: Proof & Trust. Cols 3+4: Additional Services. Every item has a leading icon. Width (June 2026, per Bob): the panel spans the nav bar itself, logo left edge to CTA right edge — anchored to `.nav__inner` (the parent li goes `position: static`), inset matching the inner padding + the logo's 10px optical nudge. ~1360px under the 1400px grid, easing to ~1118px at the 1200px breakpoint floor; panel type rides a 1200–1400 fluid ramp (names 13.5→15px, subs 12→13px, primary title 17→19px) and the proof/service columns carry px minimums so nothing wraps at the floor.*

**Col 1 — the program**
- Coaching Program & Pricing → `/how-we-help/coaching-program` *(primary large item with EC ring icon — entry into the full coaching section; sub shortened to "how it works and what it costs" since fit now has its own page)*
- Who We Work With → `/how-we-help/who-we-work-with` *(added June 2026 — self-qualification page: fit checklist, $3M–$100M sweet spot, industries, honest "not for you" section. Sub line: "Are we the right fit for you?" — per Bob, June 2026)*
- Request a Speaker → `/how-we-help/request-a-speaker`

**Col 2 — Proof & Trust** *(added June 2026: buying-decision proof gets its own scannable column instead of hiding under the coaching card)*
- Success Stories → `/how-we-help/success-stories`
- Reviews → `/how-we-help/reviews` *(moved from Our Team, June 2026 — social proof is a buying tool, not company info; 301s in redirects-301.csv)*
- Our Guarantee → `/how-we-help/guarantee`

**Featured row (top, spans all four columns)**
- Marketing Audit & Recommendations → `/how-we-help/audit-and-recommendations` *(badged "New" — added June 2026. One-time $5,000 expert audit + prioritized action plan; the paid upgrade to the free AI diagnostic and the on-ramp to coaching/projects. Rendered as a full-width accent strip (`.dd-featured--row`) directly under the dropdown header, above the columns — mirrors the Learn dropdown's featured diagnostic card and frames the audit as the first step.)*

**Cols 3 + 4 — Additional Services** *(split evenly across two columns)*
- HubSpot Training & Services → `/how-we-help/hubspot`
- Website Redesign → `/how-we-help/websites/redesign`
- Website Optimization → `/how-we-help/websites/optimization` *(label shortened from "Website Optimization & Training" June 2026 to match the footer/sitemap label and keep one line at the dropdown's 1200px floor)*
- Learning Center Development → `/how-we-help/websites/learning-center`
- Self-Service Tools → `/how-we-help/websites/self-service-tools`
- Paid Advertising → `/how-we-help/paid-advertising`
- AI Services → `/how-we-help/ai` *(badged "New")*
- TRUST Theme for HubSpot CMS → `https://trusttheme.com` *(external link)*

*(Future spokes join their hub page, not this menu — the dropdown stays curated.)*

**Pricing** lives inside `/coaching` (the coaching section has its own pricing page). Services are scoped/quoted — no fixed services pricing page.

---

### Dropdown: Our Team

*Each item has a leading icon. Join the Team covers all open paths.*
*Updated 2026-06-04: the combined Story/Vision/Values page was split into two pages, and the whole section now carries a section sub-nav (same `#subnav` component as the service pages, page links, no CTA): Our Story | Vision & Values | Meet the Team | Join the Team.*

- Our Story → `/team/our-story` *(interactive scroll-reveal timeline of the company history)*
- Vision & Values → `/team/vision-and-values` *(purpose, 1,000-business vision, PACT values)*
- Awards & Recognition → `/awards` *(lives at /awards but belongs to the Our Team section; also in the section sub-nav)*
- Meet the Team → `/team/meet-the-team`
- Join the Team → `/team/join-the-team` *(covers coaches, providers, and staff openings; hiring runs through Workable)*

*(301: `/team/story-vision-values` → `/team/our-story`, see redirects-301.csv)*
*(Reviews left this dropdown June 2026 — now lives at `/how-we-help/reviews` under Proof & Trust; `/team/reviews` 301s there. Our Team is back to its documented four items.)*

---

### Dropdown: Conference

*(Renamed June 2026, per Bob: nav label "The Conference" → "Conference".)*

*Visual dropdown — a near-square image panel (left) cross-fades through 4 real event photos. Links panel (right) shows real dates. Wider than the other dropdowns and shifted right.*

**Image panel (cycling every 3s):**
- Cycles 4 real EC Live photos with no text overlay: `ec-live-1.jpg` … `ec-live-4.jpg` in `/assets/images/endless-customers-live/`.
- A 4-segment progress bar across the bottom fills as each photo advances, signalling the auto-cycle.

**Links panel:** *(updated June 2026 — hub-and-spoke restructure)*
- Header is the EC Live logo image (white version on the dark panel), with an explicit "Explore the Conference →" link to `/live/` directly beneath it — the logo alone wasn't discoverable as the path to the hub.
- Upcoming dates: Hartford Oct 5–7 2026 + Chicago Apr 5–7 2027 (with inline "Early Bird" flag), each with Register button
- What It's Like → `/live/experience/` (merged What to Expect + Recordings)
- Past Events → `/live/past/` (listing of every past event since 2018; recaps on-site, recordings in the IMPACT+ community)
- Become a Sponsor → `/live/sponsor`
- Convince Your Boss → `/live/convince-your-boss`

*Maintainer note (June 2026): the nav is injected by js/main.js and then configured — on sub-nav pages it's converted from the centered floating pill to the full-width docked bar. The injected nav carries `.nav--booting` (transitions suppressed) until two frames after init, otherwise the pill→docked transform change animates and the bar slides in from the left. If you add new nav-configuring init steps, run them inside the loadComponent callback before the `nav--booting` removal.*

*Note: Conference always alternates Hartford / Chicago. The dropdown carries highlights and conversion paths; the `/live/` hub is a lean router (hero → upcoming dates → explore cards); the section FAQ lives on `/live/experience/`. Speakers live on each event page (`#speakers`), not on a standalone page — `/live/speakers` 301s to the next event's speakers section.*

---

### Dropdown: Book

*(Added June 2026, per Bob — the book is promoted out of the Learning Center to its own top-level section. Rightmost menu item; single-column dropdown like Our Team, `nav__dropdown--right` so the panel opens leftward and never clips the viewport at the 1200px floor. Width override `#dd-book` in main.css. Each item has a leading icon + sub.)*

- About *Endless Customers* → `/book/about` *(label is "About Endless Customers" with the book title italicized; sub signals you can buy it. The relocated `/learn/book` page becomes this; `/learn/book` 301s here)*
- Companion Guide → `/book/companion-guide` *(new page — to build)*
- Preview (Free Chapter) → `/book/preview` *(new page — to build; note a `/learn/book/preview` already exists from the June 2026 Book rebuild — fold/redirect into `/book/preview`)*
- Parent overview → `/book/`

*Pending work tracked in TODO.md ("Book section — promote to a top-level nav item"): move the page, remove the book from the Learn dropdown, build the two new pages, add a Book group to the footer, set the 301s. New links are dead until the pages exist — not launch-ready yet.*

---

### CTA: Let's Talk

→ `/lets-talk`

Short intake form (company size, primary challenge, how they heard about EC) + immediate calendar booking. Not a generic contact page — routes to the right next step (coaching call, services consult, or diagnostic).

---

### Section Sub-navigation Patterns (June 2026 — one job per tier, max two sticky bars)

Three sanctioned patterns; shape encodes role (floating pill = global nav, full-width band = program chrome, small pill = in-page tool). Every page's hierarchy breadcrumb lives in the HERO as the `.svc-crumb` chip (quiet trail + accent current-page chip with icon) — never in a bar.

1. **Standard page** — hero crumb only. No bar.
2. **Anchor pages** — hero crumb + the scroll-triggered `.subnav--svc` anchor pill (appears past the hero; `data-subnav-hero` opts in non-svc heroes).
3. **Sub-brand microsite** — `.subnav--band`: a persistent full-width masthead band, flush under the docked nav (rises to the top when the nav hides on scroll-down). Program identity left as a bold text label — "Coaching Program & Pricing" set in the display type (`.subnav__brand--text`), links to the section overview; cross-page links + a compact section CTA right (CTA type matches the menu items, not the taller global sub-nav CTA). No base hairline — the frosted glass tone separates the band from the page (June 2026, per Bob: the program logo image was retired here in favor of a text title so the left balances the link/CTA cluster and stays in the type system; the legacy `.subnav__brand-img--light/--dark` image rules remain in CSS for any future logo-lockup band). Reserved for true multi-page sub-brands — currently ONLY the coaching section (`/how-we-help/coaching-program` + its three subpages, plus `/how-we-help/guarantee`, which keeps the program shell as a satellite of the coaching journey but no active link). The band replaces the old crumb-left/links-right subnav, which is retired: it said "Coaching Program & Pricing" on every page and never named the page you were on.

Coaching crumbs: overview chip = "Coaching Program & Pricing" (matches the nav label); subpage trail = "How We Help › Coaching Program ›" + chip "How It Works" / "What You'll Learn" / "Pricing", all with the EC ring icon (the `dd-icon--ec` SVG). Guarantee chip = "Our Guarantee" with `ti-shield-check`. JSON-LD BreadcrumbList matches (3 levels on coaching subpages).

If a band page also needs in-page anchors (Pricing), the anchor row is a small sticky glass pill (`.pp-anchors`) that docks UNDER the band — `body:has(.subnav--band.is-raised)` swaps its `top` so it rides up when the nav hides. Never three full bars.

---

## 4. Site URL Structure

```
/                                   Home
/diagnostic                         AI Diagnostic Tool
/lets-talk                          Primary conversion / intake + booking

HOW WE HELP — LOCKED 2026-06-04. Hub-and-spoke: `websites` and `hubspot` are
the only two hubs (each a robust head-term landing page linking to its spokes);
`ai` and `paid-advertising` stay standalone spokes for now. Slug convention:
spokes never repeat the hub word (websites/optimization, NOT
websites/website-optimization). New website-related services (incl. future
vibe-coded-websites and cms-migrations — CMS migrations lives under websites,
cross-linked from the hubspot hub) are added as spokes, NOT to the main nav by
default: the nav stays curated, hubs carry the full catalog.

/how-we-help                                  Section overview (all programs + services)

/how-we-help/coaching-program                 Coaching program overview
/how-we-help/coaching-program/how-it-works    Detailed coaching process
/how-we-help/coaching-program/whats-covered   What you'll learn
/how-we-help/coaching-program/pricing         Coaching pricing and plans

/how-we-help/websites                         Websites hub
/how-we-help/websites/redesign                Website Redesign
/how-we-help/websites/optimization            Website Optimization Training
/how-we-help/websites/self-service-tools      Self-Service Tools
/how-we-help/websites/learning-center         Learning Center Development
/how-we-help/websites/vibe-coded-websites     (future spoke)
/how-we-help/websites/cms-migrations          (future spoke)

/how-we-help/hubspot                          HubSpot hub — training & services

/how-we-help/ai                               AI Services (standalone spoke)
/how-we-help/paid-advertising                 Paid Advertising (standalone spoke)

/how-we-help/success-stories                  All success stories (filterable)
/how-we-help/success-stories/[slug]           Individual success story

(301s from the pre-launch /services/* URLs: see redirects-301.csv)

/live                               Conference hub page (renamed from /ec-live, June 2026)
/live/hartford-2026                 Event page — agenda, pricing, venue, FAQs, registration
/live/chicago-2027                  Event page — early-bird pricing, registration
/live/experience                    What It's Like — format, teaser, free sample recordings (absorbs /live/archive, 301'd)
/live/past                          Past events listing — every event since 2018 (IMPACT Live → Endless Customers Live)
/live/chicago-2026                  Past-event recap — who spoke, highlights, photos, recordings (pattern: every event page becomes a recap after the event)
/live/sponsor                       Sponsorship information and packages
/live/convince-your-boss            Business case + ready-to-send approval email

LEARN — everything nests under /learn (listings plural, detail pages singular):
/learn                              Learning Center hub
/learn/what-is-endless-customers    The System — full methodology explanation
/learn/recent-insights              Recent Insights listing (articles + episodes)
/learn/recent-insight/[slug]        Individual article/episode
/learn/podcast                      Endless Customers Podcast hub (a filtered view of the same Insight records)
/learn/core-concepts-frameworks     Core Concepts & Frameworks hub — REPLACED The Playbook (June 2026). Question-based reference library organized by the 4 Pillars. See core-concepts-strategy.md + core-concepts-question-list.md.
/learn/core-concepts-frameworks/[slug]      Individual concept page — local template: concept.html?id=

**Core Concepts data layer (June 2026):** `data/content/concepts.json` (103 question records: id, question, family_id, flagship, status published|stub, short_answer, markdown body with ## sub-question H2s, related_ids, next_id, author_id, dates, read time) + `data/taxonomy/concept-families.json` (8 families: System, Thriving in an AI-First World, the 4 Pillars, Program, Fit — AI family added June 2026 per Bob to position EC as the solution to AI disruption; start-here cards are buyer-journey questions incl. cost-to-implement and ROI). Hub renders start-here cards, family sections, counts, and CollectionPage/ItemList JSON-LD from the collection; concept.html renders any record (canonical short-answer block, TOC, hover copy-link anchors, related, natural-next-question, Article+DefinedTerm+FAQPage+Breadcrumb JSON-LD; stubs get an honest "answer in progress" state routing to answered siblings). 16 flagship answers are drafted from the manuscript and live in the collection. learn-nav.js indexes published concepts in the library search as "Concepts & frameworks" (v=20260606r55).
/learn/webinars                     Webinar listing (upcoming + on-demand)
/learn/webinar/[slug]               Individual webinar page
/learn/tools                        Downloads & Tools listing
/learn/tool/[slug]                  Individual offer landing page
/learn/book                         Book landing page
/learn/book/preview                 Download book preview (offer landing page)
/learn/book/bulk-order              Bulk order page
/learn/academy                      Academy overview
/learn/academy/plans                Plan comparison and pricing

/team                               Our Team hub (router cards to the four section pages)
/team/our-story                     Company story — interactive timeline (was /team/story-vision-values, 301'd)
/team/vision-and-values             Purpose, vision, and core values
/team/meet-the-team                 Staff/coach/provider listing
/team/[slug]                        Individual staff profile (shared Profile template)
/team/join-the-team                 Careers + coach/provider recruiting (applications via Workable)
/contact                            General contact
```

---

## 5. Content Types & Schemas

All content types are stored as JSON arrays in `/data/`. Each record has an `id` (unique slug-safe string) and a `slug` (URL path segment). Relationships are expressed as arrays of `id` references — never duplicated data.

### 5.0 Shared fields (every content type)

Every record across all content types carries an `seo` object for full search/social control. `cms.js` renders these into `<title>`, meta, Open Graph, and canonical tags, and falls back to the record's own title/excerpt/image when a field is blank.

```
seo: {
  meta_title,        // overrides <title>; falls back to title/name
  meta_description,   // meta + OG description; falls back to excerpt/tagline/bio_short
  og_image_url,       // social share image; falls back to featured/headshot image
  canonical_url,      // canonical tag; blank = self-referential
  noindex             // boolean; true for thin/gated pages we don't want indexed
}
```

This, combined with `key_questions`/`faq` (FAQPage + Q&A schema) and author/editor credits (E-E-A-T), is the standard AEO/SEO toolkit applied site-wide.

---

### 5.1 Profile

One template for everyone: employees, coaches, service providers, authors, and guests. **Guests live in this same People system** — a client who appears on the podcast, presents on a webinar, writes a guest article, or gives a testimonial is one Profile record with a `guest` role. If they come back, it's the same record; if they later become a coach, you just add a role. One person, one record, referenced everywhere. Sections are conditionally rendered based on whether data exists. A controller has a name, title, headshot, and bio. An Endless Customers Coach has all of that plus every piece of content they touched, every client success story, every webinar, every credential — the full E-E-A-T treatment. A guest's page shows every episode they've been on, every webinar, every article they authored, every testimonial they gave, and every success story they're part of.

**Fields:**

| Field | Type | Notes |
|---|---|---|
| `id` | string | Unique slug, e.g. `bob-ruffolo` |
| `slug` | string | URL segment |
| `name` | string | Full name |
| `role` | array | `["coach", "employee"]` — can hold multiple. Allowed values: `coach`, `provider`, `employee`, `speaker`, `guest`, `author`. A person can be several at once (e.g. coach + speaker, or guest + author) |
| `title` | string | Job title or credential line |
| `company_name` | string | Their company (for guests and providers — who they represent) |
| `company_url` | string | Company website |
| `company_logo_url` | string | Company logo (shown on guest cards and success-story links) |
| `headshot_url` | string | Display image path or CDN URL |
| `headshot_download_url` | string | High-res downloadable version of the headshot (for press/speaker use) |
| `bio_short` | string | 1–2 sentence version for cards |
| `bio_long` | markdown | Full bio for profile page |
| `location` | string | City, State |
| `specialties` | array of topic IDs | e.g. `["content-strategy", "video-sales"]` |
| `services_delivered` | array of service IDs | For providers — what they scope and quote |
| `credentials` | array of strings | Certifications, awards, degrees |
| `companies_coached_count` | number | Displayed as a credibility stat |
| `years_experience` | number | |
| `booking_url` | string | Calendly or equivalent |
| `linkedin_url` | string | |
| `twitter_url` | string | |
| `website_url` | string | Personal or company site |
| `bio_video_url` | string | Short "meet me" bio video embed |
| `speaker_reel_url` | string | Separate speaker reel video (shown for `speaker` role) |
| `featured_quote` | string | A quote *about* them from a client |
| `is_active` | boolean | False = hidden from directories |
| `is_featured` | boolean | Surfaces on homepage, coach finder |
| `is_public` | boolean | False = internal only (e.g. operations staff) |

**Conditional profile sections (shown only if data exists):**

| Section | Populated by |
|---|---|
| Success Stories | `success_story_ids` — cases where this person was the coach |
| Articles Written | Recent Insights where their ID is in `author_ids` |
| Podcast Appearances | Recent Insights where their ID is in `host_ids` or `contributor_ids` |
| Edited | Recent Insights where their ID is in `editor_ids` — shows editorial involvement |
| Webinars Hosted/Appeared | `webinar_ids` (as speaker, moderator, or guest) |
| Testimonials Given | Webinar/Success Story testimonials linked to this person's ID — surfaces for guests |
| Content Contributed | `evergreen_content_ids` |
| Downloads Created | `offer_ids` |
| Services Offered | `services_delivered` — for providers |
| Client Logos | `client_logos` — array of image URLs |

---

### 5.2 Recent Insights

Every episode of the podcast becomes one Recent Insight record. The episode is the video. The AEO-optimized article is built around it. Published twice a week. Bob Ruffolo is always the host/author. Guests are referenced by Profile ID.

**Fields:**

| Field | Type | Notes |
|---|---|---|
| `id` | string | e.g. `ep-47-content-strategy-2026` |
| `slug` | string | URL segment |
| `title` | string | Article/episode title |
| `episode_number` | number | |
| `publish_date` | ISO date | |
| `status` | enum | `draft`, `published` |
| `featured_image_url` | string | |
| `podcast_video_url` | string | YouTube embed or equivalent. May be empty for audio-only episodes |
| `podcast_audio_url` | string | Spotify/Apple Podcasts or direct. Audio-only is a valid state — when there is no video, the template shows the audio player alone (no video embed) |
| `article_body` | markdown | AEO-optimized long-form article. Supplementary video clips/examples are dropped inline here as embeds (occasional, not every episode) — not modeled as structured chapters. No episode sponsor model |
| `excerpt` | string | Meta description and card preview |
| `estimated_read_time` | number | Minutes |
| `host_ids` | array of profile IDs | Podcast host(s) = author(s). Bob hosts and writes, so the byline is one and the same. Field kept distinct from `editor` but normally mirrors `author_ids` |
| `author_ids` | array of profile IDs | Byline author. Same person as host by default (Bob). Template collapses the byline to one name when host and author match |
| `contributor_ids` | array of profile IDs | Guests on the show, credited as contributors. Powers the "Connect with ___" guest blocks (pulls booking/social from their Profile) |
| `editor_ids` | array of profile IDs | Editor(s) who reviewed. Surfaces "Editor reviewed by ___" to demonstrate an editorial process (E-E-A-T) |
| `topic_ids` | array of topic IDs | Taxonomy tags |
| `industry_ids` | array of industry IDs | Optional industry relevance |
| `key_questions` | array of `{question, answer}` | AEO structured data — Q&A schema |
| `transcript` | markdown | Optional full transcript |
| `related_offer_ids` | array of offer IDs | Relevant downloads to promote |
| `related_evergreen_ids` | array of evergreen IDs | Deep dives on topics discussed |

---

### 5.3 Webinar

Two to three per month. Three distinct states: upcoming (registration), live, on-demand (recording). The template handles all three based on `status` and `event_date`.

**Fields:**

| Field | Type | Notes |
|---|---|---|
| `id` | string | |
| `slug` | string | |
| `title` | string | |
| `status` | enum | `upcoming`, `live`, `on-demand` |
| `event_date` | ISO datetime | Used to auto-transition upcoming → on-demand |
| `event_timezone` | string | e.g. `America/New_York` |
| `duration_minutes` | number | |
| `description` | markdown | |
| `featured_image_url` | string | |
| `speaker_ids` | array of profile IDs | Presenter(s). Surfaced as "Meet Your Speaker." Uses Profile `speaker` role |
| `host_ids` | array of profile IDs | Moderator(s) — a separate team member who runs the session (e.g. Stephanie), distinct from the speaker |
| `guest_ids` | array of profile IDs | Guests appearing on the webinar (same guest records that appear on the podcast) |
| `topic_ids` | array of topic IDs | |
| `form_id` | string | HubSpot form. Powers both upcoming registration and the gated on-demand "Watch Now" form |
| `registration_url` | string | Optional external fallback; primary registration is the on-page `form_id` |
| `recording_url` | string | For on-demand |
| `testimonials` | array of `{quote, guest_id}` | Added after the webinar goes live — attendee/guest praise about this specific webinar. `guest_id` links to the person's Profile |
| `is_recording_gated` | boolean | If true, require form to watch |
| `related_offer_ids` | array | Companion downloads |
| `related_insight_ids` | array | Companion articles |

---

### 5.4 Downloadable Offer

Gated resources: book preview, guides, AI tools (Claude Skills, custom GPTs), checklists. Each gets its own landing page with a form.

**Fields:**

| Field | Type | Notes |
|---|---|---|
| `id` | string | |
| `slug` | string | |
| `title` | string | |
| `type` | enum | `guide`, `tool`, `book-preview`, `claude-skill`, `custom-gpt`, `checklist`, `template`, `report` |
| `tagline` | string | One-line value prop |
| `description` | markdown | Landing page body |
| `featured_image_url` | string | Cover/preview image |
| `thumbnail_url` | string | Card thumbnail |
| `form_id` | string | HubSpot form ID (or mock form reference) |
| `delivery_method` | enum | `download`, `email`, `redirect` |
| `download_url` | string | If direct download after form |
| `author_ids` | array of profile IDs | |
| `topic_ids` | array of topic IDs | |
| `is_featured` | boolean | Surface on Learning Center hub |
| `related_insight_ids` | array | |
| `related_evergreen_ids` | array | |

---

### 5.5 Evergreen Content (Knowledge Base) — RETIRED June 2026

> **Retired with the Playbook.** The KB/Playbook section was removed in favor of `/learn/core-concepts-frameworks` (question-based concept pages). `evergreen.json` + `kb-staging` are archived in `data/content/_retired-playbook/`; `learn-nav.js` no longer loads evergreen (search + topic counts exclude lessons); `/learn/playbook*` 301s to the new hub. The kb-* helpers in cms.js are dead code pending the new concept collection. Historical spec below.

The core principles of Endless Customers. Organized into **KB sections** (The Foundation, the five "Right X" components, Planning Your Investment, Putting It All Together, Support & Community, plus Thrive in the Age of AI) with parent/child hierarchy inside each section. Written to be timeless, not dated. Structured like a knowledge base or Wikipedia — definitive answers to the questions buyers ask when researching EC.

**June 2026 — full content migration.** The complete KB (~85 articles) was migrated from the standalone emdash/Astro prototype (endless-customers.brand-024.workers.dev) into `evergreen.json`. The migration was also a cleanup pass: the duplicate Versus/Comparisons article was dropped, mis-sectioned articles (Support & Community trio, Planning articles) were re-filed, inconsistent section values were normalized to section IDs, and the parent/child tree (Big 5, Selling 7, Video, Content Team, Self-Service Tools) was rebuilt. Pre-migration data is archived in `data/content/kb-staging/_evergreen-old.json`; the staging folder can be deleted once the section is signed off.

**Presentation metadata lives in two taxonomy files:**
- `data/taxonomy/kb-sections.json` — `{ id, label, zone ('frameworks' | 'start-here'), order, curator_id, reviewer_id, description }`. Section IDs double as topic IDs (they're also appended to `topics.json` so cross-content tagging works).
- `data/taxonomy/kb-paths.json` — curated learning paths: `{ id, label, description, article_ids[] }`. Three role-based paths ship at launch (Business Owners & CEOs, Sales Leaders, Marketing Leaders). Paths are reading lists over existing articles, never duplicate content.

**Fields added by the migration:** `nav_title` (short sidebar label), `nav_order` (position within its section/parent), `what_youll_learn` (array of takeaway strings rendered as the "What you'll learn" box). Stub articles ("Coming soon." bodies — 15 at migration time) stay `published` and render a coming-soon notice; `EC.kbIsStub()` detects them.

**Fields:**

| Field | Type | Notes |
|---|---|---|
| `id` | string | |
| `slug` | string | |
| `title` | string | |
| `status` | enum | `draft`, `published` |
| `topic_id` | topic ID | Primary topic cluster this belongs to |
| `parent_id` | evergreen ID | If this is a child article. Tree supports unlimited depth (3rd, 4th level+) via chained parent/child; slugs stay unique, breadcrumbs render the hierarchy |
| `child_ids` | array of evergreen IDs | Nested sub-articles |
| `article_body` | markdown | |
| `excerpt` | string | |
| `author_ids` | array of profile IDs | Supports multiple authors |
| `editor_ids` | array of profile IDs | Editor(s) who reviewed. Surfaces "Reviewed by ___" — these definitive reference pages carry the strongest E-E-A-T need |
| `published_date` | ISO date | Original publish date (schema.org `datePublished`) |
| `last_updated` | ISO date | Last revision (schema.org `dateModified`). Shown as "Originally published X, updated Y" for freshness/E-E-A-T |
| `estimated_read_time` | number | Minutes |
| `key_questions` | array of `{question, answer}` | AEO structured data |
| `related_service_ids` | array | Surfaces relevant services inline |
| `related_offer_ids` | array | |
| `related_insight_ids` | array | Recent articles on this topic |

---

### 5.6 Service Page

One record per service offering. The scope can grow — new services are just new records. 10–12 to start. Pricing model varies (scoped/quoted for most add-ons). Each service page surfaces the providers who deliver it and the success stories attached to it.

**Fields:**

| Field | Type | Notes |
|---|---|---|
| `id` | string | e.g. `hubspot-services` |
| `slug` | string | URL segment |
| `service_name` | string | |
| `headline` | string | Hero headline for the landing page |
| `tagline` | string | Subheadline / value prop |
| `description_short` | string | For service directory cards |
| `description_long` | markdown | Full page body |
| `features` | array of `{title, description}` | What's included |
| `pricing_model` | enum | `scoped`, `fixed`, `retainer`, `quoted` |
| `starting_price` | string | Optional, e.g. `"Starting at $2,500/mo"` |
| `topic_ids` | array of topic IDs | Joins services to the cross-content web — topic pages list related services |
| `provider_ids` | array of profile IDs | Providers who deliver this service |
| `success_story_ids` | array | Success stories tied to this service |
| `related_evergreen_ids` | array | Knowledge base articles about this topic |
| `related_insight_ids` | array | Recent Insights on this topic — internal linking (SEO) |
| `related_offer_ids` | array | Companion downloads to capture leads from the page |
| `faq` | array of `{question, answer}` | Powers FAQPage structured data (AEO) |
| `is_active` | boolean | |
| `is_featured` | boolean | Surface on services overview page |

*Dropped: `service_type` enum — redundant now that `topic_ids` handles grouping and cross-linking. Coaching is NOT a Service record; it has its own `/coaching` section that carries its own SEO/AEO (a duplicate Service record would compete with those pages).*

---

### 5.7 Success Story

The most persuasive content on the site. Every success story connects to a coach (or provider), a service, an industry, and quantified results. Surfaces contextually everywhere — on coach profiles, service pages, and filtered listings.

**Fields:**

| Field | Type | Notes |
|---|---|---|
| `id` | string | |
| `slug` | string | |
| `title` | string | The benefit-driven case-study headline (e.g. "How Linta Roofing Grew to an $8M Business…"). The single most persuasive element |
| `company_name` | string | |
| `company_url` | string | Link to the client's website |
| `company_industry` | industry ID | |
| `company_size` | enum | `1-10`, `11-50`, `51-200`, `201-500`, `500+` |
| `audience_type` | enum | `b2c`, `b2b`, `both` — powers directory filtering |
| `location` | string | City, State (optional) |
| `company_logo_url` | string | |
| `featured_image_url` | string | |
| `video_url` | string | Optional video testimonial |
| `summary` | markdown | The opening hook — 2–3 sentences that frame the story and the headline result |
| `story_body` | markdown | The full narrative. Writer composes with whatever H2 sections fit (The Journey, How They Implemented, Why Coaching Mattered, What's Next). Replaces the old rigid `challenge`/`solution` split. Optional — a video-only or quote-only story leaves this empty |
| `results` | array of `{metric, before, after, timeframe}` | Structured metric callouts (e.g. team `6` → `21`). `before` optional so qualitative wins are valid. Strongest persuasive + AEO element |
| `key_questions` | array of `{question, answer}` | AEO structured data |
| `testimonials` | array of `{quote, person_id, context}` | Pull quotes woven through the story. `person_id` links each to a guest Profile so the quote aggregates onto their page under "Testimonials Given". `context` notes where/why (optional) |
| `coach_ids` | array of profile IDs | Coach(es) on the engagement |
| `provider_ids` | array of profile IDs | Provider(s) for service-driven wins — credits their profile |
| `service_ids` | array of service IDs | Services delivered |
| `topic_ids` | array of topic IDs | |
| `publish_date` | ISO date | |
| `last_updated` | ISO date | Freshness signal |
| `is_featured` | boolean | Homepage and directory featured placement |

*Related success stories are surfaced automatically by shared `topic_ids`, `service_ids`, and `company_industry` — no manual related list needed (matches how the current Linta page pulls related roofing/home-services stories).*

---

## 6. Taxonomy

Shared across all content types. Stored in `/data/taxonomy/`.

### Topics
The core subject matter of Endless Customers. Every content type references one or more topics. Topics are the connective tissue for related content components.

Examples: `content-strategy`, `video-sales`, `they-ask-you-answer`, `website-conversion`, `sales-alignment`, `hubspot`, `paid-media`, `ai-marketing`, `seo-aeo`, `email-marketing`, `social-media`, `pricing-transparency`, `self-selection`, `assignment-selling`

**Schema:** `{ id, label, slug, description, parent_topic_id }`

Topics can be nested (e.g. `ai-marketing` is a parent; `ai-tools-for-content` is a child).

### Industries
Used on Success Stories and surfaced on coach/provider profiles to show specialization.

Examples: `home-services`, `hvac`, `roofing`, `plumbing`, `pool-outdoor-living`, `remodeling`, `professional-services`, `legal`, `accounting`, `insurance`, `b2b-manufacturing`, `industrial-distribution`, `technology-saas`, `healthcare`, `real-estate`, `education-training`, `retail`

**Schema:** `{ id, label, slug, parent_industry_id }`

Industries can be nested (e.g. `home-services` is parent; `hvac` and `roofing` are children).

### Content Formats
Used for filtering in the Learning Center.

Values: `article`, `podcast-episode`, `webinar`, `guide`, `tool`, `checklist`, `template`, `book`, `course`

### Service Types
Used for filtering provider profiles and success stories.

Values: `coaching`, `hubspot`, `website`, `paid-media`, `ai`, `content`, `video-production`

---

## 7. Relationship Map

This is how content types connect to each other. Arrows show "references."

```
Profile ──────────────────────────────────────────────────────────────
  │ authored          → Recent Insights
  │ hosted/appeared   → Webinars
  │ coached           → Success Stories
  │ authored          → Evergreen Content
  │ created           → Downloadable Offers
  │ delivers          → Services

Recent Insights ──────────────────────────────────────────────────────
  │ tagged with       → Topics
  │ promotes          → Downloadable Offers
  │ links to          → Evergreen Content (deep dives)
  │ authored by       → Profile (host + guests)

Webinar ──────────────────────────────────────────────────────────────
  │ hosted by         → Profile
  │ tagged with       → Topics
  │ may become        → Recent Insight (recap article)
  │ promotes          → Downloadable Offers

Success Story ────────────────────────────────────────────────────────
  │ coached by        → Profile
  │ delivered via     → Services
  │ tagged with       → Industry, Topics

Service Page ─────────────────────────────────────────────────────────
  │ delivered by      → Profile (providers)
  │ proven by         → Success Stories
  │ explained in      → Evergreen Content

Evergreen Content ────────────────────────────────────────────────────
  │ belongs to        → Topic (cluster)
  │ nests under       → Evergreen Content (parent)
  │ authored by       → Profile
  │ relates to        → Services, Offers, Insights

Downloadable Offer ───────────────────────────────────────────────────
  │ authored by       → Profile
  │ tagged with       → Topics
  │ related to        → Insights, Evergreen Content
```

### Key relationship rules:
- A **Profile** aggregates everything connected to it — that's what makes coach profiles authoritative (E-E-A-T).
- A **Success Story** is the intersection of Profile (coach) + Service + Industry. Filters on any of the three should surface it.
- A **Topic** is the cross-cutting tag that powers "Related Content" everywhere — any content type sharing a topic ID can be surfaced together.
- **Services** are introduced wherever relevant (inside content, success stories, profiles) — because service-first visitors should always be introduced to the broader EC system.

---

## 8. Mock CMS Architecture

The local prototype uses JSON files as a data layer and vanilla JavaScript as the rendering engine. The structure mirrors HubSpot CMS Collections so the migration path is clear.

### Folder Structure

```
Website v2/
├── data/
│   ├── content/
│   │   ├── people.json           ← All profiles (coaches, providers, staff)
│   │   ├── insights.json         ← Recent Insights (articles + podcast episodes)
│   │   ├── webinars.json         ← Webinars
│   │   ├── offers.json           ← Downloadable offers
│   │   ├── evergreen.json        ← Knowledge base articles
│   │   ├── services.json         ← Service pages
│   │   └── success-stories.json  ← Case studies
│   └── taxonomy/
│       ├── topics.json
│       ├── industries.json
│       └── formats.json
├── templates/
│   ├── profile.html              ← One template for all profile types
│   ├── insight.html              ← Article/podcast episode template
│   ├── webinar.html              ← Webinar page (handles all 3 states)
│   ├── offer.html                ← Offer landing page
│   ├── evergreen-article.html    ← Knowledge base article
│   ├── success-story.html        ← Case study page
│   └── service.html              ← Service landing page
├── js/
│   ├── main.js                   ← Existing: nav, theme, components
│   └── cms.js                    ← NEW: data fetching, relationship resolution,
│                                         template rendering, URL param parsing
├── components/
│   ├── nav.html
│   └── footer.html
├── css/
│   └── main.css
├── assets/
│   └── images/
├── index.html                    ← Homepage
├── styles.html                   ← Style guide / design system reference
└── site-spec.md                  ← This file
```

### How cms.js Works

`cms.js` is the mock CMS engine. It:

1. **Parses the URL** to determine what data to load (e.g. `profile.html?id=bob-ruffolo`)
2. **Fetches JSON** from the relevant `/data/` file(s)
3. **Resolves relationships** — finds related records by cross-referencing IDs across files
4. **Renders the template** — populates placeholder elements in the HTML with the resolved data
5. **Handles conditional sections** — only renders a section if data exists for it

This is a direct analog to how HubSpot's CMS engine works:
- JSON fetch → HubSpot CRM / CMS Collection query
- URL param `?id=` → HubSpot dynamic page URL mapping
- JS conditional rendering → HubL `{% if content.field %}...{% endif %}`
- Relationship resolution → HubSpot Associations API

### HubSpot Migration Mapping

| Local (Mock CMS) | HubSpot Equivalent |
|---|---|
| `/data/people.json` | CMS Collection: Profiles |
| `/data/insights.json` | CMS Collection: Blog / Recent Insights |
| `/data/success-stories.json` | CMS Collection: Case Studies |
| `/data/taxonomy/topics.json` | Taxonomy: Topics |
| `cms.js` relationship lookup | HubSpot Associations |
| `?id=slug` URL param | Dynamic page URL mapping |
| Template `{% if field %}` | HubL conditional rendering |
| `/components/nav.html` | Global Header module |
| `/components/footer.html` | Global Footer module |

---

## 9. Key Decisions Log

Decisions made and rationale. Update when decisions change.

| Decision | Rationale |
|---|---|
| Core Concepts & Frameworks detail page (`concept.html`) redesigned (June 2026, per Bob) | Three review rounds with Bob took the concept template from a clean-but-KB-looking article to an Apple-grade reference page. Layout: the reading column (744px) is the centered page spine, with a sticky section-nav + social-share rail floating in the left margin balanced by an equal phantom column on the right (collapses to a single centered column + inline TOC/share ≤1080px); the breadcrumb sits above the column with clear separation. Surfaces: every container moved off the 1px borders the style guide rejects AND off drop shadows (Bob disliked both) onto flat theme-aware tints (`--ccf-fill`: bg-subtle on light, bg-surface on dark). The short answer is a calm flat lead (19px, one step above body — not a banner, no top rule). An always-present cinematic 16:9 video slot renders a branded "coming soon" placeholder when `video_url` is empty, so the page is complete on day one and never shifts when video is added. Ordered lists render as numbered framework tiles (the 4 Pillars look designed automatically; benefits every framework concept). "Behind this answer" + byline are multi-author by default (each author gets photo/title/bio; contributors and editor listed) — concepts will almost always have multiple authors/contributors. One dark statement CTA closes the page. Read time shows once (byline), not duplicated in the rail. Schema preserved + extended (`ItemList` for enumerated frameworks; `VideoObject` stays gated on a real URL). Styles promoted from inline to `learn.css` (`.ccf-*`); the comparison file `concept-v2.html` now 301-redirects to `concept.html`. **Demo authorship:** the 4-pillars record was given a co-author (Vin Gaeta) + contributors (John Becker, Allison Belles) so the multi-author treatment is visible — placeholder data to be set to the real people (tracked in TODO.md). Open: breadcrumb sits above the article column (not spanning the rail) now that the column is centered. |
| Latest Insights (`/learn/latest`) design pass + webinar pin removed (June 2026, per Bob) | Apple-Newsroom-style cleanup: the library masthead (`.svc-hero--learn`) was compacted (top chrome 88→28px, headline held to an editorial-masthead tier) so the feed leads with content; the newest episode became a true 16:9 lead story (`.ec-featured`, no fixed-height crop, play cue); the feed grid goes 3-up (`.ec-grid--feed`); borders gave way to tints (the next-webinar pin's 2px stroke and the outlined filter pills are gone — chips are soft fills with a brand-accent active state, fixing an old white-on-white active chip in dark mode); cards now degrade to the EC placeholder tile when an image 404s (`cardImg` in `insightCard`). **The next-live-webinar pin was removed from this feed entirely** — promoting time-sensitive events (next webinar, conference early-bird) belongs in a future global featured-CTA slot (Hello Bar or similar, tracked in TODO.md), not hard-coded onto Latest. Hero sub-copy dropped its "and upcoming webinars" clause to match. Reverses the earlier "pin events at the top of the feed (events are part of what's new)" implementation note in the page JS. |
| Book page (`/learn/book`) rebuilt as a real product page (June 2026, per Bob) | Old page was a stub (hero + 4 pillars + a flagged big-number stat row + CTA) with one buy link pointing at an Amazon *search* URL. Rebuilt around four goals: AEO, discovery, multi-format/multi-retailer purchase, and bulk orders. New sections: premium hero (balanced "Get the Book" + "Get a Free Preview" CTAs, real subtitle, trust meta), a "Buy from wherever you read" module (Hardcover → Amazon/B&N/Bookshop/Books-A-Million, Audiobook → Audible, Ebook → Kindle; real links pulled from the live endlesscustomers.com), Praise (4 named endorsements: Wickman, Miller, Handley, Halligan), What's Inside (kept the 4 pillars + a "what you'll learn" list), an author block, a dedicated Bulk & team orders module, and an FAQ. Added Book + workExample editions + Review, BreadcrumbList, and FAQPage JSON-LD (the page previously carried only the inherited footer Organization schema). Retired the `cf-claims sys-frameworks` big-number stat row (a design-qa "hero-metric" anti-pattern) — the three proof figures now read as an inline social-proof bar. New `bk-` components live in learn.css (no inline-style/borrowed-class debt); the borrowed `.lc-navcard__more` bulk link is gone. Endorsement set and Marcus's `sameAs` profile URLs still need Bob's confirmation (tracked in TODO.md) |
| Footer section headings link to their hubs (June 2026, per Bob) | The four section column headings (`.footer__col-link` inside the `<h2>`) link to `/learn/`, `/how-we-help/`, `/team/`, `/live/`, mirroring the nav's section→hub pattern; Trust & Resources stays plain text (footer-only, no hub). Linked headings inherit the heading type and only change color on hover (no arrows — four would clutter). Removed the now-redundant "Endless Customers Live → /live/" list item from The Conference column since the heading carries it. Note: `/how-we-help/` is still a stub (build-out is an open TODO); linking it is consistent with the nav, which already points there |
| Footer stays 5 columns mirroring the nav, not balanced into 6 (June 2026, per Bob) | Reviewed against Framer's footer (77 links, intentionally uneven columns, non-heading labels). Bob chose nav-consistency over column balance: footer columns stay Learning Center / How We Help (incl. all services) / Our Team / The Conference / Trust & Resources, matching the top-nav sections. No separate Services column. Renamed footer column "Company" → "Our Team" and link "Careers" → "Join the Team" to match the nav. Accessibility pass same change set: legal links wrapped in `<nav aria-label="Legal">` (display:contents keeps layout identical); every external/new-tab link now announces "(opens in new tab)" to screen readers (social + HubSpot badge via aria-label, IMPACT/map/TRUST Theme via visually-hidden span); column titles stay real `<h2>`s (more accessible than Framer's plain-text labels). TRUST Theme external link got `rel="noopener sponsored"` (separate commercial product). AI Policy stays in the legal bar |
| Press page at /press, labeled "Press & Media" (June 2026, per Bob) | Canonical quotable destination for journalists, podcast hosts, and AI agents: copy-ready boilerplate in three lengths (each carrying the canonical entity sentence — every journalist who lifts it publishes the exact co-occurrence the entity strategy needs), verified key facts, leadership bios + print-res headshots, naming/attribution rules, disambiguation, and a media contact CTA. URL is /press because that's what people and crawlers guess; /brand-guidelines stays separate (visual usage vs quotable facts). Linked from footer Company column, sitemap, and llms.txt |
| FAQ page retired; Core Concepts & Frameworks is the FAQ (June 2026, per Bob) | Executes the core-concepts-strategy decision: every question gets exactly one home. /faq is now a meta-refresh stub 301ing to /learn/core-concepts-frameworks (recorded in redirects-301.csv); FAQ links removed from footer, sitemap, and llms.txt. Entity FAQs (TODO) land in Core Concepts, not a standalone FAQ |
| Footer How We Help column mirrors the 4-col dropdown (June 2026) | Order now matches the nav: program (Coaching, Who We Work With, Audit, Request a Speaker), proof (Success Stories, Reviews, Our Guarantee), then services. Our Guarantee moved from the Trust & Resources column into How We Help so it isn't listed twice; Trust & Resources slims to Diagnostic, Talk to a Coach, When It's Not Working, Editorial Standards, Security, For AI Agents |
| How We Help panel spans the nav bar (June 2026, per Bob) | The mega panel's edges align to the visible logo (left) and the Let's Talk CTA (right), so it reads as part of the bar and responds with it: ~1360px under the 1400px grid, ~1118px at the 1200px floor. Anchored to `.nav__inner` via `position: static` on the parent li; inset = inner padding + the logo's 10px optical nudge; works in pill and docked modes. Panel type rides the same 1200–1400 fluid ramp as the nav trigger padding; proof/service columns carry measured px minimums so every name and sub stays on one line at the floor (verified in-browser at both extremes) |
| How We Help dropdown is 4 columns: program, Proof & Trust, services ×2 (June 2026, per Bob) | Who We Work With (new self-qualification page) and Reviews (moved from Our Team) needed homes; cramming them under the coaching card would have made col 1 twice the height of the service columns. Instead proof items (Success Stories, Reviews, Guarantee) form their own "Proof & Trust" column — buyers look for validation as a unit. `.nav__dropdown--3col` became `--4col` (1162px wide, grid 340/250/1fr/1fr, left -290px so the right edge lands where the old menu's did). Side effect: Our Team returns to its documented four items. Reviews URL moved /team/reviews → /how-we-help/reviews (301s recorded); the /reviews stub now points at the new home |
| Who We Work With page at /how-we-help/who-we-work-with (June 2026) | Prospects had no nav answer to "is this for me?" — fit lived buried on the coaching page. New page: fit checklist (reused from coaching page copy), $3M–$100M sweet spot with under-$3M alternatives (Academy, EC Live, Audit — from FAQ copy), industry grid, and an honest "when we're not the right fit" section linking When It's Not Working and Compare Your Options. Copy needs Bob's content pass (tracked in TODO.md) |
| Footer socials point at Endless Customers profiles, not @impactbnd (June 2026, per Bob) | The EC entity needs its own social footprint for SEO/AI entity resolution. Footer icons + the EC org `sameAs` in JSON-LD now use the EC-branded profiles (Facebook, LinkedIn `/company/endless-customers`, Instagram `@endlesscustomers`, YouTube `@EndlessCustomers`, Apple Podcasts, Spotify). The IMPACT connection stays — via the "Endless Customers is an IMPACT company" NAP line and an enriched `parentOrganization` node carrying IMPACT's own `sameAs` (@impactbnd profiles + Crunchbase) and a `brand` back-reference, closing the cross-domain @id loop per the entity strategy. TikTok icon dropped (no EC TikTok exists); replaced with Apple Podcasts. Reviews page keeps @impactbnd review links — that's where the reviews actually live |
| Guarantee page redesigned around "the promise is a document" (June 2026, per Bob) | H1 changed from the scope line ("Every call. Every training. Every deliverable.") to the promise itself ("Worth it, or you don't pay for it."). The guarantee renders as a signed certificate artifact — header strip, three numbered clauses, signature footer with Bob (Signed) and Katie Coelho (If you feel unheard) — replacing three redundant sections (promise prose, three step-cards, signed letter) that restated the same terms. The document is the page's one elevated surface; "Why we can" became a left-title/right-argument editorial column; the When It's Not Working crosslink shrank from a full section to one bordered handoff row |
| Profile is one template for all person types | Reduces maintenance; show/hide logic handles role differences; same URL pattern for coaches, providers, and staff |
| Guests live in the same People system (not a separate content type) | A guest is one Profile with a `guest` role, aggregating every episode, webinar, guest-authored article, testimonial, and success story they touch. Repeat guests are the same record; a guest who becomes a coach just gains a role. Clean in HubSpot: one Contacts/People collection filtered by the `role` property — no second person-database to reconcile |
| Success Stories live inside Coaching and Services dropdowns | They are proof of the work, not standalone content — buyers look for proof in the context of what they're considering buying |
| Pricing is contextual in dropdowns, not a top-level nav item | Pricing for coaching and services is different enough that a single "Pricing" page is confusing; contextual placement is cleaner |
| EC Live is a top-level nav item | The conference is a major brand moment and audience-building channel; it needs the visibility |
| Recent Insights = podcast episode + article as one record | The episode is the source; the article is the AEO-optimized output; they are the same piece of content, not two linked records |
| Evergreen content is nested by topic cluster | Mirrors how HubSpot topic clusters work and supports internal linking for SEO/AEO |
| Taxonomy (Topics) is the cross-cutting connective tissue | Every content type tags topics; this is what powers "Related Content" everywhere and keeps the site from feeling siloed |
| AI Diagnostic Tool is the #1 top-of-funnel offer | Featured in nav (The System dropdown), hero, and bottom of every service page; drives first-party data capture |
| `cms.js` handles all data fetching and rendering | Keeps templates clean and readable; mirrors server-side rendering concepts; makes HubSpot migration obvious |
| General Sans for all display/heading type | Consistent with brand direction; loaded via Fontshare CDN |
| Fluid headline tiers by length (June 2026) | H1s scale with viewport via `clamp()` AND with headline length via tier tokens in `main.css` (`--headline-short/medium/long`, plus `-split` variants for two-column service heroes). Base hero classes default to the medium token; add `.headline-short` or `.headline-long` on the `<h1>` by character count: short < 45 · medium 45–70 · long > 70. Centered tiers: 36→72px, 32→64px, 28→56px. Split tiers: 35→61px, 33→54px, 30→48px. Caps are set by hero container width (hero__inner 1000px, pg-hero 900px, others 720–880px), not viewport — bigger caps make long lines wrap and look broken. `h1 { text-wrap: balance; }` keeps multi-line wraps even. Dynamic content titles (articles, profiles, KB) keep their own smaller clamps — tiers are for page heroes only |
| Gradients are borders and lines only (June 2026) | The brand gradient (magenta → blue → green, as in the EC logo underline) is reserved for borders, outlines, dividers, underlines, and progress bars. Never used as text fills or button/element fills — gradient-filled type and buttons read as cheesy. `.gradient-text`, `.gradient-bg`, and `.badge--gradient` were removed from the system |
| One secondary button, matching the nav ghost (June 2026) | `.btn--gradient-outline` is gone — on dark surfaces its transparent fill let the gradient read as a full gradient button, and pages had drifted into four different secondary-button looks. The single secondary button is now `.btn--ghost`, styled to match the nav's "Free AI Diagnostic": transparent fill, 1px muted outline (drawn with an inset box-shadow so heights match filled buttons), text + outline darken to heading on hover. Forced-dark contexts (video hero, CTA band) get the same recipe in white; sizes still vary via `.btn--sm/--lg` |
| Font fallback is system UI stack | Performance safety net for offline/no-connection use |
| Floating pill nav | Modern, premium feel; differentiates from standard full-width navs; 64px tall, 16px float, 980px max-width, full border-radius. Labels in Title Case; menu left-aligned after the logo |
| "Learn" instead of "The System" | The System and Learn are the same — consuming EC content IS the system; one label is cleaner |
| "How We Help" instead of separate Coaching + Services | Buyer-language framing; three-column mega dropdown separates coaching (left) from Additional Services (split across the middle + right columns) |
| Coaching Program & Pricing is one nav entry | Links into a full multi-page coaching section; not broken into sub-nav items |
| Success Stories inside How We Help | They are proof of the work, not standalone content; buyers look for proof in the context of what they're considering |
| Our Team = four items | Our Story + Vision & Values + Meet the Team + Join the Team; the section shares a sub-nav bar, and Join covers all paths (coaches, providers, staff) |
| Conference dropdown is visual (real photo cycling) | Makes EC Live feel like an event worth attending, not just a list of links; uses 4 real event photos with a progress-bar indicator and the EC Live logo |
| Conference dates hardcoded in nav | Always Hartford / Chicago alternating; update nav.html when dates change |
| "Free AI Diagnostic" for ghost button copy | Three signals in three words: free, AI-powered, precise diagnostic output |
| AI Services badged "New" in services list | Not yet on current site; badge signals active roadmap without overpromising |
| Mock CMS engine shipped as `js/cms.js` + `css/learn.css` | The engine described in §8 is now built. `cms.js` fetches the JSON collections from `/data/`, resolves cross-references (people, topics, industries), renders markdown, injects SEO/OG/canonical + Article/FAQPage/Breadcrumb JSON-LD, and exposes shared card renderers. `learn.css` holds Learn-only component styles, kept out of `main.css` so the design system stays untouched |
| Detail pages use `?id=` query templates at their URL location | Instead of a separate `/templates/` folder, each dynamic detail page is a template living at its section path: `learn/recent-insight/article.html?id=`, `learn/webinar/webinar.html?id=`, `learn/knowledge-base/article.html?id=`, `learn/tool/offer.html?id=`. Matches the spec's own `profile.html?id=` example and maps cleanly to HubSpot dynamic pages later |
| KB architecture mirrors the 5 Components (June 2026) | The Knowledge Base IA was rebuilt from the emdash prototype Bob built separately: a persistent left sidebar with three zones — Start Here (What is EC + Thrive in the Age of AI), Curated Learning Paths (role-based reading lists), and The Principles & Frameworks (Foundation → the five "Right X" component sections → Planning → Putting It All Together → Support & Community). Framework canon (Big 5, Selling 7, Sticky 5, Scorecard, Pride Cycle…) nests *inside* the component sections rather than in a separate cluster. Industry hubs from the prototype were deferred (no industry-specific content exists yet) |
| KB sections are presentation metadata, not new content types | `kb-sections.json` + `kb-paths.json` in `/data/taxonomy/` drive the sidebar, topic pages, and path pages; articles stay in the one `evergreen.json` collection. Maps to HubSpot as two small HubDB tables (or serialized module fields) over the same Knowledge Base collection |
| Stub articles ship visible, marked "coming soon" | 15 migrated articles have placeholder bodies. They stay published so the IA is complete and URLs exist (sidebar shows them; topic pages mark them "Coming soon"; article template renders an editorial-calendar notice instead of an empty body). Content fills in without structural change |
| Visual density standard (June 2026, per Bob) | Pages should not be text-and-icon-only. Every major page needs real visual weight: (1) **Oversized video** — Bob loves big, oversized video embeds like the homepage and coaching-program heroes; key pages should reserve a spot for one (placeholder until the video exists, with a `TODO(video)` comment marking the slot). (2) **More graphics and images across all pages** — when building or revising any page, plan imagery (screenshots, product UI, photos, illustrations), not just copy blocks. (3) **Strategic icons** — keep using icons deliberately (tabler set + EC marks) the way the coaching pages do. (4) **Animated SVGs** — Bob loves them; favor lightweight animated SVG illustrations/diagrams (CSS/SMIL line-draw, looping accents) over static decoration where it aids comprehension. Applies to all future pages and retrofits |
| Motion standard — "What would Apple do?" (June 2026, per Bob) | Bob loves animation on sites; the reference bar is Apple. Rules: motion is purposeful (aids comprehension or rewards attention, never decoration for its own sake), fast (≤1.2s), physics-feeling easing (`cubic-bezier(.22,1,.36,1)` ease-out family, springy `(.34,1.56,.64,1)` only for small pop-ins), scroll-triggered animations play ONCE via IntersectionObserver, final values/states live in the markup (no-JS and SEO safe), and everything respects `prefers-reduced-motion`. Vocabulary so far: count-up stats with draw-in accent underline, staggered rise/pop-in reveals, stroke-dashoffset ring/line draws, hover fan-outs. Animation colors use the page accent, never the brand gradient (logo-only). Patterns start page-scoped; promote to main.css once a pattern recurs on a third page. First implementation: Academy proof strip, hero avatar cluster, library track covers |
| Navigation labels are Title Case, sitewide (June 2026, per Bob) | Applies to every piece of navigation chrome: main-nav labels (already the rule), subnav/anchor-pill links, program-band links, and the CTAs that live inside them ("See Pricing & Plans", "Get a Free Preview"). Section eyebrows stay sentence case in markup (CSS uppercases them for display); when a pill anchor mirrors an eyebrow, it uses the same words in Title Case. In-page buttons outside nav chrome follow their local section's conventions |
| H2 size tiers (June 2026, per Bob) | H2s scale by CONTEXT the way H1s scale by length. Tokens in `main.css`: `--h2-section` clamp(~27→32px), the default `.section__title` size, for H2s that share a row (two-column splits, sidebars, `section__header--left` contexts); `--h2-marquee` clamp(~34→44px) via `.section__title--lg`, for full-width centered section headers that own their moment. The dark CTA band title (`.cta-band__title`), Learn CTA band (`.lc-cta__title`), and similar full-width centered band titles use the marquee token directly instead of one-off sizes. Rule of thumb: centered `.section__header` → add `--lg`; anything left-aligned next to content → default. Applied sitewide June 2026 (179 headings, 37 files) |
| Gemini image placeholders — `TODO(gemini)` convention (June 2026, per Bob) | When strategizing or building a page, don't generate art inline — mark the slot with a `<!-- TODO(gemini): [what the image is + intent/prompt notes] -->` comment plus a presentable placeholder treatment (CSS placeholder, gradient fallback, or stock screenshot). Generation happens later in dedicated passes via the Gemini image skill. Prerequisite: build Gemini "page graphics" style skills (course covers, section illustrations, device-frame screenshots) so all generated art shares consistent templates — not yet built, tracked in TODO.md |
| Visual style LOCKED — "Apple-calm + one Framer moment" (June 7 2026, per Bob) | Full guide in `visual-style-guide.md` (canon boards in `assets/images/style-explorations/`). The system: (1) **Code first, Gemini second** — charts, graphs, funnels, UI fragments, glass chips, dark panels are built in HTML/CSS/SVG (animatable per the motion standard); Gemini generates only photography + rare composites. (2) **Photo treatment** — rounded corners + soft shadow, **NO borders** (Bob rejected hairlines); optional faint accent light spill and frosted-glass chips on heroes only. Generated photos come edge-to-edge; CSS applies all treatment. (3) **No drawn-character illustration system** — the element kit + treated candid photography IS the illustration layer; no decorative arcs/semicircles/blobs ever (Bob rejected). (4) **Dark statement panel** — max one per page: near-black `#0A0F1F` rounded panel, restrained blue→magenta aurora behind floating content only (≥80% stays dark; the neon-ring reference was rejected). The only place blue+magenta appears as a glow; the gradient otherwise stays borders/lines. (5) Element kits run in the page accent via `--media-accent`. CSS components shipped in `main.css`: `.media-card(--xl/--spill)`, `.glass-chip`, `.statement-panel`, `.media-placeholder`; live samples on `styles.html` |
| Learn section nests under `/learn`; detail parents are singular | All Learn content shares one URL root (`/learn`) so a single "Learn" breadcrumb crumb (linking to the `/learn` hub) leads every page in the section. Listings are plural (`/learn/webinars`); individual items use a singular parent (`/learn/webinar/[slug]`) so item URLs read naturally. Knowledge Base keeps its topic-cluster nesting (`/learn/knowledge-base/[topic]/[slug]`). Downloads & Tools is `/learn/tools` (items at `/learn/tool/[slug]`). The previously root-level pages (book, academy, podcast, the methodology page) moved into `/learn` too |
| Homepage rebuilt around "Win More Customers" (June 2026, per Bob) | The original `index.html` (oldest page on the site, pre-design-system) was rebuilt from scratch on the current system. H1 "Win More Customers" (matches impactplus.com). Social-proof-led across seven modes: logo wall, marquee client quote, count-up stat strip, three featured success stories, a testimonial wall, and a credentials strip. Drives to every key section (Learn, Coaching, Services, Conference, Diagnostic, Book, Academy) incl. a "Three Ways to Start" module. Answers first-visit questions via an FAQ mapped to existing pages (FAQPage JSON-LD). AI-forward throughline (per Bob): hero subhead + each System step + a dedicated "Thrive in an AI-First World" statement panel (the one dark Framer moment) + AI Services + FAQ. CTAs: Let's Talk primary, Free AI Diagnostic secondary (diagnostic also surfaces in hero, the paths note, and the close). Trust number standardized to 500+. Mixed content feed rendered via cms.js (2 latest insights + next webinar + a featured offer). Added WebSite + FAQPage JSON-LD; title/meta reframed to the positioning. Motion is page-scoped (reveal + count-up, the Academy pattern); brand gradient stays logo-only. Full copy map + open items in `homepage-strategy.md`. Retired the old "Your Website Should Be Your Best Salesperson" hero. |

---

## 10. Build Status — Learn Section (June 2026)

The Learn / Learning Center section is being built on the `cms.js` engine. Pages reuse the inlined global nav (depth-relative asset prefixes), load `main.css` + `learn.css` + `cms.js`, and render from `/data` at runtime.

**Built & verified:**
- `js/cms.js` — the rendering engine. `css/learn.css` — Learn component styles.
- `/learn/` — hub (section cards + latest insights).
- `/learn/recent-insights/` — Recent Insights listing (topic filter, featured latest) + `/learn/recent-insight/article.html?id=` detail (video/Spotify, AEO body, FAQ accordion, guest "Connect with" blocks, E-E-A-T strip, related).
- `/learn/webinars/` — listing + `/learn/webinar/webinar.html?id=` detail (status-aware register/watch form, speakers/hosts, testimonials).
  - **Redesigned June 2026 (per Bob):** the old dark `.wbb` billboard + "Also coming up" orphan-card treatment is gone. The page is now one uniform image-led library. **Upcoming** is its own `.wb-grid` row of cards (every scheduled session shown, coach-forward, "Save your seat" state); a get-notified block (`hs-form-webinar-notify`) fills the leftover cells of that row via JS (`span = cols − (n mod cols)`, full row when even) so 1/2/3/4+ upcoming never orphan and the always-on capture stays high. **On-demand** is the same card in a batched grid (12 per batch) with topic filters (`aria-pressed` + `aria-live` count) and infinite scroll done right (all cards in the DOM for crawlers, `IntersectionObserver` auto-load, a real "Load more" button for keyboard/no-JS, focus + announce on append, reduced-motion). `EC.webinarCard` was rebuilt: no description paragraph, status badge on the thumbnail, single topic tag, coach headshot avatar + name, date/CTA for upcoming vs coach + duration for on-demand (also flows to topic.html + profile.html). Listing carries `CollectionPage` + `ItemList` + per-upcoming `Event` (online-event shape) JSON-LD and a self-canonical. Card-image population (`featured_image_url` from the existing production thumbnails, re-hosted) is the remaining content task. Plan: `webinars-redesign-plan.md`.
- `/learn/knowledge-base/` — **rebuilt June 2026 on the migrated content.** Hub (hero + guide count, featured guides with "The Anchor · read first" card, learning path cards, numbered browse-by-topic grid, recently-updated list), `topic.html?id=` section pillar (curator/reviewer strip, guide count + total read time, article rows with child chips, "Up next" section nav), `article.html?id=` article (sidebar, section eyebrow, dek, meta strip, "What you'll learn" takeaways, "On this page" TOC, "In this guide" children, coming-soon notice for stubs, E-E-A-T strip, prev/next across the whole KB reading order, FAQ, related insights), and `path.html?id=` learning path (numbered reading list with totals). All four pages share the sticky KB sidebar (`EC.kbSidebar`): Start Here / Curated Learning Paths / The Principles & Frameworks zones, collapsible section groups, nested children, active-state highlighting, collapses to a toggle under 1000px. KB engine helpers live in `cms.js` (`kbLoad`, `kbFlatten`, `kbSidebar`, `kbShell`, `kbTakeaways`, `kbIsStub`…); styles in `learn.css` under the `kb-/kbs-/kba-/kbt-/kbp-/kbh-` prefixes. `EC.markdown` gained h3/ol/blockquote support for the migrated bodies.
- `/learn/tools/` — Downloads & Tools listing (type filter) + `/learn/tool/offer.html?id=` gated landing (mock form → reveal/download).

Forms are mock (no submit); each carries its real HubSpot `form_id` for migration. Local `/assets` images that aren't populated yet fall back to gradient placeholders.

**Also built:**
- `/learn/what-is-endless-customers` — "What Is Endless Customers?" methodology page (problem, Four Pillars, Big 5 + Selling 7, 5 Components, implementation steps, fit). Static.
- `/learn/book` — book landing (preview, order, bulk; Marcus Sheridan author block; what's inside). Static.
- `/learn/academy` — self-paced overview + membership plans (illustrative pricing). Static.
- `/learn/podcast` — podcast hub: a filtered, show-framed view of the same Insights records (featured latest video embed + full episode grid + topic filter). Data-driven.

The Learn / Learning Center section is now functionally complete on the engine. Remaining Learn stub intentionally unbuilt: `/learn/book/bulk-order`. (`/learn/book/preview` was built June 2026 alongside the Book page rebuild — static free-preview offer landing page with a mock HubSpot form.)

**URL restructure (June 2026):** The whole section was migrated from the old `/learning-center/*` + root-level paths to a single `/learn` root. Folder moves: `learning-center` → `learn`; `insights` split into `recent-insights/` (listing) + `recent-insight/` (detail); `webinars/webinar.html` → `webinar/`; `resources` → `tools/` (listing) + `tool/` (detail); root `how-it-works`/`book`/`podcast`/`academy` moved under `learn/`. All site-wide links (nav master, footer, in-page, and the four URL builders in `cms.js`) were updated.

**Crumb-eyebrow migration (June 2026, per Bob):** The persistent Learn subnav bar (crumb + nine section links + Topics + search) was removed from all ten pages that carried it. Learn now uses the service-page hero crumb system (`.svc-crumb`, main.css): quiet "Learning Center ›" trail + accent current-page chip with a tabler icon, centered above the H1. This is the sitewide standard going forward — a submenu appears only as the scroll-triggered `.subnav--svc` anchor pill on pages that need in-page anchors (the Book page got one: Get the Book / Praise / What's Inside / FAQ + "Get a Free Preview" CTA, with `data-subnav-hero` on its hero section). Listing pages whose H1 was the page name got marketing headlines instead (Latest: "New ideas, twice a week." · Webinars: "Learn it live." · Tools: "Put the system to work."), since the crumb chip now carries the page name. Search + Topics triggers moved to a quiet `.lc-hero-tools` pill row under the hero copy on the five library pages (Latest, Webinars, Tools, Topics hub, topic pages); narrative pages rely on the nav dropdown's search item. Topic pages fill the crumb dynamically (`th-crumb-trail` / `th-crumb-label`, parent topic spliced into the trail). Dead subnav-bar CSS (squeeze band, `body:has(.subnav) .lc-wrap` offset) was deleted from learn.css; learn-nav.js untouched (its triggers are delegated, search-pinning no-ops without the bar).

**Hero consistency pass (June 2026, per Bob):** Every Learn hero now uses the real service-page hero system — `.svc-hero` markup (bg wash + centered inner stack + `.svc-hero__headline` display scale) with a `.svc-hero--learn` modifier in learn.css that drops the viewport-fill (`min-height:0`, fixed padding) so library content stays near the fold; the sibling `.lc-wrap` zeroes its top padding since the hero carries the nav offset. Converted: hub (`/learn`, search box is the hero, crumb is a trail-less accent chip since it's the section root), Latest, Webinars, Tools, Topics hub (new H1 "Browse by topic."), topic.html (H1 is the dynamic `svc-hero__headline`), Start Here, Podcast, Academy (sys-hero → svc-hero, CTAs now `.svc-hero__actions`), and the Playbook — its JS-built hero became static page markup above the KB shell, with JS filling `#pb-start` (anchor lesson link) and `#pb-stats` (lesson/part counts). The Book keeps its two-column `bk-hero` but `.bk-title` was rescaled to the svc "long" headline tier. `sync-nav.py` was run in the same pass — every inlined nav now matches components/nav.html (root-level pages differ only by `./` asset depth, which is correct). learn.css cache-busted to `v=20260606r2` sitewide.

**Learn nav consistency pass (June 2026, per Bob):** Every page under `/learn` now uses the same docked main nav as Latest Insights — `<nav class="nav nav--docked">`, no `data-theme="dark"` (the docked bar follows the page theme). This includes the detail templates (recent-insight/article, webinar/webinar, tool/offer) which previously used the dark floating-pill variant, the new core-concepts-frameworks pages, and the formerly loader-only pages (learn hub, topics hub, topic.html, subscribe) which now carry inlined nav+footer fallbacks like every other page. sync-nav.py + sync-footer.py keep them stamped.

**Coaching masthead band (June 2026, per Bob):** The coaching section was the last holdout on the old crumb-left/links-right subnav bar; it now runs the new `.subnav--band` masthead pattern (see §3 → Section Sub-navigation Patterns). The band is full-width (not a pill — per Bob, shape now encodes role: pill = global nav, band = program chrome, small pill = in-page tool) and carries the EC Coaching wordmark left (`ec-coaching-logo.png` / `-white.png`, 28px, links to the overview) + the four page links + Schedule a Call. All five pages (overview, how-it-works, whats-covered, pricing, guarantee) gained the standard `.svc-crumb` hero breadcrumb and dropped the redundant 30px hero logo (the band carries the brand now); guarantee keeps the program shell with no active link and got its true hierarchy back (How We Help › Our Guarantee, `ti-shield-check`). Chip/H1 dupes resolved with marketing headlines per the Learn convention: how-it-works H1 → "A clear path from kickoff to self-sufficiency.", whats-covered → "The complete curriculum, from content to culture.", guarantee → "Every call. Every training. Every deliverable." (the old lead line, promoted). Pricing's anchor strip became a sticky glass pill docking under the band (`body:has(.subnav--band.is-raised)` swaps its top offset; pp section scroll-margins re-budgeted). Reuses ALL existing #subnav JS untouched (raise-on-scroll, CTA demote, mobile bottom-bar clone). main.css cache-busted to `v=20260606r9` on the five pages.

### Our Team — Profile system (built)

The shared Profile template is live and runs on the same engine. One template serves every person type (coaches, providers, staff, guests, authors), with conditional sections rendered only when data exists.

- `/team/` — Meet the Team directory: filterable by role (Everyone / Coaches / Service Providers / Team), reads `people.json`, excludes guest-only client records, featured first.
- `/team/profile.html?id=` — the Profile template. Hero (photo, role badges, title + company link, location, stats, social, booking CTA), featured quote, bio (markdown) + bio/reel video, specialties + credentials, then **aggregated** sections built by cross-referencing every collection: Podcast & articles (insights where host/author/contributor), Webinars (speaker/host/guest), Knowledge base articles (author/editor), Downloads (author), "In their words" testimonials (success-story + webinar testimonials by this person), and Success stories (coach/provider). Person + Breadcrumb JSON-LD.

`cms.js` gained `where(arr, fields, id)` (the Associations lookup), `personCard`, `personImg`, `profileUrl`, `primaryRole`, and a role-label map. Author and guest names across the Insights, Webinar, and Knowledge Base templates now link to their profiles — closing the E-E-A-T loop so every person aggregates all the content they touched.
