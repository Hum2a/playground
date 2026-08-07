# Four-Shape Orbit Loader

Four original primitives (circle, upright cross, square, triangle) orbit a hub on a dashed rail, then settle onto the four vertices of a completion diamond. Distinct from Shape Scatter Transition (source → burst → destination tokens).

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3317` |
| Primitives | circle · cross (+) · square · triangle |
| Orbit duration | `2400ms` linear infinite |
| Settle duration | `400ms` opacity snap into diamond |
| Completion frame | rotated square (diamond) with shapes at N/E/S/W |
| Triggers | COMPLETE / RESET |

## Behaviour

1. Idle: shapes orbit evenly; counter-rotated so glyphs stay upright.
2. COMPLETE stops the orbit, reveals the diamond, and places shapes at its four vertices.
3. RESET clears completion and resumes the orbit loop.

## Reduced motion

Orbit and counter-spin animations removed; COMPLETE shows the settled diamond instantly.
