# Droplet Notification (portable recreation spec)

Compact Persona 3–inspired **notification indicator**: a single geometric cyan
droplet appears, falls into a dark surface, and two thin rings mark impact as
the badge becomes active. Event-driven. Never auto-loops. Not a toast.

```
NEW EVENT → NOTIFICATION → UPDATED STATE
```

## Visual intent

- 320×180 dark plate; muted badge in the upper-right
- Graphic teardrop silhouette (18×24, `#72D6E8`) — not photographic water
- Impact at the badge / surface contact; subtle two-ring ripple
- After impact: stronger border, cyan diamond marker, optional `NEW` label

## DOM structure

```
.dn[data-droplet-notification][data-phase]
  .dn__kicker
  .dn__surface[aria-label]
    .dn__stage[aria-hidden]
      .dn__drop
      .dn__ripple--1 / --2
      .dn__static          RM marker
    .dn__badge
    .dn__copy
  button[data-dn-trigger]  TRIGGER
  .dn__status[role=status]
```

## Copy

| Role | Text |
| --- | --- |
| Kicker | `SIGNAL // INBOX` |
| Idle copy | `Inbox quiet.` |
| Active copy | `New event recorded.` |
| Badge | `1` · `NEW` |
| Trigger | `TRIGGER` |
| Status idle | `No new notification.` |
| Status active | `New notification.` |

## Frozen motion

| Phase | Duration |
| --- | --- |
| Appear | `80ms` |
| Fall | `260ms` |
| Impact pause | `40ms` |
| Ripple | `320ms` |
| Badge activation | `180ms` (overlaps ripple) |
| Total | ≈ `600–700ms` |

| Token | Value |
| --- | --- |
| Droplet | `18 × 24px` `#72D6E8` |
| Rings | `2` × `2px` from impact |
| Busy | ignore TRIGGER while running |

Phases: `idle` → `appear` → `fall` → `impact` → `ripple` → `active`

## API

- `window.dropletNotification.trigger(root)`
- `window.dropletNotification.reset(root)`
- `window.dropletNotification.init(scope?)`

## Reduced motion

Immediate `active` badge + `NEW` + static cyan ring. No fall. No expanding rings.

## Accessibility

Droplet/ripples `aria-hidden`. Surface has `aria-label`. State also in visible
copy + `NEW` + polite live region. `:focus-visible` on TRIGGER.

## Porting

1. Copy `demo.html`, `demo.css`, `demo.js` verbatim.
2. Keep 18×24 droplet, 80/260/40/320/180 timings, exactly two 2px rings.
3. Clip ripples to the 320×180 surface. Honour both RM triggers.
