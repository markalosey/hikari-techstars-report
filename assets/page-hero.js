/* special_reports — HERO page (PAGE id: HERO).
 * Metro-as-entity: profile choropleth + verdict + KPI tiles + outlier slot + 7-county table,
 * plus the Techstars hero card (HERO-techstars-card) that opens the shared roster drawer.
 */
window.SR_PAGE = function (sc) {
  var FMT = window.SR.FMT;
  var h = sc.hero;

  /* verdict + headline */
  document.getElementById("HERO-verdict").textContent = h.verdict;
  document.getElementById("HERO-headline-value").textContent = FMT.usd(h.headline_stat.value_usd);
  document.getElementById("HERO-headline-card").dataset.figureId = h.headline_stat.figure_id;
  document.getElementById("HERO-location").textContent = h.location_line;

  /* KPI tiles */
  function arrow(a) {
    if (a === "up") return '<span class="vs-up">\u25B2</span>';
    if (a === "down") return '<span class="vs-down">\u25BC</span>';
    if (a === "par") return '<span class="vs-par">\u2248</span>';
    return '<span class="vs-par">\u2022</span>';
  }
  document.getElementById("HERO-kpis").innerHTML = h.kpis.map(function (k) {
    var vs = k.arrow === "scale"
      ? '<span class="text-muted small">' + (k.sub || "") + "</span>"
      : arrow(k.arrow) + ' <span class="small text-muted">' + k.delta_display + " vs nation (" + k.national_display + ")</span>";
    return (
      '<div class="col-6 col-md-4 col-lg-3">' +
      '  <div class="card h-100 figure-card" data-figure-id="' + k.figure_id + '" data-eid="HERO-kpi-' + k.key + '">' +
      '    <div class="kpi-band"></div>' +
      '    <div class="card-body py-2">' +
      '      <div class="text-muted small"><i class="bi ' + k.icon + ' me-1"></i>' + k.label + "</div>" +
      '      <div class="fs-4 fw-bold">' + k.display + "</div>" +
      "      <div>" + vs + "</div>" +
      "    </div></div></div>"
    );
  }).join("");

  /* outlier slot — real national per-metro outliers (e11 / findings 13) */
  document.getElementById("HERO-outliers").innerHTML = h.outlier_stats.map(function (o) {
    return (
      '<div class="col-12 col-md-4">' +
      '  <div class="card h-100 figure-card" data-figure-id="' + o.figure_id + '" data-eid="HERO-outlier-' + o.eid + '">' +
      '    <div class="kpi-band" style="background: var(--hikari-service);"></div>' +
      '    <div class="card-body py-2">' +
      '      <div class="text-muted small"><i class="bi ' + o.icon + ' me-1"></i>' + o.label + "</div>" +
      '      <div class="fs-5 fw-bold">' + o.value_display + "</div>" +
      '      <div class="fw-semibold text-danger small">' + o.headline + "</div>" +
      '      <div class="text-secondary small mt-1">' + o.detail + "</div>" +
      "    </div></div></div>"
    );
  }).join("");

  /* story-of-time sparkline row (e12 / findings 14) */
  var sparks = sc.temporal.series;
  document.getElementById("HERO-sparklines").innerHTML = sparks.map(function (s) {
    var up = s.direction === "increasing";
    var deltaCls = up ? "spark-delta-up" : "spark-delta-down";
    var arrow = up ? "\u25B2" : "\u25BC";
    return (
      '<div class="col-6 col-md-3">' +
      '  <div class="card h-100 spark-card figure-card" data-figure-id="' + s.figure_id + '" data-eid="HERO-spark-' + s.eid + '">' +
      '    <div class="card-body py-2">' +
      '      <div class="text-muted small"><i class="bi ' + s.icon + ' me-1"></i>' + s.label + "</div>" +
      '      <div class="d-flex align-items-baseline justify-content-between">' +
      '        <span class="fs-5 ' + deltaCls + '">' + arrow + " " + s.pct_display + "</span>" +
      '        <span class="text-muted small">' + s.end_display + "</span>" +
      "      </div>" +
      '      <div id="HERO-spark-chart-' + s.eid + '" class="spark-chart" data-eid="HERO-spark-chart-' + s.eid + '"></div>' +
      "    </div></div></div>"
    );
  }).join("");
  sparks.forEach(function (s) {
    var up = s.direction === "increasing";
    var color = up ? "#e85d04" : "#0d6efd";
    window.SR.makeChart("HERO-spark-chart-" + s.eid, {
      grid: { left: 2, right: 2, top: 4, bottom: 2 },
      xAxis: { type: "category", show: false, data: s.years, boundaryGap: false },
      yAxis: { type: "value", show: false, scale: true },
      tooltip: {
        trigger: "axis",
        formatter: function (p) {
          var v = p[0].value;
          var disp = s.kind === "count" ? FMT.int(v) : v.toFixed(1) + (s.kind === "per1k" ? "" : "%");
          return s.years[p[0].dataIndex] + ": " + disp;
        },
      },
      series: [{
        type: "line", data: s.values, smooth: true, symbol: "none",
        lineStyle: { color: color, width: 2 },
        areaStyle: { color: color, opacity: 0.08 },
      }],
    });
  });

  /* profile choropleth — provider density (the "who's here" view) */
  window.SR.makeChart("HERO-profile-map", window.SR.choroptionFor("providers", ["#e7f1ff", "#6ea8fe", "#0d6efd"]));

  /* 7-county profile table */
  var t = sc.counties_table;
  var head = "<tr>" + t.columns.map(function (c) { return "<th>" + c + "</th>"; }).join("") + "</tr>";
  var cell = function (v) { return v == null ? "\u2014" : v; };
  function rowHtml(r, cls) {
    return (
      '<tr class="' + cls + '">' +
      '<td class="fw-semibold">' + r.name + "</td><td>" + r.fips + "</td><td>" + FMT.int(r.tot_benes) + "</td>" +
      "<td>" + cell(r.dual_pct) + "</td><td>" + cell(r.disabled_pct) + "</td><td>" + cell(r.ma_pct) + "</td>" +
      "<td>" + cell(r.pct_uninsured) + "</td><td>" + cell(r.pc_hpsa) + "</td><td>" + cell(r.mh_hpsa) + "</td>" +
      "<td>$" + FMT.int(r.std_pymt_pc) + "</td><td>" + cell(r.risk) + "</td><td>" + cell(r.ed1k) + "</td>" +
      "<td>" + cell(r.readmit_pct) + "</td><td>" + cell(r.opioid_rate) + "</td></tr>"
    );
  }
  var body = t.rows.map(function (r) { return rowHtml(r, ""); }).join("") +
    rowHtml(t.metro_aggregate, "row-top fw-bold") +
    rowHtml(t.national_benchmark, "row-bottom fw-bold");
  document.getElementById("HERO-county-table").innerHTML = "<thead>" + head + "</thead><tbody>" + body + "</tbody>";

  /* Techstars hero card */
  var tc = sc.techstars_card;
  var pills = tc.pills.map(function (p) {
    return '<span class="stat-pill" data-eid="HERO-techstars-pill-' + p.label.split(" ")[0].toLowerCase() + '">' +
      '<i class="bi ' + p.icon + '"></i>' + p.value + ' <span class="text-muted fw-normal">' + p.label + "</span></span>";
  }).join(" ");
  document.getElementById("HERO-techstars-card").innerHTML =
    '<div class="kpi-band"></div>' +
    '<div class="card-body">' +
    '  <div class="d-flex justify-content-between align-items-start flex-wrap">' +
    '    <div><h5 class="card-title mb-1"><i class="bi bi-rocket-takeoff me-2" style="color: var(--hikari-aco);"></i>' + tc.label + "</h5>" +
    '      <div class="text-muted small mb-2">' + tc.tagline + "</div></div>" +
    '    <span class="badge bg-aco align-self-start"><i class="bi bi-people-fill me-1"></i>Click → roster</span>' +
    "  </div>" +
    '  <div class="d-flex flex-wrap gap-2 mb-2">' + pills + "</div>" +
    '  <div class="text-muted small">' + tc.anchors_note + "</div>" +
    "</div>";
};
