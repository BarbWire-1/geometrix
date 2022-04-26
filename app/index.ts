
'use strict';
import document from 'document';
import { dumpProperties, inspectObject } from "./devTools";
import { createPolygon, Polygon, Spyrogon } from './classPolygon';



let poly = createPolygon(0, document.getElementById('poly')) as Polygon
let poly1 = createPolygon(0, document.getElementById('poly1')) as Polygon;
let poly2 = createPolygon(0, document.getElementById('poly2')) as Polygon;
let spyro = createPolygon(1, document.getElementById('spyro')) as Spyrogon;


poly.lines.forEach(el => {
    el.style.fill = 'magenta';
    el.style.strokWidth = 1;//doesn't get applied
})
poly.strokeWidth = 10;//doesn't get applied here
poly1.radius = 120;

poly2.lines.forEach(el => {
    el.style.fill = 'magenta';
    el.style.strokWidth = 1;//doesn't get applied
})

poly2.radius = 140;
(dumpProperties('poly',poly))

let i = 0;
function updateProps() {
    i %= 9;
    //console.log(`i: ${i}`)
    spyro.points = 3 + (i)
    spyro.next = 1 + i// not implemented in Polygon
    //console.log(`next: ${spyro.next}`)
    spyro.strokeWidth = 2 + i; //TODO THIS gets applied ?????
    spyro.radius = 50 + 10 * (i);
    spyro.lines.forEach(el => {
        el.style.fill = i % 2 == 0 ? 'magenta' : 'orange';
    });
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

//TODO check, why strokeWidth doesn't get applied (not on el, not on el.lines)
