/* special_reports — DATA PROVENANCE page (PAGE id: PROV).
 * Every showcase figure traced to its public download URL(s) or named research sources.
 * Pure render from window.SHOWCASE.data_provenance (e13 dataset catalog, derived-table
 * lineage, query index + a file-scanned figure->page map). NO fetch / NO new deps.
 *
 * Surfaces: coverage summary -> public source datasets (grouped by agency) ->
 * derived tables -> sources -> research sources -> figure->page index (links back to the
 * pages that present each figure) -> collapsible query index. Every element gets data-eid="PROV-...".
 */
window.SR_PAGE = function (sc) {
  "use strict";

  var d = sc.data_provenance;
  if (!d) {
    var main = document.querySelector("main");
    if (main) {
      main.insertAdjacentHTML(
        "afterbegin",
        '<div class="alert alert-warning" data-eid="PROV-missing">' +
          "window.SHOWCASE.data_provenance is unavailable.</div>"
      );
    }
    return;
  }

  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  var intc = function (n) {
    return typeof n === "number" ? n.toLocaleString("en-US") : n;
  };

  // Base-aware href back to a presenting page (mirrors common.js pageHref/homeHref).
  var BASE = window.SR_BASE || "";
  function pageHref(slug) {
    if (slug === "index") return BASE === "" ? "index.html" : "../index.html";
    return (BASE === "" ? "pages/" : "") + slug + ".html";
  }
  function extLink(url) {
    return (
      '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' +
      '<i class="bi bi-box-arrow-up-right me-1"></i>' + esc(url) + "</a>"
    );
  }

  // slug -> {name, url} lookup, for derived-table source name+link rendering.
  var BY_SLUG = {};
  (d.datasets || []).forEach(function (ds) {
    BY_SLUG[ds.slug] = ds;
  });

  /* ---------------- subtitle ---------------- */
  document.getElementById("PROV-subtitle").textContent = d.note || d.label || "Data Provenance";

  /* ---------------- coverage summary ---------------- */
  var cov = d.coverage || {};
  var covTiles = [
    { eid: "PROV-cov-datasets", icon: "bi-cloud-download", value: cov.n_datasets, label: "public datasets" },
    { eid: "PROV-cov-tables", icon: "bi-table", value: cov.n_tables, label: "derived tables" },
    { eid: "PROV-cov-queries", icon: "bi-code-square", value: cov.n_queries,
      label: cov.n_sql_queries + " SQL / " + cov.n_cypher_queries + " Cypher" },
    { eid: "PROV-cov-research", icon: "bi-journal-text", value: cov.n_research_topics, label: "research topics" },
    { eid: "PROV-cov-multi", icon: "bi-patch-check", value: cov.n_multi_source_topics, label: "multi-source topics" },
    { eid: "PROV-cov-urls", icon: "bi-link-45deg",
      value: (cov.n_public_download_urls || 0) + (cov.n_research_urls || 0),
      label: cov.n_public_download_urls + " download / " + cov.n_research_urls + " research URLs" },
    { eid: "PROV-cov-figures", icon: "bi-diagram-2", value: cov.n_showcase_figures, label: "showcase figures" },
  ];
  document.getElementById("PROV-coverage").innerHTML = covTiles
    .map(function (t) {
      return (
        '<div class="col-6 col-md-4 col-xl-3">' +
        '  <div class="card h-100" data-eid="' + t.eid + '"><div class="card-body py-3 text-center">' +
        '    <i class="bi ' + t.icon + ' fs-5" style="color: var(--hikari-service);"></i>' +
        '    <div class="fs-4 fw-bold">' + intc(t.value) + "</div>" +
        '    <div class="small text-muted">' + esc(t.label) + "</div>" +
        "  </div></div></div>"
      );
    })
    .join("");

  /* ---------------- public source datasets (grouped by agency) ---------------- */
  var datasets = (d.datasets || []).slice();
  var AGENCY_ORDER = ["CMS", "Census", "HRSA", "FDA", "CDC", "NUCC", "OIG"];
  function agencyRank(a) {
    var i = AGENCY_ORDER.indexOf(a);
    return i === -1 ? AGENCY_ORDER.length : i;
  }
  datasets.sort(function (a, b) {
    var ra = agencyRank(a.agency), rb = agencyRank(b.agency);
    if (ra !== rb) return ra - rb;
    if (a.agency !== b.agency) return a.agency < b.agency ? -1 : 1;
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });

  document.getElementById("PROV-datasets-env").textContent = intc(datasets.length) + " datasets";

  var dsHead =
    "<tr><th>Dataset</th><th>Agency</th><th>Refresh</th><th>Tier</th>" +
    "<th>Download URL</th><th>Tables using it</th></tr>";
  var lastAgency = null;
  var dsBody = datasets
    .map(function (ds) {
      var groupRow = "";
      if (ds.agency !== lastAgency) {
        lastAgency = ds.agency;
        groupRow =
          '<tr class="table-light"><td colspan="6" class="fw-bold small text-uppercase" ' +
          'data-eid="PROV-datasets-group-' + esc(ds.agency) + '">' +
          '<i class="bi bi-building me-1"></i>' + esc(ds.agency) + "</td></tr>";
      }
      var tables = (ds.tables_using_it || [])
        .map(function (t) {
          return '<code class="me-1">' + esc(t) + "</code>";
        })
        .join("");
      return (
        groupRow +
        '<tr data-eid="PROV-dataset-' + esc(ds.slug) + '">' +
        '<td class="fw-semibold">' + esc(ds.name) +
        '<div class="small text-muted"><code>' + esc(ds.slug) + "</code> &middot; " + esc(ds.format) + "</div></td>" +
        "<td>" + esc(ds.agency) + "</td>" +
        '<td class="small">' + esc(ds.refresh) + "</td>" +
        '<td><span class="badge text-bg-light">T' + esc(ds.tier) + "</span></td>" +
        '<td class="small">' + extLink(ds.url) + "</td>" +
        '<td class="small">' + (tables || '<span class="text-muted">&mdash;</span>') + "</td></tr>"
      );
    })
    .join("");
  document.getElementById("PROV-datasets-table").innerHTML =
    "<thead>" + dsHead + "</thead><tbody>" + dsBody + "</tbody>";

  /* ---------------- derived tables -> sources ---------------- */
  var derived = d.derived_tables || [];
  document.getElementById("PROV-derived-env").textContent = intc(derived.length) + " tables";
  var dvHead = "<tr><th>Table</th><th>Transform</th><th>Source datasets</th><th>Experiments</th></tr>";
  var dvBody = derived
    .map(function (t) {
      var sources = (t.source_slugs || [])
        .map(function (slug) {
          var ds = BY_SLUG[slug];
          if (ds) {
            return (
              '<li><a href="' + esc(ds.url) + '" target="_blank" rel="noopener noreferrer">' +
              '<i class="bi bi-box-arrow-up-right me-1"></i>' + esc(ds.name) + "</a></li>"
            );
          }
          return "<li><code>" + esc(slug) + "</code></li>";
        })
        .join("");
      var exps = (t.experiments_using_it || [])
        .map(function (e) {
          return '<span class="graphinfo-pill me-1">' + esc(e) + "</span>";
        })
        .join("");
      return (
        '<tr data-eid="PROV-derived-' + esc(t.table) + '">' +
        '<td class="fw-semibold align-top"><code>' + esc(t.table) + "</code></td>" +
        '<td class="small align-top">' + esc(t.transform) + "</td>" +
        '<td class="small align-top"><ul class="graphinfo-list mb-0">' + sources + "</ul></td>" +
        '<td class="small align-top">' + (exps || '<span class="text-muted">&mdash;</span>') + "</td></tr>"
      );
    })
    .join("");
  document.getElementById("PROV-derived-table").innerHTML =
    "<thead>" + dvHead + "</thead><tbody>" + dvBody + "</tbody>";

  /* ---------------- research sources ---------------- */
  var research = d.research_sources || [];
  document.getElementById("PROV-research-env").textContent =
    intc(research.length) + " topics &middot; " + intc(cov.n_multi_source_topics) + " multi-source";
  document.getElementById("PROV-research-list").innerHTML = research
    .map(function (r) {
      var badge = r.multi_source
        ? ' <span class="badge text-bg-success ms-1" title="Corroborated by 2+ sources">multi-source</span>'
        : "";
      var urls = (r.urls || [])
        .map(function (u) {
          return "<li>" + extLink(u) + "</li>";
        })
        .join("");
      if (!urls) {
        urls = '<li class="text-muted">named in the finding provenance header (no inline URL captured)</li>';
      }
      return (
        '<div class="mb-3 pb-2 border-bottom" data-eid="PROV-research-' + esc(r.topic) + '">' +
        '  <div class="fw-semibold"><code>' + esc(r.topic) + "</code>" + badge + "</div>" +
        '  <div class="small text-muted mb-1"><i class="bi bi-file-earmark-text me-1"></i><code>' +
        esc(r.finding_doc) + "</code></div>" +
        '  <div class="small mb-1">' + esc(r.note) + "</div>" +
        '  <ul class="graphinfo-list small mb-0">' + urls + "</ul>" +
        "</div>"
      );
    })
    .join("");

  /* ---------------- figure -> page index (links back to presenting pages) ---------------- */
  var figIndex = d.figure_page_index || {};
  var figIds = Object.keys(figIndex).sort();
  document.getElementById("PROV-figindex-env").textContent = intc(figIds.length) + " figures";
  var fiHead = "<tr><th>Figure</th><th>Presenting page(s)</th></tr>";
  var fiBody = figIds
    .map(function (id) {
      var pages = figIndex[id] || [];
      var cell;
      if (pages.length) {
        cell = pages
          .map(function (slug) {
            return (
              '<a class="badge text-bg-primary text-decoration-none me-1" href="' +
              pageHref(slug) + '" data-eid="PROV-figindex-' + esc(id) + "-" + esc(slug) + '">' +
              '<i class="bi bi-arrow-up-right-square me-1"></i>' + esc(slug) + "</a>"
            );
          })
          .join("");
      } else {
        cell = '<span class="text-muted small">(data-driven / shared component)</span>';
      }
      return (
        '<tr data-eid="PROV-figindex-row-' + esc(id) + '">' +
        '<td class="small"><code>' + esc(id) + "</code></td>" +
        '<td>' + cell + "</td></tr>"
      );
    })
    .join("");
  document.getElementById("PROV-figindex-table").innerHTML =
    "<thead>" + fiHead + "</thead><tbody>" + fiBody + "</tbody>";

  /* ---------------- query index (collapsible) ---------------- */
  var queries = d.query_index || [];
  document.getElementById("PROV-queries-env").textContent =
    "(" + intc(queries.length) + " stored queries)";
  var qHead = "<tr><th>Query</th><th>Kind</th><th>Experiments</th><th>Source tables</th></tr>";
  var qBody = queries
    .map(function (q) {
      var exps = (q.experiments || []).join(", ");
      var tables = (q.source_tables || [])
        .map(function (t) {
          return '<code class="me-1">' + esc(t) + "</code>";
        })
        .join("");
      var kindBadge =
        q.kind === "cypher"
          ? '<span class="badge text-bg-info">cypher</span>'
          : '<span class="badge text-bg-secondary">sql</span>';
      return (
        '<tr data-eid="PROV-query-' + esc(q.query) + '">' +
        '<td class="small"><code>' + esc(q.query) + "</code></td>" +
        "<td>" + kindBadge + "</td>" +
        '<td class="small">' + esc(exps) + "</td>" +
        '<td class="small">' + (tables || '<span class="text-muted">&mdash;</span>') + "</td></tr>"
      );
    })
    .join("");
  document.getElementById("PROV-queries-table").innerHTML =
    "<thead>" + qHead + "</thead><tbody>" + qBody + "</tbody>";
};
