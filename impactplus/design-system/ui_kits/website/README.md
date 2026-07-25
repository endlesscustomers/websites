# Website UI Kit

An interactive recreation of IMPACT's marketing website (impactplus.com), built
entirely from this design system's components.

- **`index.html`** — mounts the kit with a left-side screen switcher (Home /
  Pricing). Loads React + the compiled `_ds_bundle.js`, then the screen files.
- **`Home.jsx`** — the homepage: dark hero with full-bleed photo + handwritten
  step callouts, three program cards, the "millionaire" script quote, client
  logo band, testimonial wall, "What You'll Get" feature grid, dark book-CTA
  band, FAQ accordion, and the "Ready to take control?" closer.
- **`Pricing.jsx`** — the coaching Program Pricing page: dark intro, the
  three-plan comparison table (Guidance / Mastery / Mastery Accelerated), and the
  "full cost of implementation" step cards.

Both screens use the real NavBar, HelloBar, Footer, and Ecee ChatWidget.

Logos and the hero photo are hotlinked from IMPACT's HubSpot CDN; client
"logos" in the social-proof band are rendered as styled wordmarks as a
placeholder (swap for the real grayscale logo SVGs when localizing).
