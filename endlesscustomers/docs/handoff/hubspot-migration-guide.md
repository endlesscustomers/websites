# HubSpot CMS Migration Guide

This is the build playbook for taking the static prototype in this repo and rebuilding it on HubSpot CMS. The prototype was intentionally structured to make this mapping direct: the mock CMS in `js/cms.js` mirrors HubSpot concepts, content lives in JSON collections, forms already carry real HubSpot `form_id`s, and URL moves are pre-logged.

Read `../reference/site-spec.md` (architecture, URL structure, content schemas, decisions log) and the root `README.md` (how the prototype works) before starting.

> **Approach not yet decided.** Two valid paths are described below: a **custom theme with modules** and a **HubDB-driven** content model. They are not mutually exclusive. The recommendation is a custom theme for layout and the marketing pages, plus HubDB for the data-driven Learn collections. Pick per section using the decision guide at the end.

---

## 1. What maps to what

| Prototype (here) | HubSpot CMS |
|------------------|-------------|
| `_template.html` | Base template + a theme with header/footer partials |
| `components/nav.html`, `components/footer.html` | Global content (header/footer) + Menus, or theme partials |
| `css/main.css`, `css/learn.css` | Theme CSS (`main.css` in the theme, `learn.css` scoped to Learn templates) |
| `js/main.js`, `js/cms.js`, `js/learn-nav.js` | Theme JS; `cms.js` logic is replaced by HubL + HubDB/Collections |
| Page directories with `index.html` | Site pages / landing pages |
| `data/content/*.json` | HubDB tables (or CRM objects / Collections) |
| `data/taxonomy/*.json` | HubDB tables referenced by relation, or multi-select option sets |
| `?id=slug` detail pages | Dynamic pages backed by a HubDB table |
| `EC.markdown` rich text | Rich text fields / HubL `|safe` rendering |
| `EC.setSEO` + JSON-LD | Page SEO fields + a structured-data module |
| `redirects-301.csv` | URL Mappings (Settings > Website > URL Redirects) |
| Mock forms with `form_id` | Real HubSpot forms via the form embed/module |

---

## 2. Theme and templates (the custom-theme path)

Build one HubSpot theme that owns the design system.

1. **Theme setup.** Create a theme folder in the Design Manager (or via the HubSpot CLI / `@hubspot/cli` and local development). Port `css/main.css` as the theme stylesheet. Define `theme.json` fields for the few tokens that should be editable (brand colors, fonts). General Sans is loaded via Fontshare today; keep that link or self-host the font files in the theme.
2. **Base template.** Recreate `_template.html` as the base template. The header and footer become global partials. The theme toggle and the nav/footer injection in `js/main.js` are replaced: in HubSpot the header/footer render server-side, so the runtime fetch-and-inject pattern goes away entirely (along with the inlined fallback copies and the sync scripts).
3. **Menus.** Rebuild the nav and footer link structure as HubSpot **Menus** so editors can manage them. The structure is **locked** per `../reference/site-spec.md`; match it exactly. All labels are Title Case.
4. **Marketing pages.** Pages like the homepage, `how-we-help/*`, `live/*`, `team/*`, and the legal/policy pages become standard HubSpot pages built from modules. Convert recurring page sections (hero, card grids, CTA bands, comparison tables) into reusable **custom modules** so editors can compose pages without a developer.
5. **Design rules to preserve** (from `../reference/design-qa.md` and `../reference/visual-style-guide.md`): the brand gradient is for borders/lines/underlines only (never text or button fills); the one secondary button is `.btn--ghost`; H1 sizing uses length tiers; media uses rounded corners + shadow, no borders. Bake these into modules so they cannot be violated by content editors.

---

## 3. The Learn section (the HubDB / dynamic-pages path)

The Learn section is the part that most benefits from a data-driven model. The prototype already treats it that way.

**Content collections** in `data/content/`:

- `insights.json` (insights AND podcast episodes are the same type; `/learn/podcast` is a filtered view, not a separate collection)
- `concepts.json` (Core Concepts & Frameworks)
- `offers.json` (tools / lead-gen offers)
- `services.json`
- `success-stories.json`
- `webinars.json`
- `people.json` (coaches, providers, staff, and guests, differentiated by a role field)

