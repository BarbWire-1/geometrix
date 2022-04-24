
'use strict';

import { dumpProperties, inspectObject } from "./devTools";
import { Polygon, Spyrogon, createPolygon } from './classPolygon';

// POLYGON - connecting p to p +1
//create with defaults
//let test = new Polygon();

// create with custom values
//let test = new Polygon(100, 5, 10);

// SPYROGON - extending polygon: connecting p to p + [next]
//create with defaults
let test = new Spyrogon()

// create with custom values
//let test = new Spyrogon(50, 5, 2, 3)

//to see connection p => next p
test.lines[0].style.fill = 'orange'//🥳 GOT IT WORKING!!!
inspectObject('test', test)


let i = 0;
function updateProps() {
    i %= 9;
    console.log(`i: ${i}`)
    test.points = 3 + (i)
    test.next = i+1// not implemented in Polygon
    
    test.strokeWidth = 2 + i;
    test.radius = 50 + 10 * (i);
    i++;
    
    
    //console.log(`radius: ${test.radius}`)
    console.log(`points: ${test.points}`)
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

//TODO NO 1 restructure index.view to symbol and rewrite to use.children instead of LineElement[]
