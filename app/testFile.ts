import { inspectObject } from "./devTools";

class Point {
    x = 0;
    y = 0;   
}

class Line {
    start: [x1: number, y1: number];
    end: [x2: number, y2: number];
    style: {
        fill: string;
        opacity: number;
        display: 'inherit' | 'inline' | 'none';
        strokeWidth: number;
    }
}

function calcPoints() {
    let p: Point[] = []
    //inner radius depending on strokeW to fit inside
    let iRadius = this.radius;
    iRadius -= this.strokeWidth % 2 === 0
        ? this.strokeWidth / 2
        : Math.floor(this.strokeWidth / 2);

    const fract = (2 * Math.PI / this.points);
    for (let i: number = 0; i < this.points; i++) {
        p.push(new Point())
        //calcs x,y to start pt0 at (0,-radius)relative to PolygonCenter
        //to start at top, running clockwise
        p[i].y = Math.round(iRadius * - Math.cos(i * fract));
        p[i].x = Math.round(iRadius * Math.sin(i * fract));

    };
    //console.log('calcPoints executed!')
    //console.log('p0: ' + JSON.stringify(p[0]))
    this.coords = p
};

interface IPolygon {
    points: number;
    radius: number;
    strokeWidth: number;
    next: number;
    _coords?: Point[];
    _lines?: Line[];        
}

class Polygon implements IPolygon {
    points: number;
    radius: number;
    strokeWidth: number;
    next: number;
   
    constructor(points = 5, radius = 100, strokeWidth = 2, next = 1) {
        this.points = points;
        this.radius = radius;
        this.strokeWidth = strokeWidth;
        this.next = next;
    } 
};

abstract class PolyLayout extends Polygon{
    poly: Polygon;
    coords: Point[];
    lines: Line[];
    
    calcPoints() {
        let p: Point[] = []
        //inner radius depending on strokeW to fit inside
        let iRadius = this.radius;
        iRadius -= this.strokeWidth % 2 === 0
            ? this.strokeWidth / 2
            : Math.floor(this.strokeWidth / 2);

        const fract = (2 * Math.PI / this.points);
        for (let i: number = 0; i < this.points; i++) {
            p.push(new Point())
            //calcs x,y to start pt0 at (0,-radius)relative to PolygonCenter
            //to start at top, running clockwise
            p[i].y = Math.round(iRadius * - Math.cos(i * fract));
            p[i].x = Math.round(iRadius * Math.sin(i * fract));

        };
        //console.log('calcPoints executed!')
        //console.log('p0: ' + JSON.stringify(p[0]))
        this.coords = p
    };
    
}


