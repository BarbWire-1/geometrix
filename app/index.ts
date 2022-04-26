
'use strict';
import document from 'document';
import { dumpProperties, inspectObject } from "./devTools";
import { createPolygon, Polygon, Spyrogon } from './polygon-widget';



let poly0 = createPolygon(0, document.getElementById('poly0'),150, 12, 4) as Polygon
let poly1 = createPolygon(0, document.getElementById('poly1')) as Polygon;
let poly2 = createPolygon(0, document.getElementById('poly2')) as Polygon;
let spyro = createPolygon(1, document.getElementById('spyro')) as Spyrogon;


// poly0.lines.forEach(el => {
//     el.style.fill = 'magenta';
// })
//poly0.strokeWidth = 10;
poly1.radius = 120;

poly2.lines.forEach(el => {
    el.style.fill = 'magenta';
});
poly0.style.fill = "turquoise"
console.log(poly0.style.fill)
//poly0.style.fill = 'limegreen'
console.log(poly0.style.fill) 
poly0.style.display = 'inline'
poly0.x = 300
console.log(poly0.x)

poly2.radius = 140;
//(dumpProperties('poly0',poly0))

poly2.style.opacity = 1;

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
    spyro.style.fill = 'limegreen'
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

