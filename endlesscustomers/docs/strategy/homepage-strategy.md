# Homepage Strategy & Copy Map

> Working/strategy doc (per CLAUDE.md conventions). Drafted June 2026.
> Purpose: map every copy block and design decision for the rebuilt homepage (`/index.html`) BEFORE we build.
> The current `index.html` is the oldest page on the site. It predates the design system (emoji icons, inline-style placeholder visuals, `#` placeholder links, banned gradient-text comments, an outdated inlined nav). This is a from-scratch rebuild on the current system, not an edit.

---

## 1. What this page has to do

The homepage serves all five buyer-awareness levels at once (site-spec §2). It is the front door for coaching enrollment (primary business goal), services, the Academy, the book, the conference, and recruiting. It has four explicit jobs from Bob:

1. **Headline: "Win More Customers."** Confirmed, matches the IMPACT homepage H1.
2. **Heavily social-proof-led.** Proof appears in seven distinct modes down the page (logos, marquee quote, hard numbers, deep case studies, a testimonial wall, reviews count, institutional credentials). No section goes more than a screen or two without proof.
3. **Drive to the key sections.** Every major destination gets a clear on-ramp: the System (Learn), Coaching (How We Help), Services, Success Stories, The Conference, the Diagnostic, the Book, the Academy.
4. **Answer every first-visit question.** A dedicated FAQ plus inline answers, each linking to the canonical page already built for it.
5. **Feed of content** on the page (mixed: insights + webinar + resource).

### Confirmed decisions (from Bob)
- **Primary CTA: "Let's Talk"** → `/lets-talk`. **Secondary: "Get Your Free AI Diagnostic"** → `/diagnostic`.
  - Refinement we're building in: most first-time visitors are not ready to talk, so the diagnostic is treated as a real, attractive secondary (not a throwaway ghost), and it reappears mid-page as the low-commitment on-ramp. Highest-intent visitors take Let's Talk; everyone else has the diagnostic.
