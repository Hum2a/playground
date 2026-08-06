# Download Queue Advance

When the active queue item completes, its status hands off to the next waiting item without resetting the queue panel.

## Behaviour

- Exactly three queue rows; only one active at a time
- Completing row one activates row two, then row three
- Completed rows keep their done state during handoff
- Replay resets queue to row one active
- Reduced motion completes all rows immediately on Run
- Live status announces each handoff in text

## Palette

- Blue: #2E90FF
- Ink: #0B0F14
- Chalk: #F4F6F8
- Sky: #7EB6FF
