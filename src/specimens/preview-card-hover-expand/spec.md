# Preview Card Hover Expand

A row of three abstract content cards. Hovering or focusing any card previews it in place: the card scales up while its neighbour(s) translate outward to make room, never overlapping.

## Freeze

| Item | Value |
| --- | --- |
| Cards | 3, `118×168px` |
| Expand scale | `1.18`, origin center |
| Neighbour push | `18px` translateX, own scale unchanged |
| Transition | `220ms cubic-bezier(.4,0,.2,1)` |
| Trigger | `mouseenter` / `focus` per card |
| Collapse | `mouseleave` from row / `focusout` past the row |

## Behaviour

1. Idle: three cards sit flush, none expanded.
2. Hover or focus any card: it scales to 1.18 and its label fades in; card(s) before it shift left 18px, card(s) after it shift right 18px.
3. Leaving the row (mouse) or moving focus outside it (keyboard) collapses back to idle.

## Reduced motion

Expand/collapse states still apply — only the transition on transform and label opacity is removed.

## Accessibility

Cards are real `<button>` elements with `aria-expanded`. A live hint line names the previewed title. Hover and focus share the same code path so keyboard users get an identical effect.

## Porting to another stack

Pure CSS transform on sibling elements plus one small JS module that classifies each card as expanded / pushed-left / pushed-right relative to the active index; no measurement or layout thrash required.
