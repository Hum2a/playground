# Party Join Handoff

A party invite card hands off into a live voice session with roster, LIVE badge, and speaking meters. Social silhouette — not a system modal or shape scatter.

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3402` / `PS-096` |
| Handoff | `350ms` invite out / session in |
| Session | LIVE badge · roster · voice meters on speaking member |
| Trigger | JOIN PARTY / LEAVE |

## Acceptance

1. JOIN hides the invite and reveals Voice Session with LIVE chip.
2. Speaking member shows animated voice meters; others stay quiet.
3. LEAVE restores the invite card; status announces session state.

## Reduced motion

Handoff snaps; voice meter keyframes freeze at mid height under both RM hooks.

## Porting

Portable specimen CSS — no site chrome tokens. Isolation comes from the sandboxed iframe.
