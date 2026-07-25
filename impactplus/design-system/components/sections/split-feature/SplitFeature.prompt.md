One-sentence: The How-it-Works step layout — an eyebrow + serif title + body on one side, an arch-masked photo on the other.

```jsx
<SplitFeature eyebrow="Step 1" title="Kicking Off With Alignment Day" imageSrc={photo}
  cta={<Button variant="dark" withArrow>Learn More</Button>}>
  <p>Success depends on getting everyone on the same page from the start…</p>
</SplitFeature>
```

Alternate `reverse` between stacked steps for the zig-zag rhythm. `mask="arch"` gives the signature stadium-topped photo.
