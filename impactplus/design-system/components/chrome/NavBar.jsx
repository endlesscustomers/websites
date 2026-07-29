import React from "react";
import { Button } from "../core/Button.jsx";
import { DoodleIcon } from "../core/DoodleIcon.jsx";

const LOGO_WHITE = "https://www.impactplus.com/hubfs/IMPACT%20Style%20and%20Branding%20Assets/White%20Logo%20-%20Full/IMPACT-Logo--White-Full.png";
const LOGO_BLACK = "https://www.impactplus.com/hubfs/Black%20Logo%20-%20Full/IMPACT-logo--Black-contained.svg";

const DEFAULT_ITEMS = [
  {
    label: "How We Help",
    href: "/services",
    panel: "wide",
    groups: [
      {
        title: "Recommended First Step",
        variant: "primary",
        links: [
          { label: "Deep Diagnostic & Roadmap", href: "/services/deep-diagnostic-roadmap", description: "Find out why you’re not winning more customers, what is getting in the way, and what to fix first—with a prioritized 3-, 6-, and 12-month roadmap." },
        ],
      },
      {
        title: "Our Core Program",
        variant: "secondary",
        links: [
          { label: "Endless Customers Coaching Program", href: "/endless-customers-coaching", description: "Build the sales and marketing skills, systems, and accountability your team needs to implement Endless Customers and own your growth." },
        ],
      },
      {
        title: "Content, Video & AI",
        variant: "directory",
        links: [
          { label: "Content & Video Training", href: "/services/content-and-video-training" },
          { label: "YouTube Training", href: "/services/youtube-training" },
          { label: "AI Content Workflows", href: "/services#ai-content-workflows" },
          { label: "AI Visibility", href: "/services#ai-visibility" },
        ],
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
          { label: "Explore All Services", href: "/services/", emphasis: true },
        ],
      },
    ],
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
          { label: "AI and Content Results", href: "/services/success-stories#ai-content" },
        ],
      },
      {
        title: "Trust & Recognition",
        variant: "directory",
        links: [
          { label: "Reviews", href: "/services/reviews" },
          { label: "Awards & Recognition", href: "/awards" },
          { label: "Money-Back Guarantee", href: "/services/guarantee" },
        ],
      },
    ],
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
          { label: "Subscribe", href: "/learn#subscribe", emphasis: true, accent: true },
        ],
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
          { label: "Get a Free Chapter", href: "https://www.endlesscustomers.com/preview-edition", emphasis: true, accent: true },
        ],
      },
    ],
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
          { label: "Contact", href: "/contact-us" },
        ],
      },
    ],
  },
];

const Caret = () => (
  <svg className="v2-site-nav__caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MenuIcon = ({ open }) => open ? (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
) : (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);

const cx = (...names) => names.filter(Boolean).join(" ");
const resolveSitePath = (value) => (
  typeof window !== "undefined"
  && window.location.pathname.startsWith("/websites/impactplus/")
  && value?.startsWith("/")
  && !value.startsWith("//")
    ? `/websites/impactplus${value}`
    : value
);

/**
 * V2 global navigation. Its defaults implement the ratified light-refresh
 * commercial journey: How We Help, Pricing, Results, Learning Center, About,
 * and the persistent Let’s Talk action.
 */
