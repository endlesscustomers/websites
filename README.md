# IMPACT websites — the publishable files, one repo

> **This folder is its own git repository**, separate from the Obsidian vault's own auto-committing repo (the vault's `.gitignore` excludes this whole path so the two never conflict). It's linked to GitHub via GitHub Desktop. Edit anything in here, open Desktop, you'll see the change, commit, push. No copy step, no second folder.

## The standard: files here, thinking in 30-projects

Bob's rule, 2026-07-25. Every website workstream splits in two, and the split is identical for all of them:

| | Lives here (`40-areas/websites/<site>/`) | Lives in `30-projects/websites/<site>/` |
|---|---|---|
| **What** | The **publishable files** — what makes the site render | The **thinking** that produces those files |
| **Examples** | HTML, CSS, JS, images, fonts, design systems, component libraries | Strategy docs, decision logs, meeting and call notes, page briefs, governance/process docs, team communications |
| **Test** | Would a browser need this to display the page? | Is this how we decided what to build? |

Same names on both sides, so each site's build folder and project folder are obvious siblings:

- `impactplus` — the current, live impactplus.com
- `impactplus-2026-redesign` — the future full redesign
- `endlesscustomers` — endlesscustomers.com
- `swellsquad` — swellsquad.com, paid media (added 2026-07-25; blocked on access, see its README)

**Why the split matters practically:** this folder gets pushed to a public GitHub repo. Strategy docs, client names, pricing rationale, meeting notes, and internal team process must not end up there. Keeping the boundary mechanical rather than case-by-case is what makes that safe.

**And the hard technical rule: nothing in this folder links to anything outside this folder.** If a page needs an asset or a stylesheet, it lives in here too. A relative path reaching back into the vault resolves fine on your machine and 404s the moment it's pushed — that's exactly what shipped the DD&R page as a blank white screen on 2026-07-25 before it was fixed.

## Structure

```
40-areas/websites/
  index.html         ← the page index. Start here, links to every page.
  .nojekyll          ← load-bearing, see above
  impactplus/
    design-system/   ← full impact-website-2025-style export (canonical copy, moved here from 50-resources)
    services/        ← service pages, one self-contained subfolder each
  impactplus-2026-redesign/   ← placeholder, see its README
  endlesscustomers/           ← placeholder, see its README
  swellsquad/                 ← placeholder, blocked on access, see its README
```

**`index.html` is the front door.** One URL, every page one click away, grouped by site with status. Add a row to it whenever you add a page — it's the thing you send someone when they ask to see the work.

URL depth doesn't matter here. This is a working/sharing repo, not the production site, so long GitHub Pages URLs are fine.

**Not pushed:** `design-system/scraps/` and `design-system/uploads/` (~87MB of reference screenshots from the Claude Design export, referenced by nothing). They stay on disk, excluded via `.gitignore`. That keeps the repo at ~11MB instead of ~97MB. They are not backed up anywhere as a result, which is an accepted trade since they're re-creatable screenshots of the live site.

## impactplus/ (the only site with local files today)

Bob builds pages himself (Claude Design / Cowork), then hands the finished build to the web team to rebuild natively in HubSpot. `design-system/` is now the **only** copy of `impact-website-2025-style` — moved out of `50-resources/impact/brand-templates/`, not duplicated. Adjust it here directly; nothing to keep in sync, and a design-system change goes out in the same commit as the pages using it.

| Page | Status | Folder |
|---|---|---|
| Deep Diagnostic & Roadmap | Complete V2 coded-body proof with approved global navigation/footer; GitHub review build, not in HubSpot | `impactplus/services/deep-diagnostic-roadmap/` |
| V2 Design-System Foundations | Approved review specimen | `impactplus/design-system/specimens/v2-foundations/` |
| V2 Global Navigation & Footer | Approved global-shell review specimen | `impactplus/design-system/specimens/v2-global-shell/` |
| Money-Back Guarantee | Not started | `impactplus/services/money-back-guarantee/` (create when started) |

Project tracking: [[../../30-projects/websites/impactplus/index|30-projects/websites/impactplus]] · offer-level projects: [[../../30-projects/deep-diagnostic-roadmap/index|deep-diagnostic-roadmap]], [[../../30-projects/money-back-guarantee/index|money-back-guarantee]].

## The other three sites have no local files, on purpose

- **endlesscustomers** — built directly in HubSpot; Bob also keeps EC files in a separate folder on his computer with its own GitHub setup. See its README.
- **impactplus-2026-redesign** — hasn't started. See its README.
- **swellsquad** — 🔴 blocked. It's a live WordPress site, but **nobody has confirmed IMPACT controls the domain or the admin**, and the brand's future (absorb / fund / exit) is undecided. It also sells to DTC ecommerce, not IMPACT's B2B ICP, so it does not share the IMPACT design system. See its README before treating it like the others.

## Adding a page
1. Create `<site>/services/<page-name>/` (or `<site>/<page-name>/` for a non-service page).
2. Keep it self-contained: `index.html` + its own `assets/`. Link the design system as `../../design-system/...`.
3. Add a row to the table above **and a card in `index.html`**.
4. Put the strategy/copy/decision docs in `30-projects/websites/<site>/`, not here.

## ⚠️ Do not delete `.nojekyll`

The empty `.nojekyll` file at this folder's root is load-bearing. GitHub Pages runs Jekyll by default, and **Jekyll refuses to publish any file whose name starts with an underscore** — it treats them as internal templates. The design system's React bundle is `_ds_bundle.js`, so without this file Pages returns 503 for it and every page renders **blank**: the HTML, CSS, and fonts all load fine, then the components are missing and nothing draws.

Found the hard way on 2026-07-25, the first time the DD&R page was served from Pages. Also affects `_ds_manifest.json` and `_adherence.oxlintrc.json`.

`.nojekyll` turns Jekyll off entirely and serves every file as-is. It must stay at the repo root, and it's empty on purpose.

## GitHub setup

Repo: **`endlesscustomers/websites`** (public). Linked via GitHub Desktop → Add Local Repository → this folder. Pages serves from `main` / `/root`.

- Front door: `https://endlesscustomers.github.io/websites/`
- Any page: `https://endlesscustomers.github.io/websites/<site>/services/<page>/`

**The workflow, every time:** edit here in Cowork or by hand → open GitHub Desktop → the changes are already listed → write a one-line summary → Commit to main → Push origin. No copying between folders, because this folder *is* the repo.

## Related
- [[../../50-resources/impact/website-design-systems|website-design-systems registry]] — design-system status per site
- [[../../50-resources/impact/service-page-build-sop|service-page-build-sop]] — how a page gets built end to end
- [[../../30-projects/entity-optimization/index|entity-optimization]] — what content/brand lives on which domain
