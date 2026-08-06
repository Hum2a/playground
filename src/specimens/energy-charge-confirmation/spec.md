# Energy Charge Confirmation

## Visual intent

Hold-to-confirm for a destructive-feeling action (`PURGE CACHE`). Blue energy fills four frame segments around the control in order **bottom → left → top → right** over a frozen **900ms** hold. The button compresses `1 → 0.97` with progress. At full charge the frame flashes pale (<80ms), the button snaps `.97 → 1.025 → 1`, and the label becomes **CONFIRMED**. Early release drains energy backwards (≤250ms) without confirming.

## DOM structure

- Root `[data-energy-charge]`
- Action label `PURGE CACHE`
- Hold `<button>` with four `.ecc-seg` frame pieces + label
- Polite status + RESET after confirm
- Screen-reader hint for hold semantics

## Copy

| Role | Text |
| --- | --- |
| Action | `PURGE CACHE` |
| Idle / holding label | `HOLD TO CONFIRM` |
| Done | `CONFIRMED` |
| Reset | `RESET` |

## Layout and colour contract

Velvet blues on near-black (`#020912` / `#071f3d` / `#176fa8` / `#4dbce8` / `#d9f7ff`). Progress driven by `--ecc-p` (0–1) from elapsed hold time — not CSS animationend. Segment fill order and 900ms threshold are frozen.

## Reduced motion

Hold duration remains 900ms. `--ecc-p` updates in steps (0 / 25 / 50 / 75 / 100) without animated travel or snap/flash loops. Status announces stepped percent.

## Accessibility

Real button; pointer capture + Space hold (ignore key repeat); blur cancels. `aria-pressed` while holding. Polite live region for status. Visible `:focus-visible` ring.

## Porting to another stack

Import `demo.css` verbatim. Drive confirmation from elapsed hold (`resetEnergyCharge` to idle). Keep 900ms, drain ≤250ms, flash <80ms, and segment order.