export function NavBar({
  items = DEFAULT_ITEMS,
  onDark = true,
  ctaLabel = "Let’s Talk",
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
  const [openMenu, setOpenMenu] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isScrollHidden, setIsScrollHidden] = React.useState(false);
  const headerRef = React.useRef(null);
  const keyboardModeRef = React.useRef(false);
  const menuId = React.useId();

  const closeAll = React.useCallback(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, []);

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (!mobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [mobileOpen]);

  React.useEffect(() => {
    if (mobileOpen || openMenu !== null) setIsScrollHidden(false);
  }, [mobileOpen, openMenu]);

  React.useEffect(() => {
    let lastY = Math.max(window.scrollY, 0);
    let directionStart = lastY;
    let lastDirection = null;
    let frame = null;

    const update = () => {
      const y = Math.max(window.scrollY, 0);
      const direction = y > lastY ? "down" : y < lastY ? "up" : lastDirection;
      const hasKeyboardFocus = Boolean(
        keyboardModeRef.current
        && headerRef.current?.contains(document.activeElement)
        && document.activeElement?.matches?.(":focus-visible"),
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

  React.useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1101px)");
    const reconcileViewport = () => {
      if (!desktop.matches) return;
      setMobileOpen(false);
      setOpenMenu(null);
    };
    desktop.addEventListener("change", reconcileViewport);
    return () => desktop.removeEventListener("change", reconcileViewport);
  }, []);

  return (
    <header
      ref={headerRef}
      className={cx(
        "v2-site-nav",
        onDark ? "v2-site-nav--dark" : "v2-site-nav--light",
        mobileOpen && "is-mobile-open",
        isScrolled && "is-scrolled",
        isScrollHidden && !mobileOpen && openMenu === null && "is-scroll-hidden",
        className,
      )}
      style={{ "--v2-nav-max": maxWidth, ...style }}
      onFocusCapture={() => setIsScrollHidden(false)}
      {...rest}
    >
      <a className="v2-site-nav__skip" href="#main-content">Skip to content</a>
      <div className="v2-site-nav__bar">
        <div className="v2-site-nav__brand">
          <a className="v2-site-nav__logo" href={resolveSitePath(homeHref)} aria-label="IMPACT home" onClick={closeAll}>
            <img src={onDark ? LOGO_WHITE : LOGO_BLACK} alt="IMPACT" width="482" height="150" />
          </a>
          {showDescriptor && (
            <a className="v2-site-nav__descriptor" href={resolveSitePath(descriptorHref)} onClick={closeAll}>
              Coaching &amp; Training<br />for Endless Customers
            </a>
          )}
        </div>

        <button
          className="v2-site-nav__mobile-toggle"
          type="button"
          aria-expanded={mobileOpen}
          aria-controls={`${menuId}-menu`}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => {
            setMobileOpen((value) => !value);
            setOpenMenu(null);
          }}
        >
          <MenuIcon open={mobileOpen} />
        </button>

        <div className="v2-site-nav__drawer" id={`${menuId}-menu`}>
          <nav className="v2-site-nav__links" aria-label="Primary navigation">
            {items.map((item, index) => {
              const hasGroups = Boolean(item.groups?.length);
              const isOpen = openMenu === index;
              const isActive = activeHref && (activeHref === item.href || activeHref.startsWith(`${item.href}/`));
              return (
                <div className={cx("v2-site-nav__item", hasGroups && "has-panel", isOpen && "is-open")} key={item.label}>
                  {hasGroups ? (
                    <button
                      className={cx("v2-site-nav__top-link", isActive && "is-active")}
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      aria-controls={`${menuId}-panel-${index}`}
                      onClick={() => setOpenMenu(isOpen ? null : index)}
                    >
                      {item.label}<Caret />
                    </button>
                  ) : (
                    <a className={cx("v2-site-nav__top-link", isActive && "is-active")} href={resolveSitePath(item.href)} onClick={closeAll}>{item.label}</a>
                  )}

                  {hasGroups && (
                    <div
                      className={cx("v2-site-nav__mega", item.panel && `v2-site-nav__mega--${item.panel}`)}
                      id={`${menuId}-panel-${index}`}
                      aria-hidden={!isOpen}
                    >
                      <div className="v2-site-nav__mega-inner">
                        {item.groups.map((group) => {
                          const isJourneyCard = ["primary", "secondary"].includes(group.variant) && group.links.length === 1;
                          const journeyLink = isJourneyCard ? group.links[0] : null;
                          return (
                            <section className={cx("v2-site-nav__group", group.featured && "v2-site-nav__group--featured", group.variant && `v2-site-nav__group--${group.variant}`)} key={group.title}>
                              {isJourneyCard ? (
                                <a className="v2-site-nav__journey-link" href={resolveSitePath(journeyLink.href)} onClick={closeAll}>
                                  <p className="v2-site-nav__group-title">{group.title}</p>
                                  <span>{journeyLink.label}</span>
                                  {journeyLink.description && <small>{journeyLink.description}</small>}
                                </a>
                              ) : (
                                <>
                                  <p className="v2-site-nav__group-title">{group.title}</p>
                                  {group.subgroups?.length > 0 && (
                                    <div className="v2-site-nav__subgroups">
                                      {group.subgroups.map((subgroup) => (
                                        <div className="v2-site-nav__subgroup" key={subgroup.title}>
                                          <p className="v2-site-nav__subgroup-title">{subgroup.title}</p>
                                          <ul>
                                            {subgroup.links.map((link) => (
                                              <li key={link.label}>
                                                <a href={resolveSitePath(link.href)} onClick={closeAll}>
                                                  <span>{link.label}</span>
                                                  {link.description && <small>{link.description}</small>}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  <ul>
                                    {group.links.map((link) => (
                                      <li className={cx(link.emphasis && "v2-site-nav__directory-action-item")} key={link.label}>
                                        <a className={cx(link.emphasis && "is-emphasis", link.accent && "is-accent")} href={resolveSitePath(link.href)} onClick={closeAll}>
                                          <span>{link.label}</span>
                                          {link.description && <small>{link.description}</small>}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </section>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <a
            className="v2-site-nav__academy-login v2-site-nav__academy-login--desktop"
            href={resolveSitePath(academyHref)}
            aria-label={academyLabel}
            aria-describedby={`${menuId}-academy-tooltip`}
            onClick={closeAll}
          >
            <DoodleIcon
              category="interface"
              name="user"
              size={16}
              basePath={resolveSitePath(academyIconBasePath)}
              className="v2-site-nav__academy-icon"
            />
            <span className="v2-site-nav__academy-label">{academyLabel}</span>
            <span
              className="v2-site-nav__academy-tooltip"
              id={`${menuId}-academy-tooltip`}
              role="tooltip"
            >
              {academyTooltip}
            </span>
          </a>

          <div className="v2-site-nav__cta">
            <Button variant="dark" withArrow href={resolveSitePath(ctaHref)} onClick={closeAll}>{ctaLabel}</Button>
          </div>

          <a
            className="v2-site-nav__academy-login v2-site-nav__academy-login--mobile"
            href={resolveSitePath(academyHref)}
            aria-label={academyLabel}
            onClick={closeAll}
          >
            <DoodleIcon
              category="interface"
              name="user"
              size={16}
              basePath={resolveSitePath(academyIconBasePath)}
              className="v2-site-nav__academy-icon"
            />
            <span className="v2-site-nav__academy-label">{academyLabel}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export { DEFAULT_ITEMS as IMPACT_V2_NAV_ITEMS };
