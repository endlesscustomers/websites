# Endless Customers Website (v2)

A static-HTML prototype of the Endless Customers marketing site (endlesscustomers.com). It is built to be migrated to **HubSpot CMS**. There is no framework, no build step, no package manager, and no test suite. It is plain HTML, CSS, and vanilla JavaScript, with JSON files acting as a mock CMS so the migration path to HubSpot stays obvious.

This README is the starting point for developers. For the full architecture, content schemas, and the decisions log, read `docs/reference/site-spec.md` (the single source of truth). For the HubSpot build itself, read `docs/handoff/hubspot-migration-guide.md`.

---

## Run it locally

The pages fetch components and JSON data at runtime, so `file://` will not work. You must serve over HTTP:

```bash
# from the repo root
python3 -m http.server 8000 --directory "$PWD"
# then open http://localhost:8000
```

On macOS you can also double-click `serve.command`.

---

## Repository layout

### The site (everything that gets migrated)

| Path | What it is |
|------|------------|
| `index.html` | Homepage. |
| `_template.html` | The starting point for every new page (nav, footer, theme toggle, and scripts pre-wired). |
| `styles.html` | Living style-guide page (rendered design system reference). |
| `preview.html` | Internal preview/index page. |
| `how-we-help/`, `learn/`, `live/`, `team/`, `contact/`, etc. | Page directories. Clean URLs come from directory `index.html` files (e.g. `/learn/book/index.html` serves `/learn/book/`). |
| `components/` | `nav.html` and `footer.html` masters (single-source, injected at runtime). |
| `css/` | `main.css` (design system, all non-Learn pages) and `learn.css` (Learn-only styles). |
| `js/` | `main.js` (nav/footer injection, mobile menu, theme), `cms.js` (the mock CMS), `learn-nav.js`. |
| `data/content/` | JSON content collections (insights, concepts, offers, people, services, success-stories, webinars). |
| `data/taxonomy/` | JSON taxonomies (topics, formats, industries, etc.). |
| `assets/` | Images and video. |
| `scripts/` | `sync-nav.py` and `sync-footer.py` (propagate the component masters). |
| `llms.txt`, `for-ai-agents/`, `sitemap/` | SEO and AI-entity layer. |
| `redirects-301.csv` | URL moves to apply during the HubSpot migration. |
| favicons, `apple-touch-icon.png` | Icons. |

### The docs (not part of the deployed site)

| Path | What it is |
|------|------------|
| `CLAUDE.md` | Working norms and conventions (originally written as AI assistant instructions, useful as a conventions cheat-sheet). |
| `TODO.md` | Open work and pre-launch checklist. |
| `docs/handoff/` | For the dev team: `HOSTING-GUIDE.md`, `hubspot-migration-guide.md`. |
| `docs/reference/` | Living source-of-truth docs: `site-spec.md`, `content-standards.md`, `design-qa.md`, `visual-style-guide.md`. |
| `docs/strategy/` | Working strategy, audit, and draft docs. History and rationale, not build instructions. |
| `docs/wireframes/` | Early wireframes. |

---

## How the site works (the three things that aren't obvious)

### 1. Nav and footer are single-source with inlined fallbacks

`components/nav.html` and `components/footer.html` are the masters. At runtime, `js/main.js` fetches them and injects them into `#nav-placeholder` and `#footer-placeholder`. Each page also carries an inlined copy as a fallback for offline (`file://`) viewing.

**Do not hand-edit the inlined copy in a page.** Edit the master, then run the sync scripts to propagate it into every page:

```bash
python3 scripts/sync-nav.py
python3 scripts/sync-footer.py
```

The mobile menu has no markup of its own. `buildMobileMenu()` in `js/main.js` generates it from the desktop dropdowns at runtime.

### 2. New pages inherit from the template

Every new page starts as a copy of `_template.html`. Set the path prefix (`./`, `../`, or `../../` depending on directory depth), fill in the page meta, and replace the page-content section. Page links are root-absolute (`/how-we-help/...`); asset paths inside the inlined components are depth-relative (`../assets/...`), which the sync scripts handle.

### 3. The Learn section is a mock CMS

`js/cms.js` (exposed as `window.EC`) deliberately mirrors HubSpot CMS concepts so the migration is a near-direct mapping:

| Mock CMS (here) | HubSpot CMS (target) |
|-----------------|----------------------|
| JSON collections in `data/content/` and `data/taxonomy/` | Collections / HubDB tables |
| `?id=slug` detail pages | Dynamic pages mapped to a HubDB row |
| `indexBy` / `resolve` helpers | Associations between objects |
| `EC.markdown` | Rich-text fields |
| `EC.setSEO` + JSON-LD injection | SEO module + structured data |

Detail templates live at their URL location (not a `/templates/` folder), e.g. `learn/recent-insight/article.html?id=...`, `learn/webinar/webinar.html?id=...`, `learn/tool/offer.html?id=...`.

Notes:
- **Bump `DATA_VERSION` in `js/cms.js` whenever content JSON changes.** It cache-busts the data fetches.
- Insights and podcast episodes are ONE content type (`insights.json`); `/learn/podcast` is a filtered view, not a separate collection. People (coaches, providers, staff, guests) are one collection (`people.json`) differentiated by role.
- Forms are mock (no submit) but carry real HubSpot `form_id`s for migration.
- `data/content/_retired-playbook/` is retired Knowledge Base content (replaced by Core Concepts & Frameworks). Do not build on it.

---

## Conventions

- Nav structure is **locked**. Do not change it without updating `docs/reference/site-spec.md`.
- All navigation labels are Title Case.
- **No em dashes anywhere** (copy, docs, or comments). Use periods, commas, or parentheses.
- The brand gradient is for borders, lines, and underlines only. Never for text or button fills.
- Dates in docs are absolute (e.g. "June 2026") to track decisions.

---

## Deploying / hosting

See `docs/handoff/HOSTING-GUIDE.md` for the GitHub + Cloudflare Pages setup (private repo, team-only live link). "Send it live" currently means committing and pushing via GitHub Desktop. The eventual production target is HubSpot CMS, covered in `docs/handoff/hubspot-migration-guide.md`.
