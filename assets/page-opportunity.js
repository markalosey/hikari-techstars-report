/* special_reports — OPPORTUNITY page (PAGE id: OPP).
 * Population-anchored care-management TAM: headline + CCM/RPM/TCM lever decomposition,
 * per-lever cards, count-only add-ons, and the double-count cross-check note.
 */
window.SR_PAGE = function (sc) {
  var FMT = window.SR.FMT;
  var tam = sc.tam;

  document.getElementById("OPP-tam-total").textContent = tam.headline_display;
  document.getElementById("OPP-tam-total").parentElement.dataset.figureId = tam.figure_id;
  document.getElementById("OPP-ffs-benes").textContent = FMT.int(tam.region_ffs_benes);
  document.getElementById("OPP-total-benes").textContent = FMT.int(tam.region_total_benes);
  document.getElementById("OPP-discharge").textContent = FMT.int(tam.region_discharge_episodes);

  /* lever cards */
  var iconFor = { "CCM / APCM": "bi-clipboard2-pulse", "RPM": "bi-activity", "TCM": "bi-arrow-left-right" };
  document.getElementById("OPP-levers").innerHTML = tam.levers.map(function (l) {
    var detail = "";
    if (l.lever === "CCM / APCM") detail = FMT.int(l.eligible) + " eligible · " + FMT.int(l.unserved) + " unserved · " + l.rate_display;
    else if (l.lever === "RPM") detail = FMT.int(l.eligible) + " eligible · " + FMT.int(l.gap) + " gap · " + l.rate_display;
    else detail = FMT.int(l.episodes) + " episodes · " + FMT.int(l.gap) + " gap · " + l.rate_display;
    return (
      '<div class="col-md-4">' +
      '  <div class="card h-100 figure-card" data-figure-id="' + l.figure_id + '" data-eid="OPP-lever-' + l.figure_id + '">' +
      '    <div class="kpi-band"></div>' +
      '    <div class="card-body">' +
      '      <div class="text-muted small"><i class="bi ' + (iconFor[l.lever] || "bi-cash") + ' me-1"></i>' + l.lever + "</div>" +
      '      <div class="fs-3 fw-bold text-success">' + l.result_display + "</div>" +
      '      <div class="small text-secondary">' + detail + "</div>" +
      "    </div></div></div>"
    );
  }).join("");

  /* lever bar */
  window.SR.makeChart("OPP-lever-chart", {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, formatter: function (p) { return p[0].name + "<br/>" + FMT.usd(p[0].value); } },
    grid: { left: 100, right: 110, top: 10, bottom: 30 },
    xAxis: { type: "value", axisLabel: { formatter: function (v) { return "$" + v / 1e6 + "M"; } } },
    yAxis: { type: "category", data: tam.levers.map(function (l) { return l.lever; }) },
    series: [{ type: "bar", data: tam.levers.map(function (l) { return l.result_usd; }),
      label: { show: true, position: "right", formatter: function (p) { return FMT.usd(p.value); } } }],
  });

  /* add-ons (count-only / not in headline) */
  document.getElementById("OPP-addons").innerHTML = tam.add_ons.map(function (a) {
    return (
      '<div class="col-md-4">' +
      '  <div class="card h-100 outlier-pending" data-eid="OPP-addon-' + a.label.split(" ")[0].toLowerCase() + '">' +
      '    <div class="card-body py-2">' +
      '      <div class="text-muted small">' + a.label + "</div>" +
      '      <div class="fw-semibold">' + a.value_display + "</div>" +
      '      <div class="small text-muted">' + a.note + "</div>" +
      "    </div></div></div>"
    );
  }).join("");

  document.getElementById("OPP-crosscheck").textContent = tam.cross_check_note;
};
