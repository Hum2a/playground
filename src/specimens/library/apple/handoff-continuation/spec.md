# Handoff Continuation (portable recreation spec)

Transfer `EDIT // REPORT` at `68%` from DESKTOP to TABLET via six bridge segments;
ownership changes at midpoint; TABLET continues to `74%`.

## Contract

| Parameter | Value |
| --------- | ----- |
| Task card | `180×92` compresses to `92×48` |
| Bridge segments | exactly `6` |
| Ownership | A ACTIVE→RELEASED, B WAITING→RECEIVING at midpoint |
| Progress | stays `68%` through transfer |
| Continuation | B advances once to `74%` |

## Reduced motion

Immediately move ownership to B at 68%, then show 74%.

## API

- `resetHandoffContinuation()`
