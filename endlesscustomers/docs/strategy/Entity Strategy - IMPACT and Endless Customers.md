# Entity Strategy: IMPACT + Endless Customers

**Owner:** Bob Ruffolo · **Last updated:** June 6, 2026
**Status:** /for-ai-agents page and /llms.txt built for v2 (June 6). Everything else below is the to-do.

This is the complete on-page and off-page plan to make search engines and AI platforms (ChatGPT, Perplexity, Google AI Overviews/AI Mode, Claude, Gemini) understand that endlesscustomers.com and IMPACT are one company, attribute Endless Customers correctly, and carry They Ask You Answer's decade of equity forward instead of losing it.

Research basis: 5 parallel research streams, ~25 primary sources, plus a live audit of both sites and all third-party records (June 6, 2026). Full source list at the end.

---

## 1. The strategy in four sentences

1. **One continuous entity, never two.** Every documented rebrand failure (Deepcrawl/Lumar, DJO/Enovis) came from the new brand forking into a separate entity; every success (Facebook/Meta) rewired the existing entity in place. Profiles get renamed, never duplicated. Old names become aliases, never orphans.
2. **One canonical sentence, everywhere.** LLMs learn entity relationships from co-occurrence in single sentences across many independent sources. Ours: *"Endless Customers is the business growth system from IMPACT, created by Marcus Sheridan and the team at IMPACT, and the evolution of their earlier framework They Ask, You Answer."*
3. **Succession, not replacement.** TAYA's ten years of citations in AI training data transfer to Endless Customers only if every surface frames EC as TAYA's evolution. Erase TAYA and base-model ChatGPT keeps recommending it with no idea EC exists.
4. **Retrieval first, training data second.** AI search answers (ChatGPT Search, Perplexity, AI Overviews) correct within weeks of fixing what Bing, Brave, and Google index. Base-model answers lag 6 to 18 months behind and only move with sustained third-party coverage volume. Both layers need work; the first proves progress while the second compounds.

The research also validated the brand move itself: "IMPACT" is unownable as an entity name (impact.com dominates, and it is also a marketing-tech company that AI models conflate with us; a French adtech firm owns the "impact-plus" Crunchbase slug). "Endless Customers" is distinctive, trademarked, and collision-free.

### The entity model (decision)

The v2 site already models this correctly in its footer schema and we are standardizing on it: **two connected nodes, one company.**

- `https://www.impactplus.com/#organization` = IMPACT, the company (legal entity, founding date, people).
- `https://www.endlesscustomers.com/#organization` = Endless Customers, typed Organization + Brand, with `parentOrganization` pointing at the IMPACT node. IMPACT points back via `brand` and `sameAs`.
- Both nodes share identical NAP (name conventions, 125 Commerce Court Suite 9, Cheshire CT 06410, +1-203-265-4377) and link to the same third-party profiles.
- If the company ever fully renames to Endless Customers, we rename the IMPACT node in place (keeping "IMPACT" as `alternateName`) rather than promoting the brand node. Same Wikidata item, same Knowledge Graph ID, same profiles.

---

## 2. ON-PAGE: endlesscustomers.com v2 (this build)

### Done (June 6)

- [x] **/for-ai-agents page** built on site template. Contains the canonical sentence, quick-reference entity facts, citation rules, disambiguation from impact.com / Impact Plus, and a full entity JSON-LD graph (IMPACT Organization with @id, EC Organization+Brand, Person nodes for Marcus and Bob, both Books with the EC book `isBasedOn` TAYA, Wiley as publisher).
- [x] **/llms.txt** at site root, per spec: entity statement up top, curated page manifest below. Honest note: log studies show major AI crawlers barely fetch llms.txt today; it is cheap insurance and is read by agentic tools (Claude Code, Cursor), not the main mechanism. The on-page prose and schema are the mechanism.

### To do before launch

