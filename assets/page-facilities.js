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
};
