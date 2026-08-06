# Rival Cards Clash (portable recreation spec)

Two rival profile cards slam from opposite sides into a central diagonal
divider, locking in a READY state. Rebuild from this document and `contract.json`.

## Visual intent

- Palette: `#38A3FF` primary, `#101820` ink, `#F4F7FA` paper, `#FF4D35` accent
- Left card ALPHA (blue border) and right card BETA (accent border)
- Central diagonal divider rotates ~18deg
- Primary clash ~660ms; READY overlay settles by ~1310ms total

## Interaction

- Trigger: **Clash** button
- Idle: cards off-screen at sides
- Active: cards meet at center divider
- Settled: READY label over dimmed arena
- Replay: second click resets then reruns

## Reduced motion

Instant settled composition — cards at center, divider visible, READY shown.

## Porting

1. Copy DOM + CSS + JS verbatim.
2. Call `runRivalCardsClash()` or wire the trigger button.
3. Listen for harness `{ type: 'restart' }` → `resetRivalCardsClash()`.
4. No external assets, fonts, or network.
