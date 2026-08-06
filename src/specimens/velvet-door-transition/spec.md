# Velvet Door Transition (portable recreation spec)

Calm contextual transition: a thin vertical blue seam appears and opens into a
deep-blue alternate space. Inspired by Persona 3 Velvet Room elegance — do not
reproduce the actual Velvet Room door, logo, patterns, or characters. Rebuild from
this document, `demo.css`, `demo.js`, and `contract.json`.

## Visual intent

- Seam → impossible doorway → alternate context
- Destination **already exists** behind the panels (not swapped late)
- Sliding angular panels (slight skew only — no theatrical 3D swing)
- 3–4 slow vertical depth lines; no particles/starfield
- Smooth controlled easing; no bounce or impact

## DOM structure

```html
<div class="velvet-door-demo" data-context="a">
  <div class="velvet-door-demo__depth" aria-hidden="true">
    …depth lines…
    <section data-state="b">PRIVATE COMPENDIUM / Fusion records / RETURN</section>
  </div>
  <div class="velvet-door-demo__surface">
    <section data-state="a">PUBLIC ARCHIVE / 24 available specimens / ENTER</section>
  </div>
  <div class="velvet-door" aria-hidden="true">
    <div class="velvet-door__panel velvet-door__panel--left"></div>
    <div class="velvet-door__panel velvet-door__panel--right"></div>
    <div class="velvet-door__seam"></div>
    <p class="velvet-door__threshold">ENTERING // COMPENDIUM</p>
    <div class="velvet-door__edge"></div>
  </div>
</div>
```

## Colours

| Token | Hex |
| ----- | --- |
| Near-black | `#020711` |
| Velvet navy | `#07153a` |
| Royal blue | `#102c73` |
| Cool blue | `#2855a4` |
| Pale | `#cbdcff` |
| White | `#f5f7ff` |

## Timing (enter ≈900ms)

| Phase | Window |
| ----- | ------ |
| Seam grow (centre → 72% tall, 1→3px) | 0–220ms |
| Panels separate ±52% | 220–720ms |
| Threshold copy | ~520ms |
| Settle + residual edge line | 720–900ms |

RETURN: panels close from outside (~500ms), then seam contracts (~220ms).

Easing: `cubic-bezier(0.4, 0, 0.2, 1)`.

## API

```js
export function runVelvetEnter() { /* A → B */ }
export function runVelvetReturn() { /* B → A */ }
```

## Reduced motion

Both repository triggers: immediate destination / public context.

## Accessibility

Door geometry `aria-hidden`. Only the active context is semantic; focus moves to
ENTER / RETURN accordingly.

## Porting checklist

1. Copy markup, CSS, JS
2. Keep destination mounted behind the door from the start
3. Verify seam-from-centre, calm panel travel, depth scale, RETURN close
4. Verify both RM triggers and 320–768px
