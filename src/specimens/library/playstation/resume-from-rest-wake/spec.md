# Resume-from-Rest Wake

Dimmed dock brightens and restores the remembered focus halo. Distinct from Wake from Rest (black veil lift) and Rest Mode Dim (console luminance down).

## Freeze

| Item | Value |
| ---- | ----- |
| Ref | `SPX-3327` / `PS-021` |
| Asleep | stage `brightness(0.38)` · dashed ghost ring on focus tile · FOCUS MEMORY label |
| Waking | `brightness(0.72)` over `560ms` |
| Awake | `brightness(1)` · solid focus halo · ghost + memory label hide (`280ms`) |
| Story | Focus restore — interface stays visible (not black) |
| Trigger | RESTORE FOCUS |
| Chrome | Unique `.rfw` namespace |

## Behaviour

1. Asleep: dock visible but dim; dashed ghost marks remembered focus.
2. Waking: luminance rises toward 72%.
3. Awake: full luminance; solid blue halo on remembered tile; ghost clears.

## Reduced motion

`.rfw__stage`, `.rfw__halo`, `.rfw__ghost`, and `.rfw__memory` lose transitions under both RM hooks.

## Accessibility

Decorative stage uses `aria-hidden`; phase changes announce via `aria-live="polite"`.
