# Clone Merge Result

Three clone results **travel inward** by frozen px offsets and **scale-collapse** into one output that inherits their marks.

## Behaviour

- Idle: three clones at offset positions, output unread, status `IDLE`.
- Converging: clones translate to centre over 220ms (travel frozen in contract).
- Merging: clones scale to 0 over 140ms (reabsorption).
- Resolved: output expands to `20` with inherited peak/ring/bars, status `MERGED`.
- Reduced motion: merged output immediately.

## Freeze

- Converge: 220ms · merge: 140ms · expand: 140ms
- Travel px: A(72, 48) · B(−72, 48) · C(0, −52)
- Values: 7 + 4 + 9 = 20
- Palette (clone ash): `#12141A` / `#D8D4E0` / `#7A6B9A` / `#6E6A78` / `#F0EEF4`
