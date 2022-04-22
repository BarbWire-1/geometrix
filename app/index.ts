
'use strict';

import { dumpProperties, inspectObject } from "./devTools";
import { gLines, outerLines, createPolygon } from './classPolygon';


//GET ELEMENTS FOR POLYGON
// const gLines = document.getElementById("gLines") as GroupElement;
// const lines = gLines.getElementsByClassName("lines") as LineElement[]//unknown as Polygon["lines"]//style is missing to type this directly this way
//This is not really correct for now: Polygon isn't an array, but needs to include one
//Or it finally goes on a single use?
// now refer to same elements in class

//create with defaults
let poly = createPolygon()

//created as {radius: 50, points: 5, strokeWidth: 2, next: 1}
// currently only abstract as no LineElements connected
let poly2 = createPolygon(50,5,2,1)



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
            
           outerLines[i].style.fill = colors[i % colors?.length]
        }
    };
};

// just to see it works :) 
setInterval(changeConnect, 1000);
let i = 1;
let a = 0;
let p = 0;
function changeConnect() {
    p %= 10;
    poly.next = p + 1;
    poly.points = 3 + p
    p++;
    
    i %= (poly.points);
    i += 1;
    poly.strokeWidth = 2 + i % 8;
    poly.radius = 50 + 10 * i;

    a %= themes.length;
    colors = themes[a];
    a++;
updateColors();
}







//poly.points = 12;


//TODO add this logic to abstract class in PolyAllMethods


