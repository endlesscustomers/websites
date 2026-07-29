One-sentence: A responsive white service rail — product label, optically centered in-page links with a thin accent underline and restrained settle/expand transition for the active section, and a black **Let’s Talk** CTA that becomes the sole navigation CTA once the rail activates after the hero and compacts on mobile; all motion respects reduced-motion preferences.

```jsx
<SubNav label="EC Coaching & Training" activeHref="/overview"
  links={[
    { label: "Overview", href: "/overview" },
    { label: "How it Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Success Stories", href: "/success" },
  ]} ctaLabel="Let’s Talk" ctaHref="/schedule" />
```
