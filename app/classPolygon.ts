import { inspectObject } from "./devTools";
import { validInput } from "./validation";
import document from 'document'

//GET ELEMENTS FOR POLYGON
export const gLines = document.getElementById("gLines") as GroupElement;
export const outerLines = gLines.getElementsByClassName("lines") as unknown as Line[];

class Point {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
};
//use this to restrict properties to needed and desired
interface Line
{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    style: {
        opacity: number;
        display: 'inherit' |'inline'|'none';
        fill: string;
        strokeWidth: number;
    };
    iterable: boolean;
    enumerable: boolean;
};


abstract class APolygon {
    private layout: void;
    lines: Line[];
    _radius: number;
    _points: number;
    _next: number;
   
   
    constructor(radius: number, points: number, strokeWidth: number, next: number) {
        //TODO try to expose key insted of privKey (Which I can't set to private here, as gets written)
        this._radius = this.defineProp(radius, this._radius)
        this._points = this.defineProp(points, this._points)
        this._strokeWidth = strokeWidth;// TODO: why does this not behave? check use in methods
        this._next = this.defineProp(next, this._next)
        this.layout = this._recalc();
        this.lines = outerLines;// connected to SVG elements as LINE[] def in interface
        
    };
    
   //got adjusted run on this._radius
    private defineProp(key, privateKey) {
        Object.defineProperty(this, key, {
            set(newValue) { privateKey = newValue;},
            get() { return [privateKey] },
        }); 
        return key
    };
   //TODO add validation for points to _calcPoints
    
    //GETTER/SETTER
    // private _radius: number;
    // get radius() { return this._radius }
    //  set radius(newValue) {
    //     this._radius = newValue;
    //     this._recalc();
    //  };
    
    // private _points: number;
    // get points() { return this._points }
    // set points(newValue) {
    //     if (validInput(this.points) == true) {
    //         this._points = newValue;
    //         this._recalc();
    //     } else {
    //         console.warn('Please choose a valid number of points.')
    //         return;
    //     }
    // };
    
    private _strokeWidth: number;
    get strokeWidth() { return this._strokeWidth }
    set strokeWidth(newValue) {
        this._strokeWidth = newValue;
        this._recalc();
    };
    // 
    // private _next: number;
    // get next() { return this._next }
    // set next(newValue) {
    //     this._next = newValue;
    //     this._recalc();
    // };
   
   
    //METHODS
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
            //let l = this.lines[i];// 🚫 TypeError: Cannot read property '0' of undefined
            let l = outerLines[i];
            
            l.style.display = 'inline';
            l.style.strokeWidth = this._strokeWidth;
            //start points
            l.x1 = p[i].x;
            l.y1 = p[i].y;
            //end points
            let nextPt = p[(i + this._next) % this._points] ?? p[0];
            l.x2 = nextPt.x;
            l.y2 = nextPt.y;
            i++;
            //console.log(this.lines[i].x1)////🚫 Cannot read property 'x1' of undefined
        };
        
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


/**
 * Unfortunately most of the features I wanted to try in TS, esp decorators,
 * don't seem to wotk in this env.
 * This way, I find it extremly cumbersome.
 * Maybe I'll finally go without class but define just an interface for the "natural" els.
 * to define props.
 * 
 */