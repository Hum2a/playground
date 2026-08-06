import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'
export const instantFullRecovery:Specimen={id:'instant-full-recovery',ref:'SPX-1135',title:'Instant Full Recovery',blurb:'A restore resource is consumed and NODE // 05 discontinuously snaps from critical 24% health to full HEALTHY.',origin:{project:'Original',surface:'Instant system recovery'},facets:{kind:'interaction',tech:'tiny-js',scope:'inline',intensity:'subtle'},tags:['recovery','instant','restore'],deps:'none',motion:{loops:false,respectsReducedMotion:true,reducedMotionNote:'Immediately consumes resource and displays healthy.'},files:{html,css,js},spec,contract,preview:{width:320,height:310,background:'card',scaffold:'<div style="padding:1rem">{{specimen}}</div>',label:'Instant node recovery'},integration:['Keep four missing regions and direct 60ms snap; never interpolate health.','Preserve six lines and accessible consumption text.'],acceptance:['24% health starts with four gaps and one resource','Resource reaches node then snaps directly to 100% healthy','Exactly six feedback lines; reduced motion finalizes instantly']}
