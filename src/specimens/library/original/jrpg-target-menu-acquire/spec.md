# jrpg-target-menu-acquire

## Visual intent

Create an original three-target battle acquisition scene. A sharp 54×54px
reticle made from four angular corner brackets locks onto the selected target,
never using a circular or generic crosshair. This studies broad JRPG battle
targeting patterns only and recreates no particular game's HUD or assets.

## DOM structure

Use a labelled `section` with a focusable scene, an assertive heading, a polite
status region, three real target buttons, and one decorative reticle. The
target labels are TARGET A, TARGET B, and TARGET C; the reticle's four corner
elements are hidden from assistive technology.

## Copy

Show `SELECT TARGET` above the scene and the terse keyboard hint below it.
Selection announces `<TARGET> acquired`; Enter announces `<TARGET> confirmed`;
Escape announces `Targeting cancelled`.

## Layout and colour contract

- Render exactly three simple abstract target objects at fixed, bounded scene
  coordinates. Their labels sit 12px below their 54×54px target controls.
- Reticle: 54×54px, four angular L-shaped corners, 3px corner stroke.
- Palette: dark navy `#111827`, silver `#C7CDD8`, crystal cyan `#72D6E8`.
- Selected target object scales to `1.05`; use no gradients, external fonts,
  images, or game-specific iconography.

## Reduced motion

Under `prefers-reduced-motion: reduce` and
`data-force-reduced-motion="true"`, show the same labels and selected target,
but make the acquisition and subsequent reticle changes jump directly to final
coordinates without interpolation.

## Accessibility

All target objects are native buttons. The scene and targets expose
high-contrast focus-visible outlines. Arrow keys cycle the selection in a
deterministic order, Enter confirms it, and Escape cancels targeting. Cyan is
paired with reticle placement, a selected scale change, and a live status
message rather than acting as the sole state signal.

## Porting to another stack

Mount in a relative, overflow-hidden 360×320px minimum host. Import
`demo.css` unchanged and load the vanilla script after the markup. Opening
starts on TARGET A with a 280ms `steps(4, end)` acquisition; moving to another
fixed target takes 240ms with the same mechanical stepping. Do not calculate
random positions or permit the reticle outside the scene bounds.
