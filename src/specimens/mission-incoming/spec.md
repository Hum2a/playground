# Mission Incoming (portable recreation spec)

Mission dispatch card enters as a high-energy alert — slides in from the right
with diagonal speed lines and an ALERT badge. Rebuild from this document,
`demo.css`, `demo.js`, and `contract.json`. No character likenesses or assets.

## Visual intent

- Idle dispatch channel with empty stage
- Mission card enters from right with overshoot settle
- Speed lines flash during entry
- Settled card shows MISSION ref, ALERT badge, and body copy

## Palette

| Token | Value |
| --- | --- |
| Primary | `#38A3FF` |
| Ink | `#101820` |
| Paper | `#F4F7FA` |
| Accent | `#FF4D35` |

## Motion

Primary enter: `420ms`. Total sequence: `1070ms` (enter + settle hold).

## Reduced motion

Show the settled mission card immediately. No slide, speed lines, or overshoot.

## Behaviour (tiny JS)

- `runMissionIncoming` / `replayMissionIncoming` / `resetMissionIncoming`
- Dispatch and Replay buttons; harness `{ type: 'restart' }`
