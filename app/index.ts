
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


let i = 0;
function updateProps() {
   
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

spyro.x = 100;


