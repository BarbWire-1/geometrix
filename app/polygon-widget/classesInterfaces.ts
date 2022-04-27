export class Point {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
};

export class Line {
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
export abstract class APolygon extends Line {

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
    rotate: { angle: number }
};


export interface Spyrogon extends Polygon {
    next: number;
};

