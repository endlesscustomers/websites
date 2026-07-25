# IMPACT — Brand Assets

IMPACT's logos and imagery are served from their public HubSpot CDN. The CDN
blocks programmatic download (no CORS, bot-guarded), so this design system
**references the real, stable CDN URLs directly** rather than storing copies.
Every URL below was verified to load. This keeps marks pixel-accurate and avoids
reconstructing any logo from memory.

> To fully localize the system, download the official packs from the brand page
> and drop them in this folder, then swap the URLs:
> - Full logo pack: `https://www.impactplus.com/hubfs/IMPACT Style and Branding Assets/Full IMPACT Logo.zip`
> - "IM" half-logo pack: `https://www.impactplus.com/hubfs/IMPACT Style and Branding Assets/Half IMPACT Logo.zip`
> - Brand hub: https://www.impactplus.com/brand

## Logos

| Name | Usage | URL |
|------|-------|-----|
| IMPACT logo — black (contained) | light backgrounds, footer | `https://www.impactplus.com/hubfs/Black%20Logo%20-%20Full/IMPACT-logo--Black-contained.svg` |
| IMPACT logo — white (full) | dark header / dark bands | `https://www.impactplus.com/hubfs/IMPACT%20Style%20and%20Branding%20Assets/White%20Logo%20-%20Full/IMPACT-Logo--White-Full.png` |
| IMPACT logo — blue (full) | brand splashes | `https://www.impactplus.com/hubfs/IMPACT%20Style%20and%20Branding%20Assets/Blue%20Logo%20-%20Full/IMPACT-Logo--Blue-Full.png` |
| Endless Customers — black | on light | `https://www.impactplus.com/hubfs/Imported%20sitepage%20images/Endless%20Customers%20Logo%20-%20Black.svg` |
| Endless Customers — white (no icon) | on dark | `https://www.impactplus.com/hubfs/Endless%20Customers/Logo/Endess_Customers_Logo_White__NoIcon.svg` |
| EC Coaching & Training Program lockup | program card | `https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/homepage/Book_EC-Program.svg` |
| Endless Customers LIVE lockup | conference card | `https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/homepage/EC_Homepage_EC-Live.svg` |

## Imagery

| Name | URL |
|------|-----|
| Homepage hero (conference crowd) | `https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/homepage/Homepage_Featured_image.jpg` |
| Endless Customers mini-book cover | `https://www.impactplus.com/hs-fs/hubfs/Endless%20Customers/Assets/Book/EC-Minibook-Best-Seller-Framed.png` |
| Hello-bar decoration (left) | `https://www.impactplus.com/hs-fs/hubfs/impact_site_2025_IM-UI/assets/hellobar/ec_bg_left.png` |
| Hello-bar decoration (right) | `https://www.impactplus.com/hs-fs/hubfs/impact_site_2025_IM-UI/assets/hellobar/ec_bg_right.png` |

## Icons

- **Ecee AI chat / search glyphs** (brand-specific):
  `https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/icons/white/ai_icon_chat.svg`,
  `.../ai_icon_search.svg`
- **Generic UI glyphs** (chevron, arrow-right, check, plus, star, play, search,
  social): the live site uses simple single-weight line/solid SVGs. This system
  substitutes **Lucide** (`https://unpkg.com/lucide@latest`) — a free,
  MIT-licensed set with a matching clean single-stroke look. Green check marks
  use Lucide `check` filled with `--accent-check` (#01C4A2), mirroring the site.
  ⚠️ Substitution — swap for IMPACT's own icon SVGs when localizing.

See `../readme.md` → ICONOGRAPHY for the full approach.
