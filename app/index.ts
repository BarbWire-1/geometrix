
'use strict';
import document from 'document';
import { createPolygon, Polygon, Spyrogon } from './polygon-widget/polygon-widget';



let poly0 = createPolygon(0, document.getElementById('poly0'),100, 12, 4) as Polygon
//poly0.points = 3

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



poly0.lines[0].style.display = 'none'
//poly0.lines[0].x1 = 100;

poly0.strokeWidth = 20
poly0.lines[0].style.display = 'none'
//TODO if any recalc after setting to 'none',
//active lines will be reset to 'inline'!
//Keep that or add any exception?

//TODO split css
//remove strokeWidth from defaults to be able to access from css?

