#!/usr/bin/env bash
# download-images.sh
# Run from this directory: bash download-images.sh
# Downloads and organizes images from impactplus.com into the correct folders.

set -e
BASE="$(cd "$(dirname "$0")" && pwd)"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"

dl() {
  local folder="$1"
  local filename="$2"
  local url="$3"
  mkdir -p "$BASE/$folder"
  echo "  ↓ $folder/$filename"
  curl -sSL -A "$UA" "$url" -o "$BASE/$folder/$filename" || echo "    ⚠ Failed: $url"
}

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Downloading impactplus.com images"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"


# ── 1. BIO PICTURES ──────────────────────────────────────────────────────────
echo ""
echo "▸ bio-pictures"

# Confirmed full-size headshots
dl "bio-pictures" "1920px_Bob_Ruffolo.jpg" \
  "https://www.impactplus.com/hubfs/IMPACT%20Team/Assets/Minyan_Photos/1920px/1920px_Bob_Ruffolo.jpg"
dl "bio-pictures" "500px_Square_Bob_Ruffolo.jpg" \
  "https://www.impactplus.com/hubfs/IMPACT%20Team/Assets/Minyan_Photos/500px_Square/500px_Square_Bob_Ruffolo%20copy.jpg"
dl "bio-pictures" "1920px_Marcus_Sheridan.jpg" \
  "https://www.impactplus.com/hubfs/IMPACT%20Team/Assets/Minyan_Photos/1920px/1920px_Marcus_Sheridan.jpg"
dl "bio-pictures" "Marcus_Sheridan_Circle_Cut.png" \
  "https://www.impactplus.com/hubfs/IMPACT%20Team/Assets/Circle%20Cutouts/Marcus_Sheridan__Circle_Cut.png"

# Full team — URL pattern: 1920px_[First]_[Last].jpg
TEAM_MEMBERS=(
  "Michael_Accuosti"
  "Nancy_Andrade"
  "Joe_Bachir"
  "Derek_Baer"
  "Stephanie_Baiocchi"
  "John_Becker"
  "Allison_Belles"
  "Mary_Brown"
  "Cielo_Cabalfin"
  "Brian_Casey"
  "Nicole_Cimo"
  "Katie_Coelho"
  "Reagan_Cotton"
  "Tom_DiScipio"
  "Carolyn_Edgecomb"
  "Daniel_Escardo"
  "Cassie_Findley"
  "Vin_Gaeta"
  "Tanner_Holman"
  "Brett_Ingram"
  "Ashley_Jensen"
  "Jason_Linde"
  "Janet_Mendez"
  "Austin_Mock"
  "Melanie_Moore"
  "Rachel_Palmateer"
  "Jessica_Palmeri"
  "Kaitlyn_Petro"
  "Joe_Rinaldi"
  "Reyna_Yareli_Rodriguez"
  "Sarah_Schreck"
  "Melissa_Smith"
  "Justine_Timoteo"
  "Mandy_York"
)

for name in "${TEAM_MEMBERS[@]}"; do
  dl "bio-pictures" "1920px_${name}.jpg" \
    "https://www.impactplus.com/hubfs/IMPACT%20Team/Assets/Minyan_Photos/1920px/1920px_${name}.jpg"
done

# Group photo
dl "bio-pictures" "Mobile_Team.png" \
  "https://www.impactplus.com/hs-fs/hubfs/impact_site_2025_IM-UI/assets/images/team/Mobile_Team.png"
dl "bio-pictures" "IMPACT-Team-FacebookOG.jpg" \
  "https://www.impactplus.com/hubfs/IMPACT_Team/Assets/IMPACT-Team-FacebookOG.jpg"


# ── 2. ENDLESS CUSTOMERS LIVE ────────────────────────────────────────────────
echo ""
echo "▸ endless-customers-live"

dl "endless-customers-live" "EC-Live-Hartford-2026-email-graphic.png" \
  "https://www.endlesscustomers.com/hubfs/Endless%20Customers%20Live%202026%20EMAIL%20GRAPHICS-1.png"
dl "endless-customers-live" "EC-Live-Chicago-hero.png" \
  "https://www.endlesscustomers.com/hubfs/EC%20Live%20-%20Chicago/EC%20Live%20hero%20image%20email%202.png"
dl "endless-customers-live" "IMLive-Hartford-video-placeholder.png" \
  "https://www.endlesscustomers.com/hubfs/IMPACT%20Live/2024/Hartford/IMLive%20Masked%20Vdeo%20Placeholder.png"
dl "endless-customers-live" "EC-Live-Dark-Horizontal-Logo.png" \
  "https://www.endlesscustomers.com/hs-fs/hubfs/Dark-Horizontal-Logo-1.png"
dl "endless-customers-live" "impact_live_group_wide.jpg" \
  "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/about_impact/impact_live_group_wide.jpg"
dl "endless-customers-live" "group_event.jpg" \
  "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/about_impact/group_event.jpg"
