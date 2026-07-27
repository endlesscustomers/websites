# Letter-Spacing & Line-Height Audit

June 4, 2026 · Analysis only — no code changed. Companion to typography-apple-comparison.md.
Sources: every rule in main.css + learn.css + the inline `<style>` blocks of all 30+ pages, compared against Apple's computed values measured live on apple.com (home, iPhone 17 Pro, MacBook Air).

## Apple's spacing system, measured

Apple's tracking is not "tighter as it gets bigger." It's a U-curve, and it's the same curve on every page:

| Size (font) | Tracking | Leading |
|---|---|---|
| 80px Display | -0.015em | 1.05 |
| 64px Display | -0.009em | 1.06 |
| 56px Display | 0 | 1.07 |
| 48px Display | -0.003em | 1.08 |
| 32px Display | **+0.004em** | 1.13 |
| 24–28px Display | **+0.007 to +0.009em** | 1.14–1.17 |
| 21px Display (feature copy) | **+0.011em** | 1.38 |
| 17px Text (body) | -0.022em | 1.47 |
| 12–14px Text (captions) | -0.010 to -0.016em | 1.33–1.43 |

Three lessons:

1. **Their tightest tracking anywhere is -0.022em** (and that's compensating for SF Pro Text being designed loose). Display headlines never go past -0.015em.
2. **Mid-size display type (21–32px) is tracked slightly OPEN**, not tight. That's a big part of why their subheads and card titles feel airy and clean.
3. **Leading is a strict ramp:** ~1.05 at the top, easing to ~1.17 by 24px titles, 1.38 for big feature copy, 1.47 for body. One curve, zero exceptions across pages.

(Caveat: their exact numbers compensate for SF Pro's metrics. General Sans and Inter are both tighter-fitted by design, so we shouldn't copy values — we should copy the *shape*: gentle at display sizes, never extreme, one consistent curve.)

## What we have: right instincts, drifting values

The good news: our leading at the extremes is solid. Heroes at 1.04–1.05 match Apple exactly, section titles at 1.15 are right on their 1.13, and long-form article copy at 1.75 is a deliberate, defensible choice. The structure is there. The problem is consistency — the same role gets different numbers depending on which page built it:

**1. Hero headlines: three tracking values for one role.**
Home hero is -0.04em; every service/event/program hero is -0.02em; Learning Center heroes are -0.025em. All the same component at the same size. -0.04em is also the outlier in absolute terms — almost 3× tighter than Apple's tightest headline, and at weight 800 it's where "bold" starts reading as "cramped" (counters close up, Rs and As start touching).

**2. Section titles vs. page h2s disagree.**
`.section__title` is -0.03em / 1.15, but the service pages' own `h2`s (`.wr-copy h2` etc., ~26–34px) have *no tracking* and leading 1.2. Same visual role, noticeably different texture page to page.

**3. The 24px tier is the messiest.**
Titles at 24px run -0.03em, -0.02em, -0.01em, and none, with leading anywhere from 1.15 to 1.3. Subheads/ledes at 24px run leading 1.5, 1.6, and 1.65 with no tracking. Apple at this size: one value for titles (+0.009em / 1.17), one for big copy (1.38). Ours needs exactly two roles defined — title and lede — each with one number.

**4. Big stat numbers: four treatments.**
44px stats are -0.04em (home), -0.02em (pricing), or untracked (service pages, event page). These sit next to each other in comparable layouts.

**5. Body copy leading is fragmented.**
The base is 1.3 (tight, Framer-style), but actual paragraph classes scatter across 1.4, 1.45, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8. Some of that is legitimate (cards tighter, articles looser), but nine values is a palette, not a system. Apple uses ~three.

**6. Eyebrows/labels are mostly clean** (0.08–0.12em uppercase, consistent) with a few strays (0.02–0.06em on tags, 0.16em on the event date).

## Recommendation: a tracking + leading ramp as tokens

Replace per-class one-off values with six tokens in main.css, then point existing classes at them. Values tuned for *your* goals — bigger than Apple, weight 800, still clean:

```css
/* Tracking ramp — General Sans display */
--tracking-display: -0.025em;  /* ≥44px headlines. Bold-vibe tight, but inside the
                                  clean zone for GS at 800 (home hero relaxes from -0.04) */
--tracking-heading: -0.02em;   /* 28–44px section titles, page h2s */
--tracking-title:   -0.01em;   /* 18–26px card/step/feature titles */
/* Inter body keeps the global -0.01em; captions inherit it */
--tracking-label:    0.1em;    /* uppercase eyebrows/labels (already the de facto value) */

/* Leading ramp */
--leading-display: 1.05;   /* heroes (already right) */
--leading-heading: 1.15;   /* section titles, page h2s */
--leading-title:   1.25;   /* card/step titles */
--leading-lede:    1.45;   /* 20–24px subheads, ledes, feature copy */
--leading-body:    1.5;    /* standard paragraphs (up from scattered 1.4–1.6) */
--leading-article: 1.7;    /* long-form Learning Center / story bodies (down from 1.75–1.8) */
```

Why these numbers and not Apple's: General Sans at 800 is a much blacker headline than SF Pro at 600, and heavy type needs *more* air, not less — so the display tracking relaxes toward Apple rather than past it, and the mid sizes stay at a hair negative instead of Apple's positive (GS doesn't need opening up the way SF Display does). The lede leading lands at 1.45 (between their 1.38 and our looser 1.6s), which tightens the service-page hero subs just enough to feel composed instead of floaty.

### On "larger than Apple"

Right now you're actually *smaller* than Apple at the top: our heroes clamp at 54–64px where Apple's run 56–80px. If you want the bold vibe to land, the headroom is in size, not tighter tracking:

- `--headline-medium`: 64px max → **72px** (desktop)
- `--headline-split-*`: 48–61px max → **+10–15%**
- `.section__title`: 32px → **36px** (with --leading-heading)

Weight 800 + bigger sizes + slightly relaxed tracking is the combination that reads bold *and* expensive. Weight 800 + small-ish sizes + -0.04em is what reads heavy-handed.

### Rollout status

1. ✅ **Applied June 4** — tracking + leading tokens added to main.css `:root`.
2. ✅ **Applied June 4** — 134 rules normalized across 22 files (main.css, learn.css, and all page inline styles): heroes unified at `--tracking-display`/`--leading-display` (home hero relaxed from -0.04em), section titles and page h2s at the heading tier, the 24px tier split into title (1.25) vs. lede (1.45) roles, 44px stats at display tracking and 32px stats at heading tracking, tight 1.4–1.45 body paragraphs moved to 1.5, long-form articles 1.75 → 1.7. Deliberately untouched: the diagnostic funnel (self-contained design), nav/dropdown UI text, small card excerpts at 1.55–1.6, and uppercase eyebrows (already consistent).
3. ⬜ Size pass (the "larger than Apple" bump: heroes to ~72px, section titles to 36px) — kept separate so spacing and size changes don't get conflated when eyeballing
