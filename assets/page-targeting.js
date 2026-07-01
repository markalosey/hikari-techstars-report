/* special_reports — IDEAL FIRST CUSTOMERS page (PAGE id: IFC).
 * The targeting story: region providers scored on NEED x CAPTURE-GAP x LEVERAGE, gated to the
 * care-management-amenable set (E6 fit), narrowed to the ideal-first-customers cohort. Four-layer
 * pattern: answer card -> fit funnel -> axes/weights explainer -> ideal-customers + leverage tables.
 * From data/showcase.json.targeting (funnel / axes / ideal_first_customers / top_to_know / c6).
 */
window.SR_PAGE = function (sc) {
  var FMT = window.SR.FMT;
  var t = sc.targeting;
  var f = t.funnel;
  var ax = t.axes;

  /* ---------------- Layer 1 — answer card ---------------- */
  document.getElementById("IFC-subtitle").textContent = t.label;
  document.getElementById("IFC-answer-n").textContent = FMT.int(f.ideal_first_customers);
  document.getElementById("IFC-answer-note").textContent = t.note;

  /* ---------------- Layer 2 — fit funnel ---------------- */
  window.SR.makeChart("IFC-funnel-chart", {
    tooltip: {
      trigger: "item",
      formatter: function (p) { return p.name + "<br/>" + FMT.int(p.value) + " providers"; },
    },
    series: [{
      type: "funnel",
      left: "8%", right: "8%", top: 10, bottom: 10,
      minSize: "24%", maxSize: "100%",
      sort: "descending",
      gap: 4,
      label: {
        show: true, position: "inside", fontSize: 12, fontWeight: "bold",
        formatter: function (p) { return p.name + ": " + FMT.int(p.value); },
      },
      labelLine: { show: false },
      data: [
        { value: f.scored, name: "Scored" },
        { value: f.amenable, name: "Amenable (E6 fit)" },
        { value: f.ideal_first_customers, name: "Ideal first customers" },
      ],
    }],
  });
  document.getElementById("IFC-funnel-removed").innerHTML =
    "<i class=\"bi bi-funnel-fill me-1\"></i>" + FMT.int(f.removed_non_amenable) +
    " scored providers removed by the E6 fit gate (not care-management-amenable) \u2014 " +
    FMT.int(f.scored) + " scored \u2192 " + FMT.int(f.amenable) + " amenable \u2192 " +
    FMT.int(f.ideal_first_customers) + " ideal first customers.";

  /* ---------------- Layer 3 — axes / weights explainer ---------------- */
  var pct = function (w) { return Math.round(w * 100) + "%"; };
  var axisCards = [
    { eid: "IFC-axis-need", label: "NEED", weight: ax.need_weight, icon: "bi-heart-pulse",
      desc: "dual / risk / chronic / panel" },
    { eid: "IFC-axis-gap", label: "CAPTURE-GAP", weight: ax.gap_weight, icon: "bi-piggy-bank",
      desc: "care-mgmt capture gap + MIPS" },
    { eid: "IFC-axis-leverage", label: "LEVERAGE", weight: ax.leverage_weight, icon: "bi-diagram-3",
      desc: "MEMBER_OF + BILLS_THROUGH degree (E3)" },
  ];
  document.getElementById("IFC-axes").innerHTML = axisCards.map(function (a) {
    return (
      '<div class="col-md-4"><div class="card h-100" data-eid="' + a.eid + '">' +
      '  <div class="card-body py-3">' +
      '    <div class="d-flex justify-content-between align-items-start">' +
      '      <div class="text-uppercase small fw-semibold text-muted"><i class="bi ' + a.icon +
      ' me-1"></i>' + a.label + "</div>" +
      '      <div class="fs-4 fw-bold" style="color: var(--hikari-aco);">' + pct(a.weight) + "</div>" +
      "    </div>" +
      '    <div class="small text-secondary mt-1">' + a.desc + "</div>" +
      "  </div></div></div>"
    );
  }).join("");

  document.getElementById("IFC-fit-gate").textContent = ax.fit_gate_rule;
  document.getElementById("IFC-ideal-rule").textContent =
    ax.ideal_rule + "  (p75 annual_oppty = " + FMT.usd(ax.annual_oppty_p75_usd) +
    "; nonzero-median complete_leverage = " + ax.complete_leverage_nonzero_median + ").";

  /* ---------------- fit-flag badges ---------------- */
  function fitBadges(r) {
    var out = "";
    if (r.is_high_chronic_prescriber) {
      out += '<span class="badge text-bg-warning me-1">chronic-Rx</span>';
    }
    if (r.is_high_opioid_prescriber) {
      out += '<span class="badge text-bg-danger me-1">opioid-Rx</span>';
    }
    if (r.is_missing_quality) {
      out += '<span class="badge text-bg-secondary me-1">missing-MIPS</span>';
    }
    return out || '<span class="text-muted">\u2014</span>';
  }
  function leverageCell(r) {
    return r.aco_degree + "/" + r.group_degree + " \u2192 <span class=\"fw-bold\">" + r.complete_leverage + "</span>";
  }
  function specCell(r) { return r.specialty_family || "\u2014"; }

  /* ---------------- multi-ACO "bridge" badge (aco_degree >= 2) ----------------
   * Providers spanning >1 ACO are the network bridges (e14: 137 region providers span >1 ACO,
   * up to 12) — multi-ACO membership = higher propagation leverage. Reads existing aco_degree. */
  function bridgeBadge(r) {
    if (r.aco_degree >= 2) {
      return (
        ' <span class="badge rounded-pill text-bg-info align-middle" data-eid="IFC-bridge-' + r.npi +
        '" title="member of ' + r.aco_degree +
        ' ACOs \u2014 high-propagation connector"><i class="bi bi-diagram-2 me-1"></i>multi-ACO</span>'
      );
    }
    return "";
  }

  /* ---------------- Layer 4 — ideal first customers table ---------------- */
  var idealHead =
    "<tr><th>NPI</th><th>Name</th><th>Specialty</th><th>County</th><th>Panel</th>" +
    "<th>Annual oppty</th><th>Leverage (aco/grp\u2192complete)</th><th>Composite</th><th>Fit flags</th></tr>";
  var idealBody = t.ideal_first_customers.map(function (r) {
    return (
      '<tr data-eid="IFC-ideal-' + r.npi + '">' +
      '<td><code>' + r.npi + "</code></td>" +
      '<td class="fw-semibold">' + r.name + bridgeBadge(r) + "</td>" +
      '<td class="small">' + specCell(r) + "</td>" +
      "<td>" + r.county_name + "</td>" +
      "<td>" + FMT.int(r.panel_beneficiaries) + "</td>" +
      '<td class="fw-bold">' + FMT.usd(r.annual_oppty) + "</td>" +
      "<td>" + leverageCell(r) + "</td>" +
      "<td>" + r.composite_score.toFixed(3) + "</td>" +
      '<td class="small">' + fitBadges(r) + "</td></tr>"
    );
  }).join("");
  document.getElementById("IFC-ideal-table").innerHTML =
    "<thead>" + idealHead + "</thead><tbody>" + idealBody + "</tbody>";

  var ci = t.c6.ideal;
  document.getElementById("IFC-ideal-c6").innerHTML =
    "<i class=\"bi bi-info-circle me-1\"></i><strong>C-6 context:</strong> n=" + FMT.int(ci.n) +
    " ideal first customers \u00b7 median annual oppty " + FMT.usd(ci.median_annual_oppty) +
    " \u00b7 range " + FMT.usd(ci.min_annual_oppty) + " \u2013 " + FMT.usd(ci.max_annual_oppty) +
    ". Table shows the top 15 by annual_oppty.";

  /* multi-ACO "bridge" caption — injected under the ideal-customers table (no HTML change). */
  document.getElementById("IFC-ideal-c6").insertAdjacentHTML(
    "afterend",
    '<p class="text-muted small mb-4" data-eid="IFC-ideal-bridge-note">' +
    '<span class="badge rounded-pill text-bg-info me-1"><i class="bi bi-diagram-2 me-1"></i>multi-ACO</span>' +
    "Rows flagged <strong>multi-ACO</strong> (<code>aco_degree \u2265 2</code>) are network " +
    "<em>bridge</em> providers spanning more than one ACO \u2014 e14 finds 137 region providers span &gt;1 " +
    "ACO (up to 12). Multi-ACO membership = higher propagation leverage: a single warm intro reaches " +
    "several ACO care networks at once.</p>"
  );

  /* ---------------- "Top providers to KNOW" leverage table ---------------- */
  var knowHead =
    "<tr><th>NPI</th><th>Name</th><th>Specialty</th><th>County</th><th>ACO deg</th>" +
    "<th>Group deg</th><th>Complete leverage</th><th>Annual oppty</th></tr>";
  var knowBody = t.top_to_know.map(function (r) {
    return (
      '<tr data-eid="IFC-toknow-' + r.npi + '">' +
      '<td><code>' + r.npi + "</code></td>" +
      '<td class="fw-semibold">' + r.name + bridgeBadge(r) + "</td>" +
      '<td class="small">' + specCell(r) + "</td>" +
      "<td>" + r.county_name + "</td>" +
      "<td>" + r.aco_degree + "</td>" +
      "<td>" + r.group_degree + "</td>" +
      '<td class="fw-bold">' + r.complete_leverage + "</td>" +
      "<td>" + FMT.usd(r.annual_oppty) + "</td></tr>"
    );
  }).join("");
  document.getElementById("IFC-toknow-table").innerHTML =
    "<thead>" + knowHead + "</thead><tbody>" + knowBody + "</tbody>";

  document.getElementById("IFC-toknow-note").innerHTML =
    "<i class=\"bi bi-lightbulb me-1\"></i>Highest-leverage amenable providers = highest-propagation entry " +
    "points: a single warm intro reaches the most connected care network (top 15 amenable by " +
    "<code>complete_leverage</code>, tiebreak annual_oppty).";
};
