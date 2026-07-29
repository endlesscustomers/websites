import React from "react";

const LOGO_WHITE = "https://www.impactplus.com/hubfs/IMPACT%20Style%20and%20Branding%20Assets/White%20Logo%20-%20Full/IMPACT-Logo--White-Full.png";
const TOM_DISCIPIO_HEADSHOT = "/design-system/assets/people/tom-discipio.jpg";
const HUBSPOT_DIAMOND_BADGE = "/services/deep-diagnostic-roadmap/assets/SolutionPartnerTierBadges_FINAL_DIAMOND_CREAM.svg";
const EOS_BADGE = "https://www.eosworldwide.com/wp-content/uploads/2023/03/EOS-WeRunOnEOS-Badge.png";

const DEFAULT_COLUMNS = [
  {
    title: "How We Help",
    href: "/services",
    links: [
      { label: "Deep Diagnostic & Roadmap", href: "/services/deep-diagnostic-roadmap" },
      { label: "Endless Customers Coaching Program", href: "/endless-customers-coaching" },
      { label: "Content & Video Training", href: "/services/content-and-video-training" },
      { label: "Website Redesign", href: "/services/website-redesign" },
      { label: "AI Visibility", href: "/services#ai-visibility" },
      { label: "Industries", href: "/industries" },
      { label: "Explore All Services", href: "/services" },
    ],
  },
  {
    title: "Pricing & Results",
    links: [
      { label: "Pricing", href: "/services/pricing" },
      { label: "Instant Pricing Estimate", href: "/services/pricing#instant-estimate" },
      { label: "Success Stories", href: "/services/success-stories" },
      { label: "Google Reviews", href: "/services/reviews" },
      { label: "Money-Back Guarantee", href: "/services/guarantee" },
      { label: "Awards & Recognition", href: "/awards" },
    ],
  },
  {
    title: "Learning Center",
    href: "/learn",
    links: [
      { label: "Explore the Learning Center", href: "/learn" },
      { label: "Articles", href: "/blog" },
      { label: "Guides & Downloads", href: "/learn/guides-and-downloads" },
      { label: "Webinars", href: "/webinars" },
      { label: "Subscribe", href: "/learn#subscribe" },
    ],
  },
  {
    title: "Endless Customers",
    href: "https://www.endlesscustomers.com/",
    links: [
      { label: "What Is Endless Customers?", href: "/learn/what-is-endless-customers" },
      { label: "They Ask, You Answer", href: "/what-is-they-ask-you-answer" },
      { label: "The Book", href: "https://www.endlesscustomers.com/book/" },
      { label: "Academy", href: "https://academy.endlesscustomers.com/" },
      { label: "Conference", href: "https://www.endlesscustomers.com/live" },
      { label: "Podcast", href: "/endless-customers-podcast" },
      { label: "Editorial Process", href: "https://www.endlesscustomers.com/editorial-process" },
    ],
  },
  {
    title: "About IMPACT",
    href: "/impact-company-profile",
    links: [
      { label: "Our Story, Vision, and Values", href: "/impact-company-profile" },
      { label: "Meet the Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Request a Speaker", href: "/request-a-speaker" },
      { label: "Contact", href: "/contact-us" },
      { label: "Our Brands", href: "/brands" },
      { label: "HubSpot Solutions Partner", href: "/hubspot-solutions-partner" },
      { label: "For AI Agents", href: "https://www.endlesscustomers.com/for-ai-agents" },
    ],
  },
];

const DEFAULT_BRANDS = [
  { label: "Endless Customers", href: "https://www.endlesscustomers.com/" },
  { label: "Swell", href: "https://www.swellsquad.com/" },
];

const DEFAULT_CREDENTIALS = [
  {
    label: "HubSpot Diamond Solutions Partner",
    description: "View IMPACT’s verified HubSpot partner profile and reviews.",
    actionLabel: "Verify credential",
    href: "https://ecosystem.hubspot.com/marketplace/solutions/impact",
    image: HUBSPOT_DIAMOND_BADGE,
    width: 1080,
    height: 1080,
  },
  {
    label: "We Run on EOS",
    description: "See the operating system IMPACT uses to create focus and accountability.",
    actionLabel: "Learn what it means",
    href: "https://www.eosworldwide.com/we-run-on-eos-new-2",
    image: EOS_BADGE,
    width: 600,
    height: 396,
  },
];

