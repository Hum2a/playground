# Core Seed Regeneration (portable recreation spec)

Recovery from minimal state: only a tiny canonical core survives, then the full
entity reconstructs around it. Dragon Ball Cell–style regeneration language —
no franchise characters or names in the UI.

Maps catalogue **DB-163 / Cell Regeneration** (`SPX-1128`).

## Initial

Only an **18×18px** angular core with:

- `ID // 09`
- `CHECKSUM // VALID`
- Banner: `CORE SURVIVED`

No full worker shell.

## Phase 1 — verification (140ms)

Four brackets acquire the core; a sweep line crosses it → `CORE VALID`.

## Phase 2 — skeleton (220ms)

Exactly **6** structural lines extend from the core (N/S/E/W + two diagonals).

## Phase 3 — major regions

Exactly **6** regions, clip/expand from connection points (no fade), stagger **45ms**:

1. central  
2. top  
3. left  
4. right  
5. bottom-left  
6. bottom-right  

## Phase 4 — metadata

After shell exists, restore one at a time:

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
