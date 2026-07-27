#!/usr/bin/env bash
# download-assets-pages.command
# Double-click this file on your Mac (or run: bash download-assets-pages.command)
# Downloads images for the coaching sub-pages (How It Works, What You'll Learn, Pricing)
# into this folder, with the exact filenames the pages reference.

set -e
BASE="$(cd "$(dirname "$0")" && pwd)"
cd "$BASE"
mkdir -p how-it-works whats-covered pricing
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"

dl() { echo "  ↓ $1"; curl -fsSL -A "$UA" "$2" -o "$1" || echo "    ⚠ Failed: $2"; }

IMG="https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/images"
HIW="$IMG/services/how-it-works"
WYL="$IMG/what-youll-learn"
PRI="$IMG/pricing"
ECG="$IMG/endless-customer-graphics"

echo ""; echo "▸ How It Works"
dl "how-it-works/hero.png"                   "$HIW/how-it-works-mobile-full.png"
dl "how-it-works/journey-graphic.svg"        "$ECG/Endless-Customers-Journey-graphic-only.svg"
dl "how-it-works/alignment-day.png"          "$HIW/alignment-day.png"
dl "how-it-works/first-90-days.png"          "$HIW/first-90-days.png"
dl "how-it-works/90-day-cycles.png"          "$HIW/90-day-cycles.png"
dl "how-it-works/achieve-mastery-and-scale.png" "$HIW/achieve-mastery-and-scale.png"

echo ""; echo "▸ What You'll Learn"
dl "whats-covered/the-right-content.svg"               "$WYL/the-right-content.svg"
dl "whats-covered/the-right-website.svg"               "$WYL/ther-right-website.svg"
dl "whats-covered/the-right-sales-activities.svg"      "$WYL/the-right-sales-activities.svg"
dl "whats-covered/the-right-technology.svg"            "$WYL/the-right-technology.svg"
dl "whats-covered/the-right-culture-of-performance.svg" "$WYL/the-right-culture-of-performance.svg"

echo ""; echo "▸ Pricing"
dl "pricing/website-redesign.png"    "$PRI/website-redesign.png"
dl "pricing/self-service-tools.png"  "$PRI/self-service-tools.png"
dl "pricing/learning-centers.png"    "$PRI/learning-centers.png"
dl "pricing/paid-ads.png"            "$PRI/paid-ads.png"
dl "pricing/key-roles.png"           "$PRI/key-roles-pricing.png"
dl "pricing/technology-stack.png"    "$PRI/technology-stack-pricing.png"
dl "pricing/video-equipment.png"     "$PRI/video-equipment-pricing.png"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Done. If any file failed or came back tiny, open its URL"
echo "  in a browser and save it here manually."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