- [ ] **Link /for-ai-agents in the footer** (Trust & Resources column) in `components/footer.html` and the inlined copies. Also link /llms.txt from the /for-ai-agents page (done on page; confirm the file deploys at root on HubSpot).
- [ ] **Add `"@id": "https://www.impactplus.com/#organization"` to the `parentOrganization` stub** in the footer Organization schema (`components/footer.html`), plus a `sameAs` on that stub. This closes the cross-domain @id loop.
- [ ] **Canonical sentence placement.** The exact sentence (or a close variant) must appear in the first third of: homepage, /team/about, /learn/what-is-endless-customers, /authors/marcus-sheridan, and the footer NAP block (current footer says "Endless Customers is an IMPACT company," which is good; keep it). Research: definitional openings lift AI citation rates ~14%, and 44% of ChatGPT citations come from the first third of page content.
- [ ] **Permanent succession page.** An evergreen, indexed page answering "What happened to They Ask, You Answer?" (suggested URL: /learn/they-ask-you-answer). Not a blog post; a permanent page with dates, both book titles, and the canonical sentence. impactplus.com has a blog post version; this becomes the canonical home and the blog post links to it.
- [ ] **FAQ page entries** (extraction-friendly, self-contained answers): "Is Endless Customers the same company as IMPACT?", "What happened to They Ask, You Answer?", "Who created Endless Customers?", "Is IMPACT a marketing agency?". Mark up with FAQPage schema.
- [ ] **Person pages.** /authors/marcus-sheridan exists; ensure Person schema with @id `...#person`, `worksFor` the IMPACT node, and sameAs to marcussheridan.com + LinkedIn. Create the equivalent for Bob (team page anchor is fine) with Person schema. No pronouns-only references in bios; "the Endless Customers framework," not "the framework."
- [ ] **Book page** (/learn/book): Book schema matching the /for-ai-agents graph (same @ids), publisher Wiley, `isBasedOn` TAYA. Verify and add the TAYA revised-edition ISBN to the TAYA Book node (left out pending verification).
- [ ] **robots.txt + sitemap.** Explicitly welcoming AI crawler section (or simply no blocks), and a `Sitemap:` line. The current HubSpot EC site has neither AI rules nor a declared sitemap.
- [ ] **Self-serving ratings.** Do not carry over the `aggregateRating` blocks (5/5 on the org, 4.9 on the book) unless real reviews render on-page. Policy risk; Google ignores or flags them.
- [ ] **Authorship string.** Decide the canonical credit, recommended: "Marcus Sheridan and the team at IMPACT" (matches the audiobook and paperback). Use it on the book page, schema, and everywhere the book is mentioned.

---

## 3. ON-PAGE: impactplus.com (current live site, fix now, don't wait for v2)

These are bugs feeding wrong data to AI systems today. About a week of work.

- [ ] **Add `"@id": "https://www.impactplus.com/#organization"`** to the Organization schema. endlesscustomers.com already points at this @id; right now the reference dangles.
- [ ] **Fix `Founder` → `founder`** (capital F is invalid schema). And fix the facts: Bob is the 2009 founder; Marcus is a partner who merged in 2018. Your own about page says so; the schema contradicts it.
- [ ] **Fix `legalName`.** Currently "IMPACT"; the legal entity is Impact Branding & Design LLC. Use the real name or drop the property.
- [ ] **Add the Cheshire address** to the Organization schema (it is only in the footer HTML today).
- [ ] **One LinkedIn URL.** Your properties use three different forms (numeric ID, legacy `impact-branding-&-design-llc` slug, `impactbnd`). Standardize on `linkedin.com/company/impactbnd` everywhere.
- [ ] **Add `brand` + `sameAs` to endlesscustomers.com** in the Organization schema, and `alternateName: ["IMPACT Branding & Design", "IMPACT Plus"]`.
- [ ] **Fix the about page.** `/about-us` 404s (AI agents guess that URL first); 301 it to `/impact-company-profile`. Rewrite the meta description, which still says "inbound marketing and HubSpot Elite Solutions Partner agency" and directly contradicts the "we are not an agency" positioning. AI summaries quote meta descriptions.
- [ ] **Remove or substantiate the aggregateRating** (5/5, 163) in the Organization schema.
- [ ] **Refresh stale EC-site content** until v2 ships: the current endlesscustomers.com homepage still shows "Pre-order today" bonuses dated March/May 2025.
- [ ] **llms.txt touch-up:** the existing impactplus.com llms.txt is good; fix the podcast link (points to Podbean instead of the canonical podcast URL) and add a line pointing at endlesscustomers.com/llms.txt as the brand manifest.

---

## 4. OFF-PAGE: citation and profile cleanup (the NAP work)

Rule for every record: **rename and correct in place, never create a duplicate.** Every description should contain the canonical sentence or a tight variant. Target state for names: "IMPACT" (company records) with Endless Customers referenced in the description, until any future full rename, which then happens in place with "formerly IMPACT" retained.

