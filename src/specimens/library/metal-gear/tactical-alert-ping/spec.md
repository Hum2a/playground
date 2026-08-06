# Tactical alert ping (portable recreation spec)

Tiny high-priority detection notification inspired by stealth-game instantaneous
alert language (e.g. Metal Gear Solid). A large red `!` and `DETECTED` label pop
above a target with two thin attention rings. Rebuild from this document,
`demo.css`, `demo.js`, and `contract.json`. No game sounds, fonts, logos, or assets.

## Visual intent

- Immediate attention / detection ping — not a toast or modal
- Large red `!` above the target; `DETECTED` underneath
- Two thin CSS rings expand from the origin in the first 180ms
- Extremely small and portable; no dependencies
- Optional host nudge: exactly `2px` down for ~70ms at impact (once)

## DOM structure

Mount inside a host with `position: relative` and `overflow: hidden`. Scaffold owns
the trigger button.

```html
<div class="tactical-alert-host" data-tactical-alert-host>
  <!-- status UI + TRIGGER ALERT button -->
  <div class="tactical-alert" data-tactical-alert hidden>
    <div class="tactical-alert__rings" aria-hidden="true">
      <span class="tactical-alert__ring tactical-alert__ring--1"></span>
      <span class="tactical-alert__ring tactical-alert__ring--2"></span>
    </div>
    <div class="tactical-alert__mark">
      <span class="tactical-alert__bang" aria-hidden="true">!</span>
      <p class="tactical-alert__label" role="alert">DETECTED</p>
    </div>
  </div>
</div>
```

## Copy

| Role | Text | Notes |
| --- | --- | --- |
| Bang | `!` | Decorative — `aria-hidden` |
| Label | `DETECTED` | Alert announcement |
| Trigger | `TRIGGER ALERT` | Host button |

## Layout and colour contract

| Token / property | Value |
| --- | --- |
| Alert red | `#e21b23` |
| White | `#f7f7f2` |
| Black | `#111111` |
| Bang size | `3.25rem` / weight 900 |
| Host nudge | `translateY(2px)` for `70ms` |
| Exit rise | `10px` upward while fading |

## Motion

Total ≈ `650ms`. No looping.

| Window | Behaviour |
| --- | --- |
| 0–90ms | Mark scales `0` → `1.35` |
| 90–160ms | Settles to `1` (full visibility under 160ms) |
| 0–180ms | Two thin rings expand and fade |
| 160–420ms | Hold |
| 420–650ms | Rise ~10px and disappear |

## Reduced motion

Under `prefers-reduced-motion: reduce` or `[data-force-reduced-motion="true"]`, show
static `!` + `DETECTED` immediately and leave visible until reset/replay. No scale,
rings, or host nudge.

## Accessibility

- Label uses `role="alert"` for one concise “DETECTED” announcement
- Bang and rings are `aria-hidden`
- Trigger is a real `<button>`

## Behaviour (tiny JS)

- `fireTacticalAlert` / `replayTacticalAlert` / `resetTacticalAlert`
- Scaffold button `[data-tactical-alert-trigger]` and harness `{ type: 'restart' }`
- Reuse the same DOM node; never append duplicates

## Porting to another stack

1. Copy `demo.html` / `demo.css` / `demo.js` verbatim.
2. Wrap a relative host with `data-tactical-alert-host` and a trigger button.
3. Call `fireTacticalAlert` from your detection event.
4. Honour both reduced-motion triggers with the static mark.
