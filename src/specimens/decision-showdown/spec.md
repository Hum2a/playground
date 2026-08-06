# Decision Showdown

## Visual intent

Two-choice confirmation where **YES** and **NO** behave like opposing graphic forces. Changing selection expands one side aggressively while the other retreats. Communicates competition, not a polite button row. Persona 5–inspired compositional language only — no game dialogs, fonts, or assets.

Demo only: nothing is deleted or persisted.

## DOM structure

```
.dsd[data-decision-showdown][data-choice=yes|no]
  p#dsd-question                 DELETE THIS DRAFT?
  .dsd__arena[role=radiogroup]
    button.dsd__choice--yes[role=radio]
      .dsd__backing[aria-hidden]
      .dsd__panel[aria-hidden]
      .dsd__label
    span.dsd__slash[aria-hidden]
    button.dsd__choice--no[role=radio]
      …
  p.dsd__hint
  .dsd__outcome                  DELETED / CANCELLED
  .dsd__status[role=status]
```

## Copy

| Layer | Text |
| --- | --- |
| Question | `DELETE THIS DRAFT?` |
| Choices | `YES` / `NO` (active YES renders `YES!`) |
| Default | `NO` |
| Outcomes | `DELETED` · `CANCELLED` |

## Palette

| Token | Value |
| --- | --- |
| Ink | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |

## Layout contract

| Dim | Value |
| --- | --- |
| Host | ~420×260, down to 320px |
| Active width | `--dsd-active: 62%` (68% ≤360px) |
| Inactive width | `--dsd-inactive: 23%` (22% ≤360px) |
| YES backing offset | `8px 6px` |
| NO backing offset | `-7px 5px` |
| YES panel clip | `polygon(0% 6%, 92% 0%, 100% 78%, 96% 100%, 4% 94%, 0% 22%)` |
| NO panel clip | `polygon(8% 0%, 100% 10%, 100% 88%, 94% 100%, 0% 92%, 4% 18%)` |
| Inactive retreat | YES←12px / NO→20px · scale `.82` |
| Inactive label | ~22px |
| Active label | ~38px |

Silhouettes are independently frozen — never `scaleX(-1)` mirrors.

## Selection timing (~340ms)

| Phase | Window | Effect |
| --- | --- | --- |
| Contract | 0–90ms | Active label scale → `.9` |
| Attack | ~70–230ms | Incoming panel attacks (40–56px) · `.85 → 1.05 → 1` |
| Slash | 180–300ms | Red diagonal flash |
| Settle | 300–340ms | 1px correction |

## Confirmation

| Choice | Choreography | Outcome |
| --- | --- | --- |
| YES | Cover expand ~260ms | `DELETED` (demo) |
| NO | Right sweep ~220ms | `CANCELLED` |

## Interaction

- Click inactive → select; click active → confirm
- ← / → change selection; Enter/Space confirm; Escape → NO
- Hover inactive: ~3px lift (does not recompose territory)
- Restart / `resetDecisionShowdown` restores default NO

## Reduced motion

Instant YES/NO compositions; instant DELETED/CANCELLED. No sweep/scale.

## Accessibility

- Question labels the radiogroup
- `aria-checked` + status text expose selection (not size alone)
- Decorative panels/backings/slash `aria-hidden`
- Visible `:focus-visible` ring in red

## Porting

Import `demo.css` verbatim. Use `selectDecision`, `confirmDecision`, `resetDecisionShowdown` / `replayDecisionShowdown`. Honour both reduced-motion triggers.
