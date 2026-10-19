# Cathay Pacific Flexible Date Benefit - Mathematical Model

> Version: complete model form · 2026-10-19
> Purpose: formal model framework for presenting the proposal to Cathay Pacific
> Convention: **this document contains no calibrated values.** Fee amounts, probabilities, distribution parameters, and mile conversion rates remain symbolic parameters.

## 0. Reading Guide and Labels

| Label | Meaning |
| --- | --- |
| **[Official]** | Verifiable on Cathay Pacific's official website, source cited |
| **[Design]** | Product setting defined by this proposal, subject to Cathay confirmation |
| **[Assumption]** | Demo-period simplification, not presented as official fact |

## 1. Product Rules (Revised Restatement)

The original tone is preserved: flexible + affordable; a small benefit fee is paid at booking; the fee is determined by dynamic pricing and a mathematical model; the algorithm estimates the probability and risk of fare increases within the eligible change window; higher-risk bookings carry a higher fee and lower-risk bookings a lower fee; a lower new fare is not refunded; a higher new fare is paid by the passenger, with a portion returned as Asia Miles.

Strict definition:

- At time $t_0$ the passenger selects a ticket $x = (od,\; c,\; j,\; d_0,\; ch,\; \dots)$, where $od$ is the route, $c$ the cabin, $j$ the fare family, $d_0$ the travel date, and $ch$ the booking channel. Cathay Pacific's price for $x$ at that moment is $F_0$.
- **[Design]** The passenger pays the benefit fee $K$ at the original booking (no post-issuance purchase) and gains one date change:
  - Within a date window $W$ centered on $d_0$, and before the change deadline $D$, the passenger may replace $x$ with a final ticket $x_f \in \{x\}\cup\{x_d : d \in W\}$.
  - $x_f$ shares the same route, passenger, and cabin $c$ as $x$. **[Assumption]** This version treats all changes as same-cabin.
  - A new fare $F_1$ arises after the change.
- Settlement rules (let $\Delta = F_1 - F_0$):
  - $\Delta \le 0$: no refund of the difference (**[Official]** *Passengers will not be entitled to fare refunds in case of a fare reduction except in certain markets*). The passenger receives a free date change plus one change-fee waiver.
  - $\Delta > 0$: the passenger pays the positive fare difference $\Delta^{+} = \max(\Delta,0)$ (**[Official]** *fare difference*). **[Design]** A portion of it is returned as Asia Miles. This is the proposal's own product rule, not an existing published Cathay policy.
- The fee $K$ covers one change-fee waiver, the mileage-return cost, operating and inventory-opportunity costs, and a risk buffer; the remainder is pure profit.
- **[Design]** Existing rights are not modified: the benefit is an enhancement layered on the base fare rules. For Flex (already change-fee-free), the change-fee-waiver component of $K$ is zero and only the mileage-return increment is covered.

## 2. Three-Win Principle

1. Passengers whose $F_1 \le F_0$: they gain a flexible date change plus one change-fee waiver.
2. Passengers whose $F_1 > F_0$: they pay the positive difference but receive an Asia Miles return that eases the cost.
3. Cathay Pacific:
   - gains higher purchase intent (conversion uplift);
   - the compensation portion $K_{\text{comp}}$ covers the corresponding cost, so honoring the passenger benefit does not lose money;
   - the remaining portion $K_{\text{profit}}$ is pure profit.

The formal guarantee is in §9.

## 3. Case Scope

| Market | Currency | Typical route (Hong Kong round trip) | Cabin |
| --- | --- | --- | --- |
| Mainland China | CNY | Shanghai | Cabins listed on the official route page (Economy, Premium Economy, Business, First) |
| Hong Kong | HKD | Beijing | Same |
| Japan | JPY | Tokyo | Same |
| Korea | KRW | Seoul | Same |

- Primary demo cabin: Economy.
- Fare families: Economy follows the official **Light / Essential / Flex** (**[Official]**, see §12). Other cabins do not list a unified fare-type name on the same page, so the model uses a generic index $j$; the specific names follow the fare rule at issuance.

