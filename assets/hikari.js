/* Hikari — HTMX + ECharts integration glue.
 *
 * VENDORED COPY of src/hikari/ui/static/hikari/hikari.js (do NOT edit the original).
 * Imported by the multi-page special_reports preview so it matches the production
 * behavior (ECharts lifecycle, named tooltip formatters, event buffer, entity URL
 * resolver). HTMX is not loaded in the static preview — the HTMX listeners simply
 * never fire, which is harmless.
 *
 * RFC-005 R-4: Glue module that bridges ECharts lifecycle to HTMX.
 * RFC-005 R-5: Declarative chart rendering via data-echarts attributes.
 * RFC-005 R-6: Dynamic updates on htmx:afterSwap with transition support.
 *
 * Responsibilities:
 *   1. HTMX loading indicator
 *   2. Auto-init ECharts on [data-echarts] elements after HTMX swaps
 *   3. Dispose ECharts instances on container removal (prevent leaks)
 *   4. Responsive resize via ResizeObserver
 *   5. Bridge chart click events to HTMX navigation
 */

(function() {
    'use strict';

    /* ------------------------------------------------------------------
     * 0. Typeahead click-away dismiss
     * ----------------------------------------------------------------*/

    document.addEventListener('click', function(e) {
        document.querySelectorAll('[id$="-typeahead-results"]').forEach(function(el) {
            if (!el.contains(e.target) && !e.target.closest('[hx-target="#' + el.id + '"]')) {
                el.innerHTML = '';
            }
        });
    });

    /* ------------------------------------------------------------------
     * 1. HTMX loading indicator
     * ----------------------------------------------------------------*/

    document.addEventListener('DOMContentLoaded', function() {
        document.body.addEventListener('htmx:beforeRequest', function() {
            var indicator = document.getElementById('loading-indicator');
            if (indicator) indicator.style.display = 'inline-block';
        });
        document.body.addEventListener('htmx:afterRequest', function() {
            var indicator = document.getElementById('loading-indicator');
            if (indicator) indicator.style.display = 'none';
        });
    });

    /* ------------------------------------------------------------------
     * 2. ECharts instance registry
     * ----------------------------------------------------------------*/

    // WeakMap: DOM element → ECharts instance
    var chartInstances = new WeakMap();
    // Track all live chart elements for cleanup
    var liveChartElements = new Set();

    /* ------------------------------------------------------------------
     * 3. Initialize charts on elements with [data-echarts]
     * ----------------------------------------------------------------*/

    /* ------------------------------------------------------------------
     * 2b. GeoJSON registry for map charts
     * ----------------------------------------------------------------*/

    var registeredMaps = {};
    var mapLoadPromises = {};
    var GEO_URL = '/static/hikari/us-states.geojson';

    function ensureMapRegistered(mapName) {
        if (registeredMaps[mapName]) {
            return Promise.resolve();
        }
        if (mapLoadPromises[mapName]) {
            return mapLoadPromises[mapName];
        }
        mapLoadPromises[mapName] = fetch(GEO_URL)
            .then(function(resp) { return resp.json(); })
            .then(function(geoJson) {
                echarts.registerMap(mapName, geoJson);
                registeredMaps[mapName] = true;
            });
        return mapLoadPromises[mapName];
    }

    function needsMapRegistration(option) {
        if (!option.series) return null;
        for (var i = 0; i < option.series.length; i++) {
            if (option.series[i].type === 'map' && option.series[i].map) {
                return option.series[i].map;
            }
        }
        return null;
    }

    function initChart(el) {
        // Skip if already initialized
        if (chartInstances.has(el)) return;

        var optionJson = el.getAttribute('data-echarts');
        if (!optionJson) return;

        var option;
        try {
            option = JSON.parse(optionJson);
        } catch (e) {
            console.error('[hikari] Invalid ECharts JSON on element:', el, e);
            return;
        }

        // If chart uses a map series, ensure GeoJSON is registered first
        var mapName = needsMapRegistration(option);
        if (mapName) {
            ensureMapRegistered(mapName).then(function() {
                _createChart(el, option);
            });
        } else {
            _createChart(el, option);
        }
    }

    function _createChart(el, option) {
        if (chartInstances.has(el)) return; // guard against double-init
        // RFC-006 R-8: Resolve __ref tooltip formatters before rendering
        resolveFormatters(option);
        var chart = echarts.init(el, 'hikari');
        chart.setOption(option);
        chartInstances.set(el, chart);
        liveChartElements.add(el);

        // Bridge chart click → entity URL navigation or HTMX drilldown
        // RFC-007 R-8: Entity metadata on data points enables entityUrl() navigation.
        // Priority: entityType+entityId → data-drilldown-url → no-op.
        var drillUrl = el.getAttribute('data-drilldown-url');
        chart.on('click', function(params) {
            var hasEntity = params.data && params.data.entityType && params.data.entityId;

            // RFC-007 R-14: Emit event buffer entry for chart interaction
            if (window.hikari && window.hikari.events) {
                var evtData = {
                    action: hasEntity ? 'entity_click' : 'navigate'
                };
                if (hasEntity) {
                    evtData.entity_type = params.data.entityType;
                    evtData.entity_id = String(params.data.entityId);
                }
                if (params.name) {
                    evtData.value = params.name;
                }
                window.hikari.events.emit(evtData);
            }

            // RFC-007 R-8: Entity metadata navigation takes priority
            if (hasEntity && window.hikari && window.hikari.entityUrl) {
                var entityUrl = window.hikari.entityUrl(params.data.entityType, String(params.data.entityId));
                if (entityUrl) {
                    window.location.href = entityUrl;
                    return;
                }
            }

            // Fallback: data-drilldown-url pattern (backward compat)
            if (drillUrl) {
                var url = drillUrl;
                if (params.name) {
                    url = url.replace('{name}', encodeURIComponent(params.name));
                }
                if (params.data && params.data.drillUrl) {
                    url = params.data.drillUrl;
                }
                var fallbackTarget = el.getAttribute('data-drilldown-target') || '#main-content';
                htmx.ajax('GET', url, { target: fallbackTarget, swap: 'innerHTML', pushUrl: true });
            }
        });

        // Responsive resize
        resizeObserver.observe(el);
    }

    function initAllCharts(root) {
        var elements = (root || document).querySelectorAll('[data-echarts]');
        for (var i = 0; i < elements.length; i++) {
            initChart(elements[i]);
        }
    }

    /* ------------------------------------------------------------------
     * 4. Dispose charts — prevent memory leaks
     * ----------------------------------------------------------------*/

    function disposeChart(el) {
        var chart = chartInstances.get(el);
        if (chart) {
            chart.dispose();
            chartInstances.delete(el);
            liveChartElements.delete(el);
            resizeObserver.unobserve(el);
        }
    }

    function disposeAllCharts(root) {
        var elements = (root || document).querySelectorAll('[data-echarts]');
        for (var i = 0; i < elements.length; i++) {
            disposeChart(elements[i]);
        }
    }

    /* ------------------------------------------------------------------
     * 5. ResizeObserver — responsive chart sizing
     * ----------------------------------------------------------------*/

    var resizeObserver = new ResizeObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
            var chart = chartInstances.get(entries[i].target);
            if (chart) {
                chart.resize();
            }
        }
    });

    /* ------------------------------------------------------------------
     * 6. HTMX lifecycle hooks
     * ----------------------------------------------------------------*/

    // Before swap: dispose charts in the target that will be replaced
    document.body.addEventListener('htmx:beforeSwap', function(evt) {
        var target = evt.detail.target;
        if (target) {
            disposeAllCharts(target);
        }
    });

    // After settle: init new charts in the swapped content.
    // Use afterSettle (not afterSwap) so elements have final dimensions —
    // ECharts needs a visible, sized container to render correctly.
    document.body.addEventListener('htmx:afterSettle', function(evt) {
        var target = evt.detail.target;
        if (target) {
            initAllCharts(target);
        }
    });

    // On initial page load: init charts already in the DOM.
    // Use both DOMContentLoaded and an immediate check — if the script
    // loads after DOMContentLoaded has already fired, the event won't
    // re-trigger, so we need the immediate fallback.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initAllCharts(document);
        });
    } else {
        // DOM already parsed — init immediately
        initAllCharts(document);
    }

    // Resize charts when accordion items expand (charts in collapsed
    // accordion have zero dimensions and need a resize on reveal).
    document.body.addEventListener('shown.bs.collapse', function(evt) {
        var el = evt.target;
        if (el && el.classList.contains('accordion-collapse')) {
            var charts = el.querySelectorAll('[data-echarts]');
            for (var i = 0; i < charts.length; i++) {
                var chart = chartInstances.get(charts[i]);
                if (chart) chart.resize();
            }
        }
    });

    /* ------------------------------------------------------------------
     * 7. Public API (for programmatic use if needed)
     * ----------------------------------------------------------------*/

    /* ------------------------------------------------------------------
     * 8. Named tooltip formatter registry (RFC-006 R-8)
     *
     * ECharts tooltips use named formatters instead of inline functions.
     * Python option builders set tooltip.formatter to { __ref: "name" }.
     * The glue module resolves __ref to a real function at init time.
     * ----------------------------------------------------------------*/

    var tooltipFormatters = {
        // Entity-aware tooltip: shows icon + name + key metric
        entity: function(params) {
            if (!params || !params.data) return '';
            var d = params.data;
            var name = d.name || params.name || '';
            var value = d.value !== undefined ? d.value : '';
            var entityType = d.entityType || '';
            var lines = ['<strong>' + name + '</strong>'];
            if (entityType) lines.push('<span class="text-muted small">' + entityType + '</span>');
            if (value !== '') lines.push(value);
            return lines.join('<br>');
        },

        // MIPS score tooltip with color coding
        mips: function(params) {
            if (!params || !params.data) return '';
            var d = params.data;
            var score = d.value !== undefined ? d.value : d.score;
            var name = d.name || params.name || '';
            var color = score >= 75 ? '#198754' : score >= 50 ? '#ffc107' : '#dc3545';
            return name + '<br><span style="color:' + color + ';font-weight:bold">' +
                   'MIPS: ' + (typeof score === 'number' ? score.toFixed(1) : score) + '</span>';
        },

        // Provider tooltip for chart data points
        provider: function(params) {
            if (!params || !params.data) return '';
            var d = params.data;
            var lines = [];
            if (d.name) lines.push('<strong>' + d.name + '</strong>');
            if (d.specialty) lines.push(d.specialty);
            if (d.score !== undefined) {
                var color = d.score >= 75 ? '#198754' : d.score >= 50 ? '#ffc107' : '#dc3545';
                lines.push('<span style="color:' + color + '">MIPS: ' + d.score.toFixed(1) + '</span>');
            }
            if (d.npi) lines.push('<span class="text-muted small">NPI: ' + d.npi + '</span>');
            return lines.join('<br>');
        },

        // Simple value tooltip (name: value)
        value: function(params) {
            if (!params) return '';
            return params.name + ': ' + (typeof params.value === 'number' ? params.value.toLocaleString() : params.value);
        },

        // Percentage tooltip
        percent: function(params) {
            if (!params) return '';
            return params.name + ': ' + (typeof params.value === 'number' ? params.value.toFixed(1) : params.value) + '%';
        }
    };

    /**
     * Resolve __ref tooltip formatters in an ECharts option object.
     * Walks the option tree and replaces { __ref: "name" } with the
     * registered formatter function.
     */
    function resolveFormatters(option) {
        if (!option) return option;

        // Resolve tooltip.formatter
        if (option.tooltip && option.tooltip.formatter && option.tooltip.formatter.__ref) {
            var ref = option.tooltip.formatter.__ref;
            if (tooltipFormatters[ref]) {
                option.tooltip.formatter = tooltipFormatters[ref];
            }
        }

        // Resolve series-level tooltip formatters
        if (option.series) {
            for (var i = 0; i < option.series.length; i++) {
                var s = option.series[i];
                if (s.tooltip && s.tooltip.formatter && s.tooltip.formatter.__ref) {
                    var sref = s.tooltip.formatter.__ref;
                    if (tooltipFormatters[sref]) {
                        s.tooltip.formatter = tooltipFormatters[sref];
                    }
                }
            }
        }

        return option;
    }

    window.hikariCharts = {
        init: initChart,
        initAll: initAllCharts,
        dispose: disposeChart,
        disposeAll: disposeAllCharts,
        getInstance: function(el) { return chartInstances.get(el); },
        formatters: tooltipFormatters,
        registerFormatter: function(name, fn) { tooltipFormatters[name] = fn; }
    };

})();

