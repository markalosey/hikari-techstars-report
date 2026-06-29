/* AUTO-GENERATED from data/maryland.json by build.py — DO NOT EDIT BY HAND.
 * Embeds the REAL Maryland AHEAD datasets (findings/15) as a global so the AHEAD page
 * never fetch()es (file:// safe). Rendered as the SEPARATE "Maryland AHEAD" layer. */
window.MARYLAND = {
  "meta": {
    "title": "Maryland AHEAD — grabbed datasets",
    "source_label": "Maryland AHEAD",
    "note": "REAL Maryland-program public values, merged into the demo as a SEPARATE, labeled \"Maryland AHEAD\" layer (spec §4j / seed S-40) — distinct color/style + provenance, NEVER merged into the \"Hikari (CMS)\" CMS-derived figures. These are the actual numbers we can grab now from public evaluation/report values; full MCDB/HSCRC acquisition is the separate 2026-06-29-maryland-dataset-expansion ideation. Every series carries its dataset + source URL.",
    "findings": [
      "../../findings/15-maryland-datasets.md"
    ],
    "datasets": [
      "HSCRC TCOC eval",
      "JAMA HF",
      "HSCRC biannual report",
      "HCTTF",
      "AHEAD all-call"
    ]
  },
  "ds1_savings_trend": {
    "figure_id": "AHEAD-md-savings-trend",
    "title": "Maryland TCOC — Medicare FFS savings per beneficiary / year",
    "subtitle": "Difference-in-differences impact on total Medicare FFS spending, $ per beneficiary per year. Savings deepen markedly once Total Cost of Care (TCOC) begins in 2019.",
    "source_label": "Maryland AHEAD",
    "dataset": "HSCRC TCOC eval",
    "dataset_full": "HSCRC Maryland TCOC Model Quantitative Evaluation",
    "url": "https://hscrc.maryland.gov/Documents/Modernization/MD_TCOC_Evaluation_Quantitative-Only%20Report.pdf",
    "unit": "$ per beneficiary per year",
    "legend_label": "Maryland AHEAD (HSCRC TCOC eval)",
    "tcoc_start_year": 2019,
    "years": [
      2014,
      2015,
      2016,
      2017,
      2018,
      2019,
      2020,
      2021
    ],
    "impact_usd": [
      -186,
      -62,
      -179,
      -51,
      -216,
      -450,
      -426,
      -162
    ],
    "series": [
      {
        "year": 2014,
        "impact_usd": -186,
        "pct_impact": -1.5,
        "era": "All-Payer Model",
        "significant": true
      },
      {
        "year": 2015,
        "impact_usd": -62,
        "pct_impact": -0.5,
        "era": "All-Payer Model",
        "significant": false
      },
      {
        "year": 2016,
        "impact_usd": -179,
        "pct_impact": -1.4,
        "era": "All-Payer Model",
        "significant": true
      },
      {
        "year": 2017,
        "impact_usd": -51,
        "pct_impact": -0.4,
        "era": "All-Payer Model",
        "significant": false
      },
      {
        "year": 2018,
        "impact_usd": -216,
        "pct_impact": -1.6,
        "era": "All-Payer Model",
        "significant": true
      },
      {
        "year": 2019,
        "impact_usd": -450,
        "pct_impact": -3.2,
        "era": "TCOC",
        "significant": true
      },
      {
        "year": 2020,
        "impact_usd": -426,
        "pct_impact": -3.2,
        "era": "TCOC",
        "significant": true
      },
      {
        "year": 2021,
        "impact_usd": -162,
        "pct_impact": -1.1,
        "era": "TCOC",
        "significant": false
      }
    ],
    "hospital_spending_note": "Hospital-spending impact also negative: 2014 −$197, 2015 −$161, 2016 −$349 per bene/yr.",
    "note": "*** significant at 90% CI (2014, 2016, 2018, 2019, 2020). A real Maryland data line — the literal \"Maryland data as a separate line.\""
  },
  "ds2_net_savings": {
    "figure_id": "AHEAD-md-netsavings",
    "title": "Net Medicare savings (program total)",
    "source_label": "Maryland AHEAD",
    "dataset": "JAMA HF",
    "dataset_full": "JAMA Health Forum",
    "url": "https://jamanetwork.com/journals/jama-health-forum/fullarticle/2826156",
    "value_usd": 689000000,
    "value_display": "≈$689M",
    "period": "2019 onward (TCOC period)",
    "label": "net Medicare savings, 2019 onward"
  },
  "ds3_growth_vs_cap": {
    "figure_id": "AHEAD-md-growth",
    "title": "Hospital per-capita revenue growth vs the cap",
    "source_label": "Maryland AHEAD",
    "dataset": "HSCRC biannual report",
    "dataset_full": "HSCRC All-Payer Model Biannual Report (Apr 2019)",
    "url": "https://hscrc.maryland.gov/documents/legal-legislative/reports/2019%20reports/april%202019%20biannual%20report%20final.pdf",
    "cap_pct": 3.58,
    "cap_label": "CMS all-payer per-capita revenue growth cap",
    "actual": [
      {
        "period": "CY2013→2014",
        "growth_pct": 1.47
      },
      {
        "period": "CY2014→2015",
        "growth_pct": 2.31
      }
    ],
    "note": "Actual Maryland-resident growth ran under the 3.58%/yr cap in both measured years."
  },
  "ds4_global_budgets": {
    "figure_id": "AHEAD-md-globalbudget",
    "title": "Model structural facts — global budgets",
    "source_label": "Maryland AHEAD",
    "dataset": "HCTTF",
    "dataset_full": "HCTTF Assessment — MD All-Payer Model",
    "url": "https://hcttf.org/wp-content/uploads/2020/10/HCTTF-Assessment_MD-All-Payer-Model.pdf",
    "revenue_in_global_budgets_pct": 80,
    "medicare_savings_target_display": "≥$330M",
    "medicare_savings_target_usd": 330000000,
    "hac_reduction_pct": 30,
    "note": "80% of hospital revenue shifted into facility global budgets; 5-yr targets: ≥$330M Medicare savings and a 30% reduction in hospital-acquired conditions."
  },
  "ds5_measures": {
    "figure_id": "AHEAD-md-measures",
    "title": "AHEAD primary-care quality measure set — the scorecard",
    "subtitle": "P4P/P4R measures (Maryland AHEAD all-call, 12/16/2025) — what AHEAD pays primary care to move, mapped to our data surface.",
    "source_label": "Maryland AHEAD",
    "dataset": "AHEAD all-call",
    "dataset_full": "Maryland AHEAD Primary Care Programs All-Call (12/16/2025)",
    "url": "https://health.maryland.gov/mdpcp/Documents/12-16-2025%20_State%20of%20Maryland_AHEAD_Primary_Care_Programs_All-Call.pdf",
    "measures": [
      {
        "code": "EDU",
        "name": "Emergency Department Utilization",
        "cmit": "234",
        "source": "Medicaid claims",
        "type": "P4P",
        "ours": "e7 (readmissions / ED throughput)"
      },
      {
        "code": "AHU",
        "name": "Acute Hospital Utilization",
        "cmit": "14",
        "source": "Medicaid claims",
        "type": "P4P",
        "ours": "e7 (#3 readmission metro, 99th pct)"
      },
      {
        "code": "CDC",
        "name": "Comprehensive Diabetes Care — HbA1c Poor Control",
        "cmit": "204",
        "source": "eCQM via CRISP",
        "type": "P4R",
        "ours": "e6 (chronic-care endocrinology)"
      },
      {
        "code": "CBP",
        "name": "Controlling High Blood Pressure",
        "cmit": "167",
        "source": "eCQM via CRISP",
        "type": "P4R",
        "ours": "e6 (cardiology / chronic prescribing)"
      },
      {
        "code": "CDF",
        "name": "Depression Screening + Follow-Up",
        "cmit": "672",
        "source": "eCQM",
        "type": "P4R",
        "ours": "e6 (behavioral pockets / BHI-eligible)"
      }
    ],
    "also": "Plus Colorectal Screening (COL) and Well-Care Visits (WCV).",
    "note": "EDU/AHU ↔ our e7 (readmissions/ED); CDC/CBP ↔ our e6 (chronic specialties/prescribing)."
  }
};
