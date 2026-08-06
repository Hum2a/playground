# Comic Card Selection (portable recreation spec)

Persona-adjacent card grid where the selected card escapes alignment and attacks
the foreground while neighbours recompose around it. Rebuild from this document
and `contract.json`.

Do **not** reproduce Persona 5 art, logos, fonts, or proprietary assets.

## Visual intent

- Three cards: `01 MOTION` / `02 TYPE` / `03 OVERLAYS`
- Default selection: `01`
- Inactive cards sit on a hard black offset (~`4px 5px`) with frozen micro-rotations
- Selected card scales (~`1.14`), lifts (`translateY(-10px)`), grows its index (`32px → 54px`), and gains oversized black backing + red misregister + shards
- Changing selection moves **neighbours** (not only the active card)
- DOM order stays `01 → 02 → 03`; only transforms change

## DOM structure

```html
<div class="ccs" data-comic-card-selection data-selected="0">
  <div class="ccs__grid" role="radiogroup" aria-label="Comic card categories">
    <button type="button" class="ccs__card ccs__card--0" role="radio"
      aria-checked="true" data-index="0" data-ccs-card>
      <span class="ccs__hard" aria-hidden="true"></span>
      <span class="ccs__backing" aria-hidden="true"></span>
      <span class="ccs__misreg" aria-hidden="true"></span>
      <span class="ccs__shard ccs__shard--a" aria-hidden="true"></span>
      <span class="ccs__shard ccs__shard--b" aria-hidden="true"></span>
      <span class="ccs__face">
        <span class="ccs__index">01</span>
        <span class="ccs__label">MOTION</span>
      </span>
    </button>
    <!-- 02 TYPE, 03 OVERLAYS … -->
  </div>
</div>
```

## Idle / selected transforms (frozen)

| Card | Idle rotate | Selected transform | Label rotate (selected) |
| ---- | ----------- | ------------------ | ----------------------- |
| 01 MOTION | `-1deg` | `translateY(-10px) rotate(-3deg) scale(1.14)` | `-1.5deg` |
| 02 TYPE | `1deg` | `translateY(-10px) rotate(2deg) scale(1.14)` | `2deg` |
| 03 OVERLAYS | `-2deg` | `translateY(-10px) rotate(-4deg) scale(1.14)` | `-2deg` |

Base size ≈ `120 × 150px`, gap ≈ `14px`. Index `32px` idle → `54px` selected.

## Neighbour reaction (frozen)

| Selected | Neighbour moves |
| -------- | --------------- |
| `0` (01) | `1` → `translateX(10px)`; `2` → `translateX(12px)` |
| `1` (02) | `0` → `translateX(-10px) rotate(-3deg)`; `2` → `translateX(10px) rotate(0deg)` |
| `2` (03) | `0` → `translateX(-10px)`; `1` → `translateX(-8px)` |

Centre selection adds ≈`−2deg` / `+2deg` to left / right idle rotations.

## Colours

| Token | Value |
| ----- | ----- |
| Black | `#090909` |
| Paper | `#f5f1e8` |
| Red | `#e60012` |

## Selection choreography (~300ms)

1. **0–100ms** — outgoing card contracts (scale ≈`.96`); selected chrome collapses
2. **70–240ms** — incoming card attacks foreground (backing / misreg / face)
3. **100–270ms** — neighbours reposition via `data-selected`
4. **270–300ms** — short settle correction (no bounce)

Hover preview: face `translateY(-2px)` only. Full choreography on selection only.

Z-index: outgoing stays above idle during contract; incoming jumps above at attack start so layers never pop through a neighbour face.

## Keyboard

Radiogroup + radio buttons. Arrow keys / Home / End move selection. Focus ring uses red outline (paired with geometry, not colour alone).

## Reduced motion

Immediate state switch to the final selected composition. Neighbour positions update instantly. No scale/travel choreography.

## Accessibility

- Stable DOM order (`01` → `03`)
- `aria-checked` + roving `tabindex`
- Decorative hard/backing/misreg/shards `aria-hidden`

## Porting

1. Copy DOM + CSS + JS (or generate from `contract.json`).
2. Call `selectComicCard(index)`; listen for harness `{ type: 'restart' }` → index `0`.
3. Keep frozen idle/selected transforms and neighbour push table.
4. No React, Tailwind, host tokens, external fonts, or network.
