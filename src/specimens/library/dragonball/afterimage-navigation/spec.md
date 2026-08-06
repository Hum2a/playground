# Afterimage Navigation (portable recreation spec)

Rapid rail navigation: an ACTIVE marker jumps HOME → SEARCH → BUILD → REVIEW →
SHIP so fast that four outline afterimages and path ticks remain as movement
history. Final state is a locked marker at SHIP with static ticks. No images,
audio, network, or storage.

## Visual intent

Current position + recent path. Afterimages lose internal detail (outline only).
Older afterimages use longer lifetimes from leave; trail cleans up after arrival.

## DOM structure

```html
<div class="ain" data-afterimage-nav data-phase="idle" data-at="home">
  <div class="ain__stage">
    <svg><!-- polyline through frozen coords --></svg>
    <!-- 5 destinations + ticks -->
    <div class="ain__ghosts"></div>
    <div class="ain__marker">ACTIVE + 4 corner locks</div>
  </div>
  <button data-ain-jump>JUMP TO SHIP</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Destinations | HOME · SEARCH · BUILD · REVIEW · SHIP |
| Marker | `ACTIVE` |
| Trigger | `JUMP TO SHIP` |
| Status home | `Destination home.` |
| Status ship | `Destination ship.` |

## Colours

| Token | Hex |
| ----- | --- |
| Ink | `#0e1218` |
| Cream | `#e8ecef` |
| Muted | `#6a7380` |
| Line | `#2a3440` |
| Blue | `#5b8fd9` |
| Pale | `#9ec4f0` |

## Frozen destination coordinates

| Id | x | y |
| --- | --- | --- |
| home | 6% | 52% |
| search | 26% | 46% |
| build | 48% | 54% |
| review | 70% | 48% |
| ship | 90% | 52% |

## Marker

- Size **44 × 28px**, angular clip, label `ACTIVE`
- At SHIP: four corner locks appear; fully detailed again

## Segment timings

| Hop | Duration |
| --- | -------- |
| HOME → SEARCH | 90ms |
| SEARCH → BUILD | 70ms |
| BUILD → REVIEW | 65ms |
| REVIEW → SHIP | 80ms |
| Arrival | 305ms |

## Afterimages (exactly 4)

Spawned when leaving a destination. Outline/dashed only — no ACTIVE text.

| Left from | Lifetime |
| --------- | -------- |
| HOME | 420ms |
| SEARCH | 330ms |
| BUILD | 240ms |
| REVIEW | 150ms |

## Ticks

Each traversed destination (HOME–REVIEW) gets one vertical tick that may remain
after afterimages clear.

## API

- `runAfterimageNav()`
- `resetAfterimageNav()`
- `replayAfterimageNav()`

## Reduced motion

Immediately select SHIP with four path ticks; no afterimages or travel.

## Accessibility

Announce only current destination (home / ship). Afterimages and ticks are
decorative.
