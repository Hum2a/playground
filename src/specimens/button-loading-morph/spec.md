# Button Loading Morph (portable recreation spec)

160×48 "Save changes" button keeps outer dimensions fixed while label fades to a
20px progress arc (900ms), morphs to check, shows "Saved", then resets.

## DOM structure

```html
<button class="blm__btn" data-blm-btn>
  <span class="blm__label">Save changes</span>
  <span class="blm__loader" hidden>…arc…</span>
  <span class="blm__check" hidden></span>
  <span class="blm__saved" hidden>Saved</span>
</button>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Button | `160 × 48px` fixed |
| Label fade | `80ms` |
| Progress arc | `20px`, `900ms` rotation |
| Check morph | `180ms` |
| Saved dwell | `1200ms` before reset |
| Busy | repeated clicks ignored |

## Reduced motion

Static determinate arc fills over 900ms with no rotation.

## API

- `resetButtonLoadingMorph()`

## Accessibility

`aria-live` status; button disabled while busy.
