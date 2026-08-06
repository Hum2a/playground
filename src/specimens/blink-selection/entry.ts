import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'
export const blinkSelection: Specimen={id:'blink-selection',ref: 'SPX-1210',title:'Blink Selection',blurb:'A 145ms instant selection shift: 02 brackets collapse, disappear for 30ms, and reconstruct at 08 without crossing the grid.',origin:{project:'Original',surface:'Blink-speed keyboard and menu selection'},facets:{kind:'interaction',tech:'tiny-js',scope:'inline',intensity:'subtle'},tags:['selection','navigation','instant'],deps:'none',motion:{loops:false,respectsReducedMotion:true,reducedMotionNote:'Switches selection immediately.'},files:{html,css,js},spec,contract,preview:{width:320,height:290,background:'card',scaffold:'<div style="padding:1rem">{{specimen}}</div>',label:'Instant selection shift'},integration:['Keep the 45ms departure, 30ms gap, and 70ms arrival.','Use selected semantics; do not slide indicator between options.'],acceptance:['Exactly nine options; 02 starts and 08 ends selected','Four brackets vanish then reconstruct after 30ms gap','Reduced motion switches instantly'],}
