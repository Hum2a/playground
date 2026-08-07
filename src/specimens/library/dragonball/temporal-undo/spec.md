# Temporal Undo (portable recreation spec)

Undo/restoration by visibly reversing a prior destructive transformation.
Companion to **Erasure Delete** (`SPX-1119`) — same record geometry and −18°
boundary, opposite travel direction. Independently portable.

Maps catalogue **DB-195 / Whis Rewind** (`SPX-1160`).

## Initial

Empty former card area + static confirmation:

- `RECORD // 028`
- `DELETED`

Control: **UNDO**

## Timeline (~650ms)

`REWIND // SCRUB` label + fill track. Needle travels **NOW → −3** in sync with scrub fill.
Deleted confirmation erases (clip) as rewind begins — inverse of erasure final appearing.

## Reverse erasure (620ms)

Diagonal deletion boundary reappears where erasure ended (top-left / `right: 292px`)
and travels **top-left → bottom-right** (opposite Erasure Delete).

Void plate retracts `right: 150px → −340px`. Behind the boundary the record exists;
ahead remains empty.

## Fragments

Exactly **12** fragments start at the same deterministic scatter offsets as Erasure
Delete and travel back to the reconstruction origin. As each crosses the boundary,
structure is restored — not generic particles.

## Metadata (reverse spatial order)

Erasure destroyed STATUS → LINKS → VERSION → title (BR→TL).  
Rewind restores **title → VERSION → LINKS → STATUS** (TL→BR).

Final values: `LINKS 14`, `VERSION 07`, `STATUS ACTIVE`.

## Final lock

Outer frame closes. Timeline holds at **−3** for **80ms**, then retracts.
`DELETED → ACTIVE`. Copy: **STATE RESTORED**. Announce: `Record 028 restored.`

## API

```js
runTemporalUndo()
resetTemporalUndo()
// also window.temporalUndo.undo / .reset
```

## Reduced motion

Immediately restore the record and show STATE RESTORED.
