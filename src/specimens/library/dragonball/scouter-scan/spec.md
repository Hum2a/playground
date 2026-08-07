# Scouter Scan (portable recreation spec)

Diagnostic inspection: unidentified abstract target → bracket search → lock →
one left→right sweep → deterministic metric settle → EXTREME classification →
stable report. Original software scanner language — not a franchise scouter HUD.

## Visual intent

Fluorescent optical instrumentation palette. Angular brackets acquire a
centre-right CSS target (diamond + blocks + node). Exactly one scan sweep;
no looping pulse after settle.

## DOM structure

```html
<div class="scouter-scan" data-scouter-scan data-phase="idle">
  <p class="scouter-scan__system">NODE // 07</p>
  <div class="scouter-scan__plate">
    <div class="scouter-scan__stage">
      <div class="scouter-scan__target">…geometry + internals + beam…</div>
      <div class="scouter-scan__brackets">…tl tr bl br…</div>
      <div class="scouter-scan__ticks">…t r b l…</div>
      <span class="scouter-scan__crosshair"></span>
    </div>
    <dl class="scouter-scan__report">TARGET / OUTPUT / LATENCY / LOAD / CLASS</dl>
  </div>
  <div class="scouter-scan__controls">
    <button data-ss-scan>SCAN</button>
    <button data-ss-reset>RESET</button>
  </div>
  <p role="status" aria-live="polite" data-ss-status>…</p>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| System | `NODE // 07` |
| Initial metrics | `UNRESOLVED` / `----` / `UNKNOWN` |
| Final | `NODE 07` · `8,471` · `24ms` · `82%` · `EXTREME` |
| Trigger | `SCAN` |

## Colours

| Token | Hex |
| ----- | --- |
| Background | `#151c1c` |
| Foreground | `#edf0df` |
| Mid | `#a7c950` |
| Bright | `#d9e86c` |
| Alert | `#e26850` |

## Frozen motion

| Phase | Timing | Notes |
| ----- | ------ | ----- |
| Search | 0–320ms | Deterministic bracket offsets then converge |
| Lock | 320–420ms | Snap to 8px outside; 4 ticks; crosshair 140ms |
| Sweep | 420–940ms | 2px beam L→R; internals clip-reveal; metric steps |
| Classify | ~940–1080ms | CLASS clips to EXTREME; bar 0→100% in 140ms |
| Confirm | ~1080ms | Brackets +3px inward; diamond pulse once |

## Metric sequences (deterministic)

- OUTPUT: `0031` → … → `8,471`
- LATENCY: `--` → … → `24` (shown as `24ms`)
- LOAD: `--` → … → `82` (shown as `82%`)

## API

- `runScouterScan()` / `resetScouterScan()` / `replayScouterScan()`

## Reduced motion

Immediate locked brackets, fully revealed internals, final metrics, EXTREME.

## Accessibility

Visible text metrics (colour is never the only CLASS signal — UNKNOWN vs EXTREME text swap). Polite live region announces only the final report sentence. Both buttons expose `:focus-visible` rings in mid fluorescent (`#a7c950`).
