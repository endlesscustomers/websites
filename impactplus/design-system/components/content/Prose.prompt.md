One-sentence: A long-form text block that pairs IMPACT's two existing paragraph styles — a larger lead paragraph (`--text-lg`, 20px) over default body paragraphs (`--text-base`, 18px) — using only type sizes already in the site CSS.

```jsx
<Prose maxWidth={720}
  lead="Take control of your sales and marketing with a proven system based on the bestselling book Endless Customers."
  paragraphs={[
    "This program gives your team the tools, training, and guidance to build an in-house marketing engine.",
    "We're with you every step of the way — helping you build trust and generate more qualified opportunities.",
  ]} />
```

The `lead` is the site's large paragraph style; body paragraphs are the default. No new CSS — devs just apply the existing `--text-lg` / `--text-base` sizes.
