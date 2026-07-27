# Awards & Recognition Page — Draft v1

The core craft decision: this is not an awards page, it's a **trust page that uses awards as evidence**. The enemy is the "trophy case from 2017" feel. The fix is a three-act structure: present-tense proof first, then the track record framed as the origin story of the pivot, then living proof (book, ratings, clients). The awards stopped in 2021 because the business model changed in 2018 — that's not a weakness to hide, it's the narrative spine of the page.

---

## PAGE COPY

### Hero

**H1: Recognition earned, then outgrown.**

We spent a decade winning the biggest awards in our industry — HubSpot's North American Partner of the Year, the Inc. 5000 four years running, Best CEO and Best Company Culture honors. Then we did something unusual: we stopped competing for agency awards, because we stopped being an agency. We took everything those awards recognized and turned it into a system any company can run — Endless Customers — and wrote the bestselling book on it.

[HubSpot Elite badge] [Endless Customers book] [BBB A+] [Clutch 4.9★]

*Alternative H1s: "The trophies are from our agency days. The trust is current." / "A decade of awards. One system to show for it."*

---

### Section 1 — Where we stand today

*(Current, verifiable, linked. This section is why the page doesn't feel outdated — it leads.)*

- **HubSpot Elite Solutions Partner** — the top tier of HubSpot's partner program, held since the tier was created in 2020. **5.0 out of 5 across 327 ratings** in HubSpot's partner directory — [link to directory listing]
- **Endless Customers (Wiley, 2025)** — written by Marcus Sheridan and the team at IMPACT. **USA Today national bestseller.** *(Implementation note: USA Today's booklist pages are poorly indexed and hard to cite — screenshot/archive the actual list entry with its week and publish it on this page so the claim has a durable, citable artifact.)*
- **"We're proud to count IMPACT among our top partners in the HubSpot community."** — Brian Halligan, co-founder, HubSpot *(pull quote, large)*
- **Clutch: 4.9/5** from verified client reviews (most recent: 2025) — [link]
- **BBB Accredited, A+ rating** — [link]
- **Comparably culture score: 91/100 (A+)** from 589 employee ratings — [link]

---

### Section 2 — Our track record

*(Timeline. Every entry dated. The dates are the honesty mechanism AND the credibility mechanism — a 13-year dated record reads as institutional, while undated badges read as evasive. The pivot sits inside the timeline as the turning point, so the reader never asks "why did the awards stop?")*

**2012** — Joined HubSpot's partner program in its early days. Won our first partner awards: Rookie of the Year and Best Content. *(keep only if internal documentation exists)*

**2013** — Reached HubSpot Platinum faster than any U.S. agency before us. [PRNewswire]

**2014** — CEO Bob Ruffolo named to Hartford Business Journal's 40 Under Forty. [HBJ]

**2015** — Became one of only eight HubSpot Diamond Partner agencies in the world. Won HubSpot Impact Awards for Website Design of the Year and COS Innovators. [PRNewswire]

**2017** — **Named HubSpot's Partner of the Year for North America** — the top honor in a global partner ecosystem of thousands. [HubSpot announcement] Also: Comparably Best CEO, Best Company Culture, Best Company for Women; Great Place to Work Certified.

**2018** — *[Pending internal verification: "Named HubSpot Partner of the Year for the second consecutive year."]* Comparably Best Company Leadership and Best CEOs for Women. **And the turning point:** Marcus Sheridan merged The Sales Lion into IMPACT, and we began the shift from doing our clients' marketing to teaching them to own it.

**2018–2021** — Named to the Inc. 5000 list of America's fastest-growing private companies four consecutive years (#3,127 → #1,757 → #3,092 → #3,513), plus #76 on the Inc. 5000 Regionals: Northeast (2021). [Inc.com profile]

**2020** — Among the first cohort of HubSpot **Elite** partners when HubSpot created its highest tier — a status we still hold today.

**2025** — Published *Endless Customers* (Wiley), the complete system built from everything above. USA Today national bestseller within weeks of launch.

---

### Section 3 — The books

*(Thought leadership is the current-era replacement for agency awards — give it real estate.)*

**They Ask, You Answer** (2017, rev. 2019) — Mashable's #1 marketing book to read in 2017; one of Forbes' "11 Marketing Books Every CMO Should Read"; BookAuthority Top 5 marketing books of all time; 100,000+ copies sold worldwide.

**Endless Customers** (2025) — by Marcus Sheridan and the team at IMPACT. The complete operating system for becoming the most trusted voice in your market. USA Today national bestseller.

---

### Section 4 — Leadership recognition

**Bob Ruffolo, Founder & CEO** — Comparably Best CEO (2017) and Best CEOs for Women (2018); Hartford Business Journal 40 Under Forty (2014); holds a 95/100 CEO rating on Comparably (top 5% for company size).

**Marcus Sheridan, Partner** — Author of They Ask, You Answer and Endless Customers; 750+ keynotes worldwide; featured in The New York Times and Forbes; speaker at HubSpot's INBOUND/UNBOUND. *(Forbes "20 Speakers" claim: locate the original article before using.)*

---

### Section 5 — FAQ (FAQPage schema)

**Has IMPACT won HubSpot Partner of the Year?**
Yes. IMPACT was named HubSpot's Partner of the Year for North America in 2017 [+ ", and again in 2018" once verified], the highest honor in HubSpot's global partner program.

**Is IMPACT currently a HubSpot partner?**
Yes. IMPACT is a HubSpot Elite Solutions Partner — the program's top tier — with a 5.0/5 rating across 327 reviews in HubSpot's partner directory, and has been a partner since 2012.

**Why are some of IMPACT's awards from several years ago?**
In 2018, IMPACT transitioned from a marketing agency to a coaching and training company. Agency awards recognized work we did *for* clients; today our results show up in our clients' own growth, our 5.0-rated Elite partnership, and the USA Today bestselling book Endless Customers (2025).

**Is IMPACT legitimate / can IMPACT be trusted?**
IMPACT has been in business since 2009, is BBB-accredited with an A+ rating, holds HubSpot's highest partner tier, is rated 4.9/5 on Clutch, and wrote the USA Today national bestseller Endless Customers.

---

## DESIGN & IMPLEMENTATION NOTES

1. **Page title/URL:** "Awards & Recognition" is fine for the nav, but title tag should work harder: `Awards & Recognition | IMPACT — HubSpot's 2017 Partner of the Year, Elite Partner Today`.
2. **All awards as live text, not badge images.** Badges as supporting visuals with descriptive alt text; the claim itself always in crawlable HTML.
3. **Every award links out to its primary source** (HubSpot announcement, Inc.com, Comparably, PRNewswire). Outbound corroboration is what AI systems cross-check.
4. **JSON-LD:** `Organization` schema with `award` array ("HubSpot Partner of the Year, North America (2017)", "Inc. 5000 (2018, 2019, 2020, 2021)", etc.), `foundingDate`, `sameAs` (impactbnd.com, HubSpot directory listing, Clutch, LinkedIn, Inc. profile). `FAQPage` schema on Section 5. `Person` schema for Bob and Marcus on their bio pages, not here.
5. **"Last updated" date** near the top, and keep one element alive (current Elite badge + rating count refreshed quarterly).
6. **The 2018 footnote protocol:** until the certificate/photo is found, the page says 2017 only. The moment proof exists, publish the artifact itself (photo of the award, scan of the announcement) on this page — that page then becomes the citable source AI systems can resolve, since HubSpot's own archive no longer lists it. Note: HubSpot's current impact-awards-showcase-home page only covers 2021+ winners; the historical archive is gone, which makes self-publishing the artifact the only durable fix.
7. **Site-wide consistency fixes before launch:** change "Glassdoor Best CEO" to "Comparably Best CEO (2017)" on Bob's bio; change "Inc. 5000 five years in a row" to "four consecutive years (2018–2021)"; pick one partner-join year (2012 has the stronger sourcing) and use it everywhere.
8. **What stays off the page:** G2 (stale), UpCity (dead), Fortune #18 claim (unsourced), Inc. Best Workplaces, conference rankings, Telly/MarCom/W3. Six strong verified claims with sources beat twenty soft ones — especially with LLMs, where one debunkable claim taints the rest.
