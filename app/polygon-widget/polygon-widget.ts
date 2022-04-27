// MIT License
// 
// Copyright(c) 2022 Barbara Kälin
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files(the "Software"), to deal
//     in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


import { validInput } from "./validation";


// -----------------------------------------------------------SUBCLASSES AND INTERFACES------------

class Point {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
};
interface IStyle {
    style: {
        opacity: number;
        display: 'inherit' | 'inline' | 'none';
        fill: string;
    };
}
//use this to restrict properties to needed and desired
//on the SVG elements
class Line implements IStyle {
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

    iterable: boolean;
    enumerable: boolean;
};

// abstract structure
abstract class APolygon extends Line {

    protected _x: number;
    protected _y: number;
    protected _radius: number;
    protected _points: number;
    protected _strokeWidth: number;
    protected _next: number;
    protected _fill: string;

    lines: Line[];
    protected redraw: void;
};


// ---------------------------------------------------------------------POLYGON-WIDGET------------

export const createPolygon = (mode, el, radius=100, points=5, strokeWidth=2, next=1) => {
    
    //GET ELEMENTS FOR POLYGON
    const gLines = el.getElementById("linesG") as GroupElement;
    const outerLines = el.getElementsByClassName("lines") as unknown as Line[];
    const style = el.style
    // let x = gLines.groupTransform.translate.x;
    // let y = gLines.groupTransform.translate.y;
    
    const x = el.x;
    const y = el.y;
   
   
    class PolygonBase extends APolygon {
        protected outerLines: Line[];
        center: Point[];  
        //lines: Line[];
       
    
        constructor( radius=100, points=5, strokeWidth=2 ){
            super();
            this._radius = radius;
            this._points = points
            this._strokeWidth = strokeWidth;
            this.redraw = this._recalc();
            this.lines = outerLines;// connection to SVG elements
            this._x = x
            this._y = y;
            this._next = 1;
            this.style = style
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
        
        get strokeWidth() { return el.style.strokeWidth }
        set strokeWidth(newValue) {
            this._strokeWidth = newValue;
            this._recalc()
        };   
    
        get x() { return this._x }
            set x(newValue) {
            console.log(`${el.id}.x set:${el.x}`)// is id undefined? oh, not yet created
            this._x = newValue;
        };
    
        get y() { return this._y }
        set y(newValue) {
            this._y = newValue;
            };
        
        //METHODS
        protected _recalc(): void {
            //el.x = 168;;
            //console.log(el.x)
            //el.y = this.y;
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
            //set to 'none' as if previous i > i would stay inline
            outerLines.forEach(el => {
                el.style.display = 'none'
            });
        
            i = 0;
            while (i < this._points) {
                //let l = this._lines[i];// 🚫 TypeError: Cannot read property '0' of undefined
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

    // check for settings in constructor and create shape 
    // depending on chosen mode    
    el = validInput(points) === true
        ? mode == 0
            ? new Polygon(radius, points, strokeWidth)
            : mode == 1
                ? new Spyrogon(radius, points, strokeWidth, next)
                : console.warn('Please check your params!')
        : undefined;
        
    return el;
};

    

export interface Polygon {
    radius: number;
    points: number;
    strokeWidth: number;
    lines: Line[]
    x: number;
    y: number;
    style: {
        opacity: number;
        display: 'inherit' | 'inline' | 'none';
        fill: string;
       
    };
};


export interface Spyrogon extends Polygon {
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
 * /**
 * Originally planned to make an Interface here, but no modifications allowed
 * so I'd have to do that in each extending class separately.
 * That's why I go with an abstract class instead.
 */



//TODO difference interface vs type??
//TODO: extending class vs abstr class...




//TODO default export
//TODO add rotate? on gLines?
//TODO 1.0 x,y!!!!!!! working from css and SVG but not in TS??? WTF???
//values get logged from set, also those from ts. But they don't get applied

//TODO 2.0 : where is really el needed in class?
//Can I detangle this and only have elements and creation in function?
// would this be meaningful?

