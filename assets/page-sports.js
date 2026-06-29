/* special_reports — SPORTS page (PAGE id: SPORTS).
 * "Baltimore loves its teams → its teams get the highest care." Team cards (Ravens, Orioles) →
 * MedStar (a Techstars anchor). The Orioles team-doctor card opens a drawer with Leigh Ann Curl,
 * MD — only the best/flattering stats (spec §4b-sports). From data/showcase.json.sports.
 */
window.SR_PAGE = function (sc) {
  var sp = sc.sports;

  document.getElementById("SPORTS-headline").textContent = sp.headline;
  document.getElementById("SPORTS-subhead").textContent = sp.subhead;
  document.getElementById("SPORTS-medstar-note").textContent = sp.medstar_note;

  /* team cards */
  document.getElementById("SPORTS-teams").innerHTML = sp.teams.map(function (t) {
    var docBlock;
    if (t.physician === "curl") {
      docBlock =
        '<button class="btn btn-outline-danger btn-sm mt-2" data-drawer="curl" data-eid="SPORTS-orioles-card">' +
        '<i class="bi bi-person-badge me-1"></i>Team doctor: Leigh Ann Curl, MD →</button>';
    } else {
      docBlock =
        '<div class="mt-2"><span class="algo-status pending" data-eid="SPORTS-' + t.eid + '-physician">team physician: ' +
        t.physician_status + "</span>" +
        '<div class="small text-muted mt-1">' + (t.physician_note || "") + "</div></div>";
    }
    return (
      '<div class="col-md-6">' +
      '  <div class="card team-card h-100" data-eid="SPORTS-' + t.eid + '-team-card">' +
      '    <div class="card-body d-flex gap-3">' +
      '      <img class="team-logo" src="' + window.SR.asset("sports/" + t.logo) + '" alt="' + t.name + '"' +
      '           onerror="this.style.visibility=\'hidden\'">' +
      "      <div>" +
      '        <h5 class="mb-0">' + t.name + "</h5>" +
      '        <div class="text-muted small mb-1">' + t.league + " · " + t.venue + "</div>" +
      '        <div class="small"><i class="bi bi-hospital me-1" style="color: var(--hikari-facility);"></i>' + t.partner + "</div>" +
      "        " + docBlock +
      "      </div>" +
      "    </div></div></div>"
    );
  }).join("");

  /* Curl drawer (best stats only) */
  var c = sc.sports.curl;
  var stats = c.best_stats.map(function (s) {
    return (
      '<div class="col-6">' +
      '  <div class="curl-stat" data-eid="SPORTS-curl-stat-' + s.label.split(" ")[0].toLowerCase() + '">' +
      '    <div class="curl-stat-value"><i class="bi ' + s.icon + ' me-1 text-success"></i>' + s.value + "</div>" +
      '    <div class="curl-stat-label">' + s.label + "</div>" +
      "  </div></div>"
    );
  }).join("");
  var services = c.top_services.map(function (s) {
    var v = s.avg_pmt_display ? ("avg " + s.avg_pmt_display) : (s.services + " services");
    return "<li><code>" + s.hcpcs + "</code> " + s.desc + ' <span class="text-muted small">(' + v + ")</span></li>";
  }).join("");

  document.getElementById("SPORTS-curl-body").innerHTML =
    '<div class="text-center mb-3">' +
    '  <div class="fs-5 fw-bold">' + c.name + "</div>" +
    '  <div class="text-muted small">' + c.team + " · NPI " + c.npi + "</div>" +
    "</div>" +
    '<p class="fw-semibold">' + c.headline + "</p>" +
    '<div class="row g-2 mb-3" data-eid="SPORTS-curl-stats">' + stats + "</div>" +
    '<div class="layer-tag mb-1">Top services</div><ul class="small mb-3">' + services + "</ul>" +
    '<div class="alert alert-success small" data-eid="SPORTS-curl-pride">' + c.pride_note + "</div>" +
    '<p class="text-muted small mb-0"><i class="bi bi-shield-lock me-1"></i>Provenance: ' +
    '<a href="#" id="SPORTS-curl-prov">sports_curl</a></p>';

  /* wire the curl drawer (custom drawer — handled here, not the generic provenance drawer) */
  var drawerEl = document.getElementById("SPORTS-curl-drawer");
  document.body.addEventListener("click", function (e) {
    if (e.target.closest('[data-drawer="curl"]')) {
      e.preventDefault();
      bootstrap.Offcanvas.getOrCreateInstance(drawerEl).show();
    }
    if (e.target.id === "SPORTS-curl-prov") {
      e.preventDefault();
      window.SR.openProvenance(c.figure_id);
    }
  });
};
