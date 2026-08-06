# App-to-Recents Shrink (portable recreation spec)

Active 390×700 app transforms into a centred 300×520 task card over 380ms.
Adjacent task cards appear at ±250px horizontal offset.

## Contract

| Parameter | Value |
| --------- | ----- |
| Transition | 380ms |
| Centre card | 300×520px |
| Radius | 26px |
| Side offset | ±250px |

## Reduced motion

Direct switch to task-card geometry without animated transition.

## API

- `resetAppToRecentsShrink()`

## Porting

Import `demo.css` verbatim.
