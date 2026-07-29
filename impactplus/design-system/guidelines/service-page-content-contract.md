# V2 Service Page Content Contract

Status: approved local/template authority. Final HubSpot publishing values remain subject to staging QA.

## Purpose

This contract lets coded pages and marketer-managed HubSpot pages use the same buyer sequence, facts, proof, AEO structure, and conversion behavior without duplicating page copy or creating one-off layouts.

## Page order

1. Outcome-led `ServiceHero`
2. `ServiceDecisionSnapshot`
3. Overview: recognizable problem and mechanism
4. What You Get: deliverable, scope, evidence, and ownership
5. How It Works: client effort, IMPACT work, and timing
6. Detailed proof
7. Pricing and risk reversal
8. Explore Call conversion
9. Direct-answer FAQ
10. Three-resource Learning Center cluster
11. IMPACT/provider authority
12. Final CTA

Only five chapters receive sticky-subnavigation anchors: Overview, What You Get, How It Works, Reviews, and Pricing. Supporting blocks do not create additional navigation clutter.

## Service hero fields

- Service accent role
- Official service name
- Outcome-led H1
- 25-to-30-word lead
- Primary Explore Call CTA
- Risk-reducing microcopy
- Rating/source
- Scale proof
- Guarantee link
- Video poster, title, duration, accessible label, final video URL, captions, and transcript

The video may use a clearly labeled placeholder while the page is being designed. It must be real, captioned, and functional before publication.

## Decision snapshot fields

- Direct service definition
- Intended buyer
- Provider
- Methodology or brand relationship
- Ownership/independence statement
- Investment
- Turnaround
- Scope
- Deliverable
- AI's supporting role and the human expert's decision responsibility, when AI materially assists the service
- Link to detailed proof

The snapshot is the page's direct-answer/AEO block. It explains the offer positively and on its own terms. Do not introduce cheaper or free alternatives in this high-attention position unless verified buyer research shows that comparison is necessary. Later sections expand the reasoning and evidence; they do not repeat the definition or commercial facts verbatim.

## Proof contract

Detailed proof appears before pricing and the conversion form. Each proof item needs:

- Supported claim
- Named person and company
- Starting situation
- What IMPACT provided
- What the client did
- Outcome and timeframe when available
- Direct source or case-study link
- Permission and freshness status

Broad IMPACT credibility is not presented as if it were a result of the specific service.

## Learning Center cluster

Use exactly three hand-curated resources when strong supporting content exists:

- One resource explaining the buyer's underlying problem
- One resource showing the principle or method in practice
- One comparison, pricing, methodology, or decision resource

Do not use a generic recent-post feed. The cluster supports the service decision and keeps one commercial next step.

## Prototype versus publishing responsibilities

| Local design/template stage | HubSpot staging and publishing stage |
|---|---|
| Final visible copy and facts | Final production URL and canonical |
| Proposed title and description | Open Graph/X tags and final social image URL |
| Service/provider/methodology relationships | JSON-LD assembled from the centralized entity registry |
| Price, timing, scope, offer, breadcrumb, and video data requirements | Rendered schema validation and duplicate-node audit |
| Social-card creative brief | Upload and final CDN asset URL |
| Metadata and schema field contract | Indexability, redirects, sitemap, analytics, and release QA |

Schema is not optional or postponed until after launch. URL-dependent markup is intentionally generated in HubSpot so local prototypes do not create competing canonicals or entity IDs.

## HubSpot implementation boundary

- The template owns the layout, semantic landmarks, metadata fields, schema hooks, analytics hooks, and five-anchor subnavigation.
- A coded-body service page may hard-code its approved middle content, but it still uses the shared tokens and content contracts.
- A managed service page uses flexible modules that expose the same approved fields.
- Header, footer, canonical, social metadata, schema, analytics, and consent behavior remain outside the page-body construction choice.
- Internal field names are immutable after production content exists unless a migration has been approved and tested.

## No-repeat check

Before approval, compare the hero and decision snapshot with every later section. Remove repeated sentences and assign each block one job:

- Hero: earn attention
- Snapshot: define the service, clarify responsibility, and state essential facts
- Overview: explain the problem and mechanism
- What You Get: show the artifact and scope
- Proof: make claims credible
- Pricing: justify the investment
- FAQ: resolve remaining practical objections