| Property | Current state (audited June 6) | Action |
|---|---|---|
| **LinkedIn company page** (linkedin.com/company/impactbnd) | Active, named IMPACT | Keep as the company page. Add canonical sentence to the About section. This is the #2 most-cited domain in AI answers for B2B; treat the About text as entity copy. |
| **LinkedIn Endless Customers page** (linkedin.com/company/endless-customers) | Active, posting | Keep as the brand page, but its About section must open with the canonical sentence so it corroborates instead of forking the entity. |
| **Crunchbase** (crunchbase.com/organization/impact-branding-design) | Still describes inbound marketing agency services | Claim/update: description with canonical sentence, current leadership, Cheshire address, both websites. Note: `/organization/impact-plus` is the French adtech firm, not us. |
| **BBB** | Two profiles, both categorized "Web Design" | Merge to one, recategorize (business coaching/training), update name format and description. |
| **ZoomInfo** | Two records, stale New Haven address, "$2M revenue, 30 employees" | Claim via ZoomInfo's brand management, merge, correct address/size/description. |
| **Glassdoor** | "IMPACT: Coaching and Training for Endless Customers" | Good name; verify description carries canonical sentence. |
| **Yelp** | "IMPACT," Cheshire, category Marketing | Update category and description. |
| **Datanyze / PrivCo / Comparably / Zippia / Bloomberg** | Old name "Impact Branding & Design LLC," stale facts | Request corrections where claimable; low priority but they feed AI cross-referencing. |
| **Google Business Profile** (Cheshire listing) | "IMPACT: Coaching & Training for Endless Customers" | Keep, never recreate (recreating forfeits reviews/history). Ensure website field, category, and description are current. |
| **Amazon / B&N / Goodreads / Audible book pages** | Hardcover credits Marcus only; paperback/audio credit "Marcus Sheridan; The Team at IMPACT" | Through Wiley and author central accounts, align descriptions to the canonical sentence and consistent authorship credit. Goodreads author profile still TAYA-era; update bio. |
| **G2 / Clutch / UpCity** | Not audited as claimed | Claim listings in coaching/consulting categories. Review platforms multiply AI citations (domains present on review platforms average ~3x the citations). Ask happy clients for reviews that naturally mention "Endless Customers." |
| **Social handles** | Mostly @impactbnd | Keep; EC-branded handles already exist for the brand. Bios on every profile get the canonical sentence. |

**Sequencing note from the rebrand research:** when you eventually make any major naming change, update every controlled source within 48 to 72 hours of the change, not over weeks. Slow, uncoordinated updates are what produced dual knowledge panels in the documented failures. Build the source inventory now (the table above is the start; expect 30 to 40 total URLs including directories and podcast profiles).

---

## 5. OFF-PAGE: Wikidata and Wikipedia

**Current state: nothing exists.** No Wikipedia article and no Wikidata item for IMPACT, Marcus Sheridan, TAYA, or Endless Customers. Given Wikipedia is the #1 cited domain in ChatGPT answers and Wikidata feeds Google's Knowledge Graph and LLM training, this is the single biggest gap. Marcus already has a Google knowledge panel, which helps corroborate.

### Wikidata (do now; bar is low)

Wikidata requires "verifiable existence," not fame. ISBNs, bestseller listings, Crunchbase, and press clear it. Create five interlinked items:

1. **Marcus Sheridan** (person): occupation author/speaker; reference marcussheridan.com, book records, press.
2. **They Ask, You Answer** (book): `author` → Marcus item; `publisher` → Wiley (existing item Q1479654-class; use the real Wiley item); ISBN; publication dates 2017/2019.
3. **Endless Customers** (book): `author` → Marcus; `publisher` → Wiley; ISBN 978-1-394-28278-4; `follows` → TAYA item (this property is the machine-readable succession claim); reference the bestseller listing.
4. **IMPACT** (organization): legal name Impact Branding & Design LLC; `founded by` → Bob item; inception 2009; HQ Cheshire CT; official websites both domains; reference Crunchbase, state business registry, press.
5. **Bob Ruffolo** (person): CEO/founder; `employer` → IMPACT item.

Rules: use a disclosed account (note the affiliation on the user page), add a reference for every statement, keep descriptions flat and factual. Never use a paid Wikipedia/Wikidata mill; detected COI editing gets reverted and is reputationally worse than absence. Once items exist, add their QID URLs to the `sameAs` arrays on both sites.

### Wikipedia (slower play; do not gate anything on it)

Notability must be earned through independent coverage, and COI rules require going through Articles for Creation with disclosure rather than writing it ourselves.