- **Canonical trust number: "500+ companies."** Used consistently sitewide on this page (reconcile the success-stories page's "300+" separately, tracked in Open Items).
- **Content feed: mixed** (latest insights + next webinar + a featured resource/story).

### The AI-forward throughline (added by Bob, June 2026): TREAT AS A SPINE, NOT A SECTION
The page must make Endless Customers read as a distinctly **AI-forward** company that helps businesses **thrive in an AI-first world**: AI visibility (getting recommended by ChatGPT and AI search / LLMO + AEO), content optimized for how AI surfaces answers, AI workflows that help teams create better content faster, and training teams to use AI safely, all grounded in EC principles. The site is already built to back this up: the "Thriving in an AI-First World" concept family in Core Concepts, the AI Services page (badged New), `/llms.txt`, and the `/for-ai-agents` entity graph. AI shows up in the hero subhead, in the System explanation, as its own statement section, in the services, and in the FAQ. We do not bolt it on once. We thread it through.

### Voice & guardrails
- No em dashes. Minimize "it's not just X, it's Y" contrast frames (Bob's prefs).
- Title Case for ALL nav/anchor/CTA chrome (decisions log). Section eyebrows are sentence case in markup (CSS uppercases).
- Brand gradient is borders / lines / underlines ONLY. Never text fills or button fills.
- One filled primary button style (`.btn--primary`), one secondary (`.btn--ghost`). Tabler icons + EC marks, never emoji.
- Place the canonical entity sentence in the first third of the page (entity-strategy TODO).

---

## 2. The first-visit question spine

These are the questions a first-time visitor actually asks, in roughly the order they ask them, and where each is answered on the page. The architecture in §4 follows this spine.

| The visitor's question | Where we answer it |
|---|---|
| What do you do / what is this? | Hero + The System section |
| Is this real, or marketing fluff? | Logo wall + marquee quote (immediately after hero) |
| Will this work in an AI-first world? | AI-first statement section + woven through The System |
| Does it actually get results? | By the Numbers + Featured Success Stories |
| Do people like working with you? | Testimonial wall + reviews count |
| Is this for a business like mine? | Who It's For (qualification) |
| Who is behind this / can I trust them? | Authority (book, Marcus, HubSpot Elite, awards) |
| What do you actually publish / are you active? | Mixed content feed |
| The specific objections (cost, ROI, speed, agency vs coaching, do I need the book) | FAQ |
| How do I start? | Hero CTAs, mid-page diagnostic, three-paths module, final CTA |

---

## 3. Social-proof inventory (what we have to work with)

Real assets confirmed in the repo and on impactplus.com (Bob's reference):

**Featured success stories (`data/content/success-stories.json`, `is_featured: true`):**
- **Linta Roofing**: grew to an **$8M** business; team **6 → 21**; roof replacements **250 → 450/yr** (~3 yrs).
- **MoveMobility**: **$1M+/month** in revenue; **450 leads, 98 opportunities, 38 closed deals** in the first 5 months.
- **Superior Trucking Payroll**: leads nearly tripled; **first sales rep hired in 4 years**; 5–8 weekly inbound opportunities.

**Other strong stories (18 total):** RetroFoam (+2,942% organic leads), Applied Educational Systems (30,000 organic leads/yr), West Roofing ($14M+ in bids), RoofCrafters ($270K/mo from organic, close rate ~30% → ~60%), Berry Insurance (close rate 16% → 27%), AIS (organic traffic 11×), Dental ClaimSupport (deals won +192%), Fire & Ice (+$1M revenue), Dalinghaus ($7.5M → $10.5M).

**Marquee testimonial quotes (real IMPACT/EC clients, from impactplus.com):**
- **Ed McKnight, Opes Partners:** "Endless Customers made me a millionaire." (strongest single line; confirm reuse + attribution)
- **Dave Owens, RoofCrafters:** "Close rates are up to 70%... we added 8 new sales reps."
- **Patrick Moorhead, Pricefx:** "4x more sales-qualified leads and 7x revenue growth in three years."
- **Steve Sheinkopf, Yale Appliance:** "From one store to six stores."
- **Mike Ritzema, Superior Trucking Payroll:** "Sales opportunities tripled... hired our first salesperson in four years."
- **Tony Paille, AIIM International:** "Within a year we hit 1,500 leads a month."
- **Andy Roe, Roe Painting:** "One of the best investments we've made."

**Client logos to feature (logo wall):** River Pools & Spas, Yale Appliance, Linta Roofing, RetroFoam, RoofCrafters, Berry Insurance, InTek, Fire & Ice, Energy Swing Windows, Roe Painting, Mazzella, Thompson Creek. (Logo SVGs are an Open Item.)

**Quantitative proof:** 500+ companies, typical 3–5× increase in qualified opportunities, 400+ verified reviews (327+ on Clutch + Google, per the nav), first measurable results in ~90 days, 18–24 months to full mastery.

**Institutional credentials:** HubSpot Elite Solutions Partner, two best-selling books (*They Ask, You Answer* 2017/rev. 2019; *Endless Customers* 2025), a decade-plus of recognition, EOS-run. Marcus Sheridan as author/keynote.

---

## 4. Section-by-section map

Recommended order. Each section lists: **Purpose → Copy (ready to use) → Layout/components → Motion → Data/links.** Anchors in Title Case.

### 0. Global featured CTA bar (Hello Bar): DEFER
The IMPACT site runs a hello bar (e.g., "Watch the on-demand webinar"). Our TODO already tracks a sitewide featured-CTA mechanism (not built). Do not hard-code it onto the homepage. Leave the slot for the future global module.

---

### 1. Hero: "Win More Customers"
**Purpose:** Say what we do, state the AI-first positioning, and route to the two CTAs.

**Copy:**
- Eyebrow: `The Endless Customers System`
- H1 (`headline-short` tier, "Win More Customers" is 18 chars): **Win More Customers**
- Subhead (carries the canonical sentence + AI-first frame):
  > Endless Customers is the proven system that helps your business become the most known, trusted, and recommended brand in your market, so you win more customers from search, from buyers, and from AI. Built on *They Ask, You Answer*, refined across 500+ companies.
- Primary CTA: **Let's Talk** → `/lets-talk`
- Secondary CTA (`.btn--ghost`): **Get Your Free AI Diagnostic** → `/diagnostic`
- Inline proof microline under the buttons: `★★★★★  Rated by 400+ businesses · Trusted by 500+ companies`

**Layout/components:** Keep Bob's oversized background video (`hero--video`, existing `assets/videos/hero-bg.webm`) with the dark overlay so white type stays legible. One frosted `glass-chip` floating over a lower corner: a small avatar stack + `500+ companies`. This is the hero's single allowed chip.

**Motion:** Headline + subhead + CTAs stagger-rise once on load (IntersectionObserver, final state in markup, respects reduced-motion). Chip pops in last.

**Notes:** Start the rebuild from `_template.html` so the CURRENT master nav/footer/theme/scripts are inlined correctly, then run `sync-nav.py` + `sync-footer.py`. Do not hand-author nav (the existing inlined nav in `index.html` is stale).

---

### 2. Logo wall: "Companies growing with Endless Customers"
**Purpose:** Instant credibility through recognizable clients; answers "is this real?"

**Copy:**
- Eyebrow / label: `Trusted by 500+ companies`
- Lead line: **Companies growing with Endless Customers**
- Sub: `Across home services, construction, manufacturing, business services, healthcare, and more.`

**Layout/components:** A clean grayscale logo row/grid (logos go full color on hover), no borders. 10–12 logos. On a calm off-white surface. Consider a slow marquee on mobile.

**Motion:** Logos fade/settle in on scroll, once. Optional very slow auto-scroll, paused on `prefers-reduced-motion`.

**Data/links:** Static logos for now (Open Item: re-host SVGs). Whole band links to `/how-we-help/success-stories`.

---

### 3. Marquee proof quote (the "millionaire" moment)
**Purpose:** One emotional, aspirational proof point right after the logos. Pure pattern interrupt.

**Copy (recommended):**
- Oversized pull quote: **"The Endless Customers system made me a millionaire."**
- Attribution: `Ed McKnight, Opes Partners`
- Optional result chip beneath: small qualifier or company logo.

**Fallback if Ed/Opes can't be used:** Jeffery Linta, Linta Roofing ("Clarity that drove growth," tie to the $8M story), or Patrick Moorhead, Pricefx ("7x revenue growth").

**Layout/components:** Big editorial quote, generous whitespace, calm light surface. Optional headshot or company logo at small size. No card chrome; let the type carry it.

**Motion:** Quote draws in; a brand-accent underline draw on a key phrase (accent color, never the brand gradient).

---

### 4. The System: "How Endless Customers works" (Attract → Convert → Close, AI woven in)
**Purpose:** Answer "what do you actually do?" Replace the old placeholder step-stack with the real animated SVG system diagram. AI is named as part of each step, not a separate add-on.

**Copy:**
- Eyebrow: `The Endless Customers System`
- H2 (`--lg` marquee tier, centered): **One system to attract, convert, and close more of the right buyers**
- Sub: `Today's buyers do most of their research before they ever talk to you, and increasingly they ask AI who to trust. Endless Customers meets them everywhere they look with the answers they are already searching for.`
- Three steps:
  1. **Attract the Right Buyers**: Helpful content (articles, video, buying guides) that ranks in search AND gets surfaced and recommended by AI tools. Tags: `Content` · `Video` · `SEO + AEO` · `AI Visibility`
  2. **Convert Visitors Into Buyers**: A website that builds trust: clear messaging, pricing transparency, social proof, and self-service tools that let buyers qualify themselves. Tags: `Website` · `Trust Signals` · `Self-Selection Tools` · `CRO`
  3. **Close With Less Friction**: Sales and marketing aligned around content, so reps spend time with buyers who are already educated and pre-sold. Tags: `Assignment Selling` · `1:1 Video` · `Sales + Marketing Alignment`
- CTA: **Learn the System** → `/learn/what-is-endless-customers` (secondary: **Explore Core Concepts** → `/learn/core-concepts-frameworks`)

**Layout/components:** Split or centered with a code-built **animated SVG** Attract → Convert → Close diagram (per visual-style-guide §4, page accent blue, line-draw motion). Light surface. No emoji, no placeholder boxes.

**Motion:** Stroke-dashoffset line-draw connecting the three stages as they enter; step cards stagger in.

---

### 5. AI-first statement section: "Thrive in an AI-first world" (THE ONE DARK FRAMER MOMENT)
**Purpose:** The strategic centerpiece Bob asked for. Make EC unmistakably the company that helps you win as AI reshapes how buyers find and choose businesses. This is the single dark `statement-panel` on the page (visual-style-guide §5: at most one per page, restrained aurora).

**Copy:**
- Eyebrow: `Thrive in an AI-First World`
- H2: **When buyers ask AI who to trust, you want to be the answer**
- Body:
  > Search is becoming answers. Buyers are asking ChatGPT and AI search who is credible, who is worth calling, who to buy from. The businesses that win are the ones publishing the helpful, trustworthy content AI surfaces and recommends. Endless Customers gets you there.
- Four short pillars (icon + label + one line), all framed as EC principles applied to AI:
  - **Get recommended by AI**: Become the brand AI search and chat tools cite and suggest (LLMO + AEO).
  - **Content built for AI and humans**: Publish the trustworthy, question-answering content both buyers and AI reward.
  - **AI workflows for your team**: Create better content faster without sounding generic, with the trust signals that still matter.
  - **AI used safely and well**: Train your team to adopt AI responsibly as part of how you grow.
- CTA: **See How We Help With AI** → `/how-we-help/ai`  ·  secondary: **AI in the System** → `/learn/core-concepts-frameworks` (AI family)

**Layout/components:** Near-black `#0A0F1F` rounded panel, restrained blue→magenta aurora behind floating content only (≥80% stays dark). Floating content = a crisp light UI card or a code-built "AI answer" mock (e.g., a stylized AI chat answer recommending the client's business, built in HTML/CSS, no invented readable brand names). Per the guide, this is the ONLY place blue+magenta appears as a glow.

**Motion:** Aurora is static or very slow; the floating card rises in once. Keep it calm (keynote-stage, not nightclub).

---

### 6. By the Numbers: count-up proof strip
**Purpose:** Quantitative proof, scannable.

**Copy (4 stats):**
- **500+** companies coached
- **3–5×** more qualified opportunities (typical)
- **400+** verified client reviews
- **~90 days** to first measurable results

**Layout/components:** Four count-up stat items on a calm surface (or as a slim band). Each number animates and gets a brand-accent draw-in underline (motion vocabulary already shipped on Academy).

**Motion:** Count-up on scroll, once; underline draws after the number lands.

**Note:** Confirm 3–5× and ~90 days (Open Items). These come from the IMPACT site's ROI language and the current homepage.

---

### 7. Featured Success Stories: the deep proof
**Purpose:** Three real, quantified case studies. The most persuasive content on the site.

**Copy:**
- Eyebrow: `Real Results`
- H2 (`--lg`): **Real companies. Real numbers. A system they own.**
- Three story cards (the `is_featured` set):
  - **Linta Roofing**: "How Linta grew to an $8M business by becoming the most transparent roofer in Myrtle Beach." Chips: `$8M revenue` · `6 → 21 team` · `Roofing`
  - **MoveMobility**: "Over $1M per month in revenue from Endless Customers." Chips: `$1M+/mo` · `38 deals in 5 months` · `Manufacturing`
  - **Superior Trucking Payroll**: "From stalled out to steady growth." Chips: `Leads ~3×` · `First rep in 4 yrs` · `Business services`
- CTA: **See All Success Stories** → `/how-we-help/success-stories`

**Layout/components:** Three `media-card`s (rounded, soft shadow, no border) with featured image, headline, and metric chips. Reuse the success-story card pattern from the success-stories listing if one exists.

**Motion:** Cards stagger-rise on scroll.

---

### 8. Testimonial wall: "...and here's what they have to say"
**Purpose:** Breadth of proof (many voices), plus a route to the full reviews page.

**Copy:**
- Eyebrow: `In Their Words`
- H2: **Hundreds of teams will tell you the same thing**
- 6 testimonial cards (title + quote + name, role, company), e.g.:
  - "Close rates are up to 70%." · Dave Owens, RoofCrafters
  - "4x more qualified leads, 7x revenue growth." · Patrick Moorhead, Pricefx
  - "From one store to six stores." · Steve Sheinkopf, Yale Appliance
  - "Sales opportunities tripled." · Mike Ritzema, Superior Trucking Payroll
  - "1,500 leads a month." · Tony Paille, AIIM International
  - "One of the best investments we've made." · Andy Roe, Roe Painting
- CTA: **Read 400+ Verified Reviews** → `/how-we-help/reviews`

**Layout/components:** A 2–3 column quote grid (or a masonry feel like IMPACT's), light cards, no borders. Each card leads with the short bolded outcome title, then the quote, then attribution. Optional "Show more" to expand.

**Motion:** Subtle stagger; keep it calm given the density.

---

### 9. Oversized video: "See the system in action"
**Purpose:** Visual density Bob loves (oversized video), on a LIGHT surface so we keep the one-dark-moment budget for the AI section.

**Copy:**
- Eyebrow: `Watch`
- H2: **See what Endless Customers looks like in your business**
- Sub (1 line): `A short look at the system, the coaching, and the results.`

**Layout/components:** `media-card--xl` (24px radius, soft shadow, no border), 16:9, ~1140px. `TODO(video)` placeholder until the real explainer/welcome video exists (Bob or Marcus welcome, or a system overview). Poster image until then.

**Motion:** Play cue scales slightly on hover; card rises in once.

---

### 10. Three Ways to Start: drive to the key sections
**Purpose:** The main "drive to sections" engine, modeled on IMPACT's three-path module (Learn / Get Coaching / Experience the Conference).

**Copy:**
- Eyebrow: `Where to Start`
- H2 (`--lg`): **Three ways to start with Endless Customers**
- Three cards:
  1. **Learn the System**: Free resources, the book, the podcast, and the Academy. `Start free →` → `/learn/what-is-endless-customers` (with secondary links to `/learn/book`, `/learn/academy`)
  2. **Get Coaching**: Our flagship program. We coach your team to own it. `See the program →` → `/how-we-help/coaching-program`
  3. **Experience the Conference**: Endless Customers Live, twice a year. `Hartford, Oct 5–7 2026 →` → `/live/`
- A quiet fourth line under the cards for services + the paid audit:
  `Need hands-on help? Explore Website, HubSpot, Paid Media, and AI Services, or start with a Marketing Audit & Recommendations.` → `/how-we-help/` and `/how-we-help/audit-and-recommendations`

**Layout/components:** Three cards, each with an EC mark / tabler icon or a small emblem image (IMPACT uses book/EC-Live emblems). Light surface, no borders. This also surfaces the diagnostic again is unnecessary here (it's in hero, mid-page, and final CTA already).

**Motion:** Cards stagger-rise; arrow nudges on hover.

---

### 11. Who It's For: qualification
**Purpose:** Answer "is this for a business like mine?" and pre-qualify honestly (self-selection is an EC principle).

**Copy:**
- Eyebrow: `Who It's For`
- H2 (left): **Built for businesses whose buyers do their homework**
- Body: `If your customers research before they buy, Endless Customers works for you. We do our best work with companies roughly $3M to $100M in revenue who want to own their growth instead of renting it from an agency.`
- Industry pills (reuse the existing set): HVAC & Home Services, Roofing & Siding, Pool & Outdoor Living, Remodeling, Plumbing & Electrical, Windows & Doors, Legal & Professional Services, Accounting & Finance, B2B Manufacturing, Industrial & Distribution, Technology & SaaS, Healthcare, Insurance, Real Estate, Education.
- Honest line + CTA: `Not sure if you're a fit? We'll tell you straight.` → **See Who We Work With** → `/how-we-help/who-we-work-with`

**Layout/components:** Split: copy left, industry pill cloud right (existing `industry-pill` component, dots intact). Light surface.

**Motion:** Pills stagger in.

---

### 12. Authority / Methodology: "Built on They Ask, You Answer"
**Purpose:** Answer "who's behind this, can I trust them?" Institutional proof.

**Copy:**
- Eyebrow: `The Foundation`
- H2: **Built on *They Ask, You Answer*. Evolved into Endless Customers.**
- Body: `Marcus Sheridan's best-selling framework has helped thousands of companies. Endless Customers takes it further: content, website, sales, technology, and culture combined into one coached system your team executes, now built for an AI-first world.`
- Credential row (logos/wordmarks, no borders): `HubSpot Elite Solutions Partner` · `Two best-selling books` · `A decade-plus of recognition` · `Runs on EOS`
- CTAs: **Get the Book** → `/learn/book`  ·  secondary **Meet the Team** → `/team/meet-the-team`

**Layout/components:** Split: copy + book cover image (or Marcus). Credential strip beneath as small grayscale marks. Could fold the awards link in: `See our awards & recognition →` → `/team/awards`.

**Motion:** Book cover/credentials settle in.

---

### 13. Mixed content feed: "Fresh thinking every week"
**Purpose:** Show we publish constantly (proof of authority + the AI-forward, always-on posture), and feed the Learning Center. Mixed feed per Bob.

**Copy:**
- Eyebrow: `From the Learning Center`
- H2 (`--lg`): **New ideas to help you win, every week**
- Sub: `Articles, podcast episodes, and live webinars, twice a week, free.`
- Feed contents (mixed):
  - 2–3 latest Recent Insights / podcast episodes (e.g., Ep. 150 "How Do You Make Bold Content That Stands Out," Ep. 149, Ep. 148). Pulls newest from `insights.json`.
  - The next live **Webinar** card (from `webinars.json`, status `upcoming`); if none upcoming, show an on-demand one.
  - One featured **resource/download** (`offers.json`, `is_featured`) or a guide.
- CTAs: **Browse the Learning Center** → `/learn/`  ·  **Subscribe** → `/learn/subscribe`

**Layout/components:** A 3–4 card row using the existing `EC.insightCard` / `EC.webinarCard` renderers (this is the one section that should be data-driven via `cms.js`, matching the Learn pages). Cards degrade to the EC placeholder tile on image 404 (existing behavior). Light surface.

**Motion:** Cards stagger-rise; keep consistent with the Latest Insights feed.

---

### 14. Final CTA band: "Ready to win more customers?"
**Purpose:** The close. Let's Talk primary, Diagnostic secondary, with reassurance.

**Copy:**
- H2 (`cta-band__title`, marquee tier): **Ready to win more customers?**
- Sub: `Let's talk. We'll look at where you are, show you what's possible with Endless Customers, and map your next step. No pressure, no obligation.`
- Primary: **Let's Talk** → `/lets-talk`
- Secondary (`.btn--ghost` in white): **Get Your Free AI Diagnostic** → `/diagnostic`
- Microcopy: `Not ready to talk? Run the free AI diagnostic and see where you stand in minutes.`

**Layout/components:** The existing `.cta-band` (standard dark CTA chrome). IMPORTANT dark-surface budget: the single aurora `statement-panel` is the AI section (§5). The final CTA band uses the standard dark treatment, not a second aurora panel, so the page keeps one true Framer moment. (If Bob would rather the drama land at the close, we swap: make §14 the aurora panel and render §5 as a lighter section. Flag for his call.)

---

## 5. Design-system compliance checklist (for the build)
- [ ] Built from `_template.html`; `sync-nav.py` + `sync-footer.py` run; no hand-edited inlined nav/footer.
- [ ] `body class="page-accent--blue"` (homepage accent).
- [ ] Brand gradient used only on borders/lines/underlines. No gradient text or button fills.
- [ ] Exactly one filled primary button style and one `.btn--ghost` secondary.
- [ ] Tabler icons + EC marks only. Zero emoji (the old homepage's emoji problem cluster icons are gone).
- [ ] Exactly ONE dark aurora `statement-panel` (the AI section). Hero video and the standard `.cta-band` are separate, allowed dark chrome.
- [ ] H1 uses `headline-short` tier ("Win More Customers"). H2s use `--lg` marquee tier for centered full-width headers, default for left/split headers.
- [ ] Oversized video present (visual density standard), on a light surface as `media-card--xl`, `TODO(video)` until real asset.
- [ ] Photos: rounded + soft shadow, NO borders. Optional faint accent spill on the hero only.
- [ ] Motion: purposeful, ≤1.2s, physics easing, scroll-triggered plays once, final states in markup, respects `prefers-reduced-motion`. Animation colors use the page accent, never the brand gradient.
- [ ] Code-first graphics: the System diagram and AI "answer" mock are SVG/HTML, not generated images.
- [ ] One section (the feed) is data-driven via `cms.js`; bump `DATA_VERSION` if any JSON changes.

## 6. SEO / AEO / entity layer
- [ ] Canonical entity sentence in the first third (hero subhead handles it; confirm exact wording with `/press`).
- [ ] JSON-LD: keep `Organization` + `Brand` (already in footer); add `WebSite` (+ `SearchAction` if site search qualifies) and `FAQPage` for the FAQ section.
- [ ] `<title>` / meta: align with "Win More Customers" positioning (current title is the old "best salesperson" line). Suggested title: `Endless Customers: Win More Customers With a Proven, AI-First System`.
- [ ] AI-forward content reinforces `/llms.txt` and `/for-ai-agents`; make sure homepage facts match those.

## 7. The FAQ block (§ embedded in section 13/14 area): answer every question
Accordion, FAQPage JSON-LD, each answer ends with a link to the canonical page. Question set (adapted from IMPACT's homepage FAQ, mapped to OUR pages):

1. **What is Endless Customers?** → `/learn/what-is-endless-customers`
2. **How is this different from a marketing agency?** (We coach your team to own it; ~18–24 months to mastery) → `/how-we-help/coaching-program`
3. **Will it work for my business and industry?** → `/how-we-help/who-we-work-with`
4. **How does the coaching program work?** (Alignment Day, 90-day cycles) → `/how-we-help/coaching-program/how-it-works`
5. **What does it cost and what's the ROI?** (typical 3–5× qualified opportunities) → `/how-we-help/coaching-program/pricing`
6. **How fast will I see results?** (quick wins in days; ~90 days to measurable) → ties to By the Numbers
7. **Do you help with AI?** (AI visibility, AI content, AI workflows, used safely) → `/how-we-help/ai`
8. **Do you help with websites, HubSpot, and paid media?** → `/how-we-help/`
9. **Do I need to read the book first?** (No; free preview) → `/learn/book`
10. **How can I hear from your clients?** → `/how-we-help/success-stories`, `/how-we-help/reviews`, `/learn/podcast`
11. **What's your guarantee?** → `/how-we-help/guarantee`

Placement recommendation: FAQ sits just BEFORE the final CTA (after the content feed), so objections are handled right before the ask.

---

## 8. Open items (need Bob's input or an asset)
1. **Marquee quote rights:** confirm we can use "Endless Customers made me a millionaire" (Ed McKnight, Opes Partners). If not, use Patrick Moorhead (Pricefx) or Jeffery Linta.
2. **Testimonial reuse:** confirm the IMPACT-attributed quotes (Pricefx, AIIM, Opes) can run on the EC site. Companies not in `success-stories.json` would appear as quote-only.
3. **Stat confirmation:** "3–5× qualified opportunities" and "~90 days to first results" (sourced from IMPACT ROI copy + current homepage). Lock the numbers.
4. **Trust-number reconciliation:** homepage uses 500+ (confirmed). The success-stories page says "300+" and nav says "400+ reviews." Decide the canonical set so the page is internally consistent, then sweep the other pages.
5. **Client logo SVGs:** source/re-host the 10–12 logos for the wall (many exist on impactplus.com).
6. **Hero + explainer video:** confirm the hero background video is current, and identify the oversized explainer/welcome video (or mark `TODO(video)`).
7. **AI section visual:** approve the concept of a code-built "AI recommends your business" mock as the floating content in the dark panel.
8. **Dark-moment placement:** confirm the single aurora statement-panel is the AI section (recommended), with a standard dark final CTA.
9. **Three-paths emblems:** decide on emblem images vs. EC-mark icons for the Learn / Coaching / Conference cards.

## 9. Build sequence (when approved)
1. Copy `_template.html` → `index.html`, set path prefix `./`, page meta, accent.
2. Build sections top-down with real components (`media-card`, `glass-chip`, `statement-panel`, `stat-item`, `industry-pill`, `cta-band`).
3. Wire the data-driven feed via `cms.js`; build the System and AI SVG graphics in code.
4. Add JSON-LD (`WebSite`, `FAQPage`), update `<title>`/meta.
5. Run `sync-nav.py` + `sync-footer.py`; run through `design-qa.md`.
6. Fill `TODO(video)` / `TODO(gemini)` slots in a later asset pass.
