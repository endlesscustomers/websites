#!/usr/bin/env python3
"""
sync-footer.py — Single-source footer propagation.

components/footer.html is the ONE master footer. This script stamps it into
every page's inlined #footer-placeholder fallback so all pages stay identical.
Modeled on sync-nav.py — see that file for why the inlined copies exist.

What it preserves per page:
  - Relative asset paths: the master uses absolute /assets/... ; this rewrites
    them to the correct ../ depth for each page. Page links stay absolute.

Usage:
  1. Edit components/footer.html (the master).
  2. Run:  python3 scripts/sync-footer.py
  Pages with an empty #footer-placeholder are skipped and listed; they rely
  on the runtime loader.
"""
import re, glob, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

master = open('components/footer.html', encoding='utf-8').read()
m = re.search(r'(<footer\b[^>]*class="footer"[^>]*>)(.*)(</footer>)', master, re.S)
if not m:
    sys.exit('ERROR: could not find <footer class="footer"> in components/footer.html')
inner_master = m.group(2)

block = re.compile(r'(<footer\b[^>]*class="footer"[^>]*>)(.*?)(</footer>)', re.S)
pages = [p for p in glob.glob('**/*.html', recursive=True)
         if not p.startswith('components/')]

updated, skipped = [], []
for p in sorted(pages):
    src = open(p, encoding='utf-8').read()
    depth = p.count(os.sep) if os.sep in p else p.count('/')
    prefix = './' if depth == 0 else '../' * depth
    # Rewrite only root-relative /assets/ refs (preceded by a quote or paren) —
    # never absolute URLs like https://www.endlesscustomers.com/assets/... in JSON-LD.
    adj = re.sub(r'(?<=["\'(])/assets/', prefix + 'assets/', inner_master)
    new, n = block.subn(lambda mm: mm.group(1) + adj + mm.group(3), src, count=1)
    if n == 0:
        skipped.append(p)
    elif new != src:
        open(p, 'w', encoding='utf-8').write(new)
        updated.append(p)

print(f"Synced footer into {len(updated)} page(s).")
for p in updated:
    print(f"  updated  {p}")
if skipped:
    print(f"\nSkipped {len(skipped)} page(s) with no inlined footer (loader-only):")
    for p in skipped:
        print(f"  skipped  {p}")
