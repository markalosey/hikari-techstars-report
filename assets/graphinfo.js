/* special_reports — persistent "Graph & MECS" proof/education side tab (spec §4h).
 *
 * Docked on EVERY page: a fixed graph-symbol tab on the right edge opens a Bootstrap
 * offcanvas drawer of pretty cards that are BOTH proof and education —
 *   GRAPHINFO-subgraph     why & how we built the Baltimore sub-graph + its census
 *   GRAPHINFO-queries      counts of stored .sql/.cypher + experiments (traceability)
 *   GRAPHINFO-graph-design hikari_national node labels + edge types (with counts)
 *   GRAPHINFO-mecs         the dim_ / fact_ Multi-Entity-Centered Star schema (DuckDB/Parquet)
 *
 * Data-driven: everything comes from window.SHOWCASE.graphinfo (embedded by
 * data/showcase.data.js — NO fetch). Every rendered element carries a unique
 * data-eid="GRAPHINFO-<thing>". Built once here so all pages get it; include this
 * AFTER data/showcase.data.js and after the Bootstrap bundle.
 */
(function () {
  "use strict";

  function intc(n) {
    return typeof n === "number" ? n.toLocaleString("en-US") : n;
  }

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  /* ---------------- fixed side tab + drawer shell ---------------- */
  function ensureTab() {
    if (document.getElementById("graphinfo-tab")) return;

    var tab = el(
      '<button type="button" id="graphinfo-tab" class="graphinfo-tab" ' +
        'data-eid="GRAPHINFO-tab" title="Graph & MECS — how this is built" ' +
        'aria-label="Open Graph & MECS proof drawer">' +
        '<i class="bi bi-diagram-3 fs-5"></i>' +
        '<span class="graphinfo-tab-label">Graph &amp; MECS</span>' +
        "</button>"
    );

    var drawer = el(
      '<div class="offcanvas offcanvas-end graphinfo-drawer" tabindex="-1" ' +
        'id="graphinfo-drawer" data-eid="GRAPHINFO-drawer" aria-labelledby="graphinfo-title">' +
        '  <div class="offcanvas-header border-bottom">' +
        "    <div>" +
        '      <h5 class="offcanvas-title mb-0" id="graphinfo-title">' +
        '        <i class="bi bi-diagram-3 me-2"></i>Graph &amp; MECS</h5>' +
        '      <div class="text-muted small">How this preview is built \u2014 proof &amp; education</div>' +
        "    </div>" +
        '    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>' +
        "  </div>" +
        '  <div class="offcanvas-body" id="graphinfo-body" data-eid="GRAPHINFO-body"></div>' +
        "</div>"
    );

    document.body.appendChild(tab);
    document.body.appendChild(drawer);

    tab.addEventListener("click", function () {
      build();
      bootstrap.Offcanvas.getOrCreateInstance(drawer).show();
    });
  }

  /* ---------------- card builders ---------------- */
  function statTiles(items) {
    return (
      '<div class="row g-2 mb-3">' +
      items
        .map(function (s) {
          return (
            '<div class="col">' +
            '  <div class="graphinfo-stat h-100">' +
            (s.icon ? '<i class="bi ' + s.icon + ' graphinfo-stat-icon"></i>' : "") +
            '    <div class="graphinfo-stat-value">' + intc(s.value) + "</div>" +
            '    <div class="graphinfo-stat-label">' + s.label + "</div>" +
            "  </div>" +
            "</div>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function miniTable(headLeft, headRight, rows, eid) {
    var body = rows
      .map(function (r) {
        return (
          "<tr><td><code>" + r.left + "</code>" +
          (r.sub ? ' <span class="text-muted">' + r.sub + "</span>" : "") +
          '</td><td class="text-end fw-semibold">' + r.right + "</td></tr>"
        );
      })
      .join("");
    return (
      '<table class="table table-sm graphinfo-table mb-0" data-eid="' + eid + '">' +
      "<thead><tr><th>" + headLeft + '</th><th class="text-end">' + headRight +
      "</th></tr></thead><tbody>" + body + "</tbody></table>"
    );
  }

  function cardSubgraph(d) {
    return (
      '<div class="card graphinfo-card mb-3" data-eid="' + d.eid + '" data-accent="graph">' +
      '  <div class="card-body">' +
      '    <div class="graphinfo-card-head"><i class="bi ' + (d.icon || "bi-diagram-3") +
      ' me-2"></i><div><h6 class="mb-0">' + d.title + "</h6>" +
      '      <div class="text-muted small">' + (d.subtitle || "") + "</div></div></div>" +
      statTiles(d.census) +
      '    <p class="small text-secondary mb-2"><span class="graphinfo-kicker">Why a sub-graph?</span> ' +
      d.why + "</p>" +
      '    <p class="small text-secondary mb-2"><span class="graphinfo-kicker">Region filter</span> ' +
      d.region_filter + "</p>" +
      '    <div class="graphinfo-kicker mb-1">Region edge census</div>' +
      miniTable(
        "Edge \u2192 neighbor",
        "Edges",
        d.edges.map(function (e) {
          return { left: e.edge, sub: "\u2192 " + e.neighbor, right: intc(e.count) };
        }),
        "GRAPHINFO-subgraph-edges"
      ) +
      '    <div class="graphinfo-source"><i class="bi bi-shield-lock me-1"></i>' + d.source + "</div>" +
      "  </div></div>"
    );
  }

  function cardQueries(d) {
    return (
      '<div class="card graphinfo-card mb-3" data-eid="' + d.eid + '" data-accent="service">' +
      '  <div class="card-body">' +
      '    <div class="graphinfo-card-head"><i class="bi ' + (d.icon || "bi-archive") +
      ' me-2"></i><h6 class="mb-0">' + d.title + "</h6></div>" +
      '    <p class="small text-secondary mb-2">' + d.blurb + "</p>" +
      statTiles(d.counts) +
      '    <div class="graphinfo-kicker mb-1">Experiment harnesses</div>' +
      '    <ul class="graphinfo-list small mb-2" data-eid="GRAPHINFO-queries-experiments">' +
      d.experiments.map(function (x) { return "<li>" + x + "</li>"; }).join("") +
      "    </ul>" +
      '    <div class="graphinfo-source"><i class="bi bi-shield-lock me-1"></i>' + d.source + "</div>" +
      "  </div></div>"
    );
  }

  function cardGraphDesign(d) {
    return (
      '<div class="card graphinfo-card mb-3" data-eid="' + d.eid + '" data-accent="quality-measure">' +
      '  <div class="card-body">' +
      '    <div class="graphinfo-card-head"><i class="bi ' + (d.icon || "bi-bezier2") +
      ' me-2"></i><h6 class="mb-0">' + d.title + "</h6></div>" +
      '    <p class="small text-secondary mb-2">' + d.blurb + "</p>" +
      '    <div class="row g-3">' +
      '      <div class="col-6"><div class="graphinfo-kicker mb-1">Node labels</div>' +
      miniTable(
        "Label",
        "Count",
        d.nodes.map(function (n) { return { left: n.label, right: intc(n.count) }; }),
        "GRAPHINFO-graph-design-nodes"
      ) +
      "      </div>" +
      '      <div class="col-6"><div class="graphinfo-kicker mb-1">Edge types</div>' +
      miniTable(
        "Edge",
        "Count",
        d.edges.map(function (e) { return { left: e.edge, right: e.count_display }; }),
        "GRAPHINFO-graph-design-edges"
      ) +
      "      </div>" +
      "    </div>" +
      '    <p class="small text-muted mt-2 mb-1"><i class="bi bi-info-circle me-1"></i>' + d.note + "</p>" +
      '    <div class="graphinfo-source"><i class="bi bi-shield-lock me-1"></i>' + d.source + "</div>" +
      "  </div></div>"
    );
  }

  function cardMecs(d) {
    var star =
      '<div class="mecs-star" data-eid="GRAPHINFO-mecs-star">' +
      '  <div class="mecs-points">' +
      d.star.points
        .map(function (p) {
          return '<span class="mecs-point"><code>' + p + "</code></span>";
        })
        .join("") +
      "  </div>" +
      '  <div class="mecs-center"><i class="bi bi-star-fill me-1"></i><code>' +
      d.star.center + "</code></div>" +
      "</div>";
    var entities =
      '<div class="d-flex flex-wrap gap-1 mb-2" data-eid="GRAPHINFO-mecs-entities">' +
      d.entities
        .map(function (e) { return '<span class="graphinfo-pill">' + e + "</span>"; })
        .join("") +
      "</div>";
    var tables =
      '<table class="table table-sm graphinfo-table mb-2" data-eid="GRAPHINFO-mecs-tables">' +
      "<thead><tr><th>Table</th><th>Role in this exploration</th></tr></thead><tbody>" +
      d.tables_used
        .map(function (t) {
          return "<tr><td><code>" + t.table + '</code></td><td class="small">' + t.role + "</td></tr>";
        })
        .join("") +
      "</tbody></table>";
    return (
      '<div class="card graphinfo-card mb-3" data-eid="' + d.eid + '" data-accent="aco">' +
      '  <div class="card-body">' +
      '    <div class="graphinfo-card-head"><i class="bi ' + (d.icon || "bi-grid-3x3-gap") +
      ' me-2"></i><h6 class="mb-0">' + d.title + "</h6></div>" +
      '    <p class="small text-secondary mb-2">' + d.blurb + "</p>" +
      statTiles(d.scale) +
      star +
      '    <div class="graphinfo-kicker mb-1">10 entity stars</div>' +
      entities +
      '    <div class="graphinfo-kicker mb-1">Tables this exploration reads</div>' +
      tables +
      '    <p class="small text-muted mb-1"><i class="bi bi-info-circle me-1"></i>' + d.note + "</p>" +
      '    <div class="graphinfo-source"><i class="bi bi-shield-lock me-1"></i>' + d.source + "</div>" +
      "  </div></div>"
    );
  }

  function build() {
    var body = document.getElementById("graphinfo-body");
    if (!body) return;
    var gi = window.SHOWCASE && window.SHOWCASE.graphinfo;
    if (!gi) {
      body.innerHTML =
        '<div class="alert alert-warning" data-eid="GRAPHINFO-missing">' +
        "window.SHOWCASE.graphinfo is unavailable \u2014 discovery pending.</div>";
      return;
    }
    body.innerHTML =
      (gi.note ? '<p class="text-muted small mb-3" data-eid="GRAPHINFO-note">' + gi.note + "</p>" : "") +
      cardSubgraph(gi.subgraph) +
      cardQueries(gi.queries) +
      cardGraphDesign(gi.graph_design) +
      cardMecs(gi.mecs);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureTab);
  } else {
    ensureTab();
  }
})();
