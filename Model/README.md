# Price Protection — Model Summary

## 1. Notation

| Symbol | Meaning |
| --- | --- |# Price Protection — Model Summary

## 1. Notation

| Symbol | Meaning |
| --- | --- |
| \(P_0\) | Expected fare at booking (CNY) |
| \(P_1\) | Final fare at change (CNY) |
| \(\Delta\) | \(\Delta = P_1 - P_0\) |
| \(F\) | Protection fee (CNY) |
| \(m\) | Miles rebated |
| \(r\) | Miles-to-cash rate (CNY/mile) |
| \(\mu\) | Payout function |
| \(p\) | Company margin per booking (CNY) |

## 2. Model

Payout:

$$
m(\Delta)=
\begin{cases}
\max\left(L,\;k\Delta\right), & \Delta>0,\\[2pt]
0, & \Delta\le 0 .
\end{cases}
$$

Constraints:

$$
rL>F \qquad\text{(every paying passenger ends up ahead)}
$$

$$
\mathbb{E}\left[r\,m\right]=F-p \qquad\text{(budget closes, margin }p\text{)}
$$

## 3. Instantiated Rule

$$
F=12\ \text{CNY},\qquad r=0.06\ \text{CNY/mile},\qquad p=0.10F=1.20\ \text{CNY}
$$

$$
L=1.02\,\frac{F}{r}=204\ \text{miles}
\qquad
k=6.10\ \text{miles/CNY}
$$

## 4. Results — \(P_0=2000\) CNY

| Group | Share | Net per passenger |
| --- | --- | --- |
| Fare falls ($\Delta<0$) | 14.9% | +156.8 CNY |
| No change ($\Delta=0$) | 70.0% | −12.0 CNY |
| Fare rises ($\Delta>0$) | 15.0% | +59.9 CNY |
| Company | 100% | +1.20 CNY |

Payout at selected fare differences:

| $\Delta$ (CNY) | Miles | Cash value (CNY) |
| --- | --- | --- |
| 40 | 244 | 14.7 |
| 100 | 610 | 36.6 |
| 300 | 1,831 | 109.8 |
| 800 | 4,882 | 292.9 |

## 5. Thresholds

| Item | Value |
| --- | --- |
| Breakeven floor | 204 miles (12.24 CNY) |
| Budget cap at \(F=12\) | 1,331 miles |
| Redemption threshold | 5,000 miles |

---

Figures use a synthetic fare-difference distribution.

| \(P_0\) | Expected fare at booking (CNY) |
| \(P_1\) | Final fare at change (CNY) |
| \(\Delta\) | \(\Delta = P_1 - P_0\) |
| \(F\) | Protection fee (CNY) |
| \(m\) | Miles rebated |
| \(r\) | Miles-to-cash rate (CNY/mile) |
| \(\mu\) | Payout function |
| \(p\) | Company margin per booking (CNY) |

## 2. Model

Payout:

$$
m(\Delta)=
\begin{cases}
\max\left(L,\;k\Delta\right), & \Delta>0,\\[2pt]
0, & \Delta\le 0 .
\end{cases}
$$

Constraints:

$$
rL>F \qquad\text{(every paying passenger ends up ahead)}
$$

$$
\mathbb{E}\left[r\,m\right]=F-p \qquad\text{(budget closes, margin }p\text{)}
$$

## 3. Instantiated Rule

$$
F=12\ \text{CNY},\qquad r=0.06\ \text{CNY/mile},\qquad p=0.10F=1.20\ \text{CNY}
$$

$$
L=1.02\,\frac{F}{r}=204\ \text{miles}
\qquad
k=6.10\ \text{miles/CNY}
$$

## 4. Results — \(P_0=2000\) CNY

| Group | Share | Net per passenger |
| --- | --- | --- |
| Fare falls ($\Delta<0$) | 14.9% | +156.8 CNY |
| No change ($\Delta=0$) | 70.0% | −12.0 CNY |
| Fare rises ($\Delta>0$) | 15.0% | +59.9 CNY |
| Company | 100% | +1.20 CNY |

Payout at selected fare differences:

| $\Delta$ (CNY) | Miles | Cash value (CNY) |
| --- | --- | --- |
| 40 | 244 | 14.7 |
| 100 | 610 | 36.6 |
| 300 | 1,831 | 109.8 |
| 800 | 4,882 | 292.9 |

## 5. Thresholds

| Item | Value |
| --- | --- |
| Breakeven floor | 204 miles (12.24 CNY) |
| Budget cap at \(F=12\) | 1,331 miles |
| Redemption threshold | 5,000 miles |

---

Figures use a synthetic fare-difference distribution.
