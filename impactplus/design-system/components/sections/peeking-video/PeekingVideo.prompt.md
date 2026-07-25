One-sentence: A large hero video that peeks up above the fold — the module owns a two-tone background (upper band matched to the hero + lower page area) so the video straddles the seam without any negative margin overlapping the hero's CTAs.

```jsx
<div style={{ background: "var(--surface-muted)" }}><Hero primaryCta="Schedule a Call" .../></div>
<PeekingVideo topSurface="muted" label="See the program in action" />
```

Place it directly after the (matching-background) `Hero`. Omit `poster` for a clean dark video panel; set `topSurface` to the hero band's color so the two read as one continuous background.
