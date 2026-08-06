# Completion strike (portable recreation spec)

Task-completion interaction: marking an item complete fires a decisive graphic
strike across the task, then the row recomposes into a compact completed state.
Communicates finality without deletion. Rebuild from this document, `demo.css`,
`demo.js`, and `contract.json`. No copyrighted assets.

## Visual intent

- Task remains present after completion (no removal)
- Red irregular strike (−3deg) crosses left→right before layout contracts
- Black secondary strike follows
- Row height ≈ `72px → 48px`; metadata shifts right
- Angular completion mark built from two bars (short, then long) — not Unicode ✓
- `COMPLETE` label snaps on last
- Total ≈720ms; nothing loops

## DOM

```html
<div class="completion-strike" data-completion-strike>
  <div role="checkbox" aria-checked="false" data-cs-row>
    <p>BUILD PREVIEW</p>
    <p>SPX // 042</p>
    <span class="strike--red" aria-hidden="true"></span>
    <span class="strike--ink" aria-hidden="true"></span>
    <span class="mark" aria-hidden="true"><!-- two bars --></span>
    <span class="badge">COMPLETE</span>
  </div>
  <button data-cs-complete>MARK COMPLETE</button>
  <button data-cs-undo hidden>UNDO</button>
  <p role="status" aria-live="polite"></p>
</div>
```

## Colours

| Token | Hex |
| --- | --- |
| Black | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Timing

| Phase | Window |
| --- | --- |
| Title compress (`scaleX(0.98)`) | 0–140ms |
| Red strike | 100–260ms |
| Black strike | 220–360ms |
| Row contract | 300–520ms |
| Check construct (short → long bar) | 420–620ms |
| `COMPLETE` snap | 560–720ms |

Strike rotation: `-3deg`. Easing: `cubic-bezier(0.55, 0, 0.85, 0.35)`.

## API

```js
export function runCompletionStrike()
export function resetCompletionStrike()
```

Undo restores idle instantly (no theatrical un-complete).

## Reduced motion

Immediately render compact completed state. No strikes or bar construction.

## Acceptance notes

Announce `Build Preview completed.` Decorative strikes stay `aria-hidden`.
Frozen geometry lives in `contract.json`.
