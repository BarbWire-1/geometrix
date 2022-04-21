import { inspectObject } from "./devTools";

class Point {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
};

 abstract class APolygon {

    radius: number;
    points: number;
    strokeWidth: number;
    readonly length: number;
    readonly grad: number[];
    readonly coords: Point[];
    //     style?: {
    //         opacity: number;
    //         display: 'inherit' | 'inline' | 'none';
    //         strokeWidth?: number;
    // 
    //     }
    //     x1?: number;
    //     y1?: number;
    //     x2?: number;
    //     y2?: number;

    constructor( radius, points, strokeWidth) {
        this.radius = radius;
        this.points = points;
        this.strokeWidth = strokeWidth;
        this.coords = this._calcPoints();
        this.length = this._len(this.coords[1], this.coords[0]);
        this.grad = this._gradient();
    };
    //METHODS
    private _calcPoints() {
        let p: Point[] = []
        //recalc radius depending on strokeW to fit inside
        this.radius -= this.strokeWidth % 2 === 0 ? this.strokeWidth / 2 : Math.floor(this.strokeWidth / 2);
        console.log(this.radius)
        const fract = (2 * Math.PI / this.points);
        console.log(fract)
      
        for (let i: number = 0; i < this.points; i++) {
            p.push(new Point(0, 0))
            p[i].x = Math.round( this.radius * Math.cos(i * fract));
            p[i].y = Math.round(this.radius * Math.sin(i * fract));
        }
        console.log(JSON.stringify(p))
        return p;
        
    };
    // needed for cal
    private _len(s, e) {
        let dx = e.x - s.x;
        let dy = e.y - s.y;
        return Number(Math.sqrt(dx * dx + dy * dy));
    };
    //_gradient for ALL needed to calculate x,y progress!
    private _gradient() {
        let g: number[] = [];
        for (let i: number = 0; i < this.points; i++) {
            //g.push(0)
            let nextI = (i + 1) % this.points;
            let dx = this.coords[nextI].x - this.coords[i].x;
            let dy = this.coords[nextI].y - this.coords[i].y;
            let gr = (dx / dy);
            g.push(gr);
        }
        return g;
    };
};

//TODO : add getters / setters
//TODO : add line connection and fill-logic
//TODO how to use abstract classes? problem still constructor/getters a setters

class Polygon extends APolygon {
    
}
export let test = new Polygon(100, 5, 2)
inspectObject('test', test)

//TODO how avoid showing _rad/rad when introducing getters/setters?
// constructor OR getters/setters???
