/* special_reports — FACILITIES page (PAGE id: FAC).
 * CMS facility quality for the Baltimore metro (e7 / findings 09): discharge-weighted readmission
 * ERR + ED throughput (OP_18b), each as a top / median / bottom (C-6) table. The worst-readmission
 * hospitals are the global-budget targets — care management measurably cuts readmissions.
 */
window.SR_PAGE = function (sc) {
  var FMT = window.SR.FMT;
  var fq = sc.facility_quality;
  var res = fq.resolution;

  document.getElementById("FAC-region-n").textContent = FMT.int(res.region_facilities);
  document.getElementById("FAC-readmit-n").textContent = FMT.int(res.rankable_readmissions);
  document.getElementById("FAC-ed-n").textContent = FMT.int(res.rankable_ed);

  /* readmissions (top/median/bottom) */
  var rm = fq.readmissions;
  document.getElementById("FAC-readmit-table").innerHTML = window.SR.tmbTable({
    columns: ["CCN", "Facility", "County", "Wtd ERR", "Cohorts", "Discharges", "Readmits", "Obs %"],
    data: rm,
    render: function (r) {
      var errCls = r.err > 1.0 ? "text-danger fw-bold" : "fw-bold";
      return (
        '<td class="figure-card" data-figure-id="fac_readmissions" data-eid="FAC-readmit-' + r.ccn + '"><code>' + r.ccn + "</code></td>" +
        '<td class="fw-semibold small">' + r.name + "</td><td class=\"small\">" + r.county + "</td>" +
        '<td class="' + errCls + '">' + r.err.toFixed(4) + "</td><td>" + r.cohorts + "</td>" +
        "<td>" + FMT.int(r.discharges) + "</td><td>" + FMT.int(r.readmits) + "</td><td>" + r.obs_pct.toFixed(1) + "</td>"
      );
    },
  });
  document.getElementById("FAC-readmit-note").innerHTML =
    '<i class="bi bi-info-circle me-1"></i>' + rm.measure_note;

  /* ED throughput (top/median/bottom) */
  var ed = fq.ed;
  var cell = function (v) { return v == null ? "\u2014" : v; };
  document.getElementById("FAC-ed-table").innerHTML = window.SR.tmbTable({
    columns: ["CCN", "Facility", "County", "OP_18b min", "OP_18a", "OP_18c", "OP_22 %", "Sample"],
    data: ed,
    render: function (r) {
      return (
        '<td class="figure-card" data-figure-id="fac_ed" data-eid="FAC-ed-' + r.ccn + '"><code>' + r.ccn + "</code></td>" +
        '<td class="fw-semibold small">' + r.name + "</td><td class=\"small\">" + r.county + "</td>" +
        '<td class="fw-bold">' + r.op_18b + "</td><td>" + cell(r.op_18a) + "</td><td>" + cell(r.op_18c) + "</td>" +
        "<td>" + cell(r.op_22) + "</td><td>" + FMT.int(r.sample) + "</td>"
      );
    },
  });
  document.getElementById("FAC-ed-note").innerHTML =
    '<i class="bi bi-info-circle me-1"></i>' + ed.measure_note;

  /* -------------------------------------------------------------------------
   * Small shared helpers (Hikari CMS layer — deliberately NOT the crimson
   * md-stat treatment, which is reserved for the separate Maryland AHEAD layer).
   * ------------------------------------------------------------------------- */
  var esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };
  // Value formatter for mixed integer/float quality measures.
  var fmtVal = function (v) {
    if (v == null) return "\u2014";
    if (Number.isInteger(v)) return String(v);
    return Math.abs(v) >= 10 ? v.toFixed(1) : v.toFixed(3);
  };
  // A simple facility-colored stat tile (not the Maryland md-stat).
  var facStat = function (value, label, colCls) {
    return (
      '<div class="' + colCls + '">' +
      '  <div class="card h-100"><div class="card-body py-2">' +
      '    <div class="fs-4 fw-bold" style="color: var(--hikari-facility);">' + value + "</div>" +
      '    <div class="small text-secondary">' + label + "</div>" +
      "  </div></div></div>"
    );
  };

  /* =========================================================================
   * PANEL 1 — Hospital Quality Suite (window.SHOWCASE.facility_quality_suite)
   * ========================================================================= */
  var qs = sc.facility_quality_suite;
  if (qs) {
    document.getElementById("FAC-qs-title").textContent = qs.label;
    document.getElementById("FAC-qs-note").textContent = qs.note;

    /* ---- coverage strip: 11 tables, VBP/MSPB flagged as waived ---- */
    var covRows = qs.coverage.map(function (c) {
      var waived = c.n_region_facilities_measurable === 0;
      var badge = waived
        ? '<span class="badge text-bg-warning">waived \u2014 MD global budget</span>'
        : '<span class="badge text-bg-success">populated</span>';
      var rowCls = waived ? ' class="table-warning"' : "";
      return (
        "<tr" + rowCls + ">" +
        '<td class="small fw-semibold text-capitalize">' + esc(c.panel) + "</td>" +
        '<td class="small text-muted"><code>' + esc(c.table) + "</code></td>" +
        '<td class="small">' + esc(c.headline_measure) + "</td>" +
        '<td class="text-end small">' + FMT.int(c.n_region_facilities_measurable) + "</td>" +
        '<td class="text-end small">' + c.coverage_pct_of_region.toFixed(2) + "%</td>" +
        '<td class="text-center">' + badge + "</td>" +
        "</tr>"
      );
    }).join("");
    document.getElementById("FAC-qs-coverage").innerHTML =
      '<table class="table table-sm hikari-table mb-0" data-eid="FAC-qs-coverage-table">' +
      '<thead><tr><th>Panel</th><th>Table</th><th>Headline measure</th>' +
      '<th class="text-end">Measurable (n)</th><th class="text-end">Region coverage</th><th class="text-center">Status</th></tr></thead>' +
      "<tbody>" + covRows + "</tbody></table>";

    /* ---- concern scorecard (the acquisition-target hero) ---- */
    var scard = qs.scorecard;
    var dimLabel = {};
    scard.dimensions.forEach(function (d) { dimLabel[d.key] = d.label; });
    var nDims = scard.dimensions.length;
    var cd = scard.concern_distribution;
    document.getElementById("FAC-qs-scorecard-context").innerHTML =
      '<i class="bi bi-info-circle me-1"></i>' +
      scard.n_scored + " region hospitals scored across " + nDims +
      " dimensions \u2014 concern count median <span class=\"fw-semibold\">" + cd.median +
      "</span>, max <span class=\"fw-semibold text-danger\">" + cd.max + "</span> (mean " + cd.mean.toFixed(2) +
      "). Median facility: <span class=\"fw-semibold\">" + esc(scard.median_facility.fac_name) +
      "</span> (" + scard.median_facility.concern_count + " concerns). These are the acquisition targets \u2014 highest concern_count first.";

    var upRows = scard.underperformers.map(function (r) {
      var anchor = r.anchor
        ? ' <span class="badge text-bg-secondary">' + esc(r.anchor) + "</span>"
        : "";
      var dimBadges = (r.concern_dimensions || []).map(function (k) {
        return '<span class="badge text-bg-light border me-1" title="' + esc(dimLabel[k] || k) + '">' + esc(k) + "</span>";
      }).join("");
      var cntCls = r.concern_count >= 5 ? "text-danger fw-bold" : "fw-bold";
      return (
        "<tr>" +
        '<td class="small fw-semibold"><code>' + esc(r.ccn) + "</code> " + esc(r.fac_name) + anchor + "</td>" +
        '<td class="small">' + esc(r.county_name) + "</td>" +
        '<td class="text-center ' + cntCls + '">' + r.concern_count + " / " + nDims +
        ' <span class="text-muted fw-normal small">(' + r.concern_rate_pct.toFixed(0) + "%)</span></td>" +
        '<td class="small">' + dimBadges + "</td>" +
        "</tr>"
      );
    }).join("");
    document.getElementById("FAC-qs-scorecard").innerHTML =
      '<table class="table table-sm hikari-table mb-0" data-eid="FAC-qs-scorecard-table">' +
      '<thead><tr><th>Facility</th><th>County</th><th class="text-center">Concerns</th><th>Failing dimensions</th></tr></thead>' +
      "<tbody>" + upRows + "</tbody></table>";

    /* ---- best/worst panel highlights ---- */
    var PH = [
      { key: "star", label: "Overall star", worseIsHigh: false },
      { key: "mortality", label: "30-day mortality", worseIsHigh: true },
      { key: "hai", label: "HAI infection SIR", worseIsHigh: true },
      { key: "hcahps", label: "HCAHPS star", worseIsHigh: false },
      { key: "readmissions", label: "HRRP ERR", worseIsHigh: true },
    ];
    document.getElementById("FAC-qs-highlights").innerHTML = PH.map(function (p) {
      var h = qs.panel_highlights[p.key];
      if (!h) return "";
      return (
        '<div class="col-md-6 col-xl">' +
        '  <div class="card h-100"><div class="card-body py-2">' +
        '    <div class="small fw-semibold mb-1" style="color: var(--hikari-facility);">' + p.label + "</div>" +
        '    <div class="d-flex justify-content-between small"><span class="text-danger"><i class="bi bi-caret-down-fill me-1"></i>worst</span>' +
        '      <span class="fw-bold text-danger">' + fmtVal(h.worst.value) + "</span></div>" +
        '    <div class="text-truncate small text-muted" title="' + esc(h.worst.fac_name) + '">' + esc(h.worst.fac_name) + "</div>" +
        '    <div class="d-flex justify-content-between small mt-1"><span class="text-success"><i class="bi bi-caret-up-fill me-1"></i>best</span>' +
        '      <span class="fw-bold text-success">' + fmtVal(h.best.value) + "</span></div>" +
        '    <div class="text-truncate small text-muted" title="' + esc(h.best.fac_name) + '">' + esc(h.best.fac_name) + "</div>" +
        "  </div></div></div>"
      );
    }).join("");
  }

  /* =========================================================================
   * PANEL 2 — Facility Ownership & Readmission Spider
   * (window.SHOWCASE.facility_ownership)
   * ========================================================================= */
  var own = sc.facility_ownership;
  if (own) {
    document.getElementById("FAC-own-title").textContent = own.label;
    document.getElementById("FAC-own-note").textContent = own.note;

    /* ---- REQUIRED: prominent on-page limitations disclaimer ---- */
    document.getElementById("FAC-own-disclaimer-list").innerHTML =
      own.limitations.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("");

    /* ---- landscape stats + ownership-type mix ---- */
    var L = own.landscape;
    var landStats =
      '<div class="row g-2 mb-3">' +
      facStat(FMT.int(L.n_region_facilities_with_owner) + " / " + FMT.int(L.n_region_facilities), "region facilities with an owner edge", "col-6 col-lg-3") +
      facStat(FMT.int(L.n_ownership_edges), "ownership edges (ccn \u2192 org_npi)", "col-6 col-lg-3") +
      facStat(FMT.int(L.n_distinct_owner_org_npi), "distinct owner org NPIs", "col-6 col-lg-3") +
      facStat(FMT.int(L.n_distinct_owner_name_keys), "distinct owner name keys", "col-6 col-lg-3") +
      "</div>";
    var mixTop = own.ownership_type_mix.control_type.slice(0, 6).map(function (t) {
      return '<span class="badge text-bg-light border me-1 mb-1">' + esc(t.value) + " <span class=\"text-muted\">" + FMT.int(t.count) + "</span></span>";
    }).join("");
    document.getElementById("FAC-own-landscape").innerHTML =
      landStats +
      '<div class="small"><span class="fw-semibold me-1"><i class="bi bi-pie-chart me-1"></i>Control-type mix (top):</span>' + mixTop + "</div>";

    /* ---- top owners + hubs ---- */
    document.getElementById("FAC-own-hubs").innerHTML =
      "&middot; " + FMT.int(own.hubs.n_hubs) + " ownership hubs \u00b7 largest: " +
      esc(own.hubs.largest.display_name) + " (" + own.hubs.largest.n_region_facilities + ")";
    var topRows = own.top_owners.map(function (o) {
      return (
        "<tr>" +
        '<td class="small fw-semibold">' + esc(o.display_name) + "</td>" +
        '<td class="text-end small fw-bold">' + o.n_region_facilities + "</td>" +
        "</tr>"
      );
    }).join("");
    document.getElementById("FAC-own-top").innerHTML =
      '<table class="table table-sm hikari-table mb-0" data-eid="FAC-own-top-table">' +
      '<thead><tr><th>Owner (immediate corporation)</th><th class="text-end">Region facilities</th></tr></thead>' +
      "<tbody>" + topRows + "</tbody></table>";

    /* ---- spider: worst-ERR facilities + owners ---- */
    document.getElementById("FAC-own-spider-subtitle").textContent =
      own.spider_worst_facilities.length + " rankable region facilities by discharge-weighted HRRP ERR, linked to owner \u2014 the customer-acquisition feed.";
    var spiderRows = own.spider_worst_facilities.map(function (r) {
      var errCls = r.weighted_err > 1.0 ? "text-danger fw-bold" : "fw-bold";
      var flag = r.worse_than_expected
        ? '<span class="badge text-bg-danger">worse than expected</span>'
        : '<span class="badge text-bg-light border">as/better</span>';
      return (
        "<tr>" +
        '<td class="small fw-semibold"><code>' + esc(r.ccn) + "</code> " + esc(r.fac_name) + "</td>" +
        '<td class="small">' + esc(r.county_name) + "</td>" +
        '<td class="text-end ' + errCls + '">' + r.weighted_err.toFixed(4) + "</td>" +
        '<td class="text-center">' + flag + "</td>" +
        '<td class="small text-muted">' + esc((r.owners || []).join("; ")) + "</td>" +
        "</tr>"
      );
    }).join("");
    document.getElementById("FAC-own-spider").innerHTML =
      '<table class="table table-sm hikari-table mb-0" data-eid="FAC-own-spider-table">' +
      '<thead><tr><th>Facility</th><th>County</th><th class="text-end">Wtd ERR</th><th class="text-center">Flag</th><th>Owner</th></tr></thead>' +
      "<tbody>" + spiderRows + "</tbody></table>";

    /* ---- owner readmission exposure (top by mean ERR) ---- */
    var expRows = own.owner_readmission_exposure.map(function (o) {
      var errCls = o.mean_err > 1.0 ? "text-danger fw-bold" : "fw-bold";
      return (
        "<tr>" +
        '<td class="small">' + esc(o.owner) + "</td>" +
        '<td class="text-end ' + errCls + '">' + o.mean_err.toFixed(3) + "</td>" +
        "</tr>"
      );
    }).join("");
    document.getElementById("FAC-own-exposure").innerHTML =
      '<div class="small fw-semibold mb-1"><i class="bi bi-graph-up me-1"></i>Owner ERR exposure (mean)</div>' +
      '<table class="table table-sm hikari-table mb-0" data-eid="FAC-own-exposure-table">' +
      '<thead><tr><th>Owner</th><th class="text-end">mean ERR</th></tr></thead>' +
      "<tbody>" + expRows + "</tbody></table>";

    /* ---- anchor footprint (Hopkins / MedStar / UMMS) ---- */
    var ANCHORS = ["Johns Hopkins", "MedStar", "University of Maryland / UMMS"];
    var anchorCards = ANCHORS.map(function (name) {
      var a = own.anchor_footprint[name];
      if (!a) return "";
      var errMean = a.err_mean == null ? "\u2014" : a.err_mean.toFixed(4);
      var facs = (a.facilities || []).map(function (f) {
        return '<li class="small">' + esc(f.fac_name) + " <span class=\"text-muted\">" +
          (f.weighted_err == null ? "(no ERR)" : "ERR " + f.weighted_err.toFixed(4)) + "</span></li>";
      }).join("");
      var medstarNote = (name === "MedStar" && a.n_region_facilities === 0)
        ? '<div class="small text-warning mt-1"><i class="bi bi-info-circle me-1"></i>Shows 0 by owner-name \u2014 the edge names the individual hospital corporation, not the MedStar parent (limitation #2). MedStar hospitals appear individually in the spider above.</div>'
        : "";
      return (
        '<div class="col-md-4">' +
        '  <div class="card h-100"><div class="card-body py-2">' +
        '    <div class="fw-semibold" style="color: var(--hikari-facility);">' + esc(name) + "</div>" +
        '    <div class="small text-secondary mb-1">' + a.n_region_facilities + " region facilities \u00b7 " +
        a.n_facilities_with_err + " with ERR \u00b7 mean ERR <span class=\"fw-bold\">" + errMean + "</span></div>" +
        (facs ? '<ul class="mb-0 ps-3">' + facs + "</ul>" : "") +
        medstarNote +
        "  </div></div></div>"
      );
    }).join("");
    document.getElementById("FAC-own-anchor").innerHTML =
      '<div class="small fw-semibold mb-2"><i class="bi bi-buildings me-1"></i>Anchor-system owned-facility footprint</div>' +
      '<div class="row g-2">' + anchorCards + "</div>";
  }
};
