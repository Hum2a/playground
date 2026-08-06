# Copy Confirmation Morph (portable recreation spec)

Tiny `COPY` control beside token `SPX-042`. On click, overlapping copy
outlines compress, morph into check geometry, label clips to `COPIED`, dwells
900ms, then returns. No clipboard API required.

## Visual intent

Control 72×32px. Compress 90ms → check construct 120ms → dwell 900ms → return
180ms. Rapid clicks during dwell restart dwell without duplicating geometry.

## DOM structure

```html
<div class="ccm" data-copy-confirmation>
  <code>SPX-042</code>
  <button data-ccm-btn>
    <span class="ccm__glyph"><!-- rects + check --></span>
    <span data-ccm-label>COPY</span>
  </button>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Control | 72×32px |
| Compress | 90ms |
| Check morph | 120ms |
| Dwell | 900ms |
| Return | 180ms |
| Labels | COPY → COPIED → COPY |

## Reduced motion

Label/state swap without geometric morph; 900ms dwell retained.

## API

- `resetCopyConfirmationMorph()`

## Accessibility

Button and status use polite live regions.

## Porting

Import `demo.css` verbatim. Freeze timing in `contract.json`.