## 4. Notation

| Symbol | Meaning |
| --- | --- |
| $x,\ x_f$ | Original ticket, final ticket |
| $d_0,\ d$ | Original travel date, candidate date in the window |
| $W,\ D$ | Eligible date window, change deadline |
| $F_0,\ F_1$ | Cathay price at booking, new fare after change |
| $\Delta,\ \Delta^{+}$ | $F_1-F_0$, $\max(\Delta,0)$ |
| $K$ | Benefit fee (charged once at booking) |
| $K_{\text{comp}},\ K_{\text{profit}}$ | Compensation portion, pure-profit portion |
| $C(x),\ \Phi(x)$ | Expected cost, risk buffer |
| $R_d$ | Reference price for date $d$ |
| $\eta_d$ | Log-residual of the future fare against the reference price |
| $q(x),\ q_d(x),\ a_d(x)$ | Change probability, conditional probability of changing to date $d$, availability probability of date $d$ |
| $\alpha$ | Cash-equivalent fraction of the difference returned, dimensionless, $\alpha\in(0,1]$ |
| $\rho$ | Passenger-facing cash value per mile |
| $M_d,\ M_{\max}$ | Miles returned per change, mileage cap |
| $c_0,\ c_1,\ g_j,\ \lambda(x)$ | Fixed per-benefit operating cost, per-change processing cost, change fee of fare family $j$, inventory-opportunity cost |
| $c_m$ | Marginal cost per mile to Cathay Pacific |
| $\pi(K,x)$ | Probability of buying the benefit (conversion) |
| $\Pi(x)$ | Incremental contribution per ticket |

## 5. Fare Process (Dynamic Pricing and Reference Price)

Reference price:

$$
R_d = \tilde P_d \cdot S(d) \cdot H(h_d)
$$

where $\tilde P_d$ is the historical price-position baseline for the same route, cabin, and fare family (a rolling robust statistic with an adjustable window); $S(d)$ is the seasonal factor; and $H(h_d)$ is the lead-time factor with $h_d$ the days remaining from the change time to date $d$.

Future fare:

$$
\log F_1^{(d)} = \log R_d + \eta_d,
\qquad \eta_d \sim G_{\eta}.
$$

$F_0$ is the realized price at $t_0$; the settlement difference for date $d$ is $\Delta_d = F_1^{(d)} - F_0$.

**[Official/assumption boundary]** The model outputs a **fare distribution** over the dates in the window, not a single-point probability of increase. Risk is characterized by the full distribution: $E[(\Delta_d)^{+}]$, upper-tail quantiles, increase probability, and so on. The official "from" lowest fare is only a price snapshot, not a fare distribution, so it does not enter the model.

## 6. Passenger Behavior

$$
q(x) = \Pr(\text{change} \mid \text{bought the benefit},\ x,\ K),
\qquad
q_d(x) = \Pr(d \mid \text{change},\ x),
\qquad
a_d(x) = \Pr(\text{date } d \text{ available} \mid x).
$$

Date-choice rules come in three tiers: random, behavioral (fitted from historical change records), and adverse selection (passengers tend to change to the date with the largest increase). The demo defaults to the behavioral rule and falls back to random when no data exist; the tier must be labeled explicitly because each yields a different $E[\Delta^{+}]$.

## 7. Settlement and Expected Quantities

$$
\Delta_d^{+} = \max\bigl(F_1^{(d)} - F_0,\ 0\bigr),
\qquad
M_d = \min\Bigl(\tfrac{\alpha}{\rho}\,\Delta_d^{+},\ M_{\max}\Bigr).
$$

$$
S^{+}(x) = \sum_{d\in W} q_d(x)\,a_d(x)\,\mathbb E\bigl[\Delta_d^{+}\mid x\bigr],
\qquad
\bar M(x) = q(x)\sum_{d\in W} q_d(x)\,a_d(x)\,\mathbb E\bigl[M_d\mid x\bigr],
\qquad
G(x) = q(x)\,g_j .
$$

