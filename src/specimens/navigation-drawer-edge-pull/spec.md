# Navigation Drawer Edge Pull (portable recreation spec)

Left-edge gesture navigation drawer with scrim, app shift, and moving selected-state pill.
No images, audio, network, or storage.

## Visual intent

390×700 app scaffold with 304px drawer. Closed acquisition only in first 24px edge zone.
Drawer tracks pointer; app shifts 24px; scrim reaches 0.32 opacity.

## DOM structure

```html
<div class="ndep" data-navigation-drawer>
  <div class="ndep__stage">
    <div class="ndep__scrim"></div>
    <div class="ndep__app">…</div>
    <nav class="ndep__drawer">…</nav>
  </div>
</div>
```

## Layout contract

| Token | Value |
| ----- | ----- |
| Stage | 390 × 700px |
| Drawer width | 304px |
| Edge zone | 24px |
| Open threshold | 46% progress |
| Velocity threshold | 0.5 px/ms |
| App shift | 24px |
| Scrim max | 0.32 |

## API

- `resetNavigationDrawerEdgePull()`

## Reduced motion

Direct drag preserved; release snaps instantly.

## Accessibility

Status region announces open/closed. Escape closes drawer and returns focus to menu button.
