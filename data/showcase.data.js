/* AUTO-GENERATED from data/showcase.json by build.py — DO NOT EDIT BY HAND.
 * Embeds the showcase snapshot as a global so pages never fetch() (file:// safe). */
window.SHOWCASE = {
  "meta": {
    "title": "Baltimore Metro",
    "subtitle": "7-county MSA · the EliteCare / Techstars showcase entity",
    "assembled_from": [
      "../../raw/e0_region_geography.json",
      "../../raw/e2_opportunity_targets.json",
      "../../raw/e4_techstars_ecosystem.json",
      "../../raw/e6_specialty_prescribing.json",
      "../../raw/e7_facility_quality.json",
      "../../raw/e8_growth_contacts.json",
      "../../raw/e11_metro_outliers.json",
      "../../raw/e12_temporal.json"
    ],
    "findings": [
      "../../findings/02-region-geography.md",
      "../../findings/04-opportunity-targets.md",
      "../../findings/08-specialty-prescribing.md",
      "../../findings/09-facility-quality.md",
      "../../findings/10-growth-contacts.md",
      "../../findings/13-metro-outliers.md",
      "../../findings/14-temporal.md",
      "../../findings/01j-web-maryland-ahead-tcoc.md",
      "../../findings/01k-mpir-ahead-deep.md"
    ],
    "generated_at": "2026-06-30T16:18:39.594266+00:00",
    "git_sha": "3786495dcb22428ce870c47d7ae3f2926801e777",
    "scope": "national",
    "note": "100% static snapshot. Every figure traces to a FACT in raw/*.json. Figures not present in the facts are labeled 'discovery pending'."
  },
  "region": {
    "fips_state": "24",
    "counties": [
      "24510",
      "24005",
      "24003",
      "24013",
      "24025",
      "24027",
      "24035"
    ],
    "names": {
      "24510": "Baltimore city",
      "24005": "Baltimore County",
      "24003": "Anne Arundel",
      "24013": "Carroll",
      "24025": "Harford",
      "24027": "Howard",
      "24035": "Queen Anne's"
    }
  },
  "hero": {
    "title": "Baltimore Metro",
    "entity_kind": "Metropolitan market (treated as an entity)",
    "location_line": "7 counties · Maryland (FIPS 24) · 510, 005, 003, 013, 025, 027, 035",
    "headline_stat": {
      "label": "Annual addressable market",
      "value_usd": 496294650.86138034,
      "figure_id": "tam_headline"
    },
    "verdict": "The Baltimore–Columbia–Towson metro is a 7-county, 550,864-beneficiary Medicare market that only makes sense once you account for Maryland's payment model. Medicare Advantage penetration is just 25.1% — about half the national 51% — but that is not market weakness: Maryland's all-payer system sets Medicare fee-for-service hospital rates, so this population is FFS by design, and the value-based machinery (hospital global budgets and, from January 2026, the AHEAD model) is delivered to those FFS beneficiaries. That reframes everything below. The metro carries the 3rd-highest Medicare readmission rate of all 205 large U.S. metros (21.1%, 99th percentile) — precisely the avoidable utilization that, under global budgets, is retained margin rather than lost fee-for-service; Maryland's model has already generated roughly $689M in net Medicare savings. Provider supply is specialist-heavy and primary-care-light (Internal Medicine ranks #6 per capita nationally while Family Practice ranks #183 of 209) — the exact gap AHEAD's primary-care investment is meant to close. And 90.2% of the metro's providers carry no quality score at all, leaving quality- and risk-based payment on the table under AHEAD's Enhanced Primary Care Payment. Net: low managed-care penetration, the nation's worst-tier readmissions, a thin primary-care base, and near-zero care-management capture combine into a $496M/yr recoverable opportunity — and in Maryland, closing it is not just new revenue, it is how systems perform under the model.",
    "kpis": [
      {
        "figure_id": "kpi_benes",
        "key": "tot_benes",
        "label": "Medicare benes",
        "icon": "bi-people",
        "kind": "count",
        "metro": 550864.0,
        "national": 69975706.0,
        "display": "550,864",
        "national_display": "69,975,706",
        "arrow": "scale",
        "sub": "0.79% of national Medicare"
      },
      {
        "figure_id": "kpi_ma_pct",
        "key": "ma_pct",
        "label": "Medicare Advantage %",
        "icon": "bi-shield-shaded",
        "kind": "pct",
        "metro": 25.068437944755875,
        "national": 51.040192434785865,
        "delta": -25.97175449002999,
        "ratio": 0.4911509292757048,
        "display": "25.1%",
        "national_display": "51.0%",
        "delta_display": "-26.0 pts",
        "arrow": "down"
      },
      {
        "figure_id": "kpi_dual_pct",
        "key": "dual_pct",
        "label": "Dual-eligible %",
        "icon": "bi-people-fill",
        "kind": "pct",
        "metro": 13.763106683319295,
        "national": 17.25581160981784,
        "delta": -3.4927049264985452,
        "ratio": 0.7975925441541479,
        "display": "13.8%",
        "national_display": "17.3%",
        "delta_display": "-3.5 pts",
        "arrow": "down"
      },
      {
        "figure_id": "kpi_risk",
        "key": "avg_risk_score",
        "label": "Avg HCC risk score",
        "icon": "bi-activity",
        "kind": "index",
        "metro": 1.0063739534411598,
        "national": 1.0044450327984642,
        "delta": 0.001928920642695564,
        "ratio": 1.0019203844707374,
        "display": "1.01",
        "national_display": "1.00",
        "delta_display": "+0.00",
        "arrow": "par"
      },
      {
        "figure_id": "kpi_ed",
        "key": "er_visits_per_1000",
        "label": "ED visits / 1,000",
        "icon": "bi-heart-pulse",
        "kind": "per1k",
        "metro": 561.5192268930502,
        "national": 583.3505062013039,
        "delta": -21.83127930825367,
        "ratio": 0.9625760514884681,
        "display": "562",
        "national_display": "583",
        "delta_display": "-22",
        "arrow": "down"
      },
      {
        "figure_id": "kpi_uninsured",
        "key": "pct_uninsured",
        "label": "Uninsured %",
        "icon": "bi-shield-exclamation",
        "kind": "pct",
        "metro": 5.858805608204823,
        "national": 9.457094600301255,
        "delta": -3.5982889920964327,
        "ratio": 0.6195143282185409,
        "display": "5.9%",
        "national_display": "9.5%",
        "delta_display": "-3.6 pts",
        "arrow": "down"
      },
      {
        "figure_id": "kpi_std_spend",
        "key": "std_pymt_pc",
        "label": "Std Medicare spend / capita",
        "icon": "bi-currency-dollar",
        "kind": "usd",
        "metro": 12326.572206098002,
        "national": 11886.199719684359,
        "delta": 440.37248641364386,
        "ratio": 1.0370490566202044,
        "display": "$12,327",
        "national_display": "$11,886",
        "delta_display": "+$440",
        "arrow": "up"
      },
      {
        "figure_id": "kpi_readmit",
        "key": "readmsn_pct",
        "label": "Readmission %",
        "icon": "bi-arrow-repeat",
        "kind": "prop_pct",
        "metro": 21.10114698679872,
        "national": 17.704182673799842,
        "delta": 3.396964312998879,
        "ratio": 1.1918735462454302,
        "display": "21.1%",
        "national_display": "17.7%",
        "delta_display": "+3.4 pts",
        "arrow": "up"
      },
      {
        "figure_id": "kpi_opioid",
        "key": "opioid_rate",
        "label": "Opioid prescribing %",
        "icon": "bi-capsule",
        "kind": "pct",
        "metro": 4.124947714301336,
        "national": 3.6736228055503073,
        "delta": 0.4513249087510287,
        "ratio": 1.1228555386985137,
        "display": "4.1%",
        "national_display": "3.7%",
        "delta_display": "+0.5 pts",
        "arrow": "up"
      }
    ],
    "outlier_stats": [
      {
        "eid": "readmit",
        "figure_id": "outlier_readmit",
        "icon": "bi-arrow-repeat",
        "label": "Medicare readmissions",
        "headline": "#3 highest of 205 U.S. metros",
        "detail": "21.1% readmission rate — 99th national percentile (CBSA 12580). Care management's #1 lever sits at a national extreme here.",
        "rank": 3,
        "n": 205,
        "percentile": 99.0,
        "value_display": "21.1%"
      },
      {
        "eid": "im",
        "figure_id": "outlier_im",
        "icon": "bi-graph-up-arrow",
        "label": "Specialist over-index",
        "headline": "Internal Medicine #6 · Critical Care #5",
        "detail": "Internal Medicine 260.1 / 100k benes (#6 of 209, 97.6 pct, 1,433 providers); Critical Care intensivists 28.0 / 100k (#5 of 192, 97.9 pct, 154 providers) — a specialist-dense metro.",
        "rank": 6,
        "n": 209,
        "percentile": 97.6,
        "value_display": "260.1 / 100k"
      },
      {
        "eid": "fp",
        "figure_id": "outlier_fp",
        "icon": "bi-graph-down-arrow",
        "label": "Primary-care scarcity",
        "headline": "Family Practice #183 of 209",
        "detail": "84.8 Family Practice providers / 100k benes — 12.5 national percentile (467 providers). Specialist-heavy, PCP-light: the gap AHEAD primary-care investment targets.",
        "rank": 183,
        "n": 209,
        "percentile": 12.5,
        "value_display": "84.8 / 100k"
      }
    ],
    "sparklines": [
      "tot_benes",
      "ma_pct",
      "er_visits_per_1000",
      "opioid_rate"
    ]
  },
  "counties_table": {
    "columns": [
      "County",
      "FIPS",
      "Medicare benes",
      "dual %",
      "disab %",
      "MA %",
      "uninsured %",
      "PC-HPSA",
      "MH-HPSA",
      "std spend/cap",
      "risk",
      "ED/1k",
      "readmit %",
      "opioid rx %"
    ],
    "rows": [
      {
        "name": "Baltimore city",
        "fips": "24510",
        "tot_benes": 102836,
        "dual_pct": 29.5,
        "disabled_pct": 15.2,
        "ma_pct": 35.9,
        "pct_uninsured": 7.2,
        "pc_hpsa": 24,
        "mh_hpsa": 22,
        "std_pymt_pc": 14156,
        "risk": 1.22,
        "ed1k": 822,
        "readmit_pct": 24.4,
        "opioid_rate": 4.3
      },
      {
        "name": "Baltimore County",
        "fips": "24005",
        "tot_benes": 173305,
        "dual_pct": 12.8,
        "disabled_pct": 8.6,
        "ma_pct": 25.7,
        "pct_uninsured": 6.4,
        "pc_hpsa": 17,
        "mh_hpsa": 18,
        "std_pymt_pc": 12473,
        "risk": 1.0,
        "ed1k": 537,
        "readmit_pct": 20.5,
        "opioid_rate": 3.6
      },
      {
        "name": "Anne Arundel",
        "fips": "24003",
        "tot_benes": 108817,
        "dual_pct": 8.2,
        "disabled_pct": 7.0,
        "ma_pct": 19.5,
        "pct_uninsured": 5.6,
        "pc_hpsa": 18,
        "mh_hpsa": 12,
        "std_pymt_pc": 11439,
        "risk": 0.94,
        "ed1k": 481,
        "readmit_pct": 20.4,
        "opioid_rate": 4.7
      },
      {
        "name": "Carroll",
        "fips": "24013",
        "tot_benes": 38080,
        "dual_pct": 7.3,
        "disabled_pct": 6.6,
        "ma_pct": 20.4,
        "pct_uninsured": 4.4,
        "pc_hpsa": 15,
        "mh_hpsa": 16,
        "std_pymt_pc": 11789,
        "risk": 0.92,
        "ed1k": 504,
        "readmit_pct": 19.3,
        "opioid_rate": 4.3
      },
      {
        "name": "Harford",
        "fips": "24025",
        "tot_benes": 56463,
        "dual_pct": 8.9,
        "disabled_pct": 8.2,
        "ma_pct": 24.9,
        "pct_uninsured": 4.9,
        "pc_hpsa": 14,
        "mh_hpsa": null,
        "std_pymt_pc": 12135,
        "risk": 0.94,
        "ed1k": 510,
        "readmit_pct": 20.8,
        "opioid_rate": 5.1
      },
      {
        "name": "Howard",
        "fips": "24027",
        "tot_benes": 58338,
        "dual_pct": 9.9,
        "disabled_pct": 5.2,
        "ma_pct": 19.2,
        "pct_uninsured": 4.5,
        "pc_hpsa": null,
        "mh_hpsa": null,
        "std_pymt_pc": 10955,
        "risk": 0.9,
        "ed1k": 393,
        "readmit_pct": 20.7,
        "opioid_rate": 3.8
      },
      {
        "name": "Queen Anne's",
        "fips": "24035",
        "tot_benes": 13025,
        "dual_pct": 6.7,
        "disabled_pct": 5.4,
        "ma_pct": 17.8,
        "pct_uninsured": 5.9,
        "pc_hpsa": 16,
        "mh_hpsa": 14,
        "std_pymt_pc": 11244,
        "risk": 0.91,
        "ed1k": 577,
        "readmit_pct": 16.1,
        "opioid_rate": 4.4
      }
    ],
    "metro_aggregate": {
      "name": "Metro aggregate",
      "fips": "—",
      "tot_benes": 550864,
      "dual_pct": 13.8,
      "disabled_pct": 8.9,
      "ma_pct": 25.1,
      "pct_uninsured": 5.9,
      "pc_hpsa": 24,
      "mh_hpsa": 22,
      "std_pymt_pc": 12327,
      "risk": 1.01,
      "ed1k": 562,
      "readmit_pct": 21.1,
      "opioid_rate": 4.1
    },
    "national_benchmark": {
      "name": "National benchmark",
      "fips": "—",
      "tot_benes": 69975706,
      "dual_pct": 17.3,
      "disabled_pct": 9.3,
      "ma_pct": 51.0,
      "pct_uninsured": 9.5,
      "pc_hpsa": null,
      "mh_hpsa": null,
      "std_pymt_pc": 11886,
      "risk": 1.0,
      "ed1k": 583,
      "readmit_pct": 17.7,
      "opioid_rate": 3.7
    }
  },
  "choropleth_layers": {
    "dual_pct": {
      "label": "Dual-eligible %",
      "by_fips": {
        "24510": 29.5,
        "24005": 12.8,
        "24003": 8.2,
        "24013": 7.3,
        "24025": 8.9,
        "24027": 9.9,
        "24035": 6.7
      },
      "unit": "%"
    },
    "ma_pct": {
      "label": "Medicare Advantage %",
      "by_fips": {
        "24510": 35.9,
        "24005": 25.7,
        "24003": 19.5,
        "24013": 20.4,
        "24025": 24.9,
        "24027": 19.2,
        "24035": 17.8
      },
      "unit": "%"
    },
    "ed1k": {
      "label": "ED visits / 1,000",
      "by_fips": {
        "24510": 822,
        "24005": 537,
        "24003": 481,
        "24013": 504,
        "24025": 510,
        "24027": 393,
        "24035": 577
      },
      "unit": ""
    },
    "readmit_pct": {
      "label": "Readmission %",
      "by_fips": {
        "24510": 24.4,
        "24005": 20.5,
        "24003": 20.4,
        "24013": 19.3,
        "24025": 20.8,
        "24027": 20.7,
        "24035": 16.1
      },
      "unit": "%"
    },
    "std_pymt_pc": {
      "label": "Std Medicare spend / capita",
      "by_fips": {
        "24510": 14156,
        "24005": 12473,
        "24003": 11439,
        "24013": 11789,
        "24025": 12135,
        "24027": 10955,
        "24035": 11244
      },
      "unit": "$"
    },
    "risk": {
      "label": "Avg HCC risk score",
      "by_fips": {
        "24510": 1.22,
        "24005": 1.0,
        "24003": 0.94,
        "24013": 0.92,
        "24025": 0.94,
        "24027": 0.9,
        "24035": 0.91
      },
      "unit": ""
    },
    "providers": {
      "label": "Scored providers (panel>0 region)",
      "by_fips": {
        "24510": 27399,
        "24005": 22495,
        "24003": 10669,
        "24013": 2144,
        "24025": 3867,
        "24027": 9532,
        "24035": 448
      },
      "unit": ""
    },
    "missing_mips_pct": {
      "label": "Missing-MIPS (no quality score) %",
      "by_fips": {
        "24510": 85.8,
        "24005": 92.1,
        "24003": 92.3,
        "24013": 91.4,
        "24025": 92.9,
        "24027": 94.6,
        "24035": 92.9
      },
      "unit": "%"
    },
    "missing_mips_count": {
      "label": "Providers with no CMS quality score",
      "by_fips": {
        "24510": 23502,
        "24005": 20726,
        "24003": 9844,
        "24013": 1959,
        "24025": 3593,
        "24027": 9014,
        "24035": 416
      },
      "unit": ""
    }
  },
  "tam": {
    "figure_id": "tam_headline",
    "headline_usd": 496294650.86138034,
    "headline_display": "$496,294,651",
    "region_ffs_benes": 342252,
    "region_total_benes": 551689,
    "region_discharge_episodes": 48356,
    "region_readmissions": 15920,
    "levers": [
      {
        "figure_id": "tam_ccm",
        "lever": "CCM / APCM",
        "result_usd": 154668511.39823997,
        "result_display": "$154,668,511",
        "eligible": 236154,
        "unserved": 228125,
        "rate_display": "$56.50 / patient / mo"
      },
      {
        "figure_id": "tam_rpm",
        "lever": "RPM",
        "result_usd": 332398529.46314037,
        "result_display": "$332,398,529",
        "eligible": 298730,
        "served": 4050,
        "gap": 294680,
        "rate_display": "$94.00 / patient / mo"
      },
      {
        "figure_id": "tam_tcm",
        "lever": "TCM",
        "result_usd": 9227610.0,
        "result_display": "$9,227,610",
        "episodes": 48356,
        "served": 10304,
        "gap": 38052,
        "rate_display": "$242.50 / episode"
      }
    ],
    "add_ons": [
      {
        "label": "BHI (behavioral) eligible",
        "value_display": "276,451 benes",
        "note": "Per-code $ absent from RATES — count-only add-on. Not in headline."
      },
      {
        "label": "AWV / HCC recapture",
        "value_display": "$2.4M–$9.7M / yr",
        "note": "Post-discharge RAF recapture. Not in headline."
      },
      {
        "label": "MIPS quality uplift",
        "value_display": "up to $18.6M / yr",
        "note": "2,425 region providers below MIPS 75; $206.6M allowed at risk ± 9%. Not in headline."
      }
    ],
    "cross_check_note": "Gross provider-summed UPPER BOUND (double-counts population): CCM $2.84B, RPM $4.26B. Headline is population-anchored to avoid the CCM single-biller double-count."
  },
  "target_groups": {
    "n": 1698,
    "solo_unassigned": {
      "providers": 4309,
      "panel": 903017,
      "annual_oppty_display": "$581,865,295"
    },
    "columns": [
      "org_pac_id",
      "Group practice",
      "County",
      "Providers",
      "Panel",
      "Avg MIPS",
      "Annual oppty"
    ],
    "top": [
      {
        "org_pac_id": "1254327950",
        "name": "Advanced Radiology P A",
        "county": "Baltimore County",
        "providers": 88,
        "panel": 283583,
        "avg_mips": 79.15,
        "annual_oppty": 186347600,
        "annual_oppty_display": "$186,347,600"
      },
      {
        "org_pac_id": "0547413825",
        "name": "Medstar Medical Group Ii Llc",
        "county": "Baltimore city",
        "providers": 762,
        "panel": 256200,
        "avg_mips": 81.13,
        "annual_oppty": 169758839,
        "annual_oppty_display": "$169,758,839"
      },
      {
        "org_pac_id": "4981745098",
        "name": "Johns Hopkins University",
        "county": "Baltimore city",
        "providers": 379,
        "panel": 105715,
        "avg_mips": 74.91,
        "annual_oppty": 70160288,
        "annual_oppty_display": "$70,160,288"
      },
      {
        "org_pac_id": "2860447315",
        "name": "Luminis Health Medical Group, Llc",
        "county": "Anne Arundel",
        "providers": 234,
        "panel": 70437,
        "avg_mips": 80.83,
        "annual_oppty": 45744003,
        "annual_oppty_display": "$45,744,003"
      },
      {
        "org_pac_id": "0941112346",
        "name": "Sinai Hospital Of Baltimore, Inc",
        "county": "Baltimore city",
        "providers": 204,
        "panel": 67453,
        "avg_mips": 78.06,
        "annual_oppty": 44763337,
        "annual_oppty_display": "$44,763,337"
      },
      {
        "org_pac_id": "4385538735",
        "name": "Patient First Maryland Medical Group Pllc",
        "county": "Baltimore County",
        "providers": 122,
        "panel": 66887,
        "avg_mips": 65.12,
        "annual_oppty": 42565590,
        "annual_oppty_display": "$42,565,590"
      },
      {
        "org_pac_id": "7719882943",
        "name": "St Paul Place Specialists, Inc.",
        "county": "Baltimore city",
        "providers": 131,
        "panel": 64676,
        "avg_mips": 83.28,
        "annual_oppty": 42036299,
        "annual_oppty_display": "$42,036,299"
      },
      {
        "org_pac_id": "3678472214",
        "name": "University Of Maryland Community Medical Group Inc",
        "county": "Anne Arundel",
        "providers": 148,
        "panel": 61114,
        "avg_mips": 85.43,
        "annual_oppty": 40518266,
        "annual_oppty_display": "$40,518,266"
      },
      {
        "org_pac_id": "4789673393",
        "name": "Chesapeake Urology Associates Llc",
        "county": "Baltimore County",
        "providers": 91,
        "panel": 60119,
        "avg_mips": 84.14,
        "annual_oppty": 37153339,
        "annual_oppty_display": "$37,153,339"
      },
      {
        "org_pac_id": "2769394808",
        "name": "University Of Maryland Physicians Pa",
        "county": "Baltimore city",
        "providers": 239,
        "panel": 53173,
        "avg_mips": 93.64,
        "annual_oppty": 35582789,
        "annual_oppty_display": "$35,582,789"
      }
    ],
    "median": [
      {
        "org_pac_id": "9537582689",
        "name": "Sparks Physical Therapy, Inc.",
        "county": "Baltimore County",
        "providers": 6,
        "panel": 349,
        "avg_mips": null,
        "annual_oppty": 197124,
        "annual_oppty_display": "$197,124"
      }
    ],
    "bottom": [
      {
        "org_pac_id": "5991942898",
        "name": "Ohrh, Llc",
        "county": "Carroll",
        "providers": 1,
        "panel": 12,
        "avg_mips": null,
        "annual_oppty": 5614,
        "annual_oppty_display": "$5,614"
      },
      {
        "org_pac_id": "7113835380",
        "name": "Open Door Family Medical Center Inc",
        "county": "Anne Arundel",
        "providers": 1,
        "panel": 12,
        "avg_mips": null,
        "annual_oppty": 5614,
        "annual_oppty_display": "$5,614"
      },
      {
        "org_pac_id": "8325050701",
        "name": "Compass Regional Hospice Inc.",
        "county": "Queen Anne's",
        "providers": 1,
        "panel": 11,
        "avg_mips": 86.67,
        "annual_oppty": 5146,
        "annual_oppty_display": "$5,146"
      },
      {
        "org_pac_id": "2668369109",
        "name": "Aids Healthcare Foundation",
        "county": "Baltimore city",
        "providers": 1,
        "panel": 11,
        "avg_mips": 87.83,
        "annual_oppty": 5146,
        "annual_oppty_display": "$5,146"
      },
      {
        "org_pac_id": "8527424837",
        "name": "Oasis The Mental Health Center Llc",
        "county": "Baltimore County",
        "providers": 1,
        "panel": 11,
        "avg_mips": null,
        "annual_oppty": 5146,
        "annual_oppty_display": "$5,146"
      }
    ]
  },
  "target_providers": {
    "n": 14199,
    "fit_caveat": "PRE-FIT ranking by raw recoverable $ annual_oppty BEFORE the E6 specialty/prescribing-fit filter and E3 graph leverage. High-volume diagnostic specialties (radiology, pathology) surface by panel size alone; their panel is imaging/lab throughput, not a managed primary panel. Read $ as the upper envelope.",
    "columns": [
      "NPI",
      "Name",
      "Specialty",
      "County",
      "Panel",
      "Dual %",
      "Risk",
      "Chronic %",
      "Eligible CCM",
      "Billed",
      "MIPS",
      "Annual oppty"
    ],
    "top": [
      {
        "npi": "1538690458",
        "name": "ERNEST BATISTA",
        "spec": "DIAGNOSTIC RADIOLOGY",
        "county": "Baltimore city",
        "panel": 7292,
        "dual_pct": 19.6,
        "risk": 1.69,
        "chronic_pct": 98.6,
        "eligible_ccm": 7189,
        "billed": 0,
        "mips": 74.4,
        "annual_oppty": 4874182,
        "annual_oppty_display": "$4,874,182"
      },
      {
        "npi": "1417140096",
        "name": "THOMAS METKUS",
        "spec": "CARDIOVASCULAR DISEASE (CARDIOLOGY)",
        "county": "Baltimore city",
        "panel": 5820,
        "dual_pct": 30.7,
        "risk": 2.43,
        "chronic_pct": 99.5,
        "eligible_ccm": 5790,
        "billed": 0,
        "mips": 75.0,
        "annual_oppty": 3925699,
        "annual_oppty_display": "$3,925,699"
      },
      {
        "npi": "1518935485",
        "name": "RICHARD PFAU",
        "spec": "PATHOLOGY",
        "county": "Anne Arundel",
        "panel": 6101,
        "dual_pct": 3.3,
        "risk": 0.99,
        "chronic_pct": 92.1,
        "eligible_ccm": 5621,
        "billed": 0,
        "mips": 100.0,
        "annual_oppty": 3811313,
        "annual_oppty_display": "$3,811,313"
      },
      {
        "npi": "1912943648",
        "name": "DAVID FOX",
        "spec": "DIAGNOSTIC RADIOLOGY",
        "county": "Baltimore County",
        "panel": 5801,
        "dual_pct": 14.0,
        "risk": 1.26,
        "chronic_pct": 96.7,
        "eligible_ccm": 5612,
        "billed": 0,
        "mips": null,
        "annual_oppty": 3805164,
        "annual_oppty_display": "$3,805,164"
      },
      {
        "npi": "1841504503",
        "name": "MATTHEW WAGNER",
        "spec": "DIAGNOSTIC RADIOLOGY",
        "county": "Anne Arundel",
        "panel": 5597,
        "dual_pct": 14.9,
        "risk": 1.38,
        "chronic_pct": 97.3,
        "eligible_ccm": 5447,
        "billed": 0,
        "mips": 86.67,
        "annual_oppty": 3693105,
        "annual_oppty_display": "$3,693,105"
      },
      {
        "npi": "1316919772",
        "name": "VICTOR BRACEY",
        "spec": "DIAGNOSTIC RADIOLOGY",
        "county": "Baltimore County",
        "panel": 5549,
        "dual_pct": 12.7,
        "risk": 1.18,
        "chronic_pct": 96.2,
        "eligible_ccm": 5336,
        "billed": 0,
        "mips": 86.25,
        "annual_oppty": 3617549,
        "annual_oppty_display": "$3,617,549"
      },
      {
        "npi": "1902879190",
        "name": "ANDREW MORTON",
        "spec": "DIAGNOSTIC RADIOLOGY",
        "county": "Baltimore County",
        "panel": 5521,
        "dual_pct": 12.6,
        "risk": 1.19,
        "chronic_pct": 96.4,
        "eligible_ccm": 5324,
        "billed": 0,
        "mips": 86.25,
        "annual_oppty": 3609730,
        "annual_oppty_display": "$3,609,730"
      },
      {
        "npi": "1780611665",
        "name": "HARDEEP SINGH",
        "spec": "DIAGNOSTIC RADIOLOGY",
        "county": "Baltimore County",
        "panel": 5769,
        "dual_pct": 10.4,
        "risk": 0.82,
        "chronic_pct": 91.5,
        "eligible_ccm": 5277,
        "billed": 0,
        "mips": null,
        "annual_oppty": 3578122,
        "annual_oppty_display": "$3,578,122"
      },
      {
        "npi": "1437442324",
        "name": "MICHAEL TRAKHTENBROIT",
        "spec": "DIAGNOSTIC RADIOLOGY",
        "county": "Baltimore city",
        "panel": 5315,
        "dual_pct": 9.1,
        "risk": 2.07,
        "chronic_pct": 98.8,
        "eligible_ccm": 5251,
        "billed": 0,
        "mips": 84.34,
        "annual_oppty": 3560397,
        "annual_oppty_display": "$3,560,397"
      },
      {
        "npi": "1902897895",
        "name": "JASON DITTRICH",
        "spec": "DIAGNOSTIC RADIOLOGY",
        "county": "Anne Arundel",
        "panel": 5184,
        "dual_pct": 9.2,
        "risk": 1.48,
        "chronic_pct": 97.6,
        "eligible_ccm": 5057,
        "billed": 0,
        "mips": null,
        "annual_oppty": 3428971,
        "annual_oppty_display": "$3,428,971"
      }
    ],
    "median": [
      {
        "npi": "1578908307",
        "name": "JOHN BARRETT",
        "spec": "—",
        "county": "Baltimore County",
        "panel": 149,
        "dual_pct": 30.9,
        "risk": 2.74,
        "chronic_pct": 99.1,
        "eligible_ccm": 148,
        "billed": 0,
        "mips": 83.94,
        "annual_oppty": 100144,
        "annual_oppty_display": "$100,144"
      }
    ],
    "bottom": [
      {
        "npi": "1932768199",
        "name": "COURTNEY O'NEILL",
        "spec": "—",
        "county": "Carroll",
        "panel": 69,
        "dual_pct": 20.3,
        "risk": 2.2,
        "chronic_pct": 99.3,
        "eligible_ccm": 69,
        "billed": 66,
        "mips": null,
        "annual_oppty": 1713,
        "annual_oppty_display": "$1,713"
      },
      {
        "npi": "1063570182",
        "name": "MARTIN LINKER",
        "spec": "INTERNAL MEDICINE",
        "county": "Baltimore County",
        "panel": 77,
        "dual_pct": 39.0,
        "risk": 2.29,
        "chronic_pct": 97.8,
        "eligible_ccm": 75,
        "billed": 68,
        "mips": null,
        "annual_oppty": 4932,
        "annual_oppty_display": "$4,932"
      },
      {
        "npi": "1366141046",
        "name": "REBECCA MONTENEGRO",
        "spec": "NURSE PRACTITIONER",
        "county": "Anne Arundel",
        "panel": 11,
        "dual_pct": 0.0,
        "risk": 0.47,
        "chronic_pct": 0.0,
        "eligible_ccm": 8,
        "billed": 0,
        "mips": null,
        "annual_oppty": 5146,
        "annual_oppty_display": "$5,146"
      },
      {
        "npi": "1073753521",
        "name": "DANIEL KAY",
        "spec": "CHIROPRACTIC",
        "county": "Anne Arundel",
        "panel": 11,
        "dual_pct": 0.0,
        "risk": 0.52,
        "chronic_pct": 0.0,
        "eligible_ccm": 8,
        "billed": 0,
        "mips": null,
        "annual_oppty": 5146,
        "annual_oppty_display": "$5,146"
      },
      {
        "npi": "1033572011",
        "name": "KATELYN URIBE",
        "spec": "OBSTETRICS/GYNECOLOGY",
        "county": "Baltimore city",
        "panel": 11,
        "dual_pct": 0.0,
        "risk": 1.47,
        "chronic_pct": 0.0,
        "eligible_ccm": 8,
        "billed": 0,
        "mips": 74.4,
        "annual_oppty": 5146,
        "annual_oppty_display": "$5,146"
      }
    ]
  },
  "roster": {
    "figure_id": "roster_summary",
    "roster_size": 15,
    "members_with_any_match": 5,
    "clean_in_region_matches": 2,
    "note": "Techstars / JHTV / MedStar / UMMS / CareFirst ecosystem roster searched against the national provider directory (dim_provider) by exact name. Most are administrators/investors with no NPI — expected. Clean clinical matches resolve to in-region Baltimore providers.",
    "members": [
      {
        "name": "Nick Culbertson",
        "org": "Techstars",
        "role": "Managing Director",
        "matched": false,
        "in_region": false,
        "npi": null,
        "photo": "nick_culbertson.jpg",
        "interviewer": true,
        "pinned": true,
        "bio": "We interview with him. Co-founder/CEO of Protenus (Baltimore health-AI; sold tech into Johns Hopkins Health System); MD candidate, Johns Hopkins SOM; 8-yr Army Special Forces, two Bronze Stars; Tillman Scholar. Stated bar: “ROI drives adoption.” (findings 01c/01f)"
      },
      {
        "name": "Emily McLanahan",
        "org": "Techstars",
        "role": "Investment Manager",
        "matched": false,
        "in_region": false,
        "npi": null,
        "photo": "emily_mclanahan.jpg",
        "interviewer": true,
        "pinned": true,
        "bio": "Our first interview. Leads sourcing, diligence & portfolio support; RevOps → Investor arc. Screens for commercial traction. (findings 01c)"
      },
      {
        "name": "Brian Hasselfeld",
        "org": "Johns Hopkins Medicine",
        "role": "Exec Medical Director, Digital Health & Innovation",
        "matched": true,
        "in_region": true,
        "npi": "1700270360",
        "spec": "INTERNAL MEDICINE",
        "city": "BALTIMORE",
        "state": "MD",
        "mips": 86.79,
        "photo": "brian_hasselfeld.jpg",
        "bio": "In our provider data — a live demo beat. Digital-health/telehealth buyer persona at Hopkins; MD Tulane. NPI 1700270360, Internal Medicine, Baltimore MD, MIPS 86.79. (findings 01d)"
      },
      {
        "name": "Peter Najjar",
        "org": "Johns Hopkins Health System",
        "role": "VP, Clinical Innovation",
        "matched": true,
        "in_region": true,
        "npi": "1952691214",
        "spec": "GENERAL SURGERY",
        "city": "BALTIMORE",
        "state": "MD",
        "mips": null,
        "photo": "peter_najjar.jpg",
        "bio": "In our provider data. Founder-physician (Safetower); robotic colorectal surgery, Armstrong Institute; MBA Harvard. Hopkins profile image filename contains the exact NPI → high-confidence match. NPI 1952691214. (findings 01d)"
      },
      {
        "name": "Ashley Kovacs",
        "org": "Techstars",
        "role": "Program Manager",
        "matched": true,
        "in_region": false,
        "npi": "1245903095",
        "spec": "— (DPT)",
        "city": "CAMP LEJEUNE",
        "state": "NC",
        "mips": null,
        "photo": "ashley_kovacs.jpg",
        "bio": "Cohort logistics & mentor/investor scheduling. Name match resolves out of region (Camp Lejeune NC, DPT) — not our subject. (findings 01d)"
      },
      {
        "name": "Myra Norton",
        "org": "JHTV",
        "role": "Head of Innovation, Startup & Ecosystem Acceleration",
        "matched": false,
        "in_region": false,
        "npi": null,
        "photo": "myra_norton.jpg",
        "bio": "Controls the Hopkins startup/ecosystem on-ramp (FastForward incubator, founder network). No provider NPI — administrator. (findings 01d)"
      },
      {
        "name": "Sha Zhan",
        "org": "JHTV",
        "role": "Director, AI Innovation & Commercialization",
        "matched": false,
        "in_region": false,
        "npi": null,
        "photo": "sha_zhan.jpg",
        "bio": "AI-commercialization + FDA-pathway expert (ex-PathAI, Kheiron). Aligns with the AI-health thesis. No provider NPI. (findings 01d)"
      },
      {
        "name": "William Sheahan",
        "org": "MedStar",
        "role": "SVP & Chief Innovation Officer, MI2",
        "matched": true,
        "in_region": false,
        "npi": "1326376443",
        "spec": "PHYSICIAN ASSISTANT",
        "city": "CHICAGO",
        "state": "IL",
        "mips": null,
        "ambiguous": true,
        "match_count": 2,
        "photo": "william_sheahan.jpg",
        "bio": "Top of MedStar's innovation org; the executive sponsor for a MedStar-network deployment. Name match ambiguous (2 hits, out of region). (findings 01d)"
      },
      {
        "name": "Jeff Collins",
        "org": "MedStar",
        "role": "VP, Business Innovation Lab",
        "matched": true,
        "in_region": false,
        "npi": null,
        "spec": "ambiguous",
        "city": "—",
        "state": "—",
        "mips": null,
        "ambiguous": true,
        "match_count": 29,
        "photo": "jeff_collins.jpg",
        "bio": "Diligence + venture gateway into MedStar (Frist Cressey, Suki partnership). Name too common to resolve (29 hits) — no clean NPI. (findings 01d)"
      },
      {
        "name": "Daniel Marchalik",
        "org": "MedStar",
        "role": "Medical Director, Business Innovation Lab",
        "matched": false,
        "in_region": false,
        "npi": null,
        "photo": "daniel_marchalik.jpg",
        "bio": "Practicing urologist (MedStar Georgetown, DC) + Venture Partner at Flare Capital. Practices in DC, not MD — not in the in-region match set. (findings 01d)"
      },
      {
        "name": "Warren D'Souza",
        "org": "UMMS",
        "role": "SVP & Chief Innovation Officer (iHarbor)",
        "matched": false,
        "in_region": false,
        "npi": null,
        "photo": "warren_dsouza.jpg",
        "bio": "Owns UMMS data+analytics+innovation (ex-CDAO); PhD medical physics, not MD. The most data-literate advisor. No clean provider NPI. (findings 01d)"
      },
      {
        "name": "Guy Henggeler",
        "org": "UMMS",
        "role": "VP, iHarbor Strategy & Commercialization",
        "matched": false,
        "in_region": false,
        "npi": null,
        "photo": "guy_henggeler.jpg",
        "bio": "Commercialization operator at UMMS; spun out Gallion Health (first iHarbor spinout). No provider NPI. (findings 01d)"
      },
      {
        "name": "Laura Gomez Cadena",
        "org": "CareFirst/Healthworx",
        "role": "VC Investor",
        "matched": false,
        "in_region": false,
        "npi": null,
        "photo": "laura_gomez_cadena.jpg",
        "bio": "Payer-VC at Healthworx (CareFirst CVC); Global Venturing Rising Star 2026. Care-mgmt + quality maps to CareFirst VBC goals. No provider NPI. (findings 01d)"
      },
      {
        "name": "Rick Jeandell",
        "org": "CareFirst",
        "role": "VP IT / Commercial Markets",
        "matched": false,
        "in_region": false,
        "npi": null,
        "photo": "rick_jeandell.jpg",
        "bio": "Payer IT + distribution path on the CareFirst side; tied to the Techstars collaboration. No provider NPI. (findings 01d)"
      },
      {
        "name": "Matt Hellauer",
        "org": "PTX Capital",
        "role": "Managing Partner",
        "matched": false,
        "in_region": false,
        "npi": null,
        "photo": "matt_hellauer.jpg",
        "bio": "Local capital; the only pure-VC advisor outside the corporate CVCs. Co-investment/intro path. No provider NPI. (findings 01d)"
      }
    ]
  },
  "techstars_card": {
    "figure_id": "techstars_card",
    "label": "Techstars AI Health Baltimore",
    "tagline": "The accelerator we're pitching — measured against our own data.",
    "pills": [
      {
        "icon": "bi-people-fill",
        "value": "2",
        "label": "mentors in our graph"
      },
      {
        "icon": "bi-cash-stack",
        "value": "$496.3M",
        "label": "metro TAM"
      },
      {
        "icon": "bi-diagram-3",
        "value": "76,554",
        "label": "region providers (ZIP→county resolved)"
      },
      {
        "icon": "bi-buildings",
        "value": "5",
        "label": "anchor institutions"
      }
    ],
    "anchors_note": "Anchors: Johns Hopkins, CareFirst BCBS, MedStar Health, University of Maryland Baltimore, UMMS. Roster of 15 (3 team + 12 advisors); 2 advisors (Hasselfeld, Najjar) resolve to in-region provider NPIs."
  },
  "sports": {
    "headline": "Baltimore loves its teams — and its teams get the highest-caliber care.",
    "subhead": "MedStar Health is the official medical team of BOTH major franchises. MedStar is also a Techstars AI Health Baltimore anchor mentor — the sports → MedStar → our-provider-graph chain ties the beloved local teams straight to a mentor whose network EliteCare would deploy through.",
    "medstar_note": "MedStar Health = a Techstars anchor institution (advisors Sheahan, Collins, Marchalik) AND the official medical partner of the Ravens (since 2004, extended through 2035) and the Orioles (multi-year, renewed). MedStar cites 100+ team partnerships — the most of any system in the region. (findings 01g/01h/01i)",
    "teams": [
      {
        "eid": "ravens",
        "name": "Baltimore Ravens",
        "league": "NFL",
        "venue": "M&T Bank Stadium",
        "logo": "ravens.png",
        "partner": "MedStar Health — trusted medical provider since 2004, extended through 2035 (21+ yrs).",
        "physician": null,
        "physician_status": "discovery pending",
        "physician_note": "Head team-physician name not yet resolved to an NPI. MedStar provides the medical team; per findings 01h the specific physician is an open/next-pass item."
      },
      {
        "eid": "orioles",
        "name": "Baltimore Orioles",
        "league": "MLB",
        "venue": "Oriole Park at Camden Yards (1992)",
        "logo": "orioles.png",
        "partner": "MedStar Health — Official Medical Team of the Baltimore Orioles (multi-year, renewed; “a decade”).",
        "physician": "curl",
        "physician_status": "matched"
      }
    ],
    "curl": {
      "figure_id": "sports_curl",
      "npi": "1659348738",
      "name": "Leigh Ann Curl, MD",
      "team": "Baltimore Orioles — team physician",
      "headline": "The Orioles' team physician is a top-tier orthopedic surgeon in our data.",
      "best_stats": [
        {
          "icon": "bi-award",
          "value": "80.18",
          "label": "Final MIPS score"
        },
        {
          "icon": "bi-bullseye",
          "value": "100",
          "label": "Promoting Interoperability (PI) category"
        },
        {
          "icon": "bi-clipboard2-pulse",
          "value": "Orthopedic Surgery",
          "label": "Primary specialty (corroborates team role)"
        },
        {
          "icon": "bi-mortarboard",
          "value": "Johns Hopkins SOM",
          "label": "Medical school (grad 1989)"
        },
        {
          "icon": "bi-geo-alt",
          "value": "Baltimore, MD",
          "label": "Practice location"
        },
        {
          "icon": "bi-hospital",
          "value": "MedStar",
          "label": "Affiliated group (org_pac_id 0547413825)"
        }
      ],
      "pride_note": "Celebration framing (spec §4b-sports): only flattering stats surfaced — MIPS 80.18, perfect PI category, Hopkins-trained, the on-team orthopedic specialty. MedStar = a Techstars anchor mentor, closing the sports → mentor loop.",
      "top_services": [
        {
          "hcpcs": "27447",
          "desc": "Total knee arthroplasty",
          "avg_pmt_display": "$1,062.26"
        },
        {
          "hcpcs": "20610",
          "desc": "Major joint aspiration/injection",
          "services": 54
        },
        {
          "hcpcs": "99214",
          "desc": "Established-patient office visit (level 4)",
          "avg_pmt_display": "$95.53"
        }
      ]
    }
  },
  "graph": {
    "subgraph_census": {
      "region_providers": 100845,
      "region_facilities": 515,
      "note": "Baltimore subgraph of hikari_national: Provider{state:'MD'} with city in the 133-city metro set, plus connected facilities/groups/ACOs/drugs. (findings 11 §1)"
    },
    "edge_census": {
      "columns": [
        "Edge type",
        "Neighbor",
        "Edges",
        "Distinct neighbors",
        "Providers w/ edge"
      ],
      "rows": [
        {
          "edge": "LOCATED_IN",
          "neighbor": "Geography",
          "edges": 75078,
          "distinct": 162,
          "providers": 75078,
          "complete": true
        },
        {
          "edge": "HAS_SPECIALTY",
          "neighbor": "Specialty",
          "edges": 73754,
          "distinct": 399,
          "providers": 71388,
          "complete": true
        },
        {
          "edge": "PRESCRIBES",
          "neighbor": "Drug",
          "edges": 195767,
          "distinct": 1119,
          "providers": 11223,
          "complete": true
        },
        {
          "edge": "BILLS_FOR",
          "neighbor": "Service",
          "edges": 116500,
          "distinct": 2820,
          "providers": 13886,
          "complete": true
        },
        {
          "edge": "BILLS_THROUGH",
          "neighbor": "GroupPractice",
          "edges": 37931,
          "distinct": 6290,
          "providers": 20353,
          "complete": true
        },
        {
          "edge": "PRACTICES_AT",
          "neighbor": "Facility",
          "edges": 5515,
          "distinct": 1225,
          "providers": 2270,
          "complete": false
        },
        {
          "edge": "MEMBER_OF",
          "neighbor": "ACO",
          "edges": 1302,
          "distinct": 165,
          "providers": 1151,
          "complete": true
        }
      ]
    },
    "degree_centrality": {
      "figure_id": "graph_degree",
      "title": "Top connectivity providers (degree / membership centrality)",
      "metric": "complete_leverage = MEMBER_OF (ACO) + BILLS_THROUGH (GroupPractice); both complete, load-bearing.",
      "envelope": {
        "n": 100845,
        "median": 0,
        "min": 0,
        "max": 91
      },
      "columns": [
        "NPI",
        "Name",
        "City",
        "ACO deg",
        "Group deg",
        "Fac deg",
        "Complete leverage",
        "Provisional"
      ],
      "top": [
        {
          "npi": "1700028131",
          "name": "KIMIA KANI",
          "city": "BALTIMORE",
          "aco": 9,
          "group": 82,
          "fac": 58,
          "complete": 91,
          "provisional": 149
        },
        {
          "npi": "1538304035",
          "name": "YUYANG ZHANG",
          "city": "LUTHERVILLE",
          "aco": 8,
          "group": 63,
          "fac": 62,
          "complete": 71,
          "provisional": 133
        },
        {
          "npi": "1346253093",
          "name": "RASHMI HANDE",
          "city": "COLUMBIA",
          "aco": 4,
          "group": 57,
          "fac": 13,
          "complete": 61,
          "provisional": 74
        },
        {
          "npi": "1902059322",
          "name": "JIAYING ZHANG",
          "city": "BALTIMORE",
          "aco": 7,
          "group": 40,
          "fac": 33,
          "complete": 47,
          "provisional": 80
        },
        {
          "npi": "1720212699",
          "name": "SESHA ADUSUMILLI",
          "city": "BALTIMORE",
          "aco": 2,
          "group": 38,
          "fac": 0,
          "complete": 40,
          "provisional": 40
        },
        {
          "npi": "1386901411",
          "name": "ALEXIS NWORAH",
          "city": "BALTIMORE",
          "aco": 2,
          "group": 37,
          "fac": 1,
          "complete": 39,
          "provisional": 40
        },
        {
          "npi": "1992788442",
          "name": "SIVA SIVAKUMAR",
          "city": "BALTIMORE",
          "aco": 5,
          "group": 33,
          "fac": 5,
          "complete": 38,
          "provisional": 43
        },
        {
          "npi": "1104111608",
          "name": "JAMEL REID",
          "city": "BALTIMORE",
          "aco": 2,
          "group": 34,
          "fac": 3,
          "complete": 36,
          "provisional": 39
        },
        {
          "npi": "1881982114",
          "name": "PATRICK OGUEJIOFOR",
          "city": "BALTIMORE",
          "aco": 2,
          "group": 34,
          "fac": 9,
          "complete": 36,
          "provisional": 45
        },
        {
          "npi": "1316264328",
          "name": "LUKE HIGGINS",
          "city": "BALTIMORE",
          "aco": 3,
          "group": 33,
          "fac": 10,
          "complete": 36,
          "provisional": 46
        }
      ],
      "median": [
        {
          "npi": "—",
          "name": "median region provider",
          "city": "—",
          "aco": null,
          "group": null,
          "fac": null,
          "complete": 0,
          "provisional": 0
        }
      ],
      "bottom": [
        {
          "npi": "1992986145",
          "name": "PHILIP ROBISON",
          "city": "ELLICOTT CITY",
          "aco": 0,
          "group": 0,
          "fac": 0,
          "complete": 0,
          "provisional": 0
        },
        {
          "npi": "1992986400",
          "name": "DRS. REISINGER & ST.MARTIN, LLC",
          "city": "CATONSVILLE",
          "aco": 0,
          "group": 0,
          "fac": 0,
          "complete": 0,
          "provisional": 0
        },
        {
          "npi": "1992989164",
          "name": "SYMA RIZVI",
          "city": "PIKESVILLE",
          "aco": 0,
          "group": 0,
          "fac": 0,
          "complete": 0,
          "provisional": 0
        }
      ]
    },
    "communities": {
      "figure_id": "graph_community",
      "title": "Largest communities of care (label propagation / CDLP)",
      "metric": "Region-provider counts per propagated community over Provider+GroupPractice / BILLS_THROUGH.",
      "envelope": {
        "n": 83102,
        "median": 1,
        "min": 1,
        "max": 2913
      },
      "columns": [
        "Community ID",
        "Region members"
      ],
      "top": [
        {
          "id": "2211846",
          "members": 2913
        },
        {
          "id": "2213131",
          "members": 1005
        },
        {
          "id": "2211341",
          "members": 825
        },
        {
          "id": "2210570",
          "members": 457
        },
        {
          "id": "2211286",
          "members": 455
        },
        {
          "id": "2210649",
          "members": 382
        },
        {
          "id": "2211595",
          "members": 356
        },
        {
          "id": "2232347",
          "members": 323
        },
        {
          "id": "2211075",
          "members": 317
        },
        {
          "id": "2211440",
          "members": 302
        }
      ],
      "median": [
        {
          "id": "median community",
          "members": 1
        }
      ],
      "bottom": [
        {
          "id": "(81000+ singletons)",
          "members": 1
        }
      ],
      "wcc_note": "Weakly connected components (algo.WCC) over the same backbone: one giant component of 19,150 region providers dominates (N=81,421 components; median=1, max=19,150) — the BILLS_THROUGH fabric is a single connected market."
    },
    "drug_hubs": {
      "figure_id": "graph_drug_hub",
      "title": "Drug hubs (densest shared-drug nodes, PRESCRIBES)",
      "metric": "Drugs ranked by distinct region prescribers — the backbone of the co-prescription projection.",
      "envelope": {
        "n": 30,
        "median": 2080.5,
        "min": 1528,
        "max": 3358
      },
      "columns": [
        "Drug",
        "Region prescribers"
      ],
      "top": [
        {
          "drug": "Atorvastatin Calcium",
          "prescribers": 3358
        },
        {
          "drug": "Gabapentin",
          "prescribers": 3230
        },
        {
          "drug": "Amlodipine Besylate",
          "prescribers": 3040
        },
        {
          "drug": "Lisinopril",
          "prescribers": 2643
        },
        {
          "drug": "Losartan Potassium",
          "prescribers": 2565
        },
        {
          "drug": "Metoprolol Succinate",
          "prescribers": 2487
        },
        {
          "drug": "Pantoprazole Sodium",
          "prescribers": 2439
        },
        {
          "drug": "Furosemide",
          "prescribers": 2363
        },
        {
          "drug": "Levothyroxine Sodium",
          "prescribers": 2281
        },
        {
          "drug": "Trazodone Hcl",
          "prescribers": 2182
        }
      ],
      "median": [
        {
          "drug": "median hub (of top 30)",
          "prescribers": 2080
        }
      ],
      "bottom": [
        {
          "drug": "Clopidogrel Bisulfate",
          "prescribers": 1637
        },
        {
          "drug": "Pravastatin Sodium",
          "prescribers": 1617
        },
        {
          "drug": "Simvastatin",
          "prescribers": 1528
        }
      ]
    },
    "anchor_reach": {
      "figure_id": "graph_anchor_reach",
      "title": "Techstars anchor 2-hop reach (BILLS_THROUGH backbone)",
      "metric": "Per anchor institution: 1-hop region providers billing through anchor groups (complete) and the 2-hop co-membership neighborhood. Facility-reach via PRACTICES_AT is provisional (C-5).",
      "columns": [
        "Anchor",
        "1-hop providers",
        "Anchor groups",
        "2-hop providers",
        "Facility reach (prov.)"
      ],
      "rows": [
        {
          "anchor": "JOHNS HOPKINS",
          "onehop": 4009,
          "groups": 6,
          "twohop": 15587,
          "facility": 2
        },
        {
          "anchor": "MEDSTAR",
          "onehop": 1461,
          "groups": 11,
          "twohop": 15656,
          "facility": 0
        },
        {
          "anchor": "UNIVERSITY OF MARYLAND",
          "onehop": 2607,
          "groups": 32,
          "twohop": 15801,
          "facility": 103
        },
        {
          "anchor": "CAREFIRST",
          "onehop": 0,
          "groups": 0,
          "twohop": 114,
          "facility": 0
        }
      ]
    },
    "flat_algos": {
      "figure_id": "graph_pagerank",
      "title": "Structurally-flat algorithms (recorded facts)",
      "note": "Over the bipartite BILLS_THROUGH star, providers are leaf nodes — so these run cleanly but return uniform/zero values by construction. Recorded as facts, not insights.",
      "rows": [
        {
          "algo": "PageRank",
          "result": "1 distinct value (8.87e-08) across all 100,845 region providers — flat by bipartite construction.",
          "status": "flat"
        },
        {
          "algo": "Betweenness",
          "result": "0 for every region provider — all betweenness accrues to GroupPractice hubs.",
          "status": "flat"
        },
        {
          "algo": "Harmonic/closeness",
          "result": "Catalogued, not run — flat on bipartite + infeasible at 9M nodes.",
          "status": "pending"
        },
        {
          "algo": "Triangle count / clustering",
          "result": "Unsupported — no native procedure; bipartite → 0 triangles without a unipartite projection.",
          "status": "pending"
        }
      ]
    }
  },
  "ahead": {
    "label": "Maryland AHEAD",
    "source": "Maryland AHEAD",
    "layer_note": "Maryland AHEAD is a SEPARATE intelligence layer (spec §4j). Every figure on this page is Maryland/AHEAD-sourced and renders in the distinct \"Maryland AHEAD\" style — NEVER merged with our \"Hikari (CMS)\" series. We do not have Maryland MCDB (all-payer claims) yet, so today's Maryland series are the AHEAD CONTEXT facts (clearly tagged); the structure lets real Maryland data lines drop in later.",
    "intro": "The single most important market context for this pitch: Maryland's payment model is unique in the U.S. and changes the incentive math for care management. We researched AHEAD — this is the \"we listened to Nick\" beat.",
    "cards": [
      {
        "eid": "AHEAD-incentive-flip",
        "figure_id": "ahead_incentive_flip",
        "icon": "bi-arrow-repeat",
        "title": "Global budgets flip the incentive",
        "headline": "Avoided readmissions = retained margin (not lost FFS)",
        "body": "Since 2014 Maryland sets a prospective annual GLOBAL BUDGET for ALL acute-care hospitals — across Medicare, Medicaid AND commercial — under the HSCRC waiver. A hospital's revenue is fixed in advance, so EliteCare's reduction of readmissions / ED visits PROTECTS hospital margin instead of cutting fee-for-service income. In Maryland the pitch is “help systems WIN under global budgets,” not just “bill more.”",
        "stats": [
          {
            "value": "80%",
            "label": "of hospital revenue shifted into global budgets"
          },
          {
            "value": "3.58%/yr",
            "label": "all-payer per-capita revenue growth cap"
          },
          {
            "value": "≥$330M",
            "label": "Medicare savings condition (MDAPM)"
          },
          {
            "value": "30%",
            "label": "hospital-acquired-condition reduction target"
          }
        ],
        "source": "Maryland AHEAD"
      },
      {
        "eid": "AHEAD-ma-explainer",
        "figure_id": "ahead_ma_explainer",
        "icon": "bi-shield-shaded",
        "title": "The MA reframe — 25.1% is the model, not a weakness",
        "headline": "Baltimore Medicare is FFS by model design → our $496M TAM is FFS-anchored",
        "body": "Metro Medicare Advantage penetration is 25.1% vs 51.0% nationally. This is largely BY DESIGN: Maryland's all-payer system runs through the HSCRC setting Medicare FFS hospital rates under a half-century CMS waiver — and AHEAD keeps that waiver in place. The value-based machinery (global budgets, MDPCP / PC AHEAD) is delivered to Original-Medicare FFS beneficiaries, so Maryland has less pull toward MA. The majority of Baltimore Medicare is FFS — exactly the population CCM / APCM / RPM / TCM are billed for, and exactly who AHEAD governs. The apparent “−26pp MA gap” STRENGTHENS the opportunity.",
        "stats": [
          {
            "value": "25.1%",
            "label": "metro MA penetration (Hikari/CMS)"
          },
          {
            "value": "51.0%",
            "label": "national MA penetration (Hikari/CMS)"
          },
          {
            "value": "$496.3M",
            "label": "FFS-anchored metro TAM (e2)"
          }
        ],
        "source": "Maryland AHEAD"
      },
      {
        "eid": "AHEAD-timeline",
        "figure_id": "ahead_timeline",
        "icon": "bi-calendar-event",
        "title": "The market is transitioning NOW",
        "headline": "MD TCOC expires Dec 2026 → AHEAD PY1 starts Jan 2026 (Cohort 1)",
        "body": "Care management is the strategy for the transition — the window is open this performance year.",
        "timeline": [
          {
            "year": "1971",
            "event": "HSCRC hospital rate-setting begins (CMS waiver)"
          },
          {
            "year": "2014",
            "event": "All-Payer Model — global budgets for all hospitals"
          },
          {
            "year": "2019",
            "event": "Total Cost of Care (TCOC) — statewide Medicare spend"
          },
          {
            "year": "Jan 2026",
            "event": "AHEAD PY1 begins — Maryland in Cohort 1 (with Vermont)"
          },
          {
            "year": "Dec 2026",
            "event": "MD TCOC model expires → AHEAD continues it"
          },
          {
            "year": "2024–2034",
            "event": "AHEAD = an 11-year CMMI model"
          },
          {
            "year": "2028",
            "event": "Geo AHEAD — geographic attribution of Medicare FFS benes"
          }
        ],
        "source": "Maryland AHEAD"
      },
      {
        "eid": "AHEAD-measures-map",
        "figure_id": "ahead_measures_map",
        "icon": "bi-clipboard2-check",
        "title": "AHEAD primary-care quality measures = our data surface",
        "headline": "EPCP's Quality-Based Adjustment rewards exactly what EliteCare moves",
        "body": "PC AHEAD's Enhanced Primary Care Payment carries a Quality-Based Adjustment + HCC risk adjustment. The AHEAD / Medicaid Advanced Primary Care quality set is built on utilization + chronic-condition measures we already compute — and 90.2% of region providers have NO MIPS score today, a massive at-risk gap.",
        "mappings": [
          {
            "measure": "ED Utilization (EDU, CMIT 234) + Acute Hospital Utilization (AHU, CMIT 14)",
            "ours": "e7 readmissions / ED throughput + e0/e11 (ED/1k; #3 readmission metro, 99th pct)"
          },
          {
            "measure": "Comprehensive Diabetes Care — HbA1c Poor Control (CDC, CMIT 204)",
            "ours": "e6 chronic-care endocrinology pockets + high-chronic prescribers"
          },
          {
            "measure": "Controlling High Blood Pressure (CBP, CMIT 167)",
            "ours": "e6 cardiology + chronic-disease prescribing clusters"
          },
          {
            "measure": "Depression Screening + Follow-Up (CDF, CMIT 672)",
            "ours": "e6 behavioral pockets + BHI-eligible (276,451 benes)"
          }
        ],
        "note": "CRISP (the state HIE) delivers the eCQMs + statewide ADT — the rails EliteCare's ADT-triggered workflows plug into.",
        "source": "Maryland AHEAD"
      },
      {
        "eid": "AHEAD-savings",
        "figure_id": "ahead_savings",
        "icon": "bi-piggy-bank",
        "title": "Maryland model ≈ $689M net Medicare savings",
        "headline": "Proven savings (2019 onward) — the outcome evidence for the deck",
        "body": "Evaluation of the Maryland model showed about $689M net Medicare savings from 2019 onward (JAMA Health Forum). TCOC FFS spending reductions vs comparison: −$450 per beneficiary/yr (−3.2%) in 2019; −$426 (−3.2%) in 2020 (HSCRC/Lewin).",
        "stats": [
          {
            "value": "≈$689M",
            "label": "net Medicare savings (2019 onward)"
          },
          {
            "value": "−$450/bene",
            "label": "TCOC FFS reduction, 2019 (−3.2%)"
          },
          {
            "value": "≥10%",
            "label": "Medicare FFS net patient revenue under global budget by PY1"
          }
        ],
        "source": "Maryland AHEAD"
      }
    ],
    "ma_series_chart": {
      "figure_id": "ahead_ma_series",
      "title": "Medicare Advantage penetration over time — distinct-series demo (spec §4j)",
      "subtitle": "Our \"Hikari (CMS)\" series is solid; the \"Maryland AHEAD\" all-payer series is a SEPARATE dashed line — Maryland MCDB not yet acquired, so it renders in the legend only (real Maryland data drops in here later).",
      "years": [
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022,
        2023,
        2024,
        2025,
        2026
      ],
      "hikari_ma_pct": [
        9.554191358243735,
        9.409519084337681,
        8.594252566979044,
        10.064234675347974,
        12.054888845170176,
        13.033608847642954,
        13.01596644838496,
        13.897051454228388,
        18.567951792436578,
        20.754098808239934,
        22.868326215779703,
        24.73194777111193,
        25.761781521390994,
        25.068437944755875
      ],
      "national_ref": 51.0,
      "maryland_series_status": "discovery pending — Maryland MCDB (all-payer claims DB) not yet acquired (findings 01k §6)"
    }
  },
  "outliers": {
    "figure_id": "outliers_e11",
    "baltimore_cbsa": "12580",
    "baltimore_title": "Baltimore-Columbia-Towson, MD",
    "n_cbsas_eligible": 209,
    "population_floor_benes": 50000,
    "headline": "Baltimore-Columbia-Towson (CBSA 12580) ranks #3 of 205 U.S. metros on Readmission % (21.1; 99.0 national percentile).",
    "note": "National per-metro outlier discovery (E11): all CBSAs ≥ 50,000 Medicare benes ranked per metric; Baltimore's national rank + percentile. The hero cards (HERO-outlier-*) read hero.outlier_stats; both trace to e11."
  },
  "temporal": {
    "figure_id": "temporal_e12",
    "note": "Story-of-time series for the 7-county metro (benes-weighted), e12. Sparkline-ready. The hero sparkline row reads these.",
    "series": [
      {
        "eid": "pop",
        "figure_id": "temporal_pop",
        "key": "tot_benes",
        "label": "Medicare population",
        "icon": "bi-people",
        "kind": "count",
        "years": [
          2013,
          2014,
          2015,
          2016,
          2017,
          2018,
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025,
          2026
        ],
        "values": [
          422715.0,
          435357,
          446147,
          457074,
          467636,
          478862,
          489276,
          498890,
          504983,
          512771,
          521949,
          532732,
          543266,
          550864.0
        ],
        "start_display": "422,715 (2013)",
        "end_display": "550,864 (2026)",
        "pct_change": 30.31569733744958,
        "pct_display": "+30%",
        "direction": "increasing"
      },
      {
        "eid": "ma",
        "figure_id": "temporal_ma",
        "key": "ma_pct",
        "label": "Medicare Advantage %",
        "icon": "bi-shield-shaded",
        "kind": "pct",
        "years": [
          2013,
          2014,
          2015,
          2016,
          2017,
          2018,
          2019,
          2020,
          2021,
          2022,
          2023,
          2024,
          2025,
          2026
        ],
        "values": [
          9.554191358243735,
          9.409519084337681,
          8.594252566979044,
          10.064234675347974,
          12.054888845170176,
          13.033608847642954,
          13.01596644838496,
          13.897051454228388,
          18.567951792436578,
          20.754098808239934,
          22.868326215779703,
          24.73194777111193,
          25.761781521390994,
          25.068437944755875
        ],
        "start_display": "9.6% (2013)",
        "end_display": "25.1% (2026)",
        "pct_change": 162.38157688903556,
        "pct_display": "+162%",
        "direction": "increasing"
      },
      {
        "eid": "ed",
        "figure_id": "temporal_ed",
        "key": "er_visits_per_1000",
        "label": "ED visits / 1,000",
        "icon": "bi-heart-pulse",
        "kind": "per1k",
        "years": [
          2014,
          2015,
          2016,
          2017,
          2018,
          2019,
          2020,
          2021,
          2022,
          2023
        ],
        "values": [
          722.0334967032966,
          714.0056284842638,
          686.7889310763939,
          684.1992943538305,
          677.7429746974861,
          662.246647149515,
          522.2480536025005,
          555.5158485172893,
          552.3846488940362,
          561.5192268930502
        ],
        "start_display": "722 (2014)",
        "end_display": "562 (2023)",
        "pct_change": -22.230861939665115,
        "pct_display": "−22%",
        "direction": "decreasing"
      },
      {
        "eid": "opioid",
        "figure_id": "temporal_opioid",
        "key": "opioid_rate",
        "label": "Opioid prescribing %",
        "icon": "bi-capsule",
        "kind": "pct",
        "years": [
          2013,
          2014,
          2015,
          2016,
          2017,
          2018,
          2019,
          2020,
          2021,
          2022,
          2023
        ],
        "values": [
          6.589073373214504,
          6.511062594795222,
          6.336656213903574,
          6.158562332564398,
          5.808334930441307,
          5.241987144342784,
          4.942565478068189,
          4.62281844128143,
          4.5205678062606935,
          4.3532973941575355,
          4.124947714301336
        ],
        "start_display": "6.6% (2013)",
        "end_display": "4.1% (2023)",
        "pct_change": -37.39715008987728,
        "pct_display": "−37%",
        "direction": "decreasing"
      }
    ]
  },
  "missing_quality": {
    "figure_id": "missing_quality",
    "region_providers": 76554,
    "region_missing": 69054,
    "region_pct": 90.2,
    "baltimore_city_missing": 23502,
    "choropleth_layer": "missing_mips_pct",
    "headline": "90.2% of region providers have NO CMS quality (MIPS) score — the absence-of-quality signal AHEAD's Quality-Based Adjustment rewards closing.",
    "columns": [
      "County",
      "Region providers",
      "Missing MIPS",
      "Missing %",
      "Chronic-care missing"
    ],
    "rows": [
      {
        "name": "Baltimore city",
        "fips": "24510",
        "providers": 27399,
        "missing": 23502,
        "missing_pct": 85.8,
        "chronic_missing": 607
      },
      {
        "name": "Baltimore County",
        "fips": "24005",
        "providers": 22495,
        "missing": 20726,
        "missing_pct": 92.1,
        "chronic_missing": 374
      },
      {
        "name": "Anne Arundel",
        "fips": "24003",
        "providers": 10669,
        "missing": 9844,
        "missing_pct": 92.3,
        "chronic_missing": 268
      },
      {
        "name": "Howard",
        "fips": "24027",
        "providers": 9532,
        "missing": 9014,
        "missing_pct": 94.6,
        "chronic_missing": 107
      },
      {
        "name": "Harford",
        "fips": "24025",
        "providers": 3867,
        "missing": 3593,
        "missing_pct": 92.9,
        "chronic_missing": 83
      },
      {
        "name": "Carroll",
        "fips": "24013",
        "providers": 2144,
        "missing": 1959,
        "missing_pct": 91.4,
        "chronic_missing": 37
      },
      {
        "name": "Queen Anne's",
        "fips": "24035",
        "providers": 448,
        "missing": 416,
        "missing_pct": 92.9,
        "chronic_missing": 4
      }
    ]
  },
  "facility_quality": {
    "resolution": {
      "md_facilities": 1173,
      "region_facilities": 538,
      "rankable_readmissions": 19,
      "rankable_ed": 17,
      "note": "Region facilities resolved two-tier (FIPS + ZIP→county bridge). Rankable = ≥1 non-null HRRP ERR cohort (readmissions) / non-null OP_18b (ED)."
    },
    "readmissions": {
      "figure_id": "fac_readmissions",
      "measure_note": "Discharge-weighted excess-readmission ratio (ERR = predicted/expected) across each facility's non-null HRRP cohorts. ERR > 1.0 = worse than the national risk-adjusted expectation.",
      "columns": [
        "CCN",
        "Facility",
        "County",
        "Wtd ERR",
        "Cohorts",
        "Discharges",
        "Readmits",
        "Obs %"
      ],
      "top": [
        {
          "ccn": "210008",
          "name": "MERCY MEDICAL CENTER INC",
          "county": "Baltimore city",
          "err": 1.0773,
          "cohorts": 4,
          "discharges": 286,
          "readmits": 73,
          "obs_pct": 25.5
        },
        {
          "ccn": "210048",
          "name": "JOHNS HOPKINS HOWARD COUNTY MEDICAL CENTER",
          "county": "Howard",
          "err": 1.0426,
          "cohorts": 5,
          "discharges": 1956,
          "readmits": 341,
          "obs_pct": 17.4
        },
        {
          "ccn": "210040",
          "name": "NORTHWEST HOSPITAL CENTER",
          "county": "Baltimore County",
          "err": 1.0372,
          "cohorts": 4,
          "discharges": 1189,
          "readmits": 241,
          "obs_pct": 20.3
        }
      ],
      "median": [
        {
          "ccn": "210012",
          "name": "SINAI HOSPITAL OF BALTIMORE",
          "county": "Baltimore city",
          "err": 0.9641,
          "cohorts": 6,
          "discharges": 1428,
          "readmits": 228,
          "obs_pct": 16.0
        }
      ],
      "bottom": [
        {
          "ccn": "210024",
          "name": "MEDSTAR UNION MEMORIAL HOSPITAL",
          "county": "Baltimore city",
          "err": 0.9103,
          "cohorts": 6,
          "discharges": 1485,
          "readmits": 238,
          "obs_pct": 16.0
        },
        {
          "ccn": "210043",
          "name": "UNIVERSITY OF MD BALTIMORE WASHINGTON MEDICAL CENTER",
          "county": "Anne Arundel",
          "err": 0.9223,
          "cohorts": 5,
          "discharges": 1722,
          "readmits": 272,
          "obs_pct": 15.8
        },
        {
          "ccn": "210029",
          "name": "JOHNS HOPKINS BAYVIEW MEDICAL CENTER",
          "county": "Baltimore city",
          "err": 0.9243,
          "cohorts": 5,
          "discharges": 1268,
          "readmits": 221,
          "obs_pct": 17.4
        }
      ]
    },
    "ed": {
      "figure_id": "fac_ed",
      "measure_note": "OP_18b = median minutes from ED arrival to ED departure for DISCHARGED ED patients (the standard ED-throughput headline). Higher = longer waits = worse access.",
      "columns": [
        "CCN",
        "Facility",
        "County",
        "OP_18b min",
        "OP_18a",
        "OP_18c",
        "OP_22 %",
        "Sample"
      ],
      "top": [
        {
          "ccn": "210015",
          "name": "MEDSTAR FRANKLIN SQUARE MEDICAL CENTER",
          "county": "Baltimore County",
          "op_18b": 399,
          "op_18a": 396,
          "op_18c": 338,
          "op_22": 1.0,
          "sample": 322
        },
        {
          "ccn": "210029",
          "name": "JOHNS HOPKINS BAYVIEW MEDICAL CENTER",
          "county": "Baltimore city",
          "op_18b": 332,
          "op_18a": 360,
          "op_18c": 630,
          "op_22": 3.0,
          "sample": 291
        },
        {
          "ccn": "210002",
          "name": "UNIVERSITY OF MARYLAND MEDICAL CENTER",
          "county": "Baltimore city",
          "op_18b": 325,
          "op_18a": 317,
          "op_18c": 253,
          "op_22": null,
          "sample": 337
        }
      ],
      "median": [
        {
          "ccn": "210023",
          "name": "LUMINIS HEALTH ANNE ARUNDEL MEDICAL CENTER, INC",
          "county": "Anne Arundel",
          "op_18b": 249,
          "op_18a": 255,
          "op_18c": 478,
          "op_22": null,
          "sample": 75422
        }
      ],
      "bottom": [
        {
          "ccn": "210033",
          "name": "CARROLL HOSPITAL CENTER",
          "county": "Carroll",
          "op_18b": 216,
          "op_18a": 221,
          "op_18c": 314,
          "op_22": 0.0,
          "sample": 3333
        },
        {
          "ccn": "210034",
          "name": "MEDSTAR HARBOR HOSPITAL",
          "county": "Anne Arundel",
          "op_18b": 216,
          "op_18a": 220,
          "op_18c": 280,
          "op_22": 4.0,
          "sample": 361
        },
        {
          "ccn": "210024",
          "name": "MEDSTAR UNION MEMORIAL HOSPITAL",
          "county": "Baltimore city",
          "op_18b": 217,
          "op_18a": 226,
          "op_18c": 762,
          "op_22": 2.0,
          "sample": 377
        }
      ]
    }
  },
  "growth_contacts": {
    "figure_id": "growth_reach",
    "intro": "Growth intelligence (E8) — the ranked contact list Techstars Investment Manager Emily McLanahan asked for: people / orgs reachable through each mentor in the Baltimore region, over COMPLETE graph edges (BILLS_THROUGH, MEMBER_OF, org-name match), intersected with E2 opportunity + E6 fit. Ranked by recoverable annual_oppty.",
    "warm_path": {
      "figure_id": "growth_warmpath",
      "mentor": "Leigh Ann Curl, MD",
      "mentor_npi": "1659348738",
      "mentor_role": "Orioles team physician (MedStar; E10)",
      "group": "Medstar Medical Group Ii Llc",
      "org_pac_id": "0547413825",
      "providers": 762,
      "panel": 256200,
      "avg_mips": 81.13,
      "county": "Baltimore city",
      "annual_oppty": 169758839,
      "annual_oppty_display": "$169,758,839",
      "note": "Warm path = mentor billing affiliation → E2 high-opportunity group (COMPLETE BILLS_THROUGH). The sports → MedStar → our-graph chain ties a beloved team's doctor to the single biggest recoverable group in the metro."
    },
    "reach_columns": [
      "Mentor / institution",
      "Kind",
      "Groups reached",
      "Region providers reached",
      "Group contacts (E2)",
      "Provider contacts (E2)"
    ],
    "reach": [
      {
        "mentor": "Johns Hopkins",
        "kind": "anchor institution",
        "groups": 6,
        "providers": 4009,
        "group_contacts": 6,
        "provider_contacts": 2655
      },
      {
        "mentor": "MedStar",
        "kind": "anchor institution",
        "groups": 11,
        "providers": 1461,
        "group_contacts": 6,
        "provider_contacts": 1076
      },
      {
        "mentor": "University of Maryland Medical System",
        "kind": "anchor institution",
        "groups": 32,
        "providers": 2607,
        "group_contacts": 29,
        "provider_contacts": 1794
      },
      {
        "mentor": "CareFirst",
        "kind": "anchor institution",
        "groups": 0,
        "providers": 0,
        "group_contacts": 0,
        "provider_contacts": 0
      },
      {
        "mentor": "Brian Hasselfeld (Johns Hopkins)",
        "kind": "physician advisor",
        "groups": 1,
        "providers": 579,
        "group_contacts": 1,
        "provider_contacts": 363
      },
      {
        "mentor": "Peter Najjar (Johns Hopkins)",
        "kind": "physician advisor",
        "groups": 1,
        "providers": 3353,
        "group_contacts": 1,
        "provider_contacts": 2270
      },
      {
        "mentor": "Leigh Curl (MedStar)",
        "kind": "physician advisor",
        "groups": 1,
        "providers": 1227,
        "group_contacts": 1,
        "provider_contacts": 937
      }
    ],
    "carefirst_note": "CareFirst (mentor payer) resolves to 0 reach over COMPLETE provider→group edges — it is a commercial payer inside the all-payer model, not a billing group; its leverage is payer-side (VBC), not BILLS_THROUGH.",
    "group_columns": [
      "org_pac_id",
      "Group practice",
      "County",
      "Providers",
      "Panel",
      "Avg MIPS",
      "Reach via",
      "Annual oppty"
    ],
    "groups": [
      {
        "org_pac_id": "0547413825",
        "name": "Medstar Medical Group Ii Llc",
        "county": "Baltimore city",
        "providers": 762,
        "panel": 256200,
        "avg_mips": 81.13,
        "reach_via": "MedStar / Leigh Curl",
        "annual_oppty": 169758839,
        "annual_oppty_display": "$169,758,839"
      },
      {
        "org_pac_id": "4981745098",
        "name": "Johns Hopkins University",
        "county": "Baltimore city",
        "providers": 379,
        "panel": 105715,
        "avg_mips": 74.91,
        "reach_via": "Johns Hopkins / Peter Najjar",
        "annual_oppty": 70160288,
        "annual_oppty_display": "$70,160,288"
      },
      {
        "org_pac_id": "3678472214",
        "name": "University Of Maryland Community Medical Group Inc",
        "county": "Anne Arundel",
        "providers": 148,
        "panel": 61114,
        "avg_mips": 85.43,
        "reach_via": "UMMS",
        "annual_oppty": 40518266,
        "annual_oppty_display": "$40,518,266"
      },
      {
        "org_pac_id": "2769394808",
        "name": "University Of Maryland Physicians Pa",
        "county": "Baltimore city",
        "providers": 239,
        "panel": 53173,
        "avg_mips": 93.64,
        "reach_via": "UMMS",
        "annual_oppty": 35582789,
        "annual_oppty_display": "$35,582,789"
      },
      {
        "org_pac_id": "4880846179",
        "name": "University Of Maryland St Joseph Medical Group Llc",
        "county": "Baltimore County",
        "providers": 145,
        "panel": 49403,
        "avg_mips": 85.13,
        "reach_via": "UMMS",
        "annual_oppty": 32609593,
        "annual_oppty_display": "$32,609,593"
      },
      {
        "org_pac_id": "3274720552",
        "name": "Johns Hopkins Regional Physicians Llc",
        "county": "Howard",
        "providers": 65,
        "panel": 45911,
        "avg_mips": 81.74,
        "reach_via": "Johns Hopkins",
        "annual_oppty": 29923922,
        "annual_oppty_display": "$29,923,922"
      },
      {
        "org_pac_id": "0345513248",
        "name": "University Of Maryland Diagnostic Radiology, Llc",
        "county": "Baltimore city",
        "providers": 22,
        "panel": 39316,
        "avg_mips": 75.5,
        "reach_via": "UMMS",
        "annual_oppty": 26353149,
        "annual_oppty_display": "$26,353,149"
      },
      {
        "org_pac_id": "1052223229",
        "name": "Johns Hopkins University",
        "county": "Baltimore city",
        "providers": 78,
        "panel": 38933,
        "avg_mips": 75.82,
        "reach_via": "Johns Hopkins",
        "annual_oppty": 25657088,
        "annual_oppty_display": "$25,657,088"
      },
      {
        "org_pac_id": "8325943707",
        "name": "Johns Hopkins Community Physicians, Inc",
        "county": "Howard",
        "providers": 189,
        "panel": 35727,
        "avg_mips": 86.64,
        "reach_via": "Johns Hopkins / Brian Hasselfeld",
        "annual_oppty": 22758456,
        "annual_oppty_display": "$22,758,456"
      },
      {
        "org_pac_id": "0941455794",
        "name": "University Of Maryland St. Joseph Orthopaedics, Llc",
        "county": "Baltimore County",
        "providers": 32,
        "panel": 14410,
        "avg_mips": 85.77,
        "reach_via": "UMMS",
        "annual_oppty": 9239124,
        "annual_oppty_display": "$9,239,124"
      }
    ]
  },
  "provenance": {
    "tam_headline": {
      "title": "Baltimore-metro TAM — $496,294,651 / yr",
      "formula": "headline_tam = CCM/APCM + RPM + TCM (population-anchored core levers)",
      "inputs": {
        "ccm_apcm_usd": 154668511,
        "rpm_usd": 332398529,
        "tcm_usd": 9227610,
        "region_ffs_benes": 342252
      },
      "source_query": "e2_provider_eligibility.sql + e2_caremgmt_billed.sql + e2_region_discharge.sql (research/experiments/e2_opportunity_targets.py)"
    },
    "tam_ccm": {
      "title": "CCM / APCM lever",
      "formula": "region_ffs × 0.69 × (1 - 0.034 served) × $56.50/mo × 12",
      "inputs": {
        "region_ffs_benes": 342252,
        "cms_2plus_chronic_share": 0.69,
        "ccm_eligible": 236153.88,
        "national_served_rate": 0.034,
        "ccm_unserved": 228124.65,
        "blended_ccm_ppm": 56.5,
        "months": 12,
        "result_usd": 154668511.4
      },
      "source_query": "e2_caremgmt_billed.sql · blended CCM rate = mean(99490 $63, G0557 $50)"
    },
    "tam_rpm": {
      "title": "RPM lever",
      "formula": "(region_ffs × P(HTN|CHF|DM) - observed RPM benes) × $94.00/mo × 12",
      "inputs": {
        "region_ffs_benes": 342252,
        "p_any_htn_chf_dm": 0.8728,
        "rpm_eligible": 298729.55,
        "rpm_served_observed": 4050,
        "rpm_gap": 294679.55,
        "blended_rpm_ppm": 94.0,
        "months": 12,
        "result_usd": 332398529.46
      },
      "source_query": "e2_caremgmt_billed.sql · blended RPM rate = 99454 $46 + 99457 $48"
    },
    "tam_tcm": {
      "title": "TCM lever",
      "formula": "(region_discharge_episodes - observed TCM benes) × $242.50/episode",
      "inputs": {
        "region_discharge_episodes_proxy": 48356,
        "tcm_served_observed": 10304,
        "tcm_gap_episodes": 38052,
        "blended_tcm_episode": 242.5,
        "result_usd": 9227610.0
      },
      "source_query": "e2_region_discharge.sql (benes_ip_cvrd_stay_cnt, County 2023) · blended TCM = mean(99495 $204, 99496 $281)"
    },
    "kpi_benes": {
      "title": "Medicare beneficiaries (metro)",
      "formula": "SUM(tot_benes) over 7 county rows, latest enrollment period (2026 / month 1, bene_geo_lvl='County')",
      "inputs": {
        "metro": 550864,
        "national": 69975706,
        "national_method": "state-rollup over 58 State rows"
      },
      "source_query": "e0_region_enrollment.sql + e0_national_enrollment.sql"
    },
    "kpi_ma_pct": {
      "title": "Medicare Advantage %",
      "formula": "ma_benes / tot_benes × 100, benes-weighted across the metro",
      "inputs": {
        "metro": 25.0684,
        "national": 51.0402,
        "delta": -25.9718,
        "ratio": 0.4912
      },
      "source_query": "e0_region_enrollment.sql + e0_national_enrollment.sql"
    },
    "kpi_dual_pct": {
      "title": "Dual-eligible %",
      "formula": "dual_benes / tot_benes × 100, benes-weighted across the metro",
      "inputs": {
        "metro": 13.7631,
        "national": 17.2558,
        "delta": -3.4927,
        "ratio": 0.7976
      },
      "source_query": "e0_region_enrollment.sql + e0_national_enrollment.sql"
    },
    "kpi_risk": {
      "title": "Avg HCC risk score",
      "formula": "benes-weighted mean avg_risk_score (variation facts, year 2023, bene_age_lvl='All', County)",
      "inputs": {
        "metro": 1.00637,
        "national": 1.00445,
        "delta": 0.00193,
        "ratio": 1.0019
      },
      "source_query": "e0_region_variation.sql + e0_national_benchmark.sql"
    },
    "kpi_ed": {
      "title": "ED visits / 1,000",
      "formula": "benes-weighted mean er_visits_per_1000 (variation facts, County, 2023)",
      "inputs": {
        "metro": 561.519,
        "national": 583.351,
        "delta": -21.831,
        "ratio": 0.9626
      },
      "source_query": "e0_region_variation.sql + e0_national_benchmark.sql"
    },
    "kpi_uninsured": {
      "title": "Uninsured %",
      "formula": "num_uninsured / (insured + uninsured) × 100, overall row (age=sex=income=race='0', geo_category='50', 2023)",
      "inputs": {
        "metro": 5.8588,
        "national": 9.4571,
        "delta": -3.5983,
        "ratio": 0.6195,
        "national_county_rows": 3144
      },
      "source_query": "e0_region_insurance.sql + e0_national_insurance.sql"
    },
    "kpi_std_spend": {
      "title": "Standardized Medicare spend / capita",
      "formula": "benes-weighted mean std_pymt_pc (variation facts, County, 2023)",
      "inputs": {
        "metro": 12326.57,
        "national": 11886.2,
        "delta": 440.37,
        "ratio": 1.037
      },
      "source_query": "e0_region_variation.sql + e0_national_benchmark.sql"
    },
    "kpi_readmit": {
      "title": "Readmission %",
      "formula": "benes-weighted mean readmsn_pct (stored as proportion, ×100 shown as %), County 2023",
      "inputs": {
        "metro": 21.1011,
        "national": 17.7042,
        "delta": 3.397,
        "ratio": 1.1919
      },
      "source_query": "e0_region_variation.sql + e0_national_benchmark.sql"
    },
    "kpi_opioid": {
      "title": "Opioid prescribing rate %",
      "formula": "opioid_claims / opioid_total_claims × 100, benes-weighted; County 'Totals', latest year 2023",
      "inputs": {
        "metro": 4.1249,
        "national": 3.6736,
        "delta": 0.4513,
        "ratio": 1.1229,
        "national_state_rows": 56
      },
      "source_query": "e0_region_opioid.sql + e0_national_opioid.sql"
    },
    "groups_table": {
      "title": "Target group practices by annual_oppty",
      "formula": "Provider annual_oppty rolled up via org_pac_id → dim_group_practice (BILLS_THROUGH key). annual_oppty = gap_ccm × $56.50 × 12.",
      "inputs": {
        "groups": 1698,
        "solo_unassigned_providers": 4309,
        "solo_annual_oppty_usd": 581865295
      },
      "source_query": "e2_group_rollup.sql (research/experiments/e2_opportunity_targets.py)"
    },
    "providers_table": {
      "title": "Target providers by annual_oppty (PRE-FIT)",
      "formula": "annual_oppty = gap_ccm × $56.50 × 12, where gap_ccm = eligible_ccm - billed_ccm_apcm; eligible_ccm = panel × max(P(2+ chronic), 0.69)",
      "inputs": {
        "scored_providers": 14199,
        "blended_ccm_ppm": 56.5,
        "cms_floor_2plus_chronic": 0.69,
        "national_served_rate": 0.034
      },
      "source_query": "e2_provider_region.sql + e2_provider_eligibility.sql + e2_caremgmt_billed.sql · fit_flags (E6) and leverage_score (E3) are NULL placeholders"
    },
    "roster_summary": {
      "title": "Techstars / ecosystem roster match",
      "formula": "Exact-name search (provider_last_name ILIKE ? AND provider_first_name ILIKE ?) over dim_provider across all states; clinical NPIs flagged in_region by practice_state=MD + Baltimore-metro city.",
      "inputs": {
        "roster_size": 15,
        "members_with_any_match": 5,
        "clean_in_region_matches": 2,
        "total_npis_matched": 34
      },
      "source_query": "e4 roster search (research/experiments/e4_techstars_ecosystem.py) · graph hikari_national for relationship census"
    },
    "techstars_card": {
      "title": "Techstars AI Health Baltimore — of-our-data stats",
      "formula": "Pills compose the roster match (2 in-region NPIs), the population-anchored metro TAM ($496.3M), the region-provider count (76,554, resolved via ZIP→county from CMS provider addresses; the graph LOCATED_IN edge census of 75,078 is shown separately in the network section), and the 5 named anchor institutions.",
      "inputs": {
        "mentors_in_graph": 2,
        "metro_tam_usd": 496294651,
        "region_providers_zip_county_resolved": 76554,
        "anchor_institutions": 5,
        "roster_size": 15
      },
      "source_query": "e4_techstars_ecosystem.py (roster) + e2 TAM + e2 region_resolution.region_count (ZIP→county resolution) · findings 01b–01f, 04, 11"
    },
    "sports_curl": {
      "title": "Leigh Ann Curl, MD — Orioles team physician (NPI 1659348738)",
      "formula": "Name search (Curl / Leigh%) over national dim_provider → 1 match; profile from fact_provider_quality_mips + fact_provider_summary + fact_provider_service + hikari_national node/edges. Celebration framing: only flattering stats surfaced (spec §4b-sports).",
      "inputs": {
        "npi": "1659348738",
        "final_mips_score": 80.1797,
        "pi_category_score": 100,
        "pri_spec": "ORTHOPEDIC SURGERY",
        "med_sch": "JOHNS HOPKINS UNIVERSITY SCHOOL OF MEDICINE",
        "grd_yr": 1989,
        "org_pac_id": "0547413825",
        "practice_city": "BALTIMORE",
        "practice_state": "MD"
      },
      "source_query": "e10_sports_physicians.py (reuses e4 query files) · findings 12, 01i"
    },
    "graph_degree": {
      "title": "Degree / membership centrality (Baltimore subgraph)",
      "formula": "complete_leverage = size(MEMBER_OF→ACO) + size(BILLS_THROUGH→GroupPractice); provisional adds size(PRACTICES_AT→Facility) (incomplete, C-5). Scoped Cypher over region providers (city in 133-city metro set).",
      "inputs": {
        "region_providers": 100845,
        "median_complete_leverage": 0,
        "max_complete_leverage": 91,
        "max_provisional": 149
      },
      "source_query": "e9_graph_algorithms.py · queries/e9_degree_centrality.cypher · graph hikari_national · findings 11 Algo 1"
    },
    "graph_community": {
      "title": "Communities of care (label propagation / CDLP)",
      "formula": "algo.labelPropagation over Provider+GroupPractice / BILLS_THROUGH (global), region filter applied after YIELD; sizes = region-provider count per propagated community.",
      "inputs": {
        "communities_with_region_provider": 83102,
        "largest": 2913,
        "median": 1,
        "wcc_giant_component": 19150
      },
      "source_query": "e9_graph_algorithms.py · queries/e9_community_labelprop.cypher + e9_community_wcc.cypher · findings 11 Algo 4a/4b"
    },
    "graph_drug_hub": {
      "title": "Drug hubs (bipartite projection over PRESCRIBES)",
      "formula": "Drugs ranked by COUNT(DISTINCT region provider) over the Provider→Drug PRESCRIBES bipartite graph (complete edge).",
      "inputs": {
        "top_hubs_shown": 30,
        "max_prescribers": 3358,
        "median_of_top30": 2080.5,
        "min_of_top30": 1528
      },
      "source_query": "e9_graph_algorithms.py · queries/e9_bipartite_drug_hub.cypher · findings 11 Algo 6a"
    },
    "graph_anchor_reach": {
      "title": "Techstars anchor k-hop reach (BILLS_THROUGH backbone)",
      "formula": "Per anchor: 1-hop = region providers billing through anchor GroupPractices (complete); 2-hop = co-membership neighborhood; facility-reach via OWNED_BY+PRACTICES_AT is provisional (C-5).",
      "inputs": {
        "jh_1hop": 4009,
        "medstar_1hop": 1461,
        "umaryland_1hop": 2607,
        "carefirst_1hop": 0
      },
      "source_query": "e9_graph_algorithms.py · queries/e9_anchor_reach_group.cypher + e9_khop_reach.cypher · findings 11 Algo 7"
    },
    "graph_pagerank": {
      "title": "Structurally-flat graph algorithms (recorded facts)",
      "formula": "algo.pageRank + algo.betweenness over the bipartite BILLS_THROUGH star. Providers are leaf nodes → PageRank uniform (8.87e-08), betweenness 0. Recorded as facts, not insights.",
      "inputs": {
        "pagerank_distinct_values": 1,
        "pagerank_value": 8.87316e-08,
        "betweenness_max": 0
      },
      "source_query": "e9_graph_algorithms.py · queries/e9_pagerank.cypher + e9_betweenness.cypher · findings 11 Algo 2/3"
    },
    "ahead_incentive_flip": {
      "title": "Global budgets flip the incentive",
      "inputs": {
        "hospital_revenue_in_global_budgets": "80%",
        "per_capita_growth_cap": "3.58%/yr",
        "medicare_savings_condition": "≥$330M",
        "hac_reduction_target": "30%"
      },
      "source": "Maryland AHEAD",
      "source_query": "findings/01j §1 (Maryland All-Payer Model 2014) · Commonwealth Fund hospital global budgeting (2024) · HCTTF MD All-Payer assessment · Health Affairs PMC8903109"
    },
    "ahead_ma_explainer": {
      "title": "The MA reframe — FFS by model design",
      "formula": "metro MA% (ma_benes/tot_benes×100) vs national; the gap is explained by Maryland's FFS-anchored all-payer model, NOT weak managed care.",
      "inputs": {
        "metro_ma_pct": 25.1,
        "national_ma_pct": 51.0,
        "ffs_anchored_tam_usd": 496294651
      },
      "source": "Maryland AHEAD",
      "source_query": "findings/01k §1 (HSCRC sets Medicare FFS hospital rates; AHEAD keeps the waiver — Bob Atlas/MHA; JHU HBHI MA study) · e0/e12 MA% (Hikari/CMS) · e2 TAM"
    },
    "ahead_timeline": {
      "title": "Maryland payment-model timeline",
      "inputs": {
        "all_payer_global_budgets": "2014",
        "tcoc": "2019",
        "ahead_py1": "Jan 2026",
        "tcoc_expires": "Dec 2026",
        "ahead_model_years": "2024–2034",
        "geo_ahead": "2028"
      },
      "source": "Maryland AHEAD",
      "source_query": "findings/01j §2–§3 · CMS AHEAD model page · marylandmatters.org (2024-03-20) · Baker Tilly AHEAD update · NASHP"
    },
    "ahead_measures_map": {
      "title": "AHEAD primary-care quality measures ↔ our data",
      "formula": "PC AHEAD EPCP = statewide-average EPCP → practice PBPM with a Quality-Based Adjustment + HCC risk adjustment; the AHEAD quality set maps onto e6/e7/e11 measures EliteCare moves.",
      "inputs": {
        "region_no_mips_score_pct": 90.2,
        "bhi_eligible_benes": 276451,
        "measures_mapped": 4
      },
      "source": "Maryland AHEAD",
      "source_query": "findings/01k §3 (MD AHEAD Primary Care all-call 12/16/2025; CRISP eCQMs/ADT) ↔ e6 (chronic specialties/prescribing) + e7 (readmissions/ED) + e11"
    },
    "ahead_savings": {
      "title": "Maryland model net Medicare savings",
      "inputs": {
        "net_medicare_savings": "≈$689M (2019 onward)",
        "tcoc_2019_per_bene": "−$450 (−3.2%)",
        "tcoc_2020_per_bene": "−$426 (−3.2%)",
        "min_ffs_revenue_global_budget_py1": "≥10%"
      },
      "source": "Maryland AHEAD",
      "source_query": "findings/01k §2 (JAMA Health Forum ≈$689M net savings; Mathematica TCOC eval) · findings/01j §2 (HSCRC/Lewin TCOC quantitative eval)"
    },
    "ahead_ma_series": {
      "title": "MA penetration over time — distinct-series demo",
      "formula": "ma_benes/tot_benes×100 per January for the 7-county metro (Hikari/CMS, solid). The Maryland AHEAD all-payer series renders as a SEPARATE dashed line (spec §4j) — Maryland MCDB not yet acquired, so it is legend-only today.",
      "inputs": {
        "start_2013_pct": 9.6,
        "end_2026_pct": 25.1,
        "national_ref_pct": 51.0,
        "maryland_series": "discovery pending (MCDB)"
      },
      "source": "Maryland AHEAD",
      "source_query": "e12_enrollment_series.sql (Hikari/CMS) + findings/01k §6 (Maryland MCDB all-payer claims — acquisition pending)"
    },
    "outliers_e11": {
      "title": "National per-metro outlier discovery (E11)",
      "formula": "All CBSAs ≥ 50,000 Medicare benes ranked per normalized metric; Baltimore (CBSA 12580) national rank + percentile reported (C-6 top/median/bottom).",
      "inputs": {
        "cbsas_eligible": 209,
        "baltimore_cbsa": "12580",
        "headline": "Readmissions #3 of 205 (99.0 pct)"
      },
      "source_query": "e11_metro_outliers.py · e11_cbsa_*.sql + e11_provider_cbsa_specialty.sql · findings 13"
    },
    "outlier_readmit": {
      "title": "Readmissions — #3 of 205 U.S. metros",
      "formula": "Per-CBSA discharge-weighted readmission % (variation facts, County→CBSA, 2023), ranked across all metros ≥ 50k Medicare benes.",
      "inputs": {
        "value_pct": 21.1,
        "rank": 3,
        "n": 205,
        "percentile": 99.0,
        "cbsa": "12580"
      },
      "source_query": "e11_metro_outliers.py · e11_cbsa_variation.sql · findings 13 (headline)"
    },
    "outlier_im": {
      "title": "Specialist over-index — Internal Medicine #6 / Critical Care #5",
      "formula": "Region provider supply per 100k Medicare benes by primary specialty, ranked vs all eligible CBSAs (specialty floor ≥ 25 CBSAs).",
      "inputs": {
        "im_per_100k": 260.1,
        "im_rank": 6,
        "im_n": 209,
        "im_percentile": 97.6,
        "im_providers": 1433,
        "critical_care_per_100k": 28.0,
        "critical_care_rank": 5,
        "critical_care_n": 192,
        "critical_care_percentile": 97.9,
        "critical_care_providers": 154
      },
      "source_query": "e11_metro_outliers.py · e11_provider_cbsa_specialty.sql · findings 13 §1"
    },
    "outlier_fp": {
      "title": "Primary-care scarcity — Family Practice #183 of 209",
      "formula": "Family Practice providers per 100k Medicare benes, ranked vs all eligible CBSAs (low percentile = under-indexed).",
      "inputs": {
        "per_100k": 84.8,
        "rank": 183,
        "n": 209,
        "percentile": 12.5,
        "providers": 467
      },
      "source_query": "e11_metro_outliers.py · e11_provider_cbsa_specialty.sql · findings 13 §1 (most under-indexed)"
    },
    "temporal_pop": {
      "title": "Medicare population over time",
      "formula": "SUM(tot_benes) over the 7 counties, January of each year 2013–2026 (enrollment fact).",
      "inputs": {
        "start": "422,715 (2013)",
        "end": "550,864 (2026)",
        "abs_change": 128149,
        "pct_change": "+30.3%"
      },
      "source_query": "e12_enrollment_series.sql · findings 14"
    },
    "temporal_ma": {
      "title": "Medicare Advantage % over time",
      "formula": "ma_benes/tot_benes×100, benes-weighted across the metro, January 2013–2026.",
      "inputs": {
        "start": "9.6% (2013)",
        "end": "25.1% (2026)",
        "abs_change": "+15.5 pts",
        "pct_change": "+162.4%"
      },
      "source_query": "e12_enrollment_series.sql · findings 14"
    },
    "temporal_ed": {
      "title": "ED visits / 1,000 over time",
      "formula": "benes-weighted mean er_visits_per_1000 (variation facts, County), 2014–2023.",
      "inputs": {
        "start": "722 (2014)",
        "end": "562 (2023)",
        "abs_change": -161,
        "pct_change": "−22.2%"
      },
      "source_query": "e12_variation_series.sql · findings 14"
    },
    "temporal_opioid": {
      "title": "Opioid prescribing % over time",
      "formula": "claims-weighted opioid rate (100×sum opioid claims/sum total claims), County Totals, 2013–2023.",
      "inputs": {
        "start": "6.6% (2013)",
        "end": "4.1% (2023)",
        "abs_change": "−2.5 pts",
        "pct_change": "−37.4%"
      },
      "source_query": "e12_opioid_series.sql · findings 14"
    },
    "fac_readmissions": {
      "title": "Facility readmissions (discharge-weighted ERR)",
      "formula": "Per CCN × HRRP cohort excess-readmission ratio (ERR = predicted/expected); facility = discharge-weighted mean ERR across non-null cohorts. ERR > 1.0 = worse than national risk-adjusted expectation.",
      "inputs": {
        "region_facilities": 538,
        "rankable": 19,
        "worst": "MERCY MEDICAL CENTER 1.0773",
        "best": "MEDSTAR UNION MEMORIAL 0.9103"
      },
      "source_query": "e7_facility_quality.py · e7_region_facilities.sql + e7_readmissions.sql · findings 09 §1"
    },
    "fac_ed": {
      "title": "ED throughput (OP_18b median minutes)",
      "formula": "OP_18b = median minutes ED arrival→departure for DISCHARGED ED patients (the standard ED-throughput headline). Higher = longer waits = worse access.",
      "inputs": {
        "rankable": 17,
        "worst": "MEDSTAR FRANKLIN SQUARE 399 min",
        "best": "CARROLL / MEDSTAR HARBOR 216 min"
      },
      "source_query": "e7_facility_quality.py · e7_timely_care.sql · findings 09 §2"
    },
    "growth_reach": {
      "title": "Mentor-network reach (E8)",
      "formula": "Per anchor / advisor: region providers + groups reachable over COMPLETE edges (BILLS_THROUGH provider→group, MEMBER_OF provider→ACO, org-name match for anchors), intersected with E2 opportunity + E6 fit flags.",
      "inputs": {
        "johns_hopkins_providers": 4009,
        "medstar_providers": 1461,
        "umms_providers": 2607,
        "carefirst_providers": 0
      },
      "source_query": "e8_growth_contacts.py · findings 10 §0 (reach summary)"
    },
    "growth_warmpath": {
      "title": "Warm path — Leigh Curl → MedStar Medical Group II",
      "formula": "mentor billing affiliation (COMPLETE BILLS_THROUGH) → E2 high-opportunity group; annual_oppty = gap_ccm × $56.50 × 12.",
      "inputs": {
        "mentor": "Leigh Ann Curl, MD (NPI 1659348738)",
        "group": "Medstar Medical Group Ii Llc (org_pac_id 0547413825)",
        "providers": 762,
        "panel": 256200,
        "annual_oppty_usd": 169758839
      },
      "source_query": "e8_growth_contacts.py · findings 10 §1 (strongest warm path)"
    },
    "growth_groups": {
      "title": "Top mentor-reachable group contacts (E2-scored)",
      "formula": "E2 group annual_oppty for group practices reachable through a mentor, ranked by recoverable $ (dedup by org_pac_id, highest reach kept).",
      "inputs": {
        "top_group": "MedStar Group II $169.8M",
        "anchors": 4,
        "advisors": 3
      },
      "source_query": "e8_growth_contacts.py + e2_group_rollup.sql · findings 10 §2–§3"
    },
    "missing_quality": {
      "title": "Missing-quality (no MIPS) geo cluster",
      "formula": "Region providers with NULL final_mips_score / region providers × 100, per county. Absence-of-quality signal + choropleth layer (missing_mips_pct).",
      "inputs": {
        "region_missing": 69054,
        "region_providers": 76554,
        "region_pct": 90.2,
        "baltimore_city_missing": 23502
      },
      "source_query": "e6_specialty_prescribing.py · e2_provider_region.sql · findings 08 §3"
    },
    "AHEAD-md-savings-trend": {
      "title": "Maryland TCOC — Medicare FFS savings per beneficiary / year (DS-1)",
      "source": "Maryland AHEAD",
      "formula": "Difference-in-differences impact on total Medicare FFS spending, $ per beneficiary per year (main estimate). Savings deepen once TCOC begins in 2019 (−$450/bene, −3.2%). REAL Maryland values rendered as a SEPARATE crimson dashed \"Maryland AHEAD\" line (spec §4j) — never merged with our Hikari (CMS) series.",
      "inputs": {
        "2014": "−$186 (−1.5%)",
        "2015": "−$62 (−0.5%)",
        "2016": "−$179 (−1.4%)",
        "2017": "−$51 (−0.4%)",
        "2018": "−$216 (−1.6%)",
        "2019_tcoc": "−$450 (−3.2%)",
        "2020_tcoc": "−$426 (−3.2%)",
        "2021_tcoc": "−$162 (−1.1%)"
      },
      "source_query": "DS-1 · HSCRC Maryland TCOC Model Quantitative Evaluation · https://hscrc.maryland.gov/Documents/Modernization/MD_TCOC_Evaluation_Quantitative-Only%20Report.pdf · findings/15"
    },
    "AHEAD-md-netsavings": {
      "title": "Net Medicare savings, program total (DS-2)",
      "source": "Maryland AHEAD",
      "inputs": {
        "net_medicare_savings": "≈$689M",
        "period": "2019 onward (TCOC period)"
      },
      "source_query": "DS-2 · JAMA Health Forum · https://jamanetwork.com/journals/jama-health-forum/fullarticle/2826156 · findings/15"
    },
    "AHEAD-md-growth": {
      "title": "Hospital per-capita revenue growth vs the cap (DS-3)",
      "source": "Maryland AHEAD",
      "formula": "Actual Maryland-resident all-payer hospital per-capita revenue growth vs the CMS 3.58%/yr cap — under the cap in both measured years.",
      "inputs": {
        "cap_pct": "3.58%/yr",
        "CY2013→2014": "1.47%",
        "CY2014→2015": "2.31%"
      },
      "source_query": "DS-3 · HSCRC All-Payer Model Biannual Report (Apr 2019) · https://hscrc.maryland.gov/documents/legal-legislative/reports/2019%20reports/april%202019%20biannual%20report%20final.pdf · findings/15"
    },
    "AHEAD-md-globalbudget": {
      "title": "Model structural facts — global budgets (DS-4)",
      "source": "Maryland AHEAD",
      "inputs": {
        "hospital_revenue_in_global_budgets": "80%",
        "medicare_savings_target_5yr": "≥$330M",
        "hac_reduction_target": "30%"
      },
      "source_query": "DS-4 · HCTTF Assessment — MD All-Payer Model · https://hcttf.org/wp-content/uploads/2020/10/HCTTF-Assessment_MD-All-Payer-Model.pdf · findings/15"
    },
    "AHEAD-md-measures": {
      "title": "AHEAD primary-care quality measure set (DS-5)",
      "source": "Maryland AHEAD",
      "formula": "P4P/P4R measures AHEAD pays primary care to move, mapped to our data: EDU/AHU ↔ e7 (readmissions/ED); CDC/CBP ↔ e6 (chronic specialties/prescribing).",
      "inputs": {
        "EDU": "ED Utilization (CMIT 234, Medicaid, P4P)",
        "AHU": "Acute Hospital Utilization (CMIT 14, Medicaid, P4P)",
        "CDC": "HbA1c Poor Control (CMIT 204, eCQM/CRISP, P4R)",
        "CBP": "Controlling High Blood Pressure (CMIT 167, eCQM/CRISP, P4R)",
        "CDF": "Depression Screening + Follow-Up (CMIT 672, P4R)",
        "plus": "Colorectal Screening (COL), Well-Care Visits (WCV)"
      },
      "source_query": "DS-5 · Maryland AHEAD Primary Care Programs All-Call (12/16/2025) · https://health.maryland.gov/mdpcp/Documents/12-16-2025%20_State%20of%20Maryland_AHEAD_Primary_Care_Programs_All-Call.pdf · findings/15"
    },
    "HERO-md-strip": {
      "title": "MA penetration is FFS-by-design (Maryland AHEAD context)",
      "source": "Maryland AHEAD",
      "formula": "Maryland's HSCRC all-payer waiver sets Medicare FFS hospital rates, so the value-based machinery (global budgets, MDPCP / PC AHEAD) reaches Original-Medicare FFS benes — less pull toward MA. AHEAD keeps the waiver; PY1 begins Jan 2026. The −26pp MA gap (25.1% vs 51.0%) is the model, not a weakness.",
      "inputs": {
        "metro_ma_pct": "25.1%",
        "national_ma_pct": "51.0%",
        "ahead_py1": "Jan 2026"
      },
      "source_query": "DS-4 · HCTTF Assessment — MD All-Payer Model · https://hcttf.org/wp-content/uploads/2020/10/HCTTF-Assessment_MD-All-Payer-Model.pdf · findings 01j / 15"
    },
    "OPP-md-strip": {
      "title": "Captured care management = retained margin under global budgets (Maryland AHEAD context)",
      "source": "Maryland AHEAD",
      "formula": "Under Maryland global budgets a hospital's revenue is fixed in advance, so reduced readmissions / ED = retained margin, not lost FFS. Maryland already netted ≈$689M Medicare savings (DS-2), with a −$450/bene TCOC-peak FFS reduction in 2019 (DS-1).",
      "inputs": {
        "net_medicare_savings": "≈$689M (DS-2)",
        "tcoc_peak_reduction": "−$450/bene, 2019 (DS-1)"
      },
      "source_query": "DS-1 HSCRC TCOC eval + DS-2 JAMA Health Forum · https://jamanetwork.com/journals/jama-health-forum/fullarticle/2826156 · findings/15"
    },
    "FOOT-md-strip": {
      "title": "PC AHEAD Enhanced Primary Care Payment aligns with the care-mgmt build (Maryland AHEAD context)",
      "source": "Maryland AHEAD",
      "formula": "PC AHEAD pays an Enhanced Primary Care Payment (PBPM) carrying a Quality-Based Adjustment + HCC risk adjustment; APCM / CCM map onto Maryland's advanced-primary-care build.",
      "inputs": {
        "payment": "Enhanced Primary Care Payment (PBPM)",
        "adjustments": "Quality-Based + HCC risk",
        "ours": "APCM / CCM footprint (e1)"
      },
      "source_query": "DS-5 · Maryland AHEAD Primary Care Programs All-Call (12/16/2025) · https://health.maryland.gov/mdpcp/Documents/12-16-2025%20_State%20of%20Maryland_AHEAD_Primary_Care_Programs_All-Call.pdf · findings/15"
    },
    "TGT-md-strip": {
      "title": "90.2% missing-quality = the gap AHEAD's quality-based EPCP pays to close (Maryland AHEAD context)",
      "source": "Maryland AHEAD",
      "formula": "90.2% of region providers have no CMS MIPS score — the at-risk quality gap AHEAD's quality-based Enhanced Primary Care Payment (EPCP) rewards closing, across the measure set EDU / AHU / CDC / CBP / CDF.",
      "inputs": {
        "region_missing_mips_pct": "90.2%",
        "measure_set": "EDU, AHU, CDC, CBP, CDF"
      },
      "source_query": "DS-5 · Maryland AHEAD Primary Care Programs All-Call (12/16/2025) · https://health.maryland.gov/mdpcp/Documents/12-16-2025%20_State%20of%20Maryland_AHEAD_Primary_Care_Programs_All-Call.pdf · findings/15"
    },
    "FAC-md-strip": {
      "title": "Readmissions (ERR) + ED (OP_18b) ARE AHEAD P4P measures (Maryland AHEAD context)",
      "source": "Maryland AHEAD",
      "formula": "AHEAD's P4P set includes ED Utilization (EDU, CMIT 234) and Acute Hospital Utilization (AHU, CMIT 14). Under global budgets each readmission / ED visit is margin leak — these CMS facility metrics are exactly what AHEAD pays to move.",
      "inputs": {
        "EDU": "ED Utilization (CMIT 234, P4P)",
        "AHU": "Acute Hospital Utilization (CMIT 14, P4P)",
        "ours": "facility ERR + OP_18b (e5)"
      },
      "source_query": "DS-5 · Maryland AHEAD Primary Care Programs All-Call (12/16/2025) · https://health.maryland.gov/mdpcp/Documents/12-16-2025%20_State%20of%20Maryland_AHEAD_Primary_Care_Programs_All-Call.pdf · findings/15"
    },
    "GROW-md-strip": {
      "title": "Anchor systems operate under Maryland global budgets (Maryland AHEAD context)",
      "source": "Maryland AHEAD",
      "formula": "Hopkins / MedStar / UMMS operate under Maryland all-payer global budgets; CareFirst is a commercial payer inside the all-payer model — care-management adoption aligns with their model incentives.",
      "inputs": {
        "global_budget_systems": "Hopkins, MedStar, UMMS",
        "commercial_payer": "CareFirst (in all-payer model)"
      },
      "source_query": "DS-4 · HCTTF Assessment — MD All-Payer Model · https://hcttf.org/wp-content/uploads/2020/10/HCTTF-Assessment_MD-All-Payer-Model.pdf · findings/15"
    },
    "GRAPH-md-badge": {
      "title": "Baltimore subgraph sits inside Maryland's all-payer model (Maryland AHEAD context)",
      "source": "Maryland AHEAD",
      "inputs": {
        "context": "Systems in the subgraph run under HSCRC / AHEAD global budgets",
        "revenue_in_global_budgets": "80% (DS-4)"
      },
      "source_query": "DS-4 · HCTTF Assessment — MD All-Payer Model · https://hcttf.org/wp-content/uploads/2020/10/HCTTF-Assessment_MD-All-Payer-Model.pdf · findings/15"
    },
    "TECH-md-badge": {
      "title": "Techstars AI Health Baltimore sits inside the AHEAD all-payer market (Maryland AHEAD context)",
      "source": "Maryland AHEAD",
      "inputs": {
        "context": "Anchor systems run under Maryland global budgets (HSCRC / AHEAD)",
        "ahead_py1": "Jan 2026"
      },
      "source_query": "DS-4 · HCTTF Assessment — MD All-Payer Model · https://hcttf.org/wp-content/uploads/2020/10/HCTTF-Assessment_MD-All-Payer-Model.pdf · findings 01j / 15"
    },
    "SPORTS-md-badge": {
      "title": "MedStar operates under Maryland global budgets (Maryland AHEAD context)",
      "source": "Maryland AHEAD",
      "inputs": {
        "context": "MedStar (the teams' medical provider) runs under HSCRC / AHEAD global budgets"
      },
      "source_query": "DS-4 · HCTTF Assessment — MD All-Payer Model · https://hcttf.org/wp-content/uploads/2020/10/HCTTF-Assessment_MD-All-Payer-Model.pdf · findings/15"
    }
  },
  "graphinfo": {
    "note": "Proof + education drawer (spec §4h). Every stat is sourced: findings/00 §6 (hikari_national node/edge census), findings/11 §1 (Baltimore subgraph census + region edge counts, experiment e9), and the research/queries + research/experiments directories. Numbers match the findings exactly; anything unsourced is labeled 'discovery pending'.",
    "subgraph": {
      "eid": "GRAPHINFO-subgraph",
      "icon": "bi-diagram-3",
      "title": "The Baltimore sub-graph",
      "subtitle": "Scoped from hikari_national by region",
      "region_filter": "Provider{state:'MD'} with city in the 133-city Baltimore-metro set (FIPS 24 counties 510, 005, 003, 013, 025, 027, 035) plus the facilities, group practices, ACOs, drugs and geographies they connect to.",
      "why": "A national graph of ~9.0M providers and ~59M edges is too big to reason about per-market and too slow for native graph algorithms. Scoping to the metro yields a focused, algorithm-feasible sub-graph where every centrality / community / reach run completes and every figure is about Baltimore.",
      "census": [
        {
          "label": "Region providers",
          "value": 100845,
          "icon": "bi-people"
        },
        {
          "label": "Region facilities",
          "value": 515,
          "icon": "bi-hospital"
        }
      ],
      "edges": [
        {
          "edge": "PRESCRIBES",
          "neighbor": "Drug",
          "count": 195767
        },
        {
          "edge": "BILLS_FOR",
          "neighbor": "Service",
          "count": 116500
        },
        {
          "edge": "LOCATED_IN",
          "neighbor": "Geography",
          "count": 75078
        },
        {
          "edge": "HAS_SPECIALTY",
          "neighbor": "Specialty",
          "count": 73754
        },
        {
          "edge": "BILLS_THROUGH",
          "neighbor": "GroupPractice",
          "count": 37931
        },
        {
          "edge": "PRACTICES_AT",
          "neighbor": "Facility",
          "count": 5515
        },
        {
          "edge": "MEMBER_OF",
          "neighbor": "ACO",
          "count": 1302
        }
      ],
      "source": "findings/11 §1 (experiment e9 · queries/e9_census_providers.cypher, e9_census_facilities.cypher, e9_subgraph_edges.cypher)"
    },
    "queries": {
      "eid": "GRAPHINFO-queries",
      "icon": "bi-archive",
      "title": "Every figure traces to a stored query",
      "blurb": "No number on these pages is hand-typed. Each traces to a re-runnable, version-controlled query file in research/queries/, executed by one of the experiment harnesses in research/experiments/.",
      "counts": [
        {
          "label": "Stored SQL queries (DuckDB / Parquet)",
          "value": 21,
          "icon": "bi-filetype-sql"
        },
        {
          "label": "Stored Cypher queries (FalkorDB)",
          "value": 16,
          "icon": "bi-diagram-3"
        },
        {
          "label": "Total stored queries",
          "value": 37,
          "icon": "bi-archive"
        },
        {
          "label": "Experiment harnesses",
          "value": 6,
          "icon": "bi-flask"
        }
      ],
      "experiments": [
        "e0 — region geography & national benchmark",
        "e1 — care-management footprint",
        "e2 — opportunity & target ranking",
        "e4 — Techstars ecosystem roster",
        "e9 — graph algorithms",
        "e10 — sports team physicians"
      ],
      "source": "research/queries/ (21 .sql + 16 .cypher = 37 files) + research/experiments/ (e0, e1, e2, e4, e9, e10)"
    },
    "graph_design": {
      "eid": "GRAPHINFO-graph-design",
      "icon": "bi-bezier2",
      "title": "Graph design — hikari_national",
      "blurb": "The production knowledge graph: 10 node labels, 11 edge types, ~9.0M providers across ~59M edges. The Baltimore sub-graph is a regional slice of this.",
      "nodes": [
        {
          "label": "Provider",
          "count": 9016692
        },
        {
          "label": "Organization",
          "count": 1897614
        },
        {
          "label": "GroupPractice",
          "count": 218125
        },
        {
          "label": "Facility",
          "count": 85998
        },
        {
          "label": "Geography",
          "count": 33791
        },
        {
          "label": "Service",
          "count": 7015
        },
        {
          "label": "Drug",
          "count": 1779
        },
        {
          "label": "QualityMeasure",
          "count": 948
        },
        {
          "label": "ACO",
          "count": 643
        },
        {
          "label": "Specialty",
          "count": 466
        }
      ],
      "edges": [
        {
          "edge": "PRESCRIBES",
          "count_display": "25.6M"
        },
        {
          "edge": "LOCATED_IN",
          "count_display": "12.0M"
        },
        {
          "edge": "BILLS_FOR",
          "count_display": "9.26M"
        },
        {
          "edge": "HAS_SPECIALTY",
          "count_display": "6.05M"
        },
        {
          "edge": "BILLS_THROUGH",
          "count_display": "4.57M"
        },
        {
          "edge": "PRACTICES_AT",
          "count_display": "1.60M"
        },
        {
          "edge": "MIPS_SCORED",
          "count_display": "537K"
        },
        {
          "edge": "MEMBER_OF",
          "count_display": "456,953"
        },
        {
          "edge": "RATED",
          "count_display": "375,415"
        },
        {
          "edge": "OWNED_BY",
          "count_display": "259,757"
        },
        {
          "edge": "PARTICIPATES_IN",
          "count_display": "5"
        }
      ],
      "note": "PRACTICES_AT and PARTICIPATES_IN are Splink-derived and still being populated (findings/00 §6) — so the opportunity model leans on the COMPLETE edges (BILLS_THROUGH, MEMBER_OF).",
      "source": "findings/00 §6 (graph census, hikari_national)"
    },
    "mecs": {
      "eid": "GRAPHINFO-mecs",
      "icon": "bi-grid-3x3-gap",
      "title": "MECS — Multi-Entity-Centered Star schema",
      "blurb": "The analytics half. The graph is projected into a DuckDB / Parquet star schema: one dim_* table per entity (the star center) surrounded by fact_* tables at declared grains. Aggregations, rankings and the TAM math run here (DuckDB); multi-hop traversal runs on the graph (FalkorDB). The same ETL run produces both, so they stay consistent (INV-H5 / INV-H6).",
      "scale": [
        {
          "label": "Dimension tables",
          "value": "10",
          "icon": "bi-star-fill"
        },
        {
          "label": "Fact tables",
          "value": "40",
          "icon": "bi-table"
        },
        {
          "label": "Entity-centric stars",
          "value": "10",
          "icon": "bi-diagram-2"
        }
      ],
      "entities": [
        "Provider",
        "Facility",
        "Geography",
        "Organization",
        "GroupPractice",
        "ACO",
        "Specialty",
        "QualityMeasure",
        "Service",
        "Drug"
      ],
      "star": {
        "center": "dim_provider",
        "points": [
          "fact_provider_summary",
          "fact_provider_service",
          "fact_provider_quality_mips"
        ]
      },
      "tables_used": [
        {
          "table": "dim_provider",
          "role": "geo filter + group rollup (org_pac_id) + specialty + MIPS"
        },
        {
          "table": "fact_provider_summary",
          "role": "panel size, dual %, risk, 25 chronic-condition prevalences → CCM / BHI denominators"
        },
        {
          "table": "fact_provider_service",
          "role": "actual care-management billing per NPI (HCPCS)"
        },
        {
          "table": "fact_provider_quality_mips",
          "role": "final MIPS score + category scores (the quality gate)"
        },
        {
          "table": "bridge_zcta_county",
          "role": "ZIP → county region membership"
        }
      ],
      "note": "Star motif: dim_provider sits at the center; fact_provider_summary / fact_provider_service / fact_provider_quality_mips radiate as points; bridge tables cross stars. 'MECS' = Multi-Entity-Centered Star schema.",
      "source": "RFC-012 (MECS star schema: 10 dims / 40 facts / 10 entity stars) + findings/00 §7 (the dim_* / fact_* tables this exploration reads)"
    }
  }
};