**Taxonomies** in `data/taxonomy/`: `topics.json`, `formats.json`, `industries.json`, `concept-families.json`, `success-services.json` (plus retired `kb-*`).

Migration steps:

1. **One HubDB table per collection.** Mirror the JSON field names so the mapping is auditable. Use a HubDB **dynamic page** template per collection. The prototype's `?id=slug` detail URLs become clean dynamic-page paths (e.g. `/learn/recent-insight/<slug>`); log the change in `redirects-301.csv` if the public URL shape shifts.
2. **Taxonomies as related tables or option sets.** Topics, formats, and industries become either their own HubDB tables (referenced by foreign column) or multi-select columns. The prototype's `indexBy`/`resolve` helpers correspond to these relations.
3. **Filtered views.** `/learn/podcast` and topic/format/industry filter pages are dynamic listing pages with a HubL query against the same table, not new content. Reproduce the filter UI as a listing module.
4. **Rich text.** Fields rendered through `EC.markdown` today become rich-text columns; render with HubL.
5. **Retired content.** Do **not** migrate `data/content/_retired-playbook/`. It is the old Knowledge Base, replaced by Core Concepts & Frameworks.

> If the team prefers, several of these (especially `people.json` and `success-stories.json`) could be modeled as **CRM custom objects / Collections** instead of HubDB, which gives association management at the cost of more setup. HubDB is the lower-friction default and matches the prototype most directly.

---

## 4. Forms

Forms in the prototype are mock (no submit) but each carries a real HubSpot `form_id`. During migration, replace each mock form with the real HubSpot form (form module or embed) using its existing `form_id`. Grep the page files for `form_id` to find every instance. Verify the live form's fields match what the page expects.

---

## 5. SEO and AI-entity layer

This site carries deliberate structured data; preserve all of it.

- **Per-page JSON-LD.** Today injected by `EC.setSEO`. In HubSpot, render JSON-LD from a structured-data module or template block, populated from page/HubDB fields. Do not drop it.
- **`/for-ai-agents/`** entity graph and **`/llms.txt`** at the root. Recreate these as published pages/files at the same paths. `llms.txt` must be served from the site root.
- **Sitemap.** HubSpot generates its own sitemap; retire the static `sitemap/` once HubSpot's is verified.
- **Entity sweep.** When page names, pricing, or org facts change during migration, update JSON-LD, `/for-ai-agents/`, and `/llms.txt` together. See the "Entity strategy" notes in `TODO.md`.

---

## 6. Redirects

`redirects-301.csv` (repo root) logs every URL move. Import these into **Settings > Website > URL Redirects** as 301s. Add any new redirects created by dynamic-page URL changes (Section 3) to the same file as you go, so there is one record.

---

## 7. Pre-launch checklist

- [ ] Theme ported; `main.css` and `learn.css` render correctly across breakpoints.
- [ ] Header/footer as global content + Menus; structure matches `../reference/site-spec.md` exactly; labels Title Case.
- [ ] Marketing pages rebuilt from reusable modules; design rules enforced in-module.
- [ ] Each `data/content/*.json` collection mapped to a HubDB table with matching field names.
- [ ] Dynamic-page templates live for each collection; detail URLs verified.
- [ ] Filtered views (podcast, topic/format/industry) reproduced as listing pages, not duplicate content.
- [ ] `_retired-playbook/` content NOT migrated.
- [ ] All forms swapped to real HubSpot forms by `form_id`; submissions tested.
- [ ] JSON-LD present on every page type; `/for-ai-agents/` and `/llms.txt` published at root.
- [ ] All `redirects-301.csv` entries imported; new URL-shape redirects added.
- [ ] No em dashes introduced in migrated copy.
- [ ] `TODO.md` pre-launch items reviewed.

---

## 8. Decision guide: theme-modules vs HubDB

- **Use custom theme + modules** for the layout system and for editorial marketing pages (homepage, how-we-help, live, team, legal). These are hand-composed and benefit from flexible modules.
- **Use HubDB dynamic pages** for the Learn collections (insights/podcast, concepts, offers, services, success stories, webinars, people). These are many-records-one-template and map directly from the JSON collections.
- **Consider CRM objects / Collections** only for `people` and `success-stories` if you need rich associations; otherwise HubDB is simpler.

The prototype was designed so this split is the path of least resistance.
