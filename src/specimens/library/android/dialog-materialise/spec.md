# Dialog Materialise (portable recreation spec)

Host settings screen with 304×220 confirmation dialog. Scrim reaches 0.32 over
180ms; dialog scales from 0.92 with transform origin at trigger centre.

## DOM structure

```html
<div class="dlg" data-phase="closed">
  <button data-dlg-open>Delete account</button>
  <div class="dlg__scrim" hidden></div>
  <div class="dlg__dialog" role="dialog" hidden>…</div>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Dialog | `304 × 220px` |
| Scrim | `opacity 0.32`, `180ms` |
| Dialog enter | `scale 0.92→1`, `240ms` |
| Origin | CSS vars from trigger centre |
| Confirm | `700ms` working → success → close |

## Reduced motion

Dialog at final scale; opacity-only ≤100ms.

## API

- `resetDialogMaterialise()`

## Accessibility

Focus trap in dialog; Escape/scrim cancel; focus returns to trigger.
