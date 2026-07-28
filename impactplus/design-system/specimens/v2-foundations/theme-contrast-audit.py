#!/usr/bin/env python3
"""Audit every approved V2 theme color role.

Keep this check synchronized with the scoped tokens in ``tokens/v2.css`` and
run it whenever a theme role changes.
"""

THEMES = {
    "blue": {
        "field": "#1C78FF", "ui": "#0F63E0", "text": "#0F63E0",
        "strong": "#0F63E0", "hover": "#0B54C4", "on_dark": "#8AB8FF",
    },
    "magenta": {
        "field": "#CD43DC", "ui": "#C026D3", "text": "#A21DB2",
        "strong": "#A21DB2", "hover": "#861494", "on_dark": "#F09AF6",
    },
    "green": {
        "field": "#22C55E", "ui": "#17914A", "text": "#15803D",
        "strong": "#15803D", "hover": "#116B34", "on_dark": "#66E596",
    },
    "orange": {
        "field": "#FC9639", "ui": "#C25E04", "text": "#A34D09",
        "strong": "#A34D09", "hover": "#843C05", "on_dark": "#FFC083",
    },
}

INK = "#0A0F1F"
WHITE = "#FFFFFF"


def luminance(hex_color):
    channels = [int(hex_color[index:index + 2], 16) / 255 for index in (1, 3, 5)]
    channels = [
        value / 12.92 if value <= 0.04045 else ((value + 0.055) / 1.055) ** 2.4
        for value in channels
    ]
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]


def contrast(first, second):
    light, dark = sorted((luminance(first), luminance(second)), reverse=True)
    return (light + 0.05) / (dark + 0.05)


def check(label, foreground, background, minimum):
    ratio = contrast(foreground, background)
    passed = ratio >= minimum
    print(f"{'OK' if passed else 'FAIL':4} {label:34} {ratio:5.2f}:1 (need {minimum:.1f})")
    return 0 if passed else 1


failures = 0
for name, roles in THEMES.items():
    print(f"\n=== {name} ===")
    failures += check("ink on full field", INK, roles["field"], 4.5)
    failures += check("UI rule on white", roles["ui"], WHITE, 3.0)
    failures += check("theme text on white", roles["text"], WHITE, 4.5)
    failures += check("white on strong control", WHITE, roles["strong"], 4.5)
    failures += check("white on darker hover", WHITE, roles["hover"], 4.5)
    failures += check("theme accent on dark band", roles["on_dark"], INK, 4.5)

print(f"\nTOTAL FAILURES: {failures}")
raise SystemExit(1 if failures else 0)
