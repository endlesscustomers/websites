# IMPACT Doodle Icon Library

This folder contains the complete user-provided `doodle icons (1).zip` pack:

- `svg/` — 451 production-preferred vector files in 15 source categories.
- `png/` — 451 raster fallbacks matching the SVG collection.
- `source/doodle-icons.fig` — the original Figma source supplied in the ZIP.
- `manifest.json` — generated catalog data for AI, development, and review.

Regenerate the manifest after adding or removing icons:

```bash
node tools/build-doodle-icon-manifest.mjs assets/icons/doodle
```

## Governing usage

- Use these as occasional editorial illustrations, human accents, annotations,
  or supporting visual cues—not as the default interface icon set.
- Keep navigation, forms, error states, accessibility controls, and other
  transactional UI on the governed clean interface glyph system.
- Prefer SVG. Use PNG only where the delivery surface cannot render SVG.
- The artwork is black by default. The `DoodleIcon` component uses CSS masking
  so it can inherit any approved V2 theme color without editing the source.
- Decorative icons must have empty alt text or `aria-hidden="true"`. Meaningful
  icons need an accessible label and must not communicate through imagery alone.
- Do not use social-logo files as substitutes for current official brand marks.

## Rights status

The supplied archive did not contain a license, attribution file, creator name,
or usage terms. The library is therefore approved for local design exploration
only until IMPACT confirms it has the necessary production usage rights.
