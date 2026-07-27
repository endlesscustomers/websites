#!/usr/bin/env bash
# download-assets.command
# Double-click this file on your Mac (or run: bash download-assets.command)
# Downloads every image + video for the Endless Customers Coaching pages
# into this folder, with the exact filenames the pages reference.

set -e
BASE="$(cd "$(dirname "$0")" && pwd)"
cd "$BASE"
mkdir -p icons team
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"

dl() { # filename  url
  echo "  ↓ $1"
  curl -fsSL -A "$UA" "$2" -o "$1" || echo "    ⚠ Failed: $2"
}

IMP="https://www.impactplus.com"
SVC="$IMP/hubfs/impact_site_2025_IM-UI/assets/images/services"
HDI="$IMP/hubfs/Hand-drawn%20Icons"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Endless Customers Coaching — page assets"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""; echo "▸ branding / hero"
dl "ec-coaching-logo.png"        "$IMP/hubfs/impact_site_2025_IM-UI/assets/logos/EC-Coaching-Trainig-Logo.png"
dl "coaching-overview-video.mp4" "$IMP/hubfs/EC-80-coaching-thumbnail.mp4"
dl "og-coaching.jpg"             "$IMP/hubfs/impact_site_2025_IM-UI/assets/featured-images/homepage-featured-image.jpg"

echo ""; echo "▸ section images"
dl "proven-system-chart.jpg"       "$SVC/proven-system-endless-customers-chart.jpg"
dl "path-to-endless-customers.svg" "$SVC/how-it-works/path-to-endless-customers.svg"

echo ""; echo "▸ team"
dl "team/coaches.png"             "$SVC/coaches.png"
dl "team/trainers.png"            "$SVC/trainers.png"
dl "team/website-strategists.png" "$SVC/website-strategists.png"

echo ""; echo "▸ icons"
dl "icons/checkmark-green.svg" "$IMP/hubfs/impact_site_2025_IM-UI/assets/icons/green/checkmark-green.svg"
dl "icons/team.svg"                       "$HDI/Team.svg"
dl "icons/alignment.svg"                  "$HDI/Alignment.svg"
dl "icons/hiring.svg"                     "$HDI/Hiring.svg"
dl "icons/content.svg"                    "$HDI/Content.svg"
dl "icons/hubspot.svg"                    "$HDI/HubSpot.svg"
dl "icons/ai.svg"                         "$HDI/AI.svg"
dl "icons/video.svg"                      "$HDI/Video.svg"
dl "icons/website.svg"                    "$HDI/Website.svg"
dl "icons/on-camera-performance.svg"      "$HDI/On-Camera-Performance.svg"
dl "icons/sales-training.svg"             "$HDI/Sales-Training.svg"
dl "icons/endless-customers.svg"          "$HDI/Endless-Customers.svg"
dl "icons/more-sales.svg"                 "$HDI/More-Sales.svg"
dl "icons/improved-sales-performance.svg" "$HDI/Improved-Sales-Performance.svg"
dl "icons/target-buyer.svg"               "$HDI/Target-Buyer.svg"
dl "icons/strategy.svg"                   "$HDI/Strategy.svg"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Done. If any file failed or came back tiny, open its URL"
echo "  in a browser and save it here manually."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
