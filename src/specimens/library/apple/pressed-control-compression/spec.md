# Pressed Control Compression (portable recreation spec)

Primary `RUN BUILD` control 180×52px with secondary card `BUILD // READY`.
Pointer down compresses scale and padding; release inside activates READY→RUNNING.

## Visual intent

Press: scale 1→.965, horizontal padding compress 3px, 70ms. Hold stable. Release
inside: .965→1.015→1 over 80+90ms then RUNNING. Release/cancel outside: return
100ms without activation. Space/Enter keyboard activation.

## DOM structure

```html
<div class="pcc" data-pressed-control>
  <div class="pcc__card">BUILD // READY</div>
  <button class="pcc__btn" data-pcc-btn>RUN BUILD</button>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Control | 180×52px |
| Press scale | .965 |
| Padding compress | 3px |
| Press duration | 70ms |
| Release overshoot | 1.015 |
| Cancel duration | 100ms |

## Reduced motion

No scale; immediate structural pressed boundary.

## API

- `resetPressedControlCompression()`

## Accessibility

Button focus-visible ring. Keyboard Space/Enter. Status announcements.

## Porting

Import `demo.css` verbatim.
