# Liquid Button Fill

## Intent
An original, dark-blue liquid feedback treatment for a 260×76px `EXECUTE` button. The dedicated liquid layer rises from the bottom while its 12px cyan surface drifts deterministically.

## Contract
Fill on hover or keyboard focus over 520ms with `cubic-bezier(.2, .85, .25, 1)`; drain in 420ms. The waterline uses a subtle fixed waveform and 1.8s active-only drift. Preserve the frozen colours and 2px geometry in `contract.json`.

## Access and reduced motion
The native button owns the accessible name and a white focus-visible outline. Liquid markup is decorative. Both reduced-motion triggers remove transitions and water drift while displaying the active fill statically.
