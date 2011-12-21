/**
 * @fileOverview CanvasJS, a helper library for the Canvas element
 * @name CanvasJS
 */

/*!
 * Canvas JavaScript Library v0.1
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
 *
* TODO: animations - https://developer.mozilla.org/en/Canvas_tutorial/Basic_animations
* TODO: Manage current position better. We're fuzzy on what x,y actually means. It's easy enough to give options, we just need to come up with a default.
* For starters, ADD boundingBox property for shapes, which we can then expose as whatever current X,Y scheme we'd default to and then then whatever people want
* then set up a configruation piece. Set default position when the Canvas is created and then allow overrides at any point.
* Something like ctx.setOrigin ( args )
* TODO: DOCUMENTATION
* TODO: BUILD SCRIPT
*/

(function(window) {
    "use strict";
    var document = window.document;

/*	Creates a new Canvas object
 *  @name CanvasJS
 *  @function
 *  @constructor 
 *  @param  {string} selector a string indicating the id of an HTML Canvas element or the name of the Canvas Element to be createed
 *  @param {object} params An object containing the following paramters
 *      params.fillStyle - default fill style. Defaults to "#000000";
 *      params.font - default font. Defaults to "10px sans-serif";
 *      params.globalAlpha - default alpha. Defaults to 1;
 *      params.globalCompositeOperation - Default global composition operation. Defaults to "source-over";
 *      params.lineCap - Default line cap. Defaults to "butt";
 *      params.lineJoin - Default line join. Defaults to "miter";
 *      params.lineWidth - Default line width. Defaults to 1;
 *      params.miterLimit - Default miter limit. Defaults to 10;
 *      params.shadowBlur - Default shadowBlur. Defaults to 0;
 *      params.shadowColor - Default shadowColor. Defaults to "rgba(0, 0, 0, 0)";
 *      params.shadowOffsetX - Default shadodOffsetX. Defaults to 0;
 *      params.shadowOffsetY - Default shadowOffsetY. Defaults to 0;
 *      params.strokeStyle - Default strokeStyle. Defaults to "#000000";
 *      params.textAlign - Default textAlign. Defaults to "start";
 *      params.textBaseline - Default textBaseline. Defaults to "alphabetic";
 */


    var Canvas = (function() {

        // Define a local copy of Canvas
        var Canvas = function( selector , params ) {
            return new Canvas.prototype._init( selector );
        };

        Canvas.prototype = {
/*	Creates a new Canvas object
 *  @name CanvasJS
 *  @function
 *  @constructor 
 *  @param  {string} selector a string indicating the id of an HTML Canvas element or the name of the Canvas Element to be createed
 *  @param {object} params An object containing the following paramters
 *      params.fillStyle - default fill style. Defaults to "#000000";
 *      params.font - default font. Defaults to "10px sans-serif";
 *      params.globalAlpha - default alpha. Defaults to 1;
 *      params.globalCompositeOperation - Default global composition operation. Defaults to "source-over";
 *      params.lineCap - Default line cap. Defaults to "butt";
 *      params.lineJoin - Default line join. Defaults to "miter";
 *      params.lineWidth - Default line width. Defaults to 1;
 *      params.miterLimit - Default miter limit. Defaults to 10;
 *      params.shadowBlur - Default shadowBlur. Defaults to 0;
 *      params.shadowColor - Default shadowColor. Defaults to "rgba(0, 0, 0, 0)";
 *      params.shadowOffsetX - Default shadodOffsetX. Defaults to 0;
 *      params.shadowOffsetY - Default shadowOffsetY. Defaults to 0;
 *      params.strokeStyle - Default strokeStyle. Defaults to "#000000";
 *      params.textAlign - Default textAlign. Defaults to "start";
 *      params.textBaseline - Default textBaseline. Defaults to "alphabetic";
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
					throw "The provided ID wasn't a canvas element. A canvas element with id 'bigc' created as a child of the supplied node."
                }
                var xCurrentPos = 0,
                    yCurrentPos = 0,
                    bbCurrent = null,
                    context = container.getContext('2d');
                /* Default properties
                *  These are all available to set at intialization
                */

                context.fillStyle = params.fillStyle || "#ffffff";
                context.font = params.font || "10px sans-serif";
                context.globalAlpha = params.globalAlpha || 1;
                context.globalCompositeOperation = params.globalCompositeOperation || "source-over";
                context.lineCap = params.lineCap || "butt";
                context.lineJoin = params.lineJoin || "miter";
                context.lineWidth = params.lineWidth || 1;
                context.miterLimit = params.miterLimit || 10;
                context.shadowBlur = params.shadowBlur || 0;
                context.shadowColor = params.shadowColor || "rgba(0, 0, 0, 0)";
                context.shadowOffsetX = params.shadodOffsetX || 0;
                context.shadowOffsetY = params.shadowOffsetY || 0;
                context.strokeStyle = params.strokeStyle || "#000000";
                context.textAlign = params.textAlign || "start";
                context.textBaseline = params.textBaseline || "alphabetic";

/**
 * Get or set the current x and y coordinates of the 'cursor'
 * @name currentPos
 * @function
 * @param {integer} x The id of the employee.
 * @param {integer} y The new role of the employee.
 */
                var currentPos = function( x , y) {
                    if (x !== undefined &&
                        y !== undefined &&
                        typeof(x) === "number" &&
                        typeof(y) === "number") {

                        xCurrentPos = x;
                        yCurrentPos = y;
						context.moveTo(x,y);
                        return {
                            x: xCurrentPos,
                            y: yCurrentPos
                        }
                    }
                    else {
                        return {
                            x: xCurrentPos,
                            y: yCurrentPos
                            }
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
                    arcTo = function(x1, y1, x2, y2, radius) {
                        context.arcTo(x1, y1, x2, y2, radius);
                        currentPos(x2,y2);
                        return this;
                    },
                    beginPath = function() {
                        context.beginPath();
                        return this;
                    },
                    bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
                        context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
                        currentPos(x,y);
                        return this;
                    },
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
                    circle = function( params ) {
                        //TODO: expand params to set any style appliable to a rectangle
                        //TODO: it shouldn't always stroke the circle.
                        // ODO: sugar for strokeCircle and fillCircle
                        params = params || {};
                        var x = _valOrDefault(params.x, xCurrentPos),
                            y = _valOrDefault(params.y, yCurrentPos),
                            radius = params.radius || 10,
                            fillStyle = params.fillStyle || false;
                        moveTo(x, y);
                        beginPath();
                        arc({
                            x: x,
                            y: y,
                            radius: radius
                        });
                        stroke();
                        if (fillStyle) {
                            context.fillStyle = fillStyle;
                            context.fill();
                        }
                        closePath();

                        boundingBox({cx:x,cy:y,r:radius});

                        return this;
                    },

                    /*
                     * Function: clearRect
                     *
                     * Clears a rectangular area, making it fully transparent
                     *
                     * Parameters:
                     *  params.x - (Integer) Starting x coordinate. Defaults to the current position.
                     *  params.y - (Integer) Starting y coordinate. Defaults to the current position.
                     *  params.width - (Integer) Rectangle width. Defaults to 0.
                     *  params.height - (Integer) Rectangle height. Defaults to 0.
                     *
                     * Returns:
                     *  An object containing the current x and y positions.
                     *
                     * See Also:
                     *
                     *  <circle>
                     *  <rectangle>
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
                    clip = function() {
                        context.clip();
                        return this;
                    },
                    closePath = function() {
                        context.closePath();
                        return this;
                    },
                    createImageData = function(height, width) {
                        context.closePath(height, width);
                        return this;
                    },
                    createLinearGradient = function(x0, y0, x1, y1) {
                        context.createLinearGradient(x0, y0, x1, y1);
                        return this;
                    },
                    createPattern = function(img, repetition) {
                        context.createPattern(img, repetition);
                        return this;
                    },
                    createRadialGradient = function( x0 , y0 , r0 , x1 , y1 ,  r1  ){
                        context.createRadialGradient( x0 , y0 , r0 , x1 , y1 ,  r1 );
                        return this;
                    },
                    drawImage = function(img, x, y) {
                        if (img.nodeName == undefined) {
                            var newImg = new Image();
                            newImg.src = img;
                            img = newImg;
                        }
                        img.onload = function() {
                            context.drawImage(img, x, y);
                        };
                        var x = _valOrDefault(x, xCurrentPos),
                            y = _valOrDefault(y, yCurrentPos);
                        currentPos(x,y);
                        return this;
                    },
                    fill = function() {
                        context.fill();
                        return this;
                    },
                    fillCircle = function(){
                        //TODO implement
                    },
                    fillRect = function(x, y, width, height) {
                        context.fillRect(x, y, width, height);
                        currentPos(x,y);

                        boundingBox({x:x, y:y, w:width, h:height});

                        return this;
                    },
                    fillStyle = function(color) {
                        if (color !== undefined) {
                            context.fillStyle = color;
                            return this;
                        }
                        else {
                            return context.fillStyle;
                        }
                    },
                    fillText = function(text, x, y, maxWidth) {
                        if (maxWidth === undefined ){
                             context.fillText(text, x, y);
                        } else {
                             context.fillText(text, x, y, maxWidth);

                        }

                        currentPos(x,y);
                        return this;
                    },
                    font = function(declaration) {
                        if (declaration !== undefined) {
                            context.font = declaration;
                            return this;
                        }
                        else {
                            return context.font;
                        }
                    },
                    getImageData = function( x, y, width, height ){
                        currentPos(x,y);
                        return context.getImageData( x, y, width, height )
                    },
                    globalAlpha = function(num) {
                        if (num !== undefined) {
                            context.globalAlpha = num;
                            return this;
                        }
                        else {
                            return context.globalAlpha;
                        }
                    },
                    globalCompositeOperation = function(op) {
                        if (op !== undefined) {
                            context.globalCompositeOperation = op;
                            return this;
                        }
                        else {
                            return context.globalCompositeOperation;
                        }
                    },
                    isPointInPath = function( x , y ){
                        //TODO: does this make sense to update the x, y?
                        return context.isPointInPath( x , y );
                    },
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
                    lineCap = function(cap) {
                        if (cap !== undefined) {
                            context.lineCap = cap;
                            return this;
                        }
                        else {
                            return context.lineCap;
                        }
                    },
                    lineJoin = function(join) {
                        if (join !== undefined) {
                            context.lineJoin = join;
                            return this;
                        }
                        else {
                            return context.lineJoin;
                        }
                    },
                    lineTo = function(x, y) {
                        context.lineTo(x, y);
                        boundingBox({x:x, y:y});

                        currentPos(x,y);

                        return this;
                    },
                    lineWidth = function(width) {
                        if (width !== undefined) {
                            context.lineWidth = width;
                            return this;
                        }
                        else {
                            return context.lineWidth;
                        }
                    },
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
                    measureText = function( string ){
                        return context.measureText( string );
                    },
                    miterLimit = function(limit) {
                        if (limit !== undefined) {
                            context.miterLimit = limit;
                            return this;
                        }
                        else {
                            return context.miterLimit;
                        }
                    },
                    moveTo = function(x, y) {
                        context.moveTo(x, y);
                        currentPos(x,y);
                        return this;
                    },
                    putImageData = function( imageData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight ) {
                        currentPos(x,y);
                        context.putImageData( imageData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight );
                        return this;
                    },
                    quadraticCurveTo = function(cp1x, cp1y, x, y) {
                        currentPos(x,y);
                        context.quadraticCurveTo(cp1x, cp1y, x, y);
                        return this;
                    },
                    quadraticCurveToFixed = function(cpx, cpy, x, y) {
                        /* for FF1.5 - from MDN: https://developer.mozilla.org/en/Canvas_tutorial/Drawing_shapes
                        /*
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
                    rectangle = function(params) {
                        //TODO: expand params to set any style appliable to a rectangle

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
                    /*
                     * Function: reset
                     *
                     * Resets the canvas container, erasing the currently displayed drawings.
                     *
                     * Returns:
                     *  An object containing the current x and y positions.
                     *
                     */
                    reset = function() {
                        container.width = container.width;
                        currentPos(0,0);
                        return this;
                    },
                    restore = function() {
                        context.restore();
                        return this;
                    },
                    rotate = function( angle ) {
                        context.rotate( angle );
                        return this
                    },
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
                    save = function() {
                        context.save();
                        return this;
                    },
                    scale = function( x , y ) {
                        context.scale( x , y);
                        return this;
                    },
                    setTransform = function( matrix11 , matrix12 , matrix21 , matrix22 , x , y ){
                        context.setTransform(  matrix11 , matrix12 , matrix21 , matrix22 , x , y );
                        return this;
                    },
                    shadowBlur = function(num) {
                        if (num !== undefined) {
                            context.shadowBlur = num;
                            return this;
                        }
                        else {
                            return context.shadowBlur;
                        }
                    },
                    shadowColor = function(color) {
                        if (color !== undefined) {
                            context.shadowColor = color;
                            return this;
                        }
                        else {
                            return context.shadowColor;
                        }
                    },
                    shadowOffsetX = function(num) {
                        if (num !== undefined) {
                            context.shadowOffsetX = num;
                            return this;
                        }
                        else {
                            return context.shadowOffsetX;
                        }
                    },
                    shadowOffsetY = function(num) {
                        if (num !== undefined) {
                            context.shadowOffsetY = num;
                            return this;
                        }
                        else {
                            return context.shadowOffsetY;
                        }
                    },
                    shadowOffset = function() {
                        //TODO, make one call if we need to set both!
                    },
                    strokeCircle = function(){
                        //TODO implement
                    },
                    strokeStyle = function(color) {
                        if (color !== undefined) {
                            context.strokeStyle = color;
                            return this;
                        }
                        else {
                            return context.strokeStyle;
                        }
                    },
                    strokeRect = function(x, y, width, height) {
                        currentPos(x,y);
                        context.strokeRect(x, y, width, height);
                        return this;
                    },
                    strokeText = function(text, x, y, maxWidth) {
                        currentPos(x,y);
                        context.strokeText(text, x, y, maxWidth);
                        return this;
                    },
                    stroke = function() {
                        context.stroke();
                        return this;
                    },
                    textAlign = function(align) {
                        if (align !== undefined) {
                            context.textAlign = align;
                            return this;
                        }
                        else {
                            return context.textAlign;
                        }
                    },
                    textBaseline = function(baseline) {
                        if (baseline !== undefined) {
                            context.textBaseline = baseline;
                            return this;
                        }
                        else {
                            return context.textBaseline;
                        }
                    },
                    transform = function( matrix11 , matrix12 , matrix21 , matrix22 , x , y ){
                        currentPos(x,y);
                        context.transform( matrix11 , matrix12 , matrix21 , matrix22 , x , y );
                        return this;
                    },
                    translate = function(){
                        currentPos(x,y);
                        context.translate( x , y );
                        return this;
                    };
                return {
                    arc: arc,
                    arcTo: arcTo,
                    beginPath: beginPath,
                    bezierCurveTo: bezierCurveTo,
                    boundingBox: boundingBox,
                    circle: circle,
                    clearRect: clearRect,
                    clip: clip,
                    closePath: closePath,
                    context: context,
                    createImageData : createImageData,
                    createLinearGradient : createLinearGradient ,
                    createPattern : createPattern,
                    createRadialGradient : createRadialGradient,
                    drawImage: drawImage,
                    fill: fill,
                    fillRect: fillRect,
                    fillStyle: fillStyle,
                    fillText: fillText,
                    font: font,
                    currentPos: currentPos,
                    getImageData : getImageData,
                    globalAlpha: globalAlpha,
                    globalCompositeOperation: globalCompositeOperation,
                    isPointInPath : isPointInPath,
                    line: line,
                    lineCap: lineCap,
                    lineJoin: lineJoin,
                    lineTo: lineTo,
                    lineWidth: lineWidth,
                    miterLimit: miterLimit,
                    measureText : measureText,
                    moveTo: moveTo,
                    putImageData : putImageData,
                    quadraticCurveTo: quadraticCurveTo,
                    quadraticCurveToFixed: quadraticCurveToFixed,
                    rect: rect,
                    rectangle: rectangle,
                    reset: reset,
                    restore: restore,
                    rotate : rotate,
                    roundedRectangle: roundedRectangle,
                    roundedRect: roundedRectangle,
                    save: save,
                    scale : scale,
                    setTransform : setTransform,
                    shadowBlur: shadowBlur,
                    shadowColor: shadowColor,
                    shadowOffsetX: shadowOffsetX,
                    shadowOffsetY: shadowOffsetY,
                    stroke: stroke,
                    strokeStyle: strokeStyle,
                    strokeText: strokeText,
                    strokeRect: strokeRect,
                    textAlign: textAlign,
                    textBaseline: textBaseline,
                    transform : transform,
                    translate : translate
                }
            }
        }

        Canvas.prototype._init.prototype = Canvas.prototype;

        return Canvas;
    }());
    window.Canvas = Canvas;
}(window));
