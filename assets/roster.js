/* special_reports — Techstars roster offcanvas drawer.
 *
 * Shared by the Hero page (HERO-techstars-card) and the Techstars page (TECH-*). Any element
 * with data-drawer="roster" opens it. Content is built from window.SR.showcase.roster:
 * interviewers (Culbertson, McLanahan) pinned first, then the two advisors in our provider
 * data (Hasselfeld 1700270360, Najjar 1952691214), then the remaining roster. Each row shows
 * the person's photo (assets/techstars/<photo>), role/org and the fact line from findings 01b–01f.
 */
(function () {
  "use strict";

  function ensureDrawer() {
    if (document.getElementById("roster-drawer")) return;
    var div = document.createElement("div");
    div.className = "offcanvas offcanvas-end";
    div.tabIndex = -1;
    div.id = "roster-drawer";
    div.style.width = "520px";
    div.setAttribute("data-eid", "DRAWER-roster");
    div.innerHTML =
      '<div class="offcanvas-header border-bottom">' +
      '  <div>' +
      '    <h5 class="offcanvas-title mb-0"><i class="bi bi-rocket-takeoff me-2"></i>Techstars AI Health Baltimore</h5>' +
      '    <div class="text-muted small" id="roster-sub"></div>' +
      "  </div>" +
      '  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>' +
      "</div>" +
      '<div class="offcanvas-body" id="roster-body" data-eid="DRAWER-roster-body"></div>';
    document.body.appendChild(div);
  }

  function badges(m) {
    var out = "";
    if (m.interviewer) out += '<span class="badge bg-primary me-1"><i class="bi bi-mic-fill me-1"></i>interviewer</span>';
    if (m.in_region && m.npi) {
      out += '<span class="badge bg-success me-1"><i class="bi bi-database-check me-1"></i>in our data · NPI ' + m.npi + "</span>";
    } else if (m.matched) {
      out += '<span class="badge bg-secondary me-1"><i class="bi bi-search me-1"></i>name match (out of region)</span>';
    } else {
      out += '<span class="badge bg-light text-dark border me-1">no provider NPI</span>';
    }
    if (m.mips != null) out += '<span class="badge bg-light text-dark border">MIPS ' + m.mips + "</span>";
    return out;
  }

  function rowHtml(m) {
    var cls = "roster-row";
    if (m.pinned) cls += " roster-pin";
    else if (m.in_region && m.npi) cls += " roster-in-data";
    var eid = "DRAWER-roster-" + (m.photo ? m.photo.replace(".jpg", "") : "x");
    return (
      '<div class="' + cls + '" data-eid="' + eid + '">' +
      '  <img class="roster-photo" src="' + window.SR.asset("techstars/" + m.photo) + '" alt="' + m.name + '"' +
      '       onerror="this.style.visibility=\'hidden\'">' +
      "  <div>" +
      '    <div class="fw-semibold">' + m.name + "</div>" +
      '    <div class="text-muted small mb-1">' + m.role + " · " + m.org + "</div>" +
      '    <div class="mb-1">' + badges(m) + "</div>" +
      '    <div class="small text-secondary">' + (m.bio || "") + "</div>" +
      "  </div>" +
      "</div>"
    );
  }

  function build() {
    var sc = window.SR && window.SR.showcase;
    if (!sc) return;
    var r = sc.roster;
    var sub = document.getElementById("roster-sub");
    if (sub) {
      sub.textContent =
        "Roster of " + r.roster_size + " · " + r.members_with_any_match +
        " with ≥1 NPI · " + r.clean_in_region_matches + " clean in-region matches";
    }
    var members = r.members.slice();
    // Order: pinned interviewers, then in-region NPI matches, then the rest.
    var pinned = members.filter(function (m) { return m.pinned; });
    var inData = members.filter(function (m) { return !m.pinned && m.in_region && m.npi; });
    var rest = members.filter(function (m) { return !m.pinned && !(m.in_region && m.npi); });

    var html = "";
    html += '<div class="roster-section-label">Interviewers (pinned)</div>' + pinned.map(rowHtml).join("");
    html += '<div class="roster-section-label">In our provider data</div>' + inData.map(rowHtml).join("");
    html += '<div class="roster-section-label">Team & advisors</div>' + rest.map(rowHtml).join("");
    html +=
      '<p class="text-muted small mt-3 mb-0"><i class="bi bi-shield-lock me-1"></i>' +
      "Profile facts from findings 01b–01f. Name-match provenance: " +
      '<a href="#" onclick="window.SR.openProvenance(\'roster_summary\');return false;">roster_summary</a>. ' +
      "Third-party headshots — internal preview use only.</p>";

    document.getElementById("roster-body").innerHTML = html;
  }

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest('[data-drawer="roster"]');
    if (!trigger) return;
    e.preventDefault();
    ensureDrawer();
    build();
    var el = document.getElementById("roster-drawer");
    bootstrap.Offcanvas.getOrCreateInstance(el).show();
  });
})();
