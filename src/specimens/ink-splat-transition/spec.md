# Ink Splat Transition (portable recreation spec)

Playful liquid/ink page transition: irregular purple blobs strike the viewport with
satellite droplets, expand to full coverage for a content swap, then peel away toward
off-centre origins. Rebuild from this document, `demo.css`, `demo.js`, and `contract.json`.
No copyrighted Splatoon artwork, logos, characters, textures, or extracted assets.

## Visual intent

- Playful ink-based coverage language (Splatoon-inspired, original geometry)
- Seven irregular blobs via asymmetric `border-radius` + pseudo-element lobes — not perfect circles
- One lime accent splat (`#b7ef32`); primary purple exactly `#7c28d9`
- Solid purple backing guarantees zero holes at swap time
- Exit peels/shrinks toward different off-centre directions — must not reverse the scale-in entrance
- Overlay is decorative (`aria-hidden`); focus stays on controls
- Motion must read differently from comic-panel wipe (organic splat vs hard panels) and azure-shard (scale impact vs crystalline slide)

## DOM structure

Demo surface owns A/B content. Overlay sits as a sibling above it.

```html
<div class="ink-splat-demo" data-ink-splat-demo>
  <section data-state="a">… ZONE A / INK WELL / SPLAT → …</section>
  <section data-state="b" hidden>… ZONE B / FRESH PAPER / ← RETURN …</section>
</div>

<div class="ink-splat" aria-hidden="true" data-ink-splat>
  <div class="ink-splat__backing"></div>
  <div class="ink-splat__splat ink-splat__splat--N">
    <div class="ink-splat__core"></div>
    <div class="ink-splat__drop ink-splat__drop--a"></div>
    …
  </div>
</div>
```

Host: a relative, `overflow: hidden` frame sized to the transition surface. Idle overlay uses
`pointer-events: none`.

## Colours

| Token | Hex |
| ----- | --- |
| Purple | `#7c28d9` |
| Lime | `#b7ef32` |
| Ink | `#17151d` |
| Paper | `#f7f5ed` |

Flat fills only — no images, canvas, SVG assets, particle libraries, or network.

## Frozen splat layout

| Splat | Colour | Position | Core size | border-radius | Droplets | Role |
| ----- | ------ | -------- | --------- | ------------- | -------- | ---- |
| `--1` | purple | 18% / 22% | 42×38vmin | `63% 37% 54% 46% / 55% 48% 52% 45%` | 4 | impact |
| `--2` | purple | 24% / 72% | 36×40vmin | `42% 58% 48% 52% / 60% 40% 55% 45%` | 3 | impact |
| `--3` | lime | 68% / 48% | 34×32vmin | `55% 45% 62% 38% / 48% 52% 48% 52%` | 5 | impact accent |
| `--4` | purple | 42% / 18% | 78×72vmin | `48% 52% 58% 42% / 55% 45% 52% 48%` | 3 | cover |
| `--5` | purple | 38% / 78% | 72×80vmin | `58% 42% 45% 55% / 48% 52% 58% 42%` | 4 | cover |
| `--6` | purple | 78% / 28% | 70×64vmin | `40% 60% 52% 48% / 58% 42% 48% 52%` | 3 | cover |
| `--7` | purple | 12% / 52% | 68×62vmin | `52% 48% 40% 60% / 45% 55% 50% 50%` | 4 | cover |

Backing: `#7c28d9`, `160vmax`, `border-radius: 58% 42% 63% 37% / 48% 55% 45% 52%`, scales from `.04` → `1` starting at 280ms.

Each core also uses `::before` / `::after` lobes (see `demo.css`) for irregular silhouettes.
Droplet travel distances are frozen as `--dx` / `--dy` custom properties (15–40px range).

## Timing

Enter easing: `cubic-bezier(0.34, 1.4, 0.64, 1)`. Exit easing: `cubic-bezier(0.4, 0, 0.2, 1)`.
Total sequence **1100ms**.

| Phase | Window (ms) | Notes |
| ----- | ----------- | ----- |
| Impact | 0–280 | Splats 1–3 hit; scale `.05` → `1.15` overshoot; droplets radiate |
| Cover | 280–520 | Splats 4–7 + backing expand to full coverage |
| Covered | ~480–520 | Viewport fully obscured; call `onCovered()` at **500ms** |
| Exit | 520–1100 | Peel/shrink toward up-left / up-right / down / left / right / down-left / up |

Drive phases with classes `.ink-splat--active` then `.ink-splat--exit`.

## API

```js
runInkTransition(onCovered)
```

- Busy-guarded; spam-clicks ignored while running
- Invoke content/route swap **only** inside `onCovered`
- Sandbox-safe: no `parent`, storage, or network

## Reduced motion

Under `prefers-reduced-motion: reduce` **or** `data-force-reduced-motion="true"`:

1. Instantly show solid purple backing (`.ink-splat--rm-flash`)
2. Run `onCovered`
3. Clear overlay — no splat travel or expansion

## Accessibility

- Overlay: `aria-hidden="true"`, never focused
- State change is semantic (button → swap `hidden` on sections)
- After swap, focus moves to the newly revealed trigger button

## Porting to another stack

1. Copy `demo.css` verbatim (and `demo.js` or reimplement the tiny API)
2. Mount overlay + content in a relative overflow-clipped host
3. Call `runInkTransition` from your navigation trigger; swap only in `onCovered`
4. Honour both reduced-motion triggers
