import type { Specimen } from '../types'
export const sevenPartPrerequisiteCollection: Specimen = {
  id:'seven-part-prerequisite-collection',ref:'SPX-1070',title:'Seven-Part Prerequisite Collection',
  blurb:'Six fixed release requirements form an asymmetric constellation; APPROVAL docks as the seventh, then the complete set connects and unlocks publishing.',
  origin:{project:'Original',surface:'Dragon Ball collection-completion–inspired prerequisite unlock'},
  facets:{kind:'interaction',tech:'tiny-js',scope:'inline',intensity:'graphic'},
  inspiredBy:{franchise:'dragonball'},tags:['collection','prerequisite','completion','unlock'],deps:'none',
  motion:{loops:false,respectsReducedMotion:true,reducedMotionNote:'Immediately presents seven connected requirements and PUBLISH READY.'},
  loadPayload:()=>import('./payload').then((m)=>m.default),
  preview:{width:360,height:390,background:'dark',label:'Seven part prerequisite collection'},
  integration:['Keep seven token coordinates and connection paths fixed.','Call window.sevenPartPrerequisiteCollection.receive() / .reset().','Keep the 140ms post-dock hold before resonance.'],
  acceptance:['Exactly seven visible labelled requirements; APPROVAL begins missing at 6/7.','APPROVAL enters over 280ms then progress becomes 7/7.','After a 140ms hold exactly seven lines connect tokens to the shared point.','PUBLISH unlocks only after the completion structure forms; final state is static.'],
}
