# Endless Customers Live — Section Strategy

**Goal:** More attendees, more sponsors, stronger search and AI visibility, and a section that feels like the event: high energy, high trust, impossible to ignore.

**Scope:** Everything under `/live/` plus the nav dropdown and supporting signals (llms.txt, schema, internal links).

**Status of this doc:** Implemented June 6, 2026, then revised same day after review with Bob. Revisions: speakers moved from a standalone `/live/speakers/` page onto each event page (cards link to team profiles; `/live/speakers` 301s to Hartford's #speakers), a past-events archive pattern was added starting with `/live/chicago-2026/` (who spoke, highlights, photos, free recordings — every event page converts to a recap after the event), and the hub was slimmed twice, landing on a pure router: hero → upcoming dates → explore cards (What It's Like / Past Events / Sponsor / Convince Your Boss); the section FAQ and its schema moved to /live/experience/. A /live/past/ listing now covers every event since 2018 (IMPACT Live 2018–2025 linking to recordings in the IMPACT+ community at community.impactplus.com, EC Live 2026 linking to the on-site recap), with EventSeries schema documenting the IMPACT Live → Endless Customers Live rename. Past-event facts were verified via web research June 6, 2026 (Wayback Machine unavailable in this environment): EC Live 2026 Chicago was Mar 30 – Apr 1, 2026 at the Loews Chicago O'Hare in Rosemont; IMPACT Live ran twice yearly in 2024–2025 (spring Chicago, fall Hartford); 2018 and 2019 were at Hartford/CT Convention Center with keynotes incl. Ann Handley, David Meerman Scott, and Dharmesh Shah in 2018. The Chicago 2026 recap was then rebuilt from the production event page (endlesscustomers.com/live/chicago/2026): full session-by-session agenda with real speakers (Sheridan, Ruffolo, Baiocchi, Casey, Palmeri, Brown, Schreck, Desai, plus guests Kyle Jepson, Keven Ellison, Chris Brisson), all 12 real sponsors with production logo URLs, the Neon Party, real ticket tiers ($599/$999/$1,299), and past-event FAQ — with matching Event/performer/sponsor/FAQPage schema. Everything else from the original implementation stands: Event/FAQ/Video schema, countdown bars, email capture (HubSpot wiring TODO), `/live/experience/`, sponsor page upgrades, llms.txt + for-ai-agents. Still pending: video testimonials and highlight reel, workshop topics and session-to-speaker assignments, sponsor testimonials and ROI data, HubSpot form/meeting-link IDs.

---

## 1. Where We Stand (Audit Summary)

The section is in good shape structurally. What exists today:

| Page | Status | Notes |
|---|---|---|
| `/live/` (hub) | Complete | Dates, What to Expect, testimonials, recordings teaser, sponsor/boss CTAs |
| `/live/hartford-2026/` | Complete | Full agenda, pricing, venue, 17 FAQs, results logos |
| `/live/chicago-2027/` | Partial | Early-bird pricing, agenda preview, venue TBD |
| `/live/sponsor/` | Complete | 3 tiers ($4,000 / $7,500 / $15,000), audience stats, prospectus |
| `/live/convince-your-boss/` | Complete | Business case, cost table, copy-paste email |
| `/live/archive/` | Thin | Teaser + 3 sample sessions, Academy upsell |

The biggest gaps, in order of impact:

1. **No people.** No speaker or coach directory anywhere. Marcus appears once in a quote. Workshop topics say "Coming Soon" with no names attached. People buy events because of who's in the room.
2. **No Event schema.** Pages have breadcrumb JSON-LD only. Google doesn't know these pages describe events, so we get no event rich results, no date/price snippets, weaker AI citation.
3. **One conversion path.** The only action is "register." No email capture anywhere in the section, so a visitor who isn't ready today is gone forever.
4. **No urgency mechanics.** Chicago early-bird expires Dec 31, 2026 and the Hartford room block closes Sep 4, 2026, but nothing on the pages counts down or escalates.
5. **The dropdown buries the front door.** The EC Live logo is the only path to the hub and logos don't read as links (the problem that started this conversation).
6. **Recordings page is a dead end.** 3 unclickable video cards, no descriptions, no transcripts, no email capture.
7. **Sponsor page sells features, not outcomes.** Tiers are clear but there are no sponsor testimonials, no ROI proof, no comparison chart.
8. **llms.txt gives AI one line.** "The annual conference." An AI assistant asked "should I attend Endless Customers Live?" has almost nothing to work with.

