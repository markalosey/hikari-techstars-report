/* special_reports — GRAPH page (PAGE id: GRAPH).
 * FalkorDB graph algorithms over the Baltimore subgraph (findings 11): edge census, degree /
 * membership centrality, communities (CDLP + WCC), drug hubs, Techstars anchor reach, and the
 * structurally-flat algorithms recorded as facts. From data/showcase.json.graph.
 */
window.SR_PAGE = function (sc) {
  var FMT = window.SR.FMT;
  var g = sc.graph;

  document.getElementById("GRAPH-census-providers").textContent = FMT.int(g.subgraph_census.region_providers);
  document.getElementById("GRAPH-census-facilities").textContent = FMT.int(g.subgraph_census.region_facilities);

  /* edge census */
  var ec = g.edge_census;
  var ecHead = "<tr>" + ec.columns.map(function (c) { return "<th>" + c + "</th>"; }).join("") + "</tr>";
  var ecBody = ec.rows.map(function (r) {
    var flag = r.complete
      ? '<span class="algo-status ok">complete</span>'
      : '<span class="algo-status flat">provisional C-5</span>';
    return "<tr><td><code>" + r.edge + "</code> " + flag + "</td><td>" + r.neighbor + "</td><td>" +
      FMT.int(r.edges) + "</td><td>" + FMT.int(r.distinct) + "</td><td>" + FMT.int(r.providers) + "</td></tr>";
  }).join("");
  document.getElementById("GRAPH-edge-census").innerHTML = "<thead>" + ecHead + "</thead><tbody>" + ecBody + "</tbody>";

  /* degree centrality (top/median/bottom) */
  var dc = g.degree_centrality;
  document.getElementById("GRAPH-degree-env").textContent =
    "N=" + FMT.int(dc.envelope.n) + " · median=" + dc.envelope.median + " · max complete leverage=" + dc.envelope.max;
  document.getElementById("GRAPH-pagerank-table").innerHTML = window.SR.tmbTable({
    columns: dc.columns,
    data: dc,
    render: function (r) {
      return (
        '<td class="figure-card" data-figure-id="graph_degree" data-eid="GRAPH-degree-' + r.npi + '">' + (r.npi || "\u2014") + "</td>" +
        '<td class="fw-semibold">' + r.name + "</td><td>" + r.city + "</td>" +
        "<td>" + (r.aco == null ? "\u2014" : r.aco) + "</td><td>" + (r.group == null ? "\u2014" : r.group) + "</td>" +
        "<td>" + (r.fac == null ? "\u2014" : r.fac) + '</td><td class="fw-bold">' + r.complete + "</td><td>" + r.provisional + "</td>"
      );
    },
  });

  /* communities (top/median/bottom) */
  var cm = g.communities;
  document.getElementById("GRAPH-community-env").textContent =
    "N=" + FMT.int(cm.envelope.n) + " communities · median=" + cm.envelope.median + " · largest=" + FMT.int(cm.envelope.max);
  document.getElementById("GRAPH-community-table").innerHTML = window.SR.tmbTable({
    columns: cm.columns,
    data: cm,
    render: function (r) {
      return '<td class="figure-card" data-figure-id="graph_community" data-eid="GRAPH-community-' + r.id + '"><code>' + r.id + "</code></td>" +
        '<td class="fw-bold">' + FMT.int(r.members) + "</td>";
    },
  });
  document.getElementById("GRAPH-wcc-note").textContent = cm.wcc_note;

  /* drug hubs (top/median/bottom) */
  var dh = g.drug_hubs;
  document.getElementById("GRAPH-drug-env").textContent =
    "N=" + dh.envelope.n + " hubs · median=" + dh.envelope.median + " · max=" + FMT.int(dh.envelope.max);
  document.getElementById("GRAPH-drug-table").innerHTML = window.SR.tmbTable({
    columns: dh.columns,
    data: dh,
    render: function (r) {
      return '<td class="fw-semibold figure-card" data-figure-id="graph_drug_hub" data-eid="GRAPH-drug-' + r.drug.split(" ")[0].toLowerCase() + '">' + r.drug + "</td>" +
        '<td class="fw-bold">' + FMT.int(r.prescribers) + "</td>";
    },
  });

  /* anchor reach */
  var ar = g.anchor_reach;
  var arHead = "<tr>" + ar.columns.map(function (c) { return "<th>" + c + "</th>"; }).join("") + "</tr>";
  var arBody = ar.rows.map(function (r) {
    return '<tr class="figure-card" data-figure-id="graph_anchor_reach" data-eid="GRAPH-anchor-' + r.anchor.split(" ")[0].toLowerCase() + '">' +
      '<td class="fw-semibold">' + r.anchor + "</td><td>" + FMT.int(r.onehop) + "</td><td>" + r.groups + "</td>" +
      "<td>" + FMT.int(r.twohop) + "</td><td>" + r.facility + "</td></tr>";
  }).join("");
  document.getElementById("GRAPH-anchor-table").innerHTML = "<thead>" + arHead + "</thead><tbody>" + arBody + "</tbody>";

  /* flat algos */
  var fa = g.flat_algos;
  document.getElementById("GRAPH-flat-table").innerHTML = fa.rows.map(function (r) {
    return '<tr class="figure-card" data-figure-id="graph_pagerank" data-eid="GRAPH-flat-' + r.algo.split(" ")[0].toLowerCase().replace(/[^a-z]/g, "") + '">' +
      '<td class="fw-semibold">' + r.algo + ' <span class="algo-status ' + r.status + '">' + r.status + "</span></td>" +
      '<td class="small">' + r.result + "</td></tr>";
  }).join("");
};