- **Best first candidate: They Ask, You Answer** (the book). WP:NBOOK wants 2+ non-trivial independent published pieces about the book. A decade of coverage exists; collect the strongest independent reviews/coverage before drafting.
- **Second: Marcus Sheridan** (person). The River Pools story's major-press coverage is the anchor (verify the specific citations when drafting).
- **The company article: optional or never.** WP:NCORP is the strictest guideline and explicitly heightened against marketing/PR sourcing. IMPACT can live as a Wikidata-only entity indefinitely; that is enough for Knowledge Graph purposes.
- Process: neutral draft via AfC, full COI disclosure, only independent sources cited. If declined, accumulate coverage and retry later. Realistic timeline: 12 to 24 months of earned coverage for a clean approval.

---

## 6. OFF-PAGE: press, content, and community signal

- [ ] **Bridge placements (month 1 after v2 launch):** 5 to 10 third-party articles/podcast appearances whose copy uses both names in one sentence ("Endless Customers, the evolution of They Ask You Answer from Marcus Sheridan and IMPACT"). Single-sentence co-occurrence across independent sources is literally how LLMs learn entity bridges.
- [ ] **Sustained cadence (months 2 to 6):** 2 to 4 earned mentions per month of "Endless Customers by IMPACT" in the publications and platforms AI cites for our category: LinkedIn (now #1 for B2B citations), marketing trade press, podcasts with published transcripts.
- [ ] **Reference remediation beats volume.** Run "They Ask You Answer" and "IMPACT marketing" queries through ChatGPT Search and Perplexity; list the specific third-party pages they cite; get those updated with succession language. One cited 2019 article matters more than fifty new low-authority posts. Certified-coach and partner sites describing themselves as "They Ask You Answer certified" are a priority surface; give partners updated boilerplate.
- [ ] **YouTube and podcast discipline.** YouTube mentions showed the strongest single correlation with AI visibility in Ahrefs' 75K-brand study (0.737), and transcripts are training data. Standard intro/outro language on every episode and keynote recording: the canonical sentence. Update channel About sections.
- [ ] **Reddit/Quora presence, organically.** Threads comparing "Endless Customers vs They Ask You Answer" in marketing subreddits are exactly the community-validated succession evidence models trust. Encourage real practitioners (coaches, certified partners, book readers) to participate authentically. Do not astroturf; promotional posts get filtered and it poisons the well.
- [ ] **Wiley coordination.** Ask the publisher to align the book's metadata and retail descriptions with the canonical authorship credit and the TAYA succession line. Publisher metadata propagates to library records, Google Books, and retailer pages, all of which are entity corroboration.

---

## 7. Migration mechanics (when impactplus.com content moves)

- Migrate **in sections** with per-section, path-preserving 301s (Google officially sanctions phased moves). Each new URL self-canonicals. While a page intentionally exists on both domains, cross-domain `rel=canonical` to the EC version, then 301 when the old page retires.
- **Don't stack risks.** A domain move plus a redesigned information architecture is the documented higher-risk combo (Google "needs to relearn"). Where possible, keep URL paths parallel; where the IA changes, accept the relearn cost knowingly. Benchmarks: even competent migrations average 20 to 40% temporary traffic dip; the 892-migration dataset averaged ~17 months to full recovery; phased section moves and 1:1 path mapping is how you land on the short end (best documented cases: under 5 weeks).
- Update both XML sitemaps at each phase (old domain's sitemap keeps listing redirected URLs so Google discovers the 301s faster).
- **Search Console Change of Address only at full cutover,** if ever. It is domain-level, incompatible with a partially live old site, and forwards signals for 180 days.
- **impactplus.com never goes dark.** It stays registered and redirecting indefinitely, with a plain crawlable explanation at the root ("IMPACT is the company behind Endless Customers; this content now lives at endlesscustomers.com"). The documented anti-pattern is the old domain left semi-live without redirects (DJO/Enovis: duplicate knowledge panels).
- Keep the 301 map in `redirects-301.csv` (already started in this repo) as the single source of truth.

---

## 8. Monitoring and expectations

**Weekly prompt panel** (run in ChatGPT base + ChatGPT Search + Perplexity + Google AI Mode; log answers and cited sources):

1. What is Endless Customers?
2. Who created Endless Customers?
3. What company is behind Endless Customers?
4. Is Endless Customers the same as IMPACT?
5. What happened to They Ask, You Answer?
6. What replaced They Ask You Answer?
7. Who is Marcus Sheridan?
8. What does IMPACT (impactplus.com) do?
9. Best coaching programs for the Endless Customers / They Ask You Answer approach
10. Endless Customers vs They Ask You Answer, what's the difference?

**Diagnostic thresholds** (from the rebrand research):

- If live-retrieval answers (Perplexity, ChatGPT Search, AI Overviews) still get the relationship wrong **4 weeks** after the on-page work ships: it is an implementation bug or a contradicting cited source. Find the source, fix it.
- If base models still miss the association at **12 months**: the fix is more third-party coverage volume, not patience.
- Success markers: one knowledge panel (not two), correct parent attribution in AI answers, "Endless Customers" answers that mention IMPACT unprompted.

**Honest timeline:** retrieval-layer answers correct in 1 to 2 months. Base-model parametric answers lag 6 to 18 months (training cycles) with full displacement of stale TAYA-only associations in 12 to 24 months of sustained signal. Content shipped now feeds the 2026 to 2027 training runs, which is why none of this waits for a "perfect" v2 launch.

---

## 9. Sequence summary

| Phase | When | Work |
|---|---|---|
| **0. Fix the live sites** | Now, ~1 week | Section 3 (impactplus.com schema/about fixes), llms.txt touch-up, stale EC-site content |
| **1. v2 launch package** | With launch | Section 2 checklist: footer @id, canonical sentence placement, succession page, FAQs, Person/Book schema, robots/sitemap, /for-ai-agents + /llms.txt live |
| **2. Off-page wave** | Launch + 90 days | Section 4 profile cleanup, Section 5 Wikidata cluster, Section 6 bridge placements + reference remediation; monitoring panel running weekly |
| **3. Content migration** | Months 3 to 12 | Section 7 phased moves; sustained press cadence; Wikipedia AfC when coverage supports it |
| **4. End state** | When EC is established | Any full company rename happens in place (same profiles, same Wikidata item, "IMPACT" as alternateName); impactplus.com redirects forever |

---

## Key sources

Google: [AI features](https://developers.google.com/search/docs/appearance/ai-features), [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization), [Site moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes), [Change of Address](https://support.google.com/webmasters/answer/9370220) · [SEJ 892-migration study](https://www.searchenginejournal.com/study-how-long-should-seo-migration-take/492050/) · [Kalicube rebrand/knowledge panel case studies](https://kalicube.com/case-studies/knowledge-panel/rebranding-your-company-name-learn-how-to-keep-your-digital-brand-equity-strong/) · [Maria Dykstra: AI visibility after a rebrand](https://mariadykstra.com/ai-visibility-after-a-rebrand/) · [Ahrefs on llms.txt](https://ahrefs.com/blog/what-is-llms-txt/) · [OtterlyAI llms.txt log study](https://otterly.ai/blog/the-llms-txt-experiment/) · [SEL: schema in AI search](https://searchengineland.com/schema-markup-ai-search-no-hype-472339) · [iPullRank: AI search entity recognition](https://ipullrank.com/ai-search-entity-recognition) · [Profound 30M-citation study](https://www.tryprofound.com/blog/ai-platform-citation-patterns) · [Contently: top sources LLMs cite](https://contently.com/2026/04/29/top-sources-llms-cite/) · [Kevin Indig citation research](https://www.growth-memo.com/p/the-alpha-is-not-llm-monitoring) · [Wikidata:Notability](https://www.wikidata.org/wiki/Wikidata:Notability) · [Wikipedia:Notability (books)](https://en.wikipedia.org/wiki/Wikipedia:Notability_(books)) · [Wikipedia:Notability (organizations)](https://en.wikipedia.org/wiki/Wikipedia:Notability_(organizations_and_companies)) · [Yoast cross-domain Organization pattern](https://developer.yoast.com/features/schema/pieces/organization/) · [Momentic on @id](https://momenticmarketing.com/blog/id-schema-for-seo-llms-knowledge-graphs) · [Venue: Meta/X/BB&B migration playbook](https://venue.cloud/news/insights/rebrand-without-losing-traffic-seo-lessons-from-meta-x-and-bed-bath-beyond) · [Sterling Sky GBP rebrand checklist](https://www.sterlingsky.ca/rebranding-your-business-checklist/) · [LinkedIn page rename policy](https://www.linkedin.com/help/linkedin/answer/a566295) · [SE Ranking ChatGPT optimization study](https://seranking.com/blog/how-to-optimize-for-chatgpt/)

*Verification note: the widely repeated "23% / 41% post-rebrand error rate" statistic traces to a single unverified citation chain and was excluded from this plan's reasoning. The "Endless Customers Live" conference, Hartford and Chicago dates, diagnostic tool, and coaching URLs referenced in the new page reflect the v2 site spec; confirm before launch. The TAYA revised-edition ISBN still needs verification before adding to schema.*
