# Shuriken Radial Menu

An abstract four-point glyph opens into four tool sectors at fixed bearings, then folds closed.

## Behaviour

- Closed: hub only.
- Open: CUT / BIND / SEAL / TRACK at 0/90/180/270° on 3.6rem radius (280ms).
- Select: committing a sector updates status to that tool label.
- Reduced motion: sectors open immediately.

## Freeze

- Open: 280ms · settle: 40ms · stagger: 40ms · radius: 3.6rem · angles: 0/90/180/270
- Palette: `#0C1014` / `#D0D6DC` / `#8AA0B4` / `#5A6870` / `#EEF2F4`
