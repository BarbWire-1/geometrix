
'use strict';

import document from "document";
import { dumpProperties, inspectObject } from "./devTools";
import { Polygon,createPolygon } from './classPolygon';


//GET ELEMENTS FOR POLYGON
const gLines = document.getElementById("gLines") as GroupElement;
const lines = gLines.getElementsByClassName("lines") as LineElement[]//unknown as Polygon["lines"]//style is missing to type this directly this way
//This is not really correct for now: Polygon isn't an array, but needs to include one
//Or it finally goes on a single use
let poly = createPolygon()
// if create poly directly as getElements... as Polygon, poly.lines still undefined.
// guess need a symbol/use for that

poly.radius = 100;
poly.points = 4;
poly.strokeWidth = 5;

inspectObject('poly', poly)
//now update in setInterval
let connectTo: number = 3;

let themes = [
    ['limegreen', 'aqua'],
    ['magenta', 'orange'],
    ['pink', 'magenta', 'white'],
    ['aqua', 'limegreen', 'lightblue'],
    ['purple', 'blue', 'limegreen', 'yellow', 'orange', 'red'],
    ['orange'],
    ['white', 'red', 'white','blue']
]
let colors = themes[4];
//inspectObject('poly', poly)

//later just x,y of use
const center = gLines.groupTransform.translate
center.x = 168
center.y = 168

//TODO: do this in class directly to update for changed settings!!!
// pass values of object her to lineElements


const updateColors = () => {
    for (let i = 0; i < poly.points; i++) {
        if (colors !== undefined) {
            lines[i].style.fill = colors[i % colors?.length]
        }
    };
};

// just to see it works :) 
// but a flaw in logic (skips one in between)
setInterval(changeConnect, 1000);
let i = 1;
let a = 0;
let p = 0;
function changeConnect() {
    poly.points = 3 + (p % 10)
    p++
    i %= (poly.points);
    i += 1;
    poly.next = p-1;
    poly.strokeWidth = 2+i%8

    
    colors = themes[a % themes.length];
    a++;
updateColors();
}







poly.points = 8;


//TODO add this logic to abstract class in PolyAllMethods


