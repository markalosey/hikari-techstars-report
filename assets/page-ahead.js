/* special_reports — AHEAD page (PAGE id: AHEAD).
 *
 * The headline "we researched Maryland AHEAD" beat. Maryland AHEAD is rendered as a SEPARATE
 * intelligence layer (spec §4j): every figure carries the "Maryland AHEAD" badge + crimson accent
 * and is NEVER merged with our "Hikari (CMS)" series. The MA-over-time chart demonstrates the
 * dual-legend distinct-series treatment — our solid CMS line + a separate dashed Maryland series
 * that is legend-only today (Maryland MCDB not yet acquired), so real Maryland data drops in later.
 *
 * All facts trace to findings 01j (All-Payer → TCOC → AHEAD) and 01k (MPIR deep + datasets).
 */
window.SR_PAGE = function (sc) {
  var FMT = window.SR.FMT;
  var a = sc.ahead;

  /* layer banner */
  document.getElementById("AHEAD-intro").textContent = a.intro;
  document.getElementById("AHEAD-layer-note").innerHTML = '<i class="bi bi-info-circle me-1"></i>' + a.layer_note;
  document.getElementById("AHEAD-legend").innerHTML = window.SR.dualLegend();

  /* ---- card renderers ---- */
  function statsGrid(stats) {
    return (
      '<div class="row g-2 mt-1">' +
      stats.map(function (s) {
        return (
          '<div class="col-6">' +
          '  <div class="md-stat h-100">' +
          '    <div class="md-stat-value">' + s.value + "</div>" +
          '    <div class="md-stat-label">' + s.label + "</div>" +
          "  </div></div>"
        );
      }).join("") +
      "</div>"
    );
  }
  function timelineList(items) {
    return (
      '<ul class="ahead-timeline mt-2" data-eid="AHEAD-timeline-list">' +
      items.map(function (t) {
        return '<li><span class="ahead-year">' + t.year + "</span> &middot; " +
          '<span class="ahead-event">' + t.event + "</span></li>";
      }).join("") +
      "</ul>"
    );
  }
  function mappingsTable(maps) {
    return (
      '<table class="table table-sm hikari-table mt-2 mb-0" data-eid="AHEAD-measures-table">' +
      "<thead><tr><th>AHEAD primary-care measure</th><th>Our data</th></tr></thead><tbody>" +
      maps.map(function (m) {
        return "<tr><td class=\"small fw-semibold\">" + m.measure + "</td><td class=\"small\">" + m.ours + "</td></tr>";
      }).join("") +
      "</tbody></table>"
    );
  }

  function cardHtml(card, colCls) {
    var inner =
      '<div class="kpi-band"></div>' +
      '<div class="card-body">' +
      '  <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-1">' +
      '    <h5 class="card-title mb-0"><i class="bi ' + card.icon + ' me-2" style="color: var(--hikari-maryland);"></i>' + card.title + "</h5>" +
      "    " + window.SR.mdBadge() +
      "  </div>" +
      (card.headline ? '<div class="fw-semibold text-danger small mb-2">' + card.headline + "</div>" : "") +
      '  <p class="text-secondary small mb-1">' + card.body + "</p>" +
      (card.stats ? statsGrid(card.stats) : "") +
      (card.timeline ? timelineList(card.timeline) : "") +
      (card.mappings ? mappingsTable(card.mappings) : "") +
      (card.note ? '<div class="small text-muted mt-2"><i class="bi bi-info-circle me-1"></i>' + card.note + "</div>" : "") +
      "</div>";
    return (
      '<div class="' + colCls + '">' +
      '  <div class="card md-card figure-card h-100" data-figure-id="' + card.figure_id + '" data-eid="' + card.eid + '">' +
      inner +
      "</div></div>"
    );
  }

  // ma-explainer is the headline reframe → full width; the rest are half-width.
  var layout = {
    "AHEAD-ma-explainer": "col-12",
    "AHEAD-incentive-flip": "col-lg-6",
    "AHEAD-savings": "col-lg-6",
    "AHEAD-timeline": "col-lg-6",
    "AHEAD-measures-map": "col-lg-6",
  };
  // Render in a deliberate pitch order (reframe first).
  var order = ["AHEAD-ma-explainer", "AHEAD-incentive-flip", "AHEAD-savings", "AHEAD-timeline", "AHEAD-measures-map"];
  var byEid = {};
  a.cards.forEach(function (c) { byEid[c.eid] = c; });
  document.getElementById("AHEAD-grid").innerHTML = order
    .filter(function (eid) { return byEid[eid]; })
    .map(function (eid) { return cardHtml(byEid[eid], layout[eid] || "col-lg-6"); })
    .join("");

  /* ============================================================
   * Maryland AHEAD — grabbed datasets (REAL values from findings/15).
   * window.MARYLAND is embedded via data/maryland.data.js (NO fetch). Rendered as the
   * SEPARATE "Maryland AHEAD" layer (spec §4j): crimson + badge + dashed line, never merged
   * with our "Hikari (CMS)" series. Each card opens the provenance drawer with its source URL.
   * ============================================================ */
  var md = window.MARYLAND;
  if (md) {
    document.getElementById("AHEAD-md-section-legend").innerHTML = window.SR.dualLegend();
    document.getElementById("AHEAD-md-section-note").innerHTML =
      '<i class="bi bi-info-circle me-1"></i>' + md.meta.note;

    /* ---- Maryland stat cards (real DS-2..DS-5 values) ---- */
    function mdStat(value, label) {
      return (
        '<div class="md-stat h-100">' +
        '  <div class="md-stat-value">' + value + "</div>" +
        '  <div class="md-stat-label">' + label + "</div></div>"
      );
    }
    function mdCardShell(d, bodyHtml, colCls, extraHead) {
      return (
        '<div class="' + colCls + '">' +
        '  <div class="card md-card figure-card h-100" data-figure-id="' + d.figure_id + '" data-eid="' + d.figure_id + '">' +
        '    <div class="kpi-band"></div>' +
        '    <div class="card-body">' +
        '      <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-1">' +
        '        <h6 class="card-title mb-0">' + d.title + "</h6>" +
        "        " + window.SR.mdBadge() +
        "      </div>" +
        (extraHead || "") +
        bodyHtml +
        '      <div class="small text-muted mt-2"><i class="bi bi-link-45deg me-1"></i><span class="fw-semibold">' +
        d.dataset + "</span> — click for source citation &amp; URL</div>" +
        "    </div></div></div>"
      );
    }

    // DS-2 net savings
    var ds2 = md.ds2_net_savings;
    var ds2Html = mdCardShell(
      ds2,
      '<div class="row g-2 mt-1">' +
        '<div class="col-12">' + mdStat(ds2.value_display, ds2.label) + "</div></div>" +
        '<p class="text-secondary small mb-0 mt-2">Proven savings over the ' + ds2.period + " — the outcome evidence for the deck.</p>",
      "col-md-6 col-xl-4"
    );

    // DS-3 growth vs cap
    var ds3 = md.ds3_growth_vs_cap;
    var ds3Stats = ds3.actual.map(function (a) {
      return '<div class="col-6">' + mdStat(a.growth_pct.toFixed(2) + "%", a.period) + "</div>";
    }).join("");
    var ds3Html = mdCardShell(
      ds3,
      '<div class="row g-2 mt-1">' + ds3Stats + "</div>" +
        '<p class="text-secondary small mb-0 mt-2">Both years ran <span class="fw-semibold text-success">under</span> the ' +
        '<span class="fw-semibold">' + ds3.cap_pct.toFixed(2) + "%/yr</span> " + ds3.cap_label + ".</p>",
      "col-md-6 col-xl-4"
    );

    // DS-4 global budgets
    var ds4 = md.ds4_global_budgets;
    var ds4Html = mdCardShell(
      ds4,
      '<div class="row g-2 mt-1">' +
        '<div class="col-4">' + mdStat(ds4.revenue_in_global_budgets_pct + "%", "of hospital revenue in global budgets") + "</div>" +
        '<div class="col-4">' + mdStat(ds4.medicare_savings_target_display, "5-yr Medicare savings target") + "</div>" +
        '<div class="col-4">' + mdStat(ds4.hac_reduction_pct + "%", "hospital-acquired-condition reduction") + "</div>" +
        "</div>",
      "col-12 col-xl-4"
    );

    // DS-5 measure set (table mapped to our data)
    var ds5 = md.ds5_measures;
    var ds5Rows = ds5.measures.map(function (m) {
      return (
        "<tr>" +
        '<td class="small fw-semibold">' + m.code + " <span class=\"text-muted fw-normal\">— " + m.name + " (CMIT " + m.cmit + ")</span></td>" +
        '<td class="small text-center"><span class="badge text-bg-light">' + m.type + "</span></td>" +
        '<td class="small">' + m.ours + "</td>" +
        "</tr>"
      );
    }).join("");
    var ds5Body =
      '<p class="text-secondary small mb-1 mt-1">' + ds5.subtitle + "</p>" +
      '<table class="table table-sm hikari-table mt-1 mb-0" data-eid="AHEAD-md-measures-table">' +
      "<thead><tr><th>AHEAD measure</th><th class=\"text-center\">P4P/P4R</th><th>Our data</th></tr></thead><tbody>" +
      ds5Rows + "</tbody></table>" +
      '<div class="small text-muted mt-2"><i class="bi bi-plus-circle me-1"></i>' + ds5.also + "</div>";
    var ds5Html = mdCardShell(ds5, ds5Body, "col-12");

    document.getElementById("AHEAD-md-grid").innerHTML = ds2Html + ds3Html + ds4Html + ds5Html;

    /* ---- Maryland savings LINE (DS-1) — distinct crimson dashed series ---- */
    var ds1 = md.ds1_savings_trend;
    document.getElementById("AHEAD-md-savings-title").textContent = ds1.title;
    document.getElementById("AHEAD-md-savings-subtitle").textContent = ds1.subtitle;
    document.getElementById("AHEAD-md-savings-legend").innerHTML = window.SR.dualLegend();
    document.getElementById("AHEAD-md-savings-note").innerHTML =
      '<i class="bi bi-database-check me-1"></i>REAL Maryland data line (' + ds1.dataset_full + "). " +
      ds1.note + " " + ds1.hospital_spending_note;

    var byYear = {};
    ds1.series.forEach(function (s) { byYear[s.year] = s; });
    var tcocIdx = ds1.years.indexOf(ds1.tcoc_start_year);

    window.SR.makeChart("AHEAD-md-savings-chart", {
      legend: { data: [ds1.legend_label], bottom: 0, textStyle: { color: window.SR.MD.color } },
      tooltip: {
        trigger: "axis",
        formatter: function (p) {
          var year = ds1.years[p[0].dataIndex];
          var s = byYear[year];
          return (
            "<b>" + year + "</b> &middot; " + s.era + "<br/>" +
            p[0].marker + "Savings: <b>$" + s.impact_usd + "/bene/yr</b> (" + s.pct_impact + "%)" +
            (s.significant ? " <span style=\"color:#888\">***</span>" : "")
          );
        },
      },
      grid: { left: 56, right: 24, top: 24, bottom: 56 },
      xAxis: { type: "category", data: ds1.years, name: "Year", nameLocation: "middle", nameGap: 32 },
      yAxis: {
        type: "value",
        name: "$ / bene / yr",
        max: 0,
        axisLabel: { formatter: function (v) { return "$" + v; } },
      },
      series: [
        {
          // Maryland AHEAD — SEPARATE crimson dashed line (spec §4j). This IS the Maryland data line.
          name: ds1.legend_label,
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 7,
          data: ds1.impact_usd,
          lineStyle: { color: window.SR.MD.color, width: 3, type: "dashed" },
          itemStyle: { color: window.SR.MD.color },
          // Shade the TCOC era (2019→2021) where savings deepen.
          markArea: {
            silent: true,
            itemStyle: { color: "rgba(184,15,58,0.07)" },
            label: { show: true, position: "insideTop", color: window.SR.MD.color, fontSize: 11, fontWeight: "bold", formatter: "TCOC era (2019→)" },
            data: [[{ xAxis: ds1.tcoc_start_year }, { xAxis: ds1.years[ds1.years.length - 1] }]],
          },
          // Annotate the 2019 deepest-savings point (TCOC begins → −$450).
          markPoint: {
            symbol: "pin",
            symbolSize: 56,
            itemStyle: { color: window.SR.MD.color },
            label: { color: "#fff", fontSize: 10, formatter: "TCOC\n-$450" },
            data: [{ coord: [tcocIdx, byYear[ds1.tcoc_start_year].impact_usd] }],
          },
        },
      ],
    });
  }

  /* ---- distinct-series demo chart (spec §4j) ---- */
  var ch = a.ma_series_chart;
  document.getElementById("AHEAD-ma-chart-title").textContent = ch.title;
  document.getElementById("AHEAD-ma-chart-subtitle").textContent = ch.subtitle;
  document.getElementById("AHEAD-ma-chart-legend").innerHTML = window.SR.dualLegend();
  document.getElementById("AHEAD-ma-chart-note").innerHTML =
    '<i class="bi bi-hourglass-split me-1"></i>Maryland AHEAD series: ' + ch.maryland_series_status + ".";

  window.SR.makeChart("AHEAD-ma-chart", {
    legend: {
      data: [window.SR.HK.label, window.SR.MD.label + " (MCDB — pending)"],
      bottom: 0,
    },
    tooltip: {
      trigger: "axis",
      formatter: function (p) {
        var year = ch.years[p[0].dataIndex];
        var lines = [year];
        p.forEach(function (s) {
          if (s.value != null) lines.push(s.marker + s.seriesName + ": " + s.value.toFixed(1) + "%");
        });
        return lines.join("<br/>");
      },
    },
    grid: { left: 40, right: 24, top: 16, bottom: 56 },
    xAxis: { type: "category", data: ch.years },
    yAxis: { type: "value", axisLabel: { formatter: "{value}%" }, max: 60 },
    series: [
      {
        // OUR series — solid Hikari (CMS) blue.
        name: window.SR.HK.label,
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        data: ch.hikari_ma_pct,
        lineStyle: { color: window.SR.HK.color, width: 3 },
        itemStyle: { color: window.SR.HK.color },
        markLine: {
          symbol: "none",
          lineStyle: { type: "dotted", color: "#6c757d" },
          label: { formatter: "National " + ch.national_ref + "% (Hikari/CMS)", position: "insideEndTop", fontSize: 10 },
          data: [{ yAxis: ch.national_ref }],
        },
      },
      {
        // Maryland AHEAD series — SEPARATE dashed crimson line. Legend-only today (no MCDB data
        // yet), so the structure visibly shows the added Maryland layer with data pending.
        name: window.SR.MD.label + " (MCDB — pending)",
        type: "line",
        data: [],
        lineStyle: { color: window.SR.MD.color, width: 3, type: "dashed" },
        itemStyle: { color: window.SR.MD.color },
      },
    ],
  });

  /* ============================================================
   * The Maryland global-budget signature
   * (window.SHOWCASE.facility_quality_suite.maryland_waiver_signature).
   *
   * Reinforces the AHEAD incentive-flip: national P4P (Hospital VBP / MSPB / HAC penalties) is
   * WAIVED for MD hospitals under the all-payer global-budget model — quality + spend are governed
   * by the fixed budget, not national pay-for-performance. Rendered as the SEPARATE Maryland AHEAD
   * layer (crimson md-card + badge). Card opens the secret-sauce drawer (maryland_waiver).
   * ============================================================ */
  var fqs = sc.facility_quality_suite;
  if (fqs && fqs.maryland_waiver_signature) {
    var w = fqs.maryland_waiver_signature;
    document.getElementById("AHEAD-waiver-subtitle").textContent =
      "The AHEAD signature in the region's hospital-quality data — national efficiency/P4P programs simply are not present.";
    document.getElementById("AHEAD-waiver-legend").innerHTML = window.SR.dualLegend();

    function waiverFact(value, label, sub) {
      return (
        '<div class="col-md-4">' +
        '  <div class="md-stat h-100">' +
        '    <div class="md-stat-value">' + value + "</div>" +
        '    <div class="md-stat-label">' + label + "</div>" +
        (sub ? '    <div class="small text-muted mt-1">' + sub + "</div>" : "") +
        "  </div></div>"
      );
    }
    document.getElementById("AHEAD-waiver-facts").innerHTML =
      waiverFact(w.vbp_region_rows.toLocaleString("en-US"), "Hospital VBP — region hospitals", "national value-based purchasing: not present") +
      waiverFact(w.mspb_measurable.toLocaleString("en-US"), "MSPB — measurable region hospitals", "Medicare-spend-per-beneficiary: carved out") +
      waiverFact(w.hac_penalty_populated ? "Yes" : "None", "HAC payment-reduction penalties", "hospital-acquired-condition penalties: unpopulated");
    document.getElementById("AHEAD-waiver-note").innerHTML =
      '<i class="bi bi-info-circle me-1"></i>' + w.note;
  }

  /* ============================================================
   * ACO Economics & County TCOC (window.SHOWCASE.aco_economics).
   *
   * Four-layer honesty pattern. The DEFENSIBLE HERO is the region-attributable county TCOC /
   * HCC-risk baseline (fact_county_expenditure_risk is county-keyed → a true regional fact).
   * The ACO shared-savings numbers are EXPLICITLY labeled national/ACO-wide context — NOT a
   * Baltimore P&L (prominent badge + caption). The framing guardrails are rendered on-page so
   * the caveats stay visible, not buried. Both cards open the existing secret-sauce drawer via
   * data-figure-id (aco_economics_tcoc / aco_economics_context) — no common.js change needed.
   * ============================================================ */
  var aco = sc.aco_economics;
  if (aco) {
    var COHORTS = [
      { key: "agdu", label: "Aged / dual" },
      { key: "agnd", label: "Aged / non-dual" },
      { key: "dis", label: "Disabled" },
      { key: "esrd", label: "ESRD" },
    ];
    var esc = function (s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    };
    var usd0 = function (n) { return "$" + Math.round(n).toLocaleString("en-US"); };

    /* ---- section legend ---- */
    document.getElementById("AHEAD-aco-section-legend").innerHTML = window.SR.dualLegend();

    /* ---- (1) intro + AHEAD tie-in ---- */
    document.getElementById("AHEAD-aco-intro").innerHTML =
      '<div class="small text-secondary" data-eid="AHEAD-aco-intro-note">' +
      '<i class="bi bi-info-circle me-1"></i>' + esc(aco.note) + "</div>" +
      '<div class="small fw-semibold" style="color: var(--hikari-maryland);" data-eid="AHEAD-aco-intro-tiein">' +
      '<i class="bi bi-arrow-repeat me-1"></i>' + esc(aco.ahead_tie_in) + "</div>";

    /* ============================================================
     * (2) DEFENSIBLE HERO — county TCOC & HCC risk (all 7 counties).
     * ============================================================ */
    document.getElementById("AHEAD-aco-tcoc-subtitle").textContent =
      "Per-county per-capita total-cost-of-care + average HCC risk, by beneficiary cohort — risk year " +
      aco.risk_year + ". This is the region number.";

    // region rollup summary stats (py-weighted, 6-distinct-county), one md-stat per cohort.
    var rollup = aco.region_rollup;
    var rollupStats = COHORTS.map(function (c) {
      var r = rollup[c.key];
      return (
        '<div class="col-6 col-lg-3">' +
        '  <div class="md-stat h-100">' +
        '    <div class="md-stat-value">' + usd0(r.pc) + "</div>" +
        '    <div class="md-stat-label">' + c.label + " · HCC risk " + r.risk.toFixed(3) + "</div>" +
        "  </div></div>"
      );
    }).join("");
    document.getElementById("AHEAD-aco-tcoc-rollup").innerHTML =
      '<div class="small fw-semibold mb-1"><span class="badge text-bg-success">region rollup</span> ' +
      "region-attributable (county-keyed CMS data), person-year-weighted</div>" +
      '<div class="row g-2 mb-3">' + rollupStats + "</div>" +
      '<div class="small text-muted mb-3"><i class="bi bi-diagram-3 me-1"></i>' + esc(rollup.basis) + "</div>";

    // per-county bar (per-capita $, headline cohort = aged/dual) + HCC-risk line on a 2nd axis.
    var counties = aco.county_tcoc;
    var countyNames = counties.map(function (r) {
      return r.county_name + (r.city_inherits_county ? " *" : "");
    });
    window.SR.makeChart("AHEAD-aco-tcoc-chart", {
      legend: { data: ["Per-capita TCOC (aged/dual)", "HCC risk (aged/dual)"], bottom: 0 },
      tooltip: {
        trigger: "axis",
        formatter: function (p) {
          var i = p[0].dataIndex;
          var row = counties[i];
          var lines = [
            "<b>" + row.county_name + "</b>" +
              (row.city_inherits_county ? ' <span style="color:' + window.SR.MD.color + '">(inherits Baltimore County)</span>' : ""),
          ];
          COHORTS.forEach(function (c) {
            lines.push(c.label + ": " + usd0(row["pc_" + c.key]) + " · risk " + row["risk_" + c.key].toFixed(3));
          });
          return lines.join("<br/>");
        },
      },
      grid: { left: 64, right: 56, top: 24, bottom: 64 },
      xAxis: {
        type: "category",
        data: countyNames,
        axisLabel: { interval: 0, rotate: 20, fontSize: 10 },
      },
      yAxis: [
        { type: "value", name: "$ / bene", axisLabel: { formatter: function (v) { return "$" + (v / 1000) + "k"; } } },
        { type: "value", name: "HCC risk", min: 0.7, max: 1.1, axisLabel: { formatter: "{value}" } },
      ],
      series: [
        {
          name: "Per-capita TCOC (aged/dual)",
          type: "bar",
          data: counties.map(function (r) { return Math.round(r.pc_agdu); }),
          itemStyle: { color: window.SR.MD.color },
        },
        {
          name: "HCC risk (aged/dual)",
          type: "line",
          yAxisIndex: 1,
          smooth: true,
          symbol: "circle",
          symbolSize: 7,
          data: counties.map(function (r) { return r.risk_agdu; }),
          lineStyle: { color: window.SR.HK.color, width: 3 },
          itemStyle: { color: window.SR.HK.color },
        },
      ],
    });

    // full per-county / per-cohort table (all cohorts, all 7 counties).
    var tcocHead =
      "<tr><th>County (FIPS)</th>" +
      COHORTS.map(function (c) { return '<th class="text-end">' + c.label + "<br/><span class=\"text-muted fw-normal\">$ / risk</span></th>"; }).join("") +
      "</tr>";
    var tcocRows = counties.map(function (r) {
      var flag = r.city_inherits_county
        ? ' <span class="badge text-bg-warning">inherits Baltimore County *</span>'
        : "";
      var cells = COHORTS.map(function (c) {
        return '<td class="text-end small">' + usd0(r["pc_" + c.key]) +
          ' <span class="text-muted">/ ' + r["risk_" + c.key].toFixed(3) + "</span></td>";
      }).join("");
      return '<tr><td class="small fw-semibold">' + esc(r.county_name) +
        ' <span class="text-muted fw-normal">(' + r.fips + ")</span>" + flag + "</td>" + cells + "</tr>";
    }).join("");
    document.getElementById("AHEAD-aco-tcoc-table").innerHTML =
      '<table class="table table-sm hikari-table mt-2 mb-0" data-eid="AHEAD-aco-tcoc-table-el">' +
      "<thead>" + tcocHead + "</thead><tbody>" + tcocRows + "</tbody></table>";

    document.getElementById("AHEAD-aco-tcoc-note").innerHTML =
      '<i class="bi bi-flag me-1"></i><span class="fw-semibold">* Baltimore city (24510)</span> has no independent SSA code, so it ' +
      "inherits Baltimore County (24005) values and is collapsed out of the person-year-weighted rollup to avoid " +
      "double-counting. Click this card for the full method &amp; source citation.";

    /* ============================================================
     * (3) NATIONAL CONTEXT — ACO shared-savings (explicitly labeled).
     * ============================================================ */
    var ctx = aco.aco_context;
    // prominent "national, not a metro P&L" badge — the required honesty framing, up top.
    document.getElementById("AHEAD-aco-context-badge").innerHTML =
      '<span class="badge text-bg-dark p-2" style="font-size:0.8rem;" data-eid="AHEAD-aco-context-badge-pill">' +
      '<i class="bi bi-exclamation-triangle-fill me-1"></i>National, ACO-wide context — NOT a Baltimore P&amp;L</span>';
    document.getElementById("AHEAD-aco-context-subtitle").textContent =
      "MSSP shared-savings for the ACOs that serve the metro's Medicare panel. Every dollar below is national/ACO-wide.";

    // context stat tiles (counts + national earned/generated + positive).
    function ctxStat(value, label, colCls) {
      return (
        '<div class="' + colCls + '">' +
        '  <div class="md-stat h-100" style="border-color: var(--hikari-text-muted);">' +
        '    <div class="md-stat-value" style="color: var(--hikari-text-muted);">' + value + "</div>" +
        '    <div class="md-stat-label">' + label + "</div>" +
        "  </div></div>"
      );
    }
    document.getElementById("AHEAD-aco-context-stats").innerHTML =
      '<div class="row g-2 mt-1 mb-2">' +
      ctxStat(ctx.n_region_acos.toLocaleString("en-US"), "region ACOs", "col-6 col-lg-2") +
      ctxStat(ctx.n_measurable.toLocaleString("en-US"), "measurable (rest CMS-suppressed)", "col-6 col-lg-2") +
      ctxStat(ctx.n_md_domiciled.toLocaleString("en-US"), "Maryland-domiciled", "col-6 col-lg-2") +
      ctxStat("$" + (ctx.national_earned_sum / 1e9).toFixed(2) + "B", "national earned (earn_save_loss)", "col-6 col-lg-2") +
      ctxStat("$" + (ctx.national_generated_sum / 1e9).toFixed(2) + "B", "national generated", "col-6 col-lg-2") +
      ctxStat(ctx.n_positive.toLocaleString("en-US"), "with positive savings", "col-6 col-lg-2") +
      "</div>";

    // bene-share FLOOR — labeled understated approximation (caption from data, not typed).
    document.getElementById("AHEAD-aco-floor").innerHTML =
      '<div class="alert alert-secondary py-2 px-3 mb-2" data-eid="AHEAD-aco-floor-box">' +
      '  <div class="fw-semibold"><i class="bi bi-bar-chart-steps me-1"></i>Bene-share metro FLOOR ≈ ' +
      "$" + (ctx.bene_share_floor_earned / 1e6).toFixed(1) + "M " +
      '<span class="badge text-bg-warning">understated approximation</span></div>' +
      '  <div class="small text-muted mt-1">' + esc(ctx.bene_share_floor_note) + "</div>" +
      "</div>";

    // top metro-concentrated ACOs (region bene share %, national earned $).
    var ctxRows = ctx.top_metro_concentrated.map(function (r) {
      return (
        "<tr>" +
        '<td class="small fw-semibold">' + esc(r.aco_name) + "</td>" +
        '<td class="text-end small">' + r.region_bene_share_pct.toFixed(1) + "%</td>" +
        '<td class="text-end small">' + usd0(r.national_earned) +
        ' <span class="text-muted">nat\'l</span></td>' +
        "</tr>"
      );
    }).join("");
    document.getElementById("AHEAD-aco-context-table").innerHTML =
      '<div class="small fw-semibold mb-1">Most metro-concentrated ACOs ' +
      '<span class="text-muted fw-normal">(by region beneficiary share)</span></div>' +
      '<table class="table table-sm hikari-table mb-0" data-eid="AHEAD-aco-context-table-el">' +
      '<thead><tr><th>ACO</th><th class="text-end">region bene share</th><th class="text-end">national earned</th></tr></thead>' +
      "<tbody>" + ctxRows + "</tbody></table>";

    document.getElementById("AHEAD-aco-context-note").innerHTML =
      '<i class="bi bi-slash-circle me-1"></i>' + esc(ctx.reach_note) +
      " Click this card for the full method &amp; source citation.";

    /* ============================================================
     * (4) Framing guardrails — visible on-page (honesty caveats).
     * ============================================================ */
    var guardItems = aco.framing_guardrails.map(function (g) {
      // support **bold** markers from the data without injecting raw HTML.
      var html = esc(g).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      return '<li class="mb-1">' + html + "</li>";
    }).join("");
    document.getElementById("AHEAD-aco-guardrails").innerHTML =
      '<div class="card-body">' +
      '  <h6 class="card-title mb-2"><i class="bi bi-shield-exclamation me-2" style="color: var(--hikari-maryland);"></i>' +
      "Framing guardrails — read before quoting any ACO number</h6>" +
      '  <ul class="small text-secondary mb-0" data-eid="AHEAD-aco-guardrails-list">' + guardItems + "</ul>" +
      "</div>";
  }
};
