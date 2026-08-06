# Mission Control Spread (portable recreation spec)

Transform an overlapping macOS-style desktop into a readable workspace overview
while preserving each window's identity and approximate spatial relationship.
Five windows spread with minimum separation; selecting EDITOR restores the
desktop and brings EDITOR to front. No images, audio, network, or storage.

## Visual intent

Overlapping desktop → tiled overview with scaled windows. `SPACE // 01` label
appears after 60% of the spread. No window fades out during transition.

## DOM structure

```html
<div class="mcs" data-mission-control data-phase="desktop">
  <div class="mcs__desktop">
  <!-- 5 windows: EDITOR TERMINAL DOCS CHAT PREVIEW -->
  </div>
  <p class="mcs__space">SPACE // 01</p>
  <button data-mcs-overview>OVERVIEW</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Windows | EDITOR · TERMINAL · DOCS · CHAT · PREVIEW |
| Space label | `SPACE // 01` |
| Trigger | `OVERVIEW` |

## Colours

| Token | Hex |
| ----- | --- |
| Ink | `#0d1118` |
| Panel | `#161c26` |
| Line | `#2a3342` |
| Cream | `#e6eaef` |
| Muted | `#6d7786` |
| Accent | `#5a9fd4` |

## Window geometry

Base window: **200 × 140px**.

### Desktop (overlapping)

| Window | x | y | z |
| ------ | - | - | - |
| EDITOR | 48 | 36 | 3 |
| TERMINAL | 168 | 68 | 1 |
| DOCS | 24 | 112 | 2 |
| CHAT | 210 | 52 | 4 |
| PREVIEW | 108 | 156 | 5 |

### Overview (≥18px separation)

| Window | x | y | scale | z |
| ------ | - | - | ----- | - |
| EDITOR | 22 | 22 | 0.78 | 1 |
| TERMINAL | 196 | 22 | 0.72 | 2 |
| DOCS | 22 | 149 | 0.72 | 3 |
| CHAT | 196 | 149 | 0.72 | 4 |
| PREVIEW | 109 | 276 | 0.78 | 5 |

## Animation

| Phase | Duration | Notes |
| ----- | -------- | ----- |
| Overview spread | 520ms | transform-based; cubic-bezier settle |
| Space label | 60% progress | opacity in |
| Restore | 460ms | EDITOR z → 10 on desktop |

## API

- `resetMissionControlSpread()`

## Reduced motion

Switch directly between desktop and overview arrangements; no travel.

## Accessibility

Overview EDITOR is focusable/selectable. Status region announces phase.
Other windows decorative in overview.