const DEFAULT_SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/1210178", icon: "/design-system/assets/icons/doodle/png/logos/linkedin.png" },
  { label: "YouTube", href: "https://www.youtube.com/@IMPACTbnd", icon: "/design-system/assets/icons/doodle/png/logos/youtube.png" },
  { label: "Instagram", href: "https://www.instagram.com/impactbnd/", icon: "/design-system/assets/icons/doodle/png/logos/instagram.png" },
  { label: "TikTok", href: "https://www.tiktok.com/@impactbnd", icon: "/design-system/assets/icons/doodle/png/logos/tik tok.png" },
  { label: "Facebook", href: "https://www.facebook.com/impactbnd/", icon: "/design-system/assets/icons/doodle/png/logos/facebook.png" },
  {
    label: "Spotify",
    href: "https://open.spotify.com/show/1w2rStYbPKwKKsrf8Ofleu",
    icon: "/design-system/assets/icons/doodle/png/logos/spotify.png",
    ariaLabel: "Spotify: Listen to the Endless Customers podcast (opens in a new tab)",
  },
];

const DEFAULT_LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Brand Guidelines", href: "/brand" },
  { label: "Trademarks", href: "/trademarks" },
];

const normalizeLink = (link) => typeof link === "string"
  ? { label: link, href: null }
  : link;

const usableLinks = (links = []) => links
  .map(normalizeLink)
  .filter((link) => link?.label && link?.href && link.href !== "#");

const resolveSitePath = (value) => (
  typeof window !== "undefined"
  && window.location.pathname.startsWith("/websites/impactplus/")
  && value?.startsWith("/")
  && !value.startsWith("//")
    ? `/websites/impactplus${value}`
    : value
);

/**
 * V2 global footer. It mirrors the primary navigation, makes IMPACT's parent-
 * brand role explicit, and keeps credentials connected to verifiable sources.
 */
