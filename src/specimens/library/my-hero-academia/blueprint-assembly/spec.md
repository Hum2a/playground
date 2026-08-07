# Blueprint Assembly

## Visual intent

Gadget diagram constructs from four exploded components at frozen positions into a finished CAPTURE RIG device; dashed blueprint rules frame the stage; LOCKED stamp settles on assembly.

## Frozen exploded positions

| Part | Position |
| --- | --- |
| A | `8% / 6%` top-left |
| B | `10% / 8%` top-right |
| C | `12% / 10%` bottom-left |
| D | `10% / 6%` bottom-right |

## Timing

| Phase | Start | Effect |
| --- | --- | --- |
| Assemble | 0ms | Parts converge (660ms) |
| Device | 560ms | CAPTURE RIG scales in |
| Stamp | 680ms | LOCKED stamp (220ms) |
| Settled | 1310ms | Final state |

## API

- `runBlueprintAssembly()`
- `resetBlueprintAssembly()`
- `replayBlueprintAssembly()`

Wave C: exploded positions, blueprint rules, and settle stamp frozen in contract.
