# Cathay Pacific Flexible Date Benefit - Final Model (Calibrated, Case Demo)

> Date: 2026-10-19 · Same-cabin assumption · Monetary unit: HKD (demo FX 7.8 HKD/USD)
> Reproducible: `model/calibrate_final.py` -> `model/out/final_calibration.md`, `model/out/final_sensitivity.md`
> Companions: `docs/final/data-source-mapping.md` (sources), `docs/final/dataset-inventory.md` (parameter-value table), `docs/final/build-process.md` (build process)

## 1. Scope

Four typical Hong Kong round-trip routes x three official Economy fare families, same-cabin changes, with every date assumed available during the demo.

| Market | Display currency | Route | Economy fare family |
| --- | --- | --- | --- |
| Mainland China | CNY | Hong Kong-Shanghai | Light / Essential / Flex |
| Hong Kong | HKD | Hong Kong-Beijing | Light / Essential / Flex |
| Japan | JPY | Hong Kong-Tokyo | Light / Essential / Flex |
| Korea | KRW | Hong Kong-Seoul | Light / Essential / Flex |

## 2. Product Rules (Same Cabin)

At time $t_0$ the passenger selects a ticket $x$ (route, cabin, fare family, date $d_0$) priced by Cathay at $F_0$. After paying the benefit fee $K$, the passenger may make one same-route, same-cabin date change within window $W$ before deadline $D$, producing a new fare $F_1$.

- $\Delta=F_1-F_0\le 0$: no refund of the difference (consistent with Cathay's current fare rules).
- $\Delta>0$: the passenger pays $\Delta^{+}=\max(\Delta,0)$, and a cash-equivalent fraction $\alpha$ of it is returned as Asia Miles (this proposal's product rule).
- $K$ covers: one change-fee waiver + the mileage-return cost + operating and inventory-opportunity costs + a risk buffer; the remainder is profit.
- Existing base-ticket rights are not modified; Flex is already change-fee-free, so its $g_j=0$.

## 3. Calibrated Parameters

| Parameter | Calibrated value | Evidence level |
| --- | --- | --- |
| $F_0$ (fare anchor) | Tokyo 3,640 / Seoul 2,724 / Beijing 3,609 / Shanghai 2,889 (HKD, Economy round trip "from") | [Official] snapshot |
| $\sigma$ (60-day log-volatility) | 0.10 (range 0.08-0.13) | [Authoritative third-party] Hopper + academic cross-check |
| $\mu$ (drift) | 0 (baseline, reference = current; sensitivity +-3%, +-6%) | [Assumption] |
| $q$ (change rate) | 0.05 (range 0.03-0.10) | [Peer-reviewed] OTA change rate |
| $\rho_{\text{face}}$ (passenger value per mile) | 1.2 US cents/mile = 0.0936 HKD/mile | [Authoritative third-party] mileage valuation |
| $c_m$ (carrier cost per mile) | 0.69 US cents/mile = 0.0538 HKD/mile | [Official-derived] fee equivalences |
| $g_{\text{Light}}/g_{\text{Essential}}/g_{\text{Flex}}$ | 390 / 240 / 0 (HKD per change) | Structure [Official], amounts [Assumption] |
| $c_0,\ c_1,\ \lambda$ | 2 / 20 / 15 (HKD) | [Assumption] |
| $\Phi$ (risk buffer), margin | 30%, 20% | [Assumption] |
| $\alpha$ (rebate fraction) | 0.50 (range 0.3-1.0) | [Design] |
| $M_{\max}$ (mileage cap) | 20,000 miles per change | [Design] |
| Minimum effective miles | 5,000 (Miles Plus Cash), 7,000 (award) | [Official] |

## 4. Settlement and Cost Formulas

The future fare is lognormal:

$$
\log F_1^{(d)} = \log F_0 + \mu + \eta_d,\qquad \eta_d\sim N(0,\sigma^2).
$$

The expected positive difference uses a Bachelier-type formula:

$$
S^{+} = F_0\Bigl[e^{\mu+\sigma^2/2}\,\Phi\Bigl(\tfrac{\mu+\sigma^2}{\sigma}\Bigr)-\Phi\Bigl(\tfrac{\mu}{\sigma}\Bigr)\Bigr],
\qquad
\Phi \text{ is the standard normal CDF}.
$$

Miles returned per change and expected miles per buyer:

$$
M_d = \min\Bigl(\tfrac{\alpha}{\rho_{\text{face}}}\Delta^{+},\ M_{\max}\Bigr),
\qquad
\bar M = q\,\frac{\alpha}{\rho_{\text{face}}}S^{+}.
$$

Expected cost and benefit fee per buyer:

$$
C = c_0 + q\,(c_1+g_j+\lambda) + c_m\bar M,
\qquad
K = C\,(1+\Phi)\,(1+\text{margin}).
$$

## 5. Final Baseline Results

| Route | Family | $F_0$ | $S^{+}$ | Miles per change | Cost | Fee $K$ | $K/F_0$ |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Tokyo | Light | 3,640 | 154.8 | 827 | 25.5 | 39.7 | 1.09% |
| Tokyo | Essential | 3,640 | 154.8 | 827 | 18.0 | 28.0 | 0.77% |
| Tokyo | Flex | 3,640 | 154.8 | 827 | 6.0 | 9.3 | 0.26% |
| Seoul | Light | 2,724 | 115.9 | 619 | 24.9 | 38.9 | 1.43% |
| Seoul | Essential | 2,724 | 115.9 | 619 | 17.4 | 27.2 | 1.00% |
| Seoul | Flex | 2,724 | 115.9 | 619 | 5.4 | 8.5 | 0.31% |
| Beijing | Light | 3,609 | 153.5 | 820 | 25.5 | 39.7 | 1.10% |
| Beijing | Essential | 3,609 | 153.5 | 820 | 18.0 | 28.0 | 0.78% |
| Beijing | Flex | 3,609 | 153.5 | 820 | 6.0 | 9.3 | 0.26% |
| Shanghai | Light | 2,889 | 122.9 | 656 | 25.0 | 39.0 | 1.35% |
| Shanghai | Essential | 2,889 | 122.9 | 656 | 17.5 | 27.3 | 0.95% |
| Shanghai | Flex | 2,889 | 122.9 | 656 | 5.5 | 8.6 | 0.30% |

Full values are in `model/out/final_calibration.md`.

## 6. Sensitivity (Tokyo-Light, $\sigma\times q\times \alpha$ grid)

- $K$ range: about **24.0-87.8 HKD** (0.66%-2.41% of the fare).
- The dominant driver is $q$: at $q=0.03/0.05/0.10$, $K$ falls roughly in 24-27 / 38-43 / 73-88.
- $\alpha$ is next: at $q=0.05,\sigma=0.10$, $K$ is 38.35 ($\alpha=0.3$), 39.74 (0.5), 43.21 (1.0).
- $\sigma$ matters least: at $q=0.05,\alpha=0.5$, $K$ is 38.35 (0.08), 39.74 (0.10), 40.87 (0.13).
