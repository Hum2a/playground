# Waveform Loading Indicator

## Visual intent

An even, cyan technical waveform keeps moving across a deep blue-black signal field. Its fixed samples make the motion read as a stable system trace rather than random audio. A soft cyan scanline periodically inspects the signal. The artifact evokes Persona 3 Reload's cool tactical interface language without reproducing its UI or assets.

## DOM structure

```
.wli[aria-label="Loading"]
  .wli__label
  .wli__display
    svg.wli__waveform[aria-hidden]
      g.wli__track
        polyline × 2
    .wli__scanline[aria-hidden]
  .wli__readout[aria-hidden]
```

## Copy

| Element | Text |
| --- | --- |
| Label | `LOADING /// SIGNAL ACQUISITION` |
| Readout | `32 SAMPLES · LINK STABLE` |

## Layout and colour contract

- Region: **620 × 300px**; responsive down to the host width.
- Waveform viewport: **440 × 80px**, clipped at both edges.
- Trace cyan: `#64e7ff`; field: `#07131d`.
- One deterministic path contains exactly **32** coordinate samples. A second translated copy follows it by 440px, so translation by -440px loops without a seam.
- The track travels left over **1.4s**, linear, infinite. The scanline crosses over **2.2s**, linear, infinite.

## Reduced motion

Both `prefers-reduced-motion: reduce` and `[data-force-reduced-motion='true']` disable the trace and scanline animations. The original cyan waveform remains fully visible at its initial position.

## Accessibility

The outer region carries `aria-label="Loading"` for the semantic state. The SVG trace, scanline, and technical readout are decorative and hidden from assistive technology.

## Porting to another stack

Import `demo.css` unchanged and keep the inline SVG's two 32-sample polylines adjacent. No JavaScript, dependencies, external fonts, or assets are needed.
