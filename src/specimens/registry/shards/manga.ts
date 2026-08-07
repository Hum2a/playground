import type { Specimen } from '../../types'
import { mangaBlackImpactFrame } from '../../library/manga/manga-black-impact-frame/entry'
import { mangaDiagonalPanelWipe } from '../../library/manga/manga-diagonal-panel-wipe/entry'
import { mangaDirectionalSpeedWipe } from '../../library/manga/manga-directional-speed-wipe/entry'
import { mangaDoublePageSpreadOpen } from '../../library/manga/manga-double-page-spread-open/entry'
import { mangaHitStopFreeze } from '../../library/manga/manga-hit-stop-freeze/entry'
import { mangaPageTurn } from '../../library/manga/manga-page-turn/entry'
import { mangaPanelExpandFocus } from '../../library/manga/manga-panel-expand-focus/entry'
import { mangaPanelShatterTransition } from '../../library/manga/manga-panel-shatter-transition/entry'
import { mangaRadialSpeedBurst } from '../../library/manga/manga-radial-speed-burst/entry'

export const shard: Specimen[] = [
  mangaBlackImpactFrame,
  mangaDiagonalPanelWipe,
  mangaDirectionalSpeedWipe,
  mangaDoublePageSpreadOpen,
  mangaHitStopFreeze,
  mangaPageTurn,
  mangaPanelExpandFocus,
  mangaPanelShatterTransition,
  mangaRadialSpeedBurst,
]
