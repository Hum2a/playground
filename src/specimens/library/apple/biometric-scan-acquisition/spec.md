# Identity Scan Acquisition (portable recreation spec)

Abstract biometric-style acquisition sequence without Face ID glyphs or facial
imagery. Sixteen nodes acquire across two scan passes; four brackets move inward;
status becomes VERIFIED; OPEN VAULT unlocks.

## Visual intent

Field 180×180 with 16 asymmetric nodes. Scan line traverses twice at 420ms each.
First pass activates 10 nodes; second activates remaining 6. Validation hold 120ms.

## DOM structure

```html
<div class="bsa" data-biometric-scan-acquisition data-phase="idle">
  <div class="bsa__field" data-bsa-field>
    <span data-bsa-node="0">…</span>
  </div>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Initial status | `LOCKED` |
| Scanning | `SCANNING` |
| Verified | `VERIFIED` |
| Action | `OPEN VAULT` |

## Frozen geometry

| Token | Value |
| ----- | ----- |
| Field size | 180 × 180px |
| Node count | 16 |
| Scan passes | 2 × 420ms |
| First pass nodes | 10 |
| Bracket inset | 6px |
| Validation hold | 120ms |

## API

- `startBiometricScan()`
- `openVault()`

## Reduced motion

Immediately show all 16 nodes acquired and VERIFIED.

## Accessibility

Decorative field is `aria-hidden`; status uses `aria-live="polite"`.
OPEN VAULT disabled until verification.
