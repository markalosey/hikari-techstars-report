# NOTICE — third-party attributions

This repository is a **100% static** preview (no build step required to view; double-click
`index.html`). It vendors a small number of third-party libraries and includes some
third-party media for an **internal pitch preview**. Attributions and licenses below.

## Vendored libraries (`assets/vendor/`)

Bundled locally (no CDN) so the preview works offline / from `file://`. Re-downloaded by
`build.py --vendor`.

| Library | Version | License | Project |
|---------|---------|---------|---------|
| Apache ECharts | 5.5.0 | Apache License 2.0 | https://echarts.apache.org/ |
| Bootstrap (CSS + JS bundle) | 5.3.3 | MIT License | https://getbootstrap.com/ |
| Bootstrap Icons (CSS + `.woff`/`.woff2` fonts) | 1.11.3 | MIT License | https://icons.getbootstrap.com/ |

- **Apache ECharts** — Copyright © The Apache Software Foundation. Licensed under the Apache
  License, Version 2.0. See https://www.apache.org/licenses/LICENSE-2.0
- **Bootstrap** — Copyright © The Bootstrap Authors. MIT License.
  See https://github.com/twbs/bootstrap/blob/main/LICENSE
- **Bootstrap Icons** — Copyright © The Bootstrap Authors. MIT License.
  See https://github.com/twbs/icons/blob/main/LICENSE

## Third-party marks & media (internal preview only)

- **Team headshots** (`assets/techstars/*.jpg`) — Techstars AI Health Baltimore team and
  ecosystem-advisor photographs, collected from public web sources (Techstars CDN; one
  alternate from dav.org) for an **internal pitch preview only**. These are third-party marks /
  likenesses. **Confirm usage rights before any public or production use.**
- **Team logos** (`assets/sports/*.png`) — Baltimore Ravens (NFL) and Baltimore Orioles (MLB)
  logos are registered trademarks of their respective franchises, included here for an internal
  pitch preview only. **Confirm rights before public use.**

## Data sources

The figures in this preview are derived from **public data**:

- **CMS** public datasets — Medicare enrollment / utilization / quality (Hikari "CMS" layer),
  surfaced via the Hikari analytics pipeline. Every figure traces to a stored query / finding.
- **Maryland HSCRC / CMMI** public reports and evaluations — the **"Maryland AHEAD"** layer
  (`data/maryland.json`, DS-1…DS-5). Each Maryland series carries its dataset name and source
  URL in the provenance drawer. Sources: HSCRC Maryland TCOC Model Quantitative Evaluation;
  JAMA Health Forum; HSCRC All-Payer Model Biannual Report; HealthCare Transformation Task Force
  (HCTTF) MD All-Payer assessment; Maryland AHEAD Primary Care Programs all-call. See
  `../../findings/15-maryland-datasets.md` for the full citations.

No PHI is present (INV-H10) — public CMS data and public Maryland-program report values only.
