# Choice execution slash (portable recreation spec)

Confirmation animation for committing a selection: a diagonal graphic slash cuts
across the option group, unselected alternatives are split and pushed away, and the
chosen option survives and expands into a confirmed state. Rebuild from this document,
`demo.css`, `demo.js`, and `contract.json`. No copyrighted assets.

## Visual intent

- Pre-confirm: restrained selection only (small red backing, `translateX(4px)`)
- Confirm: giant red irregular slash (~130% × 20px, ~18deg) sweeps UL → LR in ~180ms
- Unselected options split into two shards that move ~20–45px perpendicular to the slash
- Selected option stays intact (slash passes behind / is interrupted around it)
- Selected expands to centre with black panel + red backing offset `8px 7px` + `SELECTED` tag
- Total ~620ms; nothing loops

## DOM

```html
<div class="choice-slash-demo">
  <p>DELIVERY SPEED</p>
  <div role="radiogroup">
    <button role="radio" data-choice="standard">STANDARD</button>
    <button role="radio" data-choice="express" class="is-selected">EXPRESS</button>
    <button role="radio" data-choice="overnight">OVERNIGHT</button>
  </div>
  <div data-choice-slash-stage aria-hidden="true"></div>
  <div data-choice-slash-final hidden>… EXPRESS / SELECTED …</div>
  <button data-choice-slash-confirm>CONFIRM</button>
  <button data-choice-slash-reset hidden>RESET</button>
  <p role="status" aria-live="polite">…</p>
</div>
```

Decorative shards and slash are `aria-hidden`. Alternatives stay in the accessibility tree until logical confirmation completes.

## Colours

| Token | Hex |
| --- | --- |
| Black | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Timing

| Phase | Window |
| --- | --- |
| Slash travel | 0–180ms |
| Rejection shards | from ~60ms |
| Selected attack | 220–480ms |
| Complete | ~620ms |

Easing: `cubic-bezier(0.55, 0, 0.85, 0.35)`.

Slash: `width: 130%`, `height: 20px`, `rotate: 18deg`,
`clip-path: polygon(0% 18%, 100% 0%, 100% 82%, 0% 100%)`.

## API

```js
export function selectChoice(choice) // 'standard' | 'express' | 'overnight'
export function runChoiceSlash()
export function resetChoiceSlash()
```

- Selection alone does not run the slash
- Busy lock during execution
- `resetChoiceSlash()` restores three options with no leftover shards

## Reduced motion

Immediately show final confirmed state for the current selection. No slash or shard flight.

## Acceptance notes

Keyboard radios + Confirm remain usable. Document frozen geometry in `contract.json`.
