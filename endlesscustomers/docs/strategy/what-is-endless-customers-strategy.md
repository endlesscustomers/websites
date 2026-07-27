# What Is Endless Customers? — Page Strategy

> Working/strategy doc (per CLAUDE.md conventions). Drafted June 2026.
> Page: `/learn/what-is-endless-customers/index.html`. Status: strategy first, build after Bob signs off.
> Purpose: rethink this page from an unaware visitor's perspective before we touch markup. The current page is decent but framework-heavy and under-visual. This maps the new narrative, copy, visuals (with placeholder image specs), and the SEO/AEO/accessibility layer.

---

## 0. The one decision that drives everything

**Stop opening with the machinery. Open with the visitor's world.**

The current page is organized like the book's table of contents: Four Pillars, Big 5, Selling 7, 5 Components, implementation steps. That is the right *reference* structure (it lives in Core Concepts & Frameworks), but it is the wrong *introduction* structure. An unaware visitor does not arrive wanting our taxonomy. They arrive with a problem and a quiet fear that the way they have always won customers is breaking.

Per Bob (June 2026): **put the energy into what Endless Customers solves for a business and why they should implement it so they can thrive.** Frameworks get named, quickly, as proof that the system is real and specific. They do not get the spotlight. The most worth-naming are **The Big 5**, **Assignment Selling**, and **self-service tools**. The Selling 7 gets a single passing mention, not a section.

Every competitor "What is ___" page we studied does this:
- **EOS** opens "A Better Way to Run Your Business," then "When you run on EOS, everything changes" (outcomes), and only then shows the model.
- **Scaling Up** opens with the feeling ("Scale the business. Enjoy the climb.") and the outcomes (More Money, More Time, More Fun) before the 4 Decisions.
- **StoryBrand** insists the customer is the hero and the brand is the guide. The page is about the hero's problem and transformation.

So: the business owner is the hero. Endless Customers is the guide. The page sells the destination (most known, trusted, and recommended → endless customers → thriving in an AI-first world), and treats the frameworks as the credible path, not the headline.

---

## 1. What this page has to do

The audience is **Problem-Aware to Solution-Aware** on the awareness ladder (site-spec §2): they feel the pain (leads harder to get, buyers ghosting, price pressure, AI changing search) but most have never heard of "Endless Customers" as a named system. A meaningful slice arrives cold from an AI answer or a search for "what is endless customers." This page is the **front door to the methodology** and the **#1 "Start Here" destination** in the Learning Center nav.

Its jobs, in order:

1. **Make the visitor feel understood** in the first screen: name the shift in how customers choose who to buy from, and the cost of ignoring it.
2. **Define the entity** plainly and early (first third of the page): what Endless Customers *is*, in one quotable sentence, with the canonical positioning.
3. **Sell the outcomes** — the bulk of the page is "here's what changes for your business," not "here are our acronyms."
4. **Establish the AI-first throughline** as a spine, not a section: EC is how you thrive as AI reshapes how buyers (and machines) decide who to trust.
5. **Prove it** with real results and recognizable companies across industries.
6. **Qualify honestly** (who it's for, what it asks of leadership) so the right people lean in and the wrong people self-select out.
7. **Route deeper** with low-friction next steps: the free AI Diagnostic (our "free assessment," mirroring EOS's Organizational Checkup), the free Core Concepts library, the book, and Let's Talk for the ready.
8. **Win the AEO/AI-citation game** with a clean definition, FAQ schema, and entity consistency so this page becomes the source AI quotes when asked "what is Endless Customers."

### Voice & guardrails (Bob's prefs + decisions log)
- No em dashes. Minimize "it's not just X, it's Y" contrast frames.
- Title Case for ALL nav/anchor/CTA chrome. Section eyebrows are sentence case in markup (CSS uppercases).
- Brand gradient on borders/lines/underlines ONLY. Never text or button fills.
- One filled primary (`.btn--primary`), one secondary (`.btn--ghost`). Tabler icons + EC marks. Zero emoji.
- Keep frameworks high-level. Name Big 5 / Assignment Selling / self-service in passing; one light Selling 7 mention; send depth-seekers to Core Concepts.
- Canonical entity sentence in the first third of the page (entity-strategy TODO).

---

## 2. The unaware-visitor question spine

The order a cold visitor actually thinks, and where the page answers each. The architecture in §4 follows this spine.

| The visitor's question | Where we answer it |
|---|---|
| Do you even understand my situation? | Hero + "The shift" problem section |
| What is this thing called Endless Customers? | Definition block (canonical sentence), top third |
| What does it actually do for my business? | "What it solves" outcomes section (the heart) |
| Will this even matter as AI takes over search? | AI-first statement panel + woven throughout |
| How does it actually work, briefly? | "How it works" — 4 behaviors, high level |
| Why should I believe you? | Proof: numbers, companies, marquee quote |
| What makes this different from an agency or a one-off campaign? | "Why it's different / why it sticks" |
| Is this for a business like mine? | Who It's For (honest qualification) |
| The nagging objections (cost, time, ROI, do I need the book) | FAQ (AEO) |
| Okay, how do I start without committing? | Diagnostic + free concepts + book; Let's Talk for the ready |

---

## 3. The narrative in one paragraph (the throughline we are writing to)

> The way customers decide who to buy from has changed for good. They research on their own, they trust businesses that answer honestly, and more and more they ask AI who is credible before a human is ever involved. Most companies are invisible in exactly those moments, so they fight on price and rent attention from ads and agencies. Endless Customers is the proven system that fixes the root cause: it makes you the most known, trusted, and recommended brand in your market, the brand both buyers and AI point to. You do it by becoming the clearest, most honest voice in your industry, building a website and sales process that earn trust before the first conversation, and using AI to become more human, not less. It is a system your team owns, built on the best-selling *They Ask, You Answer* and proven across 500+ companies. Run it, and you stop chasing customers and start attracting an endless supply of the right ones.

Everything on the page should ladder up to that paragraph.

---

## 4. Section-by-section map

Recommended order. Each section lists **Purpose → Copy (ready to use) → Layout/components → Visual (with placeholder spec) → Motion → Data/links.** Anchors in Title Case. Page accent stays blue (`body class="page-accent--blue"`, current).

> **Visual approach.** This page is currently almost all text. It should be visual, in the Academy style: real code-built diagrams where we can, and **labeled image placeholders that carry their own art prompt** everywhere a photo or richer illustration belongs. Reuse the Academy placeholder pattern exactly: a `.acx-ph`-style frame with an `.acx-ph__tag` ("Gemini image" or "Diagram") and an `.acx-ph__prompt` describing the intended asset, so the page is complete and self-documenting on day one and we swap real art in later. (We will promote a generic `.ec-ph` version into `learn.css` rather than scope it per page.)

---

### 1. Hero: name the shift, not the system

**Purpose:** In one screen, prove we understand the visitor's world and introduce the destination. This replaces today's hero, which jumps straight to a benefit line without first earning it.

**Copy:**
- Breadcrumb chip (keep): `Learning Center › What is Endless Customers?`
- Eyebrow: `The Endless Customers System`
- H1 (`headline-long` tier): **Become the most known, trusted, and recommended brand in your market.**
- Subhead (carries the shift + the AI frame):
  > The way customers choose who to buy from has changed. They research on their own, trust the businesses that answer honestly, and increasingly ask AI who is worth calling. Endless Customers is the proven system that makes your business the one they find, trust, and choose, so you win more customers in an AI-first world.
- Primary CTA: **Get Your Free AI Diagnostic** → `/diagnostic`
- Secondary CTA (`.btn--ghost`): **See How It Works** → `#how-it-works` (in-page anchor; smooth-scroll)
- Proof microline under buttons: `★★★★★ Trusted by 500+ companies · Built on the best-selling They Ask, You Answer`

**Layout/components:** Keep the `svc-hero svc-hero--learn` shell so it matches the other Learn front doors. Right side or bleading the hero: a visual (below).

**Visual (placeholder):** `Gemini image — A confident business owner / leadership team in a real workplace (not stock-cheesy), mid-conversation, warm and human, EC blue accent lighting. Conveys "trusted local market leader," not "tech startup."` Aspect 16:10, rounded, soft shadow, no border.

**Motion:** Headline + subhead + CTAs stagger-rise once on load (final state in markup, respects reduced-motion).

---

### 2. The shift: why the old way stopped working

**Purpose:** Sharpen the problem so the solution lands. Today's page has a good "leads are down" list buried as a sub-element; promote it into a real, empathetic section. This is the StoryBrand "character has a problem" beat.

**Copy:**
- Eyebrow: `Why customer acquisition got harder`
- H2 (`--lg`): **Your buyers changed how they buy. Most companies didn't change how they sell.**
- Lead:
  > Today's buyers do 70% or more of their decision before they talk to a salesperson. They search, they compare, they watch video, they read reviews, and now they ask AI tools who to trust. If you are not the most helpful and honest voice in those moments, you are invisible exactly when the decision is being made.
- Then the cost, as a tight scannable cluster (reuse `sys-problems`, keep to five):
  - Leads are down, and the ones you get are less qualified.
  - Sales cycles keep getting longer and more competitive on price.
  - You depend on ads and agencies you rent, not an asset you own.
  - Marketing makes content sales never uses.
  - You are invisible where buyers now research: AI, video, and comparisons.

**Layout/components:** Light surface, copy lead + the five-item problem cluster. No new component needed.

**Visual (placeholder):** Small inline **diagram** (code-built, not an image): a simple "old funnel vs. how buyers actually move now" line graphic, or a stat callout `~70% of the buying decision happens before a sales conversation`. `Diagram — buyer-journey shift, page-accent line-draw on scroll.`

**Motion:** Problem items stagger in once.

**Data/links:** "AI, video, and comparisons" links softly to the AI section anchor and to `/learn/core-concepts-frameworks` (AI family) for the curious.

---

### 3. The definition: what Endless Customers is (canonical, early)

**Purpose:** Answer "what is this thing" cleanly and quotably, in the first third, for both humans and AI. This is the AEO money block.

**Copy:**
- Eyebrow: `The short answer`
- Definition (the canonical sentence, set as a calm flat lead, larger than body, no banner):
  > **Endless Customers is a proven system that helps your business become the most known, trusted, and recommended brand in your market.** Built on the best-selling *They Ask, You Answer* and refined across 500+ companies, it aligns your marketing, sales, website, and leadership around the one thing modern buyers (and AI) reward: honest, helpful answers to the questions that actually drive a purchase.
- One-line origin, to add weight without a history lesson:
  > It is the evolution of *They Ask, You Answer*, rebuilt by Marcus Sheridan and the team at IMPACT for an AI-first world.

**Layout/components:** Centered, generous whitespace, the definition gets visual primacy (this is the sentence we want AI to quote verbatim, and that should match `/press`, `/for-ai-agents`, `/llms.txt`, and the Core Concepts "what is EC" record). No card chrome.

**Visual:** None, or the book cover at small size beside it. Keep this block calm and text-forward; it is a definition, and clutter hurts quotability.

**Motion:** Definition draws in; an accent underline draws under "most known, trusted, and recommended" (accent color, never the brand gradient).

---

### 4. What it solves: the outcomes (THE HEART OF THE PAGE)

**Purpose:** This is where Bob wants the energy. Answer "what does this actually do for my business and why would I implement it." Frame everything as a business outcome the owner wants, not a feature we ship. Modeled on EOS's "When you run on EOS, everything changes" and Scaling Up's More Money / More Time / More Fun.

**Copy:**
- Eyebrow: `What changes when you run Endless Customers`
- H2 (`--lg`): **Stop chasing customers. Start attracting the right ones.**
- Sub: `Endless Customers fixes the root cause of expensive, unpredictable growth: a lack of trust at the moment buyers decide. Here is what that looks like in your business.`
- Six outcome cards (icon + title + one or two sentences). Titles are the benefit; copy names a framework only in passing where it earns it:
  1. **Get found and recommended.** Become the business buyers find in search and the one AI tools cite and recommend when someone asks who to trust. You own the answer instead of bidding for it.
  2. **Earn trust before the first conversation.** When you openly answer the questions others dodge (what it costs, what can go wrong, how you compare), buyers arrive already believing you. This is the heart of **The Big 5**.
  3. **Attract better-fit buyers, fewer tire-kickers.** Honest content and **self-service tools** let the wrong prospects rule themselves out and the right ones raise their hand ready to talk.
  4. **Shorten sales cycles and close more.** With **Assignment Selling**, buyers do the learning before the meeting, so your team spends time with informed, pre-sold prospects and wins more at higher margin.
  5. **Own your growth instead of renting it.** You build an asset your team controls, reducing dependence on ad spend and agencies that disappear the day you stop paying.
  6. **Align your whole company around growth.** Marketing, sales, and leadership work from one playbook and one scorecard, so effort stops leaking and results compound.

**Layout/components:** A clean 3×2 outcome-card grid on a `section--alt` surface, no borders, soft fills (reuse `sys-components`/`sys-comp` styling or a `media-card` variant). Tabler icons (e.g. `ti-search`, `ti-shield-check`, `ti-filter`, `ti-clock-bolt`, `ti-building-bank`, `ti-users-group`).

**Visual (placeholder):** Optional supporting frame to the side or above: `Gemini image — split "before/after" of a business owner: stressed at a desk chasing leads vs. confidently reviewing inbound opportunities. Subtle, tasteful, EC blue accents.` Or skip the image here and let the card grid carry it (recommended; the section is already dense).

**Motion:** Cards stagger-rise on scroll, once.

**Data/links:** Each framework mention (Big 5, Assignment Selling, self-service) links to its Core Concepts page for depth, keeping this section high-level while still being a launchpad.

---

### 5. How it works: four behaviors of known and trusted brands (high level)

**Purpose:** Answer "how does it actually work" without turning into a framework lecture. Reframe the Four Pillars as four *behaviors* a trusted brand practices, described as outcomes. This is the one place we sketch the mechanism, then immediately hand depth-seekers to Core Concepts.

**Copy:**
- Eyebrow: `How it works`
- H2: **Known and trusted brands do four things their competitors won't.**
- Anchor id: `how-it-works`
- Four behavior blocks (title + one short paragraph; one light framework mention each, max):
  1. **Say what others won't.** Answer the questions buyers really care about (cost, problems, comparisons, reviews, what's truly best) openly and honestly. We call the topics that move buyers most **The Big 5**.
  2. **Show what others won't.** Use video and a media-company mindset to build trust and human connection faster than text ever could, across the whole buying journey.
  3. **Sell how others won't.** Give buyers self-service tools and let content do the early teaching (**Assignment Selling**), so people arrive informed and your team sells with less friction.
  4. **Be more human than others.** Use AI and technology to deepen the human relationship, not replace it. By the time someone meets your team, they should feel like they already know you.
- CTA under the four: **Explore the Core Concepts & Frameworks** → `/learn/core-concepts-frameworks` (this is where Selling 7, the 5 Components, QQPP, the Scorecard, and the rest live in full).

**Layout/components:** Four numbered blocks (reuse `sys-pillars`). Keep copy tight; the depth lives one click away. This section is intentionally lighter than today's, which over-explained each pillar.

**Visual (placeholder):** A single code-built **system diagram** is the hero visual of this section: `Diagram — the four behaviors arranged around a center labeled "The most known, trusted & recommended brand in your market," with a light line-draw on scroll (page accent blue, per visual-style-guide §4). No emoji.` If a richer illustration is wanted later: `Gemini image — clean editorial illustration of the 4 Pillars as a simple architectural "trust" structure.`

**Motion:** Diagram line-draws in; behavior blocks stagger.

---

### 6. AI-first statement: the one dark framer moment

**Purpose:** The strategic centerpiece. Make EC unmistakably the system that helps you thrive as AI reshapes how buyers and machines decide who to trust. This is the single dark aurora `statement-panel` allowed on the page (visual-style-guide §5).

**Copy:**
- Eyebrow: `Thrive in an AI-first world`
- H2: **When buyers ask AI who to trust, you want to be the answer.**
- Body:
  > Search is becoming answers. Buyers now ask ChatGPT and AI search who is credible, who is worth calling, who to buy from. AI recommends the businesses that have published the clearest, most trustworthy answers in their market. That is exactly what Endless Customers builds. The same honesty that wins human trust is what makes AI cite and recommend you, so AI becomes a referral engine instead of a threat.
- Three short supports (icon + label + one line), framed as EC principles applied to AI:
  - **Get recommended by AI.** Become the brand AI search and chat tools cite and suggest in your category.
  - **Trust signals that compound.** The honest answers that win buyers are the same signals AI rewards.
  - **AI that makes you more human.** Use AI to create better, faster, without sounding generic or losing the human voice that closes.
- CTA: **See How We Help With AI** → `/how-we-help/ai` · secondary: **AI in the Endless Customers System** → `/learn/core-concepts-frameworks` (AI family)

**Layout/components:** Near-black `#0A0F1F` rounded `statement-panel`, restrained blue→magenta aurora behind floating content only (≥80% stays dark). Floating content = a crisp code-built "AI answer" mock: a stylized AI chat reply recommending "a business like yours" as the trusted local expert. Built in HTML/CSS, no invented readable brand names. This is the ONLY place blue+magenta appears as a glow.

**Visual (placeholder, for the floating card if not code-built):** `UI mock — stylized AI chat answer: user asks "who's the most trusted [roofer/accountant/etc.] near me?" and the AI replies recommending the reader's type of business, citing their honest content. Clean light card floating on the dark panel.`

**Motion:** Aurora static or very slow; the floating card rises in once. Calm, keynote-stage.

---

### 7. Why it's different: a system you own, not a campaign you rent

**Purpose:** Pre-empt the biggest mental objection ("isn't this just content marketing / another agency?"). Differentiate on ownership and durability. This is the "guide has a plan and a track record" beat.

**Copy:**
- Eyebrow: `Why it's different`
- H2: **It's a system your team owns, not a service you rent.**
- Three contrast points (kept light, not a heavy comparison table here; the full comparison lives at `/how-we-help/compare-your-options`):
  - **Built in-house, owned forever.** We coach your team to run it, so the capability (and the results) stay with you. Agencies leave; this doesn't.
  - **A complete system, not a tactic.** Content, website, sales, technology, and culture move together. One-off campaigns fade because they only touch one piece.
  - **Proven and specific.** Built on the best-selling *They Ask, You Answer*, evolved into Endless Customers, and run by 500+ companies across dozens of industries.
- Optional honest line: `It only works when leadership is all-in. When it becomes how your company sells and communicates, it compounds for years.`
- CTA: **Compare Your Options** → `/how-we-help/compare-your-options`

**Layout/components:** Three-up on a light surface, or a split with the book/credential visual. No borders.

**Visual (placeholder):** `Gemini image — the book "Endless Customers" beside a laptop showing a clean Learning Center, on a real desk. Or a credential strip: HubSpot Elite, two best-selling books, runs on EOS.` Small, grayscale-leaning, no border.

**Motion:** Points settle in once.

---

### 8. Proof: real companies, real numbers

**Purpose:** Believability. Cold visitors need evidence before they will consider the ask. Pull the strongest, lowest-risk proof; the deep case studies live on Success Stories.

**Copy:**
- Eyebrow: `Real results`
- H2 (`--lg`): **Companies thriving with Endless Customers.**
- Marquee quote (pattern interrupt): **"Endless Customers made me a millionaire."** — Ed McKnight, Opes Partners (confirm rights; fallback: Patrick Moorhead, Pricefx, "7x revenue growth," or Jeffery Linta, Linta Roofing).
- A slim count-up stat strip (4): `500+ companies` · `3–5× more qualified opportunities (typical)` · `400+ verified reviews` · `~90 days to first results`.
- An industries line to signal breadth (StoryBrand: prove it works for "someone like me"):
  > It runs across wildly different industries: home services, construction, manufacturing, retail, professional services, healthcare, education, and more. River Pools, Yale Appliance, Mazzella, RoofCrafters, and hundreds of others.
- CTA: **See Success Stories** → `/how-we-help/success-stories` · secondary: **Read 400+ Reviews** → `/how-we-help/reviews`

**Layout/components:** Big editorial pull quote on a calm surface, then the count-up strip (reuse the Academy/homepage count-up pattern), then a small logo row.

**Visual (placeholder):** `Logos — client logo row (grayscale, color on hover): River Pools, Yale Appliance, Linta Roofing, RetroFoam, RoofCrafters, Mazzella, etc. (SVGs are an open item; reuse homepage logo set).`

**Motion:** Quote draws in; numbers count up once; underline draws after each number lands.

**Data/links:** Numbers must reconcile with the homepage canonical set (500+ / 400+). Flag any page still saying 300+.

---

### 9. Who it's for: honest qualification

**Purpose:** Answer "is this for a business like mine" and pre-qualify. Self-selection is an EC principle, so practicing it here is on-brand and builds trust.

**Copy:**
- Eyebrow: `Who it's for`
- H2: **Built for businesses whose buyers do their homework.**
- Body:
  > Endless Customers works best when your customers research before they buy and trust drives the decision. We do our best work with companies roughly $3M to $100M in revenue whose leadership is ready to be more transparent than their competitors and wants to own their growth instead of renting it.
- A short two-column "great fit / not yet" honesty block (light, not harsh):
  - **A strong fit if:** buyers compare options before buying; you sell something considered; leadership will commit; you want an owned, lasting asset.
  - **Not yet, if:** you want a quick outsourced campaign; leadership won't engage; you need leads by Friday with no change to how you operate.
- Honest line + CTA: `Not sure you're a fit? We'll tell you straight.` → **See Who We Work With** → `/how-we-help/who-we-work-with` (and softly: **When It's Not Working** → `/how-we-help/when-its-not-working`)

**Layout/components:** Split: copy left, fit/not-fit columns or industry pill cloud right (reuse `industry-pill`). Light surface.

**Visual (placeholder):** Optional `Gemini image — a small range of industries (a roofer, an accountant, a manufacturer) to signal breadth.` Or skip; pills carry it.

**Motion:** Pills/columns stagger in.

---

### 10. How to start: three doors, low friction first

**Purpose:** Convert without demanding a sales conversation from a still-learning visitor. Mirror EOS's "implement on your own or with help" and Scaling Up's multiple entry paths. Lead with the free, self-serve option.

**Copy:**
- Eyebrow: `Where to start`
- H2 (`--lg`): **Three ways to start with Endless Customers.**
- Three cards:
  1. **See where you stand (free).** Run the free AI Diagnostic: enter your website and get an instant read on how visible and trusted you are with buyers and AI. `Get Your Free AI Diagnostic →` → `/diagnostic`
  2. **Learn the system (free).** Explore the Core Concepts & Frameworks, read the book, and listen to the podcast. `Explore the Concepts →` → `/learn/core-concepts-frameworks` (secondary links: `/learn/book`, `/learn/podcast`)
  3. **Get coaching.** Our flagship program. We coach your team to own the system. `See the Program →` → `/how-we-help/coaching-program`
- Quiet line under the cards: `Prefer to just talk it through? ` → **Let's Talk** → `/lets-talk`

**Layout/components:** Three cards, light surface, EC mark / tabler icons, no borders. The diagnostic card is visually primary (it is the lowest-commitment, highest-yield next step and our analog to EOS's free Organizational Checkup).

**Motion:** Cards stagger-rise; arrow nudges on hover.

---

### 11. FAQ: answer the objections (AEO block)

**Purpose:** Handle the nagging questions right before the close, and win AI citations with `FAQPage` schema. This is the second AEO money block after the definition. Each answer is a tight canonical paragraph that ends by linking to its one true home (per core-concepts-strategy: every question has one home).

**Copy (question set):**
1. **What is Endless Customers?** (reuse the canonical definition) → `/learn/core-concepts-frameworks` (what-is-ec record)
2. **How is this different from a marketing agency?** (We coach your team to own it; the capability stays with you.) → `/how-we-help/compare-your-options`
3. **Is this just "They Ask, You Answer" with a new name?** (It's the evolution: the same trust principle, expanded into a full system and rebuilt for an AI-first world.) → `/learn/book`
4. **Will it work for my industry and business?** → `/how-we-help/who-we-work-with`
5. **How does Endless Customers help with AI?** (AI visibility, AI-ready content, AI used safely.) → `/how-we-help/ai`
6. **How long until I see results?** (Quick wins in weeks; meaningful results around 90 days; mastery over 18–24 months.) → ties to the proof strip
7. **What does it cost / what's the ROI?** (Typical 3–5× qualified opportunities; pricing is transparent.) → `/how-we-help/coaching-program/pricing`
8. **Do I need to read the book first?** (No. Free preview and free concepts.) → `/learn/book`
9. **Do I have to do this with a coach, or can my team self-implement?** (Both work; coaching moves faster and stays truer.) → `/how-we-help/coaching-program`

**Layout/components:** Accordion (reuse the existing FAQ/`details` pattern), `FAQPage` JSON-LD. Keep to ~8–9; depth lives in Core Concepts.

**Motion:** Standard accordion; respects reduced-motion.

---

### 12. Final CTA: the close

**Purpose:** One clear ask, low-pressure, with the self-serve fallback for the not-yet-ready.

**Copy:**
- H2 (`cta-band__title`): **Ready to become the brand your market trusts?**
- Sub: `Run the free AI Diagnostic to see where you stand, or talk with our team about what Endless Customers could look like in your business. No pressure, no obligation.`
- Primary: **Get Your Free AI Diagnostic** → `/diagnostic`
- Secondary (`.btn--ghost` in white): **Let's Talk** → `/lets-talk`

**Layout/components:** Standard `.cta-band` dark chrome (NOT a second aurora panel; the AI section §6 is the one true Framer moment). If Bob wants the drama at the close instead, swap: make §12 the aurora panel and render §6 lighter. Flag for his call.

---

## 5. Visual & design-system compliance checklist (for the build)
- [ ] Built on the current master nav/footer (page already uses them; if rebuilt from `_template.html`, run `sync-nav.py` + `sync-footer.py`, never hand-edit inlined nav/footer).
- [ ] `body class="page-accent--blue"`.
- [ ] Promote a reusable `.ec-ph` image-placeholder component into `learn.css` (generalize the Academy `.acx-ph`): dashed-accent tag + prompt text, `aspect-ratio` per slot. Every placeholder carries its art prompt.
- [ ] Brand gradient on borders/lines/underlines only. No gradient text or button fills.
- [ ] Exactly one filled primary and one `.btn--ghost` secondary per section.
- [ ] Tabler icons + EC marks only. Zero emoji.
- [ ] Exactly ONE dark aurora `statement-panel` (the AI section). Hero and the standard `.cta-band` are separate allowed dark chrome.
- [ ] H1 length tier correct (`headline-long` for the current marketing line). H2s use `--lg` for centered full-width headers.
- [ ] Code-first graphics: the buyer-shift diagram, the 4-behaviors system diagram, and the AI "answer" mock are SVG/HTML, not generated images. Photos/illustrations use `.ec-ph` placeholders until real art exists.
- [ ] Motion: purposeful, ≤1.2s, physics easing, scroll-triggered plays once, final states in markup, respects `prefers-reduced-motion`. Animation colors use the page accent, never the brand gradient.
- [ ] Run the page through `design-qa.md` after build.

## 6. SEO / AEO / entity layer
- **Primary keyword / intent:** "what is endless customers" (branded/definitional) plus the conceptual long tail ("how to get more customers," "become the most trusted brand," "marketing in an AI-first world"). This page targets the branded-definition intent; conceptual queries are served by Core Concepts and routed here.
- **Title:** `What Is Endless Customers? The System to Become the Most Trusted Brand in Your Market` (front-load the entity; keep under ~60 chars where possible, current title is close).
- **Meta description:** keep the canonical-sentence style; ensure it matches the on-page definition.
- **Canonical entity sentence** appears verbatim in §3 and must match `/press`, `/for-ai-agents`, `/llms.txt`, and the Core Concepts "what is EC" record. One definition everywhere is how the entity locks in (entity-strategy doc).
- **JSON-LD:** add `FAQPage` (from §11), `Article`/`WebPage` with real author (Marcus Sheridan + IMPACT) and `dateModified`, and `BreadcrumbList`. Consider `DefinedTerm` for "Endless Customers" pointing to this page as the definition source. Keep the footer `Organization`/`Brand` graph.
- **AEO structure:** H1 is a question-style entity; §3 first sentence is the extractable canonical answer; §11 answers are quotable standalone paragraphs. This is the "They Ask, You Answer applied to ourselves" play.
- **Internal links in:** ensure nav "Start Here," homepage System section, Core Concepts hub, and the book page all point here as the canonical "what is EC" front door. Links out go to Core Concepts (depth), Diagnostic, Success Stories, AI Services, Who We Work With, Coaching.
- **Update `/llms.txt` and `/for-ai-agents`** to name this page as the canonical "what is Endless Customers" definition source.

## 7. Accessibility checklist
- [ ] One `<h1>`; logical `h2`/`h3` order; no skipped levels (the section stack above is already ordered).
- [ ] Skip link present (already in template); in-page anchor CTAs (e.g. "See How It Works") move focus to the target section, not just scroll.
- [ ] Color contrast ≥ 4.5:1 for text in both themes, including on the dark aurora panel (white text over ≥80% dark area; verify the floating-card text).
- [ ] All meaningful images get real `alt`; decorative frames/diagrams get `aria-hidden` or empty alt; the `.ec-ph` placeholder prompt text should not be read as content to AT (mark `aria-hidden` on the frame, since it's scaffolding).
- [ ] Count-up stats: render the final number in markup so it's correct without JS and for screen readers; animation is enhancement only.
- [ ] FAQ accordion uses native `<details>`/`<summary>` or proper `button` + `aria-expanded`; keyboard operable.
- [ ] All motion respects `prefers-reduced-motion` (line-draws, count-ups, stagger, aurora all reduce to final state).
- [ ] CTAs are real `<a>`/`<button>` with discernible names; "Let's Talk →" arrows are decorative (`aria-hidden`).
- [ ] Icon-only elements have accessible labels; external links carry the visually-hidden "(opens in new tab)" pattern already used in the footer.

## 8. What changes from today's page (the diff, plainly)
- **Add** a real problem section (§2) before any system talk; promote today's buried problem list into it.
- **Add** a clean, quotable definition block (§3) in the top third for AEO.
- **Add** the outcomes section (§4) as the new center of gravity. This is the biggest change and the one Bob asked for.
- **Demote** the framework detail: Four Pillars become four behaviors described briefly (§5); the 5 Components and implementation steps (Alignment Day / 90-Day / Scorecard) move OUT of this page into a one-line mention + a link to Core Concepts. Today's dedicated "5 Components" and "Implementation" sections are cut here (they over-explain for an intro).
- **Cut** the standalone Big 5 + Selling 7 framework cards. Big 5 and Assignment Selling and self-service are mentioned inside outcomes/behaviors; Selling 7 gets one passing mention only.
- **Add** the AI-first statement panel (§6) as the strategic centerpiece and only dark moment.
- **Add** a differentiation section (§7), real proof (§8), honest fit (§9), low-friction "how to start" (§10), and an AEO FAQ (§11).
- **Make it visual:** placeholders and code-built diagrams throughout, vs. today's near-all-text layout.
- **Rebalance CTAs:** lead with the free Diagnostic (low commitment) as the primary on-ramp; keep Let's Talk for the ready. Today's hero leads with "Learn the system — free," which is fine but the Diagnostic converts the unaware better.

## 9. Open items (need Bob's input or an asset)
1. **Marquee quote rights:** confirm "Endless Customers made me a millionaire" (Ed McKnight, Opes Partners) can run, or pick the fallback (Pricefx / Linta).
2. **Stat lock:** confirm `3–5× qualified opportunities`, `~90 days to first results`, and the canonical `500+ companies` / `400+ reviews` so this page is internally consistent and matches the homepage. Sweep any "300+" elsewhere.
3. **Hero visual:** photo direction (real owner/team vs. illustration) for the hero `.ec-ph` slot.
4. **AI mock:** approve a code-built "AI recommends a business like yours" card as the floating content in the dark panel (recommended) vs. a Gemini image.
5. **Dark-moment placement:** confirm the single aurora panel is the AI section (§6) with a standard dark final CTA, or swap the drama to the close.
6. **Diagnostic positioning:** confirm leading with the Diagnostic as the primary CTA over "Learn the system" / "Let's Talk."
7. **Logo set:** reuse the homepage client-logo SVGs here (shared open item).
8. **Depth-link target:** confirm Core Concepts pages exist (or are stubbed honestly) for every framework we link from here (Big 5, Assignment Selling, self-service, AI family) so no link dead-ends.

## 10. Build sequence (when approved)
1. Confirm copy and the §4 outcomes wording with Bob (this is the section that matters most).
2. Promote a reusable `.ec-ph` placeholder into `learn.css`; build the page section-by-section on the existing `svc-hero--learn` + `lc-wrap` shell.
3. Build the three code-first graphics (buyer-shift diagram, 4-behaviors system diagram, AI answer mock).
4. Drop in `.ec-ph` placeholders with art prompts for every photo/illustration slot.
5. Add JSON-LD (`FAQPage`, `Article`/`WebPage`, `BreadcrumbList`, optional `DefinedTerm`); update `<title>`/meta; update `/llms.txt` + `/for-ai-agents`.
6. Run `design-qa.md` and the accessibility checklist (§7); verify entity-sentence consistency across `/press`, `/for-ai-agents`, `/llms.txt`, Core Concepts.
7. Asset pass later: swap real photos/illustrations into the `.ec-ph` slots (Gemini), add real client logos, fill any video slot.
