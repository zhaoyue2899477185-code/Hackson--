# Data Source Mapping

> Evidence levels: [Official] = verifiable on Cathay's website; [Official-derived] = computed from official numbers; [Authoritative third-party] = industry data provider / professional valuation / peer-reviewed; [Assumption] = demo assumption, not a fact.

## 1. Parameter -> Source -> Value

| Parameter | Calibrated value | Source | Evidence level | Note |
| --- | --- | --- | --- | --- |
| $F_0$ Tokyo | HKD 3,640 | Cathay official route page (Economy round trip "from") | [Official] snapshot | `flights.cathaypacific.com/destinations/en_HK/flights-from-hong-kong-to-tokyo` |
| $F_0$ Seoul | HKD 2,724 | Cathay official route page | [Official] snapshot | `.../flights-from-hong-kong-to-seoul` (another snapshot HKD 2,651) |
| $F_0$ Beijing | HKD 3,609 | Cathay official route page | [Official] snapshot | `.../flights-from-hong-kong-to-beijing` |
| $F_0$ Shanghai | HKD 2,889 | Cathay official route page | [Official] snapshot | `.../flights-from-hong-kong-to-shanghai` (also seen HKD 2,822 / 2,437) |
| Fare-family structure | Economy Light/Essential/Flex; PE Essential/Flex; Business Light/Essential/Flex; First Flex | Cathay fare-classes page + trade site | [Official] | `flights.cathaypacific.com/en_CN/fare-classes.html`; `cxagents.com/ta/en_HK/highlights/new-economy-fares/new-economy-fares.html` |
| Change-fee structure | Light `$$`, Essential `$`, Flex fare difference only | Cathay trade site | [Official] | Amounts not published, shown as `$` |
| $g_{\text{Light}}$ | HKD 390 (US$50 equivalent) | Cathay official: redemption change fee "USD50 or 7,500 miles" | [Official-derived] + [Assumption] | Official figure is for redemption tickets; the revenue-ticket matrix is unpublished, used as a scale anchor |
| $g_{\text{Essential}}$ | HKD 240 | Relative relationship of official `$$` vs `$` | [Assumption] | About 60% of Light; needs fare-rule calibration |
| $g_{\text{Flex}}$ | 0 | Cathay official: Flex "Free of charge + potential fare difference" | [Official] | - |
| $\rho_{\text{face}}$ | 1.2 US cents/mile (HKD 0.0936) | The Point Calculator baseline valuation | [Authoritative third-party] | Award redemption value, not an official rate |
| $c_m$ | 0.69 US cents/mile (HKD 0.0538) | Two Cathay official fee equivalences: 7,500 miles = US$50 (0.667 cents), 17,000 miles = US$120 (0.706 cents) | [Official-derived] | Average of the two |
| FX | 7.8 HKD/USD | Same official page: US$60 = HKD470 -> 7.83 | [Official-derived] | Rounded to 7.8 |
| $\sigma$ (60 days) | 0.10 (0.08-0.13) | Hopper 2025: fares +12% YoY, peak +19% (about 3 months) -> scaled by sqrt(60/90); academic airfare-volatility cross-check | [Authoritative third-party] + [Assumption] | Cross-market anchor, not route-level measurement |
| $q$ | 0.05 (0.03-0.10) | Journal of Revenue and Pricing Management (OTA change rate, single-digit percent) | [Peer-reviewed] | Pandemic-period OTA data, cross-market reference |
| $M$ thresholds | 5,000 / 7,000 miles | Cathay official: Miles Plus Cash minimum 5,000; short-haul awards from 7,000 | [Official] | `.../book-flights/miles-plus-cash.html` |
| Mileage liability basis | 2024 deferral 3,928, recognition 2,999, opening 657 (HK$M) | Cathay 2025 annual report (2026 AGM documents) | [Official] | Supports that miles are a deferred liability, not immediate cost |
| $c_0,c_1,\lambda,\Phi,\text{margin}$ | 2 / 20 / 15 HKD; 30%, 20% | No public basis | [Assumption] | Need operating / finance inputs |
| $\alpha$ | 0.50 (0.3-1.0) | Product design; Cathay "Fly with Miles" up to 30% miles-back as structural precedent | [Design] + [Official] | The precedent is miles-on-miles, not a cash fare difference |

## 2. Source Links

### Cathay official

- Fare classes: `https://flights.cathaypacific.com/en_CN/fare-classes.html`
- Trade site new Economy fares: `https://www.cxagents.com/ta/en_HK/highlights/new-economy-fares/new-economy-fares.html`
- Change/cancel/refund: `https://www.cathaypacific.com/cx/en_CN/book-a-trip/change-cancel-refund.html`
- Miles Plus Cash: `https://www.cathaypacific.com/cx/en_HK/book-a-trip/book-flights/miles-plus-cash.html`
- Route pages: `https://flights.cathaypacific.com/destinations/en_HK/flights-from-hong-kong-to-{tokyo,seoul,beijing,shanghai}`
- Annual report / AGM documents: `https://www.cathaypacific.com/content/dam/cx/about-us/investor-relations/circulars-general-meeting-notices-proxyforms/en/202601-documents-on-display.pdf`

### Authoritative third-party / peer-reviewed

- The Point Calculator (Asia Miles valuation): `https://www.thepointcalculator.com/us/cathay-pacific-asia-miles/cathay-pacific-asia-miles-value/`
- Hopper 2025 fare forecast (via Travel Weekly): `https://www.travelweekly.com/Travel-News/Airline-News/Higher-airfares-expected-first-half-2025`
- Change-rate study (Springer JRPM): `https://link.springer.com/article/10.1057/s41272-022-00403-9`

## 3. Citation Discipline

1. The official "from" prices are only price snapshots; they must not be treated as a fare distribution or official statistics.
2. The 0.69 US cents/mile for $c_m$ is a "fee equivalence" derivation, not a published per-mile cost; the finance basis requires internal data.
3. $\sigma$ and $q$ are cross-market authoritative anchors for demo magnitude; until replaced by route-level measurements, all amounts must carry ranges.
4. The absolute $g_j$ amounts are not published by Cathay; the US$50 for Light is only a scale anchor, not the official change fee.
