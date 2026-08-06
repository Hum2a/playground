# Crooked Menu Stack (portable recreation spec)

Persona-adjacent interactive menu where selection physically recomposes the stack:
the active item expands and attacks the foreground while neighbours make room.
Rebuild from this document and `contract.json`.

Do **not** reproduce Persona 5 menus, labels, icons, fonts, or artwork.

## Visual intent

- Five options: PROFILE / PROJECTS / ARCHIVE / LAB / CONTACT
- Idle layout is intentionally irregular (frozen rotations + uneven margins)
- Active item grows (~34px), black face, red misregistered backing, irregular clip-path
- Changing selection moves **multiple** items (neighbours push away)
- DOM order stays PROFILE→CONTACT; only transforms change

## DOM structure

```html
<div class="cms" data-crooked-menu data-selected="0">
  <div class="cms__stack" role="radiogroup" aria-label="Site sections">
    <button type="button" class="cms__item cms__item--0" role="radio"
      aria-checked="true" data-index="0" data-cms-item>
      <span class="cms__backing" aria-hidden="true"></span>
      <span class="cms__face">PROFILE</span>
    </button>
    <!-- PROJECTS, ARCHIVE, LAB, CONTACT … -->
  </div>
</div>
```

## Idle rotations (frozen)

| Item | Idle rotate | Active rotate | Idle margin-top | Idle margin-left |
| ---- | ----------- | ------------- | --------------- | ---------------- |
| PROFILE | `-2deg` | `-5deg` | `0` | `0.35rem` |
| PROJECTS | `2deg` | `5deg` | `0.55rem` | `1.1rem` |
| ARCHIVE | `-1deg` | `-4deg` | `0.4rem` | `0.15rem` |
| LAB | `3deg` | `6deg` | `0.7rem` | `1.35rem` |
| CONTACT | `-2deg` | `-5deg` | `0.5rem` | `0.55rem` |

## Inactive / active geometry

| Property | Inactive | Active |
| -------- | -------- | ------ |
| font-size | `22px` | `34px` |
| font-weight | `900` | `900` |
| padding | `8px 18px` | `14px 30px` |
| width | auto | `122%` |
| face | transparent paper text | black fill, paper text |
| backing | hidden | red, offset `7px 6px` |

Clip-path (frozen):

```
polygon(2% 4%, 96% 0%, 100% 88%, 94% 100%, 3% 97%, 0% 18%)
```

## Colours

| Token | Value |
| ----- | ----- |
| Black | `#090909` |
| Paper | `#f5f1e8` |
| Red | `#e60012` |

## Selection choreography (~320ms)

1. **0–90ms** — outgoing backing contracts; face scales to `.94`
2. **70–210ms** — incoming red backing attacks (+30ms lag); face translates ~16px in
3. **140–280ms** — neighbours shift via `data-selected` (up 10–20px / down 12–20px by proximity)
4. **280–320ms** — 40ms settle correction (no bounce)

Hover preview: inactive face `translateX(4px)` only — full recomposition on selection/focus.

## Keyboard

Radiogroup + radio buttons. Arrow keys / Home / End move selection. Focus ring uses red outline (not colour alone).

## Reduced motion

Immediate state switch. Final irregular layout + active geometry remain. No choreography.

## Accessibility

- Stable DOM order
- `aria-checked` + roving `tabindex`
- Decorative backing `aria-hidden`

## Porting

1. Copy DOM + CSS + JS (or generate from `contract.json`).
2. Call `selectCrookedMenu(index)`; listen for harness `{ type: 'restart' }` → index 0.
3. Keep frozen idle/active transforms and neighbour push table.
4. No React, Tailwind, host tokens, external fonts, or network.
