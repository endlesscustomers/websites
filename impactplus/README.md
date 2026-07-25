# impactplus.com (current, live site) — build files

The publishable files for pages Bob builds for the **current** impactplus.com. Strategy, decisions, and notes live in [[../../../30-projects/websites/impactplus/index|30-projects/websites/impactplus]] — not here.

## What's in here

- **`design-system/`** — the full `impact-website-2025-style` export. This is its **only** copy (moved out of `50-resources/impact/brand-templates/` on 2026-07-25, not duplicated), so edit it here directly. A design-system change and a page change go out in the same commit.
- **`services/<page-name>/`** — one self-contained folder per service page: `index.html` plus its own `assets/`.

## Pages

| Page | Status | Folder |
|---|---|---|
| Deep Diagnostic & Roadmap | In progress — Overview done; What You Get / How It Works / Pricing / Reviews still need the design sweep | `services/deep-diagnostic-roadmap/` |
| Money-Back Guarantee | Not started | `services/money-back-guarantee/` |

## The three rules

1. **Nothing here links outside this repo.** Reference the design system as `../../design-system/styles.css` from a page folder. A path reaching back into the vault works locally and 404s once pushed — that's what rendered the DD&R page blank on 2026-07-25.
2. **This repo is public.** No client names, pricing rationale, meeting notes, or internal process in these files.
3. **Design-system drift gets announced, not absorbed.** If page work overrides a token, invents a reusable pattern, or hard-codes something the system already defines, say so in the moment and ask Bob whether to promote it into `design-system/`, keep it page-specific with a comment explaining why, or revert it. Never ship a page with an uncatalogued override. Full rule: [[../../../50-resources/impact/service-page-build-sop|service-page-build-sop]] step 9b.

## Design system status (updated 2026-07-25)

Re-based on the **Endless Customers** brand system (`endlesscustomers.com/brand-guidelines`) so both brands read as one company during the transition.

- **Type:** General Sans (Fontshare) for headings at 800/700/600; **Proxima Nova stays for body copy.** That body-font split is a deliberate divergence from EC, which is single-family General Sans throughout. Merriweather is retired.
- **Colour:** EC Navy `#0A0F1F` · EC Blue `#1C78FF` · EC Magenta `#C026D3` · EC Green `#22C55E` · HubSpot Orange `#FC9639` · Surface Gray `#F4F5F7`, on a 10-step grayscale ramp. Amber and red are alerts and errors only.
- **Accessible variants, per hue.** The brand hues mostly fail contrast on their own (EC Blue is 4.05:1, Green 2.28:1, Orange 2.20:1), so each carries `-ui` (≥3:1, rules/icons/large text), `-text` (≥4.5:1, body and links) and `-strong` (safe under a white label). **Pick by job, not by eye.** Rules and traps: [[design-system/guidelines/accessibility-color-roles|accessibility-color-roles]]. Verify with `python3 design-system/tools/contrast-audit.py`, which must end in `TOTAL FAILURES: 0`.
- **The gradient rule:** Magenta → Blue → Green, for borders, lines, and underlines only, 2–6px. Never a background fill, button fill, or text colour.
- **Promoted from the DD&R build:** prose scale (`.prose-lead` / `.prose-body` / `.prose-bridge`), the five-variant accent system (`.accent-blue|magenta|green|orange|grey`), section openers (`.sec-open` / `.sec-line` / `.sec-eyebrow` / `.sec-desc`), layout primitives (`.band` / `.wrap`), `.hl-box`, `.num-badge`, and the frameless visual treatment.

## Context

Pages built here target the *current* site's design system as a **bridge** — see [[../../../30-projects/deep-diagnostic-roadmap/decision-log|DD&R decision log]] D11. The full redesign is [[../../../30-projects/websites/impactplus-2026-redesign/index|impactplus-2026-redesign]]; endlesscustomers.com is [[../../../30-projects/websites/endlesscustomers/index|endlesscustomers]].
