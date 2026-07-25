One-sentence: The coaching pricing table — several plans (one flagged RECOMMENDED) compared across many feature rows, with per-plan CTAs.

```jsx
<PricingMatrix ctaHref="/schedule"
  plans={[
    { name: "Guidance", price: "$5,500", period: "/mo" },
    { name: "Mastery", price: "$8,000", period: "/mo", recommended: true },
    { name: "Mastery Accelerated", price: "$10,500", period: "/mo" },
  ]}
  rows={[
    { label: "Quarterly Planning Sessions", values: [true, true, true] },
    { label: "Coaching Sessions", values: ["2 / qtr", "5 / qtr", "5 / qtr"] },
    { label: "Website Strategy", values: [false, true, true] },
  ]} />
```

Cells: `true`→green check, `false`/`null`→dash, string→text.
