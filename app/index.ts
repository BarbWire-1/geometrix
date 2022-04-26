
'use strict';
import document from 'document';
import { dumpProperties, inspectObject } from "./devTools";
import { createPolygon, Polygon, Spyrogon } from './classPolygon';



let poly0 = createPolygon(0, document.getElementById('poly'),120, 12, 10) as Polygon
let poly1 = createPolygon(0, document.getElementById('poly1')) as Polygon;
let poly2 = createPolygon(0, document.getElementById('poly2')) as Polygon;
let spyro = createPolygon(1, document.getElementById('spyro')) as Spyrogon;


poly0.lines.forEach(el => {
    el.style.fill = 'magenta';
})
//poly0.strokeWidth = 10;
poly1.radius = 120;

poly2.lines.forEach(el => {
    el.style.fill = 'magenta';
})
poly2.fill = 'limegreen'
poly2.radius = 140;
//(dumpProperties('poly0',poly0))

let i = 0;
function updateProps() {
    i %= 9;
    //console.log(`i: ${i}`)
    spyro.points = 3 + (i)
    spyro.next = 1 + i// not implemented in Polygon
    //console.log(`next: ${spyro.next}`)
    spyro.strokeWidth = 2 + i;
    spyro.radius = 50 + 10 * (i);
    
    spyro.lines.forEach(el => {
        el.style.fill = i % 2 == 0 ? 'magenta' : 'orange';
    });
    spyro.fill = 'limegreen'
    //console.log(`sT radius: ${spyro.radius}`)
    i++;
};


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

