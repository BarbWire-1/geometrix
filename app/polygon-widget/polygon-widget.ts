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
import { Line, APolygon, Point, iLine } from "./classesInterfaces";
import { validInput } from "./validation";

// ---------------------------------------------------------------------POLYGON-WIDGET------------

export const createPolygon = (mode, el, radius=100, points=5, strokeWidth=2, next=1) => {
    
    //GET ELEMENTS FOR POLYGON
    const gLines = el.getElementById("linesG") as GroupElement;
    const outerLines = el.getElementsByClassName("lines") as unknown as Line[];
    const rotate: {angle: number} = gLines.groupTransform.rotate;
    const scale: { x: number; y: number } = gLines.groupTransform.scale 
    
    class Polygon extends APolygon {
        //readonly id: any;
        protected outerLines: Line[];
        protected _rotate: { angle: number };
        protected _scale: { x: number; y: number }
        protected elX: number;
        protected el: any;
        protected _x: number;
        protected _y: number;
        protected _radius: number;
        protected _points: number;
        protected _strokeWidth: number;
        protected _next: number;
        protected _fill: string;
        
        constructor(radius = 100, points = 5, strokeWidth = 2) {
            
            super();
            this.el = el
            //this.id = el.id;
            this._radius = radius;
            this._points = points
            this._strokeWidth = strokeWidth;
            this.redraw = this._recalc();
            this.lines = outerLines;
            this._x = el.x;
            this._y = el.y;
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
        get strokeWidth() { return el.strokeWidth }
        set strokeWidth(newValue) {
            this._strokeWidth = newValue;
            this._recalc()
        }; 
        
        get x() {return this.el.x}
        set x(newValue) {
            this.el.x = newValue;
        };
        
        get y() { return this.el.y }
        set y(newValue) {
            this.el.y = newValue;
        };
        
        // TODO split from static?
        get rotate() { return this._rotate }
        set rotate(newValue) {
            this._rotate = newValue;
        };
        get scale() { return this._scale }
        set scale(newValue) {
            this._scale = newValue;
        };
        
         
        //THE MATHS
        protected _recalc(): void {
           //TODO do calculating and assigning in one?

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
                p[i].x = Math.round(iRadius * Math.sin(i * fract));
                p[i].y = Math.round(iRadius * -Math.cos(i * fract));
                i++;
            };
            //set to 'none' as if previous i > i would stay inline
            outerLines.forEach(el => {
                el.style.display = 'none'
            });
        
            i = 0;
            while (i < this._points) {
    
                let l: iLine = outerLines[i];

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
        : console.warn('Please check your params!');
        
    return el;
};

export { Polygon, Spyrogon } from './classesInterfaces'

//TODO restructure objects. Wrong use of underscore, I'd say ;)
//TODO try to protect lines x,y somehow. Not sure how to, as must be public to write to inside recalc
//and then can't be changed for polygon?
