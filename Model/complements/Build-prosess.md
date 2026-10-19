# Build Process

> Goal: describe the full derivation and computation chain from the original requirement to the final calibrated model, fully reproducible.
> Entry point: `model/calibrate_final.py`; outputs: `model/out/final_calibration.md`, `model/out/final_sensitivity.md`, `model/out/final_calibration.csv`.

## Step 0 - Scope and Assumptions

- One same-cabin date change; every date is always available during the demo ($a_d=1$).
- All amounts in HKD, FX 7.8 HKD/USD (Cathay's official page implies 7.83 from US$60 = HKD470; rounded).
- Goal: produce the benefit fee $K$ and returned miles for four routes x three Economy fare families, plus sensitivity.

## Step 1 - Collect Official Policy (Legal Basis for Settlement)

Open two Cathay policy pages and record each item:

1. **Change/cancel/refund page**: same-route changes; rebooking fee by fare type; fare-difference factors include duration of stay, availability of the original fare class, and seasonal surcharges; no refund on a fare reduction (except certain markets); unused taxes refundable; redemption change "USD50 or 7,500 miles" and cancellation "USD120 or 17,000 miles".
2. **Fare-classes page**: Economy Light/Essential/Flex; flight change is respectively "fee + difference / fee + difference / free + difference"; fees vary by fare type and no unified amount is published.

The trade site supplements the official fare-family names for other cabins (Premium Economy Essential/Flex, Business Light/Essential/Flex, First Flex).

## Step 2 - Anchor the Fare Level $F_0$

Read the Economy round-trip "from" prices from the four official route pages: Tokyo 3,640, Seoul 2,724, Beijing 3,609, Shanghai 2,889 HKD.

**Method**: use the "from" price as the Light price anchor. It is explicitly not a transacted-fare distribution, only a level; $S^{+}$ and $K$ scale through the formulas, so the higher Essential/Flex fares are obtained by applying the same formula to the actual fare.

## Step 3 - Calibrate the Fare-Difference Distribution ($\sigma,\mu$)

**Method**:

1. Take Hopper 2025's cross-market magnitude anchor: fares +12% year-over-year, peak +19% over roughly three months. Interpret "12%-19% price movement over about 3 months" as a log-volatility envelope $\sigma_{3m}\approx 0.12$-0.16.
2. Scale to the 60-day window by the square root of time: $\sigma_{60d}=\sigma_{3m}\sqrt{60/90}\approx 0.10$ (range 0.08-0.13).
3. Model lognormal: $\log F_1^{(d)}=\log F_0+\mu+\eta_d$, $\eta_d\sim N(0,\sigma^2)$; drift $\mu$ baseline 0 (reference = current), sensitivity +-3% and +-6% for seasonal/lead-time effects.

**Closed form for the expected positive difference** (Bachelier/Black-Scholes type):

$$
S^{+}=F_0\Bigl[e^{\mu+\sigma^2/2}\Phi\bigl(\tfrac{\mu+\sigma^2}{\sigma}\bigr)-\Phi\bigl(\tfrac{\mu}{\sigma}\bigr)\Bigr].
$$

At $\sigma=0.10,\mu=0$, $S^{+}/F_0\approx 4.3\%$.

## Step 4 - Calibrate the Change Rate $q$

**Method**: a peer-reviewed paper (Springer JRPM, OTA data) reports change rates in the single-digit percent range, higher closer to departure. Take baseline $q=0.05$, range 0.03-0.10. This is a cross-market anchor; replace it once route-level Cathay change records are available.

## Step 5 - Calibrate Mileage Economics ($\rho_{\text{face}}, c_m$)

**Method**:

1. Passenger face value $\rho_{\text{face}}$: use the mileage-valuation baseline of 1.2 US cents/mile (The Point Calculator award-ticket basis).
2. Carrier cost $c_m$: use Cathay's official cash/miles fee equivalences - 7,500 miles = US$50 (0.667 cents/mile) and 17,000 miles = US$120 (0.706 cents/mile), averaged to 0.69 cents/mile. Cathay's willingness to substitute miles for cash at this ratio is the best public proxy for "what a mile is worth to Cathay".
3. Convert: $\rho_{\text{face}}=0.0936$ HKD/mile, $c_m=0.0538$ HKD/mile, cost-to-face ratio $c_m/\rho_{\text{face}}\approx 0.57$.

The mileage contract liability in Cathay's annual report (2024 deferral 3,928, recognition 2,999, opening 657 HK$M) supports that miles are a deferred liability rather than an immediate cost, but it is not enough to yield a per-mile cost, so it is not used directly as the $c_m$ number.

## Step 6 - Calibrate the Change Fee $g_j$

**Method**: the official page gives only the structure (Light `$$`, Essential `$`, Flex 0). Take the official redemption change fee US$50 (about HKD390) as the Light scale anchor, set Essential to HKD240 from the "$ vs $$" relationship, and Flex to 0. The revenue-ticket matrix is unpublished, so this is a demo assumption pending fare-rule replacement.

## Step 7 - Assemble Cost and Pricing

Expected cost per buyer:

$$
C=c_0+q(c_1+g_j+\lambda)+c_m\,\bar M,
\qquad
\bar M=q\,\frac{\alpha}{\rho_{\text{face}}}S^{+}.
$$

Benefit fee:

$$
K=C\,(1+\Phi)\,(1+\text{margin}),
\qquad
\Phi=0.30,\ \text{margin}=0.20.
$$

**Computation**: `model/calibrate_final.py` computes $S^{+}$, miles per change, cost, and $K$ for four routes x three families, and writes the baseline table plus the $\sigma\times q\times\alpha$ sensitivity table.

## Step 8 - Sensitivity Analysis

Run a $3\times3\times3$ grid on Tokyo-Light ($\sigma\in\{0.08,0.10,0.13\}$, $q\in\{0.03,0.05,0.10\}$, $\alpha\in\{0.3,0.5,1.0\}$).

**Conclusions**:

- $K\in[24.0, 87.8]$ HKD.
- $q$ is the most sensitive variable, $\alpha$ next, and $\sigma$ least.
- This ordering is a structural consequence of the "passenger pays the difference" rule: the increase risk is mostly carried by the passenger, so Cathay's risk-driven cost is only the mileage return, and $K$ is mainly set by the change-fee waiver ($q\times g_j$).

## Step 9 - Interpretation and Product Recommendations

1. The Light fee is about HKD39, or 1.1%-1.4% of the fare, matching the "small additional fee" positioning.
2. To make high-risk routes/periods more expensive, a route-level change-fee matrix or a more generous $\alpha$ is needed; $\sigma$ alone gives a weak gradient.
3. The Flex product shrinks to a pure mileage return whose baseline value cannot support a HKD9 fee; recommend excluding it or offering it near cost.
4. The per-change mileage return is below the official minimum spend threshold, so "can be accumulated" must be stated or a mileage floor introduced.

## Step 10 - Verification and Gaps

- Formula check: `call_style_unit(0, 0.10)` was verified against 2 million Monte Carlo draws (closed form 0.042534 vs sampled 0.042596); $S^{+}/F_0$ rises monotonically as $\sigma\to\infty$; $K$ is monotone nondecreasing in $q,\alpha,\sigma$. Confirmed in the script output.
- Outstanding data: route-level fare panel, real change records, conversion data, fare-rule change-fee matrix, per-mile finance cost. After replacement, rerun `python -m model.calibrate_final` to refresh `model/out/`.
