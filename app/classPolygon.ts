import { inspectObject } from "./devTools";
import { validInput } from "./validation";
import document from 'document'

//GET ELEMENTS FOR POLYGON
export const gLines = document.getElementById("gLines") as GroupElement;
export const outerLines = gLines.getElementsByClassName("lines") as LineElement[];

class Point {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
};


abstract class APolygon {
    private lines: void;
    private length: number;
    private gradient: number[];
    private coords: Point[]; 
   
   
    constructor( radius, points, strokeWidth,next) {
        this._radius = radius;
        this._points = points;
        this._strokeWidth = strokeWidth;
        this._next = next;
        this.coords = this._calcPoints();
        this.length = this._len(this.coords[1], this.coords[0]);
        this.gradient = this._gradient();
        this.lines = this._iLines();
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
    if (validInput(this.points) == true) {
            this._points = newValue;
            this._refresh();
        } else {
            console.warn('Please choose a valid number of points.')
            return;
        }
    };
    private _strokeWidth: number;
    get strokeWidth() { return this._strokeWidth }
    set strokeWidth(newValue) {
        this._strokeWidth = newValue;
        this._refresh();
    };
    private _next: number;
    get next() { return this._next }
    set next(newValue) {
        this._next = newValue;
        this._refresh();
        //console.log(this._next)
    };
     
    //METHODS
    private _refresh() {
        this.coords = this._calcPoints();
        this.lines = this._iLines();
        // this.length = this._len(this.coords[1], this.coords[0]);
        // this.gradient = this._gradient();
    };
    //TODO check where recalculating needs to be initiated codewise
    
    private _calcPoints() {
        let p: Point[] = []
        //recalc radius depending on strokeW to fit inside
        let iRadius = this._radius;
        iRadius -= Math.round(this._strokeWidth / 2);
        
        const fract = (2 * Math.PI / this._points);
        let i = 0;
        while (i < this._points) {
            p.push(new Point(0, 0))
            //calcs x,y to start pt0 at (0,-radius)relative to PolygonCenter
            //to start at top, running clockwise
            p[i].y = Math.round(iRadius * - Math.cos(i * fract));
            p[i].x = Math.round(iRadius * Math.sin(i * fract));
            i++;

        };
    
        return p; 
    };
   
    private _iLines() {
        let ols =  outerLines;
        let pts = this.coords;
        
        // now integrated outer lines here, but dont like having so many objects
        // passing their values around
        //TODO go for partial Types? But if deriving from interface can't set methods private
        // at least split in different classes for more or less static/dynamic
       // set back to 'none' before change to remove previous
        ols.forEach(el => {
            el.style.display = 'none'
        });
        let i = 0;
        while (i < this._points){
            let ol = ols[i];
            // sts only used lines back to 'inline
            ol.style.display = 'inline';
            ol.style.strokeWidth = this.strokeWidth;
            //start points
            ol.x1 = pts[i].x;
            ol.y1 = pts[i].y;
            //end points
            let nextPt = pts[(i + this._next) % this._points] ?? pts[0];
            ol.x2 = nextPt.x;
            ol.y2 = nextPt.y;
            i++;
        };
       
    };

    
    
    
    // NEEDED FOR PROGRESS ONLY
    private _len(s, e) {
        let dx = e.x - s.x;
        let dy = e.y - s.y;
        return Number(Math.sqrt(dx * dx + dy * dy));
    };
    //_gradient for ALL needed to calculate x,y progress!
    // TODO now get distance with connectPoints from line!!! (if at all)
    private _gradient() {
        let g: number[] = [];
        let i = 0;
        while (i < this._points) {
            //g.push(0)
            let nextI = (i + 1) % this._points;
            let dx = this.coords[nextI].x - this.coords[i].x;
            let dy = this.coords[nextI].y - this.coords[i].y;
            let gr = (dx / dy);
            g.push(gr);
            i++;
        }
        return g;
    };
};





export class Polygon extends APolygon {    
};

export const createPolygon = (radius = 100, points = 5, strokeWidth = 2, next = 1) => {
    if (validInput(points) == true) {
        return new Polygon(radius, points, strokeWidth, next);
    } return;
};

//TODO restructure index.view to symbol and rewrite to use.children instead of LineElement[]

//TODO 00 make _calcPoints/_iLine one expression.
// Logic a bit tricky wo return and in a while instead for...