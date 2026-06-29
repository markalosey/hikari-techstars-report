/* special_reports — GROWTH page (PAGE id: GROW).
 * The mentor-network contact list (e8 / findings 10): who's reachable through each Techstars
 * mentor in the Baltimore region, ranked by recoverable annual_oppty — plus the single strongest
 * warm path (Leigh Curl → MedStar Medical Group II, $169.8M).
 */
window.SR_PAGE = function (sc) {
  var FMT = window.SR.FMT;
  var g = sc.growth_contacts;

  document.getElementById("GROW-intro").textContent = g.intro;

  /* strongest warm path */
  var w = g.warm_path;
  document.querySelector("#GROW-warmpath .card-body").innerHTML =
    '<div class="d-flex justify-content-between align-items-start flex-wrap gap-2">' +
    '  <div>' +
    '    <div class="text-muted small text-uppercase"><i class="bi bi-stars me-1"></i>Strongest warm path</div>' +
    '    <h5 class="mb-1">' + w.mentor + ' <span class="text-muted fw-normal small">— ' + w.mentor_role + "</span></h5>" +
    '    <div class="small">' +
    '      <span class="badge bg-secondary">' + w.mentor + "</span> " +
    '      <i class="bi bi-arrow-right mx-1"></i> ' +
    '      <span class="badge" style="background: var(--hikari-group-practice); color:#03303a;">' + w.group + " (" + w.providers + " providers)</span>" +
    "    </div>" +
    "  </div>" +
    '  <div class="text-end">' +
    '    <div class="fs-3 fw-bold text-success">' + w.annual_oppty_display + "</div>" +
    '    <div class="text-muted small">recoverable / yr · org_pac_id ' + w.org_pac_id + "</div>" +
    "  </div>" +
    "</div>" +
    '<p class="text-secondary small mb-0 mt-2">' + w.note + "</p>";

  /* reach per mentor */
  var rHead = "<tr>" + g.reach_columns.map(function (c) { return "<th>" + c + "</th>"; }).join("") + "</tr>";
  var rBody = g.reach.map(function (r) {
    var zero = r.providers === 0;
    return (
      '<tr class="figure-card' + (zero ? " text-muted" : "") + '" data-figure-id="growth_reach" data-eid="GROW-reach-' +
        r.mentor.split(" ")[0].toLowerCase().replace(/[^a-z]/g, "") + '">' +
      '<td class="fw-semibold">' + r.mentor + "</td><td class=\"small\">" + r.kind + "</td>" +
      "<td>" + FMT.int(r.groups) + "</td><td>" + FMT.int(r.providers) + "</td>" +
      "<td>" + FMT.int(r.group_contacts) + "</td><td>" + FMT.int(r.provider_contacts) + "</td></tr>"
    );
  }).join("");
  document.getElementById("GROW-reach-table").innerHTML = "<thead>" + rHead + "</thead><tbody>" + rBody + "</tbody>";
  document.getElementById("GROW-carefirst-note").innerHTML = '<i class="bi bi-info-circle me-1"></i>' + g.carefirst_note;

  /* top group contacts — bar + table */
  var groups = g.groups;
  window.SR.makeChart("GROW-group-chart", {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, formatter: function (p) { return p[0].name + "<br/>" + FMT.usd(p[0].value); } },
    grid: { left: 300, right: 60, top: 10, bottom: 30 },
    xAxis: { type: "value", axisLabel: { formatter: function (v) { return "$" + v / 1e6 + "M"; } } },
    yAxis: { type: "category", data: groups.map(function (r) { return r.name; }).reverse(), axisLabel: { fontSize: 10 } },
    series: [{ type: "bar", data: groups.map(function (r) { return r.annual_oppty; }).reverse(), itemStyle: { color: "#198754" } }],
  });

  var gHead = "<tr>" + g.group_columns.map(function (c) { return "<th>" + c + "</th>"; }).join("") + "</tr>";
  var gBody = groups.map(function (r) {
    return (
      '<tr class="figure-card" data-figure-id="growth_groups" data-eid="GROW-group-' + r.org_pac_id + '">' +
      "<td><code>" + r.org_pac_id + "</code></td>" +
      '<td class="fw-semibold small">' + r.name + "</td><td class=\"small\">" + r.county + "</td>" +
      "<td>" + r.providers + "</td><td>" + FMT.int(r.panel) + "</td><td>" + r.avg_mips + "</td>" +
      '<td class="small">' + r.reach_via + '</td><td class="fw-bold">' + r.annual_oppty_display + "</td></tr>"
    );
  }).join("");
  document.getElementById("GROW-group-table").innerHTML = "<thead>" + gHead + "</thead><tbody>" + gBody + "</tbody>";
};
