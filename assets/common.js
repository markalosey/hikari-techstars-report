/* special_reports — shared controller for the multi-page /explore/techstars lab preview.
 *
 * 100% static and double-click-proof (file://). NO fetch() — the data is embedded as JS
 * globals included via <script src> before this file: window.SHOWCASE (from
 * data/showcase.data.js) and window.BALTIMORE_GEO (from data/baltimore_metro.geo.js, map
 * pages only). The *.js are generated from the *.json sources of truth by build.py. No app /
 * DB / FalkorDB / DuckDB calls. Vendored echarts.min.js + Bootstrap + bootstrap-icons live in
 * assets/vendor/ (no CDN); hikari.css/hikari.js + echarts-hikari-theme.js provide the
 * production look; this file provides the page glue: top-nav, the reusable metro choropleth,
 * the top/median/bottom table helper, and the click-any-card -> secret-sauce provenance drawer.
 *
 * Each page sets `window.SR_BASE` ("" at the root index, "../" under pages/) BEFORE this
 * script, then defines `window.SR_PAGE(showcase, geojson)` to render itself. We boot from the
 * embedded globals once the 'hikari' ECharts theme is registered.
 */
(function () {
  "use strict";

  var BASE = window.SR_BASE || "";

  /* ---------------- formatting ---------------- */
  var FMT = {
    usd: function (n) { return "$" + Math.round(n).toLocaleString("en-US"); },
    usdM: function (n) { return "$" + (n / 1e6).toFixed(1) + "M"; },
    int: function (n) { return Math.round(n).toLocaleString("en-US"); },
  };

  /* ---------------- shared assets ---------------- */
  var SHOWCASE = null;
  var GEO = null;
  var CHARTS = [];

  function asset(path) { return BASE + "assets/" + path; }

  /* ---------------- top navigation ---------------- */
  // Single source of truth for the page list (also used by the landing grid).
  var PAGES = [
    { slug: "ahead", file: "ahead.html", title: "Maryland AHEAD", icon: "bi-bank2", eid: "ahead" },
    { slug: "hero", file: "hero.html", title: "Metro Hero", icon: "bi-geo-alt-fill", eid: "hero" },
    { slug: "opportunity", file: "opportunity.html", title: "Opportunity / TAM", icon: "bi-cash-stack", eid: "opp" },
    { slug: "footprint", file: "footprint.html", title: "Care-Mgmt Footprint", icon: "bi-clipboard2-pulse", eid: "foot" },
    { slug: "targets", file: "targets.html", title: "Targets", icon: "bi-bullseye", eid: "targets" },
    { slug: "facilities", file: "facilities.html", title: "Facilities", icon: "bi-hospital", eid: "fac" },
    { slug: "growth", file: "growth.html", title: "Growth Contacts", icon: "bi-graph-up-arrow", eid: "grow" },
    { slug: "graph", file: "graph.html", title: "Graph Algorithms", icon: "bi-diagram-3-fill", eid: "graph" },
    { slug: "techstars", file: "techstars.html", title: "Techstars Ecosystem", icon: "bi-rocket-takeoff", eid: "tech" },
    { slug: "sports", file: "sports.html", title: "Sports & Care", icon: "bi-trophy-fill", eid: "sports" },
  ];
  window.SR_PAGES = PAGES;

  function pageHref(file) {
    // index.html lives at root; exploration pages live under pages/.
    return (BASE === "") ? "pages/" + file : file;
  }
  function homeHref() { return (BASE === "") ? "index.html" : "../index.html"; }

  function renderNav(activeSlug) {
    var holder = document.getElementById("sr-topnav");
    if (!holder) return;
    var links = PAGES.map(function (p) {
      var active = p.slug === activeSlug ? " active fw-semibold" : "";
      return (
        '<a class="nav-link px-2' + active + '" data-eid="NAV-link-' + p.slug + '" href="' +
        pageHref(p.file) + '"><i class="bi ' + p.icon + ' me-1"></i>' + p.title + "</a>"
      );
    }).join("");
    holder.innerHTML =
      '<nav class="navbar navbar-dark bg-dark" data-eid="NAV-bar">' +
      '  <div class="container-fluid flex-wrap">' +
      '    <a class="navbar-brand" data-eid="NAV-brand" href="' + homeHref() + '">' +
      '      <i class="bi bi-diagram-3-fill me-2"></i>Hikari</a>' +
      '    <div class="d-flex flex-wrap align-items-center gap-1 small">' + links + "</div>" +
      '    <span class="navbar-text text-light small ms-auto">' +
      '      <code class="text-info">/explore/techstars</code> &middot; static lab preview</span>' +
      "  </div></nav>";
  }

  /* ---------------- secret-sauce provenance drawer ---------------- */
  // Injected once; opens for ANY element carrying data-figure-id (unless that element
  // opts into a custom drawer via data-drawer="...").
  function ensureSauceDrawer() {
    if (document.getElementById("sauce-drawer")) return;
    var div = document.createElement("div");
    div.className = "offcanvas offcanvas-end";
    div.tabIndex = -1;
    div.id = "sauce-drawer";
    div.style.width = "480px";
    div.setAttribute("data-eid", "DRAWER-sauce");
    div.innerHTML =
      '<div class="offcanvas-header border-bottom">' +
      '  <h5 class="offcanvas-title" id="sauce-title"><i class="bi bi-gem me-2"></i>Secret sauce</h5>' +
      '  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>' +
      "</div>" +
      '<div class="offcanvas-body" id="sauce-body"></div>';
    document.body.appendChild(div);
  }

  function wireSauceDrawer() {
    ensureSauceDrawer();
    var offcanvasEl = document.getElementById("sauce-drawer");
    var bsOffcanvas = new bootstrap.Offcanvas(offcanvasEl);

    document.body.addEventListener("click", function (e) {
      // Let elements that drive a custom drawer handle their own clicks.
      if (e.target.closest("[data-drawer]")) return;
      var card = e.target.closest("[data-figure-id]");
      if (!card) return;
      var id = card.dataset.figureId;
      showProvenance(id);
      bsOffcanvas.show();
    });

    window.SR.openProvenance = function (id) {
      showProvenance(id);
      bsOffcanvas.show();
    };
  }

  function showProvenance(id) {
    var prov = SHOWCASE.provenance[id];
    var body = document.getElementById("sauce-body");
    var title = document.getElementById("sauce-title");
    if (!prov) {
      title.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Discovery pending';
      body.innerHTML =
        '<p class="text-muted">No provenance for <code>' + id +
        "</code> yet. This figure is wired later by a future experiment.</p>";
      return;
    }
    var isMaryland = prov.source === "Maryland AHEAD";
    title.innerHTML =
      (isMaryland ? '<i class="bi bi-layers-half me-2"></i>' : '<i class="bi bi-gem me-2"></i>') + prov.title;
    var html = "";
    // Maryland figures declare their separate-layer source up top (spec §4j).
    if (prov.source) {
      var srcLabel = isMaryland
        ? '<span class="md-badge"><i class="bi bi-layers-half"></i>Maryland AHEAD</span>'
        : '<span class="hk-badge"><i class="bi bi-database"></i>' + prov.source + "</span>";
      html += '<div class="mb-3">' + srcLabel + "</div>";
    }
    html += '<div class="secret-sauce">';
    if (prov.formula) {
      html +=
        '  <div class="layer-tag mb-1">' + (isMaryland ? "Method" : "Formula") + "</div>" +
        '  <div class="formula-box mb-3">' + prov.formula + "</div>";
    }
    if (prov.inputs) {
      var inputs = Object.entries(prov.inputs)
        .map(function (kv) {
          var v = kv[1];
          return "  " + kv[0] + ": " + (typeof v === "number" ? v.toLocaleString("en-US") : v);
        })
        .join("\n");
      html += '  <div class="layer-tag mb-1">Inputs</div>' + '  <pre class="mb-3">' + inputs + "</pre>";
    }
    if (prov.source_query) {
      html +=
        '  <div class="layer-tag mb-1">' + (isMaryland ? "Source (dataset / citation)" : "Source query") + "</div>" +
        '  <pre class="mb-0">' + prov.source_query + "</pre>";
    }
    html += "</div>";
    html +=
      '<p class="text-muted small mt-3 mb-0"><i class="bi bi-shield-lock me-1"></i>' +
      (isMaryland
        ? "Maryland AHEAD context layer \u2014 rendered separate from our Hikari (CMS) series (spec \u00a74j). "
        : "Deterministic CMS arithmetic / stored graph query (INV-H3). ") +
      "figure-id: <code>" + id + "</code></p>";
    body.innerHTML = html;
  }

  /* ---------------- reusable metro choropleth ---------------- */
  function choroptionFor(layerKey, palette) {
    var layer = SHOWCASE.choropleth_layers[layerKey];
    var names = SHOWCASE.region.names;
    var data = Object.entries(layer.by_fips).map(function (kv) {
      return { name: names[kv[0]], value: kv[1] };
    });
    var nums = data.map(function (d) { return d.value; });
    var min = Math.min.apply(null, nums);
    var max = Math.max.apply(null, nums);
    var unit = layer.unit;
    return {
      tooltip: {
        trigger: "item",
        formatter: function (p) {
          var v = p.value == null ? "\u2014" : (unit === "$" ? "$" + FMT.int(p.value) : FMT.int(p.value) + unit);
          return "<b>" + p.name + "</b><br/>" + layer.label + ": " + v;
        },
      },
      visualMap: {
        min: min, max: max, left: "left", bottom: 10, text: ["high", "low"],
        calculable: true, inRange: { color: palette || ["#cfe2ff", "#6ea8fe", "#0d6efd"] },
        textStyle: { fontSize: 10 },
      },
      series: [{
        type: "map", map: "baltimore_metro", roam: false,
        label: { show: true, fontSize: 9 },
        emphasis: { label: { show: true }, itemStyle: { areaColor: "#ffc107" } },
        itemStyle: { borderColor: "#fff", borderWidth: 1 },
        data: data,
      }],
    };
  }

  function makeChart(elId, option) {
    var el = document.getElementById(elId);
    if (!el) return null;
    var chart = echarts.init(el, "hikari");
    chart.setOption(option);
    CHARTS.push(chart);
    return chart;
  }

  /* ---------------- top / median / bottom table helper ---------------- */
  // spec = { columns: [...], data: {top:[],median:[],bottom:[]}, render: fn(row)->td-html,
  //          figureId?: string (applied to the first cell for drawer) }
  function tmbTable(spec) {
    var head = "<tr><th></th>" + spec.columns.map(function (c) { return "<th>" + c + "</th>"; }).join("") + "</tr>";
    var sections = [["top", "row-top", "TOP"], ["median", "row-median", "MEDIAN"], ["bottom", "row-bottom", "BOTTOM"]];
    var body = "";
    sections.forEach(function (s) {
      var key = s[0], cls = s[1], tag = s[2];
      var rows = spec.data[key] || [];
      rows.forEach(function (r, i) {
        var tagcell = i === 0
          ? '<td rowspan="' + rows.length + '" class="align-middle small fw-bold text-muted">' + tag + "</td>"
          : "";
        body += '<tr class="' + cls + '">' + tagcell + spec.render(r) + "</tr>";
      });
    });
    return '<table class="table table-sm hikari-table mb-0"><thead>' + head + "</thead><tbody>" + body + "</tbody></table>";
  }

  /* ---------------- Maryland AHEAD = SEPARATE data layer (spec §4j) ----------------
   * Reusable distinct-series treatment so any Maryland/AHEAD figure renders as its OWN
   * series/badge — distinct color + dashed line + a "Maryland AHEAD" legend label — and is
   * NEVER merged into our "Hikari (CMS)" series. Color is hard-coded (ECharts can't read CSS
   * vars) but mirrors --hikari-maryland in hikari-tokens.css. */
  var HK = { key: "hk", color: "#0d6efd", label: "Hikari (CMS)" };
  var MD = { key: "md", color: "#b80f3a", label: "Maryland AHEAD" };

  function mdBadge(extra) {
    return (
      '<span class="md-badge"><i class="bi bi-layers-half"></i>Maryland AHEAD' +
      (extra ? ' <span class="md-badge-extra">' + extra + "</span>" : "") +
      "</span>"
    );
  }
  function hkBadge() {
    return '<span class="hk-badge"><i class="bi bi-database"></i>Hikari (CMS)</span>';
  }
  // A small dual-legend so a viewer can always tell the two layers apart.
  function dualLegend() {
    return (
      '<div class="md-dual-legend" data-eid="MD-dual-legend">' +
      '  <span class="md-legend-item"><span class="md-legend-swatch md-legend-hk"></span>' + HK.label + "</span>" +
      '  <span class="md-legend-item"><span class="md-legend-swatch md-legend-md"></span>' + MD.label + "</span>" +
      "</div>"
    );
  }

  /* Reusable "Maryland AHEAD" CONTEXT STRIP (spec §4j). One consistent crimson card used to
   * layer Maryland/AHEAD context across ANY page — never merged with our Hikari (CMS) content.
   * Renders: crimson --hikari-maryland accent + mdBadge() + a small "ⓘ" that (via the global
   * data-figure-id drawer handler) opens the provenance drawer for `figureId`. opts:
   *   { eid, html, figureId?, inline? } — figureId defaults to eid; inline = compact one-liner. */
  function mdContextStrip(opts) {
    var eid = opts.eid;
    var figureId = opts.figureId || eid;
    var inline = opts.inline ? " md-context-strip--inline" : "";
    return (
      '<div class="md-context-strip' + inline + ' figure-card" data-figure-id="' + figureId +
      '" data-eid="' + eid + '" role="button">' +
      '  <div class="md-context-strip-accent"></div>' +
      '  <div class="md-context-strip-main">' +
      '    <div class="md-context-strip-head">' + mdBadge() +
      '      <span class="md-context-info" title="Source &amp; provenance"><i class="bi bi-info-circle"></i></span>' +
      "    </div>" +
      '    <div class="md-context-strip-body">' + opts.html + "</div>" +
      "  </div></div>"
    );
  }

  /* ---------------- cross-page Maryland AHEAD layer (spec §4j) ----------------
   * The AHEAD page renders the full Maryland layer itself (page-ahead.js). EVERY OTHER page
   * gets a consistent, provenance-tagged "Maryland AHEAD" CONTEXT element via this registry —
   * a crimson mdContextStrip (or scorecard / badge) injected into a `<PAGE>-md-host` anchor and,
   * where natural, a badge on an existing tile/panel. Numbers come from window.MARYLAND
   * (data/maryland.data.js, the REAL DS-1..DS-5 values, findings/15) and SHOWCASE — never typed.
   * Each element opens the provenance drawer (dataset + source URL) for its figure-id. */
  function mdHost(id, html) {
    var host = document.getElementById(id);
    if (host) host.innerHTML = html;
    return host;
  }

  // DS-5 measure scorecard card (reused: targets page) — maps each AHEAD measure to our experiment.
  function mdScorecardCard(eid) {
    var md = window.MARYLAND;
    if (!md) return "";
    var ds5 = md.ds5_measures;
    var rows = ds5.measures.map(function (m) {
      return (
        "<tr>" +
        '<td class="small fw-semibold">' + m.code + ' <span class="text-muted fw-normal">— ' + m.name + " (CMIT " + m.cmit + ")</span></td>" +
        '<td class="small text-center"><span class="badge text-bg-light">' + m.type + "</span></td>" +
        '<td class="small">' + m.ours + "</td></tr>"
      );
    }).join("");
    return (
      '<div class="card md-card figure-card mb-4" data-figure-id="' + ds5.figure_id + '" data-eid="' + eid + '" role="button">' +
      '  <div class="kpi-band"></div>' +
      '  <div class="card-body">' +
      '    <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-1">' +
      '      <h6 class="card-title mb-0"><i class="bi bi-clipboard2-check me-2" style="color: var(--hikari-maryland);"></i>Maryland AHEAD scorecard — measures we move</h6>' +
      "      " + mdBadge() +
      "    </div>" +
      '    <p class="text-secondary small mb-1 mt-1">' + ds5.subtitle + "</p>" +
      '    <table class="table table-sm hikari-table mt-1 mb-0" data-eid="' + eid + '-table">' +
      '<thead><tr><th>AHEAD measure</th><th class="text-center">P4P/P4R</th><th>Our experiment</th></tr></thead><tbody>' +
      rows + "</tbody></table>" +
      '    <div class="small text-muted mt-2"><i class="bi bi-arrow-left-right me-1"></i>' + ds5.note + "</div>" +
      "  </div></div>"
    );
  }

  var MD_LAYER = {
    hero: function (md) {
      var ag = SHOWCASE.counties_table.metro_aggregate;
      var nat = SHOWCASE.counties_table.national_benchmark;
      // Badge the existing MA KPI tile as the separate Maryland layer.
      var maBody = document.querySelector('[data-eid="HERO-kpi-ma_pct"] .card-body');
      if (maBody) {
        maBody.insertAdjacentHTML(
          "beforeend",
          '<div class="mt-1" data-eid="HERO-md-ma-badge">' + mdBadge("FFS by design") + "</div>"
        );
      }
      mdHost(
        "HERO-md-host",
        mdContextStrip({
          eid: "HERO-md-strip",
          figureId: "HERO-md-strip",
          html:
            "<strong>MA " + ag.ma_pct + "% vs " + Math.round(nat.ma_pct) +
            "% national is FFS-BY-DESIGN.</strong> Maryland sets Medicare FFS hospital rates (HSCRC); " +
            "AHEAD keeps the waiver. Global budgets live; AHEAD PY1 Jan 2026.",
        })
      );
    },

    opportunity: function (md) {
      var ds1 = md.ds1_savings_trend;
      var ds2 = md.ds2_net_savings;
      var peak = Math.min.apply(null, ds1.impact_usd); // -450 (TCOC peak, 2019)
      mdHost(
        "OPP-md-host",
        mdContextStrip({
          eid: "OPP-md-strip",
          figureId: "OPP-md-strip",
          html:
            "Under Maryland global budgets, captured care management = <strong>retained margin, not new FFS.</strong> " +
            "Maryland already saved <strong>" + ds2.value_display + "</strong> (DS-2); <strong>\u2212$" +
            Math.abs(peak) + "/bene</strong> at the TCOC peak (DS-1)." +
            '<div id="OPP-md-sparkline" class="md-spark" data-figure-id="' + ds1.figure_id +
            '" data-eid="OPP-md-sparkline"></div>',
        })
      );
      // Compact inline DS-1 sparkline — crimson dashed "Maryland AHEAD" series (real DS-1 values).
      makeChart("OPP-md-sparkline", {
        legend: { data: [ds1.legend_label], bottom: 0, textStyle: { color: MD.color, fontSize: 10 } },
        tooltip: {
          trigger: "axis",
          formatter: function (p) {
            return ds1.years[p[0].dataIndex] + ": $" + p[0].value + "/bene/yr";
          },
        },
        grid: { left: 8, right: 8, top: 6, bottom: 20 },
        xAxis: { type: "category", data: ds1.years, show: false, boundaryGap: false },
        yAxis: { type: "value", show: false, max: 0 },
        series: [{
          name: ds1.legend_label,
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          data: ds1.impact_usd,
          lineStyle: { color: MD.color, width: 2, type: "dashed" },
          itemStyle: { color: MD.color },
          areaStyle: { color: "rgba(184,15,58,0.06)" },
        }],
      });
    },

    footprint: function () {
      mdHost(
        "FOOT-md-host",
        mdContextStrip({
          eid: "FOOT-md-strip",
          figureId: "FOOT-md-strip",
          html:
            "PC AHEAD pays an <strong>Enhanced Primary Care Payment (PBPM)</strong> with quality + HCC " +
            "risk adjustment; APCM/CCM align with Maryland's advanced-primary-care build.",
        })
      );
    },

    targets: function () {
      var pct = SHOWCASE.provenance.missing_quality.inputs.region_pct; // 90.2
      mdHost(
        "TGT-md-host",
        mdContextStrip({
          eid: "TGT-md-strip",
          figureId: "TGT-md-strip",
          html:
            "<strong>" + pct + "% of region providers have NO CMS MIPS score</strong> — exactly the at-risk " +
            "quality gap AHEAD's quality-based <strong>Enhanced Primary Care Payment (EPCP)</strong> pays " +
            "primary care to close, across the measure set <strong>EDU / AHU / CDC / CBP / CDF</strong>.",
        })
      );
      mdHost("TGT-md-scorecard-host", mdScorecardCard("TGT-md-scorecard"));
    },

    facilities: function () {
      mdHost(
        "FAC-md-host",
        mdContextStrip({
          eid: "FAC-md-strip",
          figureId: "FAC-md-strip",
          html:
            "<strong>Readmissions (ERR) and ED (OP_18b) ARE AHEAD P4P measures</strong> (EDU/AHU), and under " +
            "Maryland global budgets <strong>each readmission / ED visit is margin leak.</strong>",
        })
      );
      // Badge the readmission + ED panels as AHEAD-relevant (each opens DS-5 provenance).
      function badgePanel(tableId, eid, extra) {
        var table = document.getElementById(tableId);
        if (!table) return;
        var card = table.closest(".card");
        var header = card ? card.querySelector(".card-header") : null;
        if (!header) return;
        header.insertAdjacentHTML(
          "beforeend",
          '<span class="ms-2" style="cursor:pointer" role="button" data-figure-id="AHEAD-md-measures" data-eid="' +
            eid + '">' + mdBadge("AHEAD-relevant \u00b7 " + extra) + "</span>"
        );
      }
      badgePanel("FAC-readmit-table", "FAC-md-readmit", "AHU");
      badgePanel("FAC-ed-table", "FAC-md-ed", "EDU");
      // Per-table annotations (appended after page-facilities.js sets the base notes).
      var rNote = document.getElementById("FAC-readmit-note");
      if (rNote) {
        rNote.insertAdjacentHTML(
          "beforeend",
          ' <span class="text-danger"><i class="bi bi-layers-half me-1"></i>AHEAD: excess readmissions map to ' +
            "Acute Hospital Utilization (AHU, CMIT 14) \u2014 under global budgets, each is retained margin lost.</span>"
        );
      }
      var eNote = document.getElementById("FAC-ed-note");
      if (eNote) {
        eNote.insertAdjacentHTML(
          "beforeend",
          ' <span class="text-danger"><i class="bi bi-layers-half me-1"></i>AHEAD: ED throughput maps to ED ' +
            "Utilization (EDU, CMIT 234) \u2014 a P4P measure AHEAD pays primary care to move.</span>"
        );
      }
    },

    growth: function () {
      mdHost(
        "GROW-md-host",
        mdContextStrip({
          eid: "GROW-md-strip",
          figureId: "GROW-md-strip",
          html:
            "The anchor systems (<strong>Hopkins / MedStar / UMMS</strong>) operate under Maryland global " +
            "budgets; <strong>CareFirst</strong> is a commercial payer inside the all-payer model — " +
            "care-management adoption aligns with their model incentives.",
        })
      );
    },

    graph: function () {
      mdHost(
        "GRAPH-md-host",
        mdContextStrip({
          eid: "GRAPH-md-badge",
          figureId: "GRAPH-md-badge",
          inline: true,
          html:
            "This Baltimore subgraph spans systems that operate under Maryland's all-payer " +
            "<strong>global budgets</strong> (HSCRC / AHEAD).",
        })
      );
    },

    techstars: function () {
      mdHost(
        "TECH-md-host",
        mdContextStrip({
          eid: "TECH-md-badge",
          figureId: "TECH-md-badge",
          inline: true,
          html:
            "Techstars AI Health Baltimore sits inside Maryland's <strong>AHEAD</strong> all-payer market — " +
            "anchor systems run under global budgets.",
        })
      );
    },

    sports: function () {
      mdHost(
        "SPORTS-md-host",
        mdContextStrip({
          eid: "SPORTS-md-badge",
          figureId: "SPORTS-md-badge",
          inline: true,
          html:
            "<strong>MedStar</strong> — the teams' medical provider — operates under Maryland " +
            "<strong>global budgets</strong> (HSCRC / AHEAD).",
        })
      );
    },
  };

  function renderMdLayer(active) {
    // The AHEAD page renders the full Maryland layer itself; everywhere else we layer context.
    if (active === "ahead" || !window.MARYLAND) return;
    var fn = MD_LAYER[active];
    if (fn) {
      try { fn(window.MARYLAND); }
      catch (e) { console.error("[special_reports] Maryland layer (" + active + ") failed:", e); }
    }
  }

  /* ---------------- public namespace ---------------- */
  window.SR = {
    FMT: FMT,
    asset: asset,
    choroptionFor: choroptionFor,
    makeChart: makeChart,
    tmbTable: tmbTable,
    charts: CHARTS,
    HK: HK,
    MD: MD,
    mdBadge: mdBadge,
    hkBadge: hkBadge,
    dualLegend: dualLegend,
    mdContextStrip: mdContextStrip,
    get showcase() { return SHOWCASE; },
    get geo() { return GEO; },
    openProvenance: function () {}, // replaced once drawer is wired
  };

  /* ---------------- boot ---------------- */
  function needsGeo() {
    // A page needs the GeoJSON if it declares <body data-sr-map="1"> or has a [data-sr-map] el.
    return document.body.getAttribute("data-sr-map") === "1";
  }

  function boot() {
    var active = document.body.getAttribute("data-sr-page") || "";
    renderNav(active);

    // No fetch() — data is embedded as JS globals (window.SHOWCASE from
    // data/showcase.data.js; window.BALTIMORE_GEO from data/baltimore_metro.geo.js),
    // included via <script src> before this file. This makes the preview
    // double-click-proof: it works from file:// with no CORS/origin-null failures
    // (see serve.md). Regenerate the *.js from the *.json sources with build.py.
    try {
      SHOWCASE = window.SHOWCASE;
      if (!SHOWCASE) {
        throw new Error(
          "window.SHOWCASE is undefined — include data/showcase.data.js before common.js"
        );
      }
      GEO = needsGeo() ? window.BALTIMORE_GEO || null : null;
      if (GEO) echarts.registerMap("baltimore_metro", GEO);
      wireSauceDrawer();
      if (typeof window.SR_PAGE === "function") {
        window.SR_PAGE(SHOWCASE, GEO);
      }
      // Layer the separate, provenance-tagged "Maryland AHEAD" context across pages (spec §4j).
      renderMdLayer(active);
      window.addEventListener("resize", function () {
        CHARTS.forEach(function (c) { c.resize(); });
      });
    } catch (err) {
      console.error("[special_reports] boot failed:", err);
      var main = document.querySelector("main") || document.body;
      var div = document.createElement("div");
      div.className = "alert alert-danger m-4";
      div.textContent =
        "Failed to initialise from embedded data — ensure data/showcase.data.js " +
        "(and data/baltimore_metro.geo.js on map pages) load before common.js. " + err;
      main.prepend(div);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
