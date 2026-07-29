# IMPACT V2 Global Shell Review

Status: **approved local global shell — ready for coded and managed proof integration; not uploaded to HubSpot**

Bob approved the main navigation and footer as ready to go for now on
2026-07-29. Later changes require a governed reason and must be reflected in
the canonical navigation/footer handoff before implementation.

This local specimen proves the shared V2 main navigation and footer against the
approved design foundation and the ratified light-refresh commercial journey.

## Governing information architecture

- Primary: **How We Help · Pricing · Results · Learning Center · About · Let’s Talk**
- **Let’s Talk** is the governed human-facing CTA label. The destination still
  explains the Explore Call process, preserving operational clarity without
  making the button feel like a formal commitment.
- The IMPACT logo carries the concise “Coaching & Training for Endless
  Customers” descriptor on wide desktop and mobile layouts. It links to the
  core program, disappears only where a full desktop menu would crowd it, and
  uses a compact mobile treatment beside the logo.
- How We Help uses four equal desktop columns: Recommended First Step, Our Core
  Program, Content, Video & AI, and Websites, HubSpot & Acquisition.
- The Deep Diagnostic & Roadmap is the dominant first-step card. The Endless
  Customers Coaching Program is the prominent second path. Each entire card is
  one link and owns its full hover and keyboard-focus surface.
- The Content, Video & AI directory contains Content & Video Training, YouTube
  Training, AI Content Workflows, and AI Visibility. The Websites, HubSpot &
  Acquisition directory contains Website Redesign, Website Optimization &
  Training, HubSpot Training & Services, Learning Center Development,
  Self-Service Tools, and Paid Advertising, plus one intentionally quiet Explore
  All Services route.
- Panels use governed content-sized variants: wide only for How We Help,
  medium for Results and Learning Center, and compact for About.
- No panel ends with a generic full-width parent-page row. Parent destinations
  are named links inside the appropriate group, which removes competing routes
  and keeps the same information available in the mobile accordion.
- The Instant Pricing Estimate is governed by the top-level Pricing route and
  does not appear inside How We Help.
- Results separates Customer Results from Trust & Recognition.
- Learning Center uses two equal groups: general learning resources and a
  coherent Endless Customers ecosystem. Its primary methodology link is
  explicitly labeled What Is Endless Customers? for clarity; the remaining
  ecosystem links stay concise: The Book, Academy, Conference, and Podcast.
- The general-learning column contains Explore the Learning Center, Articles,
  Guides & Downloads, Webinars, and Subscribe. No Videos link appears until a
  governed destination exists. Subscribe and Get a Free Chapter are matching,
  bottom-aligned conversion actions separated from their informational links.
- About names the company destination “Our Story, Vision, and Values.”
- Results, Learning Center, and About reuse the same aligned directory-column
  styling and hover treatment as the specialist-service columns.
- Mobile directory links use a 17px label and a minimum 46px touch target;
  the full-width mobile Explore Call action uses a 48px target.
- Mobile disclosure chevrons render at 20px so expandable routes are clear at
  phone distance and remain visually distinct from ordinary links.
- The mobile header preserves “Coaching & Training for Endless Customers” next
  to the IMPACT logo at a readable 12px/600 treatment that leaves the menu
  control unobstructed even at 320px.
- An unboxed 16px doodle person glyph from the governed icon library sits inside
  a 44px accessible Academy target immediately left of the Explore Call on
  desktop. Hover and keyboard focus reveal an immediate, styled black “Log in
  to the Academy” tooltip beneath it instead of relying on a delayed native
  browser tooltip. In the mobile drawer, the same destination becomes the
  explicit “Log in to the Endless Customers Academy” link beneath the primary
  CTA, with 12px of separation between the glyph and text.
- The global header is direction-aware on every viewport: it remains visible at
  the top of the page, hides after a deliberate downward scroll, returns after
  a short upward scroll, and stays visible whenever a menu is open or keyboard
  focus is inside it. Reduced-motion users receive the same state changes
  without the slide animation.
- Conference remains nested inside the Endless Customers resource group rather
  than becoming a competing permanent top-level destination.
- Paid Advertising uses the concise navigation label. Its destination page—not
  the menu label—must explain that the service is delivered by Swell, an IMPACT
  brand.
- The footer exposes the governed authority pages **Editorial Process** and
  **For AI Agents** without creating duplicate IMPACT entity pages. Editorial
  Process remains in the Endless Customers group; For AI Agents is the final
  link under About IMPACT, where technical and company-governance audiences
  will look for it.
- The footer mirrors the navigation’s mental model through five link groups,
  separates IMPACT’s corporate identity from audience navigation, and states
  the parent relationship in the same paragraph as IMPACT’s description using
  the precise phrase “parent company of the Endless Customers and Swell
  brands.” Only the brand names are linked; there is no separate brand-family
  panel or competing brand CTA.
- **Industries** is a governed destination under **How We Help**. It expresses
  who IMPACT serves without competing with the service directory or becoming a
  permanent top-level navigation item.