export function Footer({
  columns = DEFAULT_COLUMNS,
  brands = DEFAULT_BRANDS,
  credentials = DEFAULT_CREDENTIALS,
  socialLinks = DEFAULT_SOCIAL,
  legalLinks = DEFAULT_LEGAL,
  address = "125 Commerce Ct STE 9\nCheshire, CT 06410",
  phone = "(203) 265-4377",
  ctaEyebrow = "Start With Clarity",
  ctaHeading = "Let’s Find Out What’s Holding You Back.",
  ctaCopy = "Talk with Tom about where growth is getting stuck. He’ll help you decide whether the Deep Diagnostic & Roadmap is the right first step—and what to do next.",
  ctaMicrocopy = "A real conversation. No pitch. No obligation.",
  ctaLabel = "Let’s Talk",
  ctaHref = "/services/schedule-now",
  ctaPersonName = "Tom DiScipio",
  ctaPersonRole = "Managing Partner & Client Advisor",
  ctaPersonImage = TOM_DISCIPIO_HEADSHOT,
  showCta = true,
  year = new Date().getFullYear(),
  style,
  className = "",
  ...rest
}) {
  const footerBrands = usableLinks(brands);
  const phoneDisplay = phone.replace(/\s/g, "\u00A0").replace(/-/g, "\u2011");
  const footerInstanceId = React.useId();
  const ctaTitleId = `${footerInstanceId}-footer-cta-title`;
  const ctaAssuranceId = `${footerInstanceId}-footer-cta-assurance`;
  const trustTitleId = `${footerInstanceId}-footer-trust-title`;
  const socialTitleId = `${footerInstanceId}-footer-social-title`;

  return (
    <footer className={`v2-site-footer ${className}`.trim()} style={style} {...rest}>
      <div className="v2-site-footer__inner">
        {showCta && (
          <section className="v2-site-footer__cta" aria-labelledby={ctaTitleId} data-v2-reveal>
            <div>
              <p className="v2-site-footer__eyebrow">{ctaEyebrow}</p>
              <h2 id={ctaTitleId}>{ctaHeading}</h2>
            </div>
            <div className="v2-site-footer__cta-content">
              <p>{ctaCopy}</p>
              <div className="v2-site-footer__cta-action-row">
                <div className="v2-site-footer__cta-person">
                  <img src={resolveSitePath(ctaPersonImage)} alt="" width="72" height="72" />
                  <span><strong>Talk with {ctaPersonName}</strong><small>{ctaPersonRole}</small></span>
                </div>
                <a className="v2-site-footer__cta-link" href={resolveSitePath(ctaHref)} aria-describedby={ctaMicrocopy ? ctaAssuranceId : undefined}>{ctaLabel}<span aria-hidden="true">→</span></a>
              </div>
              {ctaMicrocopy && <p className="v2-site-footer__cta-assurance" id={ctaAssuranceId}>{ctaMicrocopy}</p>}
            </div>
          </section>
        )}

        <div className="v2-site-footer__identity-trust">
          <section className="v2-site-footer__identity" aria-label="About IMPACT" data-v2-reveal>
            <div className="v2-site-footer__brand">
              <a href={resolveSitePath("/")} aria-label="IMPACT home">
                <img src={LOGO_WHITE} alt="IMPACT" width="482" height="150" />
              </a>
              <p className="v2-site-footer__brand-description">We help companies build the skills and systems to become the most known, trusted, and recommended company in their market. IMPACT is the parent company of the {footerBrands.map((link, index) => (
                <React.Fragment key={link.label}>
                  {index > 0 && (index === footerBrands.length - 1 ? " and " : ", ")}
                  <a href={resolveSitePath(link.href)}>{link.label}</a>
                </React.Fragment>
              ))} brands.</p>
            </div>
          </section>

          <section className="v2-site-footer__trust" aria-labelledby={trustTitleId}>
            <div className="v2-site-footer__trust-intro" data-v2-reveal>
              <p className="v2-site-footer__eyebrow">Credentials</p>
              <h2 id={trustTitleId}>Trusted systems, independently verifiable.</h2>
            </div>
            <div className="v2-site-footer__credentials" data-v2-stagger="footer-credentials">
              {credentials.map((credential) => (
                <a className="v2-site-footer__credential" href={resolveSitePath(credential.href)} key={credential.label} target="_blank" rel="noopener noreferrer" data-v2-reveal>
                  <span className="v2-site-footer__credential-image">
                    <img src={resolveSitePath(credential.image)} alt="" width={credential.width} height={credential.height} loading="lazy" />
                  </span>
                  <span>
                    <strong>{credential.label}</strong>
                    <small>{credential.description}</small>
                    <span className="v2-site-footer__credential-action">{credential.actionLabel || "Verify credential"} <span aria-hidden="true">↗</span></span>
                  </span>
                  <span className="v2-visually-hidden"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </section>
        </div>

        <nav className="v2-site-footer__columns" aria-label="Footer navigation" data-v2-stagger="footer-columns">
          {columns.map((column) => (
            <section className="v2-site-footer__column" key={column.title} data-v2-reveal>
              <h3>{column.href ? <a href={resolveSitePath(column.href)}>{column.title}</a> : column.title}</h3>
              <ul>
                {usableLinks(column.links).map((link) => (
                  <li key={link.label}><a href={resolveSitePath(link.href)}>{link.label}</a></li>
                ))}
              </ul>
            </section>
          ))}
        </nav>

        <div className="v2-site-footer__utility" data-v2-reveal>
          <div>
            <p className="v2-site-footer__legal-name">IMPACT Branding & Design, LLC</p>
            <address>{address}<br /><a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phoneDisplay}</a></address>
          </div>
          <div className="v2-site-footer__social-block">
            <p className="v2-site-footer__social-label" id={socialTitleId}>Follow & Listen</p>
            <nav className="v2-site-footer__social" aria-labelledby={socialTitleId}>
              <ul>
                {usableLinks(socialLinks).map((link) => (
                  <li key={link.label}>
                    <a href={resolveSitePath(link.href)} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel || `${link.label}: IMPACT social profile (opens in a new tab)`}>
                      <img src={resolveSitePath(link.icon)} alt="" width="25" height="25" loading="lazy" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="v2-site-footer__legal">
          <nav aria-label="Legal">
            <ul>
              {usableLinks(legalLinks).map((link) => <li key={link.label}><a href={resolveSitePath(link.href)}>{link.label}</a></li>)}
            </ul>
          </nav>
          <p>© {year} IMPACT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export {
  DEFAULT_COLUMNS as IMPACT_V2_FOOTER_COLUMNS,
  DEFAULT_BRANDS as IMPACT_V2_BRAND_LINKS,
  DEFAULT_CREDENTIALS as IMPACT_V2_CREDENTIALS,
  DEFAULT_SOCIAL as IMPACT_V2_SOCIAL_LINKS,
  DEFAULT_LEGAL as IMPACT_V2_LEGAL_LINKS,
};
