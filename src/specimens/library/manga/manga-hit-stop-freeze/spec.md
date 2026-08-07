# Hit Stop Freeze (portable recreation spec)

Manga/anime-style hit stop: motion freezes at the exact impact pose before
release. The defining feature is the motionless plateau — not a bounce.

## Visual intent

Chunky monochrome action card on warm paper. On commit: wind-up → impact →
**110ms frozen hold with six strokes** → recoil → settle.

## DOM structure

```html
<div class="mhs" data-manga-hit-stop-freeze data-phase="idle">
  <div class="mhs__plate">
    <div class="mhs__strokes"><!-- 6 strokes --></div>
    <button class="mhs__card" data-mhs-card>COMMIT</button>
  </div>
  <button data-mhs-trigger>REPLAY</button>
</div>
```

## Timing contract

| Phase | Duration | Transform |
| ----- | -------- | --------- |
| Wind-up | `120ms` | `scale(0.96)` |
| Impact | `90ms` | `scale(1.08) rotate(-1.2deg)` |
| **Hit stop** | **`110ms` frozen** | **same impact pose, `transition: none`** |
| Recoil | `90ms` | `scale(0.985) rotate(0.4deg)` |
| Settle | `180ms` | `scale(1) rotate(0)` |

Total ≈ `590ms`. Exactly **6** impact strokes during hit stop only.

## Colours

| Token | Value |
| ----- | ----- |
| Ink | `#111111` |
| Paper | `#F4F1E8` |

## Host

Relative `420 × 260px` plate with clear space for six strokes around a centred card.

## Interaction

- `REPLAY` / trigger runs the sequence.
- Ignore additional triggers while `busy` so animations cannot stack.

## Reduced motion

No wind-up, scale slam, rotation, or recoil. Enter completed/static state and
show six strokes for ≈`250ms` with a strong inset border.

## API

- `runMangaHitStopFreeze()`
- `resetMangaHitStopFreeze()`
