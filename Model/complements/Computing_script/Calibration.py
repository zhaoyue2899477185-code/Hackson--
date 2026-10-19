"""Final calibration for the flexible-date benefit model.

All monetary values are in HKD. Parameter sources and authority levels are
recorded in docs/final/data-source-mapping.md; this script only carries the
calibrated numbers and the estimation formulas.
"""

from __future__ import annotations

import csv
import math
from pathlib import Path


def norm_cdf(x: float) -> float:
    return 0.5 * (1.0 + math.erf(x / math.sqrt(2.0)))


def call_style_unit(mu: float, sigma: float) -> float:
    """E[(e^eta - 1)+] for eta ~ N(mu, sigma^2), the expected positive
    relative fare difference."""
    z = mu / sigma
    return math.exp(mu + 0.5 * sigma**2) * norm_cdf(z + sigma) - norm_cdf(z)


# Calibrated constants (HKD unless noted). See data-source-mapping.md.
FX = 7.8
RHO_FACE = 1.2 * 0.01 * FX   # passenger value: 1.2 US cents/mile
C_M = 0.69 * 0.01 * FX       # carrier cost: 0.69 US cents/mile
Q = 0.05                     # change-exercise probability
SIGMA = 0.10                 # 60-day log-volatility of the fare ratio
DRIFT = 0.0                  # log drift vs reference (seasonal/lead-time)
ALPHA = 0.50                 # cash-equivalent rebate fraction
M_MAX = 20_000.0             # miles cap per change
C0 = 2.0                     # fixed per-benefit operating cost
C1 = 20.0                    # marginal change-processing cost
LAMBDA = 15.0                # inventory-opportunity cost per exercise
G = {"Light": 390.0, "Essential": 240.0, "Flex": 0.0}
PHI = 0.30                   # risk buffer on expected cost
MARGIN = 0.20                # profit margin on (cost + buffer)
FRAG = 0.50                  # perceived-value discount for sub-threshold miles

ROUTES = [
    ("HKG-Tokyo", 3640.0),
    ("HKG-Seoul", 2724.0),
    ("HKG-Beijing", 3609.0),
    ("HKG-Shanghai", 2889.0),
]


def settle(route: str, f0: float, family: str, **over) -> dict:
    p = {
        "q": Q, "sigma": SIGMA, "drift": DRIFT, "alpha": ALPHA,
        "g": G[family],
    }
    p.update(over)
    mu = math.log(1.0 + p["drift"])
    s_plus = f0 * call_style_unit(mu, p["sigma"])
    exp_miles_per_change = p["alpha"] / RHO_FACE * s_plus  # cap not binding here
    exp_miles_per_buyer = p["q"] * exp_miles_per_change
    cost = C0 + p["q"] * (C1 + p["g"] + LAMBDA) + C_M * exp_miles_per_buyer
    fee = cost * (1.0 + PHI) * (1.0 + MARGIN)
    passenger_tangible = p["q"] * p["g"] + p["q"] * FRAG * p["alpha"] * s_plus
    return {
        "route": route,
        "family": family,
        "f0": f0,
        "sigma": p["sigma"],
        "q": p["q"],
        "alpha": p["alpha"],
        "drift": p["drift"],
        "s_plus": s_plus,
        "s_plus_pct": s_plus / f0,
        "miles_per_change": exp_miles_per_change,
        "miles_per_buyer": exp_miles_per_buyer,
        "cost": cost,
        "fee": fee,
        "fee_pct": fee / f0,
        "profit": fee - cost,
        "passenger_tangible": passenger_tangible,
    }


def baseline_rows() -> list[dict]:
    rows = []
    for route, f0 in ROUTES:
        for family in ("Light", "Essential", "Flex"):
            rows.append(settle(route, f0, family))
    return rows


def sensitivity_rows() -> list[dict]:
    rows = []
    for sigma in (0.08, 0.10, 0.13):
        for q in (0.03, 0.05, 0.10):
            for alpha in (0.30, 0.50, 1.00):
                rows.append(settle("HKG-Tokyo", 3640.0, "Light",
                                   sigma=sigma, q=q, alpha=alpha))
    return rows


def write_markdown(rows: list[dict], path: Path, title: str) -> None:
    cols = [
        "route", "family", "f0", "s_plus", "s_plus_pct", "miles_per_change",
        "cost", "fee", "fee_pct", "profit", "passenger_tangible",
    ]
    with path.open("w", encoding="utf-8") as fh:
        fh.write(f"# {title}\n\n")
        fh.write("| " + " | ".join(cols) + " |\n")
        fh.write("|" + "---|" * len(cols) + "\n")
        for r in rows:
            fh.write("| " + " | ".join(
                f"{r[c]:,.2f}" if isinstance(r[c], float) else str(r[c])
                for c in cols
            ) + " |\n")
        fh.write("\n")


def main() -> None:
    out = Path(__file__).parent / "out"
    out.mkdir(exist_ok=True)

    base = baseline_rows()
    write_markdown(base, out / "final_calibration.md", "Final Calibration - Baseline")

    sens = sensitivity_rows()
    write_markdown(sens, out / "final_sensitivity.md",
                   "Final Calibration - Sensitivity (HKG-Tokyo, Light)")

    with (out / "final_calibration.csv").open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=list(base[0].keys()))
        writer.writeheader()
        writer.writerows(base)
        writer.writerows(sens)

    print(f"wrote {len(base)} baseline rows, {len(sens)} sensitivity rows")
    for r in base:
        print(f"{r['route']:>12} {r['family']:>9}  F0={r['f0']:>7,.0f}  "
              f"S+={r['s_plus']:>6.1f}  K={r['fee']:>5.1f}  "
              f"miles/change={r['miles_per_change']:>6.0f}")


if __name__ == "__main__":
    main()
