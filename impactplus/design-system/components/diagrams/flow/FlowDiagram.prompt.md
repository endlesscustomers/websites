One-sentence: A flow/relationship diagram in three layouts — linear chain (steps), ring cycle (loop), and hub-and-spoke ("connected to everything").

```jsx
<FlowDiagram layout="linear" nodes={["Learn", "Align", "Build", "Scale"]} />
<FlowDiagram layout="hub" center="Endless Customers" nodes={["Content", "Video", "Sales", "Website", "AI"]} />
```

`layout`: linear | cycle | hub. Nodes auto-color from the service palette.