$S^{+}(x)$ is the expected positive difference conditional on a change occurring; it is paid by the passenger and is a settlement quantity, not a Cathay payout. $\bar M(x)$ is the expected mileage issuance, and $G(x)$ is the expected change-fee waiver.

## 8. Cost, Fee Split, and Pricing

**Key correction**: under the "passenger pays the difference" rule, $\Delta^{+}$ is paid by the passenger and is revenue to Cathay, not a direct payout cost. What enters the cost side is: the waived change fee, the mileage-return cost, the change-processing cost, and the inventory-opportunity cost.

$$
C(x) = c_0 + q(x)\,c_1 + G(x) + q(x)\,\lambda(x) + c_m\,\bar M(x).
$$

Fee split:

$$
K(x) = K_{\text{comp}}(x) + K_{\text{profit}}(x),
\qquad
K_{\text{comp}}(x) = C(x) + \Phi(x),
\qquad
\Phi(x)\ge 0,\quad K_{\text{profit}}(x)\ge 0.
$$

Anti-arbitrage constraint: $\rho\,M_d \le \Delta_d^{+}$, i.e. the cash-equivalent value of the miles returned never exceeds the difference the passenger paid; this is jointly guaranteed by $\alpha\le 1$ and the $M_{\max}$ cap.

## 9. Formal Three-Win Guarantee

The passenger's expected incremental surplus at booking (relative to "not buying the benefit") is:

$$
\bar u_p(x) = q(x)\,g_j + V_{\text{flex}}(x) + V_{\text{miles}}(x) - K,
\qquad
V_{\text{miles}}(x) = q(x)\sum_{d\in W} q_d(x)\,a_d(x)\,\mathbb E\bigl[v_m(M_d)\mid x\bigr],
$$

where $v_m(\cdot)$ is the passenger's perceived value of miles (concave, capped) and $V_{\text{flex}}(x)$ is the option value of the change right retained even when it is not exercised. Note that $\Delta^{+}$ must be paid whether or not the benefit is bought, so it cancels in the incremental comparison.

- Passenger wins: $\bar u_p(x)\ge 0$.
  - Exercised with $F_1\le F_0$: increment $= g_j + \text{flexibility value} - K$.
  - Exercised with $F_1>F_0$: increment $= g_j + v_m(M_d) - K$ ($\Delta^{+}$ is paid in both cases and cancels).
- Cathay does not lose money on the compensation: $K-C=\Phi+K_{\text{profit}}\ge 0$, so the direct margin per buyer is nonnegative.
- Cathay gains purchase intent: when $\beta_2 V_{\text{flex}}+\beta_3 V_{\text{miles}} > \beta_1 K$, then $\pi(K,x)>\pi(0,x)$.

**Proposition**: if ① $K_{\text{comp}}\ge C(x)$, ② $K_{\text{profit}}\ge 0$, ③ $\bar u_p(x)\ge 0$, and ④ the value channel raises $\pi$, then the three-win holds.

## 10. Demand, Objective, and Optimization

$$
\pi(K,x) = \sigma\Bigl(\beta_0 - \beta_1 K + \beta_2 V_{\text{flex}}(x) + \beta_3 V_{\text{miles}}(x) + \beta_z^{\top} z\Bigr).
$$

$$
\Pi(x) = \pi(K,x)\bigl[K-C(x)\bigr] + \delta\,q_{\text{ind}}(x)\,L(x),
\qquad
q_{\text{ind}}(x) = \pi(K,x)-\pi(0,x).
$$

