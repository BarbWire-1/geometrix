export class Point {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
};

export interface Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    style: Style;
    iterable: boolean;
    enumerable: boolean;
    
    
};

// abstract structure
export abstract class APolygon implements Line {
    readonly x1: number;
    readonly y1: number;
    readonly x2: number;
    readonly y2: number;
    style: Style;
    readonly iterable: boolean;
    readonly enumerable: boolean;

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
    rotate: { angle: number };
    scale: { x: number; y: number }
};


export interface Spyrogon extends Polygon {
    next: number;
};

