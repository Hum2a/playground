# Desktop Space Swipe (portable recreation spec)

Two workspaces as adjacent spatial planes. Switching moves the whole workspace
coherently. Space indicator updates after 50% progress.

## Visual intent

Viewport 520×360. SPACE 01: three windows. SPACE 02: two windows.
SPACE 01 x 0→−100%; SPACE 02 x 100%→0 over 460ms.
Outgoing scale 1→.985; incoming .985→1.

## DOM structure

```html
<div class="dss" data-desktop-space-swipe data-space="01">
  <div class="dss__track" data-dss-track>
    <div data-dss-plane="01">…</div>
    <div data-dss-plane="02">…</div>
  </div>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Space 01 windows | `EDITOR`, `TERMINAL`, `PREVIEW` |
| Space 02 windows | `DOCS`, `CHAT` |
| Indicator | `SPACE 01` / `SPACE 02` |

## Frozen geometry

| Token | Value |
| ----- | ----- |
| Viewport | 520 × 360px |
| Transition | 460ms |
| Depth scale | 0.985 |
| Indicator delay | 50% |

## API

- `nextSpace()`
- `previousSpace()`

## Reduced motion

Instantly switch space planes.

## Accessibility

Planes have aria-labels. Indicator and status use `aria-live="polite"`.
