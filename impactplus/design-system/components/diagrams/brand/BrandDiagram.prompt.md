One-sentence: A drop-in slot for IMPACT's real exported diagrams/illustrations (the Proven System chart, the Journey SVG) — placeholder until you set `src`.

```jsx
<BrandDiagram src="https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/images/endless-customer-graphics/Endless-Customers-Journey-graphic-only.svg"
  caption="The typical 24-month Endless Customers journey" />
```

Use this for your signature graphics — they are never redrawn from scratch.

**Guideline:** render `BrandDiagram` on the page background (or a plain padded section) — do NOT wrap a full illustration with a white/light background inside a `DiagramFrame` box. Boxing looks wrong when the artwork already has its own background. Reserve `DiagramFrame` for the built diagrams (Flow, Bar, Annotated).
