
'use strict';
import document from 'document';
//import { dumpProperties, inspectObject } from "./devTools";
import { createPolygon, Polygon, Spyrogon } from './polygon-widget/polygon-widget';



let poly0 = createPolygon(0, document.getElementById('poly0'),150, 12, 4) as Polygon
let poly1 = createPolygon(0, document.getElementById('poly1')) as Polygon;
let poly2 = createPolygon(0, document.getElementById('poly2')) as Polygon;
let spyro = createPolygon(1, document.getElementById('spyro')) as Spyrogon;


//TODO 1 add mode / el as member to support this way to create an object ?
//would that work at all?
// let classicObject: Polygon = {
//
//     el: document.getElementById('id'),
//     radius: 100,
//     points: 12,
//     strokeWidth: 4,
// };


// poly0.lines.forEach(el => {
//     el.style.fill = 'magenta';
// })
//poly0.strokeWidth = 10;
// poly1.radius = 120;
// poly1.points = 4
// poly2.points = 12;
// poly2.lines.forEach(el => {
//     el.style.fill = 'magenta';
// });
// for (let i = 0; i < poly2.lines.length; i += 2){
//     poly2.lines[i].style.fill = 'limegreen';
//         
// 
// }
// 
// 
// dumpProperties('spyro', spyro,1)
// 
// poly0.style.fill = "limegreen"
// console.log(poly0.style.fill)
// //poly0.style.fill = 'limegreen'
// console.log(poly0.style.fill) 
// poly1.strokeWidth = 4
// spyro.radius = 50;
// spyro.x = 0;
// spyro.y = 0;
// console.log('poly0.x from index.ts: '+poly0.x)
// console.log(poly2.x)// 0 häh???
// spyro.rotate.angle = 0;
// 
// poly2.radius = 80;
// //(dumpProperties('poly0',poly0))
// 
// poly2.style.opacity = 1;

let i = 0;
let counter = 0;
function updateProps() {
    counter++;
    console.warn(`updateProps() runs the ${counter}. time.`)
    i %= 9;
 
    //console.log(`i: ${i}`)
    spyro.points = 3 + (i)
    spyro.next = 1 + i// not implemented in Polygon
    //console.log(`next: ${spyro.next}`)
    spyro.strokeWidth = 2 + i/2;
    poly1.scale.y = 1+(i)/20;
    poly1.scale.x = 1+(i)/-30;
    spyro.radius = 50 +5*i;
    spyro.lines.forEach(el => {
        el.style.fill = i % 2 == 0 ? 'magenta' : 'orange';
    });
    poly0.rotate.angle = 15*i;
    //spyro.style.fill = 'limegreen'
    //console.log(`sT fill: ${spyro.style.fill}`)
    i++;
};
//TODO with this updating, recalc() gets called 4 times per interval
// can I define the caller?
// I think scale, fill and rotate DON'T recalc inside Polygon,
// so points/next/strokeWidth/radius do.
// => better to use scale instead of radius?
// can I measure the differnt footprints?


//to stop animation and logging
const delay = 1;
const limit = 20;
let a = 1;

const limitedInterval = setInterval(() => {
    updateProps()
    if (a > limit) {
        clearInterval(limitedInterval);
        console.log('-------------------');
        console.warn('Interval cleared!');
    };
    a++;
}, delay * 1000);


