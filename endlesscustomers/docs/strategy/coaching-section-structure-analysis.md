# Coaching Program Section: One Page vs. Multi-Page Analysis

> June 2026. Decision memo on whether to consolidate /how-we-help/coaching-program
> (Overview, How It Works, What You'll Learn, Pricing) into a single page with
> expandable sections, or keep the four-page structure.

## Verdict

Keep the four pages. Do not consolidate into one page with dropdowns. The current
structure is the right architecture for every audience that matters; its weaknesses
are fixable with small changes, and consolidation would actively hurt three of the
four audiences. Details and the fix list below.

## Current state

Four pages, each substantial and complete:

| Page | Words (approx) | Role | Stands alone? |
|---|---|---|---|
| Overview | ~3,200 | What it is, who it's for, outcomes, team, 9 FAQs | Yes |
| How It Works | ~1,400 | Journey: Alignment Day → 90-day cycles → mastery | Partially |
| What You'll Learn | ~2,000 | 40+ skills across the 5 pillars | Partially |
| Pricing | ~2,200 | Full transparent pricing: $10K/$12.5K kickoff, $5,500–$10,500/mo plans, add-ons, 4 FAQs | Mostly |

Combined that would be an ~8,800-word single page. A shared sticky sub-nav already
gives the section a one-page feel for anyone navigating it.

## The four perspectives

### Potential client

A buyer evaluating a $66K–$126K/year commitment researches in distinct modes:
"what is this," "how would this actually work for us," "what exactly do we get,"
and "what does it cost." The four pages map to those modes exactly, and the sticky
sub-nav lets a motivated reader flow through them like chapters. One mega-page with
dropdowns is worse here for two reasons. First, accordion content gets skipped;
users reliably fail to open collapsed sections, which means the curriculum and
pricing detail you most want them to see would go unread. Second, an 8,800-word
page on mobile is fatiguing and makes the pricing (your strongest trust asset)
harder to reach.

Where the current setup fails the client: someone who lands mid-section (e.g.
What You'll Learn from a shared link or search) gets no context on what the program
is, the timeline, or cost, and no forward path except the sub-nav. That's a fix,
not a reason to consolidate.

### Google

Four pages target four distinct search intents: brand-program queries (Overview),
"how does endless customers coaching work" (How It Works), curriculum queries
(What You'll Learn), and the commercially valuable "endless customers coaching
cost / pricing" (Pricing). Dedicated pricing pages win cost-related queries; that
is the They Ask, You Answer play and it deserves its own URL. Consolidating to one
page collapses four ranking opportunities into one diluted page, and content inside
collapsed dropdowns, while indexed, competes worse than visible content on a
focused page. The section's real SEO weakness is thin internal linking between the
four pages (sub-nav only, almost no contextual in-body links) and missing schema
(no FAQPage markup on either FAQ section, no Service/Offer markup on Pricing).

### AI platforms (ChatGPT, Claude, Perplexity, AI Overviews)

When someone asks an assistant "how much does the Endless Customers coaching
program cost," the ideal source is a clean, dedicated page where the numbers are
unambiguous: that's your Pricing page. Multiple focused URLs also mean multiple
citable sources, so the program can be cited on what/how/cost questions
independently. What's missing for AI extraction today: FAQPage structured data on
the Overview and Pricing FAQs, Service/Offer schema carrying the three plan prices,
and answer-first summary paragraphs near the top of each page (the pattern the new
audit page uses: a one-paragraph "What is it?" that an LLM can lift verbatim).
A single long page with dropdowns makes extraction noisier and cuts the citable
surface from four URLs to one.

### Coaches and sellers sharing pages

This is the strongest argument for multi-page, and it's not close. Sellers share
targeted links at specific moments: Pricing to the CFO before a call, What You'll
Learn to the marketing team evaluating curriculum, How It Works to the CEO asking
about time commitment. A specific URL produces a clean link preview, lands the
reader on exactly the right content, and shows up in analytics so you know what
prospects actually read. With a one-page setup, sellers share anchor links into a
giant page where the relevant section may be collapsed; previews all look identical
and attribution is mush. The requirement this creates: every page must survive
being someone's first touch. How It Works and What You'll Learn currently don't.

## Recommended fixes (keep structure, close the gaps)

1. Make every sub-page standalone. Add a short answer-first lede to How It Works,
   What You'll Learn, and Pricing: one paragraph stating what the program is, who
   it's for ($3M–$100M companies), and the price range, with a link back to the
   Overview. This serves cold-shared prospects and AI extraction simultaneously.
2. Build the journey into the body. End each page with a contextual next-step
   block: Overview → How It Works → What You'll Learn → Pricing → Request a
   Consultation. Today the chain breaks after How It Works.
3. Add schema. FAQPage JSON-LD on Overview (9 questions) and Pricing (4 questions);
   Service schema on Pricing with the three plans as Offers ($5,500 / $8,000 /
   $10,500 monthly) and the kickoff. This is the single highest-leverage AEO change.
4. Put social proof on Pricing. It's the decision page and the only one with no
   testimonials. One results-focused quote near the plans (ideally mentioning ROI
   or payback) works harder there than a third repeat of the same quote elsewhere.
5. De-dupe testimonials. The same large quote appears on three pages; vary the
   featured quote per page so a full-section reader hears different voices.
6. Cross-link the audit. The Overview FAQ "Can we implement Endless Customers
   without coaching?" and the "below $3M revenue" FAQ are natural places to point
   to the Marketing Audit & Recommendations as the lighter first step.

## Migration audit: live impactplus.com vs. Website v2 (added after comparison)

Compared all four live pages (impactplus.com/endless-customers-coaching/*) against
the migrated section. The good news first: every pricing number matches exactly
(kickoff $10,000 / $12,500, plans $5,500 / $8,000 / $10,500, all add-on ranges,
the $75K–$150K and ROI figures in the FAQs). Structure and section order migrated
faithfully. But meaningful content was lost or changed in migration:

### Factual error introduced (fix first)

The live pricing table includes Website Optimization Training, Assignment Selling
Training, and AI for Sales Training in the Mastery plan. The migrated Mastery card
omits them and lists "Assignment Selling & AI for Sales training" under Mastery
Accelerated only, implying they're Accelerated-exclusive. This mis-sells the $8,000
plan and contradicts the live site.

### Content lost in migration

1. Overview FAQ "What does the process look like to get started?" was dropped
   entirely (it carries the path diagram, the schedule-a-call link, and the
   "What to Expect" resource link). The strongest pre-sales FAQ on the live page.
2. Pricing page hero video (the pricing explainer lightbox) didn't migrate; the
   thumbnail asset exists in /assets/images/coaching-action-shots. The Overview FAQ
   "Can we implement without coaching?" also embeds a YouTube video live; not
   migrated.
3. The ROI FAQ on Pricing was heavily condensed: lost the "win even 25% of the
   deals you're currently missing" framing, the cost/value-video closing example,
   and the "If we increased our market share by 25%..." prompt. That's the best
   sales copy on the page.
4. The total-cost FAQ lost the reassurance that hiring early-career staff and
   training them in the program keeps costs manageable.
5. Six inline resource links were stripped: all four on How It Works (Endless
   Customers Journey, Scorecard, Alignment Day, Planning Session articles) and two
   on What You'll Learn (HubSpot training, How to Hire a Videographer). These are
   internal-linking and AEO assets.
6. Testimonials cut from 8 to 4–6 per page. Taffy Ragan and Kaitlyn Pintarich
   appear on no migrated sub-page; Dave Owens and Julianne Calapa dropped from
   Overview. Several quotes were trimmed or edited (Scott Merritt's "Our
   competition doesn't like it" was removed).
7. Step copy on How It Works trimmed: lost "Sales and marketing will begin meeting
   regularly to align on content that supports revenue" (Step 2) and the Game Plan
   alignment sentence (Step 3).
8. The live coaching sub-nav has five items: Overview | How it Works | What You'll
   Learn | Pricing | Success Stories. The migrated sub-nav dropped Success Stories.
9. Smaller drops: PriceGuide.ai lost the "created by Marcus Sheridan" attribution;
   TRUST theme pricing lost the "$15,000 for 1:1 migrations" note; the live
   bottom-of-page podcast subscribe block has no migrated equivalent.

### Probably intentional (confirm, don't revert)

CTA language changed site-wide from "Schedule an Initial Call" (schedule-now) to
"Request a Consultation" (/lets-talk). Consistent across all pages, assumed
deliberate for the new funnel.

## Consolidated execution plan (revised)

Priority order, combining migration restoration with the original six fixes:

1. Fix the Mastery plan inclusion matrix on Pricing to match the live table.
2. Restore the "What does the process look like to get started?" FAQ on Overview.
3. Restore the ROI and total-cost FAQ richness on Pricing.
4. Restore the trimmed Step 2/3 copy on How It Works.
5. Re-add the six stripped inline resource links (pointing to impactplus.com/learn,
   consistent with how What You'll Learn already links there).
6. Add Success Stories to the coaching section sub-nav on all four pages.
7. Restore the full testimonial set; vary the featured quote per page; add at least
   one ROI-flavored testimonial to Pricing (currently has zero social proof).
8. Add answer-first standalone ledes to How It Works, What You'll Learn, and
   Pricing (what the program is, who it's for, price range, link to Overview).
9. Add contextual next-step links: Overview → How It Works → What You'll Learn →
   Pricing.
10. Add FAQPage schema (Overview + Pricing) and Service schema with the three plans
    as Offers on Pricing.
11. Cross-link the Marketing Audit & Recommendations from the "implement without
    coaching" and "below $3M" FAQs as the lighter first step.
12. Pricing video: re-embed when the video asset is available (thumbnail already
    in the repo); placeholder pattern exists on other service pages.

## When one page would be right

For completeness: consolidation makes sense when section pages are thin (a few
hundred words), when analytics show nobody navigates past the first page, or when
the offer is simple enough to decide in one sitting. None of those apply to a
considered, six-figure-per-year program with a four-stage research journey.
