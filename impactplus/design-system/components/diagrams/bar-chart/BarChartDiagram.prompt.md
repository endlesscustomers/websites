One-sentence: A simple branded column chart for "with vs. without" and comparison stories.

```jsx
<BarChartDiagram unit="%" data={[
  { label: "Without the system", value: 20 },
  { label: "With Endless Customers", value: 85 },
]} />
```

Bars auto-color from the service palette; pass `color` per bar to override.
