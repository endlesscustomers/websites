# V2 Foundations specimen

Status: **local review artifact — not approved and not uploaded to HubSpot**

Open `index.html` to review the proposed shared foundation for both coded-body pages and marketer-managed HubSpot pages.

## What this specimen tests

- General Sans display hierarchy and Proxima Nova lead/standard body roles.
- Accessible brand-color roles for blue, magenta, green, and orange.
- Pill-shaped actions, restrained card radii, firm rules, almost no shadow, cards, and forms.
- Wynter-inspired full-color fields, dark label blocks, inline headline highlights, oversized assertions, numbered editorial rows, and assertion-first section rhythm.
- Orbit-inspired paragraph, list, and bold-emphasis patterns.
- Shared service-page patterns for pricing facts, process, fit/not-fit qualification, risk reversal, FAQs, proof, and testimonials.
- Responsive behavior at desktop, tablet, and mobile widths.

## Bob-directed revision — 2026-07-28

- Added more space after H1 and H2 headings.
- Locked pill-shaped buttons as an intentional IMPACT difference from Wynter.
- Made the secondary-button hover state fill completely with accessible blue and switch its label to white.
- Reworked the specimen to express more of Wynter's visual grammar while retaining General Sans, Proxima Nova, and IMPACT's accessible palette.
- Added the reusable commercial patterns identified on the Deep Diagnostic & Roadmap page.

## Bob-directed theme revision — 2026-07-28

- Removed boxes from all eyebrow labels.
- Made the hero, navigation, hero controls, and proof panel share one accessible strong-color field.
- Removed the hero headline highlight and made all hero and navigation typography white, including the proof panel.
- Reduced the vertical padding around every inline highlight.
- Converted the hero's “See the decisions” action into a thin white-outline ghost pill with no arrow; its hover uses a subtle translucent-white fill.
- Made the main-navigation CTA black with a right arrow.
- Standardized right arrows on every primary button. Secondary ghost and outline buttons do not use arrows.
- All action buttons rise two pixels on hover and never gain an underline.
- Black primary buttons remain black and darken subtly on hover; they do not invert to white.
- Main-navigation links remain unadorned on hover and never gain an underline.
- Removed the multicolor rail below the navigation and added a four-pixel black rule below the hero.
- Made blue the default root theme. The interactive specimen control can switch the complete active system to magenta, green, or orange.
- Active-theme tokens govern the hero, highlights, links, buttons, form accents, list marks, tinted surfaces, proof blocks, service patterns, and final CTA. The four palette cards and four selector swatches intentionally retain their literal colors because they document and control the available themes.
- The magenta full-field role uses the accessibility-adjusted `#CD43DC`; raw brand magenta remains `#C026D3` in the palette.
- The main navigation is a transparent overlay on the hero field, so it always shares the active theme color instead of creating a separate navigation band.
- Highlights below the hero use white text on the active accessible strong color, with only a few pixels of vertical extension and slightly more below the letterforms. The hero does not use a headline highlight.

## Review gate

Bob must approve or amend these five decisions before the values become V2 production tokens:

1. Typography roles.
2. Component shape.
3. Color behavior.
4. Section rhythm.
5. Shared expression across coded and managed pages.

## Validation completed

- Automated color contrast audit: zero failures.
- Specimen theme contrast audit across blue, magenta, green, and orange: zero failures.
- Browser QA at 1440, 768, and 390 CSS pixels: no horizontal overflow.
- Browser console: no warnings or errors.
- Computed font roles: General Sans for headings and Proxima Nova for body copy.

## After approval

1. Promote approved experimental aliases into the canonical V2 tokens.
2. Build the global navigation and footer against those tokens.
3. Apply the foundation to the Deep Diagnostic coded-body proof.
4. Apply the same foundation to one managed-module proof.
5. Upload only the isolated V2 assets in draft mode and create Content Staging review pages.

Never publish production from this specimen folder.
