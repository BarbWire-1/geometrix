
'use strict';
import document from 'document';
import { dumpProperties, inspectObject } from "./devTools";
import { Polygon, Spyrogon, createPolygon } from './classPolygon';



let symbolTest = new Polygon();
symbolTest.lines = document.getElementById('poly1').firstChild.children as unknown as Polygon["lines"]

symbolTest.lines[0].style.fill = 'magenta'//TypeError: Cannot read property 'style' of undefined
inspectObject('symbolTest', symbolTest)
//TODO this does something, but something weird :)
//I now mixed single and symbolUse in the same stage - and this declaration-worm is a nightmare 🤣
//find a way to integrate lines on instantiaiting polygon
//polygon-widget.defs!!

// POLYGON - connecting p to p +1
//create with defaults
//let test = new Polygon();

// create with custom values
//let test = new Polygon(100, 5, 10);

// SPYROGON - extending polygon: connecting p to p + [next]
//create with defaults
// let test = new Spyrogon()
// 
// 
// // create with custom values
let test = new Spyrogon(50, 5, 2, 3)
// 
// //to see connection p => next p
// test.lines[0].style.fill = 'orange'
// inspectObject('test', test)
// 
// 
let i = 0;
function updateProps() {
    i %= 9;
    //console.log(`i: ${i}`)
    test.points = 3 + (i)
    test.next = 1 + i// not implemented in Polygon
    console.log(`next: ${test.next}`)
    test.strokeWidth = 2 + i;
    test.radius = 50 + 10 * (i);
    i++;
};



const delay = 1;
const limit = 20;
let a = 1;


const limitedInterval = setInterval(() => {
    updateProps()
    if (a > limit) {
        clearInterval(limitedInterval);
        // console.log('-------------------');
        // console.warn('Interval cleared!');
    };
    a++;
}, delay * 1000);

//TODO NO 1 restructure index.view to symbol and rewrite to use.children instead of LineElement[]
