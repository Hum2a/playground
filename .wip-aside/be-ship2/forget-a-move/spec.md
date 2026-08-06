# Forget a Move

## Visual intent

Four occupied capability slots (`SCAN` `FILTER` `EXPORT` `CACHE`) with an incoming `SYNC` token. Select one slot (canonical: **CACHE**); four angular corner brackets mark selection. On **REPLACE**, CACHE compresses, exits left while the outline breaks into four segments, the slot stays vacant briefly, then SYNC installs into the same structural position and a horizontal line sweeps the row. Final set: `SCAN` `FILTER` `EXPORT` `SYNC`.

## DOM structure

- Root `[data-forget-move]`
- `role="radiogroup"` of four `role="radio"` slot buttons
- Incoming SYNC token
- Polite announce region + REPLACE / RESET

## Copy

| Role | Text |
| --- | --- |
| Prompt | `REPLACE ONE CAPABILITY` |
| Slots | `SCAN` `FILTER` `EXPORT` `CACHE` |
| Incoming | `SYNC` |
| Confirm | `REPLACE` |
| Announce | `Replace CACHE with SYNC.` |

## Layout and colour contract

`#141a1e` `#1c242a` `#f2efe4` `#e2a03a` `#d95b4e`. Timings: compress 80ms → exit 180ms (label −70px) → vacancy 100ms → install 220ms → sweep 160ms.

## Reduced motion

Selection stays accessible. REPLACE instantly swaps the selected label to SYNC.

## Accessibility

Semantic radiogroup; arrow keys move selection; announce communicates replace intent and result.

## Porting to another stack

Import `demo.css` verbatim. Call `runForgetMove` / `resetForgetMove`. Freeze timings from `contract.json`.
