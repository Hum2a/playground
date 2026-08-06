# Interactive Back Swipe (portable recreation spec)

Gesture-driven navigation: the current detail surface follows a horizontal drag while
the previous list surface is progressively revealed underneath. Release position and
velocity determine commit or cancel. No images, audio, network, or storage.

## Visual intent

Spatial continuity between PROJECT // ORBIT (current) and PROJECTS (previous). Depth
via translate, scale, and opacity on the underlay — not cross-fade alone.

## DOM structure

```html
<div class="ibs" data-interactive-back-swipe data-ibs-view="orbit">
  <div class="ibs__stage" data-ibs-stage>
  <div class="ibs__previous">PROJECTS list</div>
  <div class="ibs__current">PROJECT // ORBIT</div>
  <div class="ibs__edge"></div> <!-- 28px -->
  <div class="ibs__hint">chevron + PROJECTS</div>
  <span class="ibs__tick"></span> <!-- 2px at 42% -->
  </div>
  <button data-ibs-replay>REPLAY</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Previous | `PROJECTS` |
| Current | `PROJECT // ORBIT` |
| Back label | `PROJECTS` |
| Replay | `REPLAY` |

## Layout contract

| Token | Value |
| ----- | ----- |
| Preview | ~420 × 560px |
| Edge zone | 28px left |
| Previous at rest | `translateX(-28%)` `scale(.98)` opacity `.72` |
| Commit threshold | 42% width |
| Velocity commit | >0.62 px/ms rightward |
| Commit settle | 260ms spring-like |
| Cancel settle | 220ms |
| Threshold tick | 2px at 42% |

## API

- `resetInteractiveBackSwipe()`
- `replayInteractiveBackSwipe()`

## Reduced motion

Keep gesture and thresholds. Remove parallax scale on previous. Immediate switch on
committed release.

## Accessibility

Status region announces view changes. Decorative layers `aria-hidden`.
