import { inspectObject } from "./devTools";
import { validInput } from "./validation";
import document from 'document';



//GET ELEMENTS FOR POLYGON
export const createPolygon = (mode, el, radius=100, points=5, strokeWidth=2, next=1) => {

let gLines = el.getElementById("linesG") as GroupElement;
const outerLines = el.getElementsByClassName("lines") as unknown as Line[];

class Point {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
};
//use this to restrict properties to needed and desired
//on the SVG elements
interface Line {
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

/**
 * Originally planned to make an Interface here, but no modifications allowed
 * so I'd have to do that in each extending class separately.
 * That's why I go with an abstract class instead.
 */

// abstract structure
abstract class IPolygon implements Line {
    
    protected _x: number;
    protected _y: number;
    protected _radius: number;
    protected _points: number;
    protected _strokeWidth: number;
    protected _next: number;
    protected _fill: string;

    lines: Line[];
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    style: {
        opacity: number;
        display: 'inherit' | 'inline' | 'none';
        fill: string;
        strokeWidth: number;
    };
    readonly iterable: boolean;
    readonly enumerable: boolean; 
    
    protected redraw: void;
};


    class PolygonBase extends IPolygon {
        
        lines: Line[];
        
        constructor( radius=100, points=5, strokeWidth=2 ){
            super();
            this._radius = radius;
            this._points = points
            this._strokeWidth = strokeWidth;
            this.redraw = this._recalc();
            this.lines = outerLines;// connection to SVG elements
            this.x = gLines.groupTransform.translate.x
            this.y = gLines.groupTransform.translate.y;
            this._next = 1;
            // this._fill = outerLines.forEach(el => {
            //     el.style.fill;
            //     return String(this.fill)
            // });
    };
    
    //GETTER/SETTER
    get radius() { return this._radius }
    set radius(newValue) {
        this._radius = newValue;
        this._recalc()
        };
    
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
    
    get strokeWidth() { return this._strokeWidth }
    set strokeWidth(newValue) {
        this._strokeWidth = newValue;
        this._recalc()
    };   
   
    get x() { return this._x }
    set x(newValue) {
        this._x = newValue;
    };
   
    get y() { return this._y }
    set y(newValue) {
        this._y = newValue;
    };
    
   
    //METHODS
    protected _recalc(): void {
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
        //set to 'non' if previous was > i
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


class Polygon extends PolygonBase {  
    //this is needed to be able to create an object
};

class Spyrogon extends PolygonBase {
    
    constructor(radius=100, points=5, strokeWidth=4, next=2) {
        super( radius, points, strokeWidth )
        this._radius = radius;
        this._points = points
        this._strokeWidth = strokeWidth;
        this.redraw = this._recalc();
        this._next = next;  
    };
    
    protected _next: number;
    get next() { return this._next }
    set next(newValue: number) {
        this._next = newValue;
        this._recalc();
    };
};

    
el = mode == 0
    ? new Polygon(radius, points, strokeWidth)
    : mode == 1
        ? new Spyrogon(radius, points, strokeWidth, next)
        : console.warn('Please check your params!')
   return el;
};

export interface Polygon {
    radius: number;
    points: number;
    strokeWidth: number;
    lines: any []
    x: number;
    y: number;
    fill: string;
};

export interface Spyrogon extends Polygon{
    next: number;  
};


/**
 * What an overkill!!! :))))
 * I guess that could be done much more efficient (will try to), but was fun
 * Unfortunately most of the features I wanted to try in TS, esp decorators,
 * don't seem to wotk in this env.
 * This way, I find it extremly cumbersome.
 * Maybe I'll finally go without class but define just an interface for the "natural" els.
 * to define props.
 * 
 */

//TODO difference interface vs type??
//TODO: extending class vs abstr class...
//TODO add settings into create?
//TODO try/catch for different subTypes?

//TODO add style on el
//TODO default export


