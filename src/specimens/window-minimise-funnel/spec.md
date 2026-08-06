# Window Minimise Funnel (portable recreation spec)

Compress a full window toward a small launcher destination using funnel-like
geometric mapping. Title TERMINAL persists through transition. RESTORE reconstructs
full window.

## Visual intent

Window 380×250. Destination token 52×34. Duration 520ms. Clip-path funnel:
upper corners travel more gradually than lower. Content clipped at 70%; title
compresses into token.

## DOM structure

```html
<div class="wmf" data-window-minimise-funnel data-phase="open">
  <div class="wmf__window" data-wmf-window>TERMINAL</div>
  <div class="wmf__token" data-wmf-token>TERMINAL</div>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Window | `TERMINAL` |
| Token | `TERMINAL` |

## Frozen geometry

| Token | Value |
| ----- | ----- |
| Window | 380 × 250px |
| Token | 52 × 34px |
| Duration | 520ms |

## API

- `minimiseWindow()`
- `restoreWindow()`

## Reduced motion

Immediate compact/full state swap.

## Accessibility

Status uses `aria-live="polite"`. Window body decorative content is `aria-hidden`.
