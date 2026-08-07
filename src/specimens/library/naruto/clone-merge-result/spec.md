# Clone Merge Result

Three clone result cards **reabsorb inward** by frozen travel px, scale to zero at the merge point, then the combined output expands to **20**.

## Behaviour

- Idle: clones at corners with values 7 / 4 / 9; output `—`.
- Converging: travel (72,48) / (−72,48) / (0,−28) over 220ms.
- Merging: scale to 0 over 140ms at the merge point.
- Merged: output expands to 20; status `MERGED`.
- Reduced motion: MERGED 20 immediately.

## Freeze

- Travel px: A(72,48) B(−72,48) C(0,−28)
- Converge: 220ms · merge: 140ms · expand: 140ms · sum: 20
- Palette (clone ash): `#12141A` / `#D8D4E0` / `#7A6B9A` / `#6E6A78` / `#F0EEF4`
