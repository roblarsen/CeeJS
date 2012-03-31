/**
 * @license Canvas JavaScript Library v0.1
 * some day:
 * canvasjs.net
 * for now, visit:
 *
 * http://htmlcssjavascript.com
 *
 * Copyright 2011, Rob Larsen
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://bobholtwebdev.com/license
 *
 * Date: 2011.12.1
 */

/**
* @todo animations - https://developer.mozilla.org/en/Canvas_tutorial/Basic_animations
* @todo Manage current position better. We're fuzzy on what x,y actually means. It's easy enough to give options, we just need to come up with a default.
* For starters, ADD boundingBox property for shapes, which we can then expose as whatever current X,Y scheme we'd default to and then then whatever people want
* then set up a configruation piece. Set default position when the Canvas is created and then allow overrides at any point.
* Something like ctx.setOrigin ( args )
* @todo DOCUMENTATION
* @todo BUILD SCRIPT
*/

(function(window) {
    "use strict";
    var document = window.document;
    var Canvas = (function() {

        // Define a local copy of Canvas
        var Canvas = function( selector , params ) {
            return new Canvas.prototype._init( selector );
        };

        Canvas.prototype = {

/**
 * Creates a new Canvas object
 *  @name CanvasJS
 *  @function
 *  @constructor
 *  @param  {string} selector a string indicating the id of an HTML Canvas element or the name of the Canvas Element to be createed
 *  @param {object} params An object containing the following paramters
 *  @param  {string} params.fillStyle - default fill style. Defaults to "#000000";
 *  @param  {string} params.font - default font. Defaults to "10px sans-serif";
 *  @param  {string} params.globalAlpha - default alpha. Defaults to 1;
 *  @param  {string} params.globalCompositeOperation - Default global composition operation. Defaults to "source-over";
 *  @param  {string} params.lineCap - Default line cap. Defaults to "butt";
 *  @param  {string} params.lineJoin - Default line join. Defaults to "miter";
 *  @param  {string} params.lineWidth - Default line width. Defaults to 1;
 *  @param  {string} params.miterLimit - Default miter limit. Defaults to 10;
 *  @param  {string} params.shadowBlur - Default shadowBlur. Defaults to 0;
 *  @param  {string} params.shadowColor - Default shadowColor. Defaults to "rgba(0, 0, 0, 0)";
 *  @param  {string} params.shadowOffsetX - Default shadodOffsetX. Defaults to 0;
 *  @param  {string} params.shadowOffsetY - Default shadowOffsetY. Defaults to 0;
 *  @param  {string} params.strokeStyle - Default strokeStyle. Defaults to "#000000";
 *  @param  {string} params.textAlign - Default textAlign. Defaults to "start";
 *  @param  {string} params.textBaseline - Default textBaseline. Defaults to "alphabetic";
 */
            _init: function( selector, params ) {
                params = params || {};
                var container;
                if ( document.getElementById( selector ) ) {
                    container = document.getElementById( selector );
                } else {
                    container = document.createElement("canvas");
                    container.width = params.width || "100";
                    container.height = params.height || "100";
                    container.id= selector;

                }
                if (container.nodeName.toLowerCase() !== "canvas") {
                    var canvas = document.createElement("canvas");
                    canvas.width = container.offsetHeight;
                    canvas.height = container.offsetWidth;
                    canvas.id = "bigc";
                    container.appendChild(canvas);
                    context = document.getElementById("bigc");
                    throw "The provided ID wasn't a canvas element. A canvas element with id 'bigc' created as a child of the supplied node.";
                }
                var xCurrentPos = 0,
                    yCurrentPos = 0,
                    bbCurrent = null,
                    context = container.getContext('2d');
                /* Default properties
                *  These are all available to set at intialization
                */

                context.fillStyle = params.fillStyle || context.fillStyle;
                context.font = params.font || context.font;
                context.globalAlpha = params.globalAlpha || context.globalAlpha;
                context.globalCompositeOperation = params.globalCompositeOperation || context.globalCompositeOperation;
                context.lineCap = params.lineCap || context.lineCap;
                context.lineJoin = params.lineJoin || context.lineJoin;
                context.lineWidth = params.lineWidth || context.lineWidth;
                context.miterLimit = params.miterLimit || context.miterLimit;
                context.shadowBlur = params.shadowBlur || context.shadowBlur;
                context.shadowColor = params.shadowColor || context.shadowColor;
                context.shadowOffsetX = params.shadodOffsetX || context.shadowOffsetX;
                context.shadowOffsetY = params.shadowOffsetY || context.shadowOffsetY;
                context.strokeStyle = params.strokeStyle || context.strokeStyle;
                context.textAlign = params.textAlign || context.textAlign;
                context.textBaseline = params.textBaseline || context.textBaseline;

/**
 * Get or set the current x and y coordinates of the 'cursor'
 * @name currentPos
 * @function
 * @param {integer} x the x coordinate
 * @param {integer} y the new y coordinate
 */
                var currentPos = function( x , y) {
                    if (x !== undefined &&
                        y !== undefined &&
                        typeof(x) === "number" &&
                        typeof(y) === "number") {

                        xCurrentPos = x;
                        yCurrentPos = y;
                        return {
                            x: xCurrentPos,
                            y: yCurrentPos
                        };
                    }
                    else {
                        return {
                            x: xCurrentPos,
                            y: yCurrentPos
                            };
                        }
                    },
/** @ignore */
                    _valOrDefault = function(x, current){
                        if( x !== undefined &&
                            typeof(x) === "number"){
                            return x;
                        }
                        else {
                            return current;
                        }
                    },
/**
 * Adds an arc with the given control points and radius to the current subpath, connected to the previous point by a straight line.
 * @name arc
 * @function
 * @param {integer} params.x the x coordinate
 * @param {integer} params.y the y coordinate
 * @param {integer} params.radius the radius of the arc
 * @param {integer} params.start the starting angle
 * @param {integer} params.end the ending angle
 * @param {Boolean} [params.counter] Omitted or set to false this argument will arc counter/anti clockwise
 */

                    arc = function(params) {
                        params = params || {};
                        var x = _valOrDefault(params.x, xCurrentPos),
                            y = _valOrDefault(params.y, yCurrentPos),
                            radius = params.radius || 0,
                            start = params.start || 0,
                            end = params.end || Math.PI * 2,
                            counter = params.counter || false;

                        context.arc(x, y, radius, start, end, counter);
                        return this;
                    },
/**
 * Adds points to the subpath such that the arc described by the circumference of the circle described by the arguments, starting at the given start angle and ending at the given end angle, going in the given direction (defaulting to clockwise), is added to the path, connected to the previous point by a straight line.
 * @name arcTo
 * @function
 * @param {integer} x1 the starting x coordinate
 * @param {integer} y1 the starting y coordinate
 * @param {integer} x2 the ending x coordinate
 * @param {integer} y2 the ending y coordinate
 * @param {integer} params.x the x coordinate
 * @param {integer} params.y the y coordinate
 */
                    arcTo = function(x1, y1, x2, y2, radius) {
                        context.arcTo(x1, y1, x2, y2, radius);
                        currentPos(x2,y2);
                        return this;
                    },
/**
 * Resets the current path.
 * @name beginPath
 * @function
 */
                    beginPath = function() {
                        context.beginPath();
                        return this;
                    },
/**
 * Adds the given point to the current subpath, connected to the previous one by a cubic B�zier curve with the given control points.
 * @name bezierCurveTo
 * @function
 * @param {integer} cp1x the starting control point x coordinate
 * @param {integer} cp1y the starting control point x coordinate
 * @param {integer} cp2y the ending control point x coordinate
 * @param {integer} cp2y the ending control point x coordinate
 * @param {integer} x the ending x coordinate
 * @param {integer} y the ending y coordinate
 */
                    bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
                        context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
                        currentPos(x,y);
                        return this;
                    },
/**
 * Called without parameters, it returns the current bounding box of the last drawn shape- specifically an object containing the top left, top, top right, right, bottom right, bottom, bottom left and left coordinates.
 *
 * it's also called internally to set the property whenever an applicable shape is drawn.
 * @name boundingBox
 * @function
 *
 */


                    boundingBox = function(params){
                        var h,w,leftx,topy;
                        if(params === undefined){
                            return bbCurrent;
                        }
                        else if(params.x1 !== undefined &&
                                params.y1 !== undefined &&
                                params.x2 !== undefined &&
                                params.y2 !== undefined){

                            h  = Math.abs(params.y2 - params.y1);
                            w  = Math.abs(params.x2 - params.x1);
                            leftx =  (params.y1 < params.y2) ? params.y1 : params.y2;
                            topy = (params.x1 < params.x2) ? params.x1 : params.x2;
                        }
                        else if(params.x !== undefined &&
                                params.y !== undefined &&
                                params.w !== undefined &&
                                params.h !== undefined){
                            h  = params.h;
                            w  = params.w;
                            leftx = params.x;
                            topy = params.y;
                        }
                        else if(params.cx !== undefined &&
                                params.cy !== undefined &&
                                params.r  !== undefined){
                            h = w = 2 * params.r;
                            leftx = params.cx - params.r;
                            topy = params.cy - params.r;
                        }
                        else if(params.x !== undefined &&
                                params.y !== undefined){
                            var current = currentPos();
                            boundingBox({x1:params.x, y1:params.y, x2: current.x, y2: current.y});
                        }
                        else {
                            return bbCurrent;
                        }

                        var tl = {x: leftx,         y: topy},
                            t  = {x: leftx + w / 2, y: topy},
                            tr = {x: leftx + w,     y: topy},
                            r  = {x: leftx + w,     y: topy + h / 2},
                            br = {x: leftx + w,     y: topy + h},
                            b  = {x: leftx + w / 2, y: topy + h},
                            bl = {x: leftx,         y: topy + h},
                            l  = {x: leftx,         y: topy + h / 2};

                        bbCurrent = {
                            'tl': tl,
                            't': t,
                            'tr': tr,
                            'r': r,
                            'br': br,
                            'b': b,
                            'bl': bl,
                            'l': l
                        };

                        return bbCurrent;
                    },
/**
 * Draws a circle with the supplied starting x,y, radius, fillStyle, and strokeStyle
 * @name circle
 * @function
 * @params.x {integer} the starting x coordinate
 * @params.y {integer} the starting y coordinate
 * @params.radius {radius} the radius of the circle
 * @params.fillStyle {Any} the fill style for the circle or false to suppress the fill
 * @params.strokeStyle {Any} the stroke style for the circle or false to suppress the stroke
 */

                    circle = function( params ) {
                        //@todo expand params to set any style appliable to a rectangle
                        params = params || {};
                        var x = _valOrDefault(params.x, xCurrentPos),
                            y = _valOrDefault(params.y, yCurrentPos),
                            radius = params.radius || 10,
                            fillStyle = params.fillStyle || false,
                            strokeStyle = params.strokeStyle || false;
                        moveTo(x, y);
                        beginPath();
                        arc({
                            x: x,
                            y: y,
                            radius: radius
                        });
                        if (fillStyle) {
                            context.fillStyle = fillStyle;
                            context.fill();
                        }
						if (strokeStyle) {
							context.strokeStyle = strokeStyle;
	                        stroke();
						}
                        closePath();

                        boundingBox({cx:x,cy:y,r:radius});

                        return this;
                    },

/**
 * Clears a rectangular area, making it fully transparent
 * @name clearRect
 * @function
 *  @params.x  {Integer} Starting x coordinate. Defaults to the current position.
 *  @params.y  {Integer} Starting y coordinate. Defaults to the current position.
 *  @params.width {Integer} Rectangle width. Defaults to 0.
 *  @params.height {Integer} Rectangle height. Defaults to 0.
 */
                    clearRect = function(params) {
                        params = params || {};
                        var x = _valOrDefault(params.x, xCurrentPos),
                            y = _valOrDefault(params.y, yCurrentPos),
                            width = params.width || 0,
                            height = params.height || 0;
                        context.clearRect(x, y, width, height);

                        boundingBox({x:x, y:y, w:width, h:height});

                        return this;
                    },
/**
 * @name clip
 * @function
 */
                    clip = function() {
                        context.clip();
                        return this;
                    },
/**
 * @name closePath
 * @function
 */
                    closePath = function() {
                        context.closePath();
                        return this;
                    },
/**
 * @name createImageData
 * @function
 */
                    createImageData = function(height, width) {
                        context.closePath(height, width);
                        return this;
                    },
/**
 * @name createLinearGradient
 * @function
 */
                    createLinearGradient = function(x0, y0, x1, y1) {
                        context.createLinearGradient(x0, y0, x1, y1);
                        return this;
                    },
/**
 * @name createPattern
 * @function
 */
                    createPattern = function(img, repetition) {
                        context.createPattern(img, repetition);
                        return this;
                    },
/**
 * @name createRadialGradient
 * @function
 */
                    createRadialGradient = function( x0 , y0 , r0 , x1 , y1 ,  r1  ){
                        context.createRadialGradient( x0 , y0 , r0 , x1 , y1 ,  r1 );
                        return this;
                    },
/**
 * @name drawImage
 * @function
 */
                    drawImage = function(img, x, y) {
                        if (img.nodeName == null) {
                            var newImg = new Image();
                            newImg.src = img;
                            img = newImg;
                        }
                        img.onload = function() {
                            context.drawImage(img, x, y);
                        };
                        x = _valOrDefault(x, xCurrentPos);
                        y = _valOrDefault(y, yCurrentPos);
                        currentPos(x,y);
                        return this;
                    },
/**
 * @name fill
 * @function
 */
                    fill = function() {
                        context.fill();
                        return this;
                    },
/**
 * Draws a circle with the supplied starting x,y, radius and fillStyle and no stroke
 * @name fillCircle
 * @function
 * @params.x {integer} the starting x coordinate
 * @params.y {integer} the starting y coordinate
 * @params.radius {radius} the radius of the circle
 * @params.fillStyle {Any} the fill style for the circle. a falsey value will use the current context fillStyle
 */
                    fillCircle = function(params){
                        params = params || {};
                        var x = _valOrDefault(params.x, xCurrentPos),
                            y = _valOrDefault(params.y, yCurrentPos),
                            radius = params.radius || 10,
                            fillStyle = params.fillStyle || context.fillStyle;

						this.circle({
							x: x,
							y: y,
							radius: radius,
							fillStyle: fillStyle,
							strokeStyle: false
						});

						return this;
                    },
/**
 * @name fillRect
 * @function
 */
                    fillRect = function(x, y, width, height) {
                        context.fillRect(x, y, width, height);
                        currentPos(x,y);

                        boundingBox({x:x, y:y, w:width, h:height});

                        return this;
                    },
/**
 * @name fillStyle
 * @function
 */
                    fillStyle = function(color) {
                        if (color !== undefined) {
                            context.fillStyle = color;
                            return this;
                        }
                        else {
                            return context.fillStyle;
                        }
                    },
/**
 * @name fillText
 * @function
 */
                    fillText = function(text, x, y, maxWidth) {
                        if (maxWidth === undefined ){
                             context.fillText(text, x, y);
                        } else {
                             context.fillText(text, x, y, maxWidth);

                        }

                        currentPos(x,y);
                        return this;
                    },
/**
 * @name font
 * @function
 */
                    font = function(declaration) {
                        if (declaration !== undefined) {
                            context.font = declaration;
                            return this;
                        }
                        else {
                            return context.font;
                        }
                    },
/**
 * @name getImageData
 * @function
 */
                    getImageData = function( x, y, width, height ){
                        currentPos(x,y);
                        return context.getImageData( x, y, width, height );
                    },
/**
 * @name globalAlpha
 * @function
 */
                    globalAlpha = function(num) {
                        if (num !== undefined) {
                            context.globalAlpha = num;
                            return this;
                        }
                        else {
                            return context.globalAlpha;
                        }
                    },
/**
 * @name globalCompositeOperation
 * @function
 */
                    globalCompositeOperation = function(op) {
                        if (op !== undefined) {
                            context.globalCompositeOperation = op;
                            return this;
                        }
                        else {
                            return context.globalCompositeOperation;
                        }
                    },
/**
 * @name isPointInPath
 * @function
 */
                    isPointInPath = function( x , y ){
                        //@todo does this make sense to update the x, y?
                        return context.isPointInPath( x , y );
                    },
/**
 * @name line
 * @function
 */
                    line = function(params) {
                        params = params || {};
                        var x = _valOrDefault(params.x, xCurrentPos),
                            y = _valOrDefault(params.y, yCurrentPos),
                            hypotenuse = params.distance || 0,
                            angle = params.angle % 360 || 0,
                            radians = math.radians(angle),
                            a = Math.sin(radians) * hypotenuse,
                            b = Math.cos(radians) * hypotenuse,
                            newX = x + b,
                            newY = y + a;

                        context.moveTo(x, y);
                        context.lineTo(newX, newY);
                        currentPos(newX,newY);

                        boundingBox({x1:x, y1:y, x2:newX, y2: newY});

                        return this;
                    },
/**
 * @name lineCap
 * @function
 */
                    lineCap = function(cap) {
                        if (cap !== undefined) {
                            context.lineCap = cap;
                            return this;
                        }
                        else {
                            return context.lineCap;
                        }
                    },
/**
 * @name lineJoin
 * @function
 */
                    lineJoin = function(join) {
                        if (join !== undefined) {
                            context.lineJoin = join;
                            return this;
                        }
                        else {
                            return context.lineJoin;
                        }
                    },
/**
 * @name lineTo
 * @function
 */
                    lineTo = function(x, y) {
                        context.lineTo(x, y);
                        boundingBox({x:x, y:y});

                        currentPos(x,y);

                        return this;
                    },
/**
 * @name lineWidth
 * @function
 */
                    lineWidth = function(width) {
                        if (width !== undefined) {
                            context.lineWidth = width;
                            return this;
                        }
                        else {
                            return context.lineWidth;
                        }
                    },
/**
 * @name math
 * @function
 */
                    math = {
                        cosec: function( num ) {
                            return 1 / Math.sin(num);
                        },
                        sec: function( num ) {
                            return 1 / Math.cos(num);
                        },
                        radians: function( degrees ) {
                            return degrees * (Math.PI / 180);
                        }
                    },
/**
 * @name measureText
 * @function
 */
                    measureText = function( string ){
                        return context.measureText( string );
                    },
/**
 * @name miterLimit
 * @function
 */
                    miterLimit = function(limit) {
                        if (limit !== undefined) {
                            context.miterLimit = limit;
                            return this;
                        }
                        else {
                            return context.miterLimit;
                        }
                    },
/**
 * @name moveTo
 * @function
 */
                    moveTo = function(x, y) {
                        context.moveTo(x, y);
                        currentPos(x,y);
                        return this;
                    },
/**
 * @name putImageData
 * @function
 */
                    putImageData = function( imageData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight ) {
                        currentPos(x,y);
                        context.putImageData( imageData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight );
                        return this;
                    },
/**
 * @name quadraticCurveTo
 * @function
 */
                    quadraticCurveTo = function(cp1x, cp1y, x, y) {
                        currentPos(x,y);
                        context.quadraticCurveTo(cp1x, cp1y, x, y);
                        return this;
                    },
/**
 * @name quadraticCurveToFixed
 * @function
 */
                    quadraticCurveToFixed = function(cpx, cpy, x, y) {
                        /* for FF1.5 - from MDN: https://developer.mozilla.org/en/Canvas_tutorial/Drawing_shapes
                        For the equations below the following variable name prefixes are used:
                            qp0 is the quadratic curve starting point (you must keep this from your last point sent to moveTo(), lineTo(), or bezierCurveTo() ).
                            qp1 is the quadratic curve control point (this is the cpx,cpy you would have sent to quadraticCurveTo() ).
                            qp2 is the quadratic curve ending point (this is the x,y arguments you would have sent to quadraticCurveTo() ).
                        We will convert these points to compute the two needed cubic control points (the starting/ending points are the same for both
                        the quadratic and cubic curves.

                        The exact equations for the two cubic control points are:
                            cp0 = qp0 and cp3 = qp2
                            cp1 = qp0 + (qp1 - qp0) * ratio
                            cp2 = cp1 + (qp2 - qp0) * (1 - ratio)
                        where ratio = (sqrt(2) - 1) * 4 / 3 exactly (approx. 0.5522847498307933984022516322796)
                        if the quadratic is an approximation of an elliptic arc, and the cubic must approximate the same arc, or
                        ratio = 2.0 / 3.0 for keeping the same quadratic curve.

                        In the code below, we must compute both the x and y terms for each point separately.

                        cp1x = qp0x + (qp1x - qp0x) * ratio;
                        cp1y = qp0y + (qp1y - qp0y) * ratio;
                        cp2x = cp1x + (qp2x - qp0x) * (1 - ratio);
                        cp2y = cp1y + (qp2y - qp0y) * (1 - ratio);

                        We will now
                            a) replace the qp0x and qp0y variables with currentX and currentY (which *you* must store for each moveTo/lineTo/bezierCurveTo)
                            b) replace the qp1x and qp1y variables with cpx and cpy (which we would have passed to quadraticCurveTo)
                            c) replace the qp2x and qp2y variables with x and y.
                        which leaves us with:
                        */
                        var ratio = 2.0 / 3.0; // 0.5522847498307933984022516322796 if the Bezier is approximating an elliptic arc with best fitting
                        var cp1x = xCurrentPos + (cpx - xCurrentPos) * ratio;
                        var cp1y = yCurrentPos + (cpy - yCurrentPos) * ratio;
                        var cp2x = cp1x + (x - xCurrentPos) * (1 - ratio);
                        var cp2y = cp1y + (y - yCurrentPos) * (1 - ratio);

                        // and now call cubic Bezier curve to function
                        bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);

                        currentPos(x,y);
                        return this;
                    },
/**
 * @name rect
 * @function
 */
                    rect = function(x, y, width, height) {
                        currentPos(x,y);
                        context.rect(x, y, width, height);

                        boundingBox({x:x, y:y, w:width, h:height});

                        return this;
                    },

                    /*
                     * Function: rectangle
                     *
                     * Draws a rectangle in the canvas container
                     *
                     * Parameters:
                     *  params.x - (Integer) Starting x coordinate. Defaults to the current position.
                     *  params.y - (Integer) Starting y coordinate. Defaults to the current position.
                     *  params.width - (Integer) Rectangle width. Defaults to 0.
                     *  params.height - (Integer) Rectangle height. Defaults to 0.
                     *  params.fillStyle - (String) The valid fillStyle.
                     *
                     * Returns:
                     *  An object containing the current x and y positions.
                     *
                     * See Also:
                     *
                     *  <circle>
                     *  <clearRect>
                     */
/**
 * @name rectangle
 * @function
 */
                    rectangle = function(params) {
                        //@todo expand params to set any style appliable to a rectangle

                        params = params || {};
                        var x,y,width,height;
                        if( params.x1 !== undefined &&
                            params.y1 !== undefined &&
                            params.x2 !== undefined &&
                            params.y2 !== undefined){

                            x = _valOrDefault(params.x1, xCurrentPos);
                            y = _valOrDefault(params.y1, yCurrentPos);
                            width = Math.abs(x - params.x2);
                            height = Math.abs(y - params.y2);
                        }
                        else if(params.x !== undefined &&
                                params.y !== undefined &&
                                params.width !== undefined &&
                                params.height !== undefined){

                            x = _valOrDefault(params.x, xCurrentPos);
                            y = _valOrDefault(params.y, yCurrentPos);
                            width = _valOrDefault(params.width, 0);
                            height = _valOrDefault(params.height, 0);
                        }
                        else {
                            return this;
                        }

                        var fillStyle = params.fillStyle || false,
                            lineWidth = params.lineWidth || false;

                        if (lineWidth) {
                            context.lineWidth = lineWidth;
                        }
                        if (fillStyle) {
                            context.fillStyle = fillStyle;
                            fillRect(x, y, width, height);
                        } else {
                            strokeRect(x, y, width, height);
                        }

                        boundingBox({x:x, y:y, w:width, h:height});
                        return this;
                    },
/**
 * Resets the canvas container, erasing the currently displayed drawings.
 * @name reset
 * @function
 * @returns An object containing the current x and y positions.
 */
                    reset = function() {
                        container.width = container.width;
                        currentPos(0,0);
                        return this;
                    },
/**
 * @name restore
 * @function
 */
                    restore = function() {
                        context.restore();
                        return this;
                    },
/**
 * @name rotate
 * @function
 */
                    rotate = function( angle ) {
                        context.rotate( angle );
                        return this;
                    },
/**
 * @name roundedRectangle
 * @function
 */
                    roundedRectangle = function(x, y, width, height, radius) {
                        // from MDN: https://developer.mozilla.org/en/Canvas_tutorial/Drawing_shapes
                        beginPath();
                        moveTo(x, y + radius);
                        lineTo(x, y + height - radius);
                        quadraticCurveTo(x, y + height, x + radius, y + height);
                        lineTo(x + width - radius, y + height);
                        quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
                        lineTo(x + width, y + radius);
                        quadraticCurveTo(x + width, y, x + width - radius, y);
                        lineTo(x + radius, y);
                        quadraticCurveTo(x, y, x, y + radius);
                        stroke();

                        boundingBox({x:x, y:y, w:width, h:height});
                        return this;
                    },
/**
 * @name save
 * @function
 */
                    save = function() {
                        context.save();
                        return this;
                    },
/**
 * @name scale
 * @function
 */
                    scale = function( x , y ) {
                        context.scale( x , y);
                        return this;
                    },
/**
 * @name setTransform
 * @function
 */
                    setTransform = function( matrix11 , matrix12 , matrix21 , matrix22 , x , y ){
                        context.setTransform(  matrix11 , matrix12 , matrix21 , matrix22 , x , y );
                        return this;
                    },
/**
 * @name shadowBlur
 * @function
 */
                    shadowBlur = function(num) {
                        if (num !== undefined) {
                            context.shadowBlur = num;
                            return this;
                        }
                        else {
                            return context.shadowBlur;
                        }
                    },
/**
 * @name shadowColor
 * @function
 */
                    shadowColor = function(color) {
                        if (color !== undefined) {
                            context.shadowColor = color;
                            return this;
                        }
                        else {
                            return context.shadowColor;
                        }
                    },
/**
 * @name shadowOffsetX
 * @function
 */
                    shadowOffsetX = function(num) {
                        if (num !== undefined) {
                            context.shadowOffsetX = num;
                            return this;
                        }
                        else {
                            return context.shadowOffsetX;
                        }
                    },
/**
 * @name shadowOffsetY
 * @function
 */
                    shadowOffsetY = function(num) {
                        if (num !== undefined) {
                            context.shadowOffsetY = num;
                            return this;
                        }
                        else {
                            return context.shadowOffsetY;
                        }
                    },
/**
 * Gets/Sets shadowOffsetX and shadowOffsetY in one call.
 * Passing one parameter sets both shadowOffsetX and shadowOffsetY to the same value
 * Passing no parameters returns an object containing the x and y offsets
 * shadowOffset().x === shadowOffsetX() && shadowOffset().y === shadowOffsetY()
 *
 * @name shadowOffset
 * @function
 * @param {integer} x shadowOffsetX
 * @param {integer} y shadowOffsetY
 */
					shadowOffset = function(x, y) {
						if (x !== undefined) {
							context.shadowOffsetX = x;

							if (y !== undefined) {
								context.shadowOffsetY = y;
							} else {
								context.shadowOffsetY = x;
							}
							return this;
						} else {
							return {
								x: context.shadowOffsetX,
								y: context.shadowOffsetY
							};
						}
                    },
/**
 * Draws a circle with the supplied starting x,y, radius and strokeStyle and no fill
 * @name strokeCircle
 * @function
 * @params.x {integer} the starting x coordinate
 * @params.y {integer} the starting y coordinate
 * @params.radius {radius} the radius of the circle
 * @params.strokeStyle {Any} the stroke style for the circle. a falsey value will use the current context strokeStyle
 */
                    strokeCircle = function(params){
                        params = params || {};
                        var x = _valOrDefault(params.x, xCurrentPos),
                            y = _valOrDefault(params.y, yCurrentPos),
                            radius = params.radius || 10,
							strokeStyle = params.strokeStyle || context.strokeStyle;

						this.circle({
							x: x,
							y: y,
							radius: radius,
							fillStyle: false,
							strokeStyle: strokeStyle
						});

						return this;
                    },
/**
 * @name strokeStyle
 * @function
 */
                    strokeStyle = function(color) {
                        if (color !== undefined) {
                            context.strokeStyle = color;
                            return this;
                        }
                        else {
                            return context.strokeStyle;
                        }
                    },
/**
 * @name strokeRect
 * @function
 */
                    strokeRect = function(x, y, width, height) {
                        currentPos(x,y);
                        context.strokeRect(x, y, width, height);
                        return this;
                    },
/**
 * @name strokeText
 * @function
 */
                    strokeText = function(text, x, y, maxWidth) {
                        currentPos(x,y);
                        context.strokeText(text, x, y, maxWidth);
                        return this;
                    },
/**
 * @name stroke
 * @function
 */
                    stroke = function() {
                        context.stroke();
                        return this;
                    },
/**
 * @name textAlign
 * @function
 */
                    textAlign = function(align) {
                        if (align !== undefined) {
                            context.textAlign = align;
                            return this;
                        }
                        else {
                            return context.textAlign;
                        }
                    },
/**
 * @name textBaseline
 * @function
 */
                    textBaseline = function(baseline) {
                        if (baseline !== undefined) {
                            context.textBaseline = baseline;
                            return this;
                        }
                        else {
                            return context.textBaseline;
                        }
                    },
/**
 * @name transform
 * @function
 */
                    transform = function( matrix11 , matrix12 , matrix21 , matrix22 , x , y ){
                        currentPos(x,y);
                        context.transform( matrix11 , matrix12 , matrix21 , matrix22 , x , y );
                        return this;
                    },
/**
 * @name translate
 * @function
 */
                    translate = function(x, y){
                        currentPos(x,y);
                        context.translate( x , y );
                        return this;
                    };
                return {
                    "arc": arc,
                    "arcTo": arcTo,
                    "beginPath": beginPath,
                    "bezierCurveTo": bezierCurveTo,
                    "boundingBox": boundingBox,
                    "circle": circle,
                    "clearRect": clearRect,
                    "clip": clip,
                    "closePath": closePath,
                    "context": context,
                    "createImageData" : createImageData,
                    "createLinearGradient" : createLinearGradient ,
                    "createPattern" : createPattern,
                    "createRadialGradient" : createRadialGradient,
                    "drawImage": drawImage,
                    "fill": fill,
					"fillCircle": fillCircle,
                    "fillRect": fillRect,
                    "fillStyle": fillStyle,
                    "fillText": fillText,
                    "font": font,
                    "currentPos": currentPos,
                    "getImageData" : getImageData,
                    "globalAlpha": globalAlpha,
                    "globalCompositeOperation": globalCompositeOperation,
                    "isPointInPath" : isPointInPath,
                    "line": line,
                    "lineCap": lineCap,
                    "lineJoin": lineJoin,
                    "lineTo": lineTo,
                    "lineWidth": lineWidth,
                    "miterLimit": miterLimit,
                    "measureText" : measureText,
                    "moveTo": moveTo,
                    "putImageData" : putImageData,
                    "quadraticCurveTo": quadraticCurveTo,
                    "quadraticCurveToFixed": quadraticCurveToFixed,
                    "rect": rect,
                    "rectangle": rectangle,
                    "reset": reset,
                    "restore": restore,
                    "rotate" : rotate,
                    "roundedRectangle": roundedRectangle,
                    "roundedRect": roundedRectangle,
                    "save": save,
                    "scale" : scale,
                    "setTransform" : setTransform,
                    "shadowBlur": shadowBlur,
                    "shadowColor": shadowColor,
					"shadowOffset": shadowOffset,
                    "shadowOffsetX": shadowOffsetX,
                    "shadowOffsetY": shadowOffsetY,
                    "stroke": stroke,
					"strokeCircle": strokeCircle,
                    "strokeStyle": strokeStyle,
                    "strokeText": strokeText,
                    "strokeRect": strokeRect,
                    "textAlign": textAlign,
                    "textBaseline": textBaseline,
                    "transform" : transform,
                    "translate" : translate
                };
            }
        };

        Canvas.prototype._init.prototype = Canvas.prototype;

        return Canvas;
    }());
    window['Canvas'] = Canvas;
}(window));