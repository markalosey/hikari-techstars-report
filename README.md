# Hikari × EliteCare — Baltimore Healthcare Intelligence (preview)

A self-contained, **100% static** preview of the Baltimore-metro pitch surface for **Hikari**
(Kepric's graph-powered healthcare network intelligence) applied to the **EliteCare / Techstars AI
Health Baltimore** opportunity. It is a multi-page exploration lab: a landing card grid where each
card opens one self-contained exploration page (metro profile, opportunity/TAM, targets, facilities,
growth contacts, graph algorithms, the Techstars roster, sports-and-care, and the **Maryland AHEAD**
payment-model layer).

Everything is **vendored** and **double-click-proof**: no CDN, no `fetch()`, no server, no app/DB.
The directory **is** the repo root — clone it and open `index.html`.

## Quick start — how to view

- **Just double-click** `index.html` (opens via `file://`). Charts render, maps draw, drawers open,
  the Graph & MECS side tab works. No server, no install.
- **Or serve it statically** (nicer URLs):
  ```sh
  python -m http.server 8765
  # then open http://localhost:8765/
  ```

See `serve.md` for details and the per-page URLs.

## Two data layers

Every figure is tagged to exactly one of two layers, and they are **never merged**:

| Layer | Badge | Source | Where |
|-------|-------|--------|-------|
| **Hikari (CMS)** | blue `hk-badge` | Public CMS data via the Hikari analytics pipeline (every figure traces to a stored query / finding) | `data/showcase.json` |
| **Maryland AHEAD** | crimson `md-badge` | REAL Maryland-program public report/evaluation values (DS-1…DS-5) — HSCRC TCOC eval, JAMA Health Forum, HSCRC biannual report, HCTTF, AHEAD all-call | `data/maryland.json` |

The **Maryland AHEAD** layer (crimson, dashed line style, "Maryland AHEAD" legend, spec §4j) is the
"we researched AHEAD / we listened to Nick" beat. The **AHEAD page** (`pages/ahead.html`) renders it
as a distinct **crimson dashed savings line** (DS-1: Medicare FFS savings $/bene/yr 2014→2021, with a
TCOC-era annotation where savings deepen to −$450 in 2019) plus Maryland stat cards (≈$689M net
savings; 1.47%/2.31% growth vs the 3.58% cap; 80% global budgets / ≥$330M / 30% HAC; the AHEAD
quality-measure set). Click any Maryland figure → provenance drawer with the dataset name + source URL.
Numbers match `../../findings/15-maryland-datasets.md` exactly.

## Regenerate the data (`build.py`)

`build.py` is a **dev-only** helper (never served, never referenced by a page). Edit a `data/*.json`
source of truth, then regenerate the embedded `data/*.data.js` / `data/*.geo.js`:

```sh
python build.py --data     # rebuild showcase.data.js + maryland.data.js + baltimore_metro.geo.js
python build.py --vendor   # (re)download ECharts + Bootstrap + bootstrap-icons into assets/vendor/
python build.py --check    # node --check every JS file (best effort)
python build.py            # all of the above
```

Never hand-edit the `data/*.data.js` / `data/*.geo.js` files (they carry an AUTO-GENERATED header).

---

## The lab in detail

A self-contained, **100% static** prototype of the Baltimore-metro pitch surface. Rebuilt from the v1
single page into a **lab-style, multi-page exploration** (like `/_lab/`): a landing **card grid** where
each card opens one self-contained exploration page. Built here so we can iterate on the UI **without**
wiring the production query layer or touching the RFC-gated `src/` app. Vendors the real production
styling (`hikari.css` + `hikari.js` + the `hikari` ECharts theme) so the preview matches the app, and
reads **only** static JSON assembled from the harness facts. When the design is locked, the chosen
clusters port to `/explore/techstars` (some as accordion sections, some as card-group explorations).

**100% static and double-click-proof (file://).** No CDN and no `fetch()`: ECharts, Bootstrap and
bootstrap-icons are vendored under `assets/vendor/`, and the data is embedded as JS globals
(`window.SHOWCASE` from `data/showcase.data.js`, `window.BALTIMORE_GEO` from
`data/baltimore_metro.geo.js`) — generated from the `data/*.json` sources of truth by `build.py`.
See `serve.md` for the rationale and the regenerate command. Every page also carries a persistent
**Graph & MECS** proof/education side tab (spec §4h, `assets/graphinfo.js`).

Models the facility entity-detail page (`http://localhost:8001/facility/360180/`) and
`../../../stream-ui-concepts.md`: hero (metro choropleth "profile" box + verdict + KPI tiles) → click-any-card
→ secret-sauce drawer; lab card-grid landing (§4d); ID convention (§4f); Techstars hero card → roster drawer
(§4b); sports team-care story (§4b-sports); graph-only insight surfaces (§4c); import real Hikari assets (§4g).

## ID convention (spec §4f) — every element is addressable

Every page has a unique **PAGE id** (`<body id="page-HERO">`, etc.) and every meaningful element carries
`data-eid="<PAGE>-<element>"` (e.g. `HERO-profile-map`, `HERO-kpi-dual`, `OPP-tam-total`,
`GRAPH-pagerank-table`, `TECH-card-<slug>`, `SPORTS-orioles-card`). Static elements carry it in the HTML;
JS-rendered elements (KPI tiles, table cells, roster rows, person cards) get it at render time. This lets us
reference any element precisely in discussion.

## Pages

| File | PAGE id | What it shows |
|------|---------|---------------|
| `index.html` | `HOME` | Lab card-grid **landing**. One card per exploration (`data-eid="HOME-card-<slug>"`): **Maryland AHEAD** (headline), Metro Hero, Opportunity/TAM, Care-Mgmt Footprint, Targets, **Facilities**, **Growth Contacts**, Graph Algorithms, Techstars Ecosystem, Sports & Care — each = title + one-line summary + a headline stat. |
| `pages/ahead.html` | `AHEAD` | **★ The "we researched Maryland AHEAD" beat.** Five AHEAD context cards (`AHEAD-incentive-flip`, `AHEAD-ma-explainer`, `AHEAD-timeline`, `AHEAD-measures-map`, `AHEAD-savings`) **plus a "Maryland AHEAD — grabbed datasets" section** with the REAL Maryland values from findings 15: a distinct **crimson dashed savings LINE** (`AHEAD-md-savings-trend`, DS-1 Medicare FFS savings $/bene/yr 2014→2021, TCOC-era markArea + −$450 annotation) and Maryland stat cards `AHEAD-md-netsavings` (≈$689M), `AHEAD-md-growth` (1.47%/2.31% vs 3.58% cap), `AHEAD-md-globalbudget` (80% / ≥$330M / 30% HAC), `AHEAD-md-measures` (EDU/AHU/CDC/CBP ↔ e7/e6). Every figure is a **separate "Maryland AHEAD" layer** (crimson + badge, spec §4j) — never merged with our "Hikari (CMS)" series; click any → source dataset + URL. From findings 01j/01k + 15. |
| `pages/hero.html` | `HERO` | Metro-as-entity: boxed choropleth profile + verdict + $496M headline + 9 KPI tiles (vs-nation ▲▼≈) + **real national outlier cards** (e11: #3 readmissions, IM/Critical-Care over-index, Family-Practice scarcity) + **story-of-time sparklines** (e12: pop +30%, MA +162%, ED −22%, opioid −37%) + 7-county table. Hosts the **Techstars hero card** (`HERO-techstars-card`) → roster drawer. |
| `pages/opportunity.html` | `OPP` | Population-anchored TAM ($496.3M) + CCM/APCM·RPM·TCM lever decomposition (cards + bar) + count-only add-ons + the double-count cross-check. |
| `pages/footprint.html` | `FOOT` | Care-management footprint: reusable metro choropleth with a **layer toggle** (MA %, dual %, providers, std spend) + captured-vs-gap per lever + capture-rate tiles. The "near-zero capture today" story. |
| `pages/targets.html` | `TGT` | Target group practices + providers ranked by recoverable $ — **top / median / bottom** (C-6) — group-opportunity bar + the pre-fit caveat + the **missing-quality (no-MIPS) panel** (`TGT-missingq-*`): 90.2% region, Baltimore-city 23,502, per-county table, and the metro choropleth **re-colored** on the missing-MIPS % layer (red ramp). |
| `pages/facilities.html` | `FAC` | CMS facility quality for the metro (e7 / findings 09): **readmissions** (discharge-weighted ERR) + **ED throughput** (OP_18b median minutes) as **top / median / bottom** tables, with the resolution counts (538 region facilities, 19/17 rankable). The worst-readmission hospitals are the global-budget targets. |
| `pages/growth.html` | `GROW` | The mentor-network contact list Emily asked for (e8 / findings 10): per-mentor reach table, top mentor-reachable **group contacts** ranked by recoverable $ (bar + table), and the **strongest warm path** (`GROW-warmpath`): Leigh Curl → MedStar Medical Group II = $169.8M. |
| `pages/graph.html` | `GRAPH` | FalkorDB algorithms over the Baltimore subgraph (findings 11): edge census, degree/membership centrality (top/median/bottom), communities (CDLP) + WCC note, drug hubs, Techstars anchor 2-hop reach, and the structurally-flat algorithms recorded as facts. |
| `pages/techstars.html` | `TECH` | Full accelerator roster as a **photo card grid** + of-our-data stat pills; every card → roster drawer. Interviewers pinned first; the two advisors in our data flagged green. |
| `pages/sports.html` | `SPORTS` | "Baltimore loves its teams → its teams get the highest care." Ravens + Orioles team cards (logos) → MedStar (a Techstars anchor). Orioles team-doctor card → **Leigh Ann Curl, MD** drawer showing **only the best stats**. Ravens physician = discovery pending. |

### Maryland AHEAD = a SEPARATE data layer (spec §4j)

Any Maryland/AHEAD-sourced figure renders as its **own series/badge** — a distinct crimson color (`--hikari-maryland`), dashed line style on charts, and a **"Maryland AHEAD"** legend label — and is **never merged** with our **"Hikari (CMS)"** series. The reusable pieces live in `common.js` (`SR.MD` / `SR.HK` constants, `SR.mdBadge()`, `SR.hkBadge()`, `SR.dualLegend()`, **`SR.mdContextStrip({eid, html, figureId, inline})`**) and `hikari-tokens.css` (`.md-badge` / `.hk-badge` / `.md-card` / `.md-dual-legend` / **`.md-context-strip`**). We don't have Maryland **MCDB** (all-payer claims) yet, so today's Maryland series are the AHEAD **context** facts (clearly tagged); the structure lets real Maryland data lines drop in later (the AHEAD MA chart already declares the dashed Maryland series, legend-only).

#### The Maryland AHEAD layer is now woven across **every** page (not just AHEAD)

`common.js` carries a `MD_LAYER` registry + `renderMdLayer(active)` that — after each page's `SR_PAGE` renders — injects a consistent, provenance-tagged **`SR.mdContextStrip()`** (crimson accent + `mdBadge()` + a "ⓘ" that opens the provenance drawer) into a `<PAGE>-md-host` anchor, plus page-specific badges/annotations. Every Maryland element shares the same crimson treatment so it's unmistakably the separate layer, and each carries a `data-figure-id` whose `provenance` entry (in `data/showcase.json`, `source:"Maryland AHEAD"`) shows the dataset + source URL. Numbers come from `window.MARYLAND` (`data/maryland.data.js`, the REAL DS-1…DS-5 values) and never drift. Every page now loads `data/maryland.data.js`.

| Page | `data-eid`(s) | Maryland AHEAD element |
|------|---------------|------------------------|
| `HERO` | `HERO-md-ma-badge`, `HERO-md-strip` | Crimson badge on the MA KPI tile ("FFS by design") + a strip under the verdict: MA 25.1% vs 51% national is FFS-by-design (HSCRC sets FFS rates; AHEAD keeps the waiver; PY1 Jan 2026). |
| `OPP` | `OPP-md-strip`, `OPP-md-sparkline` | Strip: captured care-management = retained margin (≈$689M saved DS-2; −$450/bene TCOC peak DS-1) + a compact crimson-dashed **DS-1 sparkline** (its own `data-figure-id="AHEAD-md-savings-trend"`). |
| `FOOT` | `FOOT-md-strip` | Strip: PC AHEAD's Enhanced Primary Care Payment (PBPM, quality + HCC risk) aligns with the APCM/CCM build. |
| `TGT` | `TGT-md-strip`, `TGT-md-scorecard` | Strip tying our 90.2% missing-quality to AHEAD's quality-based EPCP + measure set, and a **"Maryland AHEAD scorecard"** card (DS-5: EDU/AHU↔e7, CDC/CBP/CDF↔e6; `data-figure-id="AHEAD-md-measures"`). |
| `FAC` | `FAC-md-strip`, `FAC-md-readmit`, `FAC-md-ed` | Strip + "AHEAD-relevant" badges on the readmission (AHU) & ED (EDU) panels + per-table annotations — under global budgets each readmission/ED visit is margin leak. |
| `GROW` | `GROW-md-strip` | Strip: anchor systems (Hopkins/MedStar/UMMS) run under global budgets; CareFirst is a commercial payer inside the all-payer model. |
| `GRAPH` | `GRAPH-md-badge` | Subtle one-line badge: the subgraph spans systems under Maryland global budgets. |
| `TECH` | `TECH-md-badge` | Subtle one-line badge: Techstars AI Health Baltimore sits inside the AHEAD all-payer market. |
| `SPORTS` | `SPORTS-md-badge` | Subtle one-line badge: MedStar (the teams' medical provider) operates under Maryland global budgets. |

## Assets (`assets/`)

| File | Purpose |
|------|---------|
| `hikari.css` | **VENDORED** copy of `src/hikari/ui/static/hikari/hikari.css` (do not edit original). Production tokens + component styling, imported first on every page. |
| `hikari.js` | **VENDORED** copy of `src/hikari/ui/static/hikari/hikari.js`. Production ECharts lifecycle glue, named tooltip formatters, event buffer, entity-URL resolver. HTMX listeners are inert in the static preview (harmless). |
| `echarts-hikari-theme.js` | **VENDORED** copy of `src/.../echarts-hikari-theme.js`. Registers the `hikari` ECharts theme (CSS-var-driven palette) used by every chart. |
| `hikari-tokens.css` | Preview-only helpers: metro profile card, figure cards, `hikari-table` look, secret-sauce drawer, **plus** the new lab card-grid, page chrome, roster + sports drawers, and graph-table styles. (Still imported; the duplicate `:root` block mirrors hikari.css for standalone rendering.) |
| `common.js` | Shared controller: data load (`SR_BASE`-relative), top-nav, reusable metro choropleth, top/median/bottom table helper, the **click-any-card → secret-sauce provenance drawer** (`data-figure-id` → `data/showcase.json` `provenance`), and the **cross-page Maryland AHEAD layer** (`SR.mdContextStrip()` + the `MD_LAYER` registry / `renderMdLayer(active)` that injects a crimson context strip/badge into each page's `<PAGE>-md-host`). Exposes `window.SR`. |
| `page-hero.js`, `page-opportunity.js`, `page-footprint.js`, `page-targets.js`, `page-graph.js`, `page-techstars.js`, `page-sports.js` | Per-page render controllers; each defines `window.SR_PAGE(showcase, geojson)`. **No lazy loading — everything renders eagerly.** |
| `roster.js` | Techstars roster offcanvas drawer (shared by HERO + TECH). Any `data-drawer="roster"` trigger opens it; photos from `techstars/<name>.jpg`, facts from findings 01b–01f. |
| `graphinfo.js` | **Persistent "Graph & MECS" side tab** (spec §4h) injected on EVERY page: a fixed `bi-diagram-3` tab → Bootstrap offcanvas of 4 cards (`GRAPHINFO-subgraph`, `GRAPHINFO-queries`, `GRAPHINFO-graph-design`, `GRAPHINFO-mecs`). Data-driven from `window.SHOWCASE.graphinfo`; every rendered element carries a `data-eid="GRAPHINFO-…"`. |
| `vendor/` | **Vendored libraries (no CDN)** so the preview works offline / from `file://`: `echarts.min.js`, `bootstrap.min.css`, `bootstrap.bundle.min.js`, and `bootstrap-icons/` (`bootstrap-icons.min.css` + `fonts/*.woff,woff2`, font `?hash` query strings stripped). Downloaded by `build.py`. |
| `showcase.js` | **DEPRECATED** v1 single-page controller — no longer imported; kept for git history only. |
| `techstars/*.jpg` | 15 roster headshots (+1 alt). See `assets/README.md`. |
| `sports/*.png` | Ravens + Orioles logos. See `assets/sports/README.md`. |

## Data (`data/`)

| File | Purpose |
|------|---------|
| `showcase.json` | **Source of truth.** Static snapshot assembled from `../../raw/{e0,e2,e4,e6,e7,e8,e11,e12}.json` + findings. Hero metrics/deltas, 7-county rows, TAM + lever decomposition, target groups/providers, choropleth layers (incl. `missing_mips_pct`/`missing_mips_count`), the **Techstars roster**, the **`techstars_card`** pills, the **`sports`** block, the **`graph`** block (findings 11), the **`graphinfo`** block (Graph & MECS side tab), **plus the new blocks**: **`ahead`** (Maryland AHEAD cards + MA-series chart + provenance, `source:"Maryland AHEAD"`, from findings 01j/01k), **`outliers`** (e11 national per-metro ranks), **`temporal`** (e12 story-of-time series), **`missing_quality`** (e6 no-MIPS: 90.2% region / Baltimore-city 23,502 / per-county), **`facility_quality`** (e7 readmissions ERR + ED OP_18b, top/median/bottom), **`growth_contacts`** (e8 per-mentor reach + Curl→MedStar $169.8M warm path) — and a per-figure `provenance` map powering the drawer (Maryland entries carry a `source` tag). |
| `showcase.data.js` | **Generated** from `showcase.json` by `build.py` — `window.SHOWCASE = {…}`. Included via `<script src>` so pages never `fetch()`. Do not hand-edit (AUTO-GENERATED header). |
| `maryland.json` | **Source of truth** for the **Maryland AHEAD** layer (DS-1…DS-5, findings 15): the TCOC savings time series (`ds1_savings_trend`), ≈$689M net savings (`ds2_net_savings`), growth-vs-cap (`ds3_growth_vs_cap`), global budgets (`ds4_global_budgets`), and the AHEAD quality measure set (`ds5_measures`). Each entry carries `source_label: "Maryland AHEAD"`, a `dataset`, and a source `url`. REAL Maryland values, never merged with the CMS figures. |
| `maryland.data.js` | **Generated** from `maryland.json` by `build.py` — `window.MARYLAND = {…}`. Included via `<script src>` on **every page** (not just `pages/ahead.html`) so the cross-page Maryland AHEAD context layer (`renderMdLayer` in `common.js`) renders without `fetch()`. Do not hand-edit (AUTO-GENERATED header). |
| `baltimore_metro.geojson` | **Source of truth.** 7-county MSA boundaries (MD FIPS 24). County borders only (v1). |
| `baltimore_metro.geo.js` | **Generated** from `baltimore_metro.geojson` by `build.py` — `window.BALTIMORE_GEO = {…}`. Included on the map pages (HERO, FOOT, **TGT** — the missing-quality choropleth) so they never `fetch()`. Do not hand-edit. |

## Build helper (`build.py`)

Dev-only (never served, never referenced by a page). Regenerates the embedded `data/*.js` from
the `data/*.json` sources of truth and downloads `assets/vendor/`. Validates JSON on load and runs
`node --check` on all JS when `node` is available. Run `python build.py` (all) or
`python build.py --data` after editing a JSON source. See `serve.md`.

## Data provenance: wired-live vs placeholder

**Wired from the harness facts** (numbers match findings exactly): all hero KPIs + metro/national benchmark;
the $496,294,651 TAM + its CCM/RPM/TCM decomposition; the 7-county table; top/median/bottom target groups
(N=1,698) and providers (N=14,199); the Techstars/JHTV/MedStar/UMMS/CareFirst roster matches (15 searched, 5
with ≥1 NPI, 2 clean in-region — Hasselfeld 1700270360, Najjar 1952691214); the E9 graph-algorithm tables
(findings 11); the Orioles team physician **Leigh Ann Curl, MD** (NPI 1659348738, findings 12); the **e11
national per-metro outliers** (#3 readmissions of 205; IM #6 / Critical Care #5; Family Practice #183 of 209);
the **e12 story-of-time** series (pop +30.3%, MA +162.4%, ED −22.2%, opioid −37.4%); the **e6 missing-quality**
geo (90.2% region / Baltimore-city 23,502 / per-county); the **e7 facility quality** (readmissions ERR + ED
OP_18b, top/median/bottom); the **e8 growth contacts** (per-mentor reach + Curl→MedStar Group II $169.8M); and
the **Maryland AHEAD** layer (findings 01j/01k) — global-budget incentive flip, the FFS-by-design MA reframe,
the Jan-2026 timeline, the AHEAD-quality-measure↔our-data map, and ≈$689M net Medicare savings; **and the
"Maryland AHEAD — grabbed datasets" section** (findings 15, `data/maryland.json`) — the REAL Maryland values
rendered as a distinct crimson layer: the **DS-1 TCOC savings LINE** (Medicare FFS savings $/bene/yr 2014→2021,
−$450 at the 2019 TCOC inflection), DS-2 ≈$689M net savings, DS-3 1.47%/2.31% growth vs the 3.58% cap, DS-4
80% global budgets / ≥$330M / 30% HAC, DS-5 the AHEAD quality-measure set — each with its source dataset + URL
in the drawer.

**Placeholder ("discovery pending"):** the **Maryland AHEAD MA-over-time series** (we don't have Maryland MCDB /
all-payer claims yet — the dashed Maryland line is declared in the chart but legend-only until the dataset is
acquired, findings 01k §6); `leverage_score` (E3) and `fit_flags` (E6) are NULL in the facts and surfaced as
the pre-fit caveat; PageRank/betweenness are flat-by-construction (recorded facts, not insights); the **Ravens
team physician** name (MedStar provides the medical team; the named physician is an open item in findings 01h).

**Rules:** static preview only — no live DB/query calls; data comes from the harness `raw/` facts. Not part of
the harness experiments (it consumes their output). Third-party headshots/logos are for internal preview only.
Keep this README current as files are added.
