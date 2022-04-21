
'use strict';

import document from "document";
import { dumpProperties, inspectObject } from "./devTools";
import { createPoly } from "./regularPolygon";
import {test} from './PolyallMethods'


//GET ELEMENTS FOR POLYGON
const gLines = document.getElementById("gLines") as GroupElement;
const lines = gLines.getElementsByClassName("lines") as LineElement[]//unknown as PolygonBG

let poly = createPoly(100, 4, 10)


test.radius = 10;
test.points = 12;

inspectObject('test', test)
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
let pts = poly._coords;

const updatePolygon = () => {
    lines.forEach(el => {
        el.style.display = 'none'
    });
    
    for (let i = 0; i < poly.points; i++) {
    
        let l = lines[i];
        
        l.style.display = 'inline';
        l.style.strokeWidth = poly.strokeWidth
        
        let nextPt = pts[((i+connectTo)%poly.points )] ?? pts[0]
       
        //startPoins
        l.x1 = pts[i].x;
        l.y1 = pts[i].y;
        //connects lines
        l.x2 = nextPt.x;
        l.y2 = nextPt.y;
        
        if (colors !== undefined) {
            lines[i].style.fill = colors[i % colors?.length]
        }
    };
}
setInterval(changeConnect, 1000)
let i = 1;
function changeConnect() {
    i %= (poly.points-2)
    i += 1;
    connectTo = i;
    colors = themes[i % themes.length]
    updatePolygon()
}







poly.points = 12;// this doesn't update aaaaah! needs to take new coords of course!!!
pts = poly._coords;
updatePolygon()


