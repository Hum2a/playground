# Manga Double-Page Spread Open

## Visual intent

Turn an ordinary constrained two-page manga composition into a dramatic full-width double-page spread for milestone / completion UI. Two narrow, cropped halves sit across an exaggerated gutter; on activation they expand until they meet at a hairline spine while a spanning headline resolves.

## Structure

- Stage fills a wide plate (~720×400)
- Flex row: left page · gutter/spine · right page
- Each page holds an oversized panel bleed (cropped until open)
- Shared accent frame halves live on left/right pages and align when the gap collapses
- Overlay headline (kicker + title) sits on the stage centre

## Motion

| Token | Value |
| --- | --- |
| Duration | 680ms |
| Ease | `cubic-bezier(0.2, 0.75, 0.15, 1)` |
| Idle pages | 42% · 16% gap · 42% |
| Open pages | 50% · 1px spine · 50% |
| Spine | 4px → 1px |
| Headline | scale 0.72→1, opacity 0.15→1 |

## Interaction

- **Open spread** — expand to the final double-page
- **Reset** — return to the cropped idle composition
- Live status announces open / closed

## Reduced motion

`prefers-reduced-motion: reduce` and `data-force-reduced-motion="true"` skip the expand and show the complete spread immediately.

## Portability

Plain HTML + CSS + a tiny JS controller. No framework. Colours and timings are CSS custom properties on `.mdps`.
