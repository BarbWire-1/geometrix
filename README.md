# geometrix
A totally useless playfile with regular polygons
## work in progress:
trying to get an idea how to structure using interfaces/classes/types  

![2022-04-20 12 36 21](polygon-widget.png)   

It now can be used as widget in TS, having 2 types:

**Polygon** : a regular Polygon (mode 0);

**Spyrogon**: here you can change the connection between the polygon points to create regular geometric shapes with 3 to 12 vertices (mode 1).
got some more TODOs on it 😅


___
creating a widget is just 
* copy the folder `polygon-widget`into your app-folder
* copy the file `polygon.defs` into your resources-folder
* add `polygon.defs` import in your `widgets.defs`



```js
<svg>
    <defs>
        <link rel="stylesheet" href="styles.css" />
        <link rel="import" href="/mnt/sysassets/system_widget.defs" />
        <link rel="import" href="polygon.defs" />
    </defs>
</svg>
```

* setting a `<use>` in `index.view` like the following example
```js
<use id="poly0" href="#polygon-widget"  x="168" y="168" opacity = "1"/>
```
* and then instantiate your poly in `app/index.ts` like:

``` js
let poly = createPolygon(0, document.getElementById('poly')) as Polygon;
let spyro = createPolygon(1, document.getElementById('spyro')) as Spyrogon;
```
This will create shapes with the default values:
* radius = 100;
* points = 5;
* strokeWidth = 2;
* next = 1;

To choose custom values you can add these attributes like:

```js
let poly1 = createPolygon(0, document.getElementById('poly1'),120, 12, 10) as Polygon
```
or for the Spyrogon like:
```js
let spyro1 = createPolygon(1, document.getElementById('spyro1'),150, 8, 4, 3) as Spyrogon
```
The additional value here defines the next point ( so line0 goes from p0 to p3, line1 from p1 to p4...)

___

### dynamically:
* 3 to 12 vertices,
* size of circle,
* number of points,
* connection between points (next point),
* fills perline/ fill-themes (1 to ... get applied per %points)
* I also added rotation and an "offset" to your predefined x,y

...and running all (current) "dynamix"

![dynamix](dynamix.gif)


