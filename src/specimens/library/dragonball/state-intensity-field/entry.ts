import type { Specimen } from '../types'
export const stateIntensityField: Specimen={
  id:'state-intensity-field',ref:'SPX-1110',title:'State Intensity Field',
  blurb:'A structural field around ENGINE // 04 communicates four measured load levels through fixed contour, fragment, and radius changes.',
  origin:{project:'Original',surface:'Dragon Ball aura-intensity–inspired magnitude visualisation (abstract)'},
  facets:{kind:'interaction',tech:'tiny-js',scope:'inline',intensity:'graphic'},inspiredBy:{franchise:'dragonball'},tags:['status','magnitude','visualisation'],deps:'none',
  motion:{loops:false,respectsReducedMotion:true,reducedMotionNote:'Immediately shows the static Level 4 field at 95% CRITICAL.'},
  loadPayload:()=>import('./payload').then((m)=>m.default),preview:{width:340,height:360,background:'dark',label:'State intensity field'},
  integration:['Keep the four frozen levels and 300/300/360ms transitions.','Call window.stateIntensityField.increase() / .reset().','Commit metric values only after each structural level is reached.'],
  acceptance:['Exactly four levels start at 20% and end at 95% CRITICAL.','Contour counts are 1/2/3/3; fragment counts are 0/2/4/8.','Field radii are 8/14/22/34px and four ticks appear only beyond the 90% threshold.','Reduced motion immediately renders the static final field.'],
}
