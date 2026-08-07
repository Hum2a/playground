# Irreversible Threshold (portable recreation spec)

Destructive purge with a fixed COMMIT boundary at 65%. CANCEL works while
REVERSIBLE (0–64%). Crossing 65% retracts four brackets, disables CANCEL, and
accelerates to PURGED. Structure and text — not colour alone — communicate the
boundary. No images, audio, network, or storage.

## Visual intent

Idle → measured climb → hold at 64% → cross COMMIT → irreversible accelerate →
PURGED. Pre-threshold CANCEL genuinely restores idle. Post-threshold CANCEL is
unavailable.

## DOM structure

```html
<div class="irt" data-irreversible-threshold data-phase="idle" data-region="reversible">
  <p>PURGE // CACHE-04</p>
  <p data-irt-pct>0%</p>
  <p data-irt-region>REVERSIBLE</p>
  <div class="irt__rail" role="progressbar">
    <div class="irt__fill"></div>
    <div class="irt__threshold"><!-- COMMIT marker — always present --></div>
  </div>
  <button data-irt-begin>BEGIN PURGE</button>
  <div class="irt__cancel-wrap"><!-- 4 brackets --><button data-irt-cancel>CANCEL</button></div>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| Operation | `PURGE // CACHE-04` |
| Regions | `REVERSIBLE` · `COMMITTED` · `PURGED` · `CANCELLED` |
| Threshold | `COMMIT` at 65% |
| Begin | `BEGIN PURGE` |
| Cancel | `CANCEL` |

## Colours

| Token | Hex |
| ----- | --- |
| Ink | `#12151a` |
| Cream | `#e6e8ec` |
| Muted | `#8b919a` |
| Line | `#2a3038` |
| Fill | `#c8ccd2` |
| Warn | `#c45c48` |

Non-colour cues: fixed COMMIT tick + label, four CANCEL brackets, strike-through
disabled CANCEL, underlined COMMITTED/PURGED text, hatch on committed fill.

## Two unmistakable states

| State | Rail | CANCEL | Region label | Threshold |
| ----- | ---- | ------ | ------------ | --------- |
| **REVERSIBLE** (0–64%) | dashed cream border | dashed wrap + 4 brackets, enabled | `REVERSIBLE` cream | `COMMIT` marker |
| **LOCKED** (≥65%) | solid warn border | struck-through, dashed, disabled | `COMMITTED` warn + underline | `COMMIT // LOCKED` warn |

## Progress ladder (frozen)

`0 → 18 → 34 → 51 → 64 → 65 → 78 → 91 → 100`

| Segment | Timing |
| ------- | ------ |
| 0→18, 18→34, 34→51 | 200ms each |
| 51→64 | 220ms |
| Hold at 64 | 140ms (approach diamond) |
| 64→65 cross | 90ms |
| 65→78 | 120ms |
| 78→91 | 90ms |
| 91→100 | 70ms |
| Rail compress | 100ms · scaleY `1 → .7 → 1` |

## Threshold

- Marker at **65%**, labelled `COMMIT`, present before BEGIN
- At exact crossing: four brackets retract; CANCEL disabled; region → COMMITTED
- Marker becomes part of completed rail structure behind progress

## Cancel

- Available while progress **&lt; 65** and not committed
- Stops timers, returns toward 0, shows CANCELLED
- After 65%: disabled — do not fake cancel

## API

- `runIrreversibleThreshold()`
- `cancelIrreversibleThreshold()`
- `resetIrreversibleThreshold()`
- `replayIrreversibleThreshold()`

## Reduced motion

Cancel semantics preserved (still available before commit). Crossing and
post-threshold completion can snap without animated progress; final PURGED
still announced.

## Accessibility

Polite status announces reversible / irreversible / purged / cancelled.
Progressbar exposes valuetext including region.
