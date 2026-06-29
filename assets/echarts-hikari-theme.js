/**
 * Hikari ECharts Theme — CSS custom property driven.
 *
 * VENDORED COPY of src/hikari/ui/static/hikari/echarts-hikari-theme.js (do NOT edit
 * the original). Imported by the multi-page special_reports preview so charts match
 * the production palette. Registers the 'hikari' ECharts theme used by hikari.js
 * (echarts.init(el, 'hikari')) and by the preview's own charts.
 *
 * RFC-015 R-023: All color values are read from CSS custom properties at
 * runtime via getComputedStyle(). The 10-color entity palette maps 1:1 to
 * --hikari-* entity type variables defined in hikari.css.
 *
 * Theme registration occurs after DOMContentLoaded to ensure CSS variables
 * are available.
 *
 * No hardcoded hex values — every color derives from a CSS custom property.
 */
document.addEventListener('DOMContentLoaded', function () {
    var root = document.documentElement;

    /**
     * Read a CSS custom property value, trimmed.
     * @param {string} name - CSS variable name including '--' prefix.
     * @returns {string} The trimmed property value.
     */
    function cssVar(name) {
        return getComputedStyle(root).getPropertyValue(name).trim();
    }

    // ── Entity palette (10 colors, RFC-015 R-023) ────────────────────
    var entityPalette = [
        cssVar('--hikari-provider'),         // blue
        cssVar('--hikari-organization'),     // green
        cssVar('--hikari-facility'),         // red
        cssVar('--hikari-specialty'),        // amber
        cssVar('--hikari-group-practice'),   // cyan
        cssVar('--hikari-geography'),        // gray
        cssVar('--hikari-quality-measure'),  // indigo
        cssVar('--hikari-drug'),             // pink
        cssVar('--hikari-service'),          // orange
        cssVar('--hikari-aco')               // purple
    ];

    // ── Semantic tokens ──────────────────────────────────────────────
    var textPrimary   = cssVar('--hikari-text-primary');
    var textSecondary = cssVar('--hikari-text-secondary');
    var textMuted     = cssVar('--hikari-text-muted');
    var surfacePrimary = cssVar('--hikari-surface-primary');
    var dark          = cssVar('--hikari-dark');
    var primary       = cssVar('--hikari-primary');
    var primarySubtle = cssVar('--hikari-primary-subtle');
    var borderDefault = cssVar('--hikari-border-default');
    var borderSubtle  = cssVar('--hikari-border-subtle');
    var borderMuted   = cssVar('--hikari-border-muted');

    var theme = {
        color: entityPalette,

        backgroundColor: 'transparent',

        title: {
            textStyle: {
                color: textPrimary,
                fontSize: 16,
                fontWeight: 600,
                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            },
            subtextStyle: {
                color: textMuted,
                fontSize: 13
            }
        },

        legend: {
            textStyle: {
                color: textSecondary
            }
        },

        tooltip: {
            backgroundColor: dark,
            borderColor: textSecondary,
            borderWidth: 1,
            textStyle: {
                color: surfacePrimary
            },
            extraCssText: 'border-radius: 0.375rem; box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);'
        },

        categoryAxis: {
            axisLine: {
                lineStyle: { color: borderDefault }
            },
            axisTick: {
                lineStyle: { color: borderDefault }
            },
            axisLabel: {
                color: textSecondary
            },
            splitLine: {
                lineStyle: { color: borderSubtle }
            }
        },

        valueAxis: {
            axisLine: {
                lineStyle: { color: borderDefault }
            },
            axisTick: {
                lineStyle: { color: borderDefault }
            },
            axisLabel: {
                color: textSecondary
            },
            splitLine: {
                lineStyle: { color: borderSubtle, type: 'dashed' }
            }
        },

        line: {
            smooth: false,
            symbol: 'circle',
            symbolSize: 6
        },

        bar: {
            barMaxWidth: 40,
            itemStyle: {
                borderRadius: [2, 2, 0, 0]
            }
        },

        pie: {
            itemStyle: {
                borderColor: surfacePrimary,
                borderWidth: 2
            }
        },

        graph: {
            color: entityPalette.slice(0, 6),
            lineStyle: {
                color: borderMuted,
                width: 1.5
            },
            label: {
                color: textPrimary
            }
        },

        visualMap: {
            inRange: {
                color: [primarySubtle, primary]
            },
            textStyle: {
                color: textSecondary
            }
        },

        toolbox: {
            iconStyle: {
                borderColor: textMuted
            },
            emphasis: {
                iconStyle: {
                    borderColor: primary
                }
            }
        }
    };

    echarts.registerTheme('hikari', theme);
});
