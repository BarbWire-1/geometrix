
'use strict';
import document from 'document';
import { dumpProperties, inspectObject } from "./devTools";
import { createPolygon, Polygon, Spyrogon } from './polygon-widget/polygon-widget';



let poly0 = createPolygon(0, document.getElementById('poly0'),100, 3, 4) as Polygon


let i = 0;
function updateProps() {
    //i %= 24;
    poly0.rotate.angle = 15 * i;
    console.log(`poly0.rotate.angle = ${poly0.rotate.angle}`)

    i++;
};

//to stop animation and logging
const delay = 1;
const limit = 24;
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
console.log(poly0.x)

poly0.x = 168;
console.log(poly0.x)

poly0.y = 168;
console.log(poly0.y)

poly0.lines[0].style.strokeWidth = 10;


dumpProperties('poly0', poly0, 1)
poly0.lines[0].style.display = 'none'
//poly0.lines[0].x1 = 100;
inspectObject('poly0', poly0)

