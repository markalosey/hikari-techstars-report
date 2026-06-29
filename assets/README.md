# assets/ — preview styling, controllers, vendored libraries, and web-collected media

This dir holds four kinds of files: **(1) vendored production styling/behavior**, **(2) vendored
third-party libraries** (no CDN), **(3) the preview's own page controllers**, and **(4) web-collected
media** (headshots, logos).

## 1. Vendored production assets (copies — do NOT edit; edit the originals in `src/`)

| File | Vendored from |
|------|---------------|
| `hikari.css` | `src/hikari/ui/static/hikari/hikari.css` — tokens + component styling. Imported first on every page so the preview matches production. |
| `hikari.js` | `src/hikari/ui/static/hikari/hikari.js` — ECharts lifecycle glue, named tooltip formatters, event buffer, entity-URL resolver. HTMX listeners are inert in the static preview; its `[data-echarts]` auto-init `fetch()` path is never exercised (the preview calls `echarts.init` via `common.js`). |
| `echarts-hikari-theme.js` | `src/hikari/ui/static/hikari/echarts-hikari-theme.js` — registers the `hikari` ECharts theme (CSS-var palette). |

## 2. Vendored third-party libraries — `vendor/` (no CDN, downloaded by `../build.py`)

Local copies so the preview works offline and by double-click (`file://`). No `<link>`/`<script>`
points at a CDN.

| File | Library |
|------|---------|
| `vendor/echarts.min.js` | ECharts 5.5.0 — loaded before any `echarts.init`. |
| `vendor/bootstrap.min.css` | Bootstrap 5.3.3 CSS. |
| `vendor/bootstrap.bundle.min.js` | Bootstrap 5.3.3 JS bundle (offcanvas drawers, etc.). |
| `vendor/bootstrap-icons/bootstrap-icons.min.css` | bootstrap-icons 1.11.3 CSS (font `?hash` query strings stripped so the fonts resolve on `file://`). |
| `vendor/bootstrap-icons/fonts/bootstrap-icons.woff2`, `.woff` | The icon font files. |

## 3. Preview controllers (preview-only)

| File | Purpose |
|------|---------|
| `hikari-tokens.css` | Preview-only helpers: metro profile card, figure cards, table look, drawer, lab card-grid, page chrome, roster + sports drawers, graph tables, the Graph & MECS side tab + cards, **and the Maryland AHEAD layer** (`--hikari-maryland` token, `.md-badge`/`.hk-badge`/`.md-card`/`.md-dual-legend`/`.md-stat`, **the reusable `.md-context-strip` cross-page context strip + its `--inline` variant + `.md-spark`**, the AHEAD timeline, and the hero sparkline tiles). |
| `common.js` | Shared controller (reads embedded `window.SHOWCASE`/`window.BALTIMORE_GEO`/`window.MARYLAND` — **no fetch** — top-nav, reusable choropleth, top/median/bottom table helper, click-any-card → provenance drawer that renders an optional Maryland-AHEAD source badge). Exposes `window.SR` — incl. the **Maryland-layer helpers** `SR.MD`/`SR.HK` (series color + label), `SR.mdBadge()`, `SR.hkBadge()`, `SR.dualLegend()`, **`SR.mdContextStrip({eid, html, figureId, inline})`** (spec §4j). Also carries the **`MD_LAYER` registry + `renderMdLayer(active)`** that, after each page's `SR_PAGE`, injects the consistent Maryland AHEAD context strip/badge into that page's `<PAGE>-md-host` anchor (numbers from `window.MARYLAND`). |
| `page-*.js` | Per-page render controllers (**ahead**, hero, opportunity, footprint, targets, **facilities**, **growth**, graph, techstars, sports). `page-ahead.js` reads the embedded `window.MARYLAND` global (`../data/maryland.data.js`, generated from `data/maryland.json`) to render the full **"Maryland AHEAD — grabbed datasets"** section (DS-1 crimson dashed savings line + DS-2…DS-5 stat cards). **Every other page** gets the Maryland AHEAD layer instead from `common.js` `renderMdLayer` (the cross-page context strip/badge — `HERO-md-strip`, `OPP-md-strip` + sparkline, `FOOT-md-strip`, `TGT-md-strip` + `TGT-md-scorecard`, `FAC-md-strip` + panel badges, `GROW-md-strip`, and subtle `GRAPH/TECH/SPORTS-md-badge`). No fetch. |
| `roster.js` | Techstars roster offcanvas drawer (HERO + TECH). |
| `graphinfo.js` | **Persistent "Graph & MECS" side tab** (spec §4h) on every page → offcanvas of 4 `data-eid`'d cards, driven by `window.SHOWCASE.graphinfo`. |
| `showcase.js` | **Deprecated** v1 controller (unused; kept for history). |

## 4. Web-collected media

Images snatched from the web for the `/explore/techstars` preview (Techstars hero card +
roster drawer profiles). All 720×720 unless noted. Source: Techstars Baltimore AI Health page CDN
(`cdn.bfldr.com/CBWQP80B`); Culbertson alt from DAV. Keep this catalog current as media is added.

## techstars/ — roster headshots (15 people + 1 alt)
| File | Person | Role / org | Source |
|------|--------|------------|--------|
| `techstars/nick_culbertson.jpg` | Nick Culbertson | Managing Director (our interviewer) | Techstars CDN |
| `techstars/nick_culbertson_dav.jpg` | Nick Culbertson (alt, 300×420) | — | dav.org |
| `techstars/emily_mclanahan.jpg` | Emily McLanahan | Investment Manager (first interview) | Techstars CDN |
| `techstars/ashley_kovacs.jpg` | Ashley Kovacs | Program Manager | Techstars CDN |
| `techstars/myra_norton.jpg` | Myra Norton | JHTV — Head of Innovation/Accel | Techstars CDN |
| `techstars/sha_zhan.jpg` | Sha Zhan | JHTV — Dir, AI Innovation & Commercialization | Techstars CDN |
| `techstars/brian_hasselfeld.jpg` | Brian Hasselfeld, MD | Johns Hopkins Medicine (in our data: NPI 1700270360) | Techstars CDN |
| `techstars/peter_najjar.jpg` | Peter Najjar, MD | Johns Hopkins Health System (in our data: NPI 1952691214) | Techstars CDN |
| `techstars/william_sheahan.jpg` | William Sheahan | MedStar — SVP & CIO, MI2 | Techstars CDN |
| `techstars/jeff_collins.jpg` | Jeff Collins | MedStar — VP Business Innovation Lab | Techstars CDN |
| `techstars/daniel_marchalik.jpg` | Daniel Marchalik, MD | MedStar — Med Dir, Business Innovation Lab | Techstars CDN |
| `techstars/warren_dsouza.jpg` | Warren D'Souza, PhD | UMMS — SVP & CIO (iHarbor) | Techstars CDN |
| `techstars/guy_henggeler.jpg` | Guy Henggeler | UMMS — VP iHarbor Strategy/Commercialization | Techstars CDN |
| `techstars/laura_gomez_cadena.jpg` | Laura Gomez Cadena | CareFirst/Healthworx — VC Investor | Techstars CDN |
| `techstars/rick_jeandell.jpg` | Rick Jeandell | CareFirst — VP IT / Commercial Markets | Techstars CDN |
| `techstars/matt_hellauer.jpg` | Matt Hellauer | PTX Capital — Managing Partner | Techstars CDN |

**Usage note:** third-party headshots collected for an internal pitch preview. Confirm usage rights
before any public/production deployment. Profile facts for the drawer live in `findings/01b–01f`.
