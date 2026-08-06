# Erasure Delete

An abstract `RECORD // 028` is deleted by a single bottom-right → top-left diagonal
boundary, not by fading or shrinking. The moving void is the stage background, so all
content behind the boundary is genuinely masked away.

## Frozen contract

- Angular card: `280 × 170px`
- Boundary: one `3px`, `-18deg` line over `620ms`
- Metadata rows clip in spatial order as the line reaches them.
- Identity is retained until the final crossing, then held for `60ms`.
- Exactly `12` fixed square, diamond, and line fragments travel `18–42px` for `180–260ms`.
- Final: small static `RECORD // 028` / `ERASED` metadata only.

No explosion, shake, glow cloud, or looping particles.

Reduced motion immediately removes the card and announces `Record 028 erased`.

## API

`window.erasureDelete.erase()` · `.reset()`
