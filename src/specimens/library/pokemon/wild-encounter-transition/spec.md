# Wild Encounter Transition (portable recreation spec)

Abrupt encounter interruption: the current interface exists, a single short
disturbance hits, seven horizontal bands travel in alternating directions, a
central high-contrast plate grows beneath, an abstract CSS entity arrives, then
the plate expands until the destination fully replaces State A. No crossfade.
No canvas, WebGL, images, audio, network, or storage.

## Visual intent

Route scan → single jolt → opposing band sweep → encounter seam → entity →
destination takeover. Anticipation is short; takeover dominates. Original
geometry — not a recreation of any specific Pokémon game transition.

## DOM structure

```html
<div class="we" data-wild-encounter data-phase="idle" data-surface="a">
  <div class="we__host">
    <section class="we__plate">…entity + SIGNAL DETECTED / UNKNOWN ENTITY…</section>
    <div class="we__route">ROUTE // 04 · 3 records</div>
    <div class="we__bands"><!-- 7 odd/even bands with duplicated State A --></div>
  </div>
  <button data-we-trigger>ENCOUNTER</button>
  <button data-we-replay>REPLAY</button>
</div>
```

## Copy

| Role | Text |
| ---- | ---- |
| State A | `ROUTE // 04` / `Scanning local records...` + REC-A1 / REC-B7 / REC-C3 |
| State B | `SIGNAL DETECTED` / `UNKNOWN ENTITY` |
| Trigger | `ENCOUNTER` |
| Replay | `REPLAY` |
| Status A | `Route 04. Scanning local records.` |
| Status B | `Unknown entity. Signal detected.` |

## Colours

| Token | Hex |
| ----- | --- |
| Cream | `#f4f1df` |
| Ink | `#17211b` |
| Mid | `#3f7252` |
| Bright | `#86c46c` |
| Pale | `#d8f29a` |

## Disturbance (once)

- Duration **120ms**
- `translateX`: **0 → -5px → 4px → 0**
- Exactly once — never continuous shake

## Bands

- Exactly **7** horizontal bands
- Odd (1-indexed / `--i` even): left → right (`translateX(110%)`)
- Even: right → left (`translateX(-110%)`)
- Duration **~280ms**, stagger **18ms**
- Each band clips a full-height duplicate of State A

## Encounter seam / plate

- Origin: vertical centre
- Height **4px → 38%** over **~180ms** via clipped height (not opacity)
- High-contrast ink plate reveals underneath departing bands

## Entity

- Abstract CSS silhouette: horns, head polygon, body trapezoid, diamond core, base ellipse
- Scale **0.72 → 1.08 → 1** over **~240ms**
- No sprites or creature artwork

## Destination takeover

- Plate height **38% → 100%** over **~320ms** (clipped expansion)
- Metadata locks: `UNKNOWN ENTITY` / `SIGNAL DETECTED`
- Primary transition is clipped movement — not a crossfade

## Frozen motion (~720ms)

| Moment | Timing | Notes |
| ------ | ------ | ----- |
| Disturbance | 0–120ms | Single jolt |
| Sweep start | 100ms | Bands + seam begin |
| Band travel | 100–~488ms | 280ms + stagger |
| Seam grow | 100–280ms | 4px → 38% |
| Entity | 160–400ms | Scale pop |
| Takeover | 400–720ms | 38% → 100% |
| Settle | 720ms | Static destination; no loop |

## API

- `runWildEncounter()` — disturb → sweep → takeover → destination
- `resetWildEncounter()` — return to Route 04
- `replayWildEncounter()` — reset then encounter

## Reduced motion

Skip disturbance and travelling bands. Immediately replace State A with the
final encounter composition (entity + destination copy). Static final state
remains understandable.

## Accessibility

Transition motion is decorative. Destination copy is normal readable text.
Polite live status announces initial and final states only — not intermediate
animation phases. Plate / bands / entity carry `aria-hidden` while decorative.
