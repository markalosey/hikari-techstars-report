/* special_reports — TECHSTARS page (PAGE id: TECH).
 * The full accelerator roster as a card grid + the of-our-data stat pills. Every card opens the
 * shared roster drawer (data-drawer="roster"). From data/showcase.json roster + techstars_card.
 */
window.SR_PAGE = function (sc) {
  var FMT = window.SR.FMT;
  var tc = sc.techstars_card;
  var r = sc.roster;

  /* ---------------- anchor → ACO reach tie-in (page id TECH) ----------------
   * Two clearly-labeled channels from window.SHOWCASE.techstars_card.anchor_aco:
   *   Channel A — Facility→ACO (PARTICIPATES_IN, the newly-usable edge): MedStar is the only
   *               non-zero anchor (9 ACOs → 267 region providers).
   *   Channel B — Provider→ACO membership (complete, region-dense): Hopkins/UMMS/MedStar non-zero.
   * The card opens the secret-sauce provenance drawer via data-figure-id (common.js delegate). */
  var aa = tc.anchor_aco;
  if (aa) {
    var rows = aa.by_anchor.map(function (a) {
      var hot = a.facility_aco_count > 0;
      var facAttr = hot
        ? ' class="fw-bold" style="color: var(--hikari-aco);"'
        : ' class="text-muted"';
      return (
        "<tr>" +
        '<td class="fw-semibold">' + a.anchor + "</td>" +
        "<td" + facAttr + ">" + FMT.int(a.facility_aco_count) + "</td>" +
        "<td" + facAttr + ">" + FMT.int(a.facility_aco_reach_providers) + "</td>" +
        "<td>" + FMT.int(a.provider_bridge_aco_count) + "</td>" +
        "<td>" + FMT.int(a.provider_bridge_reach) + "</td>" +
        "</tr>"
      );
    }).join("");

    var head =
      "<thead>" +
      '<tr><th rowspan="2" class="align-middle">Anchor</th>' +
      '<th colspan="2" class="text-center" style="color: var(--hikari-aco);">' +
      'Facility\u2192ACO <span class="badge text-bg-warning">PARTICIPATES_IN \u2014 new</span></th>' +
      '<th colspan="2" class="text-center">' +
      'Provider\u2192ACO membership <span class="badge text-bg-secondary">complete</span></th></tr>' +
      "<tr>" +
      '<th class="small">ACOs (count)</th>' +
      '<th class="small">via-facility reach<br><span class="fw-normal text-muted">(region providers)</span></th>' +
      '<th class="small">ACOs (count)</th>' +
      '<th class="small">via-membership reach<br><span class="fw-normal text-muted">(region providers)</span></th>' +
      "</tr></thead>";

    document.getElementById("TECH-anchor-aco-host").innerHTML =
      '<div class="card figure-card mb-4" data-figure-id="techstars_anchor_aco" data-eid="TECH-anchor-aco-card" role="button">' +
      '  <div class="card-header bg-transparent fw-semibold">' +
      '    <i class="bi bi-diagram-3 me-1" style="color: var(--hikari-aco);"></i>Anchor \u2192 ACO reach ' +
      "    &mdash; two channels</div>" +
      '  <div class="card-body">' +
      '    <p class="mb-3" data-eid="TECH-anchor-aco-note">' + aa.note + "</p>" +
      '    <div class="table-responsive">' +
      '      <table class="table table-sm hikari-table mb-2" data-eid="TECH-anchor-aco-table">' +
      head + "<tbody>" + rows + "</tbody></table>" +
      "    </div>" +
      '    <div class="small text-muted">' +
      '      <i class="bi bi-shield-lock me-1"></i>Honest framing: <strong>Facility\u2192ACO</strong> ' +
      "is the newly-usable PARTICIPATES_IN edge \u2014 <strong>MedStar is the standout and the only " +
      "non-zero facility row</strong> (9 ACOs \u2192 267 region providers). The " +
      "<strong>Provider\u2192ACO membership</strong> channel is the complete, region-dense one " +
      "(Hopkins 93\u21921,155; UMMS 87\u21921,081; MedStar 50\u2192829). Click for provenance." +
      "    </div>" +
      "  </div></div>";
  }

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
