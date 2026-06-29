/* special_reports — FOOTPRINT page (PAGE id: FOOT).
 * The care-management footprint: where managed care exists vs where it doesn't. Re-colors the
 * reusable metro choropleth across layers, and shows served-vs-gap per care-mgmt lever (the
 * "near-zero capture today" story). All from data/showcase.json (choropleth_layers + tam).
 */
window.SR_PAGE = function (sc) {
  var FMT = window.SR.FMT;

  /* layer toggle over the reusable choropleth */
  var LAYERS = [
    { key: "ma_pct", label: "Medicare Advantage %", palette: ["#fde2e4", "#f4978e", "#dc3545"] },
    { key: "dual_pct", label: "Dual-eligible %", palette: ["#e7f1ff", "#6ea8fe", "#0d6efd"] },
    { key: "providers", label: "Scored providers", palette: ["#e9f7ef", "#6ee7b7", "#198754"] },
    { key: "std_pymt_pc", label: "Std spend / capita", palette: ["#fff3cd", "#fd7e14", "#dc3545"] },
  ];
  var chart = window.SR.makeChart("FOOT-map", window.SR.choroptionFor(LAYERS[0].key, LAYERS[0].palette));
  var toggle = document.getElementById("FOOT-map-toggle");
  toggle.innerHTML = LAYERS.map(function (l, i) {
    return '<button type="button" class="btn btn-sm ' + (i === 0 ? "btn-primary" : "btn-outline-primary") +
      '" data-layer="' + l.key + '" data-eid="FOOT-map-toggle-' + l.key + '">' + l.label + "</button>";
  }).join("");
  toggle.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-layer]");
    if (!btn || !chart) return;
    var l = LAYERS.filter(function (x) { return x.key === btn.dataset.layer; })[0];
    chart.setOption(window.SR.choroptionFor(l.key, l.palette), true);
    toggle.querySelectorAll("button").forEach(function (b) {
      b.className = "btn btn-sm " + (b === btn ? "btn-primary" : "btn-outline-primary");
    });
  });

  /* served vs gap per lever */
  var levers = sc.tam.levers;
  function served(l) {
    if (l.lever === "CCM / APCM") return l.eligible - l.unserved; // eligible - unserved
    if (l.lever === "RPM") return l.served;
    return l.served;
  }
  function gap(l) {
    if (l.lever === "CCM / APCM") return l.unserved;
    if (l.lever === "RPM") return l.gap;
    return l.gap;
  }
  window.SR.makeChart("FOOT-capture-chart", {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { data: ["Captured today", "Open gap"], bottom: 0 },
    grid: { left: 90, right: 30, top: 20, bottom: 40 },
    xAxis: { type: "value", axisLabel: { formatter: function (v) { return FMT.int(v); } } },
    yAxis: { type: "category", data: levers.map(function (l) { return l.lever; }) },
    series: [
      { name: "Captured today", type: "bar", stack: "x", color: "#198754",
        data: levers.map(served), label: { show: true, formatter: function (p) { return FMT.int(p.value); } } },
      { name: "Open gap", type: "bar", stack: "x", color: "#dc3545",
        data: levers.map(gap) },
    ],
  });

  /* capture tiles */
  document.getElementById("FOOT-capture-tiles").innerHTML = levers.map(function (l) {
    var s = served(l), g = gap(l), tot = s + g;
    var pct = tot > 0 ? (100 * s / tot) : 0;
    return (
      '<div class="col-md-4">' +
      '  <div class="card h-100 figure-card" data-figure-id="' + l.figure_id + '" data-eid="FOOT-capture-' + l.figure_id + '">' +
      '    <div class="card-body py-2">' +
      '      <div class="text-muted small">' + l.lever + " capture</div>" +
      '      <div class="fs-4 fw-bold">' + pct.toFixed(1) + "%</div>" +
      '      <div class="small text-secondary">' + FMT.int(s) + " captured · " + FMT.int(g) + " open of " + FMT.int(tot) + "</div>" +
      '      <div class="progress mt-1" style="height:6px;"><div class="progress-bar bg-success" style="width:' + pct.toFixed(1) + '%"></div></div>' +
      "    </div></div></div>"
    );
  }).join("");
};
