# Torn Edge Drawer (portable recreation spec)

Persona-adjacent disclosure drawer: an irregular torn-paper edge drags a printed
panel in from the right with an offset black backing silhouette. Rebuild from this
document and `contract.json`.

Do **not** copy Persona 5 assets, logos, fonts, or exact UI chrome.

## Visual intent

- Non-modal informational drawer / disclosure (not full app navigation)
- Leading (left) edge is visibly torn via frozen `clip-path`
- Black backing ~8px offset, related but misregistered tear
- Paper overshoots once on open; close is faster and not a mirrored reverse
- Host layout does not resize — drawer overlays

## DOM structure

```html
<div class="torn-drawer" data-torn-drawer>
  <div class="torn-drawer__host">
    <p class="torn-drawer__kicker">PROJECT ARCHIVE</p>
    <button type="button" class="torn-drawer__open" data-td-open
      aria-expanded="false" aria-controls="torn-drawer-panel">OPEN INFO</button>
  </div>
  <div class="torn-drawer__panel" id="torn-drawer-panel" role="region"
    aria-labelledby="torn-drawer-title" data-td-panel hidden>
    <div class="torn-drawer__edge" aria-hidden="true"></div>
    <div class="torn-drawer__backing" aria-hidden="true"></div>
    <div class="torn-drawer__paper">
      <div class="torn-drawer__chunk"><h2 id="torn-drawer-title">DETAILS</h2></div>
      <div class="torn-drawer__chunk"><p>Portable motion artifact</p></div>
      <div class="torn-drawer__chunk"><p class="torn-drawer__ref">REF // 05</p></div>
      <div class="torn-drawer__chunk">
        <button type="button" class="torn-drawer__close" data-td-close>CLOSE</button>
      </div>
    </div>
  </div>
</div>
```

Parent: `position: relative; overflow: hidden`.

## Copy

| Role | Value |
| ---- | ----- |
| Host | `PROJECT ARCHIVE` |
| Open | `OPEN INFO` |
| Title | `DETAILS` |
| Body | `Portable motion artifact` |
| Ref | `REF // 05` |
| Close | `CLOSE` |

## Layout and colour contract

| Token / property | Value |
| ---------------- | ----- |
| Paper | `#f2eee3` |
| Ink | `#090909` |
| Red | `#d71920` |
| Width | `min(78%, 340px)` (≈88% under 340px hosts) |
| Height | `100%` |
| Position | `absolute; top: 0; right: 0` |
| Backing offset | `8px` |
| Border radius | `0` |
| Open | `520ms` |
| Close | `360ms` |
| Backing lag | `35ms` after paper |

### Paper clip-path (frozen)

```
polygon(
  0% 0%, 100% 0%, 100% 100%, 0% 100%,
  3% 92%, 0% 84%, 4% 72%, 1% 58%,
  5% 44%, 0% 30%, 4% 16%, 1% 6%
)
```

### Backing clip-path (frozen, misregistered)

```
polygon(
  0% 0%, 100% 0%, 100% 100%, 0% 100%,
  4% 93%, 1% 85%, 5% 73%, 0% 59%,
  6% 45%, 1% 31%, 5% 17%, 0% 7%
)
```

## Open choreography

1. **0–120ms** — narrow black torn-edge strip from the right
2. **80–420ms** — paper `translateX(110%) → -2% → 0`; backing +35ms
3. **320–520ms** — chunks enter with ~40px translate (DETAILS → body → REF → CLOSE)

## Close choreography

~360ms: chunks retract first → paper exits right (`112%`) → backing lags 35ms. Not a mirrored open.

## Reduced motion

Instant open/closed (no stagger, no overshoot). Static torn edge remains.

Triggers: `prefers-reduced-motion: reduce` and `data-force-reduced-motion="true"`.

## Accessibility

- Open control: `aria-expanded` + `aria-controls`
- Panel: `role="region"` labelled by DETAILS; `hidden` when closed
- Backing/edge: `aria-hidden`
- Escape closes; no focus trap (non-modal)
- Focus moves to CLOSE on open, back to OPEN INFO on close

## Porting

1. Copy DOM + CSS + JS (or generate from `contract.json`).
2. Call `openTornDrawer` / `closeTornDrawer`; listen for harness `{ type: 'restart' }`.
3. Keep frozen polygons and timings.
4. No React, Tailwind, host tokens, external fonts, or network.
