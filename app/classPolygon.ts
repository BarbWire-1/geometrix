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
    private layout: void;
    radius: number;
   
    constructor(radius: number, points: number, strokeWidth: number, next: number) {
        this._radius = Number(this.defineProperties(this, 'radius'));
        //this._radius = radius;
        this._points = points;
        this._strokeWidth = strokeWidth;
        this._next = next;
        this.layout = this._recalc();
       
    };
   
    //GETTER/SETTER
    private _radius: number;
    // get radius() { return this._radius }
    // set radius(newValue) {
    //     this._radius = newValue;
    //     this._recalc();
    // };

    private _points: number;
    get points() { return this._points }
    set points(newValue) {
        if (validInput(this.points) == true) {
            this._points = newValue;
            this._recalc();
        } else {
            console.warn('Please choose a valid number of points.')
            return;
        }
    };
    
    private _strokeWidth: number;
    get strokeWidth() { return this._strokeWidth }
    set strokeWidth(newValue) {
        this._strokeWidth = newValue;
        this._recalc();
    };
    
    private _next: number;
    get next() { return this._next }
    set next(newValue) {
        this._next = newValue;
        this._recalc();
    };
     
    //METHODS
    
   //there's a logic mistake in here... doesn't get applied 
   defineProperties(target: Object, key: string) {
        let value = this[`_${key}`];;
        let val: any; // allow number or string
        const get = function () {
            console.log(`${key} value: ${value}`);
            return value;
        };
      
        const set = function (val) {
            console.log(`new ${key} value: ${val}`);
            value = val;
            
            this._recalc()
            return val;
        };
        Object.defineProperty(target, key, { set, get });
        
       return 100;
       // return val => NaN WHY???
       // Cannot set property to 'NaN'. Invalid value: Value out of bounds for native type
    }

    
    private _recalc(): void {
       
        let p: Point[] = []
        //recalc radius depending on strokeW to fit inside
        let iRadius: number = this._radius;
        iRadius -= Math.round(this._strokeWidth / 2);
        
        const fract: number = (2 * Math.PI / this._points);
        let i: number = 0;
        while (i < this._points) {
            p.push(new Point(0, 0))
            //calcs x,y to start pt0 at (0,-radius)relative to PolygonCenter
            //to start at top, running clockwise
            p[i].y = Math.round(iRadius * - Math.cos(i * fract));
            p[i].x = Math.round(iRadius * Math.sin(i * fract));
            i++;

        };

        // necessary to set back to 'none' before change to remove previous
        outerLines.forEach(el => {
            el.style.display = 'none'
        });
        
        i = 0;
        while (i < this._points) {
            let ol = outerLines[i];
            // sts only used lines back to 'inline
            ol.style.display = 'inline';
            ol.style.strokeWidth = this.strokeWidth;
            //start points
            ol.x1 = p[i].x;
            ol.y1 = p[i].y;
            //end points
            let nextPt = p[(i + this._next) % this._points] ?? p[0];
            ol.x2 = nextPt.x;
            ol.y2 = nextPt.y;
            i++;
        
        };
    };
};
//TODO NOT SURE ABOUT THIS
// check for new value to process only needed parts when calling? Or split again?

// Possible pro: I wouldn't need an outer coords array, but could always pass values inside the refresh...
    
    



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
