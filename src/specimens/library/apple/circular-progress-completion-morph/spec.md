# Circular Progress Completion Morph (portable recreation spec)

Deterministic circular progress for `EXPORT` reaches listed percentages, holds at
100%, then reuses ring stroke geometry to construct an angular completion mark.
No unrelated success icon crossfade or particle burst.

## Visual intent

72×72 ring with 5px stroke. Progress steps 0, 18, 37, 61, 84, 100 over 1100ms.
At 100%, hold 100ms. Ring retracts from 360° to 110° retained arc while two
internal segments construct a check. Label clips `EXPORT → COMPLETE`.

## DOM structure

```html
<div class="cpcm" data-circular-progress>
  <p class="cpcm__operation" data-cpcm-label>EXPORT</p>
  <svg><!-- track + progress ring + check segments --></svg>
  <button data-cpcm-run>START EXPORT</button>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Ring | 72×72px, stroke 5px |
| Progress values | 0, 18, 37, 61, 84, 100 |
| Total progression | 1100ms |
| Hold at 100% | 100ms |
| Morph duration | 240ms |
| Retained arc | 110° |
| Particle burst | none |

## Reduced motion

Immediately show final completion geometry and `COMPLETE` label.

## API

- `runCircularProgressMorph()`
- `resetCircularProgressMorph()`

## Accessibility

Status region announces progress and completion. Ring decorative inside
`aria-hidden` host where appropriate.

## Porting

Import `demo.css` verbatim. Freeze step values and morph arc in `contract.json`.
