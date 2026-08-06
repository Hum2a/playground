# Spring Selection Pill (portable recreation spec)

Four equal segments `DAY` `WEEK` `MONTH` `YEAR` in 336×44 container. One shared
backing inset 3px moves with restrained spring. Long jump ~340ms / 5px overshoot;
adjacent ~240ms / 3px. Rapid retarget from current visual position.

## DOM structure

```html
<div class="ssp" data-spring-selection>
  <div class="ssp__track" role="tablist">
    <span class="ssp__backing" data-ssp-backing></span>
    <button role="tab" data-ssp-seg="day">DAY</button>
    <!-- week, month, year -->
  </div>
</div>
```

## Contract

| Parameter | Value |
| --------- | ----- |
| Container | 336×44px |
| Backing inset | 3px |
| Segments | 4 equal |
| Long jump | 340ms, 5px overshoot |
| Adjacent | 240ms, 3px overshoot |
| Initial | DAY |

## Reduced motion

Backing jumps directly to selected segment.

## API

- `resetSpringSelectionPill()`

## Accessibility

Tablist with `aria-selected`. Status announces selection.

## Porting

Import `demo.css` verbatim.
