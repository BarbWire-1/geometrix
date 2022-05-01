
'use strict';
import document from 'document';
import { dumpProperties, inspectObject } from "./devTools";
import { createPolygon, Polygon, Spyrogon } from './polygon-widget/polygon-widget';



let poly0 = createPolygon(0, document.getElementById('poly0'),100, 3, 4) as Polygon


let i = 0;
let counter = 0;
function updateProps() {
    counter++;
    //console.warn(`updateProps() runs the ${counter}. time.`)
    i %= 9;
 
    poly0.rotate.angle = 15*i;
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
console.log(poly0.x)// 100 set in svg, gets applied

poly0.x = 168;
console.log(poly0.x)//168 read, but not applied

poly0.lines[0].x1

