# Pixel HP Drain (portable recreation spec)

Retro segmented resource-loss indicator. Unlike Delayed Damage Bar, depletion is
discrete low-resolution blocks — never a smooth width shrink. Rebuild from this
document, `demo.css`, `demo.js`, and `contract.json`.

## Visual intent

- Exactly **20** logical blocks (~10×14px, 2px gap)
- Start **18** filled; remove **11** right → left at **45ms**/block
- Numeric HP counts down alongside (18…7)
- Four-tone Game Boy palette only
- At ≤10 filled: mid tone; at ≤5: darkest active + `LOW` (canonical end is 7 — mid only)
- Impact: bar steps **2px** right then returns before drain
- No width transitions

## Colours (exact)

| Role | Hex |
| ---- | --- |
| Near-black | `#101b16` |
| Dark | `#40513d` |
| Mid | `#8c9c69` |
| Light | `#d8dfb4` |

## Timing

| Phase | Duration |
| ----- | -------- |
| Impact out / back | 45ms + 45ms |
| Per-block remove | 45ms × 11 |

## API

```js
export function runPixelHpDrain() { /* 18 → 7 stepped */ }
export function runPixelHpReset() { /* restore 18/20 */ }
```

## Reduced motion

Both repository triggers: immediately `HP 7 / 20` with seven filled blocks.

## Accessibility

Expose exact HP numerically (`role="meter"` + live text). Blocks are supplementary.

## Porting checklist

1. Keep exactly 20 blocks and stepped class toggles  
2. Preserve palette thresholds at 10 and 5  
3. Do not add width/opacity transitions on blocks  
4. Honour dual reduced-motion triggers  
