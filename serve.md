# Preview the `/explore/techstars` lab locally

100% static and **double-click-proof**. No Django app, DB, FalkorDB, DuckDB — and **no CDN
and no `fetch()`**. Everything (ECharts, Bootstrap, bootstrap-icons, the showcase data, and
the GeoJSON) is local, so the preview renders identically two ways:

## Option A — just double-click (file://)

Open `index.html` (or any `pages/*.html`) directly in a browser — e.g.
`file:///…/special_reports/index.html`. Charts render, the choropleth maps draw, drawers
open, and the Graph & MECS side tab works. No server required.

## Option B — static file server (http://)

```sh
cd .plans/ideation/2026-06-29-baltimore-healthcare-exploration/research/experiments/special_reports
python -m http.server 8765
```

Then open the **landing card grid**: <http://localhost:8765/>. Each card opens one
exploration page (all also reachable from the top nav):

- Maryland AHEAD — <http://localhost:8765/pages/ahead.html>
- Metro Hero — <http://localhost:8765/pages/hero.html>
- Opportunity / TAM — <http://localhost:8765/pages/opportunity.html>
- Care-Mgmt Footprint — <http://localhost:8765/pages/footprint.html>
- Targets — <http://localhost:8765/pages/targets.html>
- Facilities — <http://localhost:8765/pages/facilities.html>
- Growth Contacts — <http://localhost:8765/pages/growth.html>
- Graph Algorithms — <http://localhost:8765/pages/graph.html>
- Techstars Ecosystem — <http://localhost:8765/pages/techstars.html>
- Sports & Care — <http://localhost:8765/pages/sports.html>

## Why no-fetch / no-CDN (the double-click fix)

Opening a page from `file://` makes the origin `null`, so the browser blocks `fetch()` of
`data/showcase.json` / `data/baltimore_metro.geojson` (CORS), and CDN scripts can also be
blocked offline. The charts then render nothing. The fix has two halves:

1. **Data is embedded as JS, not fetched.** The JSON sources of truth stay in `data/`, but
   the pages load **generated** JS that assigns the data to globals:
   - `data/showcase.json` → `data/showcase.data.js` → `window.SHOWCASE`
   - `data/maryland.json` → `data/maryland.data.js` → `window.MARYLAND` (the Maryland AHEAD layer; loaded on **every** page — the AHEAD page renders the full layer, every other page layers a provenance-tagged Maryland AHEAD context strip/badge via `common.js` `renderMdLayer`)
   - `data/baltimore_metro.geojson` → `data/baltimore_metro.geo.js` → `window.BALTIMORE_GEO`

   Each page includes the `*.data.js` / `*.geo.js` via `<script src>` **before**
   `common.js`, which reads `window.SHOWCASE` / `window.BALTIMORE_GEO` directly. There is no
   `fetch()` anywhere in the preview's own code.

2. **Vendored libraries (no CDN).** ECharts, Bootstrap (CSS + JS) and bootstrap-icons (CSS +
   fonts) live under `assets/vendor/` and are referenced locally. ECharts is loaded before
   any `echarts.init` call, so `echarts` is always defined first. The bootstrap-icons font
   `?hash` query strings are stripped from the vendored CSS so the fonts resolve on `file://`.

## Regenerating the generated files (`build.py`)

`build.py` is a **dev-only** helper (never served, never referenced by a page). It validates
the JSON on load and, when `node` is on PATH, runs `node --check` on every JS file.

```sh
cd .plans/ideation/.../special_reports
python build.py            # regenerate data *.js AND (re)download assets/vendor/
python build.py --data     # only rebuild data/showcase.data.js + data/baltimore_metro.geo.js
python build.py --vendor   # only (re)download ECharts + Bootstrap + bootstrap-icons
python build.py --check    # only node --check all JS (best effort)
```

Workflow: **edit the `.json` source of truth → `python build.py --data`** to refresh the
embedded `*.js`. Never hand-edit `data/*.data.js` / `data/*.geo.js` (they carry an
AUTO-GENERATED header).

> Note: the vendored production `assets/hikari.js` contains a `fetch()` in its `[data-echarts]`
> auto-init path; the preview never uses that attribute (it calls `echarts.init` via
> `common.js`), so that code is inert here. It is left byte-faithful to the `src/` original.

