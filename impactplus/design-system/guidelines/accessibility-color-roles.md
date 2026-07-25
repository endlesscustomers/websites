# Colour roles and accessibility

Added 2026-07-25 (Bob's instruction). **Every brand hue carries variants that stay on brand but are safe to use.** Pick the variant by the *job* the colour is doing, not by eye.

## Why this exists

The brand hues were chosen to look right, not to pass contrast. Measured against white:

| Brand hue | Contrast on white | Verdict |
|---|---|---|
| EC Blue `#1C78FF` | 4.05:1 | fails 4.5:1 body text |
| EC Green `#22C55E` | 2.28:1 | fails even 3:1 for a rule or icon |
| HubSpot Orange `#FC9639` | 2.20:1 | fails even 3:1 |
| EC Magenta `#C026D3` | 4.71:1 | passes |

Using a raw brand hue for text or a thin rule produces a page that is inaccessible **and still looks perfectly on brand**, which is the worst kind of bug: nothing looks wrong, so nobody catches it.

## The four roles

| Token | Guarantee | Use for |
|---|---|---|
| `--X` | none | **Large decorative fills only.** No text on it, not carrying meaning alone. Never a thin rule. |
| `--X-ui` | ≥ 3:1 on white | Rules, bars, icons, borders, focus rings, and large text (≥24px, or ≥18.66px bold) |
| `--X-text` | ≥ 4.5:1 on white | Body text, links, small text. Also legible on that hue's own tint. |
| `--X-strong` | white text on it ≥ 4.5:1 | Buttons, badges, any filled element with a white label |
| `--X-tint` | pale wash | Section/callout backgrounds; `--X-text` is legible on it |

Inside an accent block the same roles are available hue-agnostically as `--accent`, `--accent-ui`, `--accent-text`, `--accent-strong`, `--accent-ink`, `--accent-tint`, so a component never hard-codes a hex or has to reason about contrast.

## The traps, specifically

- **Blue is the one that bites.** White on `#1C78FF` is 4.05:1 and fails below 24px. A blue button with a white label must use `--ec-blue-strong`. The DD&R hero background was moved to `-strong` for exactly this reason: it carries white text down to 14px.
- **Green and orange can never take white text** at any size. Their `--accent-ink` is near-black `#0A0F1F`.
- **`--ec-gray-400` is decorative only.** It does not pass as text.
- **Check against the gray surface, not just white.** `#F4F5F7` sections eat about 0.5 of a contrast point. `--text-muted` originally passed on white and failed on gray; it was darkened until it cleared both.
- **`--text-error`** is `#D42020`, not the raw `#EF4444` (3.76:1, fails).

## Verifying

`design-system/tools/contrast-audit.py` checks every pairing the system can produce, including the semantic text tokens, the hero, and dark bands.

```bash
python3 design-system/tools/contrast-audit.py
```

It prints a per-pairing verdict and a failure count. **It should always end in `TOTAL FAILURES: 0`.** Run it after changing any colour token, and add a row when a new pairing enters the system. All values currently in the system were computed and verified with it, not estimated.

## Standard being met

WCAG 2.1 AA: 4.5:1 normal text, 3:1 large text (≥24px or ≥18.66px bold) and non-text/graphical objects.
