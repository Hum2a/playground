# Discovery Tear-Open (portable recreation spec)

Discovery interaction: a mostly intact paper surface hides a secret beneath a small
torn corner. Activating the corner tears an irregular opening wider until three paper
regions pull outward and the secret is revealed. Rebuild from this document,
`demo.css`, `demo.js`, and `contract.json`. No external assets.

## Visual intent

- Paper (`#f5f1e8`) over black (`#090909`) with red (`#e60012`) peek/accents
- Idle surface almost intact; ~28×28 UR corner missing, red/black peek visible
- Tear grows as an irregular clip-path (8 edge points) — not a circular hole
- Three large flaps remain partially in frame after reveal

## DOM structure

```html
<div class="discovery-tear" data-discovery-tear>
  <div class="discovery-tear__secret" aria-hidden="true">SECRET SPECIMEN / You found it.</div>
  <div class="discovery-tear__cover">
    <div class="discovery-tear__peek" aria-hidden="true"></div>
    <div class="discovery-tear__paper">ARCHIVE // 042 · Nothing unusual here.</div>
    <div class="discovery-tear__flap--a|b|c" aria-hidden="true"></div>
    <button data-discovery-tear-trigger aria-label="Reveal hidden content"></button>
  </div>
</div>
```

## Frozen clip-paths

Idle paper (small UR hole):

`polygon(0% 0%, 88% 0%, 100% 12%, 100% 100%, 0% 100%)`

Grown opening (8 irregular edge points toward centre):

`polygon(0% 0%, 42% 0%, 52% 12%, 38% 24%, 48% 36%, 34% 48%, 55% 58%, 100% 48%, 100% 100%, 0% 100%)`

Flap A / B / C clip-paths and exit transforms are frozen in `contract.json`.

## Timing

| Phase | Window (ms) | Notes |
| ----- | ----------- | ----- |
| Lift | 0–160 | corner tip scale 1.2, rotate −6deg |
| Grow | 160–520 | irregular hole expands from UR |
| Split | 520–760 | three flaps pull outward; residual edges remain |
| Pop | ~700 | SECRET SPECIMEN scale .96→1 |

## API

```js
openDiscoveryTear()
resetDiscoveryTear()
```

Secret stays `aria-hidden` until reveal. Harness `{ type: 'restart' }` resets.

## Reduced motion

Immediately render final torn flaps + available secret — no lift/grow/split travel.

## Accessibility

- Corner is a real button labelled “Reveal hidden content”
- Secret becomes semantically available (`aria-hidden="false"`) on discovery
- Status announced via `aria-live`

## Porting

1. Copy `demo.css` / `demo.js` verbatim
2. Keep underlay in the DOM throughout
3. Honour both reduced-motion triggers
