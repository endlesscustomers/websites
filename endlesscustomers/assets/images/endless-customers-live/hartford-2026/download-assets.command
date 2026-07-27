#!/usr/bin/env bash
# download-assets.command
# Double-click this file on your Mac (or run: bash download-assets.command)
# Downloads every image + the hero video for the EC Live Hartford 2026 page
# into this folder, with the exact filenames the page references.

set -e
BASE="$(cd "$(dirname "$0")" && pwd)"
cd "$BASE"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"

dl() { # filename  url
  echo "  ↓ $1"
  curl -fsSL -A "$UA" "$2" -o "$1" || echo "    ⚠ Failed: $2"
}

EC="https://www.endlesscustomers.com"
IMP="https://www.impactplus.com"
CDN="https://145335.fs1.hubspotusercontent-na1.net/hubfs/145335"
ICON="$IMP/hubfs/IMPACT%20Production%20Website%20(2023)/Assets/Icon%20Library/Blue"
RWR="$EC/hubfs/IMPACT_Framework_3/Inbound%20Success%20Playbook/Real%20World%20Results"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  EC Live — Hartford 2026 page assets"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""; echo "▸ branding / hero"
dl "ec-live-logo.png"            "$EC/hs-fs/hubfs/Dark-Horizontal-Logo-1.png"
dl "hero-video.mp4"              "$EC/hubfs/IMPACT%20Live%202025_Chicago/IMLive_2025-ezgif.com-resize-video.mp4"
dl "hero-video-placeholder.png"  "$EC/hubfs/IMPACT%20Live/2024/Hartford/IMLive%20Masked%20Vdeo%20Placeholder.png"
dl "be-inspired.png"             "$CDN/Endless%20Customers%20Live/assets/images/endless_customers_live_be_inspired.png"
dl "ali-speaker.png"             "$CDN/Endless%20Customers%20Live/assets/images/endless_customers_live_ali.png"
dl "og-graphic.png"              "$EC/hubfs/Endless%20Customers%20Live%202026%20EMAIL%20GRAPHICS-1.png"

echo ""; echo "▸ industry icons"
dl "b2b-services.svg"            "$ICON/b2b%20services.svg"
dl "building-materials.svg"      "$ICON/building%20materials.svg"
dl "commercial-real-estate.svg"  "$ICON/commercial%20real%20estate.svg"
dl "construction.svg"            "$ICON/construction.svg"
dl "cybersecurity.svg"           "$ICON/cybersecurity.svg"
dl "franchises.svg"              "$ICON/Franchises.svg"
dl "healthcare.svg"              "$ICON/healthcare.svg"
dl "homebuilders-remodelers.svg" "$ICON/Homebuilders%20and%20Remondelers.svg"
dl "home-improvement.svg"        "$ICON/home%20improvement.svg"
dl "insurance.svg"               "$ICON/insurance.svg"
dl "logistics.svg"               "$ICON/logistics.svg"
dl "managed-services.svg"        "$ICON/managed%20services.svg"
dl "manufacturers.svg"           "$ICON/Manufacturers.svg"
dl "retail.svg"                  "$ICON/retail.svg"

echo ""; echo "▸ results logos"
dl "roofcrafters.png"  "$EC/hubfs/roofcrafters--color-outline-logo.png"
dl "fire-and-ice.png"  "$RWR/Fire%20and%20Ice/fire%26ice-logo-min.png"
dl "thoroughcare.png"  "$RWR/ThoroughCare/thoroughcare-logo--full-color-min.png"
dl "dalinghaus.png"    "$EC/hubfs/Dalinghaus_Logo-1.png"
dl "lazboy.png"        "$RWR/logo-lazboy-home-furnishings-decor.png"
dl "intek.jpg"         "$RWR/Intek/intek-logo-TM-1.jpg"
dl "aquila.png"        "$EC/hubfs/Aquila-logo.png"
dl "yale.png"          "$EC/hubfs/Yale-2.png"

echo ""; echo "▸ hotel"
dl "hartford-marriott.png" "$CDN/hartford%20marriott%20downtown.png"

echo ""; echo "▸ sponsors"
dl "sponsor-ec.svg"        "$EC/hubfs/Vertical-Blue.svg"
dl "sponsor-hubspot.png"   "$EC/hs-fs/hubfs/hubspot%20logo.png"
dl "sponsor-salesmsg.png"  "$EC/hs-fs/hubfs/salesmsg%20logo.png"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Done. If any file failed or came back tiny, open its URL"
echo "  in a browser and save it here manually."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
