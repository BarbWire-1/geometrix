import { inspectObject } from "./devTools";
import { validInput } from "./validation";

class Point {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
};
class Line {
    style?: {
        opacity: number;
        display: 'inherit' | 'inline' | 'none';
        strokeWidth?: number;
        fill?: string;
    }
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
}



abstract class APolygon {
    lines: Line[];
    private length: number;
    private gradient: number[];
    coords: Point[]; // back to private when line calc in here!
   
    constructor( radius, points, strokeWidth) {
        this._radius = radius;
        this._points = points;
        this._strokeWidth = strokeWidth;
        this.coords = this._calcPoints();
        this.length = this._len(this.coords[1], this.coords[0]);
        this.gradient = this._gradient();
        //TODO define lines from calcPoints
    };
    
     //getter/setter 
     private _radius: number;
     get radius() { return this._radius }
     set radius(newValue) {
         this._radius = newValue;
         this._refresh();
     };
     private _points: number;
     get points() { return this._points }
     set points(newValue) {
         this._points = newValue;
         this._refresh();
         
        //  for (let i = 0; i < this._points; i++) { //lines undefined
        //      this.lines.push(this._points[i])
        //      inspectObject('lines', this.lines)
        // }
     };
     private _strokeWidth: number;
     get strokeWidth() { return this._strokeWidth }
     set strokeWidth(newValue) {
         this._strokeWidth = newValue;
         this._refresh();
     };
     
    //METHODS
    private _refresh() {
        this.coords = this._calcPoints();
        this.length = this._len(this.coords[1], this.coords[0]);
//         this.lines.forEach(el => {
//             el.style.display = 'none'
//         });
// 
//         for (let i = 0; i < this._points; i++) {
//             let l = this.lines[i];
//             let pts = this._points 
//             l.style.display = 'inline';
//             l.style.strokeWidth = this.strokeWidth
// 
//             let nextPt = pts[i % pts] ?? pts[0]
// 
//             //startPoins
//             l.x1 = pts[i].x;
//             l.y1 = pts[i].y;
//             //connects lines
//             l.x2 = nextPt.x;
//             l.y2 = nextPt.y;
// 
//         };
    
        this.gradient = this._gradient();
    };
     
    private _calcPoints() {
        let p: Point[] = []
        //recalc radius depending on strokeW to fit inside
        this._radius -= this.strokeWidth % 2 === 0 ? this.strokeWidth / 2 : Math.floor(this.strokeWidth / 2);
        const fract = (2 * Math.PI / this.points);
      
        for (let i: number = 0; i < this.points; i++) {
            p.push(new Point(0, 0))
            p[i].x = Math.round( this._radius * Math.cos(i * fract));
            p[i].y = Math.round(this._radius * Math.sin(i * fract));
        }
        //console.log(JSON.stringify(p))
        return p;
        
    };
    // PROGRESS
    private _len(s, e) {
        let dx = e.x - s.x;
        let dy = e.y - s.y;
        return Number(Math.sqrt(dx * dx + dy * dy));
    };
    //_gradient for ALL needed to calculate x,y progress!
    private _gradient() {
        let g: number[] = [];
        for (let i: number = 0; i < this.points; i++) {
            //g.push(0)
            let nextI = (i + 1) % this.points;
            let dx = this.coords[nextI].x - this.coords[i].x;
            let dy = this.coords[nextI].y - this.coords[i].y;
            let gr = (dx / dy);
            g.push(gr);
        }
        return g;
    };
};


//TODO : add line connection and fill-logic


export class Polygon extends APolygon {
    
}
export const createPolygon = (radius = 100, points = 5, strokeWidth = 2) => {
    if (validInput(points) == true) {
        return new Polygon(radius, points, strokeWidth)
    } return;
}
