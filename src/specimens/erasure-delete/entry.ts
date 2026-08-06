import type { Specimen } from '../types'
export const erasureDelete: Specimen = {
  id:'erasure-delete',ref:'SPX-1119',title:'Erasure Delete',
  blurb:'A fixed diagonal void crosses an angular record from bottom-right to top-left, clipping its metadata in spatial order until only an erased confirmation remains.',
  origin:{project:'Original',surface:'Dragon Ball destruction–inspired destructive deletion (abstract)'},
  facets:{kind:'interaction',tech:'tiny-js',scope:'inline',intensity:'graphic'},
  inspiredBy:{franchise:'dragonball'},tags:['delete','destruction','erasure'],deps:'none',
  motion:{loops:false,respectsReducedMotion:true,reducedMotionNote:'Immediately removes the record card and announces Record 028 erased.'},
  loadPayload:()=>import('./payload').then((m)=>m.default),
  preview:{width:340,height:360,background:'dark',label:'Erasure delete'},
  integration:['Keep the -18deg bottom-right→top-left boundary and 620ms duration fixed.','Call window.erasureDelete.erase() / .reset().','Do not replace the void mask with a fade or scale animation.'],
  acceptance:['One 3px diagonal boundary genuinely masks card content as it crosses.','Exactly 12 deterministic fragments travel 18–42px away.','Rows clip according to boundary position; identity remains for final 60ms.','Final state is only static RECORD // 028 / ERASED text; reduced motion is immediate.'],
}
