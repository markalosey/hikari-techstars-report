/* special_reports — TARGETS page (PAGE id: TGT).
 * Group practices and providers ranked by recoverable $ — top/median/bottom (C-6) — plus the
 * group-opportunity bar and the pre-fit caveat. From data/showcase.json target_groups + target_providers.
 */
window.SR_PAGE = function (sc) {
  var FMT = window.SR.FMT;
  var grp = sc.target_groups;
  var prov = sc.target_providers;

  document.getElementById("TGT-groups-n").textContent = FMT.int(grp.n);
  document.getElementById("TGT-providers-n").textContent = FMT.int(prov.n);
  document.getElementById("TGT-solo-oppty").textContent = grp.solo_unassigned.annual_oppty_display;
  document.getElementById("TGT-fit-caveat").textContent = prov.fit_caveat;

  /* missing-quality (no MIPS) panel — choropleth recolor (red = absence of quality) + tiles + table */
  var mq = sc.missing_quality;
  document.getElementById("TGT-missingq-headline").innerHTML =
    '<strong class="text-danger">' + mq.region_pct + "%</strong> \u2014 " + mq.headline +
    " (" + FMT.int(mq.region_missing) + " of " + FMT.int(mq.region_providers) + " region providers).";
  // Re-color the metro choropleth on the missing-MIPS % layer (red ramp = worse coverage).
  window.SR.makeChart("TGT-missingq-map", window.SR.choroptionFor(mq.choropleth_layer, ["#fff5f5", "#f1948a", "#c0392b"]));

  document.getElementById("TGT-missingq-tiles").innerHTML =
    '<div class="col-6 col-xl-3"><div class="md-stat h-100" data-eid="TGT-missingq-region">' +
    '  <div class="md-stat-value" style="color: var(--hikari-quality-poor);">' + mq.region_pct + '%</div>' +
    '  <div class="md-stat-label">region providers with no MIPS score</div></div></div>' +
    '<div class="col-6 col-xl-3"><div class="md-stat h-100" data-eid="TGT-missingq-region-count">' +
    '  <div class="md-stat-value" style="color: var(--hikari-quality-poor);">' + FMT.int(mq.region_missing) + '</div>' +
    '  <div class="md-stat-label">providers missing a quality score</div></div></div>' +
    '<div class="col-6 col-xl-3"><div class="md-stat h-100 figure-card" data-figure-id="missing_quality" data-eid="TGT-missingq-city">' +
    '  <div class="md-stat-value" style="color: var(--hikari-quality-poor);">' + FMT.int(mq.baltimore_city_missing) + '</div>' +
    '  <div class="md-stat-label">Baltimore city missing (largest cluster)</div></div></div>' +
    '<div class="col-6 col-xl-3"><div class="md-stat h-100" data-eid="TGT-missingq-ahead">' +
    '  <div class="md-stat-value" style="color: var(--hikari-maryland);">EPCP</div>' +
    '  <div class="md-stat-label">AHEAD Quality-Based Adjustment rewards closing this</div></div></div>';

  var mqHead = "<tr>" + mq.columns.map(function (c) { return "<th>" + c + "</th>"; }).join("") + "</tr>";
  var mqBody = mq.rows.map(function (r) {
    return (
      '<tr class="figure-card" data-figure-id="missing_quality" data-eid="TGT-missingq-' + r.fips + '">' +
      '<td class="fw-semibold">' + r.name + "</td><td>" + FMT.int(r.providers) + "</td>" +
      "<td>" + FMT.int(r.missing) + '</td><td class="fw-bold text-danger">' + r.missing_pct + "</td>" +
      "<td>" + FMT.int(r.chronic_missing) + "</td></tr>"
    );
  }).join("");
  document.getElementById("TGT-missingq-table").innerHTML = "<thead>" + mqHead + "</thead><tbody>" + mqBody + "</tbody>";

  /* group opportunity bar (top 8) */
  var top8 = grp.top.slice(0, 8);
  window.SR.makeChart("TGT-group-chart", {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, formatter: function (p) { return p[0].name + "<br/>" + FMT.usd(p[0].value); } },
    grid: { left: 240, right: 50, top: 10, bottom: 30 },
    xAxis: { type: "value", axisLabel: { formatter: function (v) { return "$" + v / 1e6 + "M"; } } },
    yAxis: { type: "category", data: top8.map(function (g) { return g.name; }).reverse(), axisLabel: { fontSize: 10 } },
    series: [{ type: "bar", data: top8.map(function (g) { return g.annual_oppty; }).reverse() }],
  });

  /* groups table (top/median/bottom) */
  document.getElementById("TGT-groups-table").innerHTML = window.SR.tmbTable({
    columns: ["Group practice", "County", "Providers", "Panel", "Avg MIPS", "Annual oppty"],
    data: grp,
    render: function (r) {
      return (
        '<td class="fw-semibold figure-card" data-figure-id="groups_table" data-eid="TGT-group-' + r.org_pac_id + '">' + r.name + "</td>" +
        "<td>" + r.county + "</td><td>" + r.providers + "</td><td>" + FMT.int(r.panel) + "</td>" +
        "<td>" + (r.avg_mips == null ? "\u2014" : r.avg_mips) + '</td><td class="fw-bold">' + r.annual_oppty_display + "</td>"
      );
    },
  });

  /* providers table (top/median/bottom) */
  document.getElementById("TGT-providers-table").innerHTML = window.SR.tmbTable({
    columns: ["Name", "Specialty", "County", "Panel", "Dual %", "Risk", "Chronic %", "Eligible CCM", "Billed", "MIPS", "Annual oppty"],
    data: prov,
    render: function (r) {
      return (
        '<td class="fw-semibold figure-card" data-figure-id="providers_table" data-eid="TGT-provider-' + r.npi + '">' + r.name + "</td>" +
        '<td class="small">' + r.spec + "</td><td>" + r.county + "</td><td>" + FMT.int(r.panel) + "</td>" +
        "<td>" + r.dual_pct + "</td><td>" + r.risk + "</td><td>" + r.chronic_pct + "</td>" +
        "<td>" + FMT.int(r.eligible_ccm) + "</td><td>" + r.billed + "</td><td>" + (r.mips == null ? "\u2014" : r.mips) + "</td>" +
        '<td class="fw-bold">' + r.annual_oppty_display + "</td>"
      );
    },
  });
};
