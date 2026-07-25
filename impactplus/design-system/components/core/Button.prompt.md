One-sentence: IMPACT's pill-shaped call-to-action button — the blue `primary` and black `dark` fills anchor almost every CTA on the site.

```jsx
<Button variant="primary" size="lg" withArrow href="/schedule">Schedule Call</Button>
<Button variant="dark" withArrow>Learn More</Button>
<Button variant="link" withArrow>Get a Free Chapter of the Book</Button>
```

Variants: `primary` (IMPACT Blue), `dark` (near-black), `secondary` (green pill), `outline` (uses currentColor — put it on dark bands), `ghost` (soft blue), `link` (inline arrow text-link). Sizes `sm | md | lg`. Set `withArrow` for the trailing arrow, `href` to render an anchor.
