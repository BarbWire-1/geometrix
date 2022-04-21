
'use strict';

import document from "document";
import { dumpProperties, inspectObject } from "./devTools";
import { Polygon,createPolygon } from './classPolygon';


//GET ELEMENTS FOR POLYGON
const gLines = document.getElementById("gLines") as GroupElement;
const lines = gLines.getElementsByClassName("lines") as LineElement[]//unknown as PolygonBG
//This is not really correct for now: Polygon isn't an array, but needs to include one
//Or it finally goes on a single use
let poly = createPolygon()
// if create poly directly as getElements... as Polygon, poly.lines still undefined.
// guess need a symbol/use for that

poly.radius = 100;
poly.points = 12;
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
let pts = poly.coords;

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
pts = poly.coords;
updatePolygon()

//TODO add this logic to abstract class in PolyAllMethods


