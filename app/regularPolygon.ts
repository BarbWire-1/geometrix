
//import { dumpProperties, inspectObject } from "./devTools";

import { validInput } from './validation';

export class Point  {
    x: number | 0;
    y: number | 0;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
};

//TODO check this **** underscore-use!!!

// creates a fix Polygon (just as is or as bg for progressPoly)
export class Polygon {
    _radius: number | 0;
    _points: number | 0;
    _strokeWidth: number;
    _coords: Point[];

    constructor(radius=100, points=5,strokeWidth=0) {
        this._radius =radius;
        this.points = points;
        this.strokeWidth = strokeWidth;
        this._coords = this.calcPoints();
    }
    //@ts-ignore
    get radius() { return this.radius}
    set radius(newValue) {
        if (newValue) {
            this.radius = newValue;
            this._coords = this.calcPoints()
        }
    }
    
    get points() { return this._points }
    set points(newValue) {
        if (newValue && validInput(newValue) === true) {
            this._points = newValue;
            this._coords = this.calcPoints()
            //inspectObject('coords',this._coords)
        }
    }
    
    get strokeWidth() { return this._strokeWidth }
    set strokeWidth(newValue) { this._strokeWidth = newValue }
    
    
   
    /*
     * 
     * @returns points of the regular polygon with the given attributes
     */
    calcPoints() {
        let p: Point[] = []
        //inner radius depending on strokeW to fit inside
        let iRadius = this._radius;
        iRadius -= this._strokeWidth % 2 === 0
            ? this._strokeWidth / 2
            : Math.floor(this._strokeWidth / 2);
        
        const fract = (2 * Math.PI / this._points);
        for (let i: number = 0; i < this._points; i++) {
            p.push(new Point(0, 0))
            //calcs x,y to start pt0 at (0,-radius)relative to PolygonCenter
            //to start at top, running clockwise
            p[i].y = Math.round(iRadius * - Math.cos(i * fract));
            p[i].x = Math.round(iRadius * Math.sin(i * fract));

        };
        //console.log('calcPoints executed!')
        //console.log('p0: ' + JSON.stringify(p[0]))
        return p;
    };
};


/**
 * 
 * @param radius  100
 * @param points  5
 * @param strokeWidth  2
 * @returns new polygon object with defaults if nothing specified
 */
export const createPoly  = (radius = 100, points = 5, strokeWidth = 2) => {
    if (validInput(points) == true) {
        return new Polygon (radius, points, strokeWidth)
    } return;
}
