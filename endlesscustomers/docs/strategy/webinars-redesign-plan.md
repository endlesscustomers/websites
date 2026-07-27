# Webinars — Cleanup & Optimization Plan

**Page:** `/learn/webinars` (`learn/webinars/index.html`)
**Date:** June 2026, per Bob
**Status:** Plan only — nothing built yet. Approve direction, then we implement.

---

## The goal (why this page exists)

Webinars are a **middle-funnel** play. The page has two jobs, and the design should make both obvious in the first screen:

1. **Fill the next seat** — get the right people registered for the upcoming live session.
2. **Turn the archive into an always-on library** — let buyers browse past sessions, meet our coaches, and build a relationship over time. This is the part that compounds: it's where someone who isn't ready to talk to sales spends 40 minutes with a coach and starts to trust us.

So the redesign optimizes for *relationship*, not just registration. Every session should feel like a chance to spend time with a real person on our team.

**Design north star (what Apple would do):** Apple's Newsroom is image-led, borderless, and calm — one clear feature at the top, then a quiet, evenly-spaced grid. Separation comes from whitespace and imagery, never from boxes and rules. We already ban container borders, so this is a natural fit. We bring that restraint here and let the thumbnails and coaches' faces do the work.

---

## What's clunky today (the audit)

Pulled from the live prototype, `cms.js`, and `learn.css`:

1. **The next-event billboard has an empty media box.** Upcoming webinars have no `featured_image_url`, so the right 2/5 of the dark billboard renders as a blank translucent rectangle. It reads as broken.
2. **"Also coming up" is an orphan card.** With two upcoming sessions, the second renders as a single lonely card in a 3–4 column grid, with a wide band of dead space beside it.
3. **The on-demand grid orphans its last row.** 13 recordings in an `auto-fill` grid leave a single card stranded on the final row (4 + 4 + 4 + 1). It will keep happening as the count grows.
4. **The page can't be image-led, because most cards have no image.** Only a few on-demand items carry a thumbnail; the rest fall back to the gradient placeholder. The result is text-heavy and generic — the opposite of the Apple look.
5. **No volume control.** Every recording loads at once. The archive only gets bigger and older; this gets slower and more sprawling every month.
6. **SEO/AEO is left on the table.** The listing carries no `Event`, `ItemList`, or `VideoObject` structured data and no canonical tag. (Detail pages have only a minimal `Event`/`VideoObject`.) Search and AI engines can't see this as a structured collection of online events and videos.
7. **Card descriptions are far too long.** Every card prints the full webinar abstract, so tiles are unequal heights and the grid reads as a wall of text — the opposite of the calm, image-led look.
8. **Accessibility gaps.** Topic filters signal state with color only (no `aria-pressed`); there's no live region announcing results when you filter; the dark billboard runs body text at 75–80% opacity, which is borderline for contrast.

The irony: the v2 prototype is already *more* sophisticated than the current production page (`impactplus.com/webinars`), which is a flat uniform grid that just stops. We're not rebuilding from scratch — we're fixing the rough edges and pushing it to "best-in-class."

---

## The redesigned page (fresh eyes, June 2026)

**Core principle: a compact "upcoming + notify" zone high on the page, then the archive as one calm three-column library.** With only ever one or two upcoming sessions, a big feature billboard is the wrong tool — it makes a single webinar look like a campaign and strands the next one as an orphan card. Upcoming gets a small, high, purpose-built band (register + get-notified together); the on-demand archive is the body of the page.

**Design-system fidelity (the corrections):** no pills used as pre-headers. Eyebrows are the uppercase, letter-spaced text of `.section__eyebrow`. The hero breadcrumb is the real `.svc-crumb` (muted "Learning Center ›" trail + accent-colored current label), not a chip. Card status ("On demand," "Upcoming," "● Live now") is the `.ec-card__ep` badge sitting on the thumbnail, not a kicker above the title. Pills stay where the system already uses them: interactive controls (search / topics / filter buttons) and `.ec-tag` content tags.

### 1. Hero — keep, compact
Keep the `svc-hero--learn` treatment and "**Learn it live.**" (the locked sitewide hero pattern), the real `.svc-crumb` breadcrumb, and the Search / Browse-topics trigger pills. Tighten the sub so it frames the promise: go live *with the coaches*, archive open any time.

### 2. Upcoming — its own row of cards, high on the page
Directly under the hero, an `UPCOMING` text eyebrow and **a three-column row of full cards — one card per upcoming session, all shown, none hidden or demoted.** Same card as the library, in the "register" state: a date chip + `Upcoming` badge on the thumbnail, the date/time line, title, coach, and `Save your seat`. (A thin brand-gradient top line is the one accent that marks these apart.)

