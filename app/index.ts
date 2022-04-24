
'use strict';

import { dumpProperties, inspectObject } from "./devTools";
import { createPolygon } from './classPolygon';

//create with defaults
let poly = createPolygon(50, 5, 2)


//let testFill = poly.lines[0].style.fill = 'orange'//🥳 GOT IT WORKING!!!
poly.x = 168
poly.y = 168

// just to see it works :) 
setInterval(updateProps, 1000);
let i = 0;

function updateProps() {
    i %= 10
    poly.points = 3+i
    poly.strokeWidth = 2 + (2*i);
    poly.radius = 50 + 10 * (i);
    i++;
    //inspectObject('poly', poly)
}







//poly.points = 12;


//TODO add this logic to abstract class in PolyAllMethods


