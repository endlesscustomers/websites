/**
 * Endless Customers — hello-bar.js
 *
 * Promotional strip above the nav. Data-driven so marketing schedules a
 * campaign (conference, webinar, membership special) without touching code.
 *
 *   - Source of truth: data/content/promotions.json
 *       (HubSpot equivalent: a HubDB table queried by the global header.)
 *   - Of the campaigns whose date window is open and that the visitor hasn't
 *     dismissed, the highest `priority` wins. An evergreen entry (priority 0,
 *     no end date) is the calm fallback so the bar is never empty.
 *   - Dismissal is remembered per campaign id, so closing the webinar bar
 *     does not hide next month's promo.
 *
 * Drop-in: a page opts in by including a <div id="hello-bar-placeholder"></div>
 * as the first element in <body> and loading this script. Pages without the
 * placeholder are untouched (--hello-bar-height stays 0).
 *
 * HubSpot migration: replace the fetch with a HubDB query in the global header
 * module; the render + dismissal logic stays as client-side JS.
 */
(function () {
  'use strict';

  var DATA_VERSION = '2026060925r';            // cache-bust, mirrors cms.js
  var DISMISS_PREFIX = 'ec-hellobar-dismissed:';

  var placeholder = document.getElementById('hello-bar-placeholder');
  if (!placeholder) return;

  // Resolve the data path from the site root regardless of page depth.
  var dir = window.location.pathname.replace(/\/[^\/]*\.[^\/]*$/, '/');
  var depth = dir.split('/').filter(Boolean).length;
  var root = depth === 0 ? './' : '../'.repeat(depth);
  var dataUrl = root + 'data/content/promotions.json?v=' + DATA_VERSION;

  fetch(dataUrl, { cache: 'no-cache' })
    .then(function (res) { if (!res.ok) throw new Error('promotions fetch failed'); return res.json(); })
    .then(function (promos) { init(promos || []); })
    .catch(function (err) { console.warn('[HelloBar]', err.message); });

  function isDismissed(id) {
    try { return localStorage.getItem(DISMISS_PREFIX + id) === '1'; }
    catch (e) { return false; }
  }
  function markDismissed(id) {
    try { localStorage.setItem(DISMISS_PREFIX + id, '1'); } catch (e) {}
  }

  function isWithinWindow(p, now) {
    if (p.starts && new Date(p.starts) > now) return false;
    if (p.ends && new Date(p.ends) < now) return false;
    return true;
  }

  function pickCampaign(promos) {
    var now = new Date();
    var eligible = promos.filter(function (p) {
      return p.status === 'active' && isWithinWindow(p, now) && !isDismissed(p.id);
    });
    eligible.sort(function (a, b) { return (b.priority || 0) - (a.priority || 0); });
    return eligible[0] || null;
  }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function init(promos) {
    var c = pickCampaign(promos);
    if (!c) return;

    var bar = el('div', 'hello-bar');           // wrapper — tracks scroll
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Announcement');
    var panel = el('div', 'hello-bar__panel');  // visible strip — slides in
    bar.appendChild(panel);

    var inner = el('div', 'hello-bar__inner');
    if (c.eyebrow) inner.appendChild(el('span', 'hello-bar__eyebrow', esc(c.eyebrow)));
    if (c.message) {
      if (c.eyebrow) inner.appendChild(el('span', 'hello-bar__sep', '·'));
      inner.appendChild(el('span', 'hello-bar__msg', esc(c.message)));
    }
    if (c.meta) {
      inner.appendChild(el('span', 'hello-bar__sep', '·'));
      inner.appendChild(el('span', 'hello-bar__meta', esc(c.meta)));
    }
    if (c.cta_label && c.cta_url) {
      var cta = el('a', 'hello-bar__cta', esc(c.cta_label) +
        ' <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="14" height="14">' +
        '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>');
      cta.setAttribute('href', c.cta_url);
      cta.setAttribute('data-promo-id', c.id);
      inner.appendChild(cta);
    }
    panel.appendChild(inner);

    if (c.dismissible !== false) {
      var close = el('button', 'hello-bar__close',
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>');
      close.setAttribute('type', 'button');
      close.setAttribute('aria-label', 'Dismiss announcement');
      close.addEventListener('click', function () { dismiss(bar, c.id); });
      panel.appendChild(close);
    }

    placeholder.appendChild(bar);

    var root = document.documentElement;
    var body = document.body;
    var sticky = c.sticky === true;   // pinned campaigns ignore scroll-away

    // Measure the natural height now (works while the bar is still lifted
    // off-screen). Hold it — we only apply the offset at reveal time so the
    // nav top, the body padding, and the bar slide all start together. If we
    // set the height var earlier, the nav (whose top reads the var) would
    // drop a beat ahead of everything else.
    var h = bar.offsetHeight;

    // A short, deliberate beat after the nav has settled, then reveal in step.
    setTimeout(function () {
      body.classList.add('hb-animating');             // let the pill ease its top
      root.style.setProperty('--hello-bar-height', h + 'px');
      body.classList.add('has-hello-bar');            // content glides down
      bar.classList.add('is-in');                     // bar slides down
      // Once the entrance settles, drop the top transition so scroll tracking
      // is instant, then start watching the scroll position.
      setTimeout(function () {
        body.classList.remove('hb-animating');
        if (!sticky) startScrollAway();
      }, 420);
    }, 140);

    // Scroll-away: translate the bar up by how far we've scrolled (capped at
    // its height) and let the nav rise with it. Sticky campaigns skip this.
    var scrollHandler = null;
    function startScrollAway() {
      var ticking = false;
      scrollHandler = function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var y = window.pageYOffset || root.scrollTop || 0;
          var s = Math.max(0, Math.min(y, h));
          root.style.setProperty('--hb-scroll', s + 'px');
          ticking = false;
        });
      };
      window.addEventListener('scroll', scrollHandler, { passive: true });
      scrollHandler();   // sync immediately in case the page loads scrolled
    }

    // Keep the offset accurate if the bar wraps to two lines on resize.
    window.addEventListener('resize', function () {
      if (!body.classList.contains('has-hello-bar')) return;
      h = bar.offsetHeight;
      root.style.setProperty('--hello-bar-height', h + 'px');
      if (scrollHandler) scrollHandler();
    });

    function dismiss(barEl, id) {
      markDismissed(id);
      if (scrollHandler) { window.removeEventListener('scroll', scrollHandler); scrollHandler = null; }
      body.classList.add('hb-animating');              // ease the pill back up
      bar.classList.remove('is-in');                   // panel slides up
      root.style.setProperty('--hb-scroll', '0px');
      root.style.setProperty('--hello-bar-height', '0px');
      body.classList.remove('has-hello-bar');          // nav + content glide up
      var done = function () {
        if (barEl.parentNode) barEl.parentNode.removeChild(barEl);
        body.classList.remove('hb-animating');
      };
      panel.addEventListener('transitionend', done, { once: true });
      setTimeout(done, 600);                           // fallback if no transition
    }
  }
})();
