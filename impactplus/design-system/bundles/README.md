# V2 browser bundles

These files bridge the approved React source components into the current local
HTML proofs. They are not HubSpot production theme files.

## Source of truth

- `../components/chrome/NavBar.jsx`
- `../components/chrome/Footer.jsx`
- `../tokens/v2.css`

`v2-shell-entry.jsx` exports only the approved global navigation and footer into
the existing `window.IMPACTDesignSystem_9efa99` namespace. `react-global.js`
maps component imports to the React instance already loaded by the proof page.

The generated file is `../_v2_shell_bundle.js`. Do not edit it by hand. Rebuild
it from the private IMPACT project with:

```bash
npm run design-system:build-v2-shell
```

The older `../_ds_bundle.js` remains untouched and recoverable while the coded
and managed V2 proofs are reconciled. A final consolidated bundle is a later
implementation gate.
