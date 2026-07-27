# swellsquad.com — build files

Paid media, IMPACT's fourth web property. Added 2026-07-25 at Bob's request. Strategy, decisions, and notes live in [[../../../30-projects/websites/swellsquad/index|30-projects/websites/swellsquad]] — not here.

**Empty for now, and there are two reasons why.**

**1. Bob doesn't have access to the site.** Per [[../../../30-projects/entity-optimization/swell-brand-architecture|the Swell decision brief]] (2026-07-18): nobody has confirmed who holds the domain registration or the WordPress admin. That has to be established before anything can be built, moved, or fixed. It's a conversation with **Rachel Palmateer**, who owns Agency Services and built Swell.

**2. The brand's future is an open decision.** Absorb into IMPACT and retire the brand · keep it as a funded sub-brand for DTC ecommerce · ringfence it for a future exit. It has been relitigated five times since 2022. Building anything here before that's settled risks building the wrong thing.

## What's actually there today

Live site is **WordPress / Elementor**, last modified June 2025, and badly stale: 2021 copyright, two departed employees still on the team page, testimonials naming someone who left around 2022. The brief calls it "an active liability pointing at IMPACT from a domain IMPACT owns," since the footer declares it a division of IMPACT.

That matters beyond tidiness. IMPACT's own AI Visibility Study found "can't prove you're real or current" is the single largest disqualifier cluster at 24% of disqualifying mentions.

## If work does land here

Same rules as every other site in this repo: self-contained subfolder, its own `design-system/` if Swell ever gets one exported, and **nothing linking outside this folder**. Note that Swell's visual identity is its own, aimed at DTC ecommerce buyers, and is deliberately not the IMPACT or Endless Customers system.

Because the live site is WordPress rather than a static build, "managing it through this repo" would most likely mean either a rebuild as static pages here, or exporting the theme. Worth deciding explicitly rather than assuming.

## Related
- [[../../../30-projects/websites/swellsquad/index|Project home]]
- [[../../../30-projects/entity-optimization/swell-brand-architecture|Swell brand-architecture decision brief]] — the three options and the recommendation
- [[../../../40-areas/people/rachel-palmateer|Rachel Palmateer]] — owns Swell; the access conversation lives on her file