/* ------------------------------------------------------------------
 * Entity URL Resolver (RFC-007 R-6)
 *
 * Reads route templates from the <script id="hikari-entity-routes">
 * JSON data island emitted by the Django context processor, caches
 * them, and resolves entity type + id → canonical URL.
 * ----------------------------------------------------------------*/

(function() {
    'use strict';

    // Ensure the hikari namespace exists
    window.hikari = window.hikari || {};

    // Cached parsed routes (null = not yet loaded)
    var _routes = null;

    /**
     * Load and cache the entity routes from the JSON data island.
     * Returns the routes object or null if the element is missing.
     */
    function _getRoutes() {
        if (_routes !== null) return _routes;
        var el = document.getElementById('hikari-entity-routes');
        if (!el || !el.textContent) {
            _routes = {};
            return _routes;
        }
        try {
            _routes = JSON.parse(el.textContent);
        } catch (e) {
            console.error('[hikari] Failed to parse entity routes JSON:', e);
            _routes = {};
        }
        return _routes;
    }

    /**
     * Resolve the canonical URL for an entity detail page.
     *
     * @param {string} entityType  Entity type key (e.g. "provider", "group-practice").
     * @param {string} entityId    The entity's primary identifier value.
     * @param {Object} [params]    Optional query string parameters.
     * @returns {string|null}      URL string, or null if the entity type has no route.
     *
     * @example
     *   hikari.entityUrl("provider", "1811503170")
     *   // → "/provider/1811503170/"
     *
     *   hikari.entityUrl("specialty", "207Q00000X", {state: "NY"})
     *   // → "/specialty/207Q00000X/?state=NY"
     *
     *   hikari.entityUrl("unknown_type", "123")
     *   // → null
     */
    window.hikari.entityUrl = function(entityType, entityId, params) {
        var routes = _getRoutes();

        // Normalize: lowercase, hyphens → underscores (matches Python behavior)
        var key = entityType.toLowerCase().replace(/-/g, '_');
        var template = routes[key];
        if (!template) return null;

        var url = template.replace('{id}', encodeURIComponent(entityId));

        if (params && typeof params === 'object') {
            var parts = [];
            var keys = Object.keys(params);
            for (var i = 0; i < keys.length; i++) {
                parts.push(
                    encodeURIComponent(keys[i]) + '=' +
                    encodeURIComponent(params[keys[i]])
                );
            }
            if (parts.length > 0) {
                url = url + '?' + parts.join('&');
            }
        }

        return url;
    };

})();

