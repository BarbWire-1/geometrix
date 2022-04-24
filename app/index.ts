
'use strict';

import { dumpProperties, inspectObject } from "./devTools";
import { Polygon, Spyrogon, createPolygon } from './classPolygon';

//create with defaults

// 
// 

// poly.x = 168
// poly.y = 168
// 
// // just to see it works :) 
// setInterval(updateProps, 1000);
// let i = 0;
// 
// function updateProps() {
//     i %= 10
//     poly.points = 3+i
//     poly.strokeWidth = 2 + (2*i);
//     poly.radius = 50 + 10 * (i);
//     i++;
//     //inspectObject('poly', poly)
// }

//connecting p to p +1
let test = new Polygon(100, 5, 10);

//extending polygon: connecting p to p + [next]
//let test = new Spyrogon(50, 5, 2, 3)
test.lines[0].style.fill = 'orange'//🥳 GOT IT WORKING!!!
inspectObject('test', test)

let i = 0;
function updateProps() {
    i %= 10
    //test.next = i
    test.points = 3+i
    test.strokeWidth = 2 + (2*i);
    test.radius = 50 + 10 * (i);
    i++;
    // console.log(i)
    // console.log(test.radius)
};

const delay = 2;
const limit = 18;
let a = 1;


const limitedInterval = setInterval(() => {
    updateProps()
    if (a > limit) {
        clearInterval(limitedInterval);
        console.log('Interval cleared!');
    };
    a++;
}, delay * 1000);

//points gets updated





//poly.points = 12;


//TODO add this logic to abstract class in PolyAllMethods


