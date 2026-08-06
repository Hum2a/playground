# Target Dossier Reveal

A restricted profile dossier breaks its wax seal and peels a redaction layer away to reveal target intel (Run auto-play or Replay).

## Behaviour

- Idle: dossier redacted behind a seal, status `CLASSIFIED`.
- Active: seal breaks and the redaction layer peels back (~260ms).
- Resolved: intel fully readable with a brightness settle, status `REVEALED`, held until reset/replay.
- Reduced motion: jump straight to the revealed state.

## Freeze

- Peel: 260ms · reveal: 220ms
- Palette: `#101318` / `#E7DDC7` / `#3A9BD9` / `#D94A38` / `#69745A` / `#F4F1E8`
