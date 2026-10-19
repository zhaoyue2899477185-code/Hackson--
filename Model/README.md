# Flexible Date Benefit Model

This folder contains the model write-up, calibration inputs, source notes, a
reproducible Python calculation, and result snapshots for the Cathay Pacific
flexible-date benefit proposal.

The model estimates a booking-time benefit fee and the expected mileage return
for one same-cabin date change. The baseline covers four Hong Kong round-trip
routes and the Economy `Light`, `Essential`, and `Flex` fare families. Monetary
values are in HKD unless stated otherwise.

This README is the folder entry point. The full model assumptions, formulas,
calibrated baseline, and sensitivity discussion are in `Model.md`; they are not
repeated here.

## Folder structure

```text
Model/
|-- README.md
|-- Model.md
`-- complements/
    |-- Build-prosess.md
    |-- Data-source.md
    |-- Dataset.json
    |-- Parameter-Value_Table.md
    `-- Computing_script/
        |-- Calibration_code.py
        |-- Calibration_result.md
        `-- Sensitivity.md
```

## Files

| File | Purpose |
| --- | --- |
| [`Model.md`](Model.md) | Main model document: scope, product rules, calibrated parameters, settlement and cost formulas, baseline results, and sensitivity summary. |
| [`complements/Build-prosess.md`](complements/Build-prosess.md) | End-to-end derivation from policy evidence and assumptions to parameter calibration, formulas, and computed results. |
| [`complements/Data-source.md`](complements/Data-source.md) | Parameter-to-source mapping, source links, evidence levels, and limitations of each public benchmark. |
| [`complements/Dataset.json`](complements/Dataset.json) | Machine-readable parameter inventory, route anchors, fare-family fees, derived statistics, and baseline outputs. |
| [`complements/Parameter-Value_Table.md`](complements/Parameter-Value_Table.md) | Compact reference table for parameter names, values, units, and evidence levels. |
| [`complements/Computing_script/Calibration_code.py`](complements/Computing_script/Calibration_code.py) | Self-contained calibration script. It contains no third-party dependencies and writes Markdown and CSV outputs. |
| [`complements/Computing_script/Calibration_result.md`](complements/Computing_script/Calibration_result.md) | Checked-in baseline snapshot for the 4 routes x 3 fare families. |
| [`complements/Computing_script/Sensitivity.md`](complements/Computing_script/Sensitivity.md) | Checked-in snapshot of the 27-case Tokyo-Light sensitivity analysis. |

The `source_file` field in `Dataset.json` records the name of the upstream
document used to build the inventory. The calibration script does not read this
file; the executable parameters are defined in `Calibration_code.py`.

Some source documents retain paths from an earlier repository layout, such as
`model/calibrate_final.py`, `model/out/`, or `docs/final/`. Use the folder tree
above as the current path map; the executable model in this folder is
`complements/Computing_script/Calibration_code.py`.

## Quick start

Requirements:

- Python 3.10 or newer
- No `pip install` step

From the repository root:

```bash
python Model/complements/Computing_script/Calibration_code.py
```

Alternatively:

```bash
cd Model/complements/Computing_script
python Calibration_code.py
```

The script creates an `out/` directory next to `Calibration_code.py` and writes:

```text
out/
|-- final_calibration.md
|-- final_sensitivity.md
`-- final_calibration.csv
```

It also prints a short baseline summary to the terminal. Output paths are
resolved from the script location, so the command works from any working
directory.

`Calibration_result.md` and `Sensitivity.md` are reference snapshots. Running
the script does not overwrite them; the generated versions are written under
`out/`.

## Using the calibration code

The main functions in `Calibration_code.py` are:

| Function | Role |
| --- | --- |
| `norm_cdf(x)` | Standard normal cumulative distribution function. |
| `call_style_unit(mu, sigma)` | Computes `E[(exp(eta) - 1)^+]` for `eta ~ N(mu, sigma^2)`. |
| `settle(route, f0, family, **over)` | Calculates one route/fare-family result and returns a dictionary of metrics. |
| `baseline_rows()` | Builds the 12-row baseline set across four routes and three fare families. |
| `sensitivity_rows()` | Builds the 27-row `sigma x q x alpha` sensitivity grid for Tokyo Light. |
| `write_markdown(rows, path, title)` | Writes calculation rows as a Markdown table. |
| `main()` | Creates the output directory, calculates both result sets, and writes Markdown and CSV files. |

The `settle` function accepts overrides for the main scenario parameters:

```python
from Calibration_code import settle

row = settle(
    "HKG-Tokyo",
    3640.0,
    "Light",
    q=0.10,
    sigma=0.13,
    alpha=1.0,
)

print(row["fee"])
```

Returned fields include the fare anchor, expected positive fare difference,
miles per change, expected cost, benefit fee, profit, and passenger tangible
value. See the function body for the complete row schema.

## Where to change parameters

| What to change | Location in `Calibration_code.py` |
| --- | --- |
| Route names and fare anchors | `ROUTES` |
| Baseline drift, volatility, and change probability | `DRIFT`, `SIGMA`, `Q` |
| Rebate fraction and mileage cap | `ALPHA`, `M_MAX` |
| Mileage value and cost | `RHO_FACE`, `C_M` |
| Fare-family change fees | `G` |
| Operating, inventory, risk, and margin assumptions | `C0`, `C1`, `LAMBDA`, `PHI`, `MARGIN`, `FRAG` |
| Sensitivity grid | `sensitivity_rows()` |

When changing a calibrated value, also update the corresponding evidence in
`Data-source.md`, `Parameter-Value_Table.md`, `Dataset.json`, and the narrative
in `Model.md` so the documents and executable model remain consistent.

## Reading order

1. `Model.md` for the model definition and results.
2. `Build-prosess.md` for how the model and parameter values were assembled.
3. `Data-source.md` for evidence levels and source limitations.
4. `Parameter-Value_Table.md` for a quick parameter lookup.
5. `Calibration_code.py` to reproduce or modify the calculation.

The baseline amounts are deterministic outputs of the stated assumptions. They
should be treated as a reproducible case study, not as Cathay Pacific's
published fares, change fees, or internal costs.
