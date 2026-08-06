# Analysis Scribble Reveal (portable recreation spec)

Profile panel receives rapid handwritten-style annotation marks. Rebuild from
this document and `contract.json`.

## Palette

`#38A3FF` · `#101820` · `#F4F7FA` · `#FF4D35`

## Marks

1. Circle around OUTPUT zone
2. Arrow pointing to critical row
3. Underline emphasis
4. Exclamation pop

## Timing

Total sequence ~`780ms`; marks stagger `180ms` / `360ms` / `520ms`.

## API

- `window.analysisScribbleReveal.run(root)`
- `window.analysisScribbleReveal.reset(root)`
