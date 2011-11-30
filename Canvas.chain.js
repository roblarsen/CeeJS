/*!
 * Canvas JavaScript Library v0.0.8
 * some day:
 * canvasjs.net
 * for now, visit:
 * 
 * http://bobholtwebdev.com/
 * http://htmlcssjavascript.com
 * 
 * Copyright 2011, Bob Holt, Rob Larsen, Marc Neuwirth
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://bobholtwebdev.com/license
 *
 * Date: 2011.11.30 
 */
// TODO: transformations - https://developer.mozilla.org/en/Canvas_tutorial/Transformations
// TODO: animations - https://developer.mozilla.org/en/Canvas_tutorial/Basic_animations
/* TODO: At minimum, expose the core canvas versions of the following methods: , drawWindow,  getImageData, isPointInPath, measureText, putImageData, rotate, scale, setTransform,  transform, translate,
*/
(function(window) {
    "use strict";
    var document = window.document,
        navigator = window.navigator,
        location = window.location;

    var Canvas = (function() {

        // Define a local copy of Canvas
        var Canvas = function(selector, params) {
            return new Canvas.fn.init(selector)
        };

        Canvas.fn = Canvas.prototype = {
            constructor: Canvas,
            init: function(selector, params) {
                params = params || {};
                var container;
                if (document.getElementById(selector)) {
                    container = document.getElementById(selector);
                } else {
                    var canvas = document.createElement("canvas");
                    canvas.id = selector;
                    canvas.width = "400";
                    canvas.height = "400";
                    document.body.appendChild(canvas);
                    container = document.getElementById(selector);
                    throw "Canvas.js expects a valid element ID as an argument. Since you didn't provide one, we'll just go ahead and create one for you. ";
                }
                if (container.nodeName.toLowerCase() !== "canvas") {
                    var canvas = document.createElement("canvas");
                    canvas.width = container.offsetHeight;
                    canvas.height = container.offsetWidth;
                    canvas.id = "bigc"
                    container.appendChild(canvas);
                    container = document.getElementById("bigc");
                }
                var xCurrentPos = 0,
                    yCurrentPos = 0,
                    context = container.getContext('2d');
                //Default properties    
                context.fillStyle = params.fillStyle || "#000000";
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

                var getCurrentPos = function() {
                    //TODO: Make sure all methods update currentPos where applicable
                    return {
                        x: xCurrentPos,
                        y: yCurrentPos
                    }
                },
                    arc = function(params) {
                        params = params || {};
                        var x = params.x || xCurrentPos,
                            y = params.y || yCurrentPos,
                            radius = params.radius || 0,
                            start = params.start || 0,
                            end = params.end || Math.PI * 2,
                            counter = params.counter || false;

                        context.arc(x, y, radius, start, end, counter);
                        return this;
                    },
                    arcTo = function(x1, y1, x2, y2, radius) {
                        context.arcTo(x1, y1, x2, y2, radius);
                        xCurrentPos = x2;
                        yCurrentPos = y2;
                        return this;
                    },
                    beginPath = function() {
                        context.beginPath();
                        return this;
                    },
                    bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
                        context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
                        return this;
                    },
                    circle = function(params) {
                        params = params || {};
                        var x = params.x || xCurrentPos,
                            y = params.y || yCurrentPos,
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
                        var x = params.x || xCurrentPos,
                            y = params.y || yCurrentPos,
                            width = params.width || 0,
                            height = params.height || 0;
                        context.clearRect(x, y, width, height);
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
/*createRadialGradient = function(){
                        
                    },*/
                    drawImage = function(img, x, y) {
                        if (img.nodeName == undefined) {
                            var newImg = new Image();
                            newImg.src = img;
                            img = newImg;
                        }
                        img.onload = function() {
                            context.drawImage(img, x, y);
                        };
                        var x = x || xCurrentPos,
                            y = y || yCurrentPos;
                        xCurrentPos = x;
                        yCurrentPos = y;
                        return this;
                    },
                    fill = function() {
                        context.fill();
                        return this;
                    },
                    fillRect = function(x, y, width, height) {
                        context.fillRect(x, y, width, height);
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
                        context.fillText(text, x, y, maxWidth);
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
                    line = function(params) {
                        params = params || {};
                        var x = params.x || xCurrentPos,
                            y = params.y || yCurrentPos,
                            hypotenuse = params.distance || 0,
                            angle = params.angle % 360 || 0,
                            radians = math.radians(angle),
                            a = Math.sin(radians) * hypotenuse,
                            b = Math.cos(radians) * hypotenuse,
                            newX = x + b,
                            newY = y + a;

                        context.moveTo(x, y);
                        context.lineTo(newX, newY);
                        xCurrentPos = newX;
                        yCurrentPos = newY;
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
                        xCurrentPos = x;
                        yCurrentPos = y;
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
                        cosec: function(num) {
                            return 1 / Math.sin(num);
                        },
                        sec: function(num) {
                            return 1 / Math.cos(num);
                        },
                        radians: function(degrees) {
                            return degrees * (Math.PI / 180);
                        }
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
                        xCurrentPos = x;
                        yCurrentPos = y;
                        return this;
                    },
                    quadraticCurveTo = function(cp1x, cp1y, x, y) {
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

                        xCurrentPos = x;
                        yCurrentPos = y;
                        return this;
                    },
                    rect = function(x, y, width, height) {
                        context.rect(x, y, width, height);
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
                        params = params || {};
                        var x = params.x || xCurrentPos,
                            y = params.y || yCurrentPos,
                            width = params.width || 0,
                            height = params.height || 0,
                            fillStyle = params.fillStyle || false,
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
                        xCurrentPos = yCurrentPos = 0;
                        return this;
                    },
                    restore = function() {
                        context.restore();
                        return this;
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
                        return this;
                    },
                    save = function() {
                        context.save();
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
                        context.strokeRect(x, y, width, height);
                        return this;
                    },
                    strokeText = function(text, x, y, maxWidth) {
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
                    };
                return {
                    arc: arc,
                    arcTo: arcTo,
                    beginPath: beginPath,
                    bezierCurveTo: bezierCurveTo,
                    circle: circle,
                    clearRect: clearRect,
                    clip: clip,
                    closePath: closePath,
                    context: context,
                    drawImage: drawImage,
                    fill: fill,
                    fillRect: fillRect,
                    fillStyle: fillStyle,
                    fillText: fillText,
                    font: font,
                    getCurrentPos: getCurrentPos,
                    globalAlpha: globalAlpha,
                    globalCompositeOperation: globalCompositeOperation,
                    line: line,
                    lineCap: lineCap,
                    lineJoin: lineJoin,
                    lineTo: lineTo,
                    lineWidth: lineWidth,
                    miterLimit: miterLimit,
                    moveTo: moveTo,
                    quadraticCurveTo: quadraticCurveTo,
                    rect: rect,
                    rectangle: rectangle,
                    reset: reset,
                    restore: restore,
                    roundedRect: roundedRectangle,
                    save: save,
                    shadowBlur: shadowBlur,
                    shadowColor: shadowColor,
                    shadowOffsetX: shadowOffsetX,
                    shadowOffsetY: shadowOffsetY,
                    stroke: stroke,
                    strokeStyle: strokeStyle,
                    strokeText: strokeText,
                    strokeRect: strokeRect,
                    textAlign: textAlign,
                    textBaseline: textBaseline
                }
            }
        }

        Canvas.fn.init.prototype = Canvas.fn;

        return Canvas;
    }());
    window.Canvas = Canvas;
}(window));
