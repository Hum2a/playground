# Match Start Slam (portable recreation spec)

Giant START owns viewport then tears away along frozen diagonal clip halves to reveal match.

## Palette

`#38A3FF` · `#101820` · `#F4F7FA` · `#FF4D35`

## Sequence

1. START overlay slams (`500ms`, scale 3.2→1 with overshoot)
2. Diagonal tear halves exit (`380ms`) along frozen 58%/42% clip seam
3. MATCH LIVE panel at full opacity

## Geometry

- Tear left clip: `polygon(0% 0%, 100% 0%, 58% 100%, 0% 100%)`
- Tear right clip: `polygon(42% 0%, 100% 0%, 100% 100%, 0% 100%)`

## API

- `window.matchStartSlam.run(root)`
- `window.matchStartSlam.reset(root)`
