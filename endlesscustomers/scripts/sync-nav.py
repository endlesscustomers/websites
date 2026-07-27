#!/usr/bin/env python3
"""
sync-nav.py — Single-source navigation propagation.

components/nav.html is the ONE master navigation. This script stamps it into
every page's inlined #nav-placeholder fallback so all pages stay identical.

Why the inlined copy exists at all:
  js/main.js fetches components/nav.html at runtime and injects it. That works
  on a web server, but browsers block fetch() on the file:// protocol, so when
  a page is opened directly as a file the inlined fallback is what renders.
  This script keeps that fallback in sync with the master automatically.

What it preserves per page:
  - The page's own <nav ...> opening tag, so page-specific classes survive
    (e.g. nav--docked, nav--lock-dark, data-theme="dark" on the conference/
    coaching section pages).
  - Relative asset paths: the master uses absolute /assets/... ; this rewrites
    them to the correct ../ depth for each page. Page links stay absolute.

Usage:
  1. Edit components/nav.html (the master).
  2. Run:  python3 scripts/sync-nav.py
  Pages with an empty #nav-placeholder (no inlined nav) are skipped and listed;
  they rely on the runtime loader.
"""
import re, glob, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

master = open('components/nav.html', encoding='utf-8').read()
m = re.search(r'<nav\b[^>]*id="site-nav"[^>]*>(.*)</nav>', master, re.S)
if not m:
    sys.exit('ERROR: could not find <nav id="site-nav"> in components/nav.html')
inner_master = m.group(1)

block = re.compile(r'(<nav\b[^>]*id="site-nav"[^>]*>)(.*?)(</nav>)', re.S)
pages = [p for p in glob.glob('**/*.html', recursive=True)
         if not p.startswith('components/')]

updated, skipped = [], []
for p in sorted(pages):
    src = open(p, encoding='utf-8').read()
    depth = p.count(os.sep) if os.sep in p else p.count('/')
    prefix = './' if depth == 0 else '../' * depth
    # Rewrite only root-relative /assets/ refs (preceded by a quote or paren) —
    # never absolute URLs like https://www.endlesscustomers.com/assets/...
    adj = re.sub(r'(?<=["\'(])/assets/', prefix + 'assets/', inner_master)
    new, n = block.subn(lambda mm: mm.group(1) + adj + mm.group(3), src, count=1)
    if n == 0:
        skipped.append(p)
    elif new != src:
        open(p, 'w', encoding='utf-8').write(new)
        updated.append(p)

print(f"Synced nav into {len(updated)} page(s).")
for p in updated:
    print(f"  updated  {p}")
if skipped:
    print(f"\nSkipped {len(skipped)} page(s) with no inlined nav (loader-only):")
    for p in skipped:
        print(f"  skipped  {p}")
