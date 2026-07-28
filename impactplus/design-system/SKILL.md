---
name: impact-design
description: Use this skill to generate well-branded interfaces and assets for IMPACT (impactplus.com) — the sales & marketing coaching company behind the Endless Customers System — either for production website pages or throwaway prototypes/mocks. Contains IMPACT's essential design guidelines, colors, type, fonts, assets, and UI kit components for building on-brand marketing pages.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files
(`tokens/` for the exact color + type tokens, `components/` for the React
primitives, `guidelines/` for foundation specimens, `ui_kits/website/` for a full
page recreation, `assets/README.md` for logo/imagery URLs).

If creating visual artifacts (slides, mocks, throwaway prototypes, new marketing
pages), copy assets out and create static HTML files for the user to view, linking
`styles.css` for the real tokens. If working on production code, copy assets and
read the rules here to become an expert in designing with the IMPACT brand.

Key brand facts to honor:
- **V2 Blue `#0F63E0`** is the default active strong color, with governed
  magenta, green, and orange theme alternatives; white, navy, and restrained
  cool-gray surfaces carry most of the page.
- **General Sans** 800/700/600 handles display roles; **Proxima Nova** carries
  23px/34px lead copy and 16px/24px standard copy; **Kalam** is reserved for
  rare human annotations.
- **Pill buttons**, restrained 8px card radii, firm borders, 1240px outer
  canvases, governed narrower content measures, real proof, and almost no
  decorative shadow. Hero proof media is the intentional hard-shadow exception.
- V2 motion is progressive and explanatory: explicit scroll reveals, modest
  70ms staggers, and sequence animation use shared tokens and always honor
  `prefers-reduced-motion`.
- Voice: confident coach — "we" to "you", Title Case headlines, no decorative emoji.

If the user invokes this skill without other guidance, ask what they want to build
or design, ask a few clarifying questions, and act as an expert designer who
outputs HTML artifacts _or_ production code, depending on the need.
