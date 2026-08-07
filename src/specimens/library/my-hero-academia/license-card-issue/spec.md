# License Card Issue (portable recreation spec)

Blank credential constructs through photo frame, data lines, and VALID seal stamp.
Original study — no franchise assets.

## Copy

| Role | Text |
| ---- | ---- |
| ID | `ID — H-2847` |
| Class | `CLASS — PROVISIONAL` |
| Rank | `RANK — TRAINEE` |
| Seal | `VALID` |
| Issue | `ISSUE` |
| Reset | `RESET` |
| Live blank | `Blank credential slot.` |
| Live construct | `Constructing credential…` |
| Live data | `Printing data fields…` |
| Live seal | `Applying seal…` |
| Live done | `Provisional license issued.` |

## Colours

| Token | Hex |
| ----- | --- |
| Primary | `#38A3FF` |
| Ink | `#101820` |
| Paper | `#F4F7FA` |
| Accent | `#FF4D35` |

## Phases

| Phase | Duration |
| ----- | -------- |
| Photo pop | 320ms |
| Data lines | 400ms (80ms stagger) |
| Seal stamp | 400ms |
| Total | 1120ms |

## Geometry

| Token | Value |
| ----- | ----- |
| Stage max width | 400px |
| Card width | 220px |
| Card clip corner | 12px |
| Photo | 52×62px |
| Seal | 52×52px |
| Seal outer | Octagonal scallop clip |
| Seal ring | 3px inset 4px, circular |
| Seal rest rotation | −6° |

## API

```js
runLicenseCardIssue()
resetLicenseCardIssue()
replayLicenseCardIssue()
```

## Wave B

Credential field strings and VALID seal geometry (octagonal outer + circular ring)
are frozen in contract — not colour-only.

## Reduced motion

Full card appears immediately without staged construction.

## Acceptance

1. Idle: blank card; live announces blank credential slot.
2. ISSUE: photo pops (320ms), data lines slide (400ms staggered).
3. Seal: octagon + ring stamp VALID with overshoot (400ms).
4. Done: ISSUE disabled; RESET shown; live announces issued.
5. RESET returns to idle.
6. `prefers-reduced-motion` or `data-force-reduced-motion="true"` → instant full card.
7. No network; content clipped to host.
