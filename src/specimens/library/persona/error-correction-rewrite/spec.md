# Error Correction Rewrite

## Visual intent

Localised validation correction: only the erroneous substring is underlined, marked `WRONG`, struck, extracted, and replaced. Surrounding text stays put. Editorial/collage language — visual specimen only, not a production autofix.

## DOM structure

```
.ecr[data-error-correction]
  label#ecr-label                EMAIL
  .ecr__field[role=group]
    .ecr__stable--pre            humza@
    .ecr__slot
      .ecr__wrong                gmial
      .ecr__right                gmail
      .ecr__underline
      .ecr__strike
      .ecr__badge                WRONG
    .ecr__stable--suf            .com
  .ecr__corrected                CORRECTED
  button.ecr__trigger            CHECK VALUE
  .ecr__status[role=status]
```

## Copy

| Layer | Text |
| --- | --- |
| Label | `EMAIL` |
| Initial | `humza@gmial.com` |
| Error fragment | `gmial` |
| Correction | `gmail` |
| Badge | `WRONG` |
| Success | `CORRECTED` |
| Trigger | `CHECK VALUE` |
| Status | `Correction: gmial replaced with gmail.` |

## Palette / type

| Token | Value |
| --- | --- |
| Ink | `#090909` |
| Red | `#e60012` |
| Paper | `#f5f1e8` |
| Value font | system monospace stack |

## Timing

| Phase | Window | Class | Effect |
| --- | --- | --- | --- |
| Isolate | 0–140ms | `.ecr--isolate` | Red underline L→R under fragment |
| WRONG | ~120ms | `.ecr--wrong-mark` | Badge attacks from lower-right |
| Strike | 220–340ms | `.ecr--strike` | Black strike across fragment only |
| Extract | 300–440ms | `.ecr--extract` | `gmial` exits up/clip |
| Correct | 380–580ms | `.ecr--correct` | `gmail` enters with overshoot |
| Settled | done | `.ecr--settled` | Final email + `CORRECTED` |

## Reduced motion

Immediate `gmail` + static `CORRECTED`. No strikes/travel.

## Accessibility

One status announcement. Decorative underline/strike/badge `aria-hidden`. Fragment `aria-hidden` toggles so AT hears one clean value path.

## Porting

Import `demo.css` verbatim. `runErrorCorrection` / `resetErrorCorrection` / `replayErrorCorrection`. Keep fragment slot sized for 5ch so alignment stays predictable.
