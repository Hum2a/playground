import type { Specimen } from '../../types'
import { mangaDiagonalPanelWipe } from '../../library/manga/manga-diagonal-panel-wipe/entry'
import { mangaDirectionalSpeedWipe } from '../../library/manga/manga-directional-speed-wipe/entry'
import { mangaDoublePageSpreadOpen } from '../../library/manga/manga-double-page-spread-open/entry'
import { mangaPageTurn } from '../../library/manga/manga-page-turn/entry'
import { mangaPanelExpandFocus } from '../../library/manga/manga-panel-expand-focus/entry'
import { mangaPanelShatterTransition } from '../../library/manga/manga-panel-shatter-transition/entry'
import { mangaRadialSpeedBurst } from '../../library/manga/manga-radial-speed-burst/entry'

export const shard: Specimen[] = [
  mangaDiagonalPanelWipe,
  mangaDirectionalSpeedWipe,
  mangaDoublePageSpreadOpen,
  mangaPageTurn,
  mangaPanelExpandFocus,
  mangaPanelShatterTransition,
  mangaRadialSpeedBurst,
]
