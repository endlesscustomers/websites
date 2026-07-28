One-sentence: A long-form text block that pairs IMPACT's two governed paragraph roles — a larger lead paragraph (`--prose-lead`, 23px/34px desktop and 20px/30px mobile) over standard body paragraphs (`--prose-body`, 16px/24px in V2).

```jsx
<Prose maxWidth={720}
  lead="Take control of your sales and marketing with a proven system based on the bestselling book Endless Customers."
  paragraphs={[
    "This program gives your team the tools, training, and guidance to build an in-house marketing engine.",
    "We're with you every step of the way — helping you build trust and generate more qualified opportunities.",
  ]} />
```

The `lead` states the section thesis; standard body paragraphs explain it. Use the existing `--prose-lead` / `--prose-body` roles rather than hand-setting paragraph sizes.