dl "endless-customers-live" "marcus_in_person_event.jpg" \
  "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/about_impact/marcus_in_person_event.jpg"
dl "endless-customers-live" "MarcusSheridanConference.jpg" \
  "https://www.impactplus.com/hubfs/IMPACT%20Production%20Website%20(2023)/Assets/Photos/MarcusSheridanConference.jpg"
dl "endless-customers-live" "about-impact-events.png" \
  "https://www.impactplus.com/hubfs/about-impact-events.png"


# ── 3. COACHING ACTION SHOTS ─────────────────────────────────────────────────
echo ""
echo "▸ coaching-action-shots"

dl "coaching-action-shots" "designer.jpg" \
  "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/about_impact/designer.jpg"
dl "coaching-action-shots" "bob_tom.jpg" \
  "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/about_impact/bob_tom.jpg"
dl "coaching-action-shots" "virtual_meeting.jpg" \
  "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/about_impact/virtual_meeting.jpg"
dl "coaching-action-shots" "jess_video.jpg" \
  "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/about_impact/jess_video.jpg"
dl "coaching-action-shots" "Thomas-8.jpg" \
  "https://www.impactplus.com/hubfs/Thomas-8.jpg"
dl "coaching-action-shots" "tom_meeting.jpg" \
  "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/about_impact/tom_meeting.jpg"
dl "coaching-action-shots" "allison_filming.jpg" \
  "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/about_impact/allison_filming.jpg"
dl "coaching-action-shots" "jess_talking.jpg" \
  "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/about_impact/jess_talking.jpg"
dl "coaching-action-shots" "vin_connor_meeting.jpg" \
  "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/about_impact/vin_connor_meeting.jpg"
dl "coaching-action-shots" "coaches.png" \
  "https://www.impactplus.com/hs-fs/hubfs/impact_site_2025_IM-UI/assets/images/services/coaches.png"
dl "coaching-action-shots" "trainers.png" \
  "https://www.impactplus.com/hs-fs/hubfs/impact_site_2025_IM-UI/assets/images/services/trainers.png"
dl "coaching-action-shots" "website-strategists.png" \
  "https://www.impactplus.com/hs-fs/hubfs/impact_site_2025_IM-UI/assets/images/services/website-strategists.png"
dl "coaching-action-shots" "ec_training_thumbnail.jpg" \
  "https://www.impactplus.com/hubfs/ec_training_thumbnail.jpg"
dl "coaching-action-shots" "Who-Will-Be-My-Coach.webp" \
  "https://www.impactplus.com/hubfs/Who%20Will%20Be%20My%20Endless%20Customers%20Coach.webp"


# ── 4. LOGOS AND BRANDING ─────────────────────────────────────────────────────
echo ""
echo "▸ logos-and-branding"

dl "logos-and-branding" "IMPACT-logo-black.svg" \
  "https://www.impactplus.com/hubfs/Black%20Logo%20-%20Full/IMPACT-logo--Black-contained.svg"
dl "logos-and-branding" "EC-Coaching-Training-Logo.png" \
  "https://www.impactplus.com/hs-fs/hubfs/impact_site_2025_IM-UI/assets/logos/EC-Coaching-Trainig-Logo.png"
dl "logos-and-branding" "Endless-Customers-Logo-Black.svg" \
  "https://www.endlesscustomers.com/hubfs/Endless%20Customers/Logo/Endless%20Customers%20Logo%20-%20Black.svg"
dl "logos-and-branding" "Endless-Customers-Logo-White.svg" \
  "https://www.endlesscustomers.com/hubfs/Endless%20Customers/Logo/Endless%20Customers%20Logo%20-%20Full%20White.svg"
dl "logos-and-branding" "IMPACT-apple-icon-114x114.png" \
  "https://www.impactplus.com/hubfs/IMPACT%20Style%20and%20Branding%20Assets/Favicon/Ico/IMPACT_apple-icon-114x114.png"
dl "logos-and-branding" "bob-ruffolo-signature.png" \
  "https://www.impactplus.com/hs-fs/hubfs/impact_site_2025_IM-UI/assets/vision_and_values/bob_ruffolo_signature.png"
dl "logos-and-branding" "Vertical-Blue-EC.svg" \
  "https://www.endlesscustomers.com/hubfs/Vertical-Blue.svg"


# ── 5. ACADEMY SCREENSHOTS ───────────────────────────────────────────────────
echo ""
echo "▸ academy-screenshots"

dl "academy-screenshots" "IMPACT-Plus-Community.png" \
  "https://www.impactplus.com/hs-fs/hubfs/IMPACT-Plus-They-Ask-You-Answer-Community.png"
dl "academy-screenshots" "IMPACT-Plus-Device-Display.png" \
  "https://www.impactplus.com/hs-fs/hubfs/Photography/Graphics/IMPACT+%20Device%20Display%20-%20Laptop%20-%20Tablet%20-%20They%20ask%20you%20answer%20-%20Mobile%20-%20Iphone-min.png"


# ── 6. EXAMPLES ───────────────────────────────────────────────────────────────
echo ""
echo "▸ examples"

