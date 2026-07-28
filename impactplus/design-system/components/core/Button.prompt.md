One-sentence: IMPACT's pill-shaped call-to-action button — the blue `primary` and black `dark` fills anchor almost every CTA on the site.

```jsx
<Button variant="primary" size="lg" withArrow href="/schedule">Schedule Call</Button>
<Button variant="dark" withArrow>Learn More</Button>
<Button variant="link" withArrow>Get a Free Chapter of the Book</Button>
```

Variants: `primary` (active V2 theme color), `dark` (near-black), `secondary`, `outline` (uses currentColor), `ghost`, and `link`. Sizes `sm | md | lg`; set `href` to render an anchor.

V2 defaults: primary and dark buttons include the trailing arrow unless `withArrow={false}` is explicit. Secondary, outline, and ghost buttons do not include an arrow by default. Every action remains pill-shaped, rises 2px on hover, and never gains an underline. Dark buttons darken rather than invert; outline/ghost behavior must retain accessible contrast for its field.
