# New Moon Locked State (portable recreation spec)

A non-interactive night-access card. ATTEMPT ACCESS beneath it runs a short
refusal. Rebuild from this document and `contract.json`.

Do **not** reproduce Persona 3 art, logos, fonts, or proprietary assets.

## Visual intent

- Card `280×180`: `NIGHT ACCESS` / `UNAVAILABLE`
- Central new moon `82px`: fill `#111827`, rim `#236B91`, tiny top-right
  crescent highlight — must still read as a circle
- Muted copy: `ACCESS RESTRICTED`
- Small angular status marker (rotated square) — **not** a padlock
- Card itself is non-interactive
- Button beneath: `ATTEMPT ACCESS`
- Colours: void `#09111D`, card `#13263A`, moon `#111827`, rim `#236B91`,
  active cyan `#72D6E8`, text `#C7CDD8`, denied `#C94F58`

## Sequence (busy-guarded, one timer at a time)

| Step | Duration | Effect |
| ---- | -------- | ------ |
| Emphasis | `80ms` | Moon brightens slightly |
| Rim flash | `180ms` | Cyan rim flashes once |
| Recoil | `120ms` | Moon shifts `2px` |
| Denied | `600ms` | Status `ACCESS DENIED` (`#C94F58`) |
| Return | `220ms` | Status back to `UNAVAILABLE` |

Do **not** shake the page, flash rapidly, use a red modal, fullscreen error,
loop, or lock icon. Red is only for the brief denied state.

## Reduced motion

No moon movement, no rim animation. Immediately `ACCESS DENIED`. Keep the
static new moon. Return to `UNAVAILABLE` after the same logical delay
(`600ms + 220ms`). Honour both `@media (prefers-reduced-motion: reduce)`
and `[data-force-reduced-motion="true"]`.

## Accessibility

- Card is not a control; only the button is focusable
- `:focus-visible` ring `2px #72D6E8`
- Status changes go through `aria-live="polite"`
- Moon geometry `aria-hidden`

## Porting

Import `demo.css` and `demo.js` verbatim. Call `attemptAccess()`.
