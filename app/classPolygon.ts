import { inspectObject } from "./devTools";
import { validInput } from "./validation";
import document from 'document'

//GET ELEMENTS FOR POLYGON
const gLines = document.getElementById("gLines") as GroupElement;
const outerLines = gLines.getElementsByClassName("lines") as unknown as Line[];

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
    protected redraw: void;
    lines: Line[];
    
    
    constructor(radius: number, points: number, strokeWidth: number) {
        this._radius = radius;
        this._points = points
        this._strokeWidth = strokeWidth;
        this.redraw = this._recalc();
        this.lines = outerLines;// connected to SVG elements as LINE[] def in interface
        //evtl later remove this wehn symbol/use
        this.x = gLines.groupTransform.translate.x
        this.y = gLines.groupTransform.translate.y;
        this._next = 1;
       
    };
    
    //GETTER/SETTER
    protected _radius: number;
    get radius() { return this._radius }
     set radius(newValue) {
        this._radius = newValue;
        this._recalc()
         //console.log(this._radius)
     };
    
   protected _points: number;
    get points() { return this._points }
    set points(newValue) {
        if (validInput(this.points) == true) {
            this._points = newValue;
            this._recalc()
        } else {
            console.warn('Please choose a valid number of points.')
            return;
        }
    };
    
    protected _next: number;

    protected _strokeWidth: number;
        get strokeWidth() { return this._strokeWidth }
        set strokeWidth(newValue) {
            this._strokeWidth = newValue;
            //doesn't need a redraw as set on elements directly!
        };
        
        _x: number;
        get x() { return this._x }
        set x(newValue) {
            this._x = newValue;
        };
    
        _y: number;
        get y() { return this._y }
        set y(newValue) {
            this._y = newValue;
        };
    
   
    //METHODS
    _recalc(): void {
       
        let p: Point[] = []
        //recalc radius depending on strokeW to fit inside
        let iRadius: number = this._radius;
        console.log(this._radius)
        iRadius -= Math.round(this._strokeWidth / 2);
        console.log('calculated points!')
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
        outerLines.forEach(el => {
            el.style.display = 'none'
        });
       
        i = 0;
        while (i < this._points) {
            //let l = this.lines[i];// 🚫 TypeError: Cannot read property '0' of undefined
            let l: Line = outerLines[i];

            l.style.display = 'inline';
            l.style.strokeWidth = this._strokeWidth;
            //start points
            l.x1 = p[i].x;
            l.y1 = p[i].y;
            //end points
            let npt = this._next ?? 1
            let nextPt = p[(i + npt) % this._points] ?? p[0];
        
            l.x2 = nextPt.x;
            l.y2 = nextPt.y;
            i++;
        };
        
    };
};
//TODO: extending class vs abstr class...
// seems extending abstract is much nicer, as no need to reply all from super, 
// but directly accesses that!!! I LIKE!!!
export class Polygon extends APolygon {    
};

export class Spyrogon extends APolygon {
    
    constructor(radius, points, strokeWidth, next: number) {
        super(radius, points, strokeWidth)
        this._radius = radius;
        this._points = points
        this._strokeWidth = strokeWidth;
        this.redraw = this._recalc();
        this._next = next;
         
    }
    
    protected _next: number;
    get next() { return this._next }
    set next(newValue: number) {
        this._next = newValue;
        this._recalc();
    };
};



//TODO add mode to create Polygon or Spyrogon
export const createPolygon = (radius = 100, points = 5, strokeWidth = 2) => {
    if (validInput(points) == true) {
        return new Polygon(radius, points, strokeWidth);
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

