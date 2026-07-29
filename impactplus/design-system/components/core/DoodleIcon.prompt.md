One-sentence: A colorable wrapper for IMPACT's optional hand-drawn doodle icon library.

```jsx
<DoodleIcon category="interface" name="bulb" size={88} />
<DoodleIcon
  category="misc"
  name="rocket"
  size="6rem"
  decorative={false}
  label="Launch"
/>
```

Use doodle icons as occasional editorial illustrations, human annotations, or
supporting visual cues. Do not replace standard navigation, form, accessibility,
or transactional UI icons with doodles. SVG is the default. The mask inherits
CSS `color`, so set `color` on the component or its parent. If an icon conveys
meaning, provide `decorative={false}` and a concise `label`; otherwise leave it
decorative. Confirm the source pack's usage rights before production publishing.
