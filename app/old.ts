
class Point {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
};

export class Polygon {
    centerX?: number;
    centerY?: number;
    radius: number;
    points: number;
    strokeWidth: number;
    readonly length?: number;
    readonly grad?: number[];
    readonly coords?: Point[];
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
    _calcPoints() {
        let p: Point[] = []
        //recalc radius depending on strokeW to fit inside
        this.radius -= this.strokeWidth % 2 === 0 ? this.strokeWidth / 2 : Math.floor(this.strokeWidth / 2);
        const fract = (2 * Math.PI / this.points);
        //console.log(`fract: ${fract}`)
        let l: Polygon;
        for (let i: number = 0; i < this.points; i++) {
            p.push(new Point(0, 0))
            p[i].x = Math.round(this.centerX + this.radius * Math.cos(i * fract));
            p[i].y = Math.round(this.centerY + this.radius * Math.sin(i * fract));
        }
        return p;
    };
    // needed for cal
    _len(s, e) {
        let dx = e.x - s.x;
        let dy = e.y - s.y;
        return Number(Math.sqrt(dx * dx + dy * dy));
    };
    //_gradient for ALL needed to calculate x,y progress!
    _gradient() {
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

//TODO check if this runs with current setUp, 
//TODO add nextTo and fill/fillChange as method?