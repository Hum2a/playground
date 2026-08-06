# Stage Manager Stack Shift (portable recreation spec)

Layered workspace swap inspired by Stage Manager: foreground BUILD (two windows)
trades places with staged RESEARCH (three mini silhouettes) over 480ms. Z-order
transfers at 52%; one stage marker moves active state. No images, audio, network,
or storage.

## Visual intent

BUILD begins central (360×330); RESEARCH sits in a 92px left rail. SWAP crosses
both groups without cross-fade; marker follows active group.

## DOM structure

```html
<div class="sms" data-stage-manager data-phase="build-foreground">
  <aside class="sms__rail"><!-- staged mini + marker --></aside>
  <div class="sms__workspace">
    <div class="sms__group--build"><!-- 2 windows --></div>
    <div class="sms__group--research"><!-- 3 windows --></div>
  </div>
  <button data-sms-swap>SWAP</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Foreground | `BUILD` (COMPILE · OUTPUT) |
| Staged | `RESEARCH` (3 mini silhouettes) |
| Expanded | `RESEARCH` (NOTES · LINKS · DRAFT) |
| Trigger | `SWAP` |

## Layout

| Region | Size |
| ------ | ---- |
| Foreground workspace | 360 × 330px |
| Stage rail | 92px width |

## Swap contract

| Property | BUILD | RESEARCH |
| -------- | ----- | -------- |
| Scale | 1 → 0.72 | 0.72 → 1 |
| translateX | 0 → −190px | 190px → 0 |
| Duration | 480ms | 480ms |
| Z-order swap | 52% progress | — |

## API

- `resetStageManagerStackShift()`

## Reduced motion

Instant group layout swap; no large travel.

## Accessibility

Status announces active group. Staged groups use `hidden` when inactive.