---

## 2. The Strategy in One Paragraph

Treat `/live/` as a true hub with two funnels running through it: an **attendee funnel** (excite → prove → de-risk → register, with email capture at every off-ramp) and a **sponsor funnel** (audience → outcomes → tiers → prospectus call). Every sub-page exists to serve one of those funnels. Search and AI optimization isn't a separate workstream; it falls out of doing the content right: named people, real answers, structured data, and one canonical page per question.

---

## 3. Information Architecture

### 3.1 Final page map

```
/live/                      HUB — the front door, links to everything below
├── /live/hartford-2026/    Event page (conversion machine #1)
├── /live/chicago-2027/     Event page (conversion machine #2)
├── /live/experience/       NEW — "What to Expect" + recordings merged (see 3.2)
├── /live/speakers/         NEW — coaches & speakers directory (see 4.2)
├── /live/sponsor/          Sponsor funnel
└── /live/convince-your-boss/  Approval utility
```

### 3.2 Merge What to Expect + Recordings → `/live/experience/`

Per Bob's instinct: these are one story. "What to expect" is the claim; recordings are the proof. The merged page:

1. **Hero:** "What Endless Customers Live Feels Like" + the 2-minute teaser video up top.
2. **The format:** the four existing feature cards (Main-Stage Training, Hands-On Workshops, AI Grounded in Fundamentals, Real Connection) each paired with a sample clip or photo from a real session.
3. **Sample sessions:** expand from 3 to 6–8, make them actually playable, add a 2–3 sentence "what you'll learn" description and a transcript link for each (transcripts are SEO/AI gold — see §6).
4. **The vibe:** photo strip, casino night, networking party. This is the page that should pop hardest.
5. **Attendee voices:** move video testimonials here when we have them (text testimonials until then).
6. **Dual exit:** "Register for Hartford" (primary) + "Get the full library in Academy" (secondary) + email capture ("Get notified when new recordings drop").

`/live/archive/` 301-redirects to `/live/experience/`. The hub keeps a short What to Expect *section* that links through, so the hub stays scannable.

### 3.3 The hub page's job

The hub answers "what is this and where do I go" in under 10 seconds, then routes:

