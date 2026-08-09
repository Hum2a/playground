# Cracked Disabled State (portable recreation spec)

Persona 3–inspired restricted-system feedback. `ACCESS MODULE` is a real disabled
button. Pressing its surrounding demonstration frame produces a small blue crack
and `ACCESS REJECTED`; it never changes availability or implies access succeeded.

## DOM structure

```html
<section class="cracked-disabled" data-cracked-disabled-state>
  <p class="cracked-disabled__eyebrow">ACCESS // 03</p>
  <h2 class="cracked-disabled__title">RESTRICTED SYSTEM</h2>
  <div class="cracked-disabled__rejection" data-rejection-demo>
    <button class="cracked-disabled__module" type="button" disabled>
      ACCESS MODULE
    </button>
    <svg class="cracked-disabled__fracture" aria-hidden="true">
      <!-- exactly five path elements -->
    </svg>
    <p class="cracked-disabled__notice" aria-hidden="true">ACCESS REJECTED</p>
  </div>
</section>
```

## Interaction contract

- The module uses native `disabled` semantics. Do not replace it with
  `aria-disabled`, remove `disabled`, or attach an activation handler.
- The wrapper is a visual rejection demo. Its `:active` state previews the
  response without making the unavailable control interactive.
- Application code may set `data-rejected="true"` on the wrapper after its own
  access gate rejects a request.

## Visual and motion contract

- Dark navy panel, muted unavailable text, and a single pale blue fracture.
- The fracture SVG has **exactly five** `<path>` elements; all are decorative.
- Each path draws once over `180ms` with an 85ms final stagger.
- `ACCESS REJECTED` appears after the final path; nothing loops or shakes.

## Reduced motion

Honor both `@media (prefers-reduced-motion: reduce)` and
`[data-force-reduced-motion="true"]`. When rejected, immediately reveal all five
paths and the notice with no draw animation.

## Accessibility

The disabled native button exposes its unavailable status through
`aria-describedby`. The fracture and notice are decorative and hidden from
assistive technology; unavailable state is communicated through text, not colour.
