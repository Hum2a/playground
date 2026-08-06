# Skip Intro Appear

A simulated 0–3s intro window. The `SKIP INTRO` button fades in shortly after playback starts and stays available only while the intro is skippable — reaching the end of the window, or activating the button, removes it and moves to episode phase.

## Freeze

| Item | Value |
| --- | --- |
| Intro duration | `3000ms` simulated |
| Skip appear delay | `400ms` after intro start |
| Clock tick | every `1000ms` |
| Transition | `180ms ease` opacity + `4px` translateY |
| Trigger | automatic timers; `SKIP INTRO` button; `REPLAY` to restart |

## Behaviour

1. On start (or `REPLAY`): phase is `intro`, clock reads `00:00`, `SKIP INTRO` is hidden and non-interactive (`aria-hidden`, `tabindex="-1"`).
2. At `400ms`, `SKIP INTRO` fades in and becomes focusable.
3. Activating `SKIP INTRO` (any time during `intro` phase) immediately moves to `episode` phase and removes the button.
4. If not skipped, at `3000ms` the intro ends automatically — same episode transition, button removed.

## Reduced motion

The button still appears/disappears on the same schedule — only its opacity/transform transition is removed.

## Accessibility

The button is excluded from the tab order (`tabindex="-1"`, `aria-hidden="true"`) while not skippable, and restored to normal (`tabindex="0"`, `aria-hidden="false"`) only during its live window. A polite live region announces phase and elapsed time.

## Porting to another stack

A single timer chain (appear delay, per-second tick, end-of-window) driving two DOM state toggles; no continuous rAF loop required.
