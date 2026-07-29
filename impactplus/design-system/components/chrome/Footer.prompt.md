One-sentence: IMPACT's V2 global footer with a human-led clarity CTA, commercial and learning routes, balanced company context and credentials, prominent follow-and-listen links, contact information, and legal links.

```jsx
<Footer />
<Footer showCta={false} columns={governedFooterColumns} />
```

The default footer mirrors the light-refresh commercial journey and excludes
the conference from permanent chrome. Keep the IMPACT/Endless Customers entity
relationship intact. `Accessibility`, `Awards & Recognition`, and `Our Brands`
remain governed launch destinations and must not be published until their
tracker rows are approved and the pages exist.

Keep the default footer CTA anchored to the recommended first step: Tom helps
the visitor decide whether the Deep Diagnostic & Roadmap is appropriate without
turning the conversation into a hard sell. Preserve the assurance line, the
official portrait, and the `Let’s Talk` action. Credentials belong beside the
IMPACT identity rather than in a separate full-width band. Social links use the
governed `Follow & Listen` treatment and include the official Endless Customers
Spotify show.

Keep `Industries` under `How We Help` with the governed `/industries`
destination. It is a footer route, not a permanent top-level navigation item.
Keep `Content & Video Training` immediately after the `Endless Customers
Coaching Program` in the How We Help column so the footer reflects the governed
core-program-plus-training journey.

Accessibility is part of the component contract. Preserve unique IDs through
`React.useId()`, the CTA `aria-describedby` reassurance, unique navigation
names, semantic `<ul>/<li>` link groups, visible keyboard focus, explicit
new-tab announcements, 24px-or-larger targets, reduced-motion behavior, and
the governed WCAG-AA color treatments. Decorative portraits, badges, and
social-icon images keep empty `alt` text only because their adjacent text or
link label already supplies the accessible name. Do not replace real links
with click handlers or suppress outlines.

Motion is progressive enhancement, not a rendering dependency. Preserve the
governed `data-v2-reveal` sequence: CTA, IMPACT identity and trust intro,
credential cards, navigation columns, then contact and social utility. Reveal
columns as groups rather than animating individual links. The shared V2 motion
helper plays the sequence once with opacity and transform only, uses shorter
mobile timings, leaves all content visible if JavaScript fails, and removes the
effect completely for `prefers-reduced-motion: reduce`.
