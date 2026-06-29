#!/usr/bin/env python3
"""Build helper for the special_reports static preview.

Two jobs, both keeping the preview 100% static and double-click-proof (file://):

1. ``--data``   Regenerate the embedded JS data files from their JSON sources of
                truth, so pages never need ``fetch()``:
                  data/showcase.json          -> data/showcase.data.js   (window.SHOWCASE)
                  data/maryland.json          -> data/maryland.data.js   (window.MARYLAND)
                  data/baltimore_metro.geojson-> data/baltimore_metro.geo.js (window.BALTIMORE_GEO)

2. ``--vendor`` Download ECharts + Bootstrap + bootstrap-icons into assets/vendor/
                so nothing loads from a CDN (works offline / from file://).

Run ``python build.py`` for both. JSON is validated on load; if ``node`` is on
PATH every emitted/own JS file is checked with ``node --check`` (best effort).

This script is a DEV TOOL ONLY. It is never served and never referenced by any
page — the preview itself is pure static HTML/CSS/JS.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"
VENDOR = ROOT / "assets" / "vendor"

# Pinned CDN sources (kept identical to the versions the pages were authored against).
ECHARTS_VERSION = "5.5.0"
BOOTSTRAP_VERSION = "5.3.3"
BOOTSTRAP_ICONS_VERSION = "1.11.3"

VENDOR_FILES = {
    f"https://cdn.jsdelivr.net/npm/echarts@{ECHARTS_VERSION}/dist/echarts.min.js": VENDOR / "echarts.min.js",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{BOOTSTRAP_VERSION}/dist/css/bootstrap.min.css": VENDOR
    / "bootstrap.min.css",
    f"https://cdn.jsdelivr.net/npm/bootstrap@{BOOTSTRAP_VERSION}/dist/js/bootstrap.bundle.min.js": VENDOR
    / "bootstrap.bundle.min.js",
    f"https://cdn.jsdelivr.net/npm/bootstrap-icons@{BOOTSTRAP_ICONS_VERSION}/font/fonts/bootstrap-icons.woff2": VENDOR
    / "bootstrap-icons"
    / "fonts"
    / "bootstrap-icons.woff2",
    f"https://cdn.jsdelivr.net/npm/bootstrap-icons@{BOOTSTRAP_ICONS_VERSION}/font/fonts/bootstrap-icons.woff": VENDOR
    / "bootstrap-icons"
    / "fonts"
    / "bootstrap-icons.woff",
}

BOOTSTRAP_ICONS_CSS_URL = (
    f"https://cdn.jsdelivr.net/npm/bootstrap-icons@{BOOTSTRAP_ICONS_VERSION}/font/bootstrap-icons.min.css"
)
BOOTSTRAP_ICONS_CSS_DEST = VENDOR / "bootstrap-icons" / "bootstrap-icons.min.css"


def _fetch_bytes(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "hikari-special-reports-build"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read()


def build_data() -> list[Path]:
    """Emit window.SHOWCASE / window.BALTIMORE_GEO JS from the JSON sources."""
    written: list[Path] = []

    showcase_json = DATA / "showcase.json"
    showcase = json.loads(showcase_json.read_text(encoding="utf-8"))  # validates JSON
    showcase_js = DATA / "showcase.data.js"
    showcase_js.write_text(
        "/* AUTO-GENERATED from data/showcase.json by build.py — DO NOT EDIT BY HAND.\n"
        " * Embeds the showcase snapshot as a global so pages never fetch() (file:// safe). */\n"
        "window.SHOWCASE = " + json.dumps(showcase, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    written.append(showcase_js)

    maryland_json = DATA / "maryland.json"
    maryland = json.loads(maryland_json.read_text(encoding="utf-8"))  # validates JSON
    maryland_js = DATA / "maryland.data.js"
    maryland_js.write_text(
        "/* AUTO-GENERATED from data/maryland.json by build.py \u2014 DO NOT EDIT BY HAND.\n"
        " * Embeds the REAL Maryland AHEAD datasets (findings/15) as a global so the AHEAD page\n"
        ' * never fetch()es (file:// safe). Rendered as the SEPARATE "Maryland AHEAD" layer. */\n'
        "window.MARYLAND = " + json.dumps(maryland, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    written.append(maryland_js)

    geo_json = DATA / "baltimore_metro.geojson"
    geo = json.loads(geo_json.read_text(encoding="utf-8"))  # validates JSON
    geo_js = DATA / "baltimore_metro.geo.js"
    geo_js.write_text(
        "/* AUTO-GENERATED from data/baltimore_metro.geojson by build.py — DO NOT EDIT BY HAND.\n"
        " * Embeds the 7-county GeoJSON as a global so map pages never fetch() (file:// safe). */\n"
        "window.BALTIMORE_GEO = " + json.dumps(geo, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )
    written.append(geo_js)

    for path in written:
        print(f"  data  {path.relative_to(ROOT)}  ({path.stat().st_size:,} bytes)")
    return written


def build_vendor() -> list[Path]:
    """Download ECharts + Bootstrap + bootstrap-icons (CSS, JS, fonts) locally."""
    written: list[Path] = []

    for url, dest in VENDOR_FILES.items():
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(_fetch_bytes(url))
        written.append(dest)
        print(f"  vendor {dest.relative_to(ROOT)}  ({dest.stat().st_size:,} bytes)")

    # bootstrap-icons CSS references its fonts with cache-busting ?hash query
    # strings. Browsers treat those as part of the path on file://, so the fonts
    # 404. Strip the query strings so the local fonts resolve by double-click.
    css = _fetch_bytes(BOOTSTRAP_ICONS_CSS_URL).decode("utf-8")
    css = re.sub(r"(\.woff2?)\?[0-9a-f]+", r"\1", css)
    BOOTSTRAP_ICONS_CSS_DEST.parent.mkdir(parents=True, exist_ok=True)
    BOOTSTRAP_ICONS_CSS_DEST.write_text(css, encoding="utf-8")
    written.append(BOOTSTRAP_ICONS_CSS_DEST)
    print(
        f"  vendor {BOOTSTRAP_ICONS_CSS_DEST.relative_to(ROOT)}  "
        f"({BOOTSTRAP_ICONS_CSS_DEST.stat().st_size:,} bytes, font ?hash stripped)"
    )
    return written


def node_check() -> int:
    """Best-effort: run `node --check` on every project JS file."""
    node = shutil.which("node")
    if not node:
        print("  (node not on PATH — skipping `node --check`; JSON already validated)")
        return 0
    js_files = sorted(
        p
        for p in [*(ROOT / "assets").glob("*.js"), *DATA.glob("*.js")]
        if p.name != "showcase.js"  # deprecated v1 controller, intentionally unused
    )
    failures = 0
    for js in js_files:
        result = subprocess.run([node, "--check", str(js)], capture_output=True, text=True)
        status = "ok" if result.returncode == 0 else "FAIL"
        if result.returncode != 0:
            failures += 1
            print(f"  node --check {status}  {js.relative_to(ROOT)}\n{result.stderr}")
        else:
            print(f"  node --check {status}  {js.relative_to(ROOT)}")
    return failures


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data", action="store_true", help="regenerate embedded data JS")
    parser.add_argument("--vendor", action="store_true", help="download vendor assets")
    parser.add_argument("--check", action="store_true", help="node --check all JS (best effort)")
    args = parser.parse_args()

    do_all = not (args.data or args.vendor or args.check)

    if do_all or args.data:
        print("Regenerating embedded data JS from JSON sources:")
        build_data()
    if do_all or args.vendor:
        print("Vendoring ECharts + Bootstrap + bootstrap-icons into assets/vendor/:")
        build_vendor()
    if do_all or args.check:
        print("Validating JS:")
        if node_check():
            return 1
    print("Done.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
