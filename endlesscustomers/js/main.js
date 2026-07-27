/**
 * Endless Customers — main.js
 *
 * 1. Theme       — flash-free dark/light, localStorage persistence, system sync
 * 2. Components  — loads nav.html and footer.html via fetch
 * 3. Dropdowns   — click-to-open, ESC-to-close, outside-click-to-close
 * 4. Conference  — cycling image panel in the conference dropdown
 * 5. Mobile nav  — hamburger open/close
 * 6. Active link — highlights current page link in nav
 * 7. Scroll nav  — adds .is-scrolled to .nav on scroll
 * 8. Footer year — auto-updates copyright year
 *
 * HubSpot migration:
 *   Sections 2 (component loader) and 3–5 (nav interactions) are replaced
 *   by HubSpot Global Modules and HubSpot's built-in menu rendering.
 *   Sections 1, 7, 8 remain as client-side JS.
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Theme
     Flash-prevention is handled by an inline <script> in each page <head>.
     This module wires up the toggle button and system-preference listener.
     ========================================================================== */
  var THEME_KEY = 'ec-theme';

  function getTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateToggleLabel(theme);
    syncDropdownThemes();
  }

  function updateToggleLabel(theme) {
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function initThemeToggle() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    updateToggleLabel(getTheme());
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || getTheme();
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }


  /* ==========================================================================
     2. Component Loader
     ========================================================================== */
  function resolveComponentBase() {
    // Drop a trailing file (e.g. /a/b/page.html) so we count directory depth,
    // then walk up to the site root where /components/ lives. Works for both
    // directory-style URLs (/security/) and file-style URLs (/foo.html).
    var dir = window.location.pathname.replace(/\/[^\/]*\.[^\/]*$/, '/');
    var depth = dir.split('/').filter(Boolean).length;
    return depth === 0 ? './components/' : '../'.repeat(depth) + 'components/';
  }

  function loadComponent(placeholderId, componentPath, callback) {
    var el = document.getElementById(placeholderId);
    if (!el) return;

    // If the placeholder already has content (nav/footer inlined directly
    // in the HTML), skip the fetch and just run the callback immediately.
    // This makes every page work with file:// protocol without a server,
    // and also mirrors how HubSpot renders global modules server-side.
    if (el.children.length > 0) {
      if (typeof callback === 'function') callback();
      return;
    }

    // Otherwise fetch and inject (requires a local server, not file://).
    // cache:'no-cache' forces revalidation so component edits (nav/footer)
    // show up on a normal refresh instead of being served stale from cache.
    fetch(componentPath, { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load ' + componentPath);
        return res.text();
      })
      .then(function (html) {
        el.innerHTML = html;
        if (typeof callback === 'function') callback();
      })
      .catch(function (err) {
        console.warn('[ComponentLoader]', err.message);
      });
  }

  var base = resolveComponentBase();

  loadComponent('nav-placeholder', base + 'nav.html', function () {
    // Freeze all nav transitions while we configure it. The init calls below
    // can flip the pill into a docked bar (initSubnav adds .nav--docked) and
    // change theme scope — if the browser flushes styles mid-sequence, those
    // class flips animate and the bar visibly slides in from the left.
    // .nav--booting (css/main.css) kills every transition until two frames
    // after init completes, so the nav always appears fully settled.
    var bootNav = document.querySelector('#nav-placeholder .nav');
    if (bootNav) bootNav.classList.add('nav--booting');

    initThemeToggle();
    initDropdowns();
    buildMobileMenu();
    initMobileNav();
    setActiveNavLink();
    initScrollNav();
    initSubnav();
    initSubnavScrollFades();
    lockConferenceNavDark();
    syncDropdownThemes();

    if (bootNav) {
      // Two rAFs: the first fires before the next paint, the second after the
      // settled state has been committed — only then enable nav motion.
      // .nav--ready is the opt-in switch (css/main.css suppresses ALL nav
      // transitions/animations until it's present), so a nav that never gets
      // here simply stays settled and motionless instead of sliding in.
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          bootNav.classList.remove('nav--booting');
          bootNav.classList.add('nav--ready');
        });
      });
    }
  });

  loadComponent('footer-placeholder', base + 'footer.html', function () {
    setFooterYear();
  });


  /* ==========================================================================
     3. Dropdowns
     Click-to-open. Close on: outside click, ESC key, or opening another dropdown.
     ========================================================================== */
  var confCycleTimer = null;

  function initDropdowns() {
    var triggers = document.querySelectorAll('[data-dropdown]');

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var key    = trigger.getAttribute('data-dropdown');
        var ddId   = 'dd-' + key;
        var dd     = document.getElementById(ddId);
        var isOpen = dd && dd.classList.contains('is-open');

        closeAllDropdowns();

        if (!isOpen && dd) {
          openDropdown(trigger, dd, key);
        }
      });
    });

    document.addEventListener('click', closeAllDropdowns);

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;

      // Desktop dropdowns — close and return focus to the open trigger
      var openTrigger = document.querySelector('[data-dropdown][aria-expanded="true"]');
      closeAllDropdowns();
      if (openTrigger) openTrigger.focus();

      // Mobile menu — close and return focus to the hamburger
      var mobileMenu = document.getElementById('nav-mobile');
      var hamburger  = document.getElementById('nav-hamburger');
      if (mobileMenu && hamburger && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
        stopConferenceCycle();
        hamburger.focus();
      }
    });
  }

  function openDropdown(trigger, dd, key) {
    trigger.setAttribute('aria-expanded', 'true');
    dd.classList.add('is-open');
    if (key === 'conference') startConferenceCycle(dd);
  }

  function closeAllDropdowns() {
    var triggers = document.querySelectorAll('[data-dropdown]');
    var dropdowns = document.querySelectorAll('.nav__dropdown');

    triggers.forEach(function (t) {
      t.setAttribute('aria-expanded', 'false');
    });

    dropdowns.forEach(function (dd) {
      dd.classList.remove('is-open');
    });

    stopConferenceCycle();
  }


  /* ==========================================================================
     4. Conference Image Cycling
     ========================================================================== */
  // Cycle the photos inside whatever container holds a .conf-image
  // (desktop dropdown OR the cloned mobile conference panel).
  function startConferenceCycle(scope) {
    stopConferenceCycle();
    var img = scope && scope.querySelector('.conf-image');
    if (!img) return;
    var scenes = img.querySelectorAll('.conf-scene');
    var bars = img.querySelectorAll('.conf-progress__bar');
    if (!scenes.length) return;

    function show(n) {
      scenes.forEach(function (s, i) { s.classList.toggle('is-active', i === n); });
      bars.forEach(function (b, i) {
        b.classList.remove('is-active', 'is-done');
        if (i < n) b.classList.add('is-done');
      });
      if (bars[n]) {
        var fill = bars[n].querySelector('i');
        if (fill) void fill.offsetWidth; // force reflow to restart the fill animation
        bars[n].classList.add('is-active');
      }
    }

    var current = 0;
    show(0);
    confCycleTimer = setInterval(function () {
      current = (current + 1) % scenes.length;
      show(current);
    }, 3000);
  }

  function stopConferenceCycle() {
    if (confCycleTimer) {
      clearInterval(confCycleTimer);
      confCycleTimer = null;
    }
  }


  /* ==========================================================================
     5. Mobile Nav
     ========================================================================== */
  // Build the mobile menu by cloning the desktop dropdowns so the two never
  // drift apart — the desktop nav is the single source of truth. Icons,
  // subtext, category labels, and the conference image all come along.
  function buildMobileMenu() {
    var menu = document.getElementById('nav-mobile');
    var deskMenu = document.querySelector('.nav__menu');
    if (!menu || !deskMenu) return;

    var chevR = '<svg class="nav__mobile-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>';
    var chevL = '<svg class="nav__mobile-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';

    var main = document.createElement('div');
    main.className = 'nav__mobile-panel is-active';
    main.setAttribute('data-panel', 'main');
    var subs = [];

    deskMenu.querySelectorAll('.nav__item').forEach(function (item) {
      var trigger = item.querySelector('.nav__trigger');
      var dd = item.querySelector('.nav__dropdown');
      if (!trigger || !dd) return;
      var key = trigger.getAttribute('data-dropdown');

      var label = '';
      trigger.childNodes.forEach(function (nd) { if (nd.nodeType === 3) label += nd.textContent; });
      label = label.trim();

      var btn = document.createElement('button');
      btn.className = 'nav__mobile-group';
      btn.type = 'button';
      btn.setAttribute('data-target', key);
      btn.innerHTML = label + ' ' + chevR;
      main.appendChild(btn);

      var sub = document.createElement('div');
      sub.className = 'nav__mobile-panel';
      sub.setAttribute('data-panel', key);

      var back = document.createElement('button');
      back.className = 'nav__mobile-back';
      back.type = 'button';
      back.innerHTML = chevL + ' Back';
      sub.appendChild(back);

      var subtitle = document.createElement('div');
      subtitle.className = 'nav__mobile-subtitle';
      subtitle.textContent = label;
      sub.appendChild(subtitle);

      var wrap = document.createElement('div');
      wrap.className = 'nav__mobile-dd';
      // The conference block is locked dark everywhere (desktop panel, EC Live
      // branding) — re-scope its tokens so the white logo and light text never
      // sit on a light menu surface. CSS paints the matching dark card.
      if (key === 'conference') wrap.setAttribute('data-theme', 'dark');
      var clone = dd.cloneNode(true);
      // Strip ids so we don't duplicate them (conf-scene, conf-progress, etc.)
      clone.querySelectorAll('[id]').forEach(function (el) { el.removeAttribute('id'); });
      while (clone.firstChild) { wrap.appendChild(clone.firstChild); }
      sub.appendChild(wrap);

      subs.push(sub);
    });

    var sep = document.createElement('div');
    sep.className = 'nav__mobile-sep';
    main.appendChild(sep);

    var ctas = document.createElement('div');
    ctas.className = 'nav__mobile-ctas';
    var ghost = document.querySelector('.nav__actions .btn--nav-ghost');
    var primary = document.querySelector('.nav__actions .btn--nav-primary');
    if (ghost) ctas.appendChild(ghost.cloneNode(true));
    if (primary) ctas.appendChild(primary.cloneNode(true));
    main.appendChild(ctas);

    menu.innerHTML = '';
    menu.appendChild(main);
    subs.forEach(function (p) { menu.appendChild(p); });
  }

  function initMobileNav() {
    var hamburger = document.getElementById('nav-hamburger');
    var mobileMenu = document.getElementById('nav-mobile');
    if (!hamburger || !mobileMenu) return;

    // Drill-down: show a single panel (main or a group's sub-panel)
    function showPanel(name) {
      mobileMenu.querySelectorAll('.nav__mobile-panel').forEach(function (p) {
        p.classList.toggle('is-active', p.getAttribute('data-panel') === name);
      });
      mobileMenu.scrollTop = 0;
      if (name === 'conference') {
        startConferenceCycle(mobileMenu.querySelector('.nav__mobile-panel[data-panel="conference"]'));
      } else {
        stopConferenceCycle();
      }
    }

    // Event delegation so it keeps working no matter how the menu was built
    mobileMenu.addEventListener('click', function (e) {
      var group = e.target.closest('.nav__mobile-group');
      var back = e.target.closest('.nav__mobile-back');
      if (group) { showPanel(group.getAttribute('data-target')); }
      else if (back) { showPanel('main'); }
    });

    function closeMenu() {
      mobileMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      stopConferenceCycle();
    }

    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = mobileMenu.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      if (isOpen) {
        closeAllDropdowns();
        showPanel('main'); // always reopen at the top level
      } else {
        stopConferenceCycle();
      }
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMenu();
      }
    });

    // Crossing into the desktop breakpoint (rotation, window resize) closes
    // the menu — otherwise it lingers open behind the desktop nav and its
    // scroll-lock keeps the page frozen.
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1200 && mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }


  /* ==========================================================================
     6. Active Nav Link
     ========================================================================== */
  function setActiveNavLink() {
    var current = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav__mobile-link').forEach(function (link) {
      var href = (link.getAttribute('href') || '').replace(/\/$/, '');
      if (href && href !== '#' && !href.startsWith('#') && current === href) {
        link.style.color = 'var(--color-heading)';
        link.style.fontWeight = '700';
      }
    });
  }


  /* ==========================================================================
     7. Scroll Nav
     ========================================================================== */
  function initScrollNav() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    function onScroll() {
      // Docked bars (sub-nav pages) never carry a surface; is-scrolled there
      // only drives the overlay scrim fade, so it matches the hide threshold
      // in initSubnav (30px). (Checked at scroll time: initSubnav adds
      // .nav--docked after init.)
      var threshold = nav.classList.contains('nav--docked') ? 30 : 20;
      var scrolled = window.scrollY > threshold;
      nav.classList.toggle('is-scrolled', scrolled);
      // Overlay nav sits over a dark hero — always render dark (white text/logo)
      // while transparent. Once the pill appears on scroll, hand back to the
      // page theme so the pill matches light/dark mode like every other page.
      if (nav.classList.contains('nav--overlay') && !nav.classList.contains('nav--lock-dark')) {
        if (scrolled) {
          nav.removeAttribute('data-theme');
        } else {
          nav.setAttribute('data-theme', 'dark');
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  /* ==========================================================================
     7a-bis. Gliding pill indicator (shared)
     ONE absolutely-positioned chip that slides between .subnav__link items
     instead of the active highlight teleporting (June 2026, per Bob: every
     pill group on the site gets this — sub-nav bars, in-page filter pills,
     and anything we build later).
     Usage: window.initPillIndicator(wrapEl) where wrapEl directly contains
     .subnav__link items. Returns { move(el, instant), refresh() }.
     Clicks inside the wrap glide the chip automatically; callers with other
     active-state logic (e.g. scroll-spy) can drive it via .move().
     ========================================================================== */
  function initPillIndicator(wrap) {
    if (!wrap) return null;
    var existing = wrap.querySelector(':scope > .subnav__indicator');
    if (existing) existing.remove();   // re-init after a re-render
    var indicator = document.createElement('span');
    indicator.className = 'subnav__indicator';
    indicator.setAttribute('aria-hidden', 'true');
    wrap.insertBefore(indicator, wrap.firstChild);
    wrap.classList.add('pill--has-indicator');
    function move(el, instant) {
      if (!el) return;
      if (instant) indicator.style.transition = 'none';
      indicator.style.left = el.offsetLeft + 'px';
      indicator.style.top = el.offsetTop + 'px';
      indicator.style.width = el.offsetWidth + 'px';
      indicator.style.height = el.offsetHeight + 'px';
      if (instant) { void indicator.offsetWidth; indicator.style.transition = ''; }
    }
    function refresh() { move(wrap.querySelector('.subnav__link.is-active'), true); }
    wrap.addEventListener('click', function (e) {
      var link = e.target.closest('.subnav__link');
      if (link && wrap.contains(link)) move(link, false);
    });
    window.addEventListener('resize', refresh, { passive: true });
    window.addEventListener('load', refresh);
    requestAnimationFrame(refresh);    // initial position once layout settles
    return { move: move, refresh: refresh };
  }
  window.initPillIndicator = initPillIndicator;


  /* ==========================================================================
     7b. Section Sub-nav (breadcrumb + in-page anchors)
     - scroll-spy highlights the section in view
     - on scroll-down the main pill hides and the sub-pill raises to the top;
       on scroll-up (or near the top) the main pill returns
     Only runs on pages that actually have a #subnav.
     ========================================================================== */
  function initSubnav() {
    var subnav = document.getElementById('subnav');
    if (!subnav) return;

    // Service-page variant (.subnav--svc): the pill carries no breadcrumb and
    // stays hidden until the visitor scrolls past the hero (.svc-hero), then
    // fades in fixed below the main nav (CSS handles position/animation).
    // Conference pages reuse the pattern — their heroes have other class
    // names, so they opt in with a data-subnav-hero attribute (June 2026).
    if (subnav.classList.contains('subnav--svc') || subnav.classList.contains('subnav--path')) {
      var svcHero = document.querySelector('.svc-hero, .cf-hero, [data-subnav-hero]');
      if (svcHero) {
        var svcReveal = function () {
          var halfway = subnav.classList.contains('subnav--path');
          var r = svcHero.getBoundingClientRect();
          var past = halfway ? ((r.top + r.height / 2) <= 80) : (r.bottom <= 140);
          subnav.classList.toggle('is-shown', past);
        };
        window.addEventListener('scroll', svcReveal, { passive: true });
        window.addEventListener('resize', svcReveal, { passive: true });
        svcReveal();
      }
    }

    // On a sub-nav page the main nav docks full-width at the top and the
    // sub-nav becomes the floating pill below it.
    var nav = document.querySelector('.nav');
    if (nav) {
      nav.classList.add('nav--docked');
      // The docked bar blends with the page, so it follows the PAGE theme —
      // strip any hard-coded dark scope from the markup. (Conference pages
      // get re-locked dark by lockConferenceNavDark, which runs after this.)
      // Pages that lock the bar dark in markup (.nav--lock-dark, e.g. the Book
      // page over its dark hero) keep their dark scope so the white logo, light
      // text, and tokens stay correct even while the page body is in light mode.
      if (!nav.classList.contains('nav--lock-dark')) nav.removeAttribute('data-theme');
      // If the sub-nav carries its own primary CTA, demote the main nav's
      // primary CTA (Let's Talk) to a ghost so it doesn't compete.
      if (subnav.querySelector('.subnav__cta')) nav.classList.add('nav--demote-primary');
    }

    // Mobile (≤600px): clone the sub-nav CTA into a bar fixed to the bottom of
    // the viewport. CSS only shows it on mobile; we reveal it once the hero has
    // scrolled out of view (so it doesn't echo the hero's own CTA).
    var srcCta = subnav.querySelector('.subnav__cta');
    var heroEl = document.querySelector('#main-content > section')
              || document.querySelector('main section')
              || document.querySelector('section');
    var bottomBar = null;
    if (srcCta) {
      bottomBar = document.createElement('div');
      bottomBar.className = 'subnav-bottom-cta';
      var cloneCta = srcCta.cloneNode(true);
      cloneCta.classList.remove('subnav__cta');   // not the in-bar CTA
      cloneCta.classList.add('subnav-bottom-cta__btn');
      bottomBar.appendChild(cloneCta);
      document.body.appendChild(bottomBar);

      // Move the in-bar CTA out of the horizontally-scrolling links container so
      // it stays visible on tablet no matter how far the links scroll. It becomes
      // a direct child of .subnav__inner, sitting after the links.
      var inner = subnav.querySelector('.subnav__inner');
      if (inner && srcCta.parentElement && srcCta.parentElement.classList.contains('subnav__links')) {
        inner.appendChild(srcCta);
      }
    }

    var links = Array.prototype.slice.call(subnav.querySelectorAll('.subnav__link'));
    // Scroll-spy only applies to in-page anchor links (href="#..."). Section
    // sub-navs whose links point to other pages (e.g. the coaching section)
    // keep their server-set .is-active and skip spy highlighting entirely.
    var anchorLinks = links.filter(function (l) {
      return (l.getAttribute('href') || '').charAt(0) === '#';
    });
    var sections = anchorLinks
      .map(function (l) { return document.querySelector(l.getAttribute('href')); })
      .filter(Boolean);

    // Sliding active-chip indicator (June 2026, per Bob — Apple-style): ONE
    // chip element glides between links instead of the highlight teleporting.
    // It lives inside the links scroller so it tracks horizontal scrolling.
    // The mechanics live in the shared initPillIndicator() helper so ANY pill
    // of .subnav__link items gets the same glide (per Bob: every pill, ever).
    var linksWrap = subnav.querySelector('.subnav__links');
    var pillHandle = null;
    if (linksWrap && anchorLinks.length) {
      pillHandle = initPillIndicator(linksWrap);
      subnav.classList.add('subnav--has-indicator');
    }
    function moveIndicator(el, instant) {
      if (pillHandle) pillHandle.move(el, instant);
    }
    // Clicking a link slides the chip STRAIGHT to it and locks the spy while
    // the smooth scroll is in flight, so the chip doesn't stutter through
    // every link in between.
    var spyLockUntil = 0;
    anchorLinks.forEach(function (l, i) {
      l.addEventListener('click', function () {
        anchorLinks.forEach(function (x, j) { x.classList.toggle('is-active', j === i); });
        lastSpyIdx = i;
        moveIndicator(l, false);
        spyLockUntil = Date.now() + 900;
      });
    });
    // Re-measure when layout shifts under the chip (resize, late font load).
    window.addEventListener('resize', function () {
      moveIndicator(linksWrap && linksWrap.querySelector('.subnav__link.is-active'), true);
    }, { passive: true });
    window.addEventListener('load', function () {
      moveIndicator(linksWrap && linksWrap.querySelector('.subnav__link.is-active'), true);
    });

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var lastY = window.scrollY || window.pageYOffset || 0;
    var lastSpyIdx = -1;

    // The docked bar carries no surface of its own — its frosted-glass
    // backdrop (CSS ::after, shown via .is-scrolled) handles legibility once
    // content passes underneath; at the top it blends with the hero.

    function onScroll() {
      var y = window.scrollY || window.pageYOffset || 0;

      // Main bar hides on scroll-down (starting almost immediately — it has no
      // surface of its own, so it should get out of the way early); the
      // sub-nav stays and rises to the top
      if (y < 30) {
        if (nav) nav.classList.remove('nav--hidden');
        subnav.classList.remove('is-raised');
      } else if (!reduce) {
        if (y > lastY + 4) {
          if (nav) nav.classList.add('nav--hidden');
          subnav.classList.add('is-raised');
        } else if (y < lastY - 4) {
          if (nav) nav.classList.remove('nav--hidden');
          subnav.classList.remove('is-raised');
        }
      }
      lastY = y;

      // Reveal the mobile bottom CTA once the hero has scrolled out of view.
      if (bottomBar && heroEl) {
        var show = heroEl.getBoundingClientRect().bottom <= 0;
        bottomBar.classList.toggle('is-visible', show);
        document.body.classList.toggle('cta-bar-visible', show);
      }

      // Scroll-spy: last section whose top has passed the offset line.
      // Skipped on cross-page sub-navs (no in-page sections to track), and
      // paused while a click-initiated smooth scroll is in flight.
      if (sections.length && Date.now() >= spyLockUntil) {
        var offset = 150;
        var activeIdx = 0;
        for (var i = 0; i < sections.length; i++) {
          if (sections[i].getBoundingClientRect().top <= offset) activeIdx = i;
        }
        anchorLinks.forEach(function (l, i) { l.classList.toggle('is-active', i === activeIdx); });
        // Keep the active pill centered in the scroller as the spy moves —
        // instant on the first pass (page load), smooth on later changes.
        // The gliding chip follows the same cadence.
        if (activeIdx !== lastSpyIdx) {
          var firstPass = lastSpyIdx === -1;
          lastSpyIdx = activeIdx;
          moveIndicator(anchorLinks[activeIdx], firstPass);
          var scroller = subnav.querySelector('.subnav__links');
          if (scroller) centerActiveSubnavLink(scroller, !firstPass);
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Center the active link inside a horizontally-scrolling sub-nav. Without
  // this, landing on a page whose link sits far right (e.g. Tools in the
  // learn nav) leaves the active pill scrolled out of view entirely.
  function centerActiveSubnavLink(links, smooth) {
    var active = links.querySelector('.is-active');
    if (!active) return;
    var offset = active.getBoundingClientRect().left
               - links.getBoundingClientRect().left
               + links.scrollLeft;
    var target = offset - (links.clientWidth - active.offsetWidth) / 2;
    target = Math.max(0, Math.min(target, links.scrollWidth - links.clientWidth));
    if (smooth && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      links.scrollTo({ left: target, behavior: 'smooth' });
    } else {
      links.scrollLeft = target;
    }
  }

  // Horizontal-scrolling sub-nav links (section sub-navs, learn nav): fade the
  // edges whenever more content hides in that direction, so visitors can see
  // there's something to slide to. Drives the mask via two custom props.
  function initSubnavScrollFades() {
    document.querySelectorAll('.subnav__links').forEach(function (links) {
      function update() {
        var max = links.scrollWidth - links.clientWidth;
        var x = links.scrollLeft;
        links.style.setProperty('--fade-left',  (max > 1 && x > 1) ? '28px' : '0px');
        links.style.setProperty('--fade-right', (max > 1 && x < max - 1) ? '28px' : '0px');
      }
      links.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      update();
      // Land with the current page's link centered and in view.
      centerActiveSubnavLink(links, false);
    });
  }

  // Dropdown panels follow the PAGE theme (white panels in light mode), not
  // the always-dark bar they hang from: each panel re-scopes itself out of
  // the nav's dark token scope via its own data-theme. The conference panel
  // keeps its hard-coded data-theme="dark" and is skipped.
  function syncDropdownThemes() {
    var theme = document.documentElement.getAttribute('data-theme') || getTheme();
    document.querySelectorAll('.nav__dropdown:not(.nav__dropdown--conference)')
      .forEach(function (dd) { dd.setAttribute('data-theme', theme); });
  }

  function lockConferenceNavDark() {
    if (!/\/(live|ec-live)(\/|$)/.test(window.location.pathname)) return;
    var nav = document.querySelector('.nav');
    if (nav) { nav.setAttribute('data-theme', 'dark'); nav.classList.add('nav--lock-dark'); }
  }



  /* ==========================================================================
     8. Footer Year
     ========================================================================== */
  function setFooterYear() {
    var el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     9. Motion: site-wide scroll reveals + grouped stagger
     Pairs with the CSS in main.css (section 12c). The `[data-enter]` page
     entrance is pure CSS (runs on first paint); this wires the on-scroll
     reveals. From-states only exist under `html.ec-anim` (set flash-free in
     each page <head> when motion is allowed), so when motion is off or JS
     fails, content is simply visible, and adding `.is-in` here is then a no-op.

     A `[data-reveal-group]` staggers its direct children: we set a per-child
     --reveal-delay so any number of cards cascades in (capped so long grids
     don't drag). Each target reveals once, then we stop observing it.
     ========================================================================== */
  function initMotion() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var armed = document.documentElement.classList.contains('ec-anim');

    // Auto mode: give pages that carry no explicit motion hooks a gentle
    // scroll-reveal on their sections, so the polish is the site-wide default
    // without hand-editing every page. Flash-free: we only tag blocks that are
    // already below the fold at load (tagging an off-screen element with the
    // hidden start state is invisible). Skipped when motion is off, when the
    // page opts out (body[data-no-auto-reveal]), or when it defines its own
    // hooks (home page, template-based pages, anything with .hp-io).
    if (armed && !reduce &&
        !document.querySelector('[data-reveal], [data-reveal-group], [data-enter], .hp-io') &&
        !document.body.hasAttribute('data-no-auto-reveal')) {
      var scope = document.getElementById('main-content') ||
                  document.querySelector('main') || document.body;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      scope.querySelectorAll('.section, .cta-band').forEach(function (block) {
        if (block.getBoundingClientRect().top > vh * 0.85) {
          block.setAttribute('data-reveal', '');
        }
      });
    }

    document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
      var step = parseInt(group.getAttribute('data-reveal-step'), 10) || 70;
      var kids = group.children;
      for (var i = 0; i < kids.length; i++) {
        kids[i].style.setProperty('--reveal-delay', (Math.min(i, 9) * step) + 'ms');
      }
    });

    var els = document.querySelectorAll('[data-reveal], [data-reveal-group]');
    if (!els.length) return;

    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  initMotion();

})();
