# Media Card Focus Expand

Focused media card grows from `88×120` to `120×150`, lifts `6px`, and reveals
frozen metadata (genre · hours · Play · Info). Job is metadata reveal on
expand — not neighbour push or activity progress.

## Preview contract

| Parameter | Value |
| --------- | ----- |
| Preview | `480 × 280px`, `overflow: hidden` |
| Cards | `3` |
| Idle size | `88 × 120px` |
| Focus size | `120 × 150px` |
| Focus scale / lift | `1.04` / `6px` |
| Expand travel | `200ms` |
| Meta reveal | `180ms` |

## Interaction

- Focus or click expands one card and shows its metadata line.
- Click again / blur clears focus.

## Reduced motion

Both triggers disable `.mcfe__card` and `.mcfe__meta` transitions.