dl "examples" "proven-system-endless-customers-chart.jpg" \
  "https://www.impactplus.com/hs-fs/hubfs/impact_site_2025_IM-UI/assets/images/services/proven-system-endless-customers-chart.jpg"
dl "examples" "path-to-endless-customers.svg" \
  "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/images/services/how-it-works/path-to-endless-customers.svg"


# ── 7. FEATURED IMAGES ────────────────────────────────────────────────────────
echo ""
echo "▸ featured-images"

dl "featured-images" "Homepage_Featured_image.jpg" \
  "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/homepage/Homepage_Featured_image.jpg"
dl "featured-images" "homepage-featured-image-coaching.jpg" \
  "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/featured-images/homepage-featured-image.jpg"
dl "featured-images" "IMPACT-Team-FacebookOG.jpg" \
  "https://www.impactplus.com/hubfs/IMPACT_Team/Assets/IMPACT-Team-FacebookOG.jpg"
dl "featured-images" "success-stories-hero-mobile.png" \
  "https://www.impactplus.com/hs-fs/hubfs/impact_site_2025_IM-UI/assets/images/success-stories/success-stories-hero-mobile.png"
dl "featured-images" "What-is-Endless-Customers-Featured.jpg" \
  "https://www.impactplus.com/hubfs/impact_site_2025_IM-UI/assets/learning_center/featured_images/%5BPILLAR%5D%20What%20is%20Endless%20Customers_Featured.jpg"
dl "featured-images" "EC-Banner-LinkedIn.png" \
  "https://www.endlesscustomers.com/hubfs/EC%20Banner%20LinkedIn%20Profile%20(1200%20x%20628%20px).png"


# ── 8. CALLS TO ACTION ────────────────────────────────────────────────────────
echo ""
echo "▸ calls-to-action"

dl "calls-to-action" "ec_bg_left.png" \
  "https://www.impactplus.com/hs-fs/hubfs/impact_site_2025_IM-UI/assets/hellobar/ec_bg_left.png"
dl "calls-to-action" "ec_bg_right.png" \
  "https://www.impactplus.com/hs-fs/hubfs/impact_site_2025_IM-UI/assets/hellobar/ec_bg_right.png"
dl "calls-to-action" "EC-Dots-Top.svg" \
  "https://www.endlesscustomers.com/hubfs/Endless%20Customers/Assets/Accents/EC%20Dots%20-%20Top.svg"
dl "calls-to-action" "EC-Dots-Bottom.svg" \
  "https://www.endlesscustomers.com/hubfs/Endless%20Customers/Assets/Accents/EC%20Dots%20-%20Bottom.svg"
dl "calls-to-action" "play-button-white.svg" \
  "https://www.endlesscustomers.com/hubfs/IMPACT%20Production%20Website%20(2023)/Homepage/Assets/Play%20Button%20White%20v2.svg"


# ── 9. THE BOOK ───────────────────────────────────────────────────────────────
echo ""
echo "▸ the-book"

dl "the-book" "Book-Graphic-National-Best-Seller.png" \
  "https://www.endlesscustomers.com/hs-fs/hubfs/Book-Graphic-National-Best-Seller.png"
dl "the-book" "Book-Image.png" \
  "https://www.endlesscustomers.com/hs-fs/hubfs/Book%20Image.png"
dl "the-book" "Books-Stacked.png" \
  "https://www.endlesscustomers.com/hs-fs/hubfs/Books-Stacked.png"
dl "the-book" "Marcus-video-thumbnail.jpg" \
  "https://www.endlesscustomers.com/hubfs/1-60Xyiwzxr2B7WyPi1ev5oZnr6RSdlN.jpg"
dl "the-book" "Barnes-Noble-logo.svg" \
  "https://www.endlesscustomers.com/hubfs/Endless%20Customers/Assets/Other%20Logos/Barnes_%26_Noble_logo.svg"
dl "the-book" "Amazon-logo.svg" \
  "https://www.endlesscustomers.com/hubfs/Endless%20Customers/Assets/Other%20Logos/Amazon_logo.svg"
dl "the-book" "Bookshop-org-logo.svg" \
  "https://www.endlesscustomers.com/hubfs/Endless%20Customers/Assets/Other%20Logos/bookshoporg.svg"
dl "the-book" "Books-A-Million-logo.svg" \
  "https://www.endlesscustomers.com/hubfs/Endless%20Customers/Assets/Other%20Logos/Books-A-Million_logo.svg"
dl "the-book" "Amazon-Kindle-logo.png" \
  "https://www.endlesscustomers.com/hs-fs/hubfs/Amazon_Kindle_logo.svg.png"
dl "the-book" "Audible-logo.png" \
  "https://www.endlesscustomers.com/hs-fs/hubfs/Audible_logo.svg.png"


echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Done! Check each folder — some HubSpot URLs may need"
echo "  a browser session cookie to download successfully."
echo "  If files come back as HTML error pages, open the URL"
echo "  in your browser to save them manually."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
