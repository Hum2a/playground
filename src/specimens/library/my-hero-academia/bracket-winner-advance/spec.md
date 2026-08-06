# Bracket Winner Advance (portable recreation spec)

Winner card travels along tournament connector into next round.

## Palette

`#38A3FF` · `#101820` · `#F4F7FA` · `#FF4D35`

## Winner

`ALPHA` advances from round one to round two slot.

## Timing

Connector draw `420ms`; travel `520ms` at `200ms` delay; total ~`850ms`.

## API

- `window.bracketWinnerAdvance.run(root)`
- `window.bracketWinnerAdvance.reset(root)`