- Hero (keep current, it's strong) with two CTAs: "See Upcoming Dates" + "What It's Like" (→ experience page)
- Upcoming dates cards (keep)
- Condensed What to Expect → links to `/live/experience/`
- **NEW: Speakers strip** — faces and names, links to `/live/speakers/`
- Testimonials (keep)
- Sponsor / Convince Your Boss band (keep)
- **NEW: FAQ block** (top 5–6 questions, with FAQPage schema) — answers "is this for me, what does it cost, when is it" right on the hub for both humans and AI

Rule going forward: every page in the section links back to the hub, and the hub links to every page. No orphans, no dead ends.

### 3.4 Nav dropdown redesign

Keep the photo carousel and dark mode. Changes:

1. The logo stays as branding (white version still needed per site-spec) but stops being the only path to the hub.
2. Directly under the logo, add the primary link: **"Explore the Conference →"** to `/live/`. This is the front door, stated in words.
3. Dates + register buttons stay exactly as they are.
4. Secondary links become: **What It's Like** (→ `/live/experience/`), **Speakers** (→ `/live/speakers/`), **Become a Sponsor**, **Convince Your Boss**. Recordings disappears as a separate item because it now lives inside the experience page.
5. Optional energy detail: a small "Early bird ends Dec 31" badge on the Chicago row.

The dropdown carries highlights and conversion paths; the hub carries completeness. They don't duplicate each other.

---

## 4. Attendee Funnel: Getting More Registrations

### 4.1 Urgency and momentum (highest leverage, lowest effort)

- **Countdown to the next deadline** on hub and event pages: Hartford room block (Sep 4, 2026), Chicago early bird (Dec 31, 2026), then days-until-event. Always count toward the *nearest* real deadline, never a fake one.
- **Ticket-tier escalation on Hartford:** if pricing steps up as the event approaches, show the next price and date ("$1,299 until Aug 1, then $1,499"). If it doesn't, consider making it so — published price ladders are one of the most reliable registration accelerants for events.
- **Status badges everywhere dates appear:** "Registration Open," "Early Bird — Save $300," "Room Block Closing." Already started on the hub cards; extend to dropdown and event pages.
- **Social momentum:** "Join 350+ attendees from 14+ industries" near every register button, and once real, "X companies already registered."

### 4.2 People: the speakers/coaches directory

The single biggest content gap. Build `/live/speakers/`:

- Card per person: photo, name, role, one-line credibility hook, sessions they're leading.
- Marcus gets the anchor card linking to his existing author page (`/authors/marcus-sheridan/`) — we already have entity infrastructure for him; reuse it.
- Coaches link to their team profiles. This cross-linking is also an entity-SEO win (see §6.3).
- Event-page agendas get names attached to every session. Kill every "Coming Soon" the moment a name is known; until then say *who* is finalizing it ("Led by the EC coaching team — speaker announced July 2026").

Why this matters for all three goals: attendees buy people, sponsors buy association with credible people, and search/AI engines resolve events largely through the entities (people) attached to them.

### 4.3 De-risking and proof

- Hartford's results-logo wall ("$270k/month organic leads," "doubled revenue 4 years running") is excellent — add it to the hub and the experience page, not just Hartford.
- **Video testimonials:** 2–3 attendee clips, 30–60 seconds, shot at Hartford 2026 if we don't have usable footage already. Video converts dramatically better than text quotes for events.
- Refund/transfer policy is buried in FAQ 7 — surface it as a one-liner next to pricing: "Fully refundable until X. Transferable anytime."
- **ROI framing** from convince-your-boss ("one new customer covers this several times over") deserves promotion onto the pricing sections themselves.

### 4.4 Catch the not-ready-yet visitor (email capture)

Right now we convert or lose. Add HubSpot forms at the natural off-ramps:

| Surface | Offer |
|---|---|
| Event pages | "Email me the full agenda (PDF)" |
| Hartford page | "Can't make Hartford? Get Chicago 2027 updates" |
| Experience page | "New session recordings, straight to your inbox" |
| Hub footer band | "Get conference updates" (generic catch-all) |

Each feeds a nurture sequence that ends in a registration ask. This is the cheapest revenue in the whole plan.

### 4.5 Convince Your Boss upgrades

- Add a Chicago variant of the email (toggle or second button) so the page works for both events.
- Add a "Forward this page to your boss" share action.
- Cross-link it from the pricing section of both event pages ("Need sign-off? We wrote the email for you →"). Right now it's only reachable from the nav and hub.

---

## 5. Sponsor Funnel: Getting More Sponsors

The sponsor page has good bones (audience stats, three clear tiers). What's missing is *proof of outcome*. Changes, in priority order:

1. **Sponsor testimonials.** Even one quote from HubSpot or Salesmsg ("the room was full of exactly our buyers") outweighs everything else on the page. Get these at or before Hartford.
2. **Lead with the audience math, harder.** "350+ attendees, 70% owners and executives, $3M–$100M companies" is the pitch. Put a plain-English line under it: "That's roughly 245 decision-makers you can't reach in one room anywhere else in this space."
3. **Tier comparison table.** Replace or supplement the three cards with a side-by-side checkmark grid — sponsors scan, they don't read. Keep "Most Popular" on Premier.
4. **Add scarcity honestly.** "One Title sponsorship per event. X of 12 exhibitor tables remaining for Hartford." Sponsorship inventory is genuinely limited; say so.
5. **ROI artifacts after Hartford:** capture booth-traffic counts, scans, attendee-list engagement, and publish a short "Sponsor Results" block for the Chicago sales cycle.
6. **Multi-event offer up front.** The Hartford/Chicago alternation is a structural advantage: "Sponsor both events, reach two regional audiences, save X%." Currently hidden in a FAQ.
7. **Friction check on the CTA.** "View the Prospectus" + "Email Us" is fine, but add a third path for high-intent visitors: "Book a 15-minute call" (HubSpot meeting link). Some sponsors want to talk, not read a PDF.
8. **Dropdown/hub visibility.** Keep "Become a Sponsor" in the dropdown; on the hub, give the sponsor band one stat ("70% of the room are owners & executives") instead of just the price floor.

---

## 6. Search Engine Optimization

### 6.1 Event schema (do this first — it's a 2-hour fix with outsized returns)

Add `Event` JSON-LD to Hartford and Chicago pages: name, startDate/endDate, location (Hartford Marriott Downtown with full address; Chicago as `Place` TBD then updated), organizer, image, description, `offers` (price, currency, availability, validFrom, URL to Accelevents), `performer` (Marcus Sheridan, linked to his author page). This unlocks Google event rich results (date, location, price directly in search) and gives every AI engine a machine-readable fact sheet.

Also add:

- `FAQPage` schema on the Hartford FAQ block (17 questions already written — free rich-result inventory) and the new hub FAQ.
- `VideoObject` schema on the experience page sample sessions.
- Keep existing BreadcrumbList and Organization schema as-is.

### 6.2 Keyword and page-targeting map

One canonical page per query family, so we never compete with ourselves:

| Query family | Page |
|---|---|
| "endless customers live" / "endless customers conference" | `/live/` |
| "endless customers live 2026" / "hartford marketing conference" | `/live/hartford-2026/` |
| "endless customers live 2027" / "chicago marketing conference 2027" | `/live/chicago-2027/` |
| "endless customers live speakers" / "marcus sheridan speaking 2026" | `/live/speakers/` |
| "what is endless customers live like" / recordings queries | `/live/experience/` |
| "sponsor endless customers live" / sponsorship cost queries | `/live/sponsor/` |

Concrete on-page changes: add keyword-bearing H2s where they're currently brand-voice-only ("2026 Endless Customers Live Agenda" exists — good; add "Endless Customers Live Pricing," "Who Attends Endless Customers Live"). Titles and meta descriptions are already solid; extend the pattern to the new pages.

### 6.3 Entity and internal-link plumbing

- Speakers page links to author/team profiles and vice versa; event pages link to speakers; success-story pages that mention companies who attended link to the event pages. This builds the entity graph that both Google and LLMs use to decide we're the authority on our own event.
- Add a "Endless Customers Live" mention + link in logical spots site-wide: the book page (the conference is the live expression of the book), the coaching page, the Academy page, relevant Learning Center articles. Currently the section is an island reachable mostly through the nav.

### 6.4 Evergreen URL consideration

`hartford-2026` and `chicago-2027` URLs expire by design. That's fine for event pages (schema handles freshness), but after each event, don't delete: convert the page to a recap ("Endless Customers Live 2026: Recap, Photos, and Recordings") that 301s its registration CTAs to the next event. Past-event pages accumulate links and long-tail traffic that pure deletion throws away.

---

## 7. AI / LLM Optimization

When someone asks ChatGPT or Claude "best marketing conferences for SMBs in 2026" or "is Endless Customers Live worth it," we want to be quoted accurately. Events showed roughly 20x growth in AI-discovery traffic in 2025 — this channel is real and mostly uncontested in our niche.

1. **Expand llms.txt** from one line to a full conference block: what the event is, format (3-day, single-track, in-person), both dates and cities, pricing range, who it's for, sponsorship starting price, links to every page in the section. AI assistants answering from llms.txt should be able to give a complete, correct answer without crawling.
2. **Answer-first content blocks.** The hub FAQ (§3.3) and event-page FAQs should each open with a direct one-sentence answer, then elaborate. LLMs extract and cite chunked, self-contained answers far more reliably than narrative prose.
3. **A canonical "facts" paragraph** near the top of each event page — date, city, venue, price, format, audience in two plain sentences. This is what gets quoted verbatim by AI summaries; write it so we're happy when it is.
4. **Transcripts for sample sessions** on the experience page. Session transcripts are dense, unique, expert text — exactly what LLMs index and cite. Even lightly-cleaned auto-transcripts beat nothing.
5. **Check `/for-ai-agents/`** (we already have this page — rare advantage) and add a conference section mirroring the llms.txt block.
6. **Consistent entity naming.** We currently use "The Conference" (nav), "Endless Customers Live" (pages), "EC Live" (spec). Pick "Endless Customers Live" as the canonical name in all copy, schema, and llms.txt; "The Conference" can stay as the nav label since it's contextual.
7. **Verify robots.txt doesn't block AI crawlers** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended). Most accidental AI invisibility is a robots.txt mistake.

---

## 8. Making It Pop

The section is polished but reads composed rather than electric. The event has a casino night, a networking party, 350 people, and a neon logo — the pages should feel like that.

- **Lead with motion.** The hero video background is great; the experience page should open with the teaser playing, not a static frame. Add subtle motion to the stats band (count-up numbers on scroll).
- **The neon treatment.** The dropdown's neon logo is the most exciting visual asset in the section. Use that energy on the hub hero and section dividers (sparingly — accents, not wallpaper).
- **Real faces, large.** When the speakers page ships, give it big, warm, candid photography — not corporate headshots. The photo strip proves the event is human; double down.
- **Countdowns** (§4.1) add inherent energy: a ticking clock says "this is happening with or without you."
- **A "last year in numbers" band:** attendees, industries, sessions, ideas, casino chips wagered — one playful stat earns the serious ones more attention.
- **Post-Hartford: a 60-second highlight reel** cut specifically for the hub hero. This becomes the single best conversion asset for Chicago.

---

## 9. Prioritized Roadmap

### Phase 1 — This month (high impact, low effort)
1. Nav dropdown: add "Explore the Conference →" link, relabel secondary links (§3.4)
2. Event schema on both event pages + FAQPage schema on Hartford (§6.1)
3. Expand llms.txt conference block + verify robots.txt (§7)
4. Canonical facts paragraph on both event pages (§7.3)
5. Countdown timers: Chicago early bird + Hartford room block (§4.1)

### Phase 2 — Before Chicago agenda drop (build the missing assets)
6. Build `/live/experience/` (merge What to Expect + recordings), 301 archive (§3.2)
7. Build `/live/speakers/` + attach names to Hartford agenda sessions (§4.2)
8. Email capture forms on all four surfaces + nurture sequence (§4.4)
9. Sponsor page: comparison table, scarcity counts, booking link, multi-event offer (§5)
10. Hub updates: speakers strip, FAQ block, condensed What to Expect (§3.3)

### Phase 3 — At/after Hartford (harvest the event)
11. Shoot video testimonials + 60-second highlight reel (§4.3, §8)
12. Capture sponsor ROI data + sponsor testimonials (§5)
13. Convert Hartford page to recap after the event (§6.4)
14. Expand experience page: 6–8 sample sessions with transcripts (§3.2, §7.4)

### Phase 4 — Ongoing
15. Internal-link plumbing from book/coaching/Academy/Learning Center pages (§6.3)
16. Published price ladder for Hartford if pricing steps exist (§4.1)
17. Chicago venue announcement with date commitment (replace "coming soon")

---

## 10. How We'll Know It's Working

- **Attendees:** registrations per week (Accelevents), event-page → register click-through, email captures per week, nurture-to-registration rate.
- **Sponsors:** prospectus downloads, booked calls, tables sold vs. inventory.
- **SEO:** event rich results appearing for brand queries (check Search Console), impressions for "endless customers live" + city/conference variants.
- **AI:** periodically ask ChatGPT/Claude/Perplexity "what is Endless Customers Live," "best marketing conferences 2026/2027," "Endless Customers Live cost" and track accuracy and citation. Wrong or missing answers tell us exactly what to strengthen.

---

## Open Questions for Bob

1. Does Hartford pricing actually step up as the event approaches? If yes, we publish the ladder; if no, do we want to introduce one?
2. Do we have usable video from the last event (Chicago 2026?) for testimonials and the experience page, or does this wait for Hartford footage?
3. Speakers: how locked is the Hartford workshop lineup? The speakers page is only as strong as the names we can publish now.
4. Sponsor inventory: how many exhibitor tables exist per event? Real scarcity numbers need real counts.
5. Is "Endless Customers Live" the canonical name we commit to everywhere (vs. "EC Live")?
