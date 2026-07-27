# Knowledge Base — Architecture Strategy

> Companion to `site-spec.md` §5.5. This doc codifies the Knowledge Base architecture as built (June 2026), after the full migration of ~85 articles from the standalone emdash/Astro prototype into Website v2. The prototype is retired; this is the canonical version.

---

## 1. What the Knowledge Base Is

The Knowledge Base is the **canonical definition layer** for everything Endless Customers. It is where a concept officially lives. Recent Insights talk *about* the concepts; the Knowledge Base *is* the concepts.

It serves three jobs at once (in priority order):

1. **AEO — be the cited source.** When anyone (or any LLM) asks "what is the Big 5?" or "what is assignment selling?", the answer should be sourced from EC's own pages. These are terms EC invented; EC should be the authority answer engines quote.
2. **Assignment selling.** Every article is a stable, ungated URL a coach or sales rep can assign as homework. The KB is a selling tool as much as a content asset.
3. **Organic search.** Definitional queries pull new audiences into the funnel.

The unifying test: **an article belongs in the KB only if it would still be true and useful in three years.** No news, no dates in titles.

---

## 2. The Architecture (as built)

The KB is organized around the Endless Customers system itself. A persistent left sidebar is the spine of the section, with three zones:

**Zone 1 — Start Here.** "What is Endless Customers?" as the single entry-point article, plus the "Thrive in the Age of AI" mini-section (AI content workflows, AI avatars, recommended AI tools).

**Zone 2 — Curated Learning Paths.** Role-based reading lists over existing articles: For Business Owners & CEOs, For Sales Leaders, For Marketing Leaders. Paths never duplicate content; they sequence it. Defined in `data/taxonomy/kb-paths.json`.

**Zone 3 — The Principles & Frameworks.** Nine sections in reading order:

| # | Section | What lives there |
|---|---|---|
| 1 | The Foundation | Why growth is harder, how buyers buy, They Ask You Answer, zero-click search, the 4 Pillars, the 5 Components, fit/requirements, the Cost of Inaction (the "Anchor" article) |
| 2 | The Right Content | The Big 5 (+5 children), the Selling 7 (+7 children), Video (+4 children incl. the Sticky 5), the Content Team (+3 children), pricing page, Be More Human, AI for content |
| 3 | The Right Website | Learning Centers, Self-Service Tools (+5 children), messaging, trust signals, websites in the age of AI, optimization |
| 4 | The Right Sales Activities | Sales process, Assignment Selling, 1:1 video, on-camera performance |
| 5 | The Right Technology | Agentic AI, CRM, martech, AI for marketing & sales, analytics |
| 6 | The Right Culture of Performance | Alignment, revenue teams, ongoing learning, the S.A.F.E.T.Y. Framework |
| 7 | Planning Your Investment & ROI | Expected investments, expected ROI, what great companies look like |
| 8 | Putting It All Together | The typical journey, Alignment Day, the Scorecard, quarterly planning, the Pride Cycle |
| 9 | Support & Community | Coaching, EC Live, Academy |

The key structural idea: **the framework canon nests inside the 5 Components rather than sitting in its own cluster.** Sections 2 through 6 ARE the 5 Components, so learning the structure of the KB teaches the structure of the system. Named frameworks with N parts get a parent article plus N children (Big 5 → 5, Selling 7 → 7), which gives every concept its own canonical URL while keeping the hierarchy legible.

**Deferred from the prototype:** the nine industry hubs (Builders & Trades, Business Services, etc.). They were scaffolded with zero pages on the old site; they return when industry-specific content exists to fill them. Learning paths cover the routing need until then.

---

## 3. Page System

Four templates, all on the cms.js engine, all sharing the sticky sidebar:

- **Hub** (`/learn/knowledge-base`) — hero with live guide count, featured guides ("The Anchor · Read first" = The Cost of Inaction), learning path cards, numbered browse-by-topic grid, recently-updated list.
- **Section pillar** (`topic.html?id=`) — curated-by Marcus / reviewed-by Ashley strip with headshots, guide count + total reading time + last-reviewed date, article rows with child chips, "Up next" pointer to the following section.
- **Article** (`article.html?id=`) — section eyebrow, title, dek, byline/freshness/read-time strip, "What you'll learn" takeaways box, "On this page" TOC, "In this guide" children nav, body, E-E-A-T strip, prev/next across the full KB reading order, FAQ accordion, related Insights, diagnostic CTA. Stub articles render a "coming soon / on the editorial calendar" notice.
- **Learning path** (`path.html?id=`) — numbered reading list with per-article and total read times.

