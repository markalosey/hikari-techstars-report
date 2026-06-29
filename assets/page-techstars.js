/* special_reports — TECHSTARS page (PAGE id: TECH).
 * The full accelerator roster as a card grid + the of-our-data stat pills. Every card opens the
 * shared roster drawer (data-drawer="roster"). From data/showcase.json roster + techstars_card.
 */
window.SR_PAGE = function (sc) {
  var tc = sc.techstars_card;
  var r = sc.roster;

  /* of-our-data stat pills */
  document.getElementById("TECH-pills").innerHTML = tc.pills.map(function (p) {
    return '<span class="stat-pill" data-eid="TECH-pill-' + p.label.split(" ")[0].toLowerCase() + '">' +
      '<i class="bi ' + p.icon + '"></i>' + p.value + ' <span class="text-muted fw-normal">' + p.label + "</span></span>";
  }).join(" ");
  document.getElementById("TECH-anchors-note").textContent = tc.anchors_note;
  document.getElementById("TECH-roster-summary").textContent =
    "Roster of " + r.roster_size + " · " + r.members_with_any_match + " with ≥1 NPI · " +
    r.clean_in_region_matches + " clean in-region matches.";

  /* person card grid — interviewers, then in-data, then the rest */
  var members = r.members.slice();
  var ordered = members.filter(function (m) { return m.pinned; })
    .concat(members.filter(function (m) { return !m.pinned && m.in_region && m.npi; }))
    .concat(members.filter(function (m) { return !m.pinned && !(m.in_region && m.npi); }));

  function slug(m) { return m.photo ? m.photo.replace(".jpg", "") : m.name.toLowerCase().replace(/[^a-z]/g, ""); }
  function badge(m) {
    if (m.interviewer) return '<span class="badge bg-primary"><i class="bi bi-mic-fill me-1"></i>interviewer</span>';
    if (m.in_region && m.npi) return '<span class="badge bg-success"><i class="bi bi-database-check me-1"></i>in our data</span>';
    if (m.matched) return '<span class="badge bg-secondary">name match</span>';
    return '<span class="badge bg-light text-dark border">no NPI</span>';
  }

  document.getElementById("TECH-roster-grid").innerHTML = ordered.map(function (m) {
    var cls = "card person-card figure-card h-100";
    if (m.interviewer) cls += " interviewer";
    else if (m.in_region && m.npi) cls += " in-data";
    return (
      '<div class="col-6 col-md-4 col-lg-3">' +
      '  <div class="' + cls + '" data-drawer="roster" role="button" data-eid="TECH-card-' + slug(m) + '">' +
      '    <div class="card-body text-center d-flex flex-column align-items-center">' +
      '      <img class="person-photo mb-2" src="' + window.SR.asset("techstars/" + m.photo) + '" alt="' + m.name + '"' +
      '           onerror="this.style.visibility=\'hidden\'">' +
      '      <div class="fw-semibold small">' + m.name + "</div>" +
      '      <div class="text-muted" style="font-size:0.72rem;">' + m.role + "</div>" +
      '      <div class="text-muted mb-2" style="font-size:0.72rem;">' + m.org + "</div>" +
      '      <div class="mt-auto">' + badge(m) + "</div>" +
      "    </div></div></div>"
    );
  }).join("");
};
