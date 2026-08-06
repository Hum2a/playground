# Deletion Guillotine

## Visual intent

Destructive deletion choreography: after deliberate confirmation, a black irregular blade cuts a project card along a diagonal; complementary clipped halves exit opposite directions. Visual demonstration only — no persistent data deletion.

## DOM structure

```
.dg[data-deletion-guillotine]
  article.dg__card[data-dg-card]     semantic card (PROJECT NIGHTFALL)
  .dg__confirm[data-dg-confirm]      CONFIRM DELETE / CANCEL
  .dg__stage[aria-hidden]            decorative cut scene
    .dg__piece--upper / --lower      complementary clip-path copies
    .dg__warn-line
    .dg__blade (+ red backing / ink)
    .dg__deleted                     DELETED
  p.dg__removed                      PROJECT REMOVED
  .dg__status[role=status]
```

## Copy

| Layer | Text |
| --- | --- |
| Title | `PROJECT NIGHTFALL` |
| Meta | `12 artifacts` |
| Action | `DELETE` |
| Confirm | `CONFIRM DELETE` / `CANCEL` |
| Flash | `DELETED` |
| Empty | `PROJECT REMOVED` |
| Status | `Project Nightfall removed.` |

## Palette

| Token | Value |
| --- | --- |
| Ink | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Cut geometry

Blade rotation: **−18deg**, travel upper-right → lower-left.

Complementary clip-path polygons (CSS custom properties):

| Region | Polygon |
| --- | --- |
| Upper / left | `polygon(0% 0%, 100% 0%, 100% 18%, 0% 78%)` |
| Lower / right | `polygon(0% 78%, 100% 18%, 100% 100%, 0% 100%)` |

Red blade backing offset: **8px**.

## Timing (from `confirmDeletion`)

| Phase | Window | Class | Effect |
| --- | --- | --- | --- |
| Anticipate | 0–140ms | `.dg--anticipate` | Card `scaleY` 1 → 0.97; thin red diagonal appears |
| Blade | 140–300ms | `.dg--blade` | Blade crosses (~160ms); split clips applied |
| Separate | 300–540ms | `.dg--separate` | Upper `−75px −28px / −8deg`; lower `80px 32px / 10deg`; blade exits |
| DELETED | 460–760ms | `.dg--deleted-flash` | Label ~300ms |
| Settled | ≥760ms | `.dg--removed` | `PROJECT REMOVED` |

## Reduced motion

Immediate jump to `PROJECT REMOVED` + status announcement. No blade or split.

Triggers: `prefers-reduced-motion: reduce` and `[data-force-reduced-motion="true"]`.

## Accessibility

- Before confirmation: normal card semantics (`article` + `DELETE`).
- Decorative stage / pieces: `aria-hidden`.
- After confirmed deletion: announce `Project Nightfall removed.`
- Deliberate confirm step before the cut.

## Safety

This specimen does **not** delete persistent data. Production integrations must own confirmation, auth, and real state removal separately.

## Porting

Import `demo.css` verbatim. API: `requestDeletion` / `cancelDeletion` / `confirmDeletion` / `resetDeletionGuillotine` / `replayDeletionGuillotine`. Listen for harness `{ type: 'restart' }`.
