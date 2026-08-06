# Dark Hour Conversion Loader (portable recreation spec)

Determinate loading: progress is the percentage of the host converted into a
Dark Hour alternate state by a travelling vertical boundary. At 100% the UI
holds, then a pale horizontal line resolves back to a normal completed surface.
No spinner. No indefinite loop. No Persona assets.

## Palette

| Layer | Tokens |
| ----- | ------ |
| Normal | `#edf1f4` / `#18212b` |
| Converted | `#030b14` / `#071c32` / `#0d4d73` / `#2d9bd3` / `#d7f5ff` |
| Boundary | `#49bce3` (2px) + two short streaks |

## Progress mapping

`--dhcl-p: N%` → converted layer `clip-path: inset(0 calc(100% - N%) 0 0)`.

Numeric readout uses the **same** rounded `N` (`00%`…`100%`). Demo sweep: **3000ms**.

Inspect points: 0 · 10 · 25 · 50 · 75 · 90 · 100 via `setDarkHourConversionProgress(n)`.

## Converted structural diffs (not colour-only)

1. Left spectral vertical rule  
2. Angular clipped chips + angled metric rows  
3. Corner glyph block  

## Boundary

- Travels L→R with progress (not an independent loop)
- Exactly **two** anomaly streaks, static relative to the edge (`28%` / `68%` down)

## Completion

1. Reach 100% → hold **180ms** fully converted  
2. Pale horizontal resolve line **~320ms**  
3. Normal layer shows **INDEX COMPLETE**; announce `Archive indexing complete.`

## API

```js
startDarkHourConversionLoad()
resetDarkHourConversionLoad()
setDarkHourConversionProgress(50)
```

## Reduced motion

No travelling boundary. Jump to completed state after a short hold.

## A11y

`role="progressbar"` with `aria-valuenow` matching the boundary. Do not live-announce every percent — only completion.
