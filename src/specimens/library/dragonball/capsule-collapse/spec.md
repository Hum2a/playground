# Capsule Collapse (portable recreation spec)

Physical capsule encode: `SERVICE // API-07` structurally folds through two
compression stages, four encoding scan lines seal the shell, and a stamped
hardware capsule docks into `STORAGE // 03` — never opacity-only deletion.

## Visual intent

Technical storage bay on cream paper. A service panel compresses with visible
fold geometry; hemispherical capsule caps, centre seam, and stamped `API-07`
band read as hardware. Final silhouette is a distinct pill docked in bay 03.

## DOM structure

```html
<div class="ccp" data-capsule-collapse data-phase="idle">
  <p class="ccp__system">STORAGE // 03</p>
  <div class="ccp__stage">
    <section class="ccp__card" data-ccp-card>…panel + brackets + encode lines…</section>
    <div class="ccp__hardware">…caps + band + seam + stamp + lid…</div>
    <div class="ccp__rail">…dock slot…</div>
  </div>
  <button data-ccp-pack>PACK</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| System | `STORAGE // 03` |
| Service | `API-07` |
| Ready | `Service API-07 ready to pack.` |
| Stored | `Service API-07 stored.` |
| Trigger | `PACK` / `RESET` |

## Colours

| Token | Hex |
| ----- | --- |
| Paper | `#e9e5db` |
| Ink | `#19242b` |
| Panel | `#f8f5ed` |
| Accent | `#5d8c87` |
| Cap | `#4a6f6b` |
| Band | `#6fa39d` |
| Seam | `#3d5c58` |
| Stamp | `#f2efe6` |

## Frozen geometry

| Stage | Size (W×H) |
| ----- | ---------- |
| Expanded | `280 × 180px` |
| Fold 1 | `100 × 74px` |
| Fold 2 | `56 × 42px` |
| Capsule shell | `88 × 36px` (caps `14px` each end) |
| Dock slot | `54 × 34px` |

## Frozen motion

| Phase | Timing | Notes |
| ----- | ------ | ----- |
| Prepare | 0–120ms | Four brackets inward 8px; row gap 12→4px |
| Fold | 120–340ms | Width 280→100px; REGION drops |
| Stage 1 | 340–470ms | Height 180→74px; LATENCY drops |
| Stage 2 | 470–580ms | 56×42px; WORKERS/footer drop; lid closes |
| Encode | 580–680ms | Exactly four 100ms scan lines |
| Dock | 680–820ms | Capsule docks into bay; STORED |

Metadata clears **REGION → LATENCY → WORKERS**; `API-07` remains on stamp.

## API

- `runCapsuleCollapse()` / `resetCapsuleCollapse()` / `replayCapsuleCollapse()`

## Reduced motion

Immediate docked capsule with `Service API-07 stored.` — static STORED end state.

## Accessibility

Card `aria-label="Service API-07"`. Polite live region announces stored status.
