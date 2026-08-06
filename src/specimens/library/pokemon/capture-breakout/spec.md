# Capture Breakout (portable recreation spec)

Failure counterpart to Capture Shake. An entity enters a generic circular capture
container and begins uncertainty checks; after two complete shakes the third is
interrupted and the entity breaks out. Rebuild from this document, `demo.css`,
`demo.js`, and `contract.json`.

## Visual intent

- Same capture-device family as Capture Shake (generic geometry — no Poké Ball art)
- Attempt accepted → processing → resolution failed → unresolved state restored
- Exactly **two** complete checks; third visibly interrupted (~40%)
- Container compresses then halves separate; **six** short radial lines
- Final state is failure but not destructive; **RETRY** remains available
- No continuous / looping shake

## Copy

| Role | Text |
| ---- | ---- |
| Entity | `ENTITY // UNKNOWN` |
| Processing | `RESOLVING` |
| Final | `ESCAPED` |
| Trigger | `CAPTURE` |

## Timing

| Phase | Duration |
| ----- | -------- |
| Enter / close | 240ms / 160ms |
| Shake 1 + pause | 220ms / 180ms |
| Shake 2 + long pause | 220ms / **280ms** |
| Shake 3 interrupted at ~40% | ~88ms |
| Compress `scale(1, .9)` | 70ms |
| Breakout / escape (~95px up, `.5→1.08→1`) | ~420ms |
| Recover to open idle | ~280ms |

## Breakout geometry

- Upper: `translateY(-18px) rotate(-6deg)`
- Lower: `translateY(18px) rotate(5deg)`
- Exactly six radial gold lines from centre

## API

```js
export function runCaptureBreakout() { /* fail path */ }
export function runCaptureBreakoutRetry() { /* restore idle */ }
```

## Reduced motion

Both repository triggers: target outside open container + `ESCAPED` immediately.

## Porting checklist

1. Keep the two-complete + interrupted-third check structure  
2. Preserve six rays and half separation values  
3. Allow retry; do not destroy the target  
4. Honour dual reduced-motion triggers  
