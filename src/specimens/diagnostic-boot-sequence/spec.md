# Diagnostic boot sequence (portable recreation spec)

Monochrome machine boot / initialization overlay in a diegetic system-interface
aesthetic. Clinical line sequencing — not a typewriter terminal cliché. Rebuild from
this document, `demo.css`, `demo.js`, and `contract.json`. No copyrighted assets,
logos, or game fonts.

## Visual intent

- Paper ground `#d8d3bd`, ink `#34342f`, muted `#777467`
- System monospace only
- Six diagnostic lines appear abruptly (~180ms apart)
- Small square blinking cursor during boot
- Thin horizontal progress bar advancing in discrete sixths
- After `SYSTEM READY`: ~80ms inversion flash, then reveal host content
- Optional CSS-only low-opacity horizontal line texture

## DOM structure

```html
<div class="diag-boot-demo">
  <div class="diag-boot" data-diag-boot>
    <div class="diag-boot__texture" aria-hidden="true"></div>
    <div class="diag-boot__panel">
      <p class="diag-boot__header">DIAGNOSTIC SEQUENCE</p>
      <ol class="diag-boot__log" aria-hidden="true" data-diag-boot-log></ol>
      <span class="diag-boot__cursor" aria-hidden="true"></span>
      <div class="diag-boot__progress" aria-hidden="true">
        <span class="diag-boot__progress-fill"></span>
      </div>
    </div>
  </div>
  <p role="status" aria-live="polite">Loading</p>
  <section class="diag-boot-demo__host" hidden>… INTERFACE ONLINE …</section>
</div>
```

Decorative log is `aria-hidden`. One polite status string for SR: `Loading` → `System ready`.

## Diagnostic lines (order frozen)

1. `INITIALIZING INTERFACE...`
2. `CHECKING DISPLAY MODULE... OK`
3. `CHECKING INPUT MODULE... OK`
4. `LOADING LOCAL DATA... OK`
5. `VERIFYING COMPONENTS... OK` ← optional hold point
6. `SYSTEM READY`

## Timing

| Token | Value |
| --- | --- |
| Line interval | `180ms` |
| Inversion flash | `80ms` |
| Post-ready pause before flash | `~220ms` |
| Demo hold after line 5 | `~300ms` (no `waitUntil`) |
| Default total | `~1500ms` |

Progress: discrete steps `0/6 … 6/6` tied to visible lines — not continuous.

## API

```js
export function runDiagnosticBoot(options) { /* … */ }
// options?: { waitUntil?: () => Promise<void> }
```

- After line 5 (`VERIFYING COMPONENTS... OK`), if `waitUntil` is provided, **await** it while remaining on that step (cursor may still blink). Host supplies the promise — **no network inside the specimen**.
- Demo calls `runDiagnosticBoot()` with no `waitUntil` so boot always completes (never infinite).
- Guard re-entrancy with a `busy` flag.

## Reduced motion

Honour both `@media (prefers-reduced-motion: reduce)` and `[data-force-reduced-motion="true"]`:

- All lines + full progress immediately
- No cursor blink, no inversion flash
- Reveal host and set status to System ready

## Accessibility

- Do not announce each diagnostic line
- Single `role="status"` / `aria-live="polite"` for loading → ready
- Overlay log remains decorative (`aria-hidden`)

## Porting checklist

1. Copy markup, CSS tokens, and `runDiagnosticBoot`
2. Pass `{ waitUntil: () => appReady }` when the host must finish loading before `SYSTEM READY`
3. Verify discrete progress, six lines, `SYSTEM READY` last, RM path, no fetch
