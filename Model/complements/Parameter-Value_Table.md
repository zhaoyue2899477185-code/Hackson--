# Dataset - Parameter-Value Reference Table

> This table gives every calibrated parameter of the final model with its value and unit; sources and evidence levels are in `data-source-mapping.md`.
> Monetary unit: HKD, FX 7.8 HKD/USD.

## 1. Global and Scalar Parameters

| Parameter | Meaning | Value | Unit | Evidence level |
| --- | --- | ---: | --- | --- |
| FX | Demo FX | 7.8 | HKD/USD | [Official-derived] |
| $\sigma$ | 60-day log-volatility | 0.10 (0.08-0.13) | dimensionless | [Authoritative third-party] + [Assumption] |
| $\mu$ | Log drift (reference = current) | 0 (+-0.03, +-0.06) | dimensionless | [Assumption] |
| $q$ | Change probability | 0.05 (0.03-0.10) | probability | [Peer-reviewed] |
| $\rho_{\text{face}}$ | Passenger value per mile | 0.0936 (1.2 US cents) | HKD/mile | [Authoritative third-party] |
| $c_m$ | Carrier cost per mile | 0.0538 (0.69 US cents) | HKD/mile | [Official-derived] |
| $c_0$ | Fixed per-benefit operating cost | 2 | HKD | [Assumption] |
| $c_1$ | Per-change processing cost | 20 | HKD | [Assumption] |
| $\lambda$ | Inventory-opportunity cost | 15 | HKD/change | [Assumption] |
| $\Phi$ | Risk buffer | 0.30 | ratio | [Assumption] |
| margin | Profit margin | 0.20 | ratio | [Assumption] |
| $\alpha$ | Rebate fraction (cash-equivalent) | 0.50 (0.30-1.00) | dimensionless | [Design] |
| $M_{\max}$ | Miles cap per change | 20,000 | miles | [Design] |
| FRAG | Fragmentation perceived-value discount | 0.50 | ratio | [Assumption] |
| $M_{\min}$ | Minimum effective usage threshold | 5,000 / 7,000 | miles | [Official] |
| Mileage liability basis | 2024 deferral / recognition / opening | 3,928 / 2,999 / 657 | HK$M | [Official] |

## 2. Route Fare Anchors $F_0$ (Economy round trip "from")

| Route | $F_0$ (HKD) | Evidence level |
| --- | ---: | --- |
| Hong Kong-Tokyo | 3,640 | [Official] snapshot |
| Hong Kong-Seoul | 2,724 | [Official] snapshot |
| Hong Kong-Beijing | 3,609 | [Official] snapshot |
| Hong Kong-Shanghai | 2,889 | [Official] snapshot |

## 3. Fare-Family Change Fees $g_j$

| Fare family | $g_j$ (HKD/change) | Evidence level |
| --- | ---: | --- |
| Light | 390 (US$50 equivalent) | Structure [Official], amount [Assumption] |
| Essential | 240 | [Assumption] |
| Flex | 0 | [Official] |

## 4. Derived Statistics (from formulas, not independently calibrated)

| Quantity | Value | Unit | Note |
| --- | ---: | --- | --- |
| $S^{+}/F_0$ | 0.0425 | ratio | Expected positive difference over fare at $\sigma=0.10,\mu=0$ |
| $c_m/\rho_{\text{face}}$ | 0.575 | ratio | Mileage cost-to-face-value ratio |

## 5. Final Outputs (per Route x Family)

| Route | Family | $S^{+}$ (HKD) | Miles per change | Fee $K$ (HKD) |
| --- | --- | ---: | ---: | ---: |
| Tokyo | Light | 154.8 | 827 | 39.7 |
| Tokyo | Essential | 154.8 | 827 | 28.0 |
| Tokyo | Flex | 154.8 | 827 | 9.3 |
| Seoul | Light | 115.9 | 619 | 38.9 |
| Seoul | Essential | 115.9 | 619 | 27.2 |
| Seoul | Flex | 115.9 | 619 | 8.5 |
| Beijing | Light | 153.5 | 820 | 39.7 |
| Beijing | Essential | 153.5 | 820 | 28.0 |
| Beijing | Flex | 153.5 | 820 | 9.3 |
| Shanghai | Light | 122.9 | 656 | 39.0 |
| Shanghai | Essential | 122.9 | 656 | 27.3 |
| Shanghai | Flex | 122.9 | 656 | 8.6 |
