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


//import { inspectObject } from "../devTools";
import { Line, APolygon, Point } from "./classesInterfaces";

import { validInput } from "./validation";

// ---------------------------------------------------------------------POLYGON-WIDGET------------

export const createPolygon = (mode, el, radius=100, points=5, strokeWidth=2, next=1) => {
    
    //GET ELEMENTS FOR POLYGON
    const gLines = el.getElementById("linesG") as GroupElement;
    const outerLines = el.getElementsByClassName("lines") as unknown as Line[];
    
    // get x,y of included elemnts relative to the <use> itself
    let elX = gLines.groupTransform.translate.x ;
    let elY = gLines.groupTransform.translate.y;
    const rotate: {angle: number} = gLines.groupTransform.rotate;
    const scale: { x: number; y: number } = gLines.groupTransform.scale 
    
    

    let count = 0;
    console.log(`${el.id}: x = ${el.x}`)//poly0: x = 100 // in SVG
    
    class Polygon extends APolygon {
        readonly id: any;
        protected outerLines: Line[];
        _rotate: { angle: number };
        _scale: { x: number; y: number }
        
        constructor(radius = 100, points = 5, strokeWidth = 2,x=0, y=0) {
            
            super();
            this.id = el.id;
            this._radius = radius;
            this._points = points
            this._strokeWidth = strokeWidth;
            this.redraw = this._recalc();
            this.lines = outerLines;// connection to SVG elements
            this._x = x = el.x;// deperate but useless try
            this._y = x = el.y;
            this.style = el.style;
            this._rotate = rotate;
            this._scale = scale

        };
        
        //GETTER/SETTER
        get radius() { return this._radius }
        set radius(newValue) {
            this._radius = newValue;
            this._recalc()
            };
        get points() { return this._points }
        set points(newValue) {
            validInput(this._points);
            this._points = newValue;
            this._recalc()
        };
        get strokeWidth() { return el.style.strokeWidth }
        set strokeWidth(newValue) {
            this._strokeWidth = newValue;
            this._recalc()
        }; 
        get x() { console.log(`${this.id}: x = ${this._x}`); return this._x }
        // this logs the correct value. set in SVG or overwritten from TS, but doesn't get applied
        set x(newValue) {
            this._x = newValue;
            this._recalc()
        };
        get y() { return this._y }
        set y(newValue) {
            this._y = newValue;
            this._recalc()
        };
        get rotate() { return this._rotate }
        set rotate(newValue) {
            this._rotate = newValue;
            //this._recalc()
        };
        get scale() { return this._scale }
        set scale(newValue) {
            this._scale = newValue;
        };
        
         
        //METHODS
        protected _recalc(): void {
           
           
            count++;
            console.log(`recalc() called ${count} times.`)
            
            let p: Point[] = []
                
             //recalc radius depending on strokeW to fit inside
            let iRadius: number = this._radius;
            iRadius -= Math.round(this._strokeWidth / 2);
            const fract: number = (2 * Math.PI / this._points);
                
            let i: number = 0;
            while (i < this._points) {
                p.push(new Point(0, 0))
                let centerX = el.x
                let centerY = el.y
                    
                //calcs x,y to start pt0 at (0,-radius)relative to PolygonCenter
                 //to start at top, running clockwise
                p[i].x = //centerX +
                    Math.round(iRadius * Math.sin(i * fract));
                p[i].y = //centerY +
                    Math.round(iRadius * -Math.cos(i * fract));
                i++;
            };
            //set to 'none' as if previous i > i would stay inline
            outerLines.forEach(el => {
                el.style.display = 'none'
            });
        
            i = 0;
            while (i < this._points) {
    
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

    class Spyrogon extends Polygon {
        
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

export {Polygon, Spyrogon } from './classesInterfaces'

 