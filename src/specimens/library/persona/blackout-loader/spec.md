# Blackout Loader

## Visual intent

Irregular black polygons progressively consume a host surface until it is fully covered. Content swaps only under full blackout. A minimal `LOADING` indicator holds during the wait; a red slash telegraphs completion; the veil splits diagonally to reveal updated content. Not a spinner, skeleton, or fade-to-black.

## DOM structure

```
.bol[data-blackout-loader]
  .bol__surface[aria-busy]
    .bol__eyebrow|title|count
    button.bol__trigger
  .bol__veil[aria-hidden]
    .bol__poly--1…4
    .bol__loading
    .bol__slash
  .bol__status[role=status]
```

## Copy

| State | Text |
| --- | --- |
| Initial count | `24 specimens available` |
| Destination | `30 specimens available` |
| Trigger | `REFRESH INDEX` |
| Loading | `LOADING` + `ARCHIVE // REFRESH` |
| Complete status | `Archive index updated. 30 specimens available.` |

## Palette

| Token | Value |
| --- | --- |
| Ink | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Consumption (~520ms)

| Poly | Window | Origin | Role |
| --- | --- | --- | --- |
| 1 | 0–300ms | left | Large wedge (~45%+) |
| 2 | 90–360ms | upper-right | Slab |
| 3 | 180–440ms | lower-right | Wedge |
| 4 | 300–520ms | centre | Closes remaining window |

Around 420–500ms a narrow irregular aperture remains, then poly 4 closes it. No opacity fade of host content.

## Coverage → load

At **520ms**: full black; swap count to 30; show loading chrome.

Dots loop **600ms** (paper marks). Static under reduced motion.

## Warn + reveal

| Beat | When |
| --- | --- |
| Red slash | ~1650ms (150ms before reveal), scaleX 20%→100% |
| Reveal start | 1800ms |
| Exit | ~420ms — polys 1–2 UL, 3–4 LR |
| Settled | ~2220ms |

## Reduced motion

Immediate static blackout + `LOADING…` (no looping dots). After 1800ms, immediate destination state.

## Accessibility

`aria-busy` on surface while running. One status at start and one on complete — do not chatter decorative LOADING.

## Host

`position: relative; overflow: hidden`. Overlay covers the host.

## Porting

Import `demo.css` verbatim. `runBlackoutLoader` / `resetBlackoutLoader` / `replayBlackoutLoader`.