The get-notified alert is part of this row and **flexes to fill whatever space is left**, so the row always looks deliberate and the alert always stays high:

| Upcoming sessions | Top row |
|---|---|
| 3 | three session cards; get-notified is a slim full-width line beneath the row |
| 2 | two session cards + a get-notified card filling the third cell |
| 1 | one session card + a get-notified card spanning the remaining two cells |
| 0 | the row collapses to a single full-width get-notified band; page leads into the library |
| 4+ (rare) | sessions wrap to a second row; get-notified fills the trailing empty cells, or drops to the slim line if the last row is full |

So "where are the other ones?" is answered directly: every upcoming webinar is a card in this row. The eyebrow is text (`.section__eyebrow`), not a pill; the status sits on the thumbnail as the `.ec-card__ep` badge.

### 3. On-demand library — one uniform three-column grid
The body of the page and the long-term asset. `.lc-rowhead` heading ("On-demand library") + a muted count, then the grid.

- **Uniform 3-up grid** (2-up tablet, 1-up mobile), built on the existing `.ec-card`: thumbnail with the `.ec-card__ep` "On demand" badge and a hover play affordance, one `.ec-tag` topic tag, title, and a single coach + duration meta line.
- **Quiet topic filter** above the grid (the existing `.ec-filter` chips) with real accessibility: `aria-pressed` on the active chip and an `aria-live` count. Filtering resets to the first batch.
- **Batches of 12**, infinite scroll done right (see below). Twelve keeps rows full at 2, 3, 4, or 6 columns.

### 4. Short cards (the big copy fix)
**Drop the description paragraph entirely.** A card is: thumbnail (+ status badge) → topic tag → title → coach (avatar + name) · duration. The titles are already descriptive, and this is how Apple Newsroom cards read. Every tile becomes the same height and the grid goes calm. If a hook is ever truly needed it's a single line clamped to two lines max — never the full abstract.

### 5. Coaches stay in front (the middle-funnel play)
A small coach avatar + name on every card and in the upcoming band, linked to the profile. The relationship hook lives in the faces and the "Save your seat," not in a giant hero. (Recurring hosts like Stephanie naturally repeat across the grid, which reinforces the familiarity.)

### 6. Closing CTA — keep
Keep the existing `.lc-cta` "Prefer a plan built for you?" diagnostic band as the bottom-of-page step.

---

## Pagination: infinite scroll, done right

