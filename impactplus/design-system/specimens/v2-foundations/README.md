# V2 Foundations specimen

Status: **approved foundation — local implementation authority; not uploaded to HubSpot**

Open `index.html` to review the proposed shared foundation for both coded-body pages and marketer-managed HubSpot pages.

## What this specimen tests

- General Sans display hierarchy and Proxima Nova lead/standard body roles.
- Accessible brand-color roles for blue, magenta, green, and orange.
- Pill-shaped actions, restrained card radii, firm rules, almost no shadow, cards, and forms.
- Wynter-inspired full-color fields, dark label blocks, inline headline highlights, oversized assertions, numbered editorial rows, and assertion-first section rhythm.
- Orbit-inspired paragraph, list, and bold-emphasis patterns.
- Shared service-page patterns for pricing facts, process, fit/not-fit qualification, risk reversal, FAQs, proof, and testimonials.
- A desktop viewport hero that reveals a small strip of the next section, with content-driven height on tablet and mobile.
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
- Primary heroes nearly fill the desktop viewport and deliberately reveal the next section; the behavior is disabled at 980px and below.

## Approval

Bob approved the complete V2 Foundations direction on 2026-07-28. Its typography roles, component shape, color behavior, section rhythm, and shared coded/managed expression now govern new V2 work. Approval authorizes local and draft implementation; it does not authorize a HubSpot production publish.

## Validation completed

- Automated color contrast audit: zero failures.
- Specimen theme contrast audit across blue, magenta, green, and orange: zero failures.
- Browser QA at 1440, 768, and 390 CSS pixels: no horizontal overflow.
- Browser console: no warnings or errors.
- Computed font roles: General Sans for headings and Proxima Nova for body copy.

## Implementation sequence

1. Promote the approved values into a scoped canonical V2 token layer.
2. Apply the foundation to the Deep Diagnostic coded-body proof.
3. Build the global navigation and footer against the same tokens.
4. Apply the foundation to one managed-module proof.
5. Upload only isolated V2 assets in draft mode and create Content Staging review pages.

Never publish production from this specimen folder.
