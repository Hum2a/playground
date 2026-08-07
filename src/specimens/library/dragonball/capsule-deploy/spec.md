# Capsule Deploy (portable recreation spec)

Mirror of capsule-collapse: stamped `API-07` hardware capsule extracts from
`STORAGE // 03`, unseals, emits four decode lines, and constructively rebuilds
a healthy `280 × 180px` service panel.

## Visual intent

Same hardware grammar as collapse — hemispherical caps, centre seam, stamped
band. Deploy reverses the fold: capsule lifts from dock, lid opens, decode lines
radiate, panel expands through `100 × 74px` then full size. Rail ends VACANT.

## DOM structure

```html
<div class="cdp" data-capsule-deploy data-phase="idle">
  <p class="cdp__system">STORAGE // 03 <b>STORED</b></p>
  <div class="cdp__stage">
    <div class="cdp__rail">…dock…</div>
    <div class="cdp__hardware">…capsule shell…</div>
    <section class="cdp__card" data-cdp-card>…decode lines + rows…</section>
  </div>
  <button data-cdp-deploy>DEPLOY</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Stored | `Stored API-07. Status: stored.` |
| Healthy | `Service API-07. Status: healthy. Region London. Latency 24ms. Workers 8.` |
| Rail idle | `STORED` |
| Rail final | `VACANT` |
| Trigger | `DEPLOY` / `RESET` |

## Colours

Shared with capsule-collapse: paper `#e9e5db`, ink `#19242b`, accent `#5d8c87`,
cap `#4a6f6b`, band `#6fa39d`, seam `#3d5c58`.

## Frozen geometry

| Stage | Size (W×H) |
| ----- | ---------- |
| Docked capsule | `88 × 36px` shell in `54 × 34px` bay |
| Expand 1 | `100 × 74px` |
| Expanded | `280 × 180px` |
| Decode lines | 4 × (80px horizontal / 60px vertical arms) |

## Frozen motion

| Phase | Timing | Notes |
| ----- | ------ | ----- |
| Extract | 0–120ms | Capsule lifts 60px; dock slot vacates |
| Unseal | 120–240ms | Lid opens; capsule nudge |
| Decode | 240–390ms | Four lines expand (150ms) |
| Expand 1 | 390–530ms | 100×74 panel; stamp hidden |
| Expand 2 | 530–670ms | Full 280×180 panel |
| Rows | 670–805ms | STATUS/REGION/LATENCY/WORKERS @ 45ms |
| Healthy | 805–925ms | Lock pulse `.98→1.015→1`; rail VACANT |

## API

- `runCapsuleDeploy()` / `resetCapsuleDeploy()` / `replayCapsuleDeploy()`

## Reduced motion

Immediate full healthy service panel; rail VACANT.

## Accessibility

Card `aria-label="Service API-07"`. Polite live region announces deployed status.
