# Erasure Delete (portable recreation spec)

An abstract `RECORD // 028` is deleted by a single bottom-right → top-left diagonal
boundary, not by fading or shrinking. The moving void is the stage background, so all
content behind the boundary is genuinely masked away.

## Visual intent

Void mask sweep → metadata rows clip in spatial order → identity held briefly →
twelve rigid panel fragments shear off the boundary edge. Final state is small static
metadata only.

## Frozen contract

- Angular card: **280 × 170px** with clipped corners
- Boundary: one **3px**, **−18°** line over **620ms**
- Void mask: stage background (`#111a21`) — not opacity fade
- Metadata rows clip as the line reaches them (STATUS → LINKS → VERSION)
- Identity retained until final crossing, then held **60ms**
- Exactly **12** rigid bordered panel fragments (rectangles) — **not glass shards**
- Final: small static `RECORD // 028` / `ERASED` metadata only

## Panel fragments (12 rigid rectangles)

Each fragment is a filled rectangle with `1px` border — no diamond clip-paths, no
triangular shards, no hairline slivers.

| # | Size (w×h) | Notes |
| - | ---------- | ----- |
| a | 18×10 | base panel fill |
| b | 14×8 | mark border |
| c | 20×7 | |
| d | 12×12 | square panel |
| e | 16×6 | muted mark border |
| f | 22×8 | |
| g | 10×14 | tall panel |
| h | 15×9 | mark border |
| i | 11×11 | |
| j | 19×6 | |
| k | 13×10 | |
| l | 17×7 | |

Travel **18–44px** over **220ms**, staggered **25ms** from 250ms.

No explosion, shake, glow cloud, or looping particles.

## API

`window.erasureDelete.erase()` · `.reset()` · `.init()`

## Reduced motion

Immediately remove card and announce `Record 028 erased.`

## Accessibility

Polite status announces active / erased. Fragments decorative.