You chose **infinite scroll**, and you also said SEO, AEO, and accessibility all matter. Plain infinite scroll usually hurts all three (crawlers don't scroll, keyboard/screen-reader users get stuck, deep links break). So we build it as **progressive enhancement** — same smooth feel, none of the downsides:

- **Auto-load on scroll** via `IntersectionObserver`: as you approach the bottom, the next batch of 12 fades in.
- **A real "Load more recordings" button** is always present — it's the control for keyboard and screen-reader users, and the fallback if JS is off. (Infinite scroll that *only* responds to scrolling fails accessibility.)
- **Crawlable archive underneath:** the markup includes real `?page=2`, `?page=3`… links so search engines and AI crawlers can reach every recording. In HubSpot these become native paginated listing URLs (`/learn/webinars/page/2`), so this maps cleanly at migration.
- **Focus + announce on append:** when a new batch loads, move focus to the first new card and announce "12 more recordings loaded" in a live region.
- **Respect `prefers-reduced-motion`:** no fade, just appear.

Net: it *feels* like infinite scroll, but it's crawlable, keyboard-friendly, and deep-linkable. This is the "what would Apple do" version of the request rather than the literal one — flagging that per our design-change protocol.

---

## Imagery — the unlock for the whole look

The Apple look is impossible without images, and **the good news is they already exist** — every webinar on `impactplus.com/webinars` has a thumbnail. Plan:

- **Source the existing thumbnails** for all 15 webinars (2 upcoming + 13 on-demand) and **re-host them on a clean domain** (Cloudinary, which we already use) so we're not hot-linking HubSpot `hubfs`. Populate `featured_image_url` for every record.
- For the two upcoming sessions that don't have a polished thumbnail yet, generate an on-brand title card (title + speaker headshot on the EC gradient) so no tile is bare.
- Set each record's `seo.og_image_url` to the same image so social/link unfurls and AI cards look intentional.
- **Speaker headshots** already exist in `people.json` for the core coaches — wire them into every card, linked to the coach's profile (closes the existing E-E-A-T loop).

---

## SEO / AEO

The page should read to Google and to AI engines as *a structured collection of online events and on-demand videos.*

- **`CollectionPage` + `ItemList` JSON-LD** on the listing — enumerate every webinar (position, name, URL). Helps engines understand the hub and can power list/carousel results.
- **`Event` schema for each upcoming session** with the full online-event shape: `eventAttendanceMode: OnlineEventAttendanceMode`, `location: VirtualLocation` (+ URL), `organizer` (Endless Customers / IMPACT), `performer` (the coach), `startDate`, `endDate` (computed from `duration_minutes`), `image`, `eventStatus`, and a free `offers`. Eligible for event rich results.
- **Upgrade the detail-page `VideoObject`** for on-demand recordings: `name`, `description`, `thumbnailUrl`, `uploadDate`, ISO-8601 `duration` (e.g. `PT60M`), `embedUrl`/`contentUrl`, and a transcript when available. This is the big AEO lever — it makes the recordings answer-engine-citable and video-rich-result eligible.
- **Canonical tags:** self-canonical on `/learn/webinars`; paginated pages self-canonical; topic-filtered views canonicalize to the base page (or to the matching `/learn/topics/...` page) to avoid thin duplicates.
- **A short intro paragraph + a compact FAQ** at the foot of the page ("Are the webinars free? Do I get the recording? Who runs them?"). Adds genuine indexable text to a card-heavy page and feeds AEO long-tail with `FAQPage` schema (helper already exists in `cms.js`).
- **Internal linking:** topic tags → topic pages; speakers → coach profiles; "related insights" off each detail page. Breadcrumb JSON-LD on the listing.
- **Sitemap + entity sweep:** ensure the listing and every detail URL are in the sitemap; reflect any naming in `llms.txt` / `/for-ai-agents` per the entity strategy.

---

## Accessibility checklist

- Topic filter chips: `aria-pressed` reflects active state; fully keyboard-operable; visible focus ring.
- Results count + empty state live in an `aria-live="polite"` region so filtering and "load more" are announced.
- Infinite scroll has the visible **Load more** button (not scroll-only); focus moves to the first new card on append.
- Status/duration/live badges never rely on color alone — they carry text ("On air now," "60 min") and an icon.
- Contrast: the new Feature uses solid design-system tokens (not 75% opacity over dark); verify every text/background pair against WCAG AA.
- Thumbnails: `loading="lazy"`, explicit `width`/`height` to prevent layout shift; decorative `alt=""` is fine since the adjacent title names the link.
- Logical heading order: one H1 (hero), H2 per section, H3 per card.
- Run the page through `design-qa.md` after build.

---

## Content & data tasks (prereqs)

- Populate `featured_image_url` (+ `seo.og_image_url`) for all 15 webinars; re-host on Cloudinary.
- Generate title cards for the 2 upcoming sessions.
- Confirm every referenced `speaker_id` / `host_id` resolves to a `headshot_url` in `people.json` (guests Alexander Ronzino, Binayak Kanungo, Will Smith currently have none — fine for now, but coaches must).
- Verify `duration_minutes` on every record (used for the badge and `endDate`); all present today.
- Bump `DATA_VERSION` in `cms.js` (data changes) and cache-bust `learn.css`.

---

## Build steps (HubSpot-aware)

1. **CSS:** add a `.wb-feature`, `.wb-upcoming` (list rows), and refined on-demand grid + pager module to `learn.css`. Keep all design tokens; no borders; gradient for accent lines only.
2. **Render logic:** rework the inline `<script>` in `learn/webinars/index.html` — Feature (next/live), coming-up list, batched on-demand with `IntersectionObserver` + Load-more + crawlable `?page=N` links + focus/announce.
3. **Structured data:** add a small `EC.collectionLD` / `EC.eventLD` helper to `cms.js`; inject `CollectionPage`/`ItemList`/`Event` on the listing and upgrade `VideoObject` on the detail template.
4. **Imagery + data:** load the Cloudinary thumbnails into `webinars.json`; wire speaker headshots.
5. **A11y + SEO finish:** `aria-pressed`, live region, canonical, intro copy + FAQ schema.
6. **QA:** run `design-qa.md`, check contrast, test keyboard + screen-reader, validate JSON-LD in Google's Rich Results Test, preview at 320 / 768 / 1280.
7. **Migration parity:** the listing maps to a HubDB-backed listing; detail pages to dynamic pages; our `?page=N` to HubSpot's native pagination — keep the structure obvious for the eventual port.

---

## Decisions I need from you

1. **Cards with no description** (title + coach + duration only), or a one-line clamp? I recommend no description.
2. **The upcoming band** — does the compact "next live + get notified" band feel right high on the page, or do you want the get-notified split into its own quieter spot?
3. **"Get notified" capture** — use the existing subscribe form ID, or a dedicated webinar-notify form in HubSpot?
4. **Image hosting** — Cloudinary (recommended, clean domain, transforms) vs. dropping files in `/assets/images/webinars/`?
5. **Scope of the first build** — full page in one pass, or land the visual redesign first (band + grid + images) and add the structured-data/SEO layer in a fast follow?
