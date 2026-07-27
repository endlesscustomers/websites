/**
 * Endless Customers — cms.js
 * =====================================================================
 * The mock CMS engine for the Learn / Learning Center section.
 *
 * It mirrors how HubSpot CMS renders dynamic pages so the migration
 * path stays obvious:
 *
 *   fetch JSON            → HubSpot CMS Collection query
 *   ?id= URL param        → HubSpot dynamic page URL mapping
 *   indexBy / resolve     → HubSpot Associations
 *   EC.markdown(...)      → HubL rich-text rendering
 *   EC.setSEO / JSON-LD   → HubSpot page SEO + structured-data modules
 *
 * Pages load this file, then call the small render helpers below from a
 * short inline <script>. Templates stay declarative; this engine owns
 * all data fetching, relationship resolution, and markup generation.
 *
 * Data is served from the site root (/data/...), matching the rest of
 * the site's root-absolute links. Run `npx serve .` from Website v2.
 * =====================================================================
 */
window.EC = (function () {
  'use strict';

  var DATA_BASE = '/data/';
  // Bump when content JSON changes so browsers don't serve stale cached data.
  var DATA_VERSION = '2026060925r';
  var cache = {};

  /* ------------------------------------------------------------------
     Fetching + caching (one in-flight promise per file)
     ------------------------------------------------------------------ */
  function fetchJSON(path) {
    if (cache[path]) return cache[path];
    var p = fetch(path).then(function (r) {
      if (!r.ok) throw new Error('CMS: failed to load ' + path + ' (' + r.status + ')');
      return r.json();
    });
    cache[path] = p;
    return p;
  }

  // collection('content/insights') -> /data/content/insights.json
  function collection(name) {
    return fetchJSON(DATA_BASE + name + '.json?v=' + DATA_VERSION);
  }

  // load({ insights:'content/insights', people:'content/people', ... })
  // -> { insights:[...], people:[...], ... }
  function load(map) {
    var keys = Object.keys(map);
    return Promise.all(keys.map(function (k) { return collection(map[k]); }))
      .then(function (results) {
        var out = {};
        keys.forEach(function (k, i) { out[k] = results[i]; });
        return out;
      });
  }

  /* ------------------------------------------------------------------
     Relationship helpers (the Associations layer)
     ------------------------------------------------------------------ */
  function indexBy(arr, key) {
    key = key || 'id';
    var m = {};
    (arr || []).forEach(function (o) { m[o[key]] = o; });
    return m;
  }

  // resolve(index, ['id1','id2']) -> [record, record]  (drops missing)
  function resolve(index, ids) {
    return (ids || []).map(function (id) { return index[id]; }).filter(Boolean);
  }

  /* ------------------------------------------------------------------
     URL params
     ------------------------------------------------------------------ */
  function param(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  /* ------------------------------------------------------------------
     Formatting
     ------------------------------------------------------------------ */
  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatDate(iso) {
    if (!iso) return '';
    var d = new Date((iso.length === 10 ? iso + 'T00:00:00' : iso));
    if (isNaN(d)) return iso;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  // Episode titles carry a "[Endless Customers Podcast Ep. NN]" suffix that
  // is great for SEO but noisy in cards/heroes. cleanTitle strips it.
  function cleanTitle(t) {
    return String(t || '').replace(/\s*\[Endless Customers Podcast[^\]]*\]\s*$/i, '').trim();
  }

  /* ------------------------------------------------------------------
     Minimal, safe-enough Markdown (authored/trusted content)
     Supports: ## / ### headings, **bold**, *italic*, [links](url),
     - bullet lists, and paragraphs.
     ------------------------------------------------------------------ */
  function mdInline(s) {
    s = escapeHtml(s);
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,
      '<a href="$2" rel="noopener">$1</a>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
    return s;
  }

  function markdown(md) {
    if (!md) return '';
    var lines = String(md).split(/\r?\n/);
    var html = '', para = [], inList = false, inOl = false;
    function flushPara() { if (para.length) { html += '<p>' + mdInline(para.join(' ')) + '</p>'; para = []; } }
    function flushList() { if (inList) { html += '</ul>'; inList = false; } if (inOl) { html += '</ol>'; inOl = false; } }
    lines.forEach(function (raw) {
      var line = raw.trim(), m;
      if (!line) { flushPara(); flushList(); return; }
      if ((m = line.match(/^####?\s+(.*)/)) && /^###/.test(line)) { flushPara(); flushList(); html += '<h3>' + mdInline(m[1]) + '</h3>'; }
      else if ((m = line.match(/^##\s+(.*)/))) { flushPara(); flushList(); html += '<h2>' + mdInline(m[1]) + '</h2>'; }
      else if ((m = line.match(/^#\s+(.*)/))) { flushPara(); flushList(); html += '<h2>' + mdInline(m[1]) + '</h2>'; }
      else if ((m = line.match(/^>\s+(.*)/))) { flushPara(); flushList(); html += '<blockquote><p>' + mdInline(m[1]) + '</p></blockquote>'; }
      else if ((m = line.match(/^[-*]\s+(.*)/))) { flushPara(); if (inOl) { html += '</ol>'; inOl = false; } if (!inList) { html += '<ul>'; inList = true; } html += '<li>' + mdInline(m[1]) + '</li>'; }
      else if ((m = line.match(/^\d+\.\s+(.*)/))) { flushPara(); if (inList) { html += '</ul>'; inList = false; } if (!inOl) { html += '<ol>'; inOl = true; } html += '<li>' + mdInline(m[1]) + '</li>'; }
      else { flushList(); para.push(line); }
    });
    flushPara(); flushList();
    return html;
  }

  /* ------------------------------------------------------------------
     SEO + structured data (the AEO/E-E-A-T toolkit)
     ------------------------------------------------------------------ */
  function setMeta(attr, key, value) {
    if (!value) return;
    var sel = '[' + attr + '="' + key + '"]';
    var el = document.head.querySelector('meta' + sel);
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
    el.setAttribute('content', value);
  }

  function setCanonical(url) {
    if (!url) return;
    var el = document.head.querySelector('link[rel="canonical"]');
    if (!el) { el = document.createElement('link'); el.setAttribute('rel', 'canonical'); document.head.appendChild(el); }
    el.setAttribute('href', url);
  }

  // setSEO(record.seo, { title, description, image })  — record.seo wins,
  // the fallbacks fill any blank field (mirrors the spec's shared seo object).
  function setSEO(seo, fallback) {
    seo = seo || {}; fallback = fallback || {};
    var title = seo.meta_title || fallback.title;
    var desc = seo.meta_description || fallback.description;
    var img = seo.og_image_url || fallback.image;
    if (title) document.title = title + ' — Endless Customers';
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:type', fallback.ogType || 'article');
    setCanonical(seo.canonical_url || '');
    if (seo.noindex) setMeta('name', 'robots', 'noindex');
  }

  function jsonLD(obj) {
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }

  function faqSchema(questions) {
    if (!questions || !questions.length) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': questions.map(function (q) {
        return {
          '@type': 'Question',
          'name': q.question,
          'acceptedAnswer': { '@type': 'Answer', 'text': q.answer }
        };
      })
    };
  }

  function breadcrumbSchema(crumbs) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': crumbs.map(function (c, i) {
        return { '@type': 'ListItem', 'position': i + 1, 'name': c.name, 'item': c.url };
      })
    };
  }

  /* ------------------------------------------------------------------
     Shared UI fragments (reused by hub, listing, and related blocks)
     ------------------------------------------------------------------ */
  // Insight/episode card. topicsIdx maps topic id -> topic record.
  function insightCard(it, topicsIdx) {
    topicsIdx = topicsIdx || {};
    var tags = (it.topic_ids || []).slice(0, 2).map(function (id) {
      var t = topicsIdx[id];
      return t ? '<span class="ec-tag">' + escapeHtml(t.label) + '</span>' : '';
    }).join('');
    var media = cardImg(it.featured_image_url);   // graceful fallback to the EC placeholder tile if the image 404s
    return '' +
      '<a class="ec-card" href="/learn/recent-insight/article.html?id=' + encodeURIComponent(it.id) + '">' +
        '<div class="ec-card__media">' + media +
          (it.episode_number ? '<span class="ec-card__ep">Ep. ' + it.episode_number + '</span>' : '') +
          (it.podcast_video_url ? '<span class="ec-card__play" aria-hidden="true"><i class="ti ti-player-play-filled"></i></span>' : '') +
        '</div>' +
        '<div class="ec-card__body">' +
          (tags ? '<div class="ec-card__tags">' + tags + '</div>' : '') +
          '<h3 class="ec-card__title">' + escapeHtml(cleanTitle(it.title)) + '</h3>' +
          '<p class="ec-card__excerpt">' + escapeHtml(it.excerpt || '') + '</p>' +
          '<div class="ec-card__meta">' + formatDate(it.publish_date) +
            (it.estimated_read_time ? ' <span class="ec-dot">·</span> ' + it.estimated_read_time + ' min read' : '') +
          '</div>' +
        '</div>' +
      '</a>';
  }

  // Convert a Spotify episode URL to its embeddable form (others -> null).
  function spotifyEmbed(url) {
    var m = String(url || '').match(/open\.spotify\.com\/episode\/([A-Za-z0-9]+)/);
    return m ? 'https://open.spotify.com/embed/episode/' + m[1] : null;
  }

  // A card image that gracefully falls back to a gradient placeholder if the
  // file 404s (many local /assets paths aren't populated yet).
  function cardImg(url) {
    if (!url) return '<div class="ec-card__img ec-card__img--placeholder"></div>';
    return '<img class="ec-card__img" loading="lazy" src="' + escapeHtml(url) + '" alt="" ' +
      'onerror="this.style.display=\'none\';this.parentNode.classList.add(\'ec-card__media--ph\')">';
  }

  function tagPills(ids, topicsIdx, limit) {
    return (ids || []).slice(0, limit || 2).map(function (id) {
      var t = topicsIdx[id];
      return t ? '<span class="ec-tag">' + escapeHtml(t.label) + '</span>' : '';
    }).join('');
  }

  // Friendly date + time for webinars, e.g. "May 6, 2026 · 1:00 PM ET"
  function formatDateTime(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    if (isNaN(d)) return iso;
    var date = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    var time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return date + ' · ' + time;
  }

  // First-initials for an avatar placeholder when a person has no headshot.
  function initials(name) {
    return String(name || '').trim().split(/\s+/).slice(0, 2)
      .map(function (s) { return s.charAt(0).toUpperCase(); }).join('');
  }

  // Small coach/host avatar — real headshot, or initials placeholder.
  function personAvatar(p) {
    if (!p) return '';
    return p.headshot_url
      ? '<img class="ec-card__avatar" loading="lazy" src="' + escapeHtml(p.headshot_url) + '" alt="">'
      : '<span class="ec-card__avatar ec-card__avatar--ph">' + escapeHtml(initials(p.name)) + '</span>';
  }

  // ---- Webinar card ----
  // Short, image-led, coach-forward. Two states off `status`:
  //   upcoming/live → accent top line, "Upcoming"/"Live" badge, date + Save-your-seat
  //   on-demand     → "On demand" badge, hover play, coach + duration
  // No description paragraph (June 2026, per Bob) — the title carries the card.
  function webinarCard(w, topicsIdx, peopleIdx) {
    peopleIdx = peopleIdx || {};
    var live = w.status === 'live';
    var up = w.status === 'upcoming' || live;
    var speaker = (w.speaker_ids || []).map(function (id) { return peopleIdx[id]; }).filter(Boolean)[0];
    var badge = live ? '<span class="ec-card__ep ec-card__ep--live">● Live now</span>'
      : (up ? '<span class="ec-card__ep ec-card__ep--up">Upcoming</span>'
        : '<span class="ec-card__ep"><i class="ti ti-player-play-filled" style="font-size:11px"></i> On demand</span>');

    var when = up
      ? '<span class="ec-card__when">' + escapeHtml(formatDateTime(w.event_date) + (w.event_timezone ? ' ET' : '')) + '</span>'
      : '';
    var by = '';
    if (speaker) {
      by = '<span class="ec-card__by">' + personAvatar(speaker) +
        '<span>With ' + escapeHtml(speaker.name) +
        (!up && w.duration_minutes ? ' <span class="ec-dot">·</span> ' + w.duration_minutes + ' min' : '') +
        '</span></span>';
    } else if (!up && w.duration_minutes) {
      by = '<span class="ec-card__by"><span>' + w.duration_minutes + ' min</span></span>';
    }
    var cta = up
      ? '<span class="ec-card__cta">' + (live ? 'Watch live' : 'Save your seat') + ' <i class="ti ti-arrow-right" aria-hidden="true"></i></span>'
      : '';
    var play = up ? '' : '<span class="ec-card__play" aria-hidden="true"><i class="ti ti-player-play-filled"></i></span>';

    return '' +
      '<a class="ec-card' + (up ? ' ec-card--upcoming' : '') + '" href="/learn/webinar/webinar.html?id=' + encodeURIComponent(w.id) + '">' +
        '<div class="ec-card__media">' + cardImg(w.featured_image_url) + badge + play + '</div>' +
        '<div class="ec-card__body">' +
          '<div class="ec-card__tags">' + tagPills(w.topic_ids, topicsIdx, 1) + '</div>' +
          '<h3 class="ec-card__title">' + escapeHtml(w.title) + '</h3>' +
          '<div class="ec-card__foot">' + when + by + cta + '</div>' +
        '</div>' +
      '</a>';
  }

  // ---- Offer / download card ----
  function offerCard(o, topicsIdx) {
    var typeLabels = { guide: 'Guide', tool: 'Tool', 'book-preview': 'Book preview', 'claude-skill': 'Claude Skill', 'custom-gpt': 'Custom GPT', checklist: 'Checklist', template: 'Template', report: 'Report' };
    var label = typeLabels[o.type] || 'Resource';
    var img = o.featured_image_url || o.thumbnail_url;
    return '' +
      '<a class="ec-card ec-card--offer" href="/learn/tool/offer.html?id=' + encodeURIComponent(o.id) + '">' +
        '<div class="ec-card__media ec-card__media--contain">' + cardImg(img) +
          '<span class="ec-card__ep ec-card__ep--type">' + escapeHtml(label) + '</span></div>' +
        '<div class="ec-card__body">' +
          '<div class="ec-card__tags">' + tagPills(o.topic_ids, topicsIdx) + '</div>' +
          '<h3 class="ec-card__title">' + escapeHtml(o.title) + '</h3>' +
          '<p class="ec-card__excerpt">' + escapeHtml(o.tagline || '') + '</p>' +
          '<div class="ec-card__meta ec-card__meta--cta">Get it free <i class="ti ti-arrow-right"></i></div>' +
        '</div>' +
      '</a>';
  }

  // ---- People / profiles ----
  function profileUrl(id) { return '/team/profile.html?id=' + encodeURIComponent(id); }

  var ROLE_LABEL = { coach: 'Coach', provider: 'Service Provider', employee: 'Team', speaker: 'Speaker', author: 'Author', guest: 'Guest' };
  // Pick the most "important" role to show as the primary badge.
  function primaryRole(p) {
    var order = ['coach', 'provider', 'speaker', 'author', 'employee', 'guest'];
    var roles = p.role || [];
    for (var i = 0; i < order.length; i++) if (roles.indexOf(order[i]) > -1) return order[i];
    return roles[0] || '';
  }

  // Return records from `arr` where `id` appears in ANY of the given array fields.
  function where(arr, fields, id) {
    return (arr || []).filter(function (o) {
      return fields.some(function (f) { return (o[f] || []).indexOf(id) > -1; });
    });
  }

  function personImg(p, extraClass) {
    var c = 'pf-photo ' + (extraClass || '');
    if (p.headshot_url) return '<img class="' + c + '" src="' + escapeHtml(p.headshot_url) + '" alt="" loading="lazy" onerror="this.classList.add(\'pf-photo--ph\');this.removeAttribute(\'src\')">';
    return '<span class="' + c + ' pf-photo--ph" aria-hidden="true">' + escapeHtml((p.name || '?').charAt(0)) + '</span>';
  }

  function personCard(p) {
    // Show company only for non-IMPACT people (guests); staff cards are name + title.
    var company = p.company_name === 'IMPACT' ? '' : p.company_name;
    var sub = [p.title, company].filter(Boolean).join(' · ');
    return '' +
      '<a class="tm-card" href="' + profileUrl(p.id) + '">' +
        personImg(p, 'tm-card__photo') +
        '<div class="tm-card__name">' + escapeHtml(p.name) + '</div>' +
        '<div class="tm-card__title">' + escapeHtml(sub) + '</div>' +
      '</a>';
  }

  // ---- Knowledge Base (evergreen) card — text-forward, no media ----
  function evergreenCard(e, topicsIdx) {
    var t = topicsIdx[e.topic_id];
    return '' +
      '<a class="kb-card" href="/learn/playbook/article.html?id=' + encodeURIComponent(e.id) + '">' +
        (t ? '<span class="kb-card__topic">' + escapeHtml(t.label) + '</span>' : '') +
        '<h3 class="kb-card__title">' + escapeHtml(e.title) + '</h3>' +
        '<p class="kb-card__excerpt">' + escapeHtml(e.excerpt || '') + '</p>' +
        '<span class="kb-card__more">Read article <i class="ti ti-arrow-right"></i></span>' +
      '</a>';
  }

  /* ------------------------------------------------------------------
     Knowledge Base v2 — sections, sidebar, ordering, shared blocks.
     Architecture: articles live in /data/content/evergreen.json tagged
     with a KB section (topic_id) + optional parent_id tree. Sections and
     learning paths are presentation metadata in /data/taxonomy/.
     ------------------------------------------------------------------ */
  function kbArticleUrl(id) { return '/learn/playbook/article.html?id=' + encodeURIComponent(id); }
  function kbTopicUrl(id) { return '/learn/playbook/topic.html?id=' + encodeURIComponent(id); }
  function kbPathUrl(id) { return '/learn/playbook/path.html?id=' + encodeURIComponent(id); }

  // Everything a KB page needs, in one call.
  function kbLoad() {
    return load({
      evergreen: 'content/evergreen',
      sections: 'taxonomy/kb-sections',
      paths: 'taxonomy/kb-paths',
      topics: 'taxonomy/topics',
      people: 'content/people',
      insights: 'content/insights'
    });
  }

  function kbIsStub(e) { return !e.article_body || e.article_body.replace(/\s/g, '').length < 60; }

  // Reading-order position of a section (Foundation, then Age of AI, then components…)
  function kbSectionRank(s) { return s.id === 'age-of-ai' ? 1.5 : s.order; }
  function kbSections(sections) {
    return sections.slice().sort(function (a, b) { return kbSectionRank(a) - kbSectionRank(b); });
  }

  // Published, ordered top-level articles of one section.
  function kbSectionArticles(evergreen, sectionId) {
    return evergreen.filter(function (e) {
      return e.topic_id === sectionId && e.status === 'published' && !e.parent_id;
    }).sort(function (a, b) { return (a.nav_order || 99) - (b.nav_order || 99); });
  }

  function kbChildren(byId, e) {
    return (e.child_ids || []).map(function (i) { return byId[i]; })
      .filter(function (c) { return c && c.status === 'published'; });
  }

  // Full reading order: sections in rank order; per section, top-level
  // articles with their children right after each parent. Powers prev/next.
  function kbFlatten(d) {
    var byId = indexBy(d.evergreen), out = [];
    kbSections(d.sections).forEach(function (s) {
      kbSectionArticles(d.evergreen, s.id).forEach(function (e) {
        out.push(e);
        kbChildren(byId, e).forEach(function (c) { out.push(c); });
      });
    });
    return out;
  }

  /* ---- KB icons — carried over 1:1 from the emdash prototype sidebar. ----
     The five "Right X" sections use the EC circle mark with a different
     segment filled; What is EC uses the full outlined mark with both outer
     rings. Everything else is the prototype's Lucide set, inlined exactly
     (24x24, stroke 1.5, round caps/joins). */
  var _SEGA = 'M20.85,12.16c-.01.44-.05.87-.13,1.29-.17,1.02-.52,2.02-1.04,2.92v.04c-.78,1.34-1.91,2.47-3.26,3.24-1.06.63-2.24,1.01-3.45,1.14v-3.67c.57-.11,1.13-.31,1.64-.61.68-.39,1.23-.9,1.67-1.53h0s-.33-.64-.38-.73c.86-.08.18-.02.2-.02l.66-.06c.11-.24.19-.47.26-.72.15-.5.23-1.03.21-1.55,0-.5-.08-.97-.23-1.44-.01-.08-.05-.15-.07-.24l3.18-1.84c.3.66.5,1.36.62,2.08.09.56.14,1.13.13,1.7Z';
  var _SEGB = 'M7.49,19.54c-.37-.23-.73-.47-1.05-.76-.8-.65-1.49-1.46-2.01-2.36l-.03-.02c-.77-1.35-1.18-2.89-1.17-4.45-.02-1.23.25-2.45.74-3.56l3.18,1.83c-.19.55-.3,1.13-.29,1.72,0,.78.16,1.52.49,2.21h.01s.71.03.81.03c-.36.78-.08.17-.09.19l-.28.6c.15.21.32.4.5.59.35.38.78.71,1.24.96.43.25.88.41,1.36.52.08.03.16.04.24.06v3.67c-.72-.08-1.43-.25-2.1-.5-.53-.2-1.05-.44-1.53-.74Z';
  var _SEGC = 'M7.74,4.02c.39-.21.77-.39,1.19-.53.97-.37,1.97-.57,3.01-.57h.07c1.55,0,3.09.42,4.44,1.21,1.07.6,1.99,1.44,2.71,2.42l-3.18,1.83c-.38-.44-.83-.82-1.34-1.12-.68-.39-1.4-.62-2.16-.68h0s-.38.61-.43.7c-.5-.71-.11-.15-.12-.17l-.38-.54c-.26.03-.51.07-.76.14-.51.12-1.01.32-1.45.59-.43.25-.8.56-1.13.91-.07.05-.11.12-.17.18l-3.18-1.83c.43-.59.93-1.11,1.49-1.57.44-.36.91-.69,1.4-.96Z';
  var _RINGT = 'M12.02,1.19c5.44,0,9.96,4.05,10.68,9.29h1.09C23.06,4.64,18.06.11,12.02.11S.99,4.64.25,10.48h1.09C2.07,5.24,6.59,1.19,12.02,1.19Z';
  var _RINGB = 'M12.02,22.77c-5.44,0-9.96-4.05-10.68-9.29H.25c.74,5.84,5.74,10.37,11.77,10.37s11.04-4.53,11.77-10.37h-1.09c-.72,5.25-5.25,9.29-10.68,9.29Z';
  function _seg(d, fill, ml) { return '<path d="' + d + '" fill="' + fill + '" stroke="currentColor" stroke-miterlimit="' + ml + '" stroke-width=".75"></path>'; }
  function _mark(inner, root) {
    return '<svg class="kbs-ico" viewBox="0 0 24 24" ' + (root || 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"') + ' aria-hidden="true">' + inner + '</svg>';
  }
  var KB_ICONS = {
    'what-is-endless-customers': _mark(_seg(_SEGA, 'none', 10) + '<path d="' + _RINGT + '"></path><path d="' + _RINGB + '"></path>' + _seg(_SEGB, 'none', 10) + _seg(_SEGC, 'none', 2), 'fill="currentColor" stroke="none"'),
    'right-content': _mark(_seg(_SEGA, 'none', 10) + _seg(_SEGB, 'none', 10) + _seg(_SEGC, 'currentColor', 2)),
    'right-website': _mark(_seg(_SEGA, 'none', 10) + _seg(_SEGB, 'currentColor', 10) + _seg(_SEGC, 'none', 2)),
    'right-sales': _mark(_seg(_SEGA, 'currentColor', 10) + _seg(_SEGB, 'none', 10) + _seg(_SEGC, 'none', 2)),
    'right-technology': _mark(_seg(_SEGA, 'none', 10) + '<path d="' + _RINGT + '" fill="currentColor"></path>' + _seg(_SEGB, 'none', 10) + _seg(_SEGC, 'none', 2)),
    'right-culture': _mark(_seg(_SEGA, 'none', 10) + '<path d="' + _RINGB + '" fill="currentColor"></path>' + _seg(_SEGB, 'none', 10) + _seg(_SEGC, 'none', 2)),
    'age-of-ai': _mark('<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><path d="M4 18v4"></path><path d="M2 20h4"></path>'),
    'for-business-owners': _mark('<rect x="3" y="13" width="4" height="8"></rect><rect x="10" y="8" width="4" height="13"></rect><rect x="17" y="3" width="4" height="18"></rect><line x1="1" y1="21" x2="23" y2="21"></line>'),
    'for-sales-leaders': _mark('<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>'),
    'for-marketing-leaders': _mark('<path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M15.54 8.46a5 5 0 010 7.07"></path><path d="M19.07 4.93a10 10 0 010 14.14"></path>'),
    'the-foundation': _mark('<rect x="9" y="4" width="6" height="4" rx="1"></rect><rect x="5" y="10" width="14" height="4" rx="1"></rect><rect x="2" y="16" width="20" height="5" rx="1"></rect>'),
    'planning-your-investment': _mark('<polyline points="2,17 8,11 13,14 22,5"></polyline><polyline points="16,5 22,5 22,11"></polyline>'),
    'putting-it-together': _mark('<polygon points="12,2 2,7 12,12 22,7"></polygon><polyline points="2,12 12,17 22,12"></polyline><polyline points="2,17 12,22 22,17"></polyline>'),
    'support-and-community': _mark('<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path>'),
    // Industry hubs (deferred section — icons preserved for phase 2)
    'building-and-property-services': _mark('<path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"></path><path d="m18 15 4-4"></path><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"></path>'),
    'business-services': _mark('<rect x="2" y="8" width="20" height="13" rx="2"></rect><path d="M8 8V5.5a1.5 1.5 0 011.5-1.5h5a1.5 1.5 0 011.5 1.5V8"></path><line x1="2" y1="13" x2="22" y2="13"></line>'),
    'education-and-training': _mark('<polygon points="12,2 22,7.5 12,13 2,7.5"></polygon><path d="M6 10.5V16a6 6 0 0012 0v-5.5"></path><line x1="22" y1="7.5" x2="22" y2="16.5"></line>'),
    'manufacturing-and-industrial': _mark('<path d="M17.30 10.53L20.44 10.96L20.44 13.04L17.30 13.47L16.79 14.71L18.69 17.23L17.23 18.69L14.71 16.79L13.47 17.30L13.04 20.44L10.96 20.44L10.53 17.30L9.29 16.79L6.77 18.69L5.31 17.23L7.21 14.71L6.70 13.47L3.56 13.04L3.56 10.96L6.70 10.53L7.21 9.29L5.31 6.77L6.77 5.31L9.29 7.21L10.53 6.70L10.96 3.56L13.04 3.56L13.47 6.70L14.71 7.21L17.23 5.31L18.69 6.77L16.79 9.29Z"></path><circle cx="12" cy="12" r="3"></circle>'),
    'medical-healthcare-and-accessibility': _mark('<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>'),
    'moving-and-logistics': _mark('<rect x="1" y="6" width="15" height="11"></rect><path d="M16 9l5 3v5h-5V9z"></path><circle cx="5.5" cy="19" r="2"></circle><circle cx="18.5" cy="19" r="2"></circle>'),
    'real-estate': _mark('<polyline points="2,12 12,3 22,12"></polyline><path d="M5 10.5V21h5v-6h4v6h5v-10.5"></path>'),
    'retail': _mark('<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 01-8 0"></path>'),
    'technology-companies': _mark('<rect x="7" y="7" width="10" height="10" rx="1.5"></rect><line x1="7" y1="9.5" x2="3" y2="9.5"></line><line x1="7" y1="12" x2="3" y2="12"></line><line x1="7" y1="14.5" x2="3" y2="14.5"></line><line x1="17" y1="9.5" x2="21" y2="9.5"></line><line x1="17" y1="12" x2="21" y2="12"></line><line x1="17" y1="14.5" x2="21" y2="14.5"></line><line x1="9.5" y1="7" x2="9.5" y2="3"></line><line x1="12" y1="7" x2="12" y2="3"></line><line x1="14.5" y1="7" x2="14.5" y2="3"></line><line x1="9.5" y1="17" x2="9.5" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line><line x1="14.5" y1="17" x2="14.5" y2="21"></line>')
  };
  function kbIcon(id) { return KB_ICONS[id] || ''; }
  // The prototype's right-pointing chevron (rotates down when a group opens).
  var KB_CHEV = '<svg class="kbs-chev" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M3 2l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

  // ---- Sidebar (the spine of the KB) ----
  // Zones: Start Here / Curated Learning Paths / The Principles & Frameworks.
  // Whole thing is a <details> root so it collapses on mobile.
  function kbSidebar(d, activeId) {
    var byId = indexBy(d.evergreen);
    var active = activeId ? byId[activeId] : null;
    var activeSection = active ? active.topic_id : null;
    if (active && active.parent_id && byId[active.parent_id]) activeSection = byId[active.parent_id].topic_id;

    function navLink(e, cls, icon) {
      return '<a class="' + cls + (e.id === activeId ? ' is-active' : '') + '" href="' + kbArticleUrl(e.id) + '">' +
        (icon || '') + '<span>' + escapeHtml(e.nav_title || e.title) + '</span></a>';
    }

    function group(s, extraOpen) {
      var items = kbSectionArticles(d.evergreen, s.id);
      var open = s.id === activeSection || !!extraOpen;
      var inner = items.map(function (e) {
        var kids = kbChildren(byId, e);
        return navLink(e, 'kbs-link') +
          (kids.length ? '<div class="kbs-sub">' + kids.map(function (c) { return navLink(c, 'kbs-link kbs-link--sub'); }).join('') + '</div>' : '');
      }).join('');
      return '<details class="kbs-group"' + (open ? ' open' : '') + '>' +
        '<summary>' + kbIcon(s.id) + '<span>' + escapeHtml(s.label) + '</span>' + KB_CHEV + '</summary>' +
        '<div class="kbs-group__items">' +
          '<a class="kbs-link kbs-link--overview" href="' + kbTopicUrl(s.id) + '">Section overview <i class="ti ti-arrow-right"></i></a>' +
          inner +
        '</div></details>';
    }

    var ai = d.sections.filter(function (s) { return s.id === 'age-of-ai'; })[0];
    var frameworks = d.sections.filter(function (s) { return s.zone === 'frameworks'; })
      .sort(function (a, b) { return a.order - b.order; });
    var start = byId['what-is-endless-customers'];

    var html = '<details class="kbs-root" open>' +
      '<summary class="kbs-root__toggle"><i class="ti ti-books"></i> Browse the Playbook <i class="ti ti-chevron-down"></i></summary>' +
      '<nav class="kbs" aria-label="The Playbook">' +
        '<a class="kbs-home" href="/learn/playbook"><i class="ti ti-books"></i> The Playbook</a>' +
        '<div class="kbs-zone"><div class="kbs-zone__label">Start Here</div>' +
          (start ? navLink(start, 'kbs-link kbs-link--start', kbIcon('what-is-endless-customers')) : '') +
          (ai ? group(ai) : '') +
        '</div>' +
        '<div class="kbs-zone"><div class="kbs-zone__label">Curated Learning Paths</div>' +
          d.paths.map(function (p) {
            return '<a class="kbs-link kbs-link--path" href="' + kbPathUrl(p.id) + '">' + kbIcon(p.id) + '<span>' + escapeHtml(p.label) + '</span></a>';
          }).join('') +
        '</div>' +
        '<div class="kbs-zone"><div class="kbs-zone__label">The Principles &amp; Frameworks</div>' +
          frameworks.map(function (s) { return group(s); }).join('') +
        '</div>' +
      '</nav></details>';
    return html;
  }

  // Collapse the sidebar root on small screens (CSS hides the toggle on desktop).
  function kbSidebarInit(rootEl) {
    var root = (rootEl || document).querySelector('.kbs-root');
    if (root && window.innerWidth < 1000) root.removeAttribute('open');
  }

  // Two-column page shell: sidebar + main column.
  function kbShell(sidebarHtml, mainHtml) {
    return '<div class="kb-layout container"><aside class="kb-side">' + sidebarHtml + '</aside>' +
      '<div class="kb-main">' + mainHtml + '</div></div>';
  }

  // "What you'll learn" takeaways box.
  function kbTakeaways(e) {
    if (!e.what_youll_learn || !e.what_youll_learn.length) return '';
    return '<div class="kba-learn"><div class="kba-learn__title"><i class="ti ti-bulb"></i> What you\'ll learn</div><ul>' +
      e.what_youll_learn.map(function (t) { return '<li>' + mdInline(t) + '</li>'; }).join('') + '</ul></div>';
  }

  // Coming-soon notice for stub articles.
  function kbComingSoon() {
    return '<div class="kba-soon"><i class="ti ti-pencil"></i><div><strong>This guide is on the editorial calendar.</strong>' +
      '<p>The full article is being written. Check back soon, or explore the related guides in this section.</p></div></div>';
  }

  return {
    load: load,
    collection: collection,
    kbArticleUrl: kbArticleUrl,
    kbTopicUrl: kbTopicUrl,
    kbPathUrl: kbPathUrl,
    kbLoad: kbLoad,
    kbIsStub: kbIsStub,
    kbSections: kbSections,
    kbSectionArticles: kbSectionArticles,
    kbChildren: kbChildren,
    kbFlatten: kbFlatten,
    kbSidebar: kbSidebar,
    kbSidebarInit: kbSidebarInit,
    kbShell: kbShell,
    kbTakeaways: kbTakeaways,
    kbComingSoon: kbComingSoon,
    kbIcon: kbIcon,
    indexBy: indexBy,
    resolve: resolve,
    param: param,
    escapeHtml: escapeHtml,
    formatDate: formatDate,
    cleanTitle: cleanTitle,
    markdown: markdown,
    setSEO: setSEO,
    jsonLD: jsonLD,
    faqSchema: faqSchema,
    breadcrumbSchema: breadcrumbSchema,
    insightCard: insightCard,
    webinarCard: webinarCard,
    offerCard: offerCard,
    evergreenCard: evergreenCard,
    personCard: personCard,
    personImg: personImg,
    profileUrl: profileUrl,
    primaryRole: primaryRole,
    roleLabel: function (r) { return ROLE_LABEL[r] || r; },
    where: where,
    cardImg: cardImg,
    tagPills: tagPills,
    formatDateTime: formatDateTime,
    spotifyEmbed: spotifyEmbed
  };
})();
