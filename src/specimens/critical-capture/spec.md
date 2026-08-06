# Critical Capture (portable recreation spec)

Exceptional fast-path variant of an uncertain capture: the sequence begins like a
normal capture, then one sharp lock replaces a multi-check uncertainty path and
immediately confirms success. Rebuild from this document, `demo.css`, `demo.js`,
and `contract.json`.

## Visual intent

- Generic archive capture capsule — **no** official Poké Ball artwork
- Normally uncertain operation → exceptional confidence → compressed resolution
- **Exactly one** resolution movement (not three shakes)
- Exactly **four** critical indicator lines (~18px) at peak compression
- Confirm ring expands `100% → 128%` then disappears
- Final state static `VERIFIED`

## Copy

| Role | Text |
| ---- | ---- |
| Entity | `ENTITY // 027` |
| Initial | `VERIFYING` |
| Final | `VERIFIED` |
| Trigger | `CAPTURE` |

## Timing

| Phase | Duration |
| ----- | -------- |
| Target enters container | 220ms |
| Close settle | 80ms |
| Pause | 100ms |
| Single lock `0→14→-5→0` / `1→.94→1.03→1` | 170ms |
| Confirm ring | 160ms |
| Total | ~730ms |

## API

```js
export function runCriticalCapture() { /* enter → one lock → VERIFIED */ }
export function runCriticalCaptureReset() { /* restore idle */ }
```

## Reduced motion

Both repository triggers: immediately show VERIFIED and locked container.

## Porting checklist

1. Keep a single-lock path — never add a three-shake sequence  
2. Preserve four critical rays and the confirm ring  
3. No trademark capture-device art  
4. Honour dual reduced-motion triggers  
