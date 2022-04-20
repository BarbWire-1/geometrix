
'use strict';

import document from "document";
import { dumpProperties, inspectObject } from "./devTools";
import {  createPoly} from "./regularPolygon";





//GET ELEMENTS FOR POLYGON
const gLines = document.getElementById("gLines") as GroupElement;
const lines = gLines.getElementsByClassName("lines") as LineElement[]//unknown as PolygonBG

let poly = createPoly(100, 4, 10)

let colors;
let connectTo: number = 1;


let s = ['limegreen', 'aqua']
let mine = ['magenta', 'orange']
let girly = ['pink', 'magenta', 'white'];
let bluish = ['aqua', 'limegreen', 'lightblue']
let rainbow = [
    'purple',
    'blue',
    'limegreen',
    'yellow',
    'orange',
    'red',
]

colors = mine
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
    updatePolygon()
}







poly.points = 12;// this doesn't update aaaaah! needs to take new coords of course!!!
pts = poly._coords;
updatePolygon()
//needs to create new object for changes
//getter/setter???
//inspectObject('poly', poly)

//TODO add lines[] to polygon with lines[i] = points

//PLAY WITH DIFFERENT CONSTRUCTOR TYPES
interface Point {
    coordinates(): Iterable<number>;
}

class NDPoint implements Point {
    private values: Iterable<number>;

    constructor(coordinates: Iterable<number>) {
        this.values = coordinates;
    }
    coordinates(): Iterable<number> {
        return this.values;
    }
}
class EmptyPoint implements Point {
    coordinates(): Iterable<number> {
        return [];
    }
}

inspectObject('2', new NDPoint([3, 4]))
inspectObject('3',new NDPoint([10, 10]));
// new NDPoint(new IterableOf(10));
// new NDPoint(new IterableOf(10, 10));
// new NDPoint(new IterableOf(10, 10, 10));
// new NDPoint(new IterableOf(10, 10, 10, 10));
// new NDPoint([10, 10, 10]);
