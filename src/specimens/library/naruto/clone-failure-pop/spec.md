# Clone Failure Pop

One of three parallel workers **pops** mid-run, leaves **ash residue**, then residue **clears** while survivors finish.

## Behaviour

- Idle: three pending workers, status `IDLE`.
- Running: bars fill; at 150ms worker 2 pops (scale burst 160ms).
- Residue: 5 ash dots appear and hold 220ms.
- Clear: residue scales out over 180ms.
- Done: workers 1 & 3 succeeded, worker 2 failed/cleared.
- Reduced motion: final states immediately.

## Freeze

- Fail at: 150ms · pop: 160ms · residue hold: 220ms · clear: 180ms · finish: 320ms
- Residue count: 5 · fail bar: 38%
- Palette (clone ash): `#12141A` / `#D8D4E0` / `#7A6B9A` / `#A85868` / `#6E6A78` / `#F0EEF4`
