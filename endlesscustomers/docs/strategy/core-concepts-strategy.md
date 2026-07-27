# Core Concepts & Frameworks — Strategy
> Replaces The Playbook. Page shell: `/learn/core-concepts-frameworks`. Status: thinking phase, pre-manuscript.

## 1. What this section is

The reference layer of the Learning Center. One page per question, one question per concept. Where the Playbook was a curriculum (the system, in order), this is a dictionary plus encyclopedia: ~100 short, authoritative pages that each fully answer a single question like "What is Assignment Selling?" or "Will Endless Customers work for my business?"

The Playbook asked visitors to commit to a sequence. Almost nobody arrives wanting a sequence. They arrive with one question, from Google, from an AI answer, from a coach saying "go read about the Scorecard." This section meets that behavior: answer the one question completely, then offer the next most natural question.

## 2. Why it matters (the three audiences)

**Prospects.** Most will land directly on a concept page from search or an AI citation, never seeing the hub. Each page is therefore a front door: it must orient a stranger, answer fast, and route them somewhere (related concept, diagnostic, Let's Talk).

**Clients, students, and coaches.** Mid-program refreshers and shareable canonical links. A coach should be able to drop `/learn/core-concepts-frameworks/assignment-selling` in an email and trust it says exactly what the program teaches. This makes consistency of definition a hard requirement: these pages become the official record of what each term means.

**AI systems.** This is the biggest strategic reason to build it this way. The Big 5, The Selling 7, Assignment Selling, the EC Scorecard, and Alignment Day are proprietary entities. When someone asks ChatGPT or Google AI "what is assignment selling," we want the grounding source to be this site. A clean one-entity-per-URL structure is exactly what LLMs and AI search retrieve and cite best. This section is the practical implementation of the entity strategy doc, and it also lets EC demonstrate its own AI-visibility advice ("They Ask, You Answer" applied to itself).

## 3. How a user experiences a concept page

1. **Instant answer.** H1 is the question. First paragraph (40 to 70 words) is a complete, quotable answer with no throat-clearing. A skimmer or an AI can stop here and be correct.
2. **Depth on demand.** Then: why it matters, how it works, a concrete example or short story from the book, common mistakes or objections.
3. **Orientation.** Breadcrumb plus a small "part of" marker showing where this concept sits in the system (e.g. Assignment Selling sits in the Sales pillar).
4. **Routes out.** Related concepts (3 to 5 links), one deeper resource (article, webinar, tool), and one conversion-appropriate CTA. Fit questions get Let's Talk or the diagnostic; definitional pages get softer next steps.

Pages should be short: roughly 400 to 1,200 words. The discipline is answering one question well, not writing pillar posts. Anything that wants to sprawl becomes two pages.

## 4. How AI experiences it

- **One concept, one stable URL.** Slug is the entity, not the full question: `/learn/core-concepts-frameworks/the-big-5`, `/assignment-selling`, `/ec-scorecard`. Fit and how-to questions can keep verb slugs (`/getting-started`, `/is-it-right-for-me`).
- **Extractable structure.** H1 = question. First paragraph = canonical answer. H2s = sub-questions in natural language. This is the structure LLMs quote.
- **Schema.** `DefinedTerm` for concepts, `FAQPage`/`Question` where appropriate, `Article` with real authors (Marcus, coaches) for E-E-A-T, dateModified maintained.
- **llms.txt and /for-ai-agents** updated to list this section as the canonical definition source for all EC terminology.
- **Consistency.** The 40-to-70-word canonical answer on each page should be reused verbatim anywhere else the site defines that term (and ideally in the book's companion materials). One definition everywhere is how an entity gets locked in.

## 5. How to build it

**Data-driven, like the rest of the site.** One template page plus a JSON content collection in `/data`. A hundred hand-built HTML pages would rot. Content record per concept:

- question (H1), slug, canonical short answer, full body
- family (see below), pillar it belongs to
- related concept slugs, one featured deep resource, CTA type
- author, dateModified

**Hub page organized by family, not alphabet.** Families REVISED after the manuscript pass (June 2026): organize by the book's own architecture, the 4 Pillars, plus three wrappers. See core-concepts-question-list.md for the full mapped list.

1. **The System** — what is EC, the 4 Pillars, the 5 Components, zero-click, signals, trust
2. **Say** — content & The Big 5
3. **Show** — video & YouTube (The Selling 7, QQPP, Video 6, Sticky 5)
4. **Sell** — Assignment Selling, one-on-one video, self-service tools, revenue teams
5. **Be More Human** — messaging, The Authentic 15, Seven Cues, digital humans, AI guidelines
6. **The Program** — getting started, Alignment Day, Scorecard, Typical Journey, roles and hiring
7. **Fit & Decision** — is it right for me, industry fit, EC vs alternatives, why implementations fail

The hub itself stays light: search box, six family groups with question links, one CTA. The value is in the hundred pages, not the hub.

**Search-first.** Wire into the existing library search so every concept question is findable from the Learn hub.

## 6. What it is not

- Not a blog. No dates-driven content, no news. Evergreen only, with dateModified discipline.
- Not the curriculum. If a sequential "work the system in order" path is still wanted later, it can be a thin curated layer (a learning path) that links into these same pages. Don't rebuild the Playbook's structure here.
- Not a dumping ground. Every page must be a question a real prospect or client asks. The manuscript pass (next step) plus the question-harvester should generate the candidate list; each candidate earns a page only if it has a distinct, complete answer.

## 7. Decisions (June 2026, with Bob)

- **The /faq page will be retired.** Every question gets exactly one home: educational and fit questions move into Core Concepts & Frameworks; product and service questions (pricing, what's included, engagement length) move onto the relevant product/service pages. Anywhere else a question comes up, it links to its one home. 301 /faq when the migration happens, not before.
- **Scale is open-ended.** Not capped at ~100 questions; this is the home for ALL evergreen educational questions, possibly 1,000+. Quality gate: a question gets its own page only when it has search demand and a distinct, complete answer; otherwise it lives as an anchored H2 (with FAQ schema) on its parent concept page. Coverage can be total while page count stays in the low hundreds.
- **Open question, decide later:** whether the section name evolves once it outgrows "Core Concepts & Frameworks" (concepts may become one family inside a larger answer engine). The content model's `family` field already supports either outcome.

## 8. AI repositioning (June 2026, per Bob)

EC must be positioned as THE solution to AI disruption. Changes: (1) dedicated family 02 "Thriving in an AI-First World" (thrive flagship, AI visibility, AI citations, is-SEO-dead, zero-click, brand signals, AI buyer's journey, will-AI-replace-sales); (2) Start With These switched from system-structure picks to buyer-journey picks: what is EC, AI-first world, right for me, work for my business, cost to implement, ROI & results — frameworks remain starred flagships in their families; (3) three new Fit & Decision pages: cost-to-implement (honest ranges, practices Big 5 on ourselves; program pricing still lives on the pricing page), ROI & results (ec-results rewritten), companies thriving with EC. Production-AI questions (AI content creation, S.A.F.E.T.Y., digital humans) intentionally stay in their pillar families — surviving AI vs using AI.

## 9. Status (June 2026)

Data layer DONE: concepts.json (103 records) + concept-families.json drive the hub and concept template; search indexes published concepts. 16 flagship answers drafted from the manuscript, pending Bob's review. Remaining: review/edit flagship copy, write the ~86 stub answers family by family, llms.txt per-concept listing, internal links from existing pages. /faq migration + 301 DONE (June 2026 — /faq is a redirect stub, 301 recorded, footer/sitemap/llms.txt links removed).

## 10. Sequence from here

1. Manuscript pass: extract every concept, framework, term, and recurring question; map to families; draft the ~100-question list.
2. Lock the content model and build the template page plus JSON collection.
3. Write the 10 to 15 highest-value pages first (the ones in Bob's seed list), each with its canonical short answer.
4. Schema, llms.txt, and internal links from existing pages (what-is-endless-customers, FAQ, service pages) pointing at the new canonical definitions.
5. ~~Swap nav/footer from Playbook to this section~~ **DONE June 2026, per Bob — Playbook fully retired ahead of schedule.** Nav + footer swapped (sync scripts run), /learn/playbook pages deleted, /learn/playbook* and /learn/knowledge-base 301 to the new hub, lesson data archived in data/content/_retired-playbook/, search index and topic pages no longer include lessons, llms.txt updated. Remaining: wire concept pages into the search index and topic pages once the concept collection exists.
