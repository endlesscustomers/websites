One-sentence: A competitor-benchmark matrix — your offering vs. 2–3 competitors across capability rows, with your column highlighted and check/x or text cells.

```jsx
<ComparisonBlock eyebrow="Why IMPACT" title="Coaching vs." highlight="the Alternatives"
  columns={["Endless Customers", "Marketing Agency", "Do It Yourself"]}
  highlightIndex={0}
  rows={[
    { label: "Builds in-house capability", values: [true, false, true] },
    { label: "Predictable monthly cost", values: [true, "Varies", "Low"] },
    { label: "Owns your brand voice", values: [true, false, true] },
    { label: "Expert coaching & accountability", values: [true, true, false] },
  ]} />
```

Cells: `true`→green check, `false`→grey x, string→plain text. INTENTIONAL ADDITION (not on the live site today).
