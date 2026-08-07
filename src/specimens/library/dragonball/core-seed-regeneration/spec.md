# Core Seed Regeneration (portable recreation spec)

Recovery from minimal state: only a tiny canonical core survives, then the full
entity reconstructs outward from that core. Maps catalogue **DB-163** (`SPX-1128`).

## Initial

Only an **18×18px** angular core with:

- `ID // 09`
- `CHECKSUM // VALID`
- Banner: `CORE SURVIVED`

No full worker shell.

## Phase 1 — verification (140ms)

Four brackets acquire the core; a sweep line crosses it → `CORE VALID`.

## Phase 2 — skeleton (220ms)

Exactly **6** structural lines extend **outward from the core** (N/S/E/W + two
diagonals). Cardinal lines **88px**, diagonals **72px**.

## Phase 3 — major regions (frozen order)

Exactly **6** regions, clip/expand from core connection points (no fade), stagger
**45ms**. Order is **frozen — do not reorder**:

1. central (from core center)  
2. top (from bottom edge toward core)  
3. left (from right edge toward core)  
4. right (from left edge toward core)  
5. bottom-left (from top-right toward core)  
6. bottom-right (from top-left toward core)  

Core gem pulses once as regions begin.

## Phase 4 — metadata (frozen order)

After shell exists, restore one at a time (**110ms** interval):

| Key | Value |
| --- | --- |
| ROLE | PROCESSOR |
| QUEUE | 0 |
| REGION | EU-WEST |
| STATUS | HEALTHY |

## Completion

Verification brackets expand **~4px** outward and disappear → `STATE RESTORED`.

## Identity continuity

`ID // 09` / the core gem remain visible or traceable throughout. Rebuilt object
is the same entity as the surviving core (`WORKER // 09`).

## API

```js
runCoreSeedRegeneration()
resetCoreSeedRegeneration()
```

## Reduced motion

Immediately show rebuilt worker (`STATUS HEALTHY`, `STATE RESTORED`).

## Accessibility

Restored identity and status are normal text; polite live region announces phases.
