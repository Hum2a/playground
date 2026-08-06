# Butterfly Entry (portable recreation spec)

Arrival/reveal: six abstract blue butterfly forms drift in from frozen edge
points, partial-orbit once, converge, and resolve into a record card. Rebuild
from this document, `demo.css`, `demo.js`, and `contract.json`.

## Visual intent

- Exactly 6 CSS geometric forms (two wing polygons + body line each)
- No images, emoji, SVG illustrations, or particle systems
- Deterministic waypoints; no runtime randomness
- Card emerges from the convergence point with three angular blue backings
- Forms 1, 3, 6 tuck under card edges during construction; swarm then clears
- Final card is fully static

## Entry points (frozen)

| # | Position |
| --- | --- |
| 1 | `12% 82%` |
| 2 | `25% 18%` |
| 3 | `82% 24%` |
| 4 | `91% 72%` |
| 5 | `48% 8%` |
| 6 | `8% 45%` |

Stagger delays: `48, 56, 64, 72, 40, 80` ms.

Each arrive keyframe has 4 waypoints (0 / ~33 / ~70 / 100%).

## Timeline

| Phase | Window | Notes |
| --- | --- | --- |
| Arrive | 0–500ms | Curved waypoint travel; scale ~0.7–1.15 |
| Orbit | 450–650ms | ~150° partial sweep around ~70×50 centre region |
| Converge | 620–760ms | All six to centre; scale → 0.35 |
| Construct | 760–1020ms | Card `0.88 → 1.03 → 1` (~260ms) + 3 backings |
| Settled | after 1020ms | Card static; swarm hidden |

## DOM structure

```html
<div class="butterfly-entry" data-butterfly-entry>
  <div class="butterfly-entry__stage">
    <div class="butterfly-entry__swarm" aria-hidden="true">
      <span class="bf bf--N">wings + body</span> × 6
    </div>
    <article class="butterfly-entry__card" data-bf-card hidden>…</article>
    <p role="status" aria-live="polite"></p>
  </div>
  <button type="button" data-bf-receive>RECEIVE RECORD</button>
  <button type="button" data-bf-dismiss>DISMISS</button>
</div>
```

## Colours

| Token | Hex |
| --- | --- |
| Near-black | `#020912` |
| Deep blue | `#071f3d` |
| Blue | `#176fa8` |
| Bright | `#4dbce8` |
| Pale | `#d9f7ff` |

## Accessibility

- Swarm is `aria-hidden`
- On arrival: polite status `New record received. Specimen 043.`
- Reduced motion: immediate card, no butterflies

## Integration

- Import `demo.css` verbatim
- Call `receiveButterflyRecord` / `dismissButterflyRecord` / `replayButterflyEntry`
- Use `type="button"` (sandbox has no `allow-forms`)
- Dismiss resets immediately — do not reverse the choreography
- No external assets, libraries, or network