Data model: articles in `data/content/evergreen.json` (with `nav_title`, `nav_order`, `what_youll_learn` added by the migration); section and path metadata in `data/taxonomy/kb-sections.json` and `kb-paths.json`. Sections double as topic IDs in `topics.json` so the rest of the site can tag against them.

---

## 4. AEO Playbook (unchanged, now enforced by the templates)

1. **Canonical definition up top.** Every canon article opens with a self-contained, quotable definition that survives being lifted out of context.
2. **One consistent definition everywhere.** The same one-sentence definition of each concept is used site-wide. (Open item: a `definitions.json` source of truth.)
3. **`key_questions` on every article** → FAQPage schema. Migrated articles carry 4-6 each.
4. **Freshness as a discipline.** `last_updated` renders on every page and the hub surfaces "recently updated." Canon articles get reviewed every 6 months minimum.
5. **E-E-A-T on the heaviest pages.** Author + "Reviewed by" editor on every article; curator/reviewer strip on every section pillar.
6. **Never gated, always indexable.** Offers are promoted beside content via related blocks, never in front of it.

---

## 5. Internal Linking Rules

1. **First-mention rule.** Anywhere on the site a named concept first appears on a page, it links to its canonical KB article.
2. **Within a section:** children ↔ parent ↔ pillar; breadcrumbs render the full hierarchy; prev/next stitches the whole KB into one continuous reading order.
3. **Insights ↔ KB.** Twice-weekly Insights deep-link into the KB (`related_evergreen_ids`); KB articles surface recent Insights on the same topic, so evergreen pages always show fresh activity.
4. **KB → revenue, contextually.** Every article ends at the diagnostic or a coaching conversation, framed as the next step rather than an interruption.

---

## 6. Assignment Selling Requirements

Stable URLs forever (301s mandatory if structure changes). Self-contained articles that work as a cold first touch. 5-10 minute read times; anything longer becomes a parent with children. Assignable units match sales moments: cost content before a pricing call and comparison content before a competitive eval stay separate articles.

---

## 7. KB vs. Recent Insights

| | Knowledge Base | Recent Insights |
|---|---|---|
| Question it answers | "What is X and how does it work?" | "What's happening now?" |
| Shelf life | Years; actively maintained | Point in time |
| Voice | Definitive, institutional | Conversational, hosted |
| Volume | Capped (~100–200) | Unbounded, twice weekly |

Routing rule: if it needs a rewrite within a year, it's an Insight. If it defines a durable concept, it's KB. The KB is deliberately capped; new article proposals must beat "does this belong inside an existing article?"

---

## 8. Content Punch List (post-migration)

The structure is complete; these are content gaps, not architecture gaps:

1. **15 stub articles** need writing (visible as "Coming soon" in their sections): increasing-ai-visibility, websites-in-the-age-of-ai, ai-chats-and-voice-agents, vibe-coding-self-service-tools, agentic-ai-and-endless-customers, the-safety-framework, all three Planning Your Investment articles, all three Support & Community articles, and all three Thrive in the Age of AI articles. The Planning and Foundation-adjacent ones are highest value.
2. **Three drafts** held back from publishing: Website Navigation, Website Readiness, Website Analytics.
3. **`/learn/what-is-endless-customers` overlap**: the static marketing page and the KB's Start Here article target the same query. The KB version currently carries the static page's content. Decide which is canonical before launch (recommendation: marketing page targets conversion intent and links to the KB article as the definitional source).
4. **Industry hubs** (phase 2): reintroduce the prototype's nine industry sections once industry-specific articles exist.
5. **`definitions.json`**: extract the one-sentence canonical definitions into a single source templates can pull from.
6. **Review cadence ownership**: assign the 6-month canon review cycle.

---

## 9. HubSpot Migration Notes

Articles = one CMS/HubDB Knowledge Base collection (same as the rest of the mock CMS mapping in site-spec §8). `kb-sections.json` and `kb-paths.json` = two small HubDB tables. The `?id=` templates map to dynamic pages at `/learn/knowledge-base/[topic]/[slug]` and `/learn/knowledge-base/path/[slug]`. Sidebar renders from the same two tables server-side.
