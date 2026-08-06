# Collapsing App Bar (portable recreation spec)

360×560 scrolling article with app bar collapsing 152→64px over first 96px scroll.

## Layout contract

| Token | Value |
| ----- | ----- |
| Bar large | 152px |
| Bar small | 64px |
| Title large | 32px |
| Title small | 20px |
| Collapse range | 96px scroll |
| Divider after | 88px scroll |

## API

- `resetCollapsingAppBar()`

## Reduced motion

Geometry updates directly from scroll position.
