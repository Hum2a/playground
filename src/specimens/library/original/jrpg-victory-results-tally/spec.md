# jrpg-victory-results-tally

## Visual intent
Original post-operation result panel: activate COMPLETE to reveal five software-operation rows, then a decisive CLEAR. It uses no game assets or proprietary UI.

## DOM structure
One activation button, a 520px maximum results panel, five labelled rows, and a polite status region.

## Contract
Rows reveal every 80ms. Values resolve over 450ms to EXPERIENCE 1240, REWARD 850, ITEMS 06, TIME 03:42, and SCORE 98. CLEAR follows after 180ms. Use navy `#111827`, parchment `#E9E3D2`, gold `#E5BE62`, and cyan `#72D6E8`; panel rules are 2px.

## Reduced motion and access
Under either reduced-motion trigger, render populated final rows and CLEAR immediately. COMPLETE is a native keyboard-focusable button with a visible focus outline.