$L(x)$ is the base revenue of a ticket newly induced by the benefit; the demo defaults to $\delta=0$ (conservative, looking only at the benefit's own profit and loss).

Optimization problem:

$$
\max_{\alpha,\ M_{\max},\ \Phi,\ K_{\text{profit}}}\ \sum_{x}\Pi(x)
$$

$$
\text{s.t.}\quad
K=C+\Phi+K_{\text{profit}},\quad
\Phi\ge 0,\quad
K_{\text{profit}}\ge 0,\quad
0<\alpha\le 1,\quad
M_{\max}\ge 0,\quad
K\le K_{\max}(x),\quad
\bar u_p(x)\ge 0.
$$

$K_{\max}(x)$ is the passenger willingness-to-pay ceiling (to be calibrated), preventing the fee from collapsing conversion.

## 11. Completeness Assessment

Under the **same-cabin assumption** (one change, one change-fee waiver, fee substitutes for the waiver, demo-period $a_d=1$), the model form is complete: pricing, settlement, cost, fee split, three-win constraints, demand, and objective form a closed loop.

What remains is not "missing formulas" but:

1. Parameter calibration (data): $G_{\eta}$, $q$, $q_d$, $\pi$, $c_m$, $\rho$, and so on;
2. A few confirmations: the historical data source for the reference price and whether the comparable base fare includes tax, the dual "passenger face value / carrier cost" treatment of miles, and involuntary-change handling.

So the precise answer to "is the form complete and only values are missing" is: **the form is complete under the same-cabin assumption; what is missing is calibration plus a few confirmations.**

## 12. Official Evidence

| # | Source | Official key wording | Model mapping |
| --- | --- | --- | --- |
| 1 | Cathay change/cancel/refund page | *date and flight changes can be made for an itinerary involving the same routes*; *Rebooking may not be allowed or may incur additional fees. Subject to the fare rules of your ticket.* | Same-route change; specific rights follow the fare rule |
| 2 | Same | *A rebooking fee may apply depending on the fare type you have purchased.* | $g_j$ varies by fare family |
| 3 | Same | The fare difference may arise from *Duration of stay*, *Availability of the fare class in your original booking*, and *Seasonality and peak travel period surcharges* | $F_1$ is repriced under the same basis on the new date, $\Delta=F_1-F_0$ |
| 4 | Same | *Passengers will not be entitled to fare refunds in case of a fare reduction except in certain markets* | No refund when $\Delta\le 0$ |
| 5 | Same | *Taxes can be refunded for unused or partially used tickets.* | Taxes are recomputed for the new itinerary and do not enter $\Delta$ |
| 6 | Cathay fare-classes page | Economy lists Light / Essential / Flex; the *Flight change* row is respectively *For a fee + potential fare difference*, *For a fee + potential fare difference*, *Free of charge + potential fare difference* | $g_j$ tiers: Light/Essential carry a fee, Flex is zero |
| 7 | Same | Footnote: *The fee charged for flight change or cancellation and no-show will vary based on your fare type... subject to change without prior notice*; the actual amount is shown *when purchasing the ticket online* | The change-fee matrix must come from the fare rule or booking page, not a single value inferred from public pages |
| 8 | Cathay membership / Asia Miles pages | Asia Miles is earned and redeemed across *800+ travel and lifestyle partners* | Asia Miles is a rewards program, not a cash-refund tool; "returning part of the difference as miles" is this proposal's product rule |

Source links:

- Change/cancel/refund: `https://www.cathaypacific.com/cx/en_CN/book-a-trip/change-cancel-refund.html`
- Fare classes: `https://flights.cathaypacific.com/en_CN/fare-classes.html`
- Asia Miles / membership: Cathay membership and *How to earn Asia Miles* pages

**One correction**: earlier material recorded Light as "weakest or no change rights". Per the official fare-classes page, Light's change is "for a fee + potential fare difference", i.e. changeable for a fee, not non-changeable. This README follows the official wording.

## 13. Demo Simplifications and Boundaries

- **[Assumption]** The demo sets $a_d(x)=1$ (every date in the window is always available), while retaining the general term $a_d$ so that *subject to availability* can be restored later.
- **[Assumption]** Only one change; taxes do not enter $\Delta$; involuntary changes (carrier cancellation or rescheduling) are outside the demo.
- **[Assumption]** This version treats all changes as same-cabin: the cabin $c$ is unchanged after the change, and $F_0$ and $F_1$ use the same cabin and fare-family basis. Cross-cabin changes are outside this version.
