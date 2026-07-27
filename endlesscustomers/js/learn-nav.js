/* ==========================================================================
   LEARN SHARED NAVIGATION — topic panel + library search overlay
   --------------------------------------------------------------------------
   Loaded by every Learn-section page after cms.js. Provides:

     • Topic panel  — opened by any [data-topics-trigger] element.
       Type-ahead OR drill-down through nav topics (parents → subtopics),
       with live content counts. Clicking a topic navigates to its hub page.

     • Search overlay — opened by any [data-search-trigger] element.
       Client-side index across topics, Playbook lessons (evergreen),
       articles & episodes (insights), webinars, and tools (offers),
       grouped results. Swappable for a real search backend later — the
       UI contract is just "input in, grouped links out".

   Topics taxonomy rules (data/taxonomy/topics.json):
     • nav:false / kind:"framework" entries are Playbook structure, NOT
       browsable subjects — they never appear in the panel or search.
     • Two levels max: parent_topic_id null = parent, else subtopic.
     • Topics with zero tagged content are hidden from the panel
       (their hub pages still resolve directly).
   ========================================================================== */
(function () {
  'use strict';
  if (typeof EC === 'undefined') return;

  var DATA = null, LOADING = null;

  function topicUrl(id) { return '/learn/topics/topic.html?id=' + encodeURIComponent(id); }

  /* ---------------- data: load once, count once ---------------- */
  function load() {
    if (LOADING) return LOADING;
    LOADING = EC.load({
      topics: 'taxonomy/topics',
      insights: 'content/insights',
      webinars: 'content/webinars',
      offers: 'content/offers',
      /* evergreen (Playbook lessons) removed June 2026 — Playbook retired in favor of
         /learn/core-concepts-frameworks, indexed below as Concepts & frameworks. */
      concepts: 'content/concepts',
      people: 'content/people'
    }).then(function (d) {
      var counts = {};
      function bump(id) { counts[id] = (counts[id] || 0) + 1; }
      (d.insights || []).forEach(function (it) { (it.topic_ids || []).forEach(bump); });
      (d.webinars || []).forEach(function (w) { (w.topic_ids || []).forEach(bump); });
      (d.offers || []).forEach(function (o) { (o.topic_ids || []).forEach(bump); });
      (d.evergreen || []).forEach(function (e) { if (e.topic_id) bump(e.topic_id); });

      var nav = (d.topics || []).filter(function (t) { return t.nav !== false; });
      var parents = nav.filter(function (t) { return !t.parent_topic_id; });
      var childrenOf = {};
      nav.forEach(function (t) {
        if (t.parent_topic_id) (childrenOf[t.parent_topic_id] = childrenOf[t.parent_topic_id] || []).push(t);
      });
      // parent display count = own + children
      function total(t) {
        var n = counts[t.id] || 0;
        (childrenOf[t.id] || []).forEach(function (c) { n += counts[c.id] || 0; });
        return n;
      }
      DATA = {
        raw: d,
        topicsIdx: EC.indexBy(d.topics),
        counts: counts,
        navTopics: nav,
        parents: parents.map(function (t) { return { t: t, n: total(t) }; })
          .filter(function (p) { return p.n > 0; })
          .sort(function (a, b) { return b.n - a.n; }),
        childrenOf: childrenOf
      };
      return DATA;
    });
    return LOADING;
  }

  /* ---------------- overlay scaffolding (shared) ---------------- */
  function makeOverlay(cls, labelledBy) {
    var ov = document.createElement('div');
    ov.className = 'lnav-overlay ' + cls;
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    if (labelledBy) ov.setAttribute('aria-label', labelledBy);
    ov.addEventListener('click', function (e) { if (e.target === ov) close(ov); });
    document.body.appendChild(ov);
    return ov;
  }
  function open(ov) {
    ov.classList.add('is-open');
    document.documentElement.classList.add('lnav-lock');
    var inp = ov.querySelector('input'); if (inp) { inp.value = ''; inp.dispatchEvent(new Event('input')); setTimeout(function () { inp.focus(); }, 30); }
  }
  function close(ov) {
    ov.classList.remove('is-open');
    document.documentElement.classList.remove('lnav-lock');
  }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.lnav-overlay.is-open').forEach(close);
  });

  /* =====================================================================
     TOPIC PANEL
     ===================================================================== */
  var topicOv = null, activeParent = null;

  function buildTopicPanel() {
    topicOv = makeOverlay('lnav-overlay--topics', 'Browse topics');
    topicOv.innerHTML =
      '<div class="lnav-modal tpanel">' +
        '<div class="lnav-modal__head">' +
          '<i class="ti ti-category lnav-modal__icon" aria-hidden="true"></i>' +
          '<input type="text" class="lnav-modal__input" id="tpanel-q" placeholder="Start typing a topic… or browse below" autocomplete="off">' +
          '<button class="lnav-modal__close" aria-label="Close">&times;</button>' +
        '</div>' +
        '<div class="tpanel__cols">' +
          '<div class="tpanel__list" id="tpanel-left"></div>' +
          '<div class="tpanel__list tpanel__list--subs" id="tpanel-right"></div>' +
        '</div>' +
        '<div class="lnav-modal__foot"><a href="/learn/topics/">View all topics →</a></div>' +
      '</div>';
    topicOv.querySelector('.lnav-modal__close').addEventListener('click', function () { close(topicOv); });

    var q = topicOv.querySelector('#tpanel-q');
    q.addEventListener('input', function () {
      var term = q.value.trim().toLowerCase();
      if (term.length > 1) renderTopicSearch(term); else renderBrowse();
    });
    topicOv.querySelector('#tpanel-left').addEventListener('click', function (e) {
      var row = e.target.closest('[data-parent]'); if (!row) return;
      activeParent = row.getAttribute('data-parent');
      renderBrowse();
    });
  }

  function topicRow(t, n, ctx) {
    return '<a class="tpanel__item" href="' + topicUrl(t.id) + '">' +
      '<span>' + EC.escapeHtml(t.label) + (ctx ? ' <span class="tpanel__ctx">· in ' + EC.escapeHtml(ctx) + '</span>' : '') + '</span>' +
      '<span class="tpanel__n">' + n + '</span></a>';
  }

  function renderBrowse() {
    var L = topicOv.querySelector('#tpanel-left'), R = topicOv.querySelector('#tpanel-right');
    if (!activeParent && DATA.parents.length) activeParent = DATA.parents[0].t.id;
    L.innerHTML = DATA.parents.map(function (p) {
      return '<button type="button" class="tpanel__item tpanel__item--parent' + (p.t.id === activeParent ? ' is-active' : '') + '" data-parent="' + p.t.id + '">' +
        '<span>' + EC.escapeHtml(p.t.label) + '</span><span class="tpanel__n">' + p.n + ' ›</span></button>';
    }).join('');
    var pt = DATA.topicsIdx[activeParent];
    var subs = (DATA.childrenOf[activeParent] || []).filter(function (c) { return (DATA.counts[c.id] || 0) > 0; });
    R.innerHTML = pt
      ? '<div class="tpanel__crumb"><a href="' + topicUrl(pt.id) + '">All ' + EC.escapeHtml(pt.label) + ' →</a></div>' +
        subs.map(function (c) { return topicRow(c, DATA.counts[c.id] || 0); }).join('') +
        (subs.length ? '' : '<div class="tpanel__empty">No subtopics yet — view the topic itself.</div>')
      : '';
  }

  function renderTopicSearch(term) {
    var L = topicOv.querySelector('#tpanel-left'), R = topicOv.querySelector('#tpanel-right');
    var out = [];
    DATA.navTopics.forEach(function (t) {
      if (t.label.toLowerCase().indexOf(term) === -1) return;
      var n = DATA.counts[t.id] || 0; if (!n) return;
      var parent = t.parent_topic_id ? DATA.topicsIdx[t.parent_topic_id] : null;
      out.push(topicRow(t, n, parent ? parent.label : null));
    });
    L.innerHTML = out.length
      ? '<div class="tpanel__crumb">Matches</div>' + out.slice(0, 10).join('')
      : '<div class="tpanel__empty">No topics match — try the full library search.</div>';
    R.innerHTML = '<div class="tpanel__empty">Clear the box to browse by subject again.</div>';
  }

  /* =====================================================================
     LIBRARY SEARCH
     ===================================================================== */
  var searchOv = null, INDEX = null;

  function buildIndex() {
    if (INDEX) return INDEX;
    var d = DATA.raw, idx = [];
    function add(group, label, sub, href, hay) {
      idx.push({ g: group, l: label, s: sub || '', h: href, hay: (label + ' ' + (hay || '')).toLowerCase() });
    }
    DATA.navTopics.forEach(function (t) {
      if ((DATA.counts[t.id] || 0) > 0) add('Topics', t.label, (DATA.counts[t.id]) + ' resources', topicUrl(t.id), t.description);
    });
    (d.concepts || []).forEach(function (c) {
      if (c.status !== 'published') return;
      // external_url = the canonical answer lives on its own page (e.g. /learn/what-is-endless-customers)
      add('Concepts & frameworks', c.question, (c.estimated_read_time ? c.estimated_read_time + ' min read' : 'Concept'), c.external_url || ('/learn/core-concepts-frameworks/concept.html?id=' + encodeURIComponent(c.id)), c.short_answer);
    });
    (d.insights || []).forEach(function (it) {
      add('Articles & episodes', EC.cleanTitle(it.title), (it.episode_number ? 'Ep. ' + it.episode_number + ' · ' : '') + EC.formatDate(it.publish_date), '/learn/recent-insight/article.html?id=' + encodeURIComponent(it.id), it.excerpt);
    });
    (d.webinars || []).forEach(function (w) {
      var st = (w.status === 'upcoming' || w.status === 'live') ? 'Upcoming · ' + EC.formatDate(w.event_date) : 'On demand';
      add('Webinars', w.title, st, '/learn/webinar/webinar.html?id=' + encodeURIComponent(w.id), w.description);
    });
    (d.offers || []).forEach(function (o) {
      add('Tools & templates', o.title, o.type || 'Resource', '/learn/tool/offer.html?id=' + encodeURIComponent(o.id), o.tagline + ' ' + (o.description || ''));
    });
    INDEX = idx;
    return idx;
  }

  function buildSearch() {
    searchOv = makeOverlay('lnav-overlay--search', 'Search the library');
    searchOv.innerHTML =
      '<div class="lnav-modal lsearch">' +
        '<div class="lnav-modal__head">' +
          '<i class="ti ti-search lnav-modal__icon" aria-hidden="true"></i>' +
          '<input type="text" class="lnav-modal__input" id="lsearch-q" placeholder="Search articles, webinars, concepts &amp; tools…" autocomplete="off">' +
          '<button class="lnav-modal__close" aria-label="Close">&times;</button>' +
        '</div>' +
        '<div class="lsearch__results" id="lsearch-results">' +
          '<div class="tpanel__empty">Type to search the whole library — every format, one box.</div>' +
        '</div>' +
      '</div>';
    searchOv.querySelector('.lnav-modal__close').addEventListener('click', function () { close(searchOv); });

    var q = searchOv.querySelector('#lsearch-q');
    var res = searchOv.querySelector('#lsearch-results');
    q.addEventListener('input', function () {
      var term = q.value.trim().toLowerCase();
      if (term.length < 2) {
        res.innerHTML = '<div class="tpanel__empty">Type to search the whole library — every format, one box.</div>';
        return;
      }
      var hits = buildIndex().filter(function (r) { return r.hay.indexOf(term) > -1; });
      // title matches first
      hits.sort(function (a, b) {
        var at = a.l.toLowerCase().indexOf(term) > -1 ? 0 : 1;
        var bt = b.l.toLowerCase().indexOf(term) > -1 ? 0 : 1;
        return at - bt;
      });
      if (!hits.length) { res.innerHTML = '<div class="tpanel__empty">Nothing yet for “' + EC.escapeHtml(q.value.trim()) + '”.</div>'; return; }
      var groups = ['Topics', 'Concepts & frameworks', 'Articles & episodes', 'Webinars', 'Tools & templates'];
      res.innerHTML = groups.map(function (g) {
        var rows = hits.filter(function (r) { return r.g === g; }).slice(0, 5);
        if (!rows.length) return '';
        return '<div class="lsearch__group">' +
          '<div class="lsearch__glabel">' + g + '</div>' +
          rows.map(function (r) {
            return '<a class="lsearch__hit" href="' + r.h + '">' +
              '<span class="lsearch__hit-title">' + EC.escapeHtml(r.l) + '</span>' +
              '<span class="lsearch__hit-sub">' + EC.escapeHtml(r.s) + '</span></a>';
          }).join('') + '</div>';
      }).join('');
    });
    // Enter = open first hit
    q.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      var first = res.querySelector('.lsearch__hit');
      if (first) window.location.href = first.getAttribute('href');
    });
  }

  /* ---------------- triggers (delegated) ---------------- */
  document.addEventListener('click', function (e) {
    var tt = e.target.closest('[data-topics-trigger]');
    var st = e.target.closest('[data-search-trigger]');
    if (!tt && !st) return;
    e.preventDefault();
    load().then(function () {
      if (tt) { if (!topicOv) buildTopicPanel(); renderBrowse(); open(topicOv); }
      else { if (!searchOv) buildSearch(); open(searchOv); }
    });
  });

  /* Pin the subnav search trigger outside the horizontally-scrolling links
     row so it stays reachable when the links overflow on narrow desktops.
     (Same pattern main.js uses for the services subnav CTA.) */
  document.addEventListener('DOMContentLoaded', function () {
    var inner = document.querySelector('.subnav__inner');
    var search = document.querySelector('.subnav__links > .subnav__search');
    if (inner && search) inner.appendChild(search);

    // Fade the trailing links behind the pinned search icon when the row
    // overflows (and lift the fade once scrolled to the end).
    var links = document.querySelector('.subnav__links');
    if (links) {
      var sync = function () {
        var over = links.scrollWidth > links.clientWidth + 1;
        links.classList.toggle('has-overflow', over);
        links.classList.toggle('at-end', over && links.scrollLeft + links.clientWidth >= links.scrollWidth - 2);
      };
      links.addEventListener('scroll', sync, { passive: true });
      window.addEventListener('resize', sync);
      sync();
    }
  });

  /* Public hooks for pages that want the same data (front door, topic pages) */
  window.LEARN = { load: load, topicUrl: topicUrl };
})();
