One-sentence: IMPACT's coaching-plan comparison grid — a feature column plus plan columns rendering green checks, value strings, or "Not Available".

```jsx
<PricingTable
  plans={[
    { name: "Guidance", caption: "For teams needing less immersive support.", price: "$5,500 Per Month" },
    { name: "Mastery", caption: "Our most immersive program.", price: "$8,000 Per Month", highlight: true },
    { name: "Mastery Accelerated", caption: "Fast-track your results.", price: "$10,500 Per Month" },
  ]}
  features={[
    { label: "Coaching Sessions", caption: "For Leadership", values: ["2 Per Quarter","5 Per Quarter","5 Per Quarter"] },
    { label: "Website Strategy", values: [false, "Available If Needed", "Available If Needed"] },
    { label: "IMPACT+ Membership", values: [true, true, true] },
  ]}
/>
```
