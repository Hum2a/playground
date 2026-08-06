# Connection Severed (portable recreation spec)

Unlink interaction: two cards joined by an irregular angular tether. Tension
narrows the centre, the tether snaps, three fragments appear, halves recoil, and
each card settles with an `UNLINKED` label. Rebuild from this document,
`demo.css`, `demo.js`, and `contract.json`.

## Visual intent

- Idle: SOURCE Archive ↔ TARGET Portfolio joined by a thick irregular tether
- Tension (0–180ms): cards pull apart ~3px; centre height 12px → 5px; red backing shows
- Snap (180–260ms): centre breaks; paper-coloured gap opens 0 → 20px; exactly 3 fragments
- Recoil (240–480ms): left/right tether halves retract; cards recoil ~2px outward then settle
- Final: tether gone; both cards show `UNLINKED`
- Reconnect: restrained rebuild (~220ms) or immediate under reduced motion

## DOM structure

```html
<div class="connection-severed" data-connection-severed data-state="linked">
  <div class="connection-severed__stage">
    <article class="connection-severed__card …">SOURCE / Archive / UNLINKED</article>
    <div class="connection-severed__bridge">
      <div class="connection-severed__tether">
        red backing + 3 polygon segments + gap + 3 fragments
      </div>
    </div>
    <article class="connection-severed__card …">TARGET / Portfolio / UNLINKED</article>
  </div>
  <button data-cs-disconnect>DISCONNECT</button>
  <button data-cs-reconnect>RECONNECT</button>
  <p role="status" aria-live="polite">…</p>
</div>
```

## Colours

| Token | Hex |
| --- | --- |
| Black | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Timing (frozen)

| Phase | Window |
| --- | --- |
| Tension | 0–180ms |
| Snap | 180–260ms |
| Recoil | 240–480ms |
| Reconnect | 220ms |

## Accessibility

- `data-state="linked|severed"` exposes connection state
- Polite live region: `Archive connected to Portfolio.` → `Archive disconnected from Portfolio.`
- Decorative tether geometry is `aria-hidden`

## Reduced motion

Immediately remove the tether, show `UNLINKED`, and announce the severed status.
No tension, snap, fragment, or recoil motion.

## Integration

- Import `demo.css` verbatim
- Call `severConnection` / `reconnectConnection` / `replayConnectionSevered`
- No external assets, libraries, or network
