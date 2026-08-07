import type { Specimen } from '../../types'
import { mangaDiagonalPanelWipe } from '../../library/manga/manga-diagonal-panel-wipe/entry'
import { mangaDoublePageSpreadOpen } from '../../library/manga/manga-double-page-spread-open/entry'
import { mangaPageTurn } from '../../library/manga/manga-page-turn/entry'
import { mangaPanelExpandFocus } from '../../library/manga/manga-panel-expand-focus/entry'
import { mangaPanelShatterTransition } from '../../library/manga/manga-panel-shatter-transition/entry'

export const shard: Specimen[] = [
  mangaDiagonalPanelWipe,
  mangaDoublePageSpreadOpen,
  mangaPageTurn,
  mangaPanelExpandFocus,
  mangaPanelShatterTransition,
]
