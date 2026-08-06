# Play/Pause Glyph Morph (portable recreation spec)

One `48×48` control whose line geometry morphs between play and pause states for track `SIGNAL // 04`.

## Contract

| Parameter | Value |
| --------- | ----- |
| Control | `48 × 48px` |
| PLAY → PAUSE | `180ms` |
| PAUSE → PLAY | `160ms` |
| Press compress | `.96` scale |
| Label swap | at 50% morph crossing |

## Reduced motion

Instant glyph state swap; label updates immediately.

## API

- `resetPlayPauseGlyphMorph()`