- The footer How We Help column places **Content & Video Training** immediately
  after the **Endless Customers Coaching Program**, reflecting the most common
  stack on top of the core program without turning the footer into a complete
  service catalog.
- The footer CTA uses **Start With Clarity** and **Let’s Find Out What’s Holding
  You Back** to connect the final conversion opportunity to the Deep Diagnostic
  & Roadmap. It pairs **Let’s Talk** with IMPACT’s official Tom DiScipio
  portrait and role, tells the visitor what the conversation will accomplish,
  and lowers risk with “A real conversation. No pitch. No obligation.”
- IMPACT’s identity and credentials share one balanced desktop row. This keeps
  the parent-company statement prominent, removes the empty right half of the
  old identity band, and prevents the credentials from becoming another
  visually heavy full-width footer section.
- The credential row uses the official HubSpot Diamond Solutions Partner
  artwork and the official We Run on EOS badge at a legible 104px desktop
  canvas, each linked to a third-party verification or explanation source. The
  artwork fills that canvas directly without a white tile or artificial border.
  Explicit white-on-navy text rules prevent global heading colors from leaking
  into the cards; neutral surfaces and hover borders avoid introducing another
  blue accent. The **Follow & Listen** group uses recognizable platform marks
  inside high-contrast 50px white controls with black icons. LinkedIn, YouTube,
  Instagram, TikTok, Facebook, and the official Endless Customers Spotify show
  are included; the active V2 blue appears only on hover and keyboard focus.
- The contact block uses the governed entity string exactly: **125 Commerce Ct
  STE 9, Cheshire, CT 06410** and **(203) 265-4377**.

## Footer accessibility contract

- The governed target is WCAG 2.2 Level AA. The footer uses one `contentinfo`
  landmark, uniquely named navigation landmarks, semantic lists for every link
  collection, and programmatically associated headings for its named sections.
- Reusable React instances generate their own CTA, credential, and social-label
  IDs with `useId()` so multiple previews cannot create duplicate IDs.
- The CTA’s low-pressure reassurance is connected to **Let’s Talk** with
  `aria-describedby`. Social links have platform-specific accessible names and
  announce that they open a new tab; credential links include the same new-tab
  announcement in visually hidden text.
- Decorative or redundant images use empty `alt` text because adjacent visible
  copy supplies the meaningful name. The IMPACT home link and icon-only social
  controls retain explicit accessible names.
- Every footer control clears the WCAG 2.2 24×24 CSS-pixel minimum target, with
  larger 44–50px treatments for mobile directory and social controls. Contact
  and legal links have explicit 32px minimum target heights.
- Keyboard focus remains visible with a three-pixel high-contrast outline.
  Hover is never the only way to reveal a destination or meaning.
- Text/background combinations meet WCAG AA in blue, magenta, green, and orange
  V2 themes. The CTA reassurance uses the governed 96% white treatment; the
  former 78% treatment failed normal-text contrast and is prohibited.
- At 320 CSS pixels, footer content reflows to one column without horizontal
  page overflow. `prefers-reduced-motion: reduce` removes decorative lift and
  transition effects, and forced-colors mode preserves card boundaries, focus,
  and the black-on-white social marks.
- Footer entrance motion is a progressive, one-time hierarchy cue: the CTA
  rises 16px into place, IMPACT identity and credentials follow, navigation
  reveals by column, and contact/social utility finishes the sequence. It uses
  opacity and transforms only, keeps mobile timing under half a second, never
  animates individual links, and leaves the complete footer visible when
  JavaScript is unavailable or reduced motion is requested.
- Automated checks supplement—not replace—keyboard, screen-reader, zoom,
  reflow, and human comprehension testing before HubSpot publication.

## Scope and safety

This is a local review proof. It does not modify the current HubSpot theme,
upload assets, publish navigation, change production URLs, or authorize any
redirect. The React design-system components are the reusable implementation;
the specimen mirrors their classes and content so the shell can be reviewed
without altering the actively edited Deep Diagnostic page.

The specimen loads `tokens/v2.css` directly after `styles.css` with a matching
version query. Keep those two query values synchronized whenever the shell CSS
changes. This prevents Chrome from combining current specimen markup with a
stale cached copy of the nested V2 stylesheet during local review.

Icon URLs stored in CSS custom properties must use the absolute local
`/design-system/assets/` path. Relative URLs are resolved from `tokens/v2.css`,
not from the specimen HTML, and otherwise point Chrome to the wrong `/assets/`
directory.

Before HubSpot staging, verify the final production URLs for Content & Video
Training, YouTube Training, AI Visibility, AI Content Workflows, Paid
Advertising, the Results filters, Accessibility, Awards & Recognition, and Our
Brands against the launch tracker.

Responsive QA must include downward and upward scroll behavior on desktop and
mobile, opening a menu while the header is visible, mobile drawer scrolling,
and a resize from the mobile breakpoint back to desktop.
