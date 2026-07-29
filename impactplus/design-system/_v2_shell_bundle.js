/* IMPACT V2 shell bundle — generated from approved NavBar.jsx and Footer.jsx, 2026-07-29. */
(() => {
  // ../../../40-areas/websites/impactplus/design-system/bundles/react-global.js
  var React = window.React;
  if (!React) {
    throw new Error("The V2 shell bundle requires React to load first.");
  }
  var react_global_default = React;

  // ../../../40-areas/websites/impactplus/design-system/components/chrome/Footer.jsx
  var LOGO_WHITE = "https://www.impactplus.com/hubfs/IMPACT%20Style%20and%20Branding%20Assets/White%20Logo%20-%20Full/IMPACT-Logo--White-Full.png";
  var TOM_DISCIPIO_HEADSHOT = "/design-system/assets/people/tom-discipio.jpg";
  var HUBSPOT_DIAMOND_BADGE = "/services/deep-diagnostic-roadmap/assets/SolutionPartnerTierBadges_FINAL_DIAMOND_CREAM.svg";
  var EOS_BADGE = "https://www.eosworldwide.com/wp-content/uploads/2023/03/EOS-WeRunOnEOS-Badge.png";
  var DEFAULT_COLUMNS = [
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
        { label: "Explore All Services", href: "/services" }
      ]
    },
    {
      title: "Pricing & Results",
      links: [
        { label: "Pricing", href: "/services/pricing" },
        { label: "Instant Pricing Estimate", href: "/services/pricing#instant-estimate" },
        { label: "Success Stories", href: "/services/success-stories" },
        { label: "Google Reviews", href: "/services/reviews" },
        { label: "Money-Back Guarantee", href: "/services/guarantee" },
        { label: "Awards & Recognition", href: "/awards" }
      ]
    },
    {
      title: "Learning Center",
      href: "/learn",
      links: [
        { label: "Explore the Learning Center", href: "/learn" },
        { label: "Articles", href: "/blog" },
        { label: "Guides & Downloads", href: "/learn/guides-and-downloads" },
        { label: "Webinars", href: "/webinars" },
        { label: "Subscribe", href: "/learn#subscribe" }
      ]
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
        { label: "Editorial Process", href: "https://www.endlesscustomers.com/editorial-process" }
      ]
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
        { label: "For AI Agents", href: "https://www.endlesscustomers.com/for-ai-agents" }
      ]
    }
  ];
  var DEFAULT_BRANDS = [
    { label: "Endless Customers", href: "https://www.endlesscustomers.com/" },
    { label: "Swell", href: "https://www.swellsquad.com/" }
  ];
  var DEFAULT_CREDENTIALS = [
    {
      label: "HubSpot Diamond Solutions Partner",
      description: "View IMPACT\u2019s verified HubSpot partner profile and reviews.",
      actionLabel: "Verify credential",
      href: "https://ecosystem.hubspot.com/marketplace/solutions/impact",
      image: HUBSPOT_DIAMOND_BADGE,
      width: 1080,
      height: 1080
    },
    {
      label: "We Run on EOS",
      description: "See the operating system IMPACT uses to create focus and accountability.",
      actionLabel: "Learn what it means",
      href: "https://www.eosworldwide.com/we-run-on-eos-new-2",
      image: EOS_BADGE,
      width: 600,
      height: 396
    }
  ];
  var DEFAULT_SOCIAL = [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/1210178", icon: "/design-system/assets/icons/doodle/png/logos/linkedin.png" },
    { label: "YouTube", href: "https://www.youtube.com/@IMPACTbnd", icon: "/design-system/assets/icons/doodle/png/logos/youtube.png" },
    { label: "Instagram", href: "https://www.instagram.com/impactbnd/", icon: "/design-system/assets/icons/doodle/png/logos/instagram.png" },
    { label: "TikTok", href: "https://www.tiktok.com/@impactbnd", icon: "/design-system/assets/icons/doodle/png/logos/tik tok.png" },
    { label: "Facebook", href: "https://www.facebook.com/impactbnd/", icon: "/design-system/assets/icons/doodle/png/logos/facebook.png" },
    {
      label: "Spotify",
      href: "https://open.spotify.com/show/1w2rStYbPKwKKsrf8Ofleu",
      icon: "/design-system/assets/icons/doodle/png/logos/spotify.png",
      ariaLabel: "Spotify: Listen to the Endless Customers podcast (opens in a new tab)"
    }
  ];
  var DEFAULT_LEGAL = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Brand Guidelines", href: "/brand" },
    { label: "Trademarks", href: "/trademarks" }
  ];
  var normalizeLink = (link) => typeof link === "string" ? { label: link, href: null } : link;
  var usableLinks = (links = []) => links.map(normalizeLink).filter((link) => link?.label && link?.href && link.href !== "#");
  var resolveSitePath = (value) => typeof window !== "undefined" && window.location.pathname.startsWith("/websites/impactplus/") && value?.startsWith("/") && !value.startsWith("//") ? `/websites/impactplus${value}` : value;
  function Footer({
    columns = DEFAULT_COLUMNS,
    brands = DEFAULT_BRANDS,
    credentials = DEFAULT_CREDENTIALS,
    socialLinks = DEFAULT_SOCIAL,
    legalLinks = DEFAULT_LEGAL,
    address = "125 Commerce Ct STE 9\nCheshire, CT 06410",
    phone = "(203) 265-4377",
    ctaEyebrow = "Start With Clarity",
    ctaHeading = "Let\u2019s Find Out What\u2019s Holding You Back.",
    ctaCopy = "Talk with Tom about where growth is getting stuck. He\u2019ll help you decide whether the Deep Diagnostic & Roadmap is the right first step\u2014and what to do next.",
    ctaMicrocopy = "A real conversation. No pitch. No obligation.",
    ctaLabel = "Let\u2019s Talk",
    ctaHref = "/services/schedule-now",
    ctaPersonName = "Tom DiScipio",
    ctaPersonRole = "Managing Partner & Client Advisor",
    ctaPersonImage = TOM_DISCIPIO_HEADSHOT,
    showCta = true,
    year = (/* @__PURE__ */ new Date()).getFullYear(),
    style,
    className = "",
    ...rest
  }) {
    const footerBrands = usableLinks(brands);
    const phoneDisplay = phone.replace(/\s/g, "\xA0").replace(/-/g, "\u2011");
    const footerInstanceId = react_global_default.useId();
    const ctaTitleId = `${footerInstanceId}-footer-cta-title`;
    const ctaAssuranceId = `${footerInstanceId}-footer-cta-assurance`;
    const trustTitleId = `${footerInstanceId}-footer-trust-title`;
    const socialTitleId = `${footerInstanceId}-footer-social-title`;
    return /* @__PURE__ */ react_global_default.createElement("footer", { className: `v2-site-footer ${className}`.trim(), style, ...rest }, /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-footer__inner" }, showCta && /* @__PURE__ */ react_global_default.createElement("section", { className: "v2-site-footer__cta", "aria-labelledby": ctaTitleId, "data-v2-reveal": true }, /* @__PURE__ */ react_global_default.createElement("div", null, /* @__PURE__ */ react_global_default.createElement("p", { className: "v2-site-footer__eyebrow" }, ctaEyebrow), /* @__PURE__ */ react_global_default.createElement("h2", { id: ctaTitleId }, ctaHeading)), /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-footer__cta-content" }, /* @__PURE__ */ react_global_default.createElement("p", null, ctaCopy), /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-footer__cta-action-row" }, /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-footer__cta-person" }, /* @__PURE__ */ react_global_default.createElement("img", { src: resolveSitePath(ctaPersonImage), alt: "", width: "72", height: "72" }), /* @__PURE__ */ react_global_default.createElement("span", null, /* @__PURE__ */ react_global_default.createElement("strong", null, "Talk with ", ctaPersonName), /* @__PURE__ */ react_global_default.createElement("small", null, ctaPersonRole))), /* @__PURE__ */ react_global_default.createElement("a", { className: "v2-site-footer__cta-link", href: resolveSitePath(ctaHref), "aria-describedby": ctaMicrocopy ? ctaAssuranceId : void 0 }, ctaLabel, /* @__PURE__ */ react_global_default.createElement("span", { "aria-hidden": "true" }, "\u2192"))), ctaMicrocopy && /* @__PURE__ */ react_global_default.createElement("p", { className: "v2-site-footer__cta-assurance", id: ctaAssuranceId }, ctaMicrocopy))), /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-footer__identity-trust" }, /* @__PURE__ */ react_global_default.createElement("section", { className: "v2-site-footer__identity", "aria-label": "About IMPACT", "data-v2-reveal": true }, /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-footer__brand" }, /* @__PURE__ */ react_global_default.createElement("a", { href: resolveSitePath("/"), "aria-label": "IMPACT home" }, /* @__PURE__ */ react_global_default.createElement("img", { src: LOGO_WHITE, alt: "IMPACT", width: "482", height: "150" })), /* @__PURE__ */ react_global_default.createElement("p", { className: "v2-site-footer__brand-description" }, "We help companies build the skills and systems to become the most known, trusted, and recommended company in their market. IMPACT is the parent company of the ", footerBrands.map((link, index) => /* @__PURE__ */ react_global_default.createElement(react_global_default.Fragment, { key: link.label }, index > 0 && (index === footerBrands.length - 1 ? " and " : ", "), /* @__PURE__ */ react_global_default.createElement("a", { href: resolveSitePath(link.href) }, link.label))), " brands."))), /* @__PURE__ */ react_global_default.createElement("section", { className: "v2-site-footer__trust", "aria-labelledby": trustTitleId }, /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-footer__trust-intro", "data-v2-reveal": true }, /* @__PURE__ */ react_global_default.createElement("p", { className: "v2-site-footer__eyebrow" }, "Credentials"), /* @__PURE__ */ react_global_default.createElement("h2", { id: trustTitleId }, "Trusted systems, independently verifiable.")), /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-footer__credentials", "data-v2-stagger": "footer-credentials" }, credentials.map((credential) => /* @__PURE__ */ react_global_default.createElement("a", { className: "v2-site-footer__credential", href: resolveSitePath(credential.href), key: credential.label, target: "_blank", rel: "noopener noreferrer", "data-v2-reveal": true }, /* @__PURE__ */ react_global_default.createElement("span", { className: "v2-site-footer__credential-image" }, /* @__PURE__ */ react_global_default.createElement("img", { src: resolveSitePath(credential.image), alt: "", width: credential.width, height: credential.height, loading: "lazy" })), /* @__PURE__ */ react_global_default.createElement("span", null, /* @__PURE__ */ react_global_default.createElement("strong", null, credential.label), /* @__PURE__ */ react_global_default.createElement("small", null, credential.description), /* @__PURE__ */ react_global_default.createElement("span", { className: "v2-site-footer__credential-action" }, credential.actionLabel || "Verify credential", " ", /* @__PURE__ */ react_global_default.createElement("span", { "aria-hidden": "true" }, "\u2197"))), /* @__PURE__ */ react_global_default.createElement("span", { className: "v2-visually-hidden" }, " (opens in a new tab)")))))), /* @__PURE__ */ react_global_default.createElement("nav", { className: "v2-site-footer__columns", "aria-label": "Footer navigation", "data-v2-stagger": "footer-columns" }, columns.map((column) => /* @__PURE__ */ react_global_default.createElement("section", { className: "v2-site-footer__column", key: column.title, "data-v2-reveal": true }, /* @__PURE__ */ react_global_default.createElement("h3", null, column.href ? /* @__PURE__ */ react_global_default.createElement("a", { href: resolveSitePath(column.href) }, column.title) : column.title), /* @__PURE__ */ react_global_default.createElement("ul", null, usableLinks(column.links).map((link) => /* @__PURE__ */ react_global_default.createElement("li", { key: link.label }, /* @__PURE__ */ react_global_default.createElement("a", { href: resolveSitePath(link.href) }, link.label))))))), /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-footer__utility", "data-v2-reveal": true }, /* @__PURE__ */ react_global_default.createElement("div", null, /* @__PURE__ */ react_global_default.createElement("p", { className: "v2-site-footer__legal-name" }, "IMPACT Branding & Design, LLC"), /* @__PURE__ */ react_global_default.createElement("address", null, address, /* @__PURE__ */ react_global_default.createElement("br", null), /* @__PURE__ */ react_global_default.createElement("a", { href: `tel:${phone.replace(/[^\d+]/g, "")}` }, phoneDisplay))), /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-footer__social-block" }, /* @__PURE__ */ react_global_default.createElement("p", { className: "v2-site-footer__social-label", id: socialTitleId }, "Follow & Listen"), /* @__PURE__ */ react_global_default.createElement("nav", { className: "v2-site-footer__social", "aria-labelledby": socialTitleId }, /* @__PURE__ */ react_global_default.createElement("ul", null, usableLinks(socialLinks).map((link) => /* @__PURE__ */ react_global_default.createElement("li", { key: link.label }, /* @__PURE__ */ react_global_default.createElement("a", { href: resolveSitePath(link.href), target: "_blank", rel: "noopener noreferrer", "aria-label": link.ariaLabel || `${link.label}: IMPACT social profile (opens in a new tab)` }, /* @__PURE__ */ react_global_default.createElement("img", { src: resolveSitePath(link.icon), alt: "", width: "25", height: "25", loading: "lazy" })))))))), /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-footer__legal" }, /* @__PURE__ */ react_global_default.createElement("nav", { "aria-label": "Legal" }, /* @__PURE__ */ react_global_default.createElement("ul", null, usableLinks(legalLinks).map((link) => /* @__PURE__ */ react_global_default.createElement("li", { key: link.label }, /* @__PURE__ */ react_global_default.createElement("a", { href: resolveSitePath(link.href) }, link.label))))), /* @__PURE__ */ react_global_default.createElement("p", null, "\xA9 ", year, " IMPACT. All rights reserved."))));
  }

  // ../../../40-areas/websites/impactplus/design-system/components/core/Button.jsx
  var ArrowRight = ({ size = 18 }) => /* @__PURE__ */ react_global_default.createElement(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      style: { flex: "0 0 auto" }
    },
    /* @__PURE__ */ react_global_default.createElement("line", { x1: "4", y1: "12", x2: "19", y2: "12" }),
    /* @__PURE__ */ react_global_default.createElement("polyline", { points: "13 6 19 12 13 18" })
  );
  var SIZES = {
    sm: { fontSize: "14px", padding: "9px 18px", gap: "7px" },
    md: { fontSize: "16px", padding: "12px 24px", gap: "8px" },
    lg: { fontSize: "18px", padding: "15px 32px", gap: "10px" }
  };
  function Button({
    children,
    variant = "primary",
    size = "md",
    href,
    withArrow,
    disabled = false,
    onClick,
    style,
    ...rest
  }) {
    const s = SIZES[size] || SIZES.md;
    const isLink = variant === "link";
    const showArrow = withArrow ?? (variant === "primary" || variant === "dark");
    const base = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      fontFamily: "var(--font-body)",
      fontWeight: "var(--weight-bold)",
      fontSize: s.fontSize,
      lineHeight: 1.1,
      borderRadius: "var(--radius-pill)",
      border: "2px solid transparent",
      padding: s.padding,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      textDecoration: "none",
      transition: "background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)",
      whiteSpace: "nowrap"
    };
    const variants = {
      primary: { background: "var(--color-brand-strong)", color: "var(--ec-white)" },
      dark: { background: "var(--ec-navy)", color: "var(--ec-white)" },
      secondary: { background: "var(--ec-green-400)", color: "var(--ec-neutral-700)" },
      outline: { background: "transparent", color: "currentColor", borderColor: "currentColor" },
      ghost: { background: "var(--ec-blue-100)", color: "var(--color-brand)" },
      link: {
        background: "transparent",
        color: "var(--text-heading)",
        borderRadius: 0,
        border: "none",
        padding: 0,
        fontWeight: "var(--weight-bold)"
      }
    };
    const styleObj = { ...base, ...variants[variant] || variants.primary, ...style };
    const [hover, setHover] = react_global_default.useState(false);
    if (hover && !disabled) {
      if (variant === "primary") styleObj.background = "var(--color-brand-hover)";
      else if (variant === "dark") styleObj.background = "#000";
      else if (variant === "secondary") styleObj.background = "var(--ec-green-500)";
      else if (variant === "outline") styleObj.background = "rgba(255,255,255,0.12)";
      else if (variant === "ghost") styleObj.background = "var(--ec-blue-200)";
      else if (variant === "link") styleObj.textDecoration = "underline";
      if (!isLink) styleObj.transform = "translateY(-2px)";
    }
    const Tag = href ? "a" : "button";
    return /* @__PURE__ */ react_global_default.createElement(
      Tag,
      {
        href,
        "data-impact-button": "true",
        "data-impact-button-variant": variant,
        onClick: disabled ? void 0 : onClick,
        disabled: Tag === "button" ? disabled : void 0,
        style: styleObj,
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => setHover(false),
        ...rest
      },
      children,
      showArrow && /* @__PURE__ */ react_global_default.createElement(ArrowRight, { size: size === "lg" ? 20 : 18 })
    );
  }

  // ../../../40-areas/websites/impactplus/design-system/components/core/DoodleIcon.jsx
  var DEFAULT_BASE_PATH = "/design-system/assets/icons/doodle";
  var encodePathSegment = (value) => encodeURIComponent(String(value).trim());
  var resolvePreviewPath = (value) => typeof window !== "undefined" && window.location.pathname.startsWith("/websites/impactplus/") && value?.startsWith("/") && !value.startsWith("//") ? `/websites/impactplus${value}` : value;
  function DoodleIcon({
    category,
    name,
    format = "svg",
    basePath = DEFAULT_BASE_PATH,
    size = 72,
    label,
    decorative,
    className,
    style,
    ...rest
  }) {
    const isDecorative = decorative ?? !label;
    const source = `${resolvePreviewPath(basePath)}/${format}/${encodePathSegment(category)}/${encodePathSegment(name)}.${format}`;
    const dimension = typeof size === "number" ? `${size}px` : size;
    return /* @__PURE__ */ react_global_default.createElement(
      "span",
      {
        className: ["v2-doodle-icon", className].filter(Boolean).join(" "),
        role: isDecorative ? void 0 : "img",
        "aria-hidden": isDecorative ? "true" : void 0,
        "aria-label": isDecorative ? void 0 : label,
        "data-doodle-icon": `${category}/${name}`,
        style: {
          "--v2-doodle-icon-source": `url("${source}")`,
          "--v2-doodle-icon-size": dimension,
          ...style
        },
        ...rest
      }
    );
  }

  // ../../../40-areas/websites/impactplus/design-system/components/chrome/NavBar.jsx
  var LOGO_WHITE2 = "https://www.impactplus.com/hubfs/IMPACT%20Style%20and%20Branding%20Assets/White%20Logo%20-%20Full/IMPACT-Logo--White-Full.png";
  var LOGO_BLACK = "https://www.impactplus.com/hubfs/Black%20Logo%20-%20Full/IMPACT-logo--Black-contained.svg";
  var DEFAULT_ITEMS = [
    {
      label: "How We Help",
      href: "/services",
      panel: "wide",
      groups: [
        {
          title: "Recommended First Step",
          variant: "primary",
          links: [
            { label: "Deep Diagnostic & Roadmap", href: "/services/deep-diagnostic-roadmap", description: "Find out why you\u2019re not winning more customers, what is getting in the way, and what to fix first\u2014with a prioritized 3-, 6-, and 12-month roadmap." }
          ]
        },
        {
          title: "Our Core Program",
          variant: "secondary",
          links: [
            { label: "Endless Customers Coaching Program", href: "/endless-customers-coaching", description: "Build the sales and marketing skills, systems, and accountability your team needs to implement Endless Customers and own your growth." }
          ]
        },
        {
          title: "Content, Video & AI",
          variant: "directory",
          links: [
            { label: "Content & Video Training", href: "/services/content-and-video-training" },
            { label: "YouTube Training", href: "/services/youtube-training" },
            { label: "AI Content Workflows", href: "/services#ai-content-workflows" },
            { label: "AI Visibility", href: "/services#ai-visibility" }
          ]
        },
        {
          title: "Websites, HubSpot & Acquisition",
          variant: "directory",
          links: [
            { label: "Website Redesign", href: "/services/website-redesign" },
            { label: "Website Optimization & Training", href: "/services/website-optimization-and-training" },
            { label: "HubSpot Training & Services", href: "/services/hubspot-training" },
            { label: "Learning Center Development", href: "/services/learning-center" },
            { label: "Self-Service Tools", href: "/services/self-service-tools" },
            { label: "Paid Advertising", href: "/services/paid-ads" },
            { label: "Explore All Services", href: "/services/", emphasis: true }
          ]
        }
      ]
    },
    { label: "Pricing", href: "/services/pricing" },
    {
      label: "Results",
      href: "/services/success-stories",
      panel: "medium",
      groups: [
        {
          title: "Customer Results",
          variant: "directory",
          links: [
            { label: "Success Stories", href: "/services/success-stories" },
            { label: "Coaching Results", href: "/services/success-stories#coaching" },
            { label: "Website Results", href: "/services/success-stories#website" },
            { label: "HubSpot Results", href: "/services/success-stories#hubspot" },
            { label: "AI and Content Results", href: "/services/success-stories#ai-content" }
          ]
        },
        {
          title: "Trust & Recognition",
          variant: "directory",
          links: [
            { label: "Reviews", href: "/services/reviews" },
            { label: "Awards & Recognition", href: "/awards" },
            { label: "Money-Back Guarantee", href: "/services/guarantee" }
          ]
        }
      ]
    },
    {
      label: "Learning Center",
      href: "/learn",
      panel: "medium",
      groups: [
        {
          title: "Learning Center",
          variant: "directory",
          links: [
            { label: "Explore the Learning Center", href: "/learn" },
            { label: "Articles", href: "/blog" },
            { label: "Guides & Downloads", href: "/learn/guides-and-downloads" },
            { label: "Webinars", href: "/webinars" },
            { label: "Subscribe", href: "/learn#subscribe", emphasis: true, accent: true }
          ]
        },
        {
          title: "Endless Customers",
          variant: "directory",
          links: [
            { label: "What Is Endless Customers?", href: "/learn/what-is-endless-customers" },
            { label: "The Book", href: "https://www.endlesscustomers.com/" },
            { label: "Academy", href: "https://academy.endlesscustomers.com/" },
            { label: "Conference", href: "https://www.endlesscustomers.com/live" },
            { label: "Podcast", href: "/endless-customers-podcast" },
            { label: "Get a Free Chapter", href: "https://www.endlesscustomers.com/preview-edition", emphasis: true, accent: true }
          ]
        }
      ]
    },
    {
      label: "About",
      href: "/impact-company-profile",
      panel: "compact",
      groups: [
        {
          title: "IMPACT",
          variant: "directory",
          links: [
            { label: "Our Story, Vision, and Values", href: "/impact-company-profile" },
            { label: "Meet the Team", href: "/team" },
            { label: "Careers", href: "/careers" },
            { label: "Request a Speaker", href: "/request-a-speaker" },
            { label: "Contact", href: "/contact-us" }
          ]
        }
      ]
    }
  ];
  var Caret = () => /* @__PURE__ */ react_global_default.createElement("svg", { className: "v2-site-nav__caret", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, /* @__PURE__ */ react_global_default.createElement("polyline", { points: "6 9 12 15 18 9" }));
  var MenuIcon = ({ open }) => open ? /* @__PURE__ */ react_global_default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": "true" }, /* @__PURE__ */ react_global_default.createElement("path", { d: "M6 6l12 12M18 6L6 18" })) : /* @__PURE__ */ react_global_default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": "true" }, /* @__PURE__ */ react_global_default.createElement("path", { d: "M4 7h16M4 12h16M4 17h16" }));
  var cx = (...names) => names.filter(Boolean).join(" ");
  var resolveSitePath2 = (value) => typeof window !== "undefined" && window.location.pathname.startsWith("/websites/impactplus/") && value?.startsWith("/") && !value.startsWith("//") ? `/websites/impactplus${value}` : value;
  function NavBar({
    items = DEFAULT_ITEMS,
    onDark = true,
    ctaLabel = "Let\u2019s Talk",
    ctaHref = "/services/schedule-now",
    homeHref = "/",
    descriptorHref = "/endless-customers-coaching",
    showDescriptor = true,
    academyHref = "https://academy.endlesscustomers.com/",
    academyLabel = "Log in to the Endless Customers Academy",
    academyTooltip = "Log in to the Academy",
    academyIconBasePath = "/design-system/assets/icons/doodle",
    activeHref,
    maxWidth,
    style,
    className,
    ...rest
  }) {
    const [openMenu, setOpenMenu] = react_global_default.useState(null);
    const [mobileOpen, setMobileOpen] = react_global_default.useState(false);
    const [isScrolled, setIsScrolled] = react_global_default.useState(false);
    const [isScrollHidden, setIsScrollHidden] = react_global_default.useState(false);
    const headerRef = react_global_default.useRef(null);
    const keyboardModeRef = react_global_default.useRef(false);
    const menuId = react_global_default.useId();
    const closeAll = react_global_default.useCallback(() => {
      setOpenMenu(null);
      setMobileOpen(false);
    }, []);
    react_global_default.useEffect(() => {
      const onPointerDown = (event) => {
        keyboardModeRef.current = false;
        if (!headerRef.current?.contains(event.target)) closeAll();
      };
      const onKeyDown = (event) => {
        keyboardModeRef.current = true;
        if (event.key === "Escape") closeAll();
      };
      document.addEventListener("pointerdown", onPointerDown);
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("keydown", onKeyDown);
      };
    }, [closeAll]);
    react_global_default.useEffect(() => {
      if (!mobileOpen) return void 0;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }, [mobileOpen]);
    react_global_default.useEffect(() => {
      if (mobileOpen || openMenu !== null) setIsScrollHidden(false);
    }, [mobileOpen, openMenu]);
    react_global_default.useEffect(() => {
      let lastY = Math.max(window.scrollY, 0);
      let directionStart = lastY;
      let lastDirection = null;
      let frame = null;
      const update = () => {
        const y = Math.max(window.scrollY, 0);
        const direction = y > lastY ? "down" : y < lastY ? "up" : lastDirection;
        const hasKeyboardFocus = Boolean(
          keyboardModeRef.current && headerRef.current?.contains(document.activeElement) && document.activeElement?.matches?.(":focus-visible")
        );
        setIsScrolled(y > 12);
        if (mobileOpen || openMenu !== null || hasKeyboardFocus || y <= 16) {
          setIsScrollHidden(false);
        } else if (direction) {
          if (direction !== lastDirection) {
            directionStart = lastY;
            lastDirection = direction;
          }
          const distance = Math.abs(y - directionStart);
          if (direction === "down" && y > 120 && distance >= 18) {
            setIsScrollHidden(true);
          } else if (direction === "up" && distance >= 10) {
            setIsScrollHidden(false);
          }
        }
        lastY = y;
        frame = null;
      };
      const onScroll = () => {
        if (frame === null) frame = window.requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        if (frame !== null) window.cancelAnimationFrame(frame);
      };
    }, [mobileOpen, openMenu]);
    react_global_default.useEffect(() => {
      const desktop = window.matchMedia("(min-width: 1101px)");
      const reconcileViewport = () => {
        if (!desktop.matches) return;
        setMobileOpen(false);
        setOpenMenu(null);
      };
      desktop.addEventListener("change", reconcileViewport);
      return () => desktop.removeEventListener("change", reconcileViewport);
    }, []);
    return /* @__PURE__ */ react_global_default.createElement(
      "header",
      {
        ref: headerRef,
        className: cx(
          "v2-site-nav",
          onDark ? "v2-site-nav--dark" : "v2-site-nav--light",
          mobileOpen && "is-mobile-open",
          isScrolled && "is-scrolled",
          isScrollHidden && !mobileOpen && openMenu === null && "is-scroll-hidden",
          className
        ),
        style: { "--v2-nav-max": maxWidth, ...style },
        onFocusCapture: () => setIsScrollHidden(false),
        ...rest
      },
      /* @__PURE__ */ react_global_default.createElement("a", { className: "v2-site-nav__skip", href: "#main-content" }, "Skip to content"),
      /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-nav__bar" }, /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-nav__brand" }, /* @__PURE__ */ react_global_default.createElement("a", { className: "v2-site-nav__logo", href: resolveSitePath2(homeHref), "aria-label": "IMPACT home", onClick: closeAll }, /* @__PURE__ */ react_global_default.createElement("img", { src: onDark ? LOGO_WHITE2 : LOGO_BLACK, alt: "IMPACT", width: "482", height: "150" })), showDescriptor && /* @__PURE__ */ react_global_default.createElement("a", { className: "v2-site-nav__descriptor", href: resolveSitePath2(descriptorHref), onClick: closeAll }, "Coaching & Training", /* @__PURE__ */ react_global_default.createElement("br", null), "for Endless Customers")), /* @__PURE__ */ react_global_default.createElement(
        "button",
        {
          className: "v2-site-nav__mobile-toggle",
          type: "button",
          "aria-expanded": mobileOpen,
          "aria-controls": `${menuId}-menu`,
          "aria-label": mobileOpen ? "Close menu" : "Open menu",
          onClick: () => {
            setMobileOpen((value) => !value);
            setOpenMenu(null);
          }
        },
        /* @__PURE__ */ react_global_default.createElement(MenuIcon, { open: mobileOpen })
      ), /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-nav__drawer", id: `${menuId}-menu` }, /* @__PURE__ */ react_global_default.createElement("nav", { className: "v2-site-nav__links", "aria-label": "Primary navigation" }, items.map((item, index) => {
        const hasGroups = Boolean(item.groups?.length);
        const isOpen = openMenu === index;
        const isActive = activeHref && (activeHref === item.href || activeHref.startsWith(`${item.href}/`));
        return /* @__PURE__ */ react_global_default.createElement("div", { className: cx("v2-site-nav__item", hasGroups && "has-panel", isOpen && "is-open"), key: item.label }, hasGroups ? /* @__PURE__ */ react_global_default.createElement(
          "button",
          {
            className: cx("v2-site-nav__top-link", isActive && "is-active"),
            type: "button",
            "aria-haspopup": "true",
            "aria-expanded": isOpen,
            "aria-controls": `${menuId}-panel-${index}`,
            onClick: () => setOpenMenu(isOpen ? null : index)
          },
          item.label,
          /* @__PURE__ */ react_global_default.createElement(Caret, null)
        ) : /* @__PURE__ */ react_global_default.createElement("a", { className: cx("v2-site-nav__top-link", isActive && "is-active"), href: resolveSitePath2(item.href), onClick: closeAll }, item.label), hasGroups && /* @__PURE__ */ react_global_default.createElement(
          "div",
          {
            className: cx("v2-site-nav__mega", item.panel && `v2-site-nav__mega--${item.panel}`),
            id: `${menuId}-panel-${index}`,
            "aria-hidden": !isOpen
          },
          /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-nav__mega-inner" }, item.groups.map((group) => {
            const isJourneyCard = ["primary", "secondary"].includes(group.variant) && group.links.length === 1;
            const journeyLink = isJourneyCard ? group.links[0] : null;
            return /* @__PURE__ */ react_global_default.createElement("section", { className: cx("v2-site-nav__group", group.featured && "v2-site-nav__group--featured", group.variant && `v2-site-nav__group--${group.variant}`), key: group.title }, isJourneyCard ? /* @__PURE__ */ react_global_default.createElement("a", { className: "v2-site-nav__journey-link", href: resolveSitePath2(journeyLink.href), onClick: closeAll }, /* @__PURE__ */ react_global_default.createElement("p", { className: "v2-site-nav__group-title" }, group.title), /* @__PURE__ */ react_global_default.createElement("span", null, journeyLink.label), journeyLink.description && /* @__PURE__ */ react_global_default.createElement("small", null, journeyLink.description)) : /* @__PURE__ */ react_global_default.createElement(react_global_default.Fragment, null, /* @__PURE__ */ react_global_default.createElement("p", { className: "v2-site-nav__group-title" }, group.title), group.subgroups?.length > 0 && /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-nav__subgroups" }, group.subgroups.map((subgroup) => /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-nav__subgroup", key: subgroup.title }, /* @__PURE__ */ react_global_default.createElement("p", { className: "v2-site-nav__subgroup-title" }, subgroup.title), /* @__PURE__ */ react_global_default.createElement("ul", null, subgroup.links.map((link) => /* @__PURE__ */ react_global_default.createElement("li", { key: link.label }, /* @__PURE__ */ react_global_default.createElement("a", { href: resolveSitePath2(link.href), onClick: closeAll }, /* @__PURE__ */ react_global_default.createElement("span", null, link.label), link.description && /* @__PURE__ */ react_global_default.createElement("small", null, link.description)))))))), /* @__PURE__ */ react_global_default.createElement("ul", null, group.links.map((link) => /* @__PURE__ */ react_global_default.createElement("li", { className: cx(link.emphasis && "v2-site-nav__directory-action-item"), key: link.label }, /* @__PURE__ */ react_global_default.createElement("a", { className: cx(link.emphasis && "is-emphasis", link.accent && "is-accent"), href: resolveSitePath2(link.href), onClick: closeAll }, /* @__PURE__ */ react_global_default.createElement("span", null, link.label), link.description && /* @__PURE__ */ react_global_default.createElement("small", null, link.description)))))));
          }))
        ));
      })), /* @__PURE__ */ react_global_default.createElement(
        "a",
        {
          className: "v2-site-nav__academy-login v2-site-nav__academy-login--desktop",
          href: resolveSitePath2(academyHref),
          "aria-label": academyLabel,
          "aria-describedby": `${menuId}-academy-tooltip`,
          onClick: closeAll
        },
        /* @__PURE__ */ react_global_default.createElement(
          DoodleIcon,
          {
            category: "interface",
            name: "user",
            size: 16,
            basePath: resolveSitePath2(academyIconBasePath),
            className: "v2-site-nav__academy-icon"
          }
        ),
        /* @__PURE__ */ react_global_default.createElement("span", { className: "v2-site-nav__academy-label" }, academyLabel),
        /* @__PURE__ */ react_global_default.createElement(
          "span",
          {
            className: "v2-site-nav__academy-tooltip",
            id: `${menuId}-academy-tooltip`,
            role: "tooltip"
          },
          academyTooltip
        )
      ), /* @__PURE__ */ react_global_default.createElement("div", { className: "v2-site-nav__cta" }, /* @__PURE__ */ react_global_default.createElement(Button, { variant: "dark", withArrow: true, href: resolveSitePath2(ctaHref), onClick: closeAll }, ctaLabel)), /* @__PURE__ */ react_global_default.createElement(
        "a",
        {
          className: "v2-site-nav__academy-login v2-site-nav__academy-login--mobile",
          href: resolveSitePath2(academyHref),
          "aria-label": academyLabel,
          onClick: closeAll
        },
        /* @__PURE__ */ react_global_default.createElement(
          DoodleIcon,
          {
            category: "interface",
            name: "user",
            size: 16,
            basePath: resolveSitePath2(academyIconBasePath),
            className: "v2-site-nav__academy-icon"
          }
        ),
        /* @__PURE__ */ react_global_default.createElement("span", { className: "v2-site-nav__academy-label" }, academyLabel)
      )))
    );
  }

  // ../../../40-areas/websites/impactplus/design-system/bundles/v2-shell-entry.jsx
  var namespace = window.IMPACTDesignSystem_9efa99 = window.IMPACTDesignSystem_9efa99 || {};
  Object.assign(namespace, {
    Footer,
    IMPACT_V2_BRAND_LINKS: DEFAULT_BRANDS,
    IMPACT_V2_CREDENTIALS: DEFAULT_CREDENTIALS,
    IMPACT_V2_FOOTER_COLUMNS: DEFAULT_COLUMNS,
    IMPACT_V2_LEGAL_LINKS: DEFAULT_LEGAL,
    IMPACT_V2_NAV_ITEMS: DEFAULT_ITEMS,
    IMPACT_V2_SOCIAL_LINKS: DEFAULT_SOCIAL,
    NavBar
  });
})();
