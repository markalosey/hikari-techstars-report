/* special_reports — persistent "Data Provenance" debug drawer (every page).
 *
 * Mirror of graphinfo.js, but anchored to the BOTTOM of every page (a fixed
 * launcher pill -> Bootstrap offcanvas placement="bottom"). Where the right-edge
 * "Graph & MECS" tab (graphinfo.js) explains HOW the preview is built, this drawer
 * answers WHERE EACH FIGURE ON THIS PAGE COMES FROM:
 *
 *   On open it SCANS THE LIVE DOM for every [data-figure-id] element actually
 *   rendered on the current page (this captures JS-rendered figures that a static
 *   file scan misses), de-dupes the ids, and for each looks it up in
 *   window.SHOWCASE.data_provenance.figure_lineage[id]. Each figure renders a
 *   compact provenance row: id/label, a source-kind badge, its experiments +
 *   tables, clickable dataset download URLs, and clickable research URLs (with a
 *   multi-source badge). Empty lineage is labelled HONESTLY — "FalkorDB graph
 *   traversal" when experiments include e3/e9, "research-sourced" when research[]
 *   is non-empty — never fabricated.
 *
 *   Footer: a base-path-aware "View full data provenance ->" link to
 *   pages/provenance.html plus the coverage one-liner.
 *
 * Data-driven: everything comes from window.SHOWCASE.data_provenance (embedded by
 * data/showcase.data.js — NO fetch). Every rendered element carries a unique
 * data-eid="PROV-...". Include this AFTER the Bootstrap bundle, after
 * data/showcase.data.js, and after graphinfo.js on EVERY page.
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

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  // Base-aware href to the dedicated provenance page (mirrors common.js pageHref).
  function provenanceHref() {
    var base = window.SR_BASE || "";
    return base === "" ? "pages/provenance.html" : "provenance.html";
  }

  function dp() {
    return window.SHOWCASE && window.SHOWCASE.data_provenance;
  }

  // A human label for a figure id — prefer the secret-sauce provenance title.
  function labelFor(id) {
    var prov = window.SHOWCASE && window.SHOWCASE.provenance;
    if (prov && prov[id] && prov[id].title) return prov[id].title;
    return id;
  }

  /* ---------------- live DOM scan ---------------- */
  // Collect every [data-figure-id] present on the page RIGHT NOW (post-render),
  // de-duped, preserving first-seen order. This is the key runtime step — it sees
  // JS-rendered figures the static figure_page_index can't.
  function collectFigureIds() {
    var nodes = document.querySelectorAll("[data-figure-id]");
    var seen = Object.create(null);
    var ids = [];
    nodes.forEach(function (n) {
      var id = n.getAttribute("data-figure-id");
      if (id && !seen[id]) {
        seen[id] = true;
        ids.push(id);
      }
    });
    return ids;
  }

  /* ---------------- fixed bottom launcher + drawer shell ---------------- */
  function ensureLauncher() {
    if (document.getElementById("provenance-launcher")) return;

    var launcher = el(
      '<button type="button" id="provenance-launcher" data-eid="PROV-launcher" ' +
        'title="Data Provenance — where every figure on this page comes from" ' +
        'aria-label="Open Data Provenance drawer" ' +
        'style="position:fixed;left:50%;bottom:0;transform:translateX(-50%);z-index:1035;' +
        "display:flex;align-items:center;gap:0.4rem;border:1px solid #0f766e;border-bottom:none;" +
        "background:#0f766e;color:#fff;padding:0.4rem 0.95rem;border-radius:0.6rem 0.6rem 0 0;" +
        "box-shadow:0 -0.15rem 0.6rem rgba(0,0,0,0.18);cursor:pointer;font-size:0.74rem;" +
        'font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">' +
        '<i class="bi bi-database fs-6"></i>' +
        '<i class="bi bi-link-45deg fs-6"></i>' +
        "<span>Data Provenance</span>" +
        "</button>"
    );

    var drawer = el(
      '<div class="offcanvas offcanvas-bottom" tabindex="-1" id="provenance-drawer" ' +
        'data-eid="PROV-drawer" aria-labelledby="provenance-title" style="height:72vh;">' +
        '  <div class="offcanvas-header border-bottom">' +
        "    <div>" +
        '      <h5 class="offcanvas-title mb-0" id="provenance-title">' +
        '        <i class="bi bi-database me-2"></i>Data Provenance' +
        '        <span class="text-muted small fw-normal ms-2">where every figure on this page comes from</span></h5>' +
        '      <div class="text-muted small" id="provenance-subnote" data-eid="PROV-subnote"></div>' +
        "    </div>" +
        '    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>' +
        "  </div>" +
        '  <div class="offcanvas-body" id="provenance-body" data-eid="PROV-body"></div>' +
        '  <div class="border-top px-3 py-2 d-flex justify-content-between align-items-center flex-wrap gap-2" ' +
        '       id="provenance-footer" data-eid="PROV-footer"></div>' +
        "</div>"
    );

    document.body.appendChild(launcher);
    document.body.appendChild(drawer);

    launcher.addEventListener("click", function () {
      build();
      bootstrap.Offcanvas.getOrCreateInstance(drawer).show();
    });
  }

  /* ---------------- source-kind classification (honest) ---------------- */
  // datasets present -> CMS/public data; else e3/e9 -> graph; else research[] -> research.
  function sourceKind(lin) {
    var exps = lin.experiments || [];
    var isGraph = exps.indexOf("e3") !== -1 || exps.indexOf("e9") !== -1;
    if (lin.datasets && lin.datasets.length) {
      return { key: "data", label: "Public CMS / Census data", icon: "bi-database", accent: "service" };
    }
    if (isGraph) {
      return { key: "graph", label: "FalkorDB graph traversal", icon: "bi-diagram-3", accent: "graph" };
    }
    if (lin.research && lin.research.length) {
      return { key: "research", label: "Research-sourced", icon: "bi-journal-text", accent: "aco" };
    }
    return { key: "unknown", label: "Discovery pending", icon: "bi-hourglass-split", accent: "quality-measure" };
  }

  function pills(items, eid) {
    if (!items || !items.length) return "";
    return (
      '<span class="d-inline-flex flex-wrap gap-1 align-middle" data-eid="' + eid + '">' +
      items
        .map(function (x) {
          return '<span class="graphinfo-pill">' + esc(x) + "</span>";
        })
        .join("") +
      "</span>"
    );
  }

  function datasetLinks(datasets, fid) {
    if (!datasets || !datasets.length) return "";
    var rows = datasets
      .map(function (d) {
        return (
          '<li><a href="' + esc(d.url) + '" target="_blank" rel="noopener noreferrer">' +
          '<i class="bi bi-box-arrow-up-right me-1"></i>' + esc(d.name) + "</a></li>"
        );
      })
      .join("");
    return (
      '<div class="graphinfo-kicker mb-1"><i class="bi bi-cloud-download me-1"></i>Public download URLs</div>' +
      '<ul class="graphinfo-list small mb-2" data-eid="PROV-fig-' + esc(fid) + '-datasets">' + rows + "</ul>"
    );
  }

  function researchLinks(research, fid) {
    if (!research || !research.length) return "";
    var rows = research
      .map(function (r) {
        var badge = r.multi_source
          ? ' <span class="badge text-bg-success ms-1" title="Corroborated by 2+ sources">multi-source</span>'
          : "";
        var urls = (r.urls || [])
          .map(function (u) {
            return (
              '<li><a href="' + esc(u) + '" target="_blank" rel="noopener noreferrer">' +
              '<i class="bi bi-link-45deg me-1"></i>' + esc(u) + "</a></li>"
            );
          })
          .join("");
        if (!urls) {
          urls = '<li class="text-muted">named in finding provenance header (no inline URL)</li>';
        }
        return (
          '<div class="small fw-semibold mt-1"><code>' + esc(r.topic) + "</code>" + badge + "</div>" +
          '<ul class="graphinfo-list small mb-1">' + urls + "</ul>"
        );
      })
      .join("");
    return (
      '<div class="graphinfo-kicker mb-1"><i class="bi bi-journal-text me-1"></i>Research sources</div>' +
      '<div data-eid="PROV-fig-' + esc(fid) + '-research">' + rows + "</div>"
    );
  }

  function figureCard(id) {
    var lineage = dp().figure_lineage || {};
    var lin = lineage[id];
    if (!lin) {
      return (
        '<div class="card graphinfo-card mb-2" data-eid="PROV-fig-' + esc(id) +
        '" data-accent="quality-measure"><div class="card-body py-2">' +
        '  <div class="d-flex justify-content-between align-items-start">' +
        '    <h6 class="mb-0">' + esc(labelFor(id)) + "</h6>" +
        '    <span class="badge text-bg-light"><i class="bi bi-hourglass-split me-1"></i>discovery pending</span>' +
        "  </div>" +
        '  <div class="text-muted small">No lineage recorded for <code>' + esc(id) +
        "</code> yet — not fabricated.</div>" +
        "</div></div>"
      );
    }
    var kind = sourceKind(lin);
    return (
      '<div class="card graphinfo-card mb-2" data-eid="PROV-fig-' + esc(id) +
      '" data-accent="' + kind.accent + '"><div class="card-body py-2">' +
      '  <div class="d-flex justify-content-between align-items-start flex-wrap gap-1 mb-1">' +
      '    <h6 class="mb-0"><i class="bi ' + kind.icon + ' me-2"></i>' + esc(labelFor(id)) + "</h6>" +
      '    <span class="graphinfo-pill"><i class="bi ' + kind.icon + ' me-1"></i>' + kind.label + "</span>" +
      "  </div>" +
      '  <div class="small text-muted mb-2">figure-id <code>' + esc(id) + "</code></div>" +
      (lin.experiments && lin.experiments.length
        ? '<div class="graphinfo-kicker mb-1">Experiments</div>' +
          pills(lin.experiments, "PROV-fig-" + esc(id) + "-experiments") + '<div class="mb-2"></div>'
        : "") +
      (lin.tables && lin.tables.length
        ? '<div class="graphinfo-kicker mb-1">Derived tables</div>' +
          pills(lin.tables, "PROV-fig-" + esc(id) + "-tables") + '<div class="mb-2"></div>'
        : "") +
      datasetLinks(lin.datasets, id) +
      researchLinks(lin.research, id) +
      "</div></div>"
    );
  }

  function build() {
    var body = document.getElementById("provenance-body");
    var subnote = document.getElementById("provenance-subnote");
    var footer = document.getElementById("provenance-footer");
    if (!body) return;

    var d = dp();
    if (!d) {
      body.innerHTML =
        '<div class="alert alert-warning" data-eid="PROV-missing">' +
        "window.SHOWCASE.data_provenance is unavailable — include data/showcase.data.js first.</div>";
      if (subnote) subnote.textContent = "";
      if (footer) footer.innerHTML = "";
      return;
    }

    var ids = collectFigureIds();
    if (subnote) {
      subnote.innerHTML =
        '<i class="bi bi-search me-1"></i>' + intc(ids.length) +
        " figure" + (ids.length === 1 ? "" : "s") +
        " found on this page (live DOM scan of <code>[data-figure-id]</code>).";
    }

    if (!ids.length) {
      body.innerHTML =
        '<div class="text-muted small" data-eid="PROV-empty">' +
        "No <code>[data-figure-id]</code> figures rendered on this page. " +
        "See the full provenance page for the complete dataset/table/research index.</div>";
    } else {
      body.innerHTML = ids
        .map(function (id) {
          return figureCard(id);
        })
        .join("");
    }

    // Footer: coverage one-liner + base-aware link to the dedicated page.
    var cov = d.coverage || {};
    if (footer) {
      footer.innerHTML =
        '<span class="text-muted small" data-eid="PROV-coverage">' +
        '<i class="bi bi-shield-lock me-1"></i>' +
        intc(cov.n_datasets) + " public datasets &middot; " +
        intc(cov.n_tables) + " tables &middot; " +
        intc(cov.n_research_urls) + " research URLs &middot; all traceable</span>" +
        '<a class="btn btn-sm btn-outline-primary" data-eid="PROV-fulllink" href="' +
        provenanceHref() + '">View full data provenance ' +
        '<i class="bi bi-arrow-right ms-1"></i></a>';
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureLauncher);
  } else {
    ensureLauncher();
  }
})();
