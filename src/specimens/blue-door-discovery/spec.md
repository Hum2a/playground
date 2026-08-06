# Blue Door Discovery

## Visual intent

An ordinary archive surface looks complete. A single static pale-blue clue invites
`INSPECT`. A seam grows, door geometry becomes legible only after the seam forms,
then the doorway opens onto secret content that was already behind the surface.
Unlike Velvet Door Transition, the user does not know a door exists at start.

Original CSS geometry only — no Velvet Room / game door artwork.

## DOM structure

```
.bdd[data-blue-door-discovery]
  .bdd__host
    .bdd__secret[aria-hidden]          UNLISTED / SPECIMEN // ??? / ENTER / CLOSE
      .bdd__depth                      3 thin vertical depth lines
    .bdd__surface
      .bdd__face                       ordinary paper surface (+ aperture when open)
        .bdd__face-shift--left|right   ±3px during seam
      .bdd__fx[aria-hidden]
        .bdd__clue                     12px static mark @ 50% / 68%
        .bdd__seam + .bdd__seam-side
        .bdd__doorway > .bdd__door--left|right
        .bdd__discovered               DISCOVERED
  .bdd__status[role=status]
```

## Copy

| Layer | Text |
| --- | --- |
| Surface small | `ARCHIVE STORAGE` |
| Surface large | `NO ADDITIONAL RECORDS` |
| Surface meta | `42 indexed specimens` |
| Trigger | `INSPECT` |
| Secret small | `UNLISTED` |
| Secret large | `SPECIMEN // ???` |
| Secret body | `An undocumented artifact.` |
| Actions | `ENTER` / `CLOSE` |
| Marker | `DISCOVERED` |
| Status | `Hidden specimen discovered.` |

## Palette

| Role | Hex |
| --- | --- |
| Paper | `#e8edf0` |
| Ink | `#17212a` |
| Mute | `#74818c` |
| Void | `#020b18` |
| Deep | `#071d43` |
| Mid | `#163e83` |
| Blue | `#3f83d1` |
| Pale | `#cfe5ff` |

## Geometry (frozen)

| Token | Value |
| --- | --- |
| Clue size | `12px` |
| Clue position | `left: 50%` · `top: 68%` |
| Seam grow | height `12px → 68%`, width `1px → 2px`, both directions from clue |
| Side lines | `±3px` from centre seam |
| Content shift | left `-3px` · right `+3px` |
| Doorway | width `41%` · height `72%` · centred |
| Door travel | `translateX(±55%)` of doorway half-panels |
| Aperture | face `clip-path` hole `29.5%–70.5%` × `14%–86%` |
| Secret start | `scale(.9) translateY(6px)` → `scale(1) translateY(0)` |

## Timing (from INSPECT)

| Phase | Window | Class | Effect |
| --- | --- | --- | --- |
| Clue / seam | 0–180ms | `.bdd--clue` | Clue brightens; vertical line grows |
| Impossible seam | 180–360ms | `.bdd--seam` | Side lines + content shift |
| Door define | 320–500ms | `.bdd--define` | Dark angular door regions appear |
| Opening | 480–820ms | `.bdd--open` | Doors slide; aperture; secret settles |
| Marker | ~735ms | `.bdd--marker` | `DISCOVERED` (~75% open) |
| Settled | ≥820ms | `.bdd--opened` | Door stays open; frame remains |
| Close | ~420ms | `.bdd--closing` | Reverse to clue |

## Reduced motion

Immediate `.bdd--opened` composition + status announcement. No travel. Tiny clue remains for reset idle.

## Accessibility

- `INSPECT` / `ENTER` / `CLOSE` are real buttons
- Secret `aria-hidden` until discovery completes
- Announce once: `Hidden specimen discovered.`
- FX layers decorative (`aria-hidden`)

## Porting

Import `demo.css` verbatim. API: `runBlueDoorDiscover` / `runBlueDoorClose` / `resetBlueDoorDiscovery` / `replayBlueDoorDiscovery`. Harness `{ type: 'restart' }`.