/* ------------------------------------------------------------------
 * Event Buffer (RFC-007 R-13, R-14, R-15)
 *
 * In-memory event buffer for UI interaction tracking.
 * Events are plain JSON-serializable objects — no network calls.
 *
 * API:
 *   hikari.events.emit(event)     — append event to buffer
 *   hikari.events.getBuffer()     — return a copy of the buffer
 *   hikari.events.clear()         — empty the buffer
 *   hikari.events.size()          — current buffer length
 *
 * Action constants:
 *   hikari.events.FACET_ADD, FACET_REMOVE, ENTITY_CLICK,
 *   ENTITY_HOVER, LENS_SWITCH, NAVIGATE
 * ----------------------------------------------------------------*/

(function() {
    'use strict';

    window.hikari = window.hikari || {};

    /* -- Action type constants (R-13) ------------------------------ */
    var FACET_ADD     = 'facet_add';
    var FACET_REMOVE  = 'facet_remove';
    var ENTITY_CLICK  = 'entity_click';
    var ENTITY_HOVER  = 'entity_hover';
    var LENS_SWITCH   = 'lens_switch';
    var NAVIGATE      = 'navigate';

    /* -- Internal state -------------------------------------------- */
    var _buffer = [];
    var _maxSize = null; // read lazily on first emit

    /**
     * Read the max buffer size from `data-event-buffer-size` on <body>
     * or a `#hikari-config` element.  Defaults to 200.  Cached after
     * the first call so the DOM lookup happens only once.
     */
    function _getMaxSize() {
        if (_maxSize !== null) return _maxSize;

        var size = null;
        // Try <body data-event-buffer-size="...">
        var body = document.body;
        if (body) {
            size = body.getAttribute('data-event-buffer-size');
        }
        // Fallback: #hikari-config element
        if (!size) {
            var cfg = document.getElementById('hikari-config');
            if (cfg) {
                size = cfg.getAttribute('data-event-buffer-size');
            }
        }
        _maxSize = (size && parseInt(size, 10) > 0) ? parseInt(size, 10) : 200;
        return _maxSize;
    }

    /**
     * Append an event to the buffer (R-14).
     *
     * Adds `timestamp` automatically if not provided.
     * Drops the oldest event when the buffer exceeds max size.
     * MUST NOT trigger any network requests.
     *
     * @param {Object} event  Plain object with at least an `action` field.
     */
    function emit(event) {
        if (!event || typeof event.action !== 'string') {
            console.error('[hikari] events.emit: event must have a string "action" field');
            return;
        }

        // Auto-fill timestamp (seconds since epoch, float)
        if (event.timestamp === undefined || event.timestamp === null) {
            event.timestamp = Date.now() / 1000;
        }

        _buffer.push(event);

        // Evict oldest if over max
        var max = _getMaxSize();
        while (_buffer.length > max) {
            _buffer.shift();
        }
    }

    /**
     * Return a shallow copy of the buffer (R-15).
     * The result is JSON-serializable and not a reference to the
     * internal array.
     *
     * @returns {Array<Object>}
     */
    function getBuffer() {
        return _buffer.slice();
    }

    /**
     * Empty the buffer (useful for testing).
     */
    function clear() {
        _buffer = [];
    }

    /**
     * Return current buffer length.
     * @returns {number}
     */
    function size() {
        return _buffer.length;
    }

    /* -- Public API on hikari.events ------------------------------- */

    window.hikari.events = {
        // Methods
        emit:      emit,
        getBuffer: getBuffer,
        clear:     clear,
        size:      size,

        // Action constants
        FACET_ADD:     FACET_ADD,
        FACET_REMOVE:  FACET_REMOVE,
        ENTITY_CLICK:  ENTITY_CLICK,
        ENTITY_HOVER:  ENTITY_HOVER,
        LENS_SWITCH:   LENS_SWITCH,
        NAVIGATE:      NAVIGATE
    };

})();