## What you should see

- **Landing (`index.html`, PAGE id HOME):** a Bootstrap card grid of 7 exploration cards
  (`data-eid="HOME-card-<slug>"`), each with a title, one-line summary, and a headline stat. Click → page.
- **Top nav** on every page links to all explorations; the brand returns to the landing.
- **Graph & MECS side tab (every page):** a fixed graph-symbol tab (`bi-diagram-3`) docked on
  the right edge → opens an offcanvas with four cards — `GRAPHINFO-subgraph` (why/how the
  Baltimore sub-graph was built + its census), `GRAPHINFO-queries` (stored `.sql`/`.cypher` +
  experiment counts), `GRAPHINFO-graph-design` (node labels + edge types of `hikari_national`),
  and `GRAPHINFO-mecs` (the dim_ / fact_ star schema). Data-driven from `window.SHOWCASE.graphinfo`.
- **AHEAD:** ★ the Maryland AHEAD beat — five AHEAD context cards (incentive flip, MA reframe, timeline,
  measures map, savings) **plus a "Maryland AHEAD — grabbed datasets" section** with the REAL Maryland
  values (findings 15, `data/maryland.json`): a distinct **crimson dashed savings LINE** (DS-1, $/bene/yr
  2014→2021, with a TCOC-era markArea + −$450 annotation) and Maryland stat cards (≈$689M net savings;
  1.47%/2.31% vs the 3.58% cap; 80% global budgets / ≥$330M / 30% HAC; the AHEAD quality measures).
  All rendered as a **separate "Maryland AHEAD" layer** (crimson + badge, never merged with "Hikari (CMS)";
  spec §4j). The conceptual MA-over-time chart (our solid CMS line + a dashed Maryland series legend-only
  until MCDB is acquired) follows. Click any card → its source dataset + URL.
- **HERO:** boxed metro choropleth profile + verdict + $496M headline + 9 KPI tiles + **real national
  outlier cards** (e11) + **story-of-time sparklines** (e12) + 7-county table + the **Techstars hero card** → roster drawer.
- **OPP:** $496.3M headline + 3 lever cards + recoverable-$ bar + add-on cards + cross-check note.
- **FOOT:** reusable choropleth with a layer toggle + captured-vs-gap stacked bar + 3 capture tiles.
- **TGT:** group-opportunity bar + group practices table + providers table, each **top / median / bottom**,
  plus the **missing-quality panel** (90.2% region, Baltimore-city 23,502, per-county) with the choropleth re-colored on the missing-MIPS % layer.
- **FAC:** facility **readmissions** (discharge-weighted ERR) + **ED throughput** (OP_18b) tables, each **top / median / bottom**.
- **GROW:** the strongest warm path (Leigh Curl → MedStar Group II, $169.8M) + per-mentor reach table + top mentor-reachable group contacts (bar + table).
- **GRAPH:** edge census + degree centrality + communities + drug hubs + anchor 2-hop reach + flat algos.
- **TECH:** of-our-data stat pills + the full roster as a photo card grid; every card → roster drawer.
- **SPORTS:** the story + Ravens & Orioles team cards (logos) → MedStar; the **Orioles team-doctor card** → **Leigh Ann Curl, MD** drawer (best stats only). Ravens physician = discovery pending.
- **Maryland AHEAD layer on every page:** besides the AHEAD page, each exploration carries a crimson, provenance-tagged **Maryland AHEAD** context element (spec §4j) — `HERO-md-strip` (+ a badge on the MA KPI tile), `OPP-md-strip` (+ a crimson-dashed DS-1 sparkline), `FOOT-md-strip`, `TGT-md-strip` (+ the `TGT-md-scorecard` measure card), `FAC-md-strip` (+ "AHEAD-relevant" badges on the readmission/ED panels), `GROW-md-strip`, and subtle one-liners `GRAPH-md-badge` / `TECH-md-badge` / `SPORTS-md-badge`. Each opens the provenance drawer with its dataset + source URL.
- **Drawer:** click ANY card with a `data-figure-id` → Bootstrap offcanvas with that figure's formula + inputs + source query (from `window.SHOWCASE.provenance`).
